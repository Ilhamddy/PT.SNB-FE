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

async function getListJenisPelaksana(req, res) {

    try {
        const resultlistantreanpemeriksaan = await queryPromise2(`select id as value,reportdisplay as label
        from m_jenispelaksana mj where statusenabled=true`);

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

async function getListNamaPelaksana(req, res) {

    try {
        const resultlistantreanpemeriksaan = await queryPromise2(`select id as value, namalengkap as label from m_pegawai mp
        where statusenabled=true`);

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

async function saveTindakanPasien(req, res) {
console.log('masasuukkk')
    try {
        transaction = await db.sequelize.transaction();
        var newArray = [{ objectjenispelaksana: req.body.jenispelaksana1, objectnamapelaksana: req.body.namapelaksana1 }];
        if (req.body.jenispelaksana2 !== '')
            newArray.push({ objectjenispelaksana: req.body.jenispelaksana2, objectnamapelaksana: req.body.namapelaksana2 });
        if (req.body.jenispelaksana3 !== '')
            newArray.push({ objectjenispelaksana: req.body.jenispelaksana3, objectnamapelaksana: req.body.namapelaksana3 });
        if (req.body.jenispelaksana4 !== '')
            newArray.push({ objectjenispelaksana: req.body.jenispelaksana4, objectnamapelaksana: req.body.namapelaksana4 });
        if (req.body.jenispelaksana5 !== '')
            newArray.push({ objectjenispelaksana: req.body.jenispelaksana5, objectnamapelaksana: req.body.namapelaksana5 });
        if (req.body.jenispelaksana6 !== '')
            newArray.push({ objectjenispelaksana: req.body.jenispelaksana6, objectnamapelaksana: req.body.namapelaksana6 });
        if (req.body.jenispelaksana7 !== '')
            newArray.push({ objectjenispelaksana: req.body.jenispelaksana7, objectnamapelaksana: req.body.namapelaksana7 });
        if (req.body.jenispelaksana8 !== '')
            newArray.push({ objectjenispelaksana: req.body.jenispelaksana8, objectnamapelaksana: req.body.namapelaksana8 });

        const resultlistantreanpemeriksaan = await queryPromise2(`select mh.harga,mh.objectkomponenprodukfk,mk.reportdisplay  from m_hargaproduk mh
        join m_totalhargaprodukbykelas mt on mt.id=mh.objecttotalhargaprodukbykelasfk
        join m_komponenproduk mk on mk.id=mh.objectkomponenprodukfk 
        where mt.objectprodukfk =${req.body.tindakan} and mh.objectkelasfk=${req.body.objectkelasfk}`);
        let norecpp = uuid.v4().substring(0, 32)

        const pelayananpasien = await db.t_pelayananpasien.create({
            norec: norecpp,
            objectantreanpemeriksaanfk: req.body.norecap,
            harga: req.body.hargaproduk,
            qty: req.body.quantity,
            total: req.body.quantity * req.body.hargaproduk,
            tglinput: req.body.tglinput,
            objectprodukfk: req.body.tindakan,
            objectpegawaifk: req.idPegawai,
            objectkelasfk: req.body.objectkelasfk,

        }, { transaction });
        for (let x = 0; x < resultlistantreanpemeriksaan.rowCount; x++) {
            let norecppd = uuid.v4().substring(0, 32)
            const pelayananpasiend = await db.t_pelayananpasiendetail.create({
                norec: norecppd,
                objectpelayananpasienfk: norecpp,
                objectkomponenprodukfk: resultlistantreanpemeriksaan.rows[x].objectkomponenprodukfk,
                harga: resultlistantreanpemeriksaan.rows[x].harga,

            }, { transaction });

        }

        for (let x = 0; x < newArray.length; x++) {
            let norecppp = uuid.v4().substring(0, 32)
            const pelayananpasienp = await db.t_pelayananpasienpetugas.create({
                norec: norecppp,
                objectpelayananpasienfk: norecpp,
                objectpegawaifk: newArray[x].objectnamapelaksana,
                objectjenispelaksanafk: newArray[x].objectjenispelaksana,

            }, { transaction });

        }

        await transaction.commit();
        let tempres = { pelayananpasien: pelayananpasien }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
            res.status(201).send({
                status: error,
                success: false,
                msg: 'Simpan Gagal',
                code: 201
            });
        }
    }

}


module.exports = {
    getListAntreanPemeriksaan,
    getListProdukToKelasToUnit,
    getListJenisPelaksana,
    getListNamaPelaksana,
    saveTindakanPasien
};