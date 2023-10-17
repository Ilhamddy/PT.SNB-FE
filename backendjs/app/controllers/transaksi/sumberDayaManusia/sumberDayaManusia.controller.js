import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import queries from '../../../queries/sumberDayaManusia/sumberDayaManusia.queries';

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

const getDaftarPegawai = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let unit = ' '
        if(req.query.unit !== ''){
            unit =` mp.objectunitfk=${req.query.unit} and `
        }
        let query = queries.qDaftarPegawai + ` where ${unit} (mp.namalengkap ilike '%${req.query.search}%' or 
        mp.nip ilike '%${req.query.search}%') `
        const resultlist = await pool.query(query);
        const tempres = {
            
        };
        console.log(query)
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: resultlist.rows,
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

const getComboSDM = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result1 = await pool.query(queries.qUnit, []);
        const tempres = {
            unit : result1.rows
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
    getDaftarPegawai,
    getComboSDM
}