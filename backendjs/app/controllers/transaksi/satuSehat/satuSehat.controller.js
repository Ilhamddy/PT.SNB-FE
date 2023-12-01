import pool from "../../../config/dbcon.query";
import db from "../../../models";
import instalasiQueries from "../../../queries/mastertable/instalasi/instalasi.queries";

const getListInstalasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const instalasi = await pool.query(instalasiQueries.getAll)
       
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: instalasi.rows,
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
    getListInstalasi
}