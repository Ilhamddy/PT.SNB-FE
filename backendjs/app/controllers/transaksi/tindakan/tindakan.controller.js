const pool = require("../../../config/dbcon.query");
const uuid = require('uuid')
const queries = require('../../../queries/transaksi/registrasi.queries');
const db = require("../../../models");

const t_antreanpemeriksaan = db.t_antreanpemeriksaan

queryPromise2 = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};

async function getListAntreanPemeriksaan(req, res) {
    const norecdp = req.params.norec;
    // console.log(req.query.norecdp)
    try {
        const resultlistantreanpemeriksaan = await queryPromise2(`select ta.norec, mu.id as value,mu.reportdisplay as label from t_antreanpemeriksaan ta 
        join m_unit mu on mu.id=ta.objectunitfk  where ta.objectdaftarpasienfk= '${norecdp}'
        `);

        let tempres = resultlistantreanpemeriksaan.rows
       
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        res.status(500).send({ message: error });
    }

}


module.exports = {
    getListAntreanPemeriksaan
};