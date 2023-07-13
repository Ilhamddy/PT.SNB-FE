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

        const resultlist = await queryPromise2(`select
            td.norec,
            td.noregistrasi,
            to_char(td.tglregistrasi,
            'dd Month YYYY HH:mm') as tglregistrasi,
            to_char(td.tglpulang,
            'dd Month YYYY HH:mm') as tglpulang,
            mp.nocm,mp.namapasien,
            case when mu.objectinstalasifk=2 then 'RI' else 'RJ' end as tipe,
            case when td.objectpenjaminfk=1 then 'JKN' else mr.namarekanan  end as jaminan1,
            case when td.objectpenjamin2fk=1 then 'JKN' when td.objectpenjamin2fk is null then '' else 'LAIN-LAIN' end as jaminan2,
            tk.no_sep,tk.no_kartu,to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY Tahun mm Bulan DD Hari')) AS umur,
            mp.tgllahir
        from
            t_daftarpasien td
        join m_pasien mp on mp.id=td.nocmfk
        join m_unit mu on mu.id=td.objectunitlastfk
        left join m_rekanan mr on mr.id=td.objectpenjaminfk
        left join m_rekanan mr2 on mr2.id=td.objectpenjamin2fk
        left join t_kepesertaanasuransi tk on  tk.objectdaftarpasienfk=td.norec
        where mp.id ='${req.query.nocm}' and mp.statusenabled=true
        limit 20
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


export default {
    getListPasien,
    getListDaftarPasien
};