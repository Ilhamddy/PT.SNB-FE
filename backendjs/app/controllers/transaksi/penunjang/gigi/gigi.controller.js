import db from "../../../../models";
import {qGetAllGigi} from "../../../../queries/penunjang/gigi/gigi.queries";
import queryTypes from "sequelize/lib/query-types";




const getAllGigi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const allGigi = await db.sequelize.query(qGetAllGigi, {
            type: queryTypes.SELECT,
        })
        const tempres = {
            allGigi: allGigi
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


export default {
    getAllGigi
}