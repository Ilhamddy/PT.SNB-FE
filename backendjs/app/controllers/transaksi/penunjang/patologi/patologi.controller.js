import pool from "../../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../../queries/penunjang/radiologi/radiologi.queries';
import db from "../../../../models";
import { createTransaction, dateBetweenEmptyString, emptyIlike, emptyInt } from "../../../../utils/dbutils";
import { getDateEnd, getDateEndNull, getDateStart, getDateStartEnd, getDateStartNull } from "../../../../utils/dateutils";
import radiologiQueries from "../../../../queries/penunjang/radiologi/radiologi.queries";
import { processBody, processQuery } from "../../../../utils/backendUtils";
import m_jenisorder from "../../../../queries/mastertable/m_jenisorder/m_jenisorder";
import patologiAPI from "sharedjs/src/patologi/patologiAPI";
import patologiQueries from "../../../../queries/penunjang/patologi/patologi.queries";
import { iconBelumVerif, iconDitolak, iconSudahVerif } from "./image";
import unitQueries from "../../../../queries/mastertable/unit/unit.queries";
import m_templatepatologiQueries from "../../../../queries/mastertable/m_templatepatologi/m_templatepatologi.queries";
import pegawaiQueries from "../../../../queries/mastertable/pegawai/pegawai.queries";

async function upsertOrderPelayananPatologi(req, res) {
    const logger = res.locals.logger
    try {
        await db.sequelize.transaction(async (transaction) => {
            const body = req.body
    
            const noorder = await hCreateNoOrder(new Date())
            let norec = uuid.v4().substring(0, 32)
            const t_orderpelayanan = await db.t_orderpelayanan.create({
                norec: norec,
                objectjenisorderfk: m_jenisorder.values.patologiAnatomi,
                objectantreanpemeriksaanfk: body.norecap,
                nomororder: noorder,
                objectpegawaifk: req.idPegawai,
                tglinput: new Date(),
                objectunitasalfk: body.objectunitasal,
                objectstatusveriffk: 1,
                keterangan: body.keterangan
            }, { transaction });

            let orderPelayananList = []
            for (let i = 0; i < body.listtindakan.length; ++i) {
                let norecdop = uuid.v4().substring(0, 32)
                const t_detailorderpelayanan = await db.t_detailorderpelayanan.create({
                    norec: norecdop,
                    objectorderpelayananfk: norec,
                    objectprodukfk: body.listtindakan[i].tindakan,
                    objectkelasfk: 8,
                    harga: body.listtindakan[i].harga,
                    objectstatusveriffk: 1,
                    qty: body.listtindakan[i].qty
                }, { transaction });
                orderPelayananList.push(t_detailorderpelayanan.toJSON())
            }
            return {
                orderPelayanan: t_orderpelayanan.toJSON(),
                orderPelayananList: orderPelayananList
            }
        })
        
        res.status(200).send({
            data: req.body,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });
    } catch (error) {
        logger.error(error)
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }
}


const getHistoriPatologi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const q = processQuery(req.query, patologiAPI.qGetHistoriPatologi())
        const resultlist = await pool.query(radiologiQueries.qGetOrderFromDP, [q.norecdp]);
        for (let i = 0; i < resultlist.rows.length; ++i) {
            const resultlistOrder = await pool.query(radiologiQueries.qGetListOrderFromNorec, [resultlist.rows[i].norec]);
            let tempOrder = ''
            for (let x = 0; x < resultlistOrder.rows.length; ++x) {
                tempOrder = tempOrder + resultlistOrder.rows[x].namaproduk + ', '
            }
            resultlist.rows[i].namaproduk = tempOrder
        }
        const histori = resultlist.rows
        let tempres = patologiAPI.rGetHistoriPatologi()
        tempres.histori = histori

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
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

