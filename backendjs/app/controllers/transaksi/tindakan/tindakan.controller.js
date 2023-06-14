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
        const resultlistantreanpemeriksaan = await queryPromise2(`select ta.norec, mu.id as value,mu.reportdisplay as label,objectkelasfk from t_antreanpemeriksaan ta 
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

async function getListProdukToKelasToUnit(req, res) {
    const objectkelasfk = req.query.objectkelasfk;
    const objectunitfk = req.query.objectunitfk;
    // console.log(objectunitfk)
    try {
        const resultlistantreanpemeriksaan = await queryPromise2(`select mp.namaproduk as label,mp.id as value,mth.objectkelasfk,mm.objectunitfk,mu.reportdisplay,mth.totalharga  from m_mapunittoproduk mm
        join m_produk mp on mp.id=mm.objectprodukfk
        join m_unit mu on mu.id=mm.objectunitfk
        join m_totalhargaprodukbykelas mth on mth.objectmapunittoprodukfk=mm.id and mth.objectprodukfk=mp.id
        where mth.objectkelasfk =${objectkelasfk} and mm.objectunitfk =${objectunitfk} 
        and mp.namaproduk ilike '%${req.query.namaproduk}%'`);

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
    getListAntreanPemeriksaan,
    getListProdukToKelasToUnit
};