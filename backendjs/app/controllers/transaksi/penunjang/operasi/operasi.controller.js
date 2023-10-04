import pool from "../../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../../queries/penunjang/radiologi/radiologi.queries';
import db from "../../../../models";

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

const saveOrderOperasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { orderOperasi } = await db.sequelize.transaction(async (transaction) => {
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'

            const resultcount = await queryPromise2(`select count(norec) from t_orderoperasi
            where tglinput between '${todaystart}' and '${todayend}'
            `);

            let noorder = parseFloat(resultcount.rows[0].count) + 1
            for (let x = resultcount.rows[0].count.toString().length; x < 4; x++) {
                noorder = '0' + noorder;
            }
            let norec = uuid.v4().substring(0, 32)
            const orderOperasi = await db.t_orderoperasi.create({
                norec: norec,
                statusenabled: true,
                objectantreanpemeriksaanfk: req.body.objectantreanpemeriksaanfk,
                nomororder: 'OK' + today.getFullYear() + todayMonth.toString() + noorder,
                namaoperasi: req.body.namaoperasi,
                objectdokteroperatorfk: req.body.dokterOperator,
                tglrencana: req.body.rencanaOperasi,
                objecticdxfk: req.body.kodediagnosa,
                iscito: req.body.formCheckCito !== true ? false : req.body.formCheckCito,
                catatanorder: req.body.catatan,
                objectpegawaiorderfk: req.idPegawai,
                objectunitasalfk: req.body.unitlast,
                objectjenisoperasifk: req.body.jenisOperasi,
                tglinput: new Date(),

            }, { transaction });

            return { orderOperasi }
        });

        const tempres = {
            orderOperasi: orderOperasi
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
    saveOrderOperasi
}