const getListOrderPatologi = async (req, res) => {
    const logger = res.locals.logger
    try {
        const q = processQuery(req.query, patologiAPI.qGetListOrderPatologi())
        const dateStart = getDateStartNull(q.start)
        const dateEnd = getDateEndNull(q.end)

        const resultlist = await pool.query(patologiQueries.qGetListOrderPatologi, 
            [
                q.noregistrasi, 
                dateStart, 
                dateEnd, 
                q.taskid
            ]);

        let tempres = patologiAPI.rGetListOrderPatologi()
        tempres.listOrder = resultlist.rows

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
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

const getIsiOrderByNorec = async(req, res) => {
    const logger = res.locals.logger
    try {
        const q = processQuery(req.query, patologiAPI.qGetIsiOrderPatologi())
        const resultlist = await pool.query(patologiQueries.qGetIsiOrderByNorec, [q.norec]);

        let tempres = patologiAPI.rGetIsiOrderPatologi()
        tempres.isiOrder = resultlist.rows

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
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

const getWidgetOrderPatologi = async (req, res) => {
    const logger = res.locals.logger
    try {
        const q = processQuery(req.query, patologiAPI.qGetWidgetOrderPatologi())
        const dateStart = getDateStart(q.start)
        const dateEnd = getDateEnd(q.end)
        const resultlistantreanpemeriksaan = await pool.query(patologiQueries.qGetWidgetOrderPatologi, [
            dateStart, 
            dateEnd,
            q.taskid,
        ]);

        let totalBelum = 0
        let totalVerif = 0
        let totalTolak = 0
        for (let x = 0; x < resultlistantreanpemeriksaan.rows.length; x++) {
            if (resultlistantreanpemeriksaan.rows[x].objectstatusveriffk == 3) {
                totalTolak = totalTolak + 1
            } else if (resultlistantreanpemeriksaan.rows[x].objectstatusveriffk == 1) {
                totalBelum = totalBelum + 1
            } else {
                totalVerif = totalVerif + 1
            }
        }
        const taskWidgets = [
            {
                id: 1,
                label: "Belum Verif",
                counter: totalBelum,
                badge: "ri-arrow-up-line",
                badgeClass: "success",
                percentage: "17.32 %",
                icon: iconBelumVerif,
                iconClass: "info",
                decimals: 1,
                prefix: "",
                suffix: "k",
            },
            {
                id: 2,
                label: "Sudah Verif",
                counter: totalVerif,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "0.87 %",
                icon: iconSudahVerif,
                iconClass: "warning",
                decimals: 1,
                prefix: "",
                suffix: "k",
            },
            {
                id: 3,
                label: "Ditolak",
                counter: totalTolak,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "2.52 %",
                icon: iconDitolak,
                iconClass: "success",
                decimals: 2,
                prefix: "",
                suffix: "K",
            },

        ];
        const tempres = patologiAPI.rGetWidgetOrderPatologi()
        tempres.widget = taskWidgets
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
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

const updateTanggalRencanaPatologi = async (req, res) => {
    const logger = res.locals.logger
    try {
        const today = new Date().toISOString()
        const b = processBody(req.body, patologiAPI.bUpdateTanggalRencanaPatologi(today))
        await db.sequelize.transaction(async (transaction) => {
            const t_detailorderpelayanan = await db.t_detailorderpelayanan.update({
                tglperjanjian: b.tglinput
            }, {
                where: {
                    norec: req.body.norecselected
                }
            }, { transaction });
            return {t_detailorderpelayanan}
        })

        res.status(200).send({
            data: b,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        logger.error(error)
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }

}

const getDaftarPasienPatologi = async (req, res)  => {
    const logger = res.locals.logger
    try {
        const noregistrasi = req.query.noregistrasi;
        const dateStart = getDateStart(req.query.start);
        const dateEnd = getDateEnd(req.query.end);

        const resultlist = await pool.query(patologiQueries.qGetDaftarPasienPatologi, [
            noregistrasi || '',
            dateStart,
            dateEnd
        ]);

        let tempres = patologiAPI.rGetDaftarPasienPatologi()
        tempres.listPasien = resultlist.rows

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }

}

const verifikasiPatologi = async(req, res) => {
    const logger = res.locals.logger
    try {
        const { t_antreanpemeriksaan } = await db.sequelize.transaction(async (transaction) => {
            const b = processBody(req.body, patologiAPI.bVerifikasiPatologi(new Date().toISOString()))
            const resultlist = await pool.query(queries.qResult, [b.norec]);
            // console.log(resultlist.rows[0].norec)
            let tempres = resultlist.rows[0].norectd
    
            let norecAP = uuid.v4().substring(0, 32)
            const t_antreanpemeriksaan = await db.t_antreanpemeriksaan.create({
                norec: norecAP,
                objectdaftarpasienfk: resultlist.rows[0].norectd,
                tglmasuk: b.tglinput,
                tglkeluar: b.tglinput,
                objectunitfk: unitQueries.daftarUnit.LABORATORIUM_ANATOMI,
                objectkelasfk: 8,
                taskid: 3,
                statusenabled: true,
                objectunitasalfk: resultlist.rows[0].objectunitasalfk,
            }, { transaction });
    
            for (let x = 0; x < resultlist.rows.length; x++) {
                const resultlistantreanpemeriksaan = await pool.query(patologiQueries.qGetAntreanProduk, 
                    [
                        resultlist.rows[x].objectprodukfk
                    ]
                );
    
                let norecpp = uuid.v4().substring(0, 32)
    
                const pelayananpasien = await db.t_pelayananpasien.create({
                    norec: norecpp,
                    objectantreanpemeriksaanfk: norecAP,
                    harga: resultlist.rows[x].harga,
                    qty: resultlist.rows[x].qty,
                    total: resultlist.rows[x].qty * resultlist.rows[x].harga,
                    tglinput: b.tglinput,
                    objectprodukfk: resultlist.rows[x].objectprodukfk,
                    objectpegawaifk: req.idPegawai,
                    objectkelasfk: 8,
    
                }, { transaction });
                for (let i = 0; i < resultlistantreanpemeriksaan.rowCount; i++) {
                    let norecppd = uuid.v4().substring(0, 32)
                    const pelayananpasiend = await db.t_pelayananpasiendetail.create({
                        norec: norecppd,
                        objectpelayananpasienfk: norecpp,
                        objectkomponenprodukfk: resultlistantreanpemeriksaan.rows[i].objectkomponenprodukfk,
                        harga: resultlistantreanpemeriksaan.rows[i].harga,
                        qty: resultlist.rows[x].qty,
                    }, { transaction });
    
                }
                // console.log(pelayananpasien.norec)
                const t_detailorderpelayanan = await db.t_detailorderpelayanan.update({
                    objectpelayananpasienfk: pelayananpasien.norec
                }, {
                    where: {
                        norec: resultlist.rows[x].norec
                    }
                }, { transaction });
            }
    
            const t_orderpelayanan = await db.t_orderpelayanan.update({
                objectpegawaiveriffk: req.idPegawai,
                objectstatusveriffk: 2,
            }, {
                where: {
                    norec: b.norec
                }
            }, { transaction });
            return {
                t_antreanpemeriksaan
            }
        })

        res.status(200).send({
            data: t_antreanpemeriksaan,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        logger.error(error)
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }

}

const tolakOrderPatologi = async(req, res) => {
    const logger = res.locals.logger
    try {
        const b = processBody(req.body, patologiAPI.bTolakOrderPatologi())
        await db.sequelize.transaction(async (transaction) => {
            const t_orderpelayanan = await db.t_orderpelayanan.findByPk(b.norec, {
                transaction: transaction
            })
            await t_orderpelayanan.update({
                objectstatusveriffk: 3,
            }, {
                transaction: transaction
            });
        })

        res.status(200).send({
            data: "Sukses",
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        logger.error(error)
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}

const getTransaksiPelayananPatologiByNorecDp = async (req, res) => {
    const logger = res.locals.logger
    try {
        const q = processQuery(req.query, patologiAPI.qGetTransaksiPelayananPatologiByNorecDp())
        const resultlist = await pool.query(patologiQueries.qGetTransaksiPelayananPatologiByNorecDp, [q.norecdp]);

        let tempres = patologiAPI.rGetTransaksiPelayananPatologiByNorecDp()
        tempres.pelayanan = resultlist.rows
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }
}

const getComboPatologiModal = async (req, res) => {
    const logger = res.locals.logger
    try {

        const resultPegawai = await pool.query(pegawaiQueries.getAll);

        const resultUnit = await pool.query(unitQueries.getAll);

        const resultTemplate = await pool.query(m_templatepatologiQueries.getAll)


        let tempres = patologiAPI.rGetComboPatologiModal()
        tempres.expertise = resultTemplate.rows
        tempres.pegawai = resultPegawai.rows
        tempres.unit = resultUnit.rows

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}


export default {
    upsertOrderPelayananPatologi,
    getHistoriPatologi,
    getListOrderPatologi,
    getIsiOrderByNorec,
    getWidgetOrderPatologi,
    updateTanggalRencanaPatologi,
    getDaftarPasienPatologi,
    verifikasiPatologi,
    tolakOrderPatologi,
    getTransaksiPelayananPatologiByNorecDp,
    getComboPatologiModal
}


export const hCreateNoOrder = async (date) => {
    const today = date ? new Date(date) : new Date()
    const { todayStart, todayEnd} = getDateStartEnd(today)

    let todayMonth = '' + (today.getMonth() + 1)
    if (todayMonth.length < 2)
        todayMonth = '0' + todayMonth;
    let todayDate = '' + (today.getDate())
    if (todayDate.length < 2)
        todayDate = '0' + todayDate;
    const resultcount = await pool.query(`select count(norec) from t_orderpelayanan
    where tglinput between $1 and $2
    `, [todayStart, todayEnd]);

    let noorder = parseFloat(resultcount.rows[0].count) + 1
    for (let x = resultcount.rows[0].count.toString().length; x < 4; x++) {
        noorder = '0' + noorder;
    }
    noorder = 
        'OR' + today.getFullYear() + todayMonth.toString() + noorder
    return noorder
}
