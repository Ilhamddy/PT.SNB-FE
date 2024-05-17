import pool from "../../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../../queries/penunjang/operasi/operasi.queries';
import db from "../../../../models";
import { imageBelumVerif, imageDitolak, imageVerifikasi } from "./image";

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

const getHistoriOrderOperasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const result = await queryPromise2(`select nocmfk from t_daftarpasien
            where norec='${req.query.norecdp}'
            `);
        // console.log(result.rows[0].nocmfk)
        const resultlist = await pool.query(queries.qResult, [result.rows[0].nocmfk]);

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

const getWidgetOrderOperasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const resultlist = await pool.query(queries.qWidgetOrderOperasi, [req.query.dateStart, req.query.dateEnd]);

        const taskWidgets = [
            {
                id: 1,
                label: "Belum Diverif",
                counter: resultlist.rows[0].menunggu,
                badge: "ri-arrow-up-line",
                color: "#B7DBFD",
                decimals: 1,
                iconClass: "info",
                icon: imageBelumVerif,
            },
            {
                id: 2,
                label: "Sudah Diverif",
                counter: resultlist.rows[0].verifikasi,
                badge: "ri-arrow-down-line",
                color: "#FDB7B7",
                decimals: 1,
                iconClass: "warning",
                icon: imageVerifikasi,
            },
            {
                id: 3,
                label: "Ditolak",
                counter: resultlist.rows[0].tolak,
                badge: "ri-arrow-down-line",
                color: "#FCFDB7",
                decimals: 1,
                iconClass: "success",
                icon: imageDitolak,
            },
        ];
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: taskWidgets,
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

const getDaftarOrderOperasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let unit = ' '
        if (req.query.unitOrder !== '') {
            unit = ` and x.objectunitasalfk=${req.query.unitOrder}`
        }
        let search = ' '
        if (req.query.search !== undefined)
            search = req.query.search
        let statusOperasi = ' '
        if (req.query.status === '2') {
            statusOperasi = ` and x.objectstatusoperasifk in (2,3,4)`
        }
        let todaystart = formatDate(req.query.dateStart) + ' 00:00'
        let todayend = formatDate(req.query.dateEnd) + ' 23:59'

        let query = queries.qDaftarOrderOperasi + ` where x.tglinput between '${todaystart}' and '${todayend}' ${unit} and x.namapasien ilike '%${search}%' ${statusOperasi}`
        const resultlist = await pool.query(query);
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

const getComboOperasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const result1 = await pool.query(queries.qStatusVerifikasi, []);
        const result2 = await pool.query(queries.qPegawai, []);
        const result3 = await pool.query(queries.qJenisOperasi, []);
        const result4 = await pool.query(queries.qKamarOperasi, []);
        const tempres = {
            statusverifikasi: result1.rows,
            pegawai: result2.rows,
            jenisoperasi: result3.rows,
            kamaroperasi: result4.rows
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

const updateOrderOperasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { orderOperasi,antreanpemeriksaan } = await db.sequelize.transaction(async (transaction) => {
            let norecAP = uuid.v4().substring(0, 32)
            const antreanpemeriksaan = await db.t_antreanpemeriksaan.create({
                norec: norecAP,
                objectdaftarpasienfk: req.body.norecdp,
                tglmasuk: req.body.rencanaOperasi,
                tglkeluar: req.body.rencanaOperasi,
                objectunitfk: 11,
                objectkelasfk: 8,
                taskid: 3,
                statusenabled: true,
                objectunitasalfk: req.body.objectunitasalfk,
                objectkamarfk:req.body.kamarOperasi
            }, { transaction });

            const orderOperasi = await db.t_orderoperasi.update({
                tglrencana: req.body.rencanaOperasi,
                iscito: req.body.formCheckCito !== true ? false : req.body.formCheckCito,
                namaoperasi: req.body.namaoperasi,
                objectdokteroperatorfk: req.body.drOperator,
                objectjenisoperasifk: req.body.jenisOperasi,
                objectkamarfk: req.body.kamarOperasi,
                objectpegawaiveriffk: req.idPegawai,
                catatanverif: req.body.catatanVerifikasi,
                objectstatusoperasifk: req.body.statusVerifikasi,
                tglverif: new Date(),
                objectantreanpemeriksaanoperasifk:norecAP
            }, {
                where: {
                    norec: req.body.norec,
                },
                transaction: transaction
            });

            return { orderOperasi, antreanpemeriksaan }
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

const getDaftarPasienOperasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let unit = ' '
        if (req.query.unitOrder !== '') {
            unit = ` and x.objectunitasalfk=${req.query.unitOrder}`
        }
        let search = ' '
        if (req.query.search !== undefined)
            search = req.query.search
        let statusOperasi = ' '
        // if (req.query.status === '2') {
        //     statusOperasi = ` and x.objectstatusoperasifk in (2,3,4)`
        // }
        let query = queries.qDaftarPasienOperasi + ` where x.tglinput between '${req.query.dateStart}' and '${req.query.dateEnd}' ${unit} and x.namapasien ilike '%${search}%' ${statusOperasi}`
        const resultlist = await pool.query(query);
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

export default {
    saveOrderOperasi,
    getHistoriOrderOperasi,
    getWidgetOrderOperasi,
    getDaftarOrderOperasi,
    getComboOperasi,
    updateOrderOperasi,
    getDaftarPasienOperasi
}