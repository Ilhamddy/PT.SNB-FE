import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid';
import db from "../../../models";
import queries from '../../../queries/kiosk/kiosk.queries';
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
        const tempres = {
            unit: unit.rows
        };
        res.status(200).json({
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

export default{
    getComboKiosk
}