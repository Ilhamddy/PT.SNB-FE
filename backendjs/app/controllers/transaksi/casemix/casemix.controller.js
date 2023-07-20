import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/registrasi.queries';
import db from "../../../models";
import crypto from 'crypto';
import axios from "axios";
import CryptoJS from "crypto-js";
const algorithm = 'aes-256-cbc';
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
            ta.norec as norecta,
            td.norec,
            td.noregistrasi,
            to_char(td.tglregistrasi,
            'dd Month YYYY HH:mm') as tglregistrasi,
            to_char(td.tglregistrasi,
                'YYYY-MM-DD') as tglregistrasi2,
            to_char(td.tglregistrasi,
                    'YYYY-MM-DD HH:mm') as tglregistrasi3,
            to_char(td.tglpulang,
            'dd Month YYYY HH:mm') as tglpulang,
            to_char(td.tglpulang,
                'YYYY-MM-DD') as tglpulang2,
            to_char(td.tglpulang,
                    'YYYY-MM-DD HH:mm') as tglpulang3,
            mp.nocm,mp.namapasien,
            case when mu.objectinstalasifk=2 then 'RI' else 'RJ' end as tipe,
            case when td.objectpenjaminfk=1 then 'JKN' else mr.namarekanan  end as jaminan1,
            case when td.objectpenjamin2fk=1 then 'JKN' when td.objectpenjamin2fk is null then '' else 'LAIN-LAIN' end as jaminan2,
            tk.no_sep,tk.no_kartu,to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY Tahun mm Bulan DD Hari')) AS umur,
            mp.tgllahir,mc.caramasuk,to_char( td.tglregistrasi, TO_CHAR(age( td.tglregistrasi,  td.tglpulang), 'DD')) AS los,
            case when td.objectcarapulangrifk is null then '1' else mcp.kodeexternal end as kodecarapulang,
            case when td.objectcarapulangrifk is null then 'Atas persetujuan dokter' else mcp.reportdisplay end as labelcarapulang,
            mpeg.namalengkap as dpjp, mj.kodeexternal as gender,mc.caramasuk as kodecaramasuk,
            case when mu.objectinstalasifk=2 then '1' when mu.objectinstalasifk=7 then '3' else '2' end as jenis_rawat,
            mk.kelas_bpjs
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
        left join m_jeniskelamin mj on mj.id=mp.objectjeniskelaminfk
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=td.norec
        join m_kelas mk on mk.id=tk.objectkelasfk
        and td.objectunitlastfk=ta.objectunitfk 
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
                let myArray = resultTtv.rows[0].tekanandarah.split("/");
                resultlist.rows[i].sistole = myArray[0]
                resultlist.rows[i].diastole = myArray[1]
            } else {
                resultlist.rows[i].bb = 0
                resultlist.rows[i].sistole = 0
                resultlist.rows[i].diastole = 0
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
        let prosedur_non_bedah = 0;
        let prosedur_bedah = 0;
        let konsultasi = 0;
        let tenaga_ahli = 0;
        let keperawatan = 0;
        let penunjang = 0;
        let radiologi = 0;
        let laboratorium = 0;
        let pelayanan_darah = 0;
        let rehabilitasi = 0;
        let akomodasi = 0;
        let rawat_intensif = 0;
        let obat = 0;
        let obat_kronis = 0;
        let obat_kemoterapi = 0;
        let alkes = 0;
        let bmhp = 0;
        let sewa_alat = 0;
        let total_tagihan = 0;
        for (var i = 0; i < resultlist.rows.length; ++i) {
            if (resultlist.rows[i].objectvariabelbpjsfk === 1) {
                akomodasi = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 2) {
                alkes = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 3) {
                bmhp = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 4) {
                keperawatan = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 5) {
                konsultasi = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 6) {
                laboratorium = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 7) {
                obat = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 8) {
                obat_kemoterapi = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 9) {
                obat_kronis = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 10) {
                pelayanan_darah = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 11) {
                penunjang = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 12) {
                prosedur_bedah = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 13) {
                prosedur_non_bedah = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 14) {
                radiologi = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 15) {
                rawat_intensif = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 16) {
                rehabilitasi = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 17) {
                sewa_alat = resultlist.rows[i].ttl
            }
            if (resultlist.rows[i].objectvariabelbpjsfk === 18) {
                tenaga_ahli = resultlist.rows[i].ttl
            }

            total_tagihan = parseFloat(total_tagihan) + parseFloat(resultlist.rows[i].ttl)
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

async function getListDiagnosaPasien(req, res) {

    const resultList = await queryPromise2(`SELECT row_number() OVER (ORDER BY td.norec) AS no,dp.noregistrasi,
    to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,td.norec, mi.kodeexternal ||' - '|| mi.reportdisplay as label,
    mi.id as value, td.keterangan,td.objecttipediagnosafk,mt.reportdisplay as tipediagnosa,
    td.objectjeniskasusfk, jk.reportdisplay as jeniskasus, mu.namaunit,mi.kodeexternal as kodediagnosa
            FROM t_daftarpasien dp 
    join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
    join t_diagnosapasien td  on td.objectantreanpemeriksaanfk =ta.norec
    join m_unit mu on mu.id=ta.objectunitfk
    join m_tipediagnosa mt on mt.id=td.objecttipediagnosafk
    join m_jeniskasus jk on jk.id=td.objectjeniskasusfk
    join m_icdx mi on mi.id=td.objecticdxfk where dp.norec='${req.query.norec}' and td.statusenabled=true
    order by td.objecttipediagnosafk
    `);
    res.status(200).send({
        data: resultList.rows,
        status: "success",
        success: true,
    });
}

async function getListDiagnosaIxPasien(req, res) {

    const resultList = await queryPromise2(`SELECT row_number() OVER (ORDER BY td.norec) AS no,dp.noregistrasi,
    to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,td.norec,mu.namaunit,
    mi.kodeexternal ||' - '|| mi.reportdisplay as label,
    mi.id as value, td.keterangan,td.qty,mi.kodeexternal as kodediagnosa
            FROM t_daftarpasien dp 
    join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
    join t_diagnosatindakan td  on td.objectantreanpemeriksaanfk =ta.norec
    join m_unit mu on mu.id=ta.objectunitfk
    join m_icdix mi on mi.id=td.objecticdixfk where dp.norec='${req.query.norec}' and td.statusenabled=true
    `);
    res.status(200).send({
        data: resultList.rows,
        status: "success",
        success: true,
    });
}
// function decrypt
const inacbg_encrypt = (data, strkey) => { //stringify when data os object
    if (typeof data === 'object') {
        data = JSON.stringify(data);
    } //make Key to binary type, stored in Buffer
    let keys = Buffer.from(strkey, 'hex');
    //make data to binary type, stored in Buffer 
    let data_encoded = Buffer.from(data);
    //make iv 16 byte of random 
    let iv = crypto.randomBytes(16);
    //create cyper for encrypt
    let enc = crypto.createCipheriv('aes-256-cbc', keys, iv);
    // encrypt data 
    let encrypt = Buffer.concat([enc.update(data_encoded), enc.final()]);
    //create signature 
    let signature = crypto.createHmac('sha256', keys)
        .update(encrypt).digest().slice(0, 10);
    //concat buffer then return in string encode with base64
    return Buffer.concat([signature, iv, encrypt]).toString('base64');
}

const inacbg_compare = (signature, encrypt, key_inacbg) => {
    let keys = Buffer.from(key_inacbg, 'hex');
    let calc_signature = crypto.createHmac('sha256', keys)
        .update(encrypt).digest().slice(0, 10);
    if (signature.compare(calc_signature) === 0) {
        return true;
    }
    return false;
}

// end

// inacbg decrypt
const inacbg_decrypt = (data, key_inacbg) => {
    //Replacing Text
    if (typeof data === 'string') {
        data = data.replace(/----BEGIN ENCRYPTED DATA----|----END ENCRYPTED DATA----/g, '');
    } else {
        return `Should be String input`;
    } //make Key to binary type, stored in Buffer 
    let keys = Buffer.from(key_inacbg, 'hex');
    //make data to binary type, stored in Buffer 
    let data_decoded = Buffer.from(data, 'base64');
    //make iv to binary type, stored in Buffer 
    let iv = Buffer.from(data_decoded.slice(10, 26));
    //create Deciper with IV to decode data 
    let dec = crypto.createDecipheriv('aes-256-cbc', keys, iv);
    //cutting data that has binary type -- 26 is 10 for char and 16 for IV for aes-256-cbc 
    let encoded = Buffer.from(data_decoded.slice(26))
    //take Signature 
    let signature = data_decoded.slice(0, 10);
    //check if signature is right
    if (!inacbg_compare(signature, encoded, key_inacbg)) {
        return "SIGNATURE_NOT_MATCH"; /// signature doesn't match 
    }
    //decrypt data 
    let decrypted = Buffer.concat([dec.update(encoded), dec.final()]);
    return decrypted.toString('utf8');
}





//   end

async function saveBridgingInacbg(req, res) {
    let key_inacbg = ''
    let url_inacbg = ''
    const resultlistKodeTarif = await queryPromise2(`select s_key,s_value from s_global where s_key ilike '%inacbg%'`);
    for (let x = 0; x < resultlistKodeTarif.rows.length; x++) {
        if (resultlistKodeTarif.rows[x].s_key === 'key_inacbg') {
            key_inacbg = resultlistKodeTarif.rows[x].s_value
        }
        if (resultlistKodeTarif.rows[x].s_key === 'url_inacbg') {
            url_inacbg = resultlistKodeTarif.rows[x].s_value
        }
    }

    
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
    };

    // res.status(200).send({
    //     data: req.body,
    //     status: "success",
    //     success: true,
    // });
    // return
    try {
        let responArr = []
        for (let i = 0; i < req.body.length; i++) {
            let payload = await inacbg_encrypt(req.body[i], key_inacbg)
            const config = {
                method: "post",
                url: url_inacbg,
                headers: headers,
                data: payload
            };
            const response = await axios(config);
            const responseData = response.data;

            // Extract the content between the first and last newlines
            const firstNewlineIndex = await responseData.indexOf("\n") + 1;
            const lastNewlineIndex = await responseData.lastIndexOf("\n") - 1;
            const trimmedResponse = await responseData.substring(firstNewlineIndex, lastNewlineIndex);
            const decryptedResponse = await inacbg_decrypt(responseData, key_inacbg);
            responArr.push({
                dataRequest:req.body[i],
                dataResponse:JSON.parse(decryptedResponse)
            })
        }

        res.status(200).send({
            data: responArr,
            status: "success",
            success: true,
            msg: 'success',
            code: 200
        });
    } catch (error) {
        // Handle errors
        // console.error("Error:", error);
        // throw error;
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }

}


export default {
    getListPasien,
    getListDaftarPasien,
    getListTarif18,
    getListDiagnosaPasien,
    getListDiagnosaIxPasien,
    saveBridgingInacbg
};