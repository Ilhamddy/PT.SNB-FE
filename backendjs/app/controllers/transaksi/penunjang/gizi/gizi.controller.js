import pool from "../../../../config/dbcon.query";
import giziQueries from "../../../../queries/penunjang/gizi/gizi.queries";
import db from "../../../../models";
import queryTypes from "sequelize/lib/query-types";
import * as uuid from 'uuid'
import { getDateEndNull, getDateStartNull } from "../../../../utils/dateutils";

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
        let filterTglLast = getDateEndNull(req.query.tglorder);
        let filterTglStart = getDateStartNull(req.query.tglorder);
        const result = ((await pool.query(giziQueries.qGetDaftarPasienRanap)).rows)
        const result2 = ((await pool.query(giziQueries.qGetDaftarSudahOrder,[filterTglStart||'',filterTglLast||''])).rows)
        const targetDate = formatDate(req.query.tglorder);
        let filteredData =[]
        if(req.query.sudahorder==='1'){
            filteredData = result2
        }else{
            filteredData = result.filter(item1 =>
                !result2.some(item2 => item2.norecta === item1.norecta)
              );
              
        }
        

        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: filteredData,
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