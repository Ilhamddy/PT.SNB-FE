import pool from "../../../config/dbcon.query";
import queries from "../../../queries/notifikasi/notifikasi.queries"
import db from "../../../models";

const getListNotifikasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const pegawaiList = (await pool.query(queries.qGetListNotification,[req.userId])).rows;
        const unreadNotifications = pegawaiList.filter(notification => !notification.isbaca);
        const tempres = {
            list:pegawaiList,
            unread:unreadNotifications
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

const updateStatusBaca = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {updateBaca}=await db.sequelize.transaction(async (transaction) => {
            const updateBaca = await db.t_notifikasi.update({
                isbaca: true,
            }, {
                where: {
                    norec: req.body.norec
                },
                transaction: transaction
            });
            return {updateBaca}
        });
        
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: updateBaca,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

export default{
    getListNotifikasi,
    updateStatusBaca
}