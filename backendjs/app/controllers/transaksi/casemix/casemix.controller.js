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
        mp.nobpjs 
    from
        m_pasien mp
        where mp.nocm ilike'%${req.query.nocm}%' and mp.statusenabled=true
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
    getListPasien
};