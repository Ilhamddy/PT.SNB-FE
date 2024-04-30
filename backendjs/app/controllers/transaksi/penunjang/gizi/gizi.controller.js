import pool from "../../../../config/dbcon.query";
import giziQueries from "../../../../queries/penunjang/gizi/gizi.queries";
import db from "../../../../models";
import queryTypes from "sequelize/lib/query-types";
import * as uuid from 'uuid'

const getMasterGizi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultjenisOrder = ((await pool.query(giziQueries.qGetJenisOrder)).rows)
        const resultdiet = ((await pool.query(giziQueries.qGetDiet)).rows)
        const resultmakanan = ((await pool.query(giziQueries.qGetMakanan)).rows)
        const resultkategori = ((await pool.query(giziQueries.qGetKategoriDiet)).rows)
        const tempres = {
            resultjenisOrder,
            resultdiet,
            resultkategori,
            resultmakanan
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}

const getDaftarPasienRanap = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = ((await pool.query(giziQueries.qGetDaftarPasienRanap)).rows)
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}

export default{
    getMasterGizi,
    getDaftarPasienRanap
}