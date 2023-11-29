import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid';
import db from "../../../models";
import queries from '../../../queries/kiosk/kiosk.queries';
import queriesRegistrasi from '../../../queries/transaksi/registrasi.queries';
import { createTransaction } from "../../../utils/dbutils";

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const getComboKiosk = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const unit = await pool.query(queries.qUnit, [])
        const dokter = await pool.query(queries.qDokter, [])
        const tempres = {
            unit: unit.rows,
            dokter: dokter.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getCariPasien = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const pasien = await pool.query(queries.qCariPasien, [req.query.search])

        // const tempres = {
        //     pasien: pasien.rows
        // };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: pasien.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const saveRegistrasiPasienKiosk = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { 
            daftarPasien, 
            antreanPemeriksaan,
            namahafis 
        } = await db.sequelize.transaction(async (transaction) => {
            let queryNamaHafis = `select mp.reportdisplay from m_pegawai mp
            where mp.id='${req.body.iddoktertujuan}'`
            let resultqueryNamaHafis = await pool.query(queryNamaHafis);
            const namahafis = resultqueryNamaHafis.rows[0].reportdisplay
            let norecDP = uuid.v4().substring(0, 32)
            let objectpenjaminfk = req.body.objectpenjaminfk || null
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todayDate = '' + (today.getDate())
            if (todayDate.length < 2)
                todayDate = '0' + todayDate;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            let resultCountNoantrianDokter = await pool.query(queriesRegistrasi.qNoAntrian, [req.body.iddoktertujuan, todaystart, todayend]);
            let noantrian = parseFloat(resultCountNoantrianDokter.rows[0].count) + 1
            let query = `select count(norec) from t_daftarpasien
            where tglregistrasi between '${todaystart}' and '${todayend}'`
            let resultCount = await pool.query(query);
            let noregistrasi = parseFloat(resultCount.rows[0].count) + 1
            for (let x = resultCount.rows[0].count.toString().length; x < 4; x++) {
                if (noregistrasi.toString().length !== 4)
                    noregistrasi = '0' + noregistrasi;
            }
            if (req.body.kelas === "")
                req.body.kelas = 8

            const daftarPasien = await db.t_daftarpasien.create({
                norec: norecDP,
                nocmfk: req.body.nocmfk,
                noregistrasi: today.getFullYear() + todayMonth.toString() + todayDate.toString() + noregistrasi,
                tglregistrasi: new Date(),
                objectunitlastfk: req.body.idnamapoli,
                objectdokterpemeriksafk: req.body.iddoktertujuan,
                objectkelasfk: req.body.kelas,
                objectjenispenjaminfk: req.body.jenispenjamin,
                tglpulang: new Date(),
                objectasalrujukanfk: req.body.rujukanasal,
                objectinstalasifk: req.body.tujkunjungan,
                objectpenjaminfk: objectpenjaminfk,
                objectcaramasukfk: req.body.caramasuk,
                statusenabled: true,
                statuspasien: req.body.statuspasien,
                caradaftar: 'KIOSK'
            }, { transaction });

            let norecAP = uuid.v4().substring(0, 32)
            const antreanPemeriksaan = await db.t_antreanpemeriksaan.create({
                norec: norecAP,
                objectdaftarpasienfk: norecDP,
                tglmasuk: new Date(),
                tglkeluar: new Date(),
                objectdokterpemeriksafk: req.body.iddoktertujuan,
                objectunitfk: req.body.idnamapoli,
                noantrian: noantrian,
                objectkelasfk: req.body.kelas,
                taskid: 3,
                statusenabled: true
            }, {
                transaction: transaction
            });
            return { daftarPasien, antreanPemeriksaan,namahafis }
        });

        const tempres = {
            daftarPasien: daftarPasien,
            antreanPemeriksaan: antreanPemeriksaan,
            dataDaftar: req.body,
            namahafis:namahafis
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const saveAntreanKiosk = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { antreanloket,belumdipanggil } = await db.sequelize.transaction(async (transaction) => {
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todayDate = '' + (today.getDate())
            if (todayDate.length < 2)
                todayDate = '0' + todayDate;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            let query = `select count(norec) from t_antreanloket
            where tglinput between '${todaystart}' and '${todayend}' and objectjenisantreanfk='${req.body.jenisantrean}'`
            let resultCount = await pool.query(query);
            let noantrean = parseFloat(resultCount.rows[0].count) + 1
            let norec = uuid.v4().substring(0, 32)
            const antreanloket = await db.t_antreanloket.create({
                norec: norec,
                objectjenisantreanfk: req.body.jenisantrean,
                tglinput: new Date(),
                objectunitfk: req.body.objectunitfk,
                objectdpjpfk: req.body.iddoktertujuan,
                noantrean: noantrean,
                noantreantext: req.body.namajenisantrean+noantrean,
                ispanggil:1,
            }, { transaction });

            let query2 = `select count(norec) from t_antreanloket
            where tglinput between '${todaystart}' and '${todayend}' and objectjenisantreanfk='${req.body.jenisantrean}' and ispanggil =1`
            let resultBelumDipanggil = await pool.query(query2);
            let belumdipanggil = parseFloat(resultBelumDipanggil.rows[0].count)

            return { antreanloket,belumdipanggil }
        });

        const tempres = {
            antreanloket: antreanloket,
            belumdipanggil:belumdipanggil,
            datasave: req.body
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

export default {
    getComboKiosk,
    getCariPasien,
    saveRegistrasiPasienKiosk,
    saveAntreanKiosk
}