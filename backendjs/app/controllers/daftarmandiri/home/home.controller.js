import db from "../../../models";
import pool from "../../../config/dbcon.query";
import { qGetJadwalDokter } from "../../../queries/daftarmandiri/home/home.queries";
import { groupBy } from "../../../utils/arutils";
import hariQueries from "../../../queries/master/hari/hari.queries";
import unitQueries from "../../../queries/master/unit/unit.queries";

const getHomePageUser = async (req, res) => {
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
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}



const getJadwalDokter = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let {
            unitid,
            hariid
        } = req.query;
        let dokters = (await pool.query(qGetJadwalDokter, [
            unitid === "" ? -1 : unitid,
            hariid === "" ? -1 : hariid
        ])).rows
        dokters = groupBy(dokters, "dokterid", "doktername", "spesialisasi", "unitdokter")
        const tempres = {
            dokter: dokters
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

const getComboJadwal = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const hari = (await (pool.query(hariQueries.getAll))).rows
        const unit = (await (pool.query(unitQueries.getAll))).rows
        const tempres = {
            hari: hari,
            unit: unit
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
    getHomePageUser,
    getJadwalDokter,
    getComboJadwal
}