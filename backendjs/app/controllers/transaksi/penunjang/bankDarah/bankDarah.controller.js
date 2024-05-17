import pool from "../../../../config/dbcon.query";
import queryBankDarah from "../../../../queries/penunjang/bankDarah/bankDarah.queries"
import db from "../../../../models";
import queryTypes from "sequelize/lib/query-types";
import * as uuid from 'uuid'
import { getDateEndNull, getDateStartNull } from "../../../../utils/dateutils";
import { imageBelumVerif, imageDitolak, imageSudahVerif } from "./image";

const getDetailJenisProdukBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultlist = await pool.query(`select id as value, detailjenisproduk as label,'' as detail  from m_detailjenisproduk md 
        where md.objectjenisprodukfk = 14 and md.statusenabled=true
        `);
        for (var i = 0; i < resultlist.rows.length; ++i) {

            const resultlistOrder = await pool.query(`select
            mp2.id,mp2.id as value,
            mp2.namaproduk as label,
            1 as level,mp2.objectdetailjenisprodukfk,0 as harga,0 as totalharga
        from
            m_produk mp2 
            where mp2.objectdetailjenisprodukfk = '${resultlist.rows[i].value}' and mp2.statusenabled=true
            order by mp2.namaproduk`);
            resultlist.rows[i].detail = resultlistOrder.rows
            for (var x = 0; x < resultlistOrder.rows.length; ++x) {
                let dataGet = (await pool.query(queryBankDarah.qGetDarahFromUnit, [resultlistOrder.rows[x].value])).rows[0]
                resultlistOrder.rows[x].harga = dataGet.totalharga,
                resultlistOrder.rows[x].totalharga = dataGet.totalharga
            }
        }
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: resultlist.rows,
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

const upsertOrderPelayananBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { t_orderpelayanan,t_detailorderpelayanan}=await db.sequelize.transaction(async (transaction) => {
            let t_detailorderpelayanan
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todayDate = '' + (today.getDate())
            if (todayDate.length < 2)
                    todayDate = '0' + todayDate;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'

            const resultcount = (await db.sequelize.query(`select count(norec) from t_orderpelayanan
            where tglinput between :todaystart and :todayend and objectjenisorderfk=4`, {
                replacements: {
                    todaystart: todaystart,
                    todayend:todayend
                },
                transaction: transaction,
                type: queryTypes.SELECT
            }))[0]
            let noorder = parseFloat(resultcount.count) + 1
            for (let x = resultcount.count.toString().length; x < 4; x++) {
                noorder = '0' + noorder;
            }
            let norec = uuid.v4().substring(0, 32)
            const t_orderpelayanan = await db.t_orderpelayanan.create({
                norec: norec,
                objectjenisorderfk: 4,
                objectantreanpemeriksaanfk: req.body.norecap,
                nomororder: 'OBDR' + today.getFullYear() + todayMonth.toString()+todayDate.toString() + noorder,
                objectpegawaifk: req.idPegawai,
                tglinput: new Date(),
                objectunitasalfk: req.body.objectunitasal,
                objectstatusveriffk: 1,
                keterangan: req.body.keterangan
            }, { transaction });

            for (var i = 0; i < req.body.listtindakan.length; ++i) {
                let norecdop = uuid.v4().substring(0, 32)
                t_detailorderpelayanan = await db.t_detailorderpelayanan.create({
                    norec: norecdop,
                    objectorderpelayananfk: norec,
                    objectprodukfk: req.body.listtindakan[i].value,
                    objectkelasfk: 8,
                    harga: req.body.listtindakan[i].harga,
                    objectstatusveriffk: 1,
                    qty: req.body.listtindakan[i].totalpesan
                }, { transaction });

            }
            return {t_orderpelayanan,t_detailorderpelayanan}
        });
        
        const tempres = {
            t_orderpelayanan,t_detailorderpelayanan
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
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

const getRiwayatOrderBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultlist = await pool.query(`select td.noregistrasi,to2.nomororder,to2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput  from t_daftarpasien td 
        join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
        join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
        join m_pegawai mp on mp.id=to2.objectpegawaifk 
        join m_unit mu ON mu.id=ta.objectunitfk 
        where td.norec='${req.query.norecdp}' and to2.objectjenisorderfk=4
        `);
        for (var i = 0; i < resultlist.rows.length; ++i) {
            const resultlistOrder = await pool.query(`select mp.namaproduk  from t_detailorderpelayanan td  
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

const getWidgetDaftarOrderBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let filterTglLast = getDateEndNull(req.query.dateEnd);
        let filterTglStart = getDateStartNull(req.query.dateStart);
        const result = (await pool.query(queryBankDarah.qGetDaftarOrderBankDarah, [filterTglStart || "",filterTglLast||""])).rows
        let totalBelum = 0
        let totalVerif = 0
        let totalTolak = 0
        for (let x = 0; x < result.length; x++) {
            if (result[x].objectstatusveriffk == 3) {
                totalTolak = totalTolak + 1
            } else if (result[x].objectstatusveriffk == 1) {
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
                icon: imageBelumVerif,
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
                icon: imageSudahVerif,
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
                icon: imageDitolak,
                iconClass: "success",
                decimals: 2,
                prefix: "",
                suffix: "K",
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
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}
const getDaftarOrderBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let filterTglLast = getDateEndNull(req.query.dateEnd);
        let filterTglStart = getDateStartNull(req.query.dateStart);
        const result = (await pool.query(queryBankDarah.qGetDaftarOrderBankDarah, [filterTglStart || "",filterTglLast||""])).rows
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result,
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

const getListOrderByNorecOrder = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = (await pool.query(queryBankDarah.qGetDaftarOrderBankDarahByNorec, [req.query.norec])).rows
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result,
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
const updateTglRencanaBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {t_detailorderpelayanan}=await db.sequelize.transaction(async (transaction) => {
            const t_detailorderpelayanan = await db.t_detailorderpelayanan.update({
                objectkamarfk: req.body.nokamar,
                tglperjanjian: req.body.tglinput,
            }, {
                where: {
                    norec: req.body.norecselected
                }
            }, { transaction });
            return {t_detailorderpelayanan}
        });
        
        const tempres = {
            t_detailorderpelayanan
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
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

const postVerifikasiOrderBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {t_antreanpemeriksaan,pelayananpasien}=await db.sequelize.transaction(async (transaction) => {
            let pelayananpasien
            const resultlist = await pool.query(queryBankDarah.qGetDaftarOrderBankDarahByNorec, [req.body.norec]);
            // console.log(resultlist.rows[0].norec)
            let tempres = resultlist.rows[0].norectd

            let norecAP = uuid.v4().substring(0, 32)
            const t_antreanpemeriksaan = await db.t_antreanpemeriksaan.create({
                norec: norecAP,
                objectdaftarpasienfk: resultlist.rows[0].norectd,
                tglmasuk: req.body.tglinput,
                tglkeluar: req.body.tglinput,
                objectunitfk: 28,
                objectkelasfk: 8,
                taskid: 3,
                statusenabled: true,
                objectunitasalfk: resultlist.rows[0].objectunitasalfk,
            }, { transaction });

            for (let x = 0; x < resultlist.rows.length; x++) {
                const resultlistantreanpemeriksaan = await pool.query(`select mh.harga,mh.objectkomponenprodukfk,mk.reportdisplay  from m_hargaprodukperkomponen mh
            join m_totalhargaprodukbykelas mt on mt.id=mh.objecttotalhargaprodukbykelasfk
            join m_komponenproduk mk on mk.id=mh.objectkomponenprodukfk 
            where mt.objectprodukfk =${resultlist.rows[x].objectprodukfk} and mt.objectkelasfk=8`);

                let norecpp = uuid.v4().substring(0, 32)

                pelayananpasien = await db.t_pelayananpasien.create({
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
            return{t_antreanpemeriksaan,pelayananpasien}
        });
        
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
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

const postDeleteDetailOrder = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {t_detailorderpelayanan}=await db.sequelize.transaction(async (transaction) => {
            const t_detailorderpelayanan = await db.t_detailorderpelayanan.update({
                statusenabled: false,
    
            }, {
                where: {
                    norec: req.body.norec
                }
            }, { transaction });
            return{t_detailorderpelayanan}
        });
        
        const tempres = {
            t_detailorderpelayanan
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
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

const getDaftarPasienBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let filterTglLast = getDateEndNull(req.query.dateEnd);
        let filterTglStart = getDateStartNull(req.query.dateStart);
        const result = (await pool.query(queryBankDarah.qGetDaftarPasienBankDarah, [req.query.search,filterTglStart || "",filterTglLast||""])).rows
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result,
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

const getListPenerimaan = async (req, res) => {
    const logger = res.locals.logger
    try{
        let listPenerimaan = (await pool.query(queryBankDarah.qGetListPenerimaan)).rows
        listPenerimaan = await Promise.all(
            listPenerimaan.map(async (penerimaan) => {
                const newPenerimaan = { ...penerimaan }
                const listDetail = 
                    (await pool.query(
                        queryBankDarah.qGetDetailPenerimaan, 
                        [penerimaan.norecpenerimaan]
                        )).rows
                newPenerimaan.detailpenerimaan = listDetail
                return newPenerimaan
            }
        ))
        const tempres = {
            listpenerimaan: listPenerimaan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get list penerimaan Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get list penerimaan gagal',
            code: 500
        });
    }
}

const getListPemesanan = async (req, res) => {
    const logger = res.locals.logger
    try{
        let listPemesanan = (await pool.query(queryBankDarah.qGetListPemesanan)).rows
        listPemesanan = await Promise.all(
            listPemesanan.map(async (penerimaan) => {
                const newPenerimaan = { ...penerimaan }
                const listDetail = 
                    (await pool.query(
                        queryBankDarah.qGetDetailPemesanan, 
                        [penerimaan.norecpemesanan]
                        )).rows
                newPenerimaan.detailpemesanan = listDetail
                return newPenerimaan
            }
        ))
        const tempres = {
            listpemesanan: listPemesanan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get list penerimaan Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get list penerimaan gagal',
            code: 500
        });
    }
}

const getListRetur = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let listRetur = (await pool.query(queryBankDarah.qGetListRetur)).rows
        listRetur = await Promise.all(
            listRetur.map(async (retur) => {
                const newRetur = { ...retur }
                
                const listDetail = 
                    (await pool.query(
                        queryBankDarah.qGetDetailRetur, 
                        [retur.norecretur]
                        )).rows
                newRetur.detailretur = listDetail
                return newRetur
            }
        ))
        const tempres = {
            listRetur
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

const getTransaksiPelayananBankDarahByNorecDp = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = (await pool.query(queryBankDarah.qGetTransaksiPelayananByNorecDp,[req.query.norec])).rows
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result,
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

const getStokDarahFromUnit = async (req, res) => {
    const logger = res.locals.logger
    try {
        let { idunit, isbebas } = req.query
        isbebas = isbebas === "true"
        let dataGet = (await pool.query(queryBankDarah.qGetStokDarahFromUnit, [28,req.query.golongandarah])).rows[0]
        const tempres = {
        }
        res.status(200).send({
            data: dataGet,
            status: "success",
            success: true,
        });
    } catch (error) {
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }
}

export default{
    getDetailJenisProdukBankDarah,
    upsertOrderPelayananBankDarah,
    getRiwayatOrderBankDarah,
    getWidgetDaftarOrderBankDarah,
    getDaftarOrderBankDarah,
    getListOrderByNorecOrder,
    updateTglRencanaBankDarah,
    postVerifikasiOrderBankDarah,
    postDeleteDetailOrder,
    getDaftarPasienBankDarah,
    getListPenerimaan,
    getListPemesanan,
    getListRetur,
    getTransaksiPelayananBankDarahByNorecDp,
    getStokDarahFromUnit
}

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