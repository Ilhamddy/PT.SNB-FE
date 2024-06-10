import { BadRequestError, NotFoundError } from "../../../utils/errors";
import db from "../../../models";
import * as uuid from 'uuid'
import pool from "../../../config/dbcon.query";
import queries from "../../../queries/notifikasi/notifikasi.queries"
import { sendMessage } from "../../../../server";

const createNotification = (
    async (param,transaction) => {
        const pegawaiList = await pool.query(queries.qGetChekPegawai,[param.unit]);
        let response
        const all = await Promise.all(
            pegawaiList.rows.map(async (element) => {
                response=await db.t_notifikasi.create({
                    norec: uuid.v4().substring(0,32),
                    statusenabled: true,
                    objectjenisorderfk:param.jenisorder,
                    link:param.link,
                    objectuserfk:element.objectuserfk,
                    isbaca:false,
                    tglinput: new Date(),
                    objectunitfk:param.unit
                }, {
                    transaction: transaction
                })
            })
        )
        sendMessage('Pesan')
        return response
    }
)
export{
    createNotification
}