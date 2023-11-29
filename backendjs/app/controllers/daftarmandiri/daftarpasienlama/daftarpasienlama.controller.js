import db from "../../../models";
import * as uuid from 'uuid';
import pool from "../../../config/dbcon.query";
import { qGetDokter } from "../../../queries/daftarmandiri/daftarpasienlama/daftarpasienlama.queries";
import { groupBy } from "../../../utils/arutils";
import unitQueries from "../../../queries/mastertable/unit/unit.queries";
import pegawaiQueries from "../../../queries/mastertable/pegawai/pegawai.queries";
import rekananQueries from "../../../queries/mastertable/rekanan/rekanan.queries";
import { qGetDaftarPasienLama } from "../../../queries/daftarmandiri/daftarpasienlama/daftarpasienlama.queries";
import queriesRegistrasi from '../../../queries/transaksi/registrasi.queries';



const getPasienLama = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const pasien = await pool.query(qGetDaftarPasienLama, [req.id])
        const isNotPasienSementara = (pasien.rows?.[0]?.nocm || null) !== null
        const tempres = {
            pasien: pasien.rows?.[0] || null,
            isNotPasienSementara: isNotPasienSementara
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getComboDaftar = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const poliklinik = (await pool.query(unitQueries.getPoliklinik)).rows
        const dokter = (await pool.query(pegawaiQueries.getDokter)).rows
        const penjamin = (await pool.query(rekananQueries.getPenjamin)).rows

        const tempres = {
            poliklinik,
            dokter,
            penjamin
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getDokter = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const iddokter = req.query.iddokter
        console.log(iddokter)
        const dokter = (await pool.query(qGetDokter, [iddokter])).rows?.[0]
        const tempres = {
            dokter: dokter || null
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const savePasienMandiri = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {daftarPasien, antreanPemeriksaan} = await db.sequelize.transaction(async (transaction) => {
            const {dokter, penjamin, nocmfk, poliklinik, jenispenjamin, jadwal} = req.body
            let norecDP = uuid.v4().substring(0, 32)
            let objectpenjaminfk = penjamin || null

            let todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0)
            let todayEnd = new Date();
            todayEnd.setHours(23, 59, 59, 999)
            let resultCountNoantrianDokter = await pool.query(queriesRegistrasi.qNoAntrian, [dokter, todayStart, todayEnd]);
            let noantrian = parseFloat(resultCountNoantrianDokter.rows[0].count) + 1
            const noreservasi = await hCreateNores(jadwal)
            const noregistrasi = await hCreateNoreg(jadwal)
            const pasien = (await pool.query(qGetDaftarPasienLama, [req.id])).rows[0]
            let statuspasien = 'LAMA'
            if(pasien?.tgldaftar > todayStart && pasien?.tgldaftar < todayEnd){
                statuspasien = 'BARU'
            }

            const daftarPasien = await db.t_daftarpasien.create({
                norec: norecDP,
                nocmfk: nocmfk,
                noregistrasi: !pasien.nocm ? null : noregistrasi,
                tglregistrasi: !pasien.nocm ? null : new Date(jadwal),
                objectunitlastfk: poliklinik,
                objectdokterpemeriksafk: dokter,
                objectpegawaifk: null,
                objectkelasfk: 8,
                objectjenispenjaminfk: jenispenjamin,
                statuspasien: statuspasien,
                tglpulang: null,
                objectasalrujukanfk: null,
                objectinstalasifk: 1,
                objectpenjaminfk: objectpenjaminfk,
                objectpenjamin2fk: null,
                objectpenjamin3fk: null,
                objectpjpasienfk: null,
                objectcaramasukfk: null,
                statusenabled: true,
                caradaftar: 'RO'
            }, { transaction });
            const norecRegistrasi = uuid.v4().substring(0, 32);
            const regisOnline = await db.t_registrasionline.create({
                norec: norecRegistrasi,
                kdprofile: 0,
                statusenabled: true,
                nocmfk: daftarPasien.nocmfk,
                noreservasi: "R" + noreservasi,
                objectunitfk: poliklinik,
                objectdokterfk: dokter,
                tglrencana: new Date(jadwal),
                objectjadwaldokterfk: null,
                tglinput: new Date(),
                objectdaftarpasienfk: daftarPasien.norec
            }, {
                transaction: transaction
            });
            let norecAP = uuid.v4().substring(0, 32);
            let antreanPemeriksaan = null
            if(pasien.nocm){
                antreanPemeriksaan = await db.t_antreanpemeriksaan.create({
                    norec: norecAP,
                    objectdaftarpasienfk: norecDP,
                    tglmasuk: new Date(jadwal),
                    tglkeluar: null,
                    objectdokterpemeriksafk: dokter,
                    objectunitfk: poliklinik,
                    noantrian: noantrian,
                    objectkamarfk: null,
                    objectkelasfk: null,
                    nobed: null,
                    taskid: 3,
                    statusenabled: true
                }, {
                    transaction: transaction
                });
            }

            return { daftarPasien, antreanPemeriksaan }
        });
        let tempres = {
            daftarPasien: daftarPasien,
            antreanPemeriksaan: antreanPemeriksaan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getRiwayatPasien = async (req, res) => {
    const logger = res.locals.logger;
    try{
        
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

export default {
    getPasienLama,
    getComboDaftar,
    getDokter,
    savePasienMandiri
}

export const hCreateNoreg = async (date) => {
    let today = new Date(date);
    let todayStart = new Date(date);
    todayStart.setHours(0, 0, 0, 0)
    let todayEnd = new Date(date);
    todayEnd.setHours(23, 59, 59, 999)
    let todayMonth = '' + (today.getMonth() + 1)
    if (todayMonth.length < 2)
        todayMonth = '0' + todayMonth;
    let todayDate = '' + (today.getDate())
    if (todayDate.length < 2)
        todayDate = '0' + todayDate;
    let query = `select count(norec) from t_daftarpasien
    where tglregistrasi between $1 and $2`
    let resultCount = await pool.query(query, [todayStart, todayEnd]);
    let noregistrasi = parseFloat(resultCount.rows[0].count) + 1
    for (let x = resultCount.rows[0].count.toString().length; x < 4; x++) {
        if (noregistrasi.toString().length !== 4)
            noregistrasi = '0' + noregistrasi;
    }
    noregistrasi = 
        today.getFullYear() + todayMonth.toString() + todayDate.toString() + noregistrasi
    return noregistrasi
}

export const hCreateNores = async (date) => {
    let today = new Date(date);
    let todayStart = new Date(date);
    todayStart.setHours(0, 0, 0, 0)
    let todayEnd = new Date(date);
    todayEnd.setHours(23, 59, 59, 999)
    let todayMonth = '' + (today.getMonth() + 1)
    if (todayMonth.length < 2)
        todayMonth = '0' + todayMonth;
    let todayDate = '' + (today.getDate())
    if (todayDate.length < 2)
        todayDate = '0' + todayDate;
    let query = `select count(norec) from t_registrasionline
    where tglrencana between $1 and $2`
    let resultCount = await pool.query(query, [todayStart, todayEnd]);
    let noregistrasi = parseFloat(resultCount.rows[0].count) + 1
    for (let x = resultCount.rows[0].count.toString().length; x < 4; x++) {
        if (noregistrasi.toString().length !== 4)
            noregistrasi = '0' + noregistrasi;
    }
    noregistrasi = 
        today.getFullYear() + todayMonth.toString() + todayDate.toString() + noregistrasi
    return noregistrasi
}