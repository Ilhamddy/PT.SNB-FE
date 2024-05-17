import pool from "../../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../../queries/penunjang/radiologi/radiologi.queries';
import db from "../../../../models";
import { createTransaction, dateBetweenEmptyString, emptyIlike, emptyInt } from "../../../../utils/dbutils";
import { getDateEnd, getDateStart, getDateStartNull } from "../../../../utils/dateutils";
import { iconBelumVerif, iconDitolak, iconSudahVerif } from "./image";
import radiologiQueries from "../../../../queries/penunjang/radiologi/radiologi.queries";
import { processQuery } from "../../../../utils/backendUtils";

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

async function saveOrderPelayanan(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        let today = new Date();
        let todayMonth = '' + (today.getMonth() + 1)
        if (todayMonth.length < 2)
            todayMonth = '0' + todayMonth;
        let todaystart = formatDate(today)
        let todayend = formatDate(today) + ' 23:59'

        const resultcount = await queryPromise2(`select count(norec) from t_orderpelayanan
        where tglinput between '${todaystart}' and '${todayend}'
        `);

        let noorder = parseFloat(resultcount.rows[0].count) + 1
        for (let x = resultcount.rows[0].count.toString().length; x < 4; x++) {
            noorder = '0' + noorder;
        }
        let norec = uuid.v4().substring(0, 32)
        const t_orderpelayanan = await db.t_orderpelayanan.create({
            norec: norec,
            objectjenisorderfk: 2,
            objectantreanpemeriksaanfk: req.body.norecap,
            nomororder: 'OR' + today.getFullYear() + todayMonth.toString() + noorder,
            objectpegawaifk: req.idPegawai,
            tglinput: new Date(),
            objectunitasalfk: req.body.objectunitasal,
            objectstatusveriffk: 1,
            keterangan: req.body.keterangan
        }, { transaction });

        for (var i = 0; i < req.body.listtindakan.length; ++i) {
            let norecdop = uuid.v4().substring(0, 32)
            const t_detailorderpelayanan = await db.t_detailorderpelayanan.create({
                norec: norecdop,
                objectorderpelayananfk: norec,
                objectprodukfk: req.body.listtindakan[i].tindakan,
                objectkelasfk: 8,
                harga: req.body.listtindakan[i].harga,
                objectstatusveriffk: 1,
                qty: req.body.listtindakan[i].qty
            }, { transaction });

        }
        await transaction.commit();
        res.status(200).send({
            data: req.body,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });



        // let tempres = { statu: t_rm_lokasidokumen }

    } catch (error) {
        logger.error(error)
        transaction && await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }
}

async function getListHistoryOrder(req, res) {
    const logger = res.locals.logger
    try {

        const resultlist = await queryPromise2(`select td.noregistrasi,to2.nomororder,to2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput  from t_daftarpasien td 
        join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
        join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
        join m_pegawai mp on mp.id=to2.objectpegawaifk 
        join m_unit mu ON mu.id=ta.objectunitfk 
        where td.norec='${req.query.norecdp}' and to2.objectjenisorderfk=2
        `);
        for (var i = 0; i < resultlist.rows.length; ++i) {
            const resultlistOrder = await queryPromise2(`select mp.namaproduk  from t_detailorderpelayanan td  
            join m_produk mp on mp.id=td.objectprodukfk where
            td.objectorderpelayananfk ='${resultlist.rows[i].norec}'`);
            let tempOrder = ''
            for (var x = 0; x < resultlistOrder.rows.length; ++x) {
                tempOrder = tempOrder + resultlistOrder.rows[x].namaproduk + ', '
            }
            resultlist.rows[i].namaproduk = tempOrder
        }
        let tempres = resultlist.rows

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

async function getWidgetListDaftarOrderRadiologi(req, res) {
    const logger = res.locals.logger
    try {
        const {start, end, taskid} = processQuery(req.query)
        const dateStart = getDateStart(start)
        const dateEnd = getDateEnd(end)
        const resultlistantreanpemeriksaan = await pool.query(radiologiQueries.qGetWidgetRadiologi, [
            dateStart, 
            dateEnd,
            taskid,
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
        res.status(200).send({
            data: taskWidgets,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error);
        res.status(500).send({ message: error });
    }

}

async function getDaftarListHistoryOrder(req, res) {
    const logger = res.locals.logger
    try {
        let tglregistrasi = ""
        const {start, end, noregistrasi, taskid} = processQuery(req.query)
        const dateStart = getDateStartNull(start)
        const dateEnd = getDateStartNull(end)

        const resultlist = await pool.query(radiologiQueries.qGetDaftarListHistoryOrder, 
            [
                noregistrasi, 
                dateStart, 
                dateEnd, 
                taskid
            ]);

        let tempres = resultlist.rows

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error);
        res.status(500).send({ message: error });
    }

}

async function getListOrderByNorecOrder(req, res) {
    const logger = res.locals.logger
    try {
        const norec = req.query.norec
        const resultlist = await pool.query(radiologiQueries.qGetListOrderByNorec, [norec]);

        let tempres = resultlist.rows

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

async function getKamarRadiologi(req, res) {
    const logger = res.locals.logger
    try {
        const resultlist = await queryPromise2(`select id as value, reportdisplay as label from m_kamar 
        where objectunitfk =13
        `);

        let tempres = resultlist.rows

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

async function updateTglRencanaRadiologi(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const t_detailorderpelayanan = await db.t_detailorderpelayanan.update({
            objectkamarfk: req.body.nokamar,
            tglperjanjian: req.body.tglinput,
        }, {
            where: {
                norec: req.body.norecselected
            }
        }, { transaction });
        await transaction.commit();

        res.status(200).send({
            data: t_detailorderpelayanan,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        logger.error(error)
        transaction && await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }

}

async function saveUserVerifikasi(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const resultlist = await pool.query(queries.qResult, [req.body.norec]);
        // console.log(resultlist.rows[0].norec)
        let tempres = resultlist.rows[0].norectd

        let norecAP = uuid.v4().substring(0, 32)
        const t_antreanpemeriksaan = await db.t_antreanpemeriksaan.create({
            norec: norecAP,
            objectdaftarpasienfk: resultlist.rows[0].norectd,
            tglmasuk: req.body.tglinput,
            tglkeluar: req.body.tglinput,
            objectunitfk: 13,
            objectkelasfk: 8,
            taskid: 3,
            statusenabled: true,
            objectunitasalfk: resultlist.rows[0].objectunitasalfk,
        }, { transaction });

        for (let x = 0; x < resultlist.rows.length; x++) {
            const resultlistantreanpemeriksaan = await queryPromise2(`select mh.harga,mh.objectkomponenprodukfk,mk.reportdisplay  from m_hargaprodukperkomponen mh
        join m_totalhargaprodukbykelas mt on mt.id=mh.objecttotalhargaprodukbykelasfk
        join m_komponenproduk mk on mk.id=mh.objectkomponenprodukfk 
        where mt.objectprodukfk =${resultlist.rows[x].objectprodukfk} and mt.objectkelasfk=8`);

            let norecpp = uuid.v4().substring(0, 32)

            const pelayananpasien = await db.t_pelayananpasien.create({
                norec: norecpp,
                objectantreanpemeriksaanfk: norecAP,
                harga: resultlist.rows[x].harga,
                qty: resultlist.rows[x].qty,
                total: resultlist.rows[x].qty * resultlist.rows[x].harga,
                tglinput: req.body.tglinput,
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
                norec: req.body.norec
            }
        }, { transaction });
        await transaction.commit();

        res.status(200).send({
            data: t_antreanpemeriksaan,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        transaction && await transaction.rollback();
        logger.error(error)
        res.status(201).send({
            status: "false",
            success: false,
            msg: error,
            code: 201
        });
    }

}

async function deleteOrderPelayanan(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const t_orderpelayanan = await db.t_orderpelayanan.update({
            objectstatusveriffk: 3,

        }, {
            where: {
                norec: req.body.norec
            }
        }, { transaction });
        await transaction.commit();

        res.status(200).send({
            data: t_orderpelayanan,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        logger.error(error)
        await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }

}

async function deleteDetailOrderPelayanan(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const t_detailorderpelayanan = await db.t_detailorderpelayanan.update({
            statusenabled: false,

        }, {
            where: {
                norec: req.body.norec
            }
        }, { transaction });
        await transaction.commit();

        res.status(200).send({
            data: t_detailorderpelayanan,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        logger.error(error)
        transaction && await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }

}

async function getDaftarPasienRadiologi(req, res) {
    const logger = res.locals.logger
    try {
        const noregistrasi = req.query.noregistrasi;
        const dateStart = getDateStart(req.query.start);
        const dateEnd = getDateEnd(req.query.end);

        const resultlist = await pool.query(queries.qGetDaftarPasienRadiologi, [
            noregistrasi || '',
            dateStart,
            dateEnd
        ]);

        let tempres = resultlist.rows

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

async function getTransaksiPelayananRadiologiByNorecDp(req, res) {
    const logger = res.locals.logger
    try {
        const resultlist = await pool.query(radiologiQueries.qGetTransaksiPelayananRadiologiByNorecDp, [req.query.norecdp]);

        let tempres = resultlist.rows

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

async function getComboRadiologi(req, res) {
    const logger = res.locals.logger
    try {

        const resultlist = await queryPromise2(`select id as value,namalengkap as label from m_pegawai where statusenabled=true`);

        const resultlist2 = await queryPromise2(`select id as value,namaunit  as label from m_unit mu where statusenabled=true`);

        const resultlist3 = await queryPromise2(`select id as value,pemeriksaan as label,expertise from m_templateradiologi where statusenabled=true`)


        let tempres = { pegawai: resultlist.rows, unit: resultlist2.rows, expertise: resultlist3.rows }

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

async function saveHasilExpertise(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        let tempData = req.body
        let saveHasilPemeriksaan
        let norechasilpemeriksaan = uuid.v4().substring(0, 32)
        if (tempData.norecexpertise === null) {

            saveHasilPemeriksaan = await db.t_hasilpemeriksaan.create({
                norec: norechasilpemeriksaan,
                statusenabled: true,
                objectpelayananpasienfk: tempData.norecpel,
                objectpegawaiinputfk: req.idPegawai,
                objectpegawaiupdatefk: req.idPegawai,
                tglinput: new Date(),
                tglupdate: new Date(),
                nofoto:tempData.foto,
                expertise:tempData.expertise
            }, {
                transaction: transaction
            })


        } else {
            saveHasilPemeriksaan = await db.t_hasilpemeriksaan.update({
                objectpelayananpasienfk: tempData.norecpel,
                objectpegawaiinputfk: req.idPegawai,
                objectpegawaiupdatefk: req.idPegawai,
                tglinput: new Date(),
                tglupdate: new Date(),
                nofoto:tempData.foto,
                expertise:tempData.expertise
            }, {
                where: {
                    norec: tempData.norecexpertise
                },
                transaction: transaction
            })
        }



        await transaction.commit();
        let tempres = { tempData }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });
    } catch (error) {
        transaction && await transaction.rollback();
        logger.error(error)
        res.status(201).send({
            status: "false",
            success: false,
            msg: error,
            code: 201
        });
    }

}

export default {
    saveOrderPelayanan,
    getListHistoryOrder,
    getWidgetListDaftarOrderRadiologi,
    getDaftarListHistoryOrder,
    getListOrderByNorecOrder,
    getKamarRadiologi,
    updateTglRencanaRadiologi,
    saveUserVerifikasi,
    deleteOrderPelayanan,
    deleteDetailOrderPelayanan,
    getDaftarPasienRadiologi,
    getTransaksiPelayananRadiologiByNorecDp,
    getComboRadiologi,
    saveHasilExpertise
};