import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/registrasi.queries';
import db from "../../../models";

const queryPromise2 = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

async function getListPasien(req, res) {

    try {

        const resultlist = await queryPromise2(`select
        mp.id,
        mp.nocm,
        to_char(mp.tgllahir,
        'dd Month YYYY') as tgllahir,
        mp.namapasien,
        mp.nobpjs,
        mj.jeniskelamin 
    from
        m_pasien mp
        join m_jeniskelamin mj on mj.id=mp.objectjeniskelaminfk
        where mp.nocm ilike'%${req.query.nocm}%' and mp.statusenabled=true
        limit 5
        `);

        let tempres = resultlist.rows

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        res.status(500).send({ message: error });
    }

}

async function getListDaftarPasien(req, res) {

    try {
        let kode_tarif = ''
        let nama_tarif = ''
        const resultlistKodeTarif = await queryPromise2(`select s_key,s_value from s_global where s_key ilike '%inacbg%'`);
        for (let x = 0; x < resultlistKodeTarif.rows.length; x++) {
            if (resultlistKodeTarif.rows[x].s_key === 'kode_tarif_inacbg') {
                kode_tarif = resultlistKodeTarif.rows[x].s_value
            }
            if (resultlistKodeTarif.rows[x].s_key === 'nama_tarif_inacbg') {
                nama_tarif = resultlistKodeTarif.rows[x].s_value
            }
        }
        const resultlist = await queryPromise2(`select
            td.norec,
            td.noregistrasi,
            to_char(td.tglregistrasi,
            'dd Month YYYY HH:mm') as tglregistrasi,
            to_char(td.tglregistrasi,
                'YYYY-MM-DD') as tglregistrasi2,
            to_char(td.tglpulang,
            'dd Month YYYY HH:mm') as tglpulang,
            to_char(td.tglpulang,
                'YYYY-MM-DD') as tglpulang2,
            mp.nocm,mp.namapasien,
            case when mu.objectinstalasifk=2 then 'RI' else 'RJ' end as tipe,
            case when td.objectpenjaminfk=1 then 'JKN' else mr.namarekanan  end as jaminan1,
            case when td.objectpenjamin2fk=1 then 'JKN' when td.objectpenjamin2fk is null then '' else 'LAIN-LAIN' end as jaminan2,
            tk.no_sep,tk.no_kartu,to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY Tahun mm Bulan DD Hari')) AS umur,
            mp.tgllahir,mc.caramasuk,to_char( td.tglregistrasi, TO_CHAR(age( td.tglregistrasi,  td.tglpulang), 'DD')) AS los,
            case when td.objectcarapulangrifk is null then '1' else mcp.kodeexternal end as kodecarapulang,
            case when td.objectcarapulangrifk is null then 'Atas persetujuan dokter' else mcp.reportdisplay end as labelcarapulang,
            mpeg.namalengkap as dpjp
        from
            t_daftarpasien td
        join m_pasien mp on mp.id=td.nocmfk
        join m_unit mu on mu.id=td.objectunitlastfk
        left join m_rekanan mr on mr.id=td.objectpenjaminfk
        left join m_rekanan mr2 on mr2.id=td.objectpenjamin2fk
        left join t_kepesertaanasuransi tk on  tk.objectdaftarpasienfk=td.norec
        left join m_caramasuk mc on mc.id=td.objectcaramasukfk
        left join m_carapulangri mcp on mcp.id=td.objectcarapulangrifk
        left join m_pegawai mpeg on mpeg.id=td.objectdokterpemeriksafk
        where mp.id ='${req.query.nocm}' and mp.statusenabled=true
        order by td.tglregistrasi desc
        limit 20
        `);

        for (var i = 0; i < resultlist.rows.length; ++i) {
            if (resultlist.rows[i].tglregistrasi2 === resultlist.rows[i].tglpulang2) {
                resultlist.rows[i].los = 1
            } else {
                if (resultlist.rows[i].los.substr(0, 1) === '-') {
                    resultlist.rows[i].los = parseFloat(resultlist.rows[i].los.substring(1)) + 1
                    // resultlist.rows[i].los=resultlist.rows[i].los
                }
            }
            const resultTtv = await queryPromise2(`SELECT dp.noregistrasi,
            to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,tt.norec, tt.objectemrfk, tt.tinggibadan,
            tt.beratbadan, tt.suhu,tt.e, tt.m, tt.v, tt.nadi, tt.alergi, tt.tekanandarah, tt.spo2, 
            tt.pernapasan,tt.keadaanumum, tt.objectpegawaifk, tt.isedit, tt.objectttvfk, tt.tglisi,
            mu.namaunit,mr.reportdisplay as namagcs
                    FROM t_daftarpasien dp 
            join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
            join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
            join t_ttv tt on tt.objectemrfk =te.norec
            join m_unit mu on mu.id=ta.objectunitfk
            left join m_range mr on mr.id=tt.objectgcsfk where dp.norec='${resultlist.rows[i].norec}' order by tt.tglisi 
            desc limit 1
            `);
            if (resultTtv.rows.length > 0) {
                // console.log(resultTtv.rows[0].beratbadan)
                resultlist.rows[i].bb = resultTtv.rows[0].beratbadan
            } else {
                resultlist.rows[i].bb = 0
            }
            resultlist.rows[i].kode_tarif = kode_tarif
            resultlist.rows[i].nama_tarif = nama_tarif
        }
        let tempres = resultlist.rows

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        res.status(500).send({ message: error });
    }

}

async function getListTarif18(req, res) {

    try {

        const resultlist = await queryPromise2(`select
                sum(((tp.harga - case when tp.discount is null 
                then 0 else tp.discount end) * tp.qty)+ case when 
                tp.jasa is null then 0 else tp.jasa end) as ttl,
                mp.objectvariabelbpjsfk
            from
                t_daftarpasien td
            join t_antreanpemeriksaan ta on
                td.norec = ta.objectdaftarpasienfk
            join m_unit mu on
                mu.id = ta.objectunitfk
            join t_pelayananpasien tp on
                tp.objectantreanpemeriksaanfk = ta.norec
            join m_produk mp on
                mp.id = tp.objectprodukfk
            where
                td.norec = '${req.query.norec}'
                and tp.statusenabled = true
            group by mp.objectvariabelbpjsfk 
        `);
        let prosedur_non_bedah =0;
        let prosedur_bedah =0;
        let konsultasi =0;
        let tenaga_ahli =0;
        let keperawatan =0;
        let penunjang =0;
        let radiologi =0;
        let laboratorium =0;
        let pelayanan_darah =0;
        let rehabilitasi =0;
        let akomodasi =0;
        let rawat_intensif =0;
        let obat =0;
        let obat_kronis =0;
        let obat_kemoterapi =0;
        let alkes =0;
        let bmhp =0;
        let sewa_alat =0;
        let total_tagihan =0;
        for (var i = 0; i < resultlist.rows.length; ++i) {
            if(resultlist.rows[i].objectvariabelbpjsfk===1){
                akomodasi = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===2){
                alkes = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===3){
                bmhp = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===4){
                keperawatan = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===5){
                konsultasi = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===6){
                laboratorium = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===7){
                obat = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===8){
                obat_kemoterapi = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===9){
                obat_kronis = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===10){
                pelayanan_darah = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===11){
                penunjang = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===12){
                prosedur_bedah = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===13){
                prosedur_non_bedah = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===14){
                radiologi = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===15){
                rawat_intensif = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===16){
                rehabilitasi = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===17){
                sewa_alat = resultlist.rows[i].ttl
            }
            if(resultlist.rows[i].objectvariabelbpjsfk===18){
                tenaga_ahli = resultlist.rows[i].ttl
            }

            total_tagihan = parseFloat(total_tagihan)+parseFloat(resultlist.rows[i].ttl)
        }
        let tarif = 
            {
                akomodasi: parseFloat(akomodasi),
                alkes: parseFloat(alkes),
                bmhp: parseFloat(bmhp),
                keperawatan: parseFloat(keperawatan),
                konsultasi: parseFloat(konsultasi),
                laboratorium: parseFloat(laboratorium),
                obat: parseFloat(obat),
                obat_kemoterapi: parseFloat(obat_kemoterapi),
                obat_kronis: parseFloat(obat_kronis),
                pelayanan_darah: parseFloat(pelayanan_darah),
                penunjang: parseFloat(penunjang),
                prosedur_bedah: parseFloat(prosedur_bedah),
                prosedur_non_bedah: parseFloat(prosedur_non_bedah),
                radiologi: parseFloat(radiologi),
                rawat_intensif: parseFloat(rawat_intensif),
                rehabilitasi: parseFloat(rehabilitasi),
                sewa_alat: parseFloat(sewa_alat),
                tenaga_ahli: parseFloat(tenaga_ahli),
                total_tagihan: parseFloat(total_tagihan)
            }
        ;
        let tempres = tarif

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        res.status(500).send({ message: error });
    }

}

export default {
    getListPasien,
    getListDaftarPasien,
    getListTarif18
};