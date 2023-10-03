import db from "../../../models";
import pool from "../../../config/dbcon.query";
import { qGetDokter } from "../../../queries/daftarmandiri/daftarpasienlama/daftarpasienlama.queries";
import { groupBy } from "../../../utils/arutils";
import hariQueries from "../../../queries/master/hari/hari.queries";
import unitQueries from "../../../queries/master/unit/unit.queries";
import pegawaiQueries from "../../../queries/master/pegawai/pegawai.queries";
import rekananQueries from "../../../queries/master/rekanan/rekanan.queries";
import { qGetDaftarPasienLama } from "../../../queries/daftarmandiri/daftarpasienlama/daftarpasienlama.queries";

const getPasienLama = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const pasien = await pool.query(qGetDaftarPasienLama, [req.id])
        const tempres = {
            pasien: pasien.rows?.[0] || null
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

export default {
    getPasienLama,
    getComboDaftar,
    getDokter
}