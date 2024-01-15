import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import { qGetAllObat, qGetAllOrderResepFromDate, qGetAntreanFromDP, qGetObatFromUnit, qGetOrderResepFromDP, qGetOrderVerifResepFromDP } from "../../../queries/emr/emr.queries";
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { qGetAllVerif, qGetObatFromProduct, qGetPasienFromId, qGetPenjualanBebasAll, qGetPenjualanBebasFromNorec } from "../../../queries/farmasi/farmasi.queries";
import { generateKodeBatch, hCreateKartuStok, hUpsertStok } from "../gudang/gudang.controller";
import unitQueries, { daftarUnit } from "../../../queries/mastertable/unit/unit.queries";
import { getDateEnd, getDateEndNull, getDateStart, getDateStartNull } from "../../../utils/dateutils";
import instalasiQueries from "../../../queries/mastertable/instalasi/instalasi.queries";
import rekananQueries from "../../../queries/mastertable/rekanan/rekanan.queries";
import asalprodukQueries from "../../../queries/mastertable/asalproduk/asalproduk.queries";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import { hUpsertVerifSatuSehat } from "../satuSehat/satuSehatMedication.helper";

const t_verifresep = db.t_verifresep
const t_pelayananpasien = db.t_pelayananpasien
const t_orderresep = db.t_orderresep
const t_stokunit = db.t_stokunit
const t_penjualanbebas = db.t_penjualanbebas
const t_penjualanbebasdetail = db.t_penjualanbebasdetail
const t_antreanpemeriksaan = db.t_antreanpemeriksaan
const t_daftarpasien = db.t_daftarpasien
const t_returobatpasien = db.t_returobatpasien

const Op = db.Sequelize.Op;

const getOrderResepQuery = async (req, res) => {
    const logger = res.locals.logger
    try{
        let { tglmulai, tglakhir } = req.query
        tglmulai = getDateStartNull(tglmulai);
        tglakhir = getDateEndNull(tglakhir) 
        let dataAllOrders = await pool.query(qGetAllOrderResepFromDate, [
            tglmulai || '',
            tglakhir || ''
        ])
        dataAllOrders = hProcessOrderResep(dataAllOrders?.rows || null)
        const tempres = {
            dataAllOrders: dataAllOrders
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: "sukses get resep from dp"
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get all resep query"
        })
    }
}

const getOrderResepFromNorec = async (req, res) => {
    const logger = res.locals.logger
    try{
        const {norec} = req.query
        let dataOrderNorec = (await pool.query(qGetOrderResepFromDP, [
            'norecresep',
            norec,
            null
        ])).rows
        let dataOrderNorecVerif = (await pool.query(qGetOrderVerifResepFromDP, [
            'norecresep',
            norec,
            null
        ])).rows
        dataOrderNorec = hProcessOrderResep(dataOrderNorec)
        dataOrderNorec = dataOrderNorec[0] || null
        dataOrderNorecVerif = hProcessOrderResep(dataOrderNorecVerif)
        dataOrderNorecVerif = dataOrderNorecVerif[0] || null
        // jika belum ada maka pakai ordernorec
        dataOrderNorecVerif = (dataOrderNorecVerif?.noresep || null) === null ? null : dataOrderNorecVerif
        const tempres = {
            ordernorec: dataOrderNorecVerif || dataOrderNorec
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: "sukses get resep from norec"
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get resep from norec"
        })
    }
}

const upsertVerifResep = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    try{
        if(errorTransaction) return
        let norecorder = req.body.norecorder

        let orderTable = await t_orderresep.findOne({
            where: {
                norec: norecorder
            },
            transaction: transaction
        })
        if(!orderTable){
            throw new NotFoundError("order tidak ditemukan")
        }

        const kodeResep = await createKodeResep();
        await orderTable.update({
            no_resep: kodeResep,
            tglverif: new Date()
        }, {
            transaction: transaction
        })
        let orderData = orderTable.toJSON()
        const {newAP} = await hCreateAntreanPemeriksaan(req, res, transaction, {
            norecap: orderData.objectantreanpemeriksaanfk
        })
        
        const {createdOrUpdatedDetailOrder} = 
        await hCreateOrUpdateDetailVerif(
            req, 
            res, 
            transaction,
            {
                norecorder: norecorder,
                resep: req.body.resep,
                newnorecap: newAP.norec
            }
        )
        await transaction.commit()
        hUpsertVerifSatuSehat(orderData)
        const tempres = {
            orderresep: orderData,
            detailorder: createdOrUpdatedDetailOrder,
            newAP: newAP
        }
        res.status(200).send({
            code: 200,
            data: tempres,
            status: "success",
            msg: "sukses create or update resep",
            success: true,
        });
    }catch(error){
        logger.error(error)
        await transaction.rollback()
        res.status(500).send({
            data: error,
            status: "error",
            msg: "gagal create or update resep",
            success: false,
        });
    }
}

const createKodeResep = async () => {
    const date = new Date()
    const dateTodayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dateTodayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    let totalResepToday = await t_orderresep.count({
        where: {
            tglinput: {
                [Op.between]: [dateTodayStart, dateTodayEnd]
            },
            tglverif: {
                [Op.not]: null
            }
        }
    })

    totalResepToday = ("0000" + (totalResepToday + 1)).slice(-2)
    const kodeResep = "R" + date.getFullYear() 
    + ("0" + (date.getMonth() + 1)).slice(-2)
    + ("0" + date.getDate()) 
    + totalResepToday
    return kodeResep
}

const createOrUpdatePenjualanBebas = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] 
        = await createTransaction(db, res)
    if(errorTransaction) return
    try{
        const body = req.body
        let createdOrUpdated = null
        let norec = req.body.norecjualbebas || null
        const tglResep = body.tanggalresep ? new Date(body.tanggalresep) : null
        if(!norec){
            norec = uuid.v4().substring(0, 32);
            const created = await t_penjualanbebas.create({
                norec: norec,
                kdprofile: 0,
                statusenabled: true,
                reportdisplay: body.namapasien,
                objectpasienfk: body.norm || null,
                namapasien: body.namapasien,
                tgllahir: new Date(body.tanggallahir),
                notelepon: body.notelepon,
                alamat: body.alamat,
                tglresep: tglResep,
                objectjenisresepfk: body.jenis,
                objectunitfk: body.unittujuan,
                no_resep: body.noresep,
                namapenulis: body.penulisresep,
                objectpegawaifk: body.petugasapotek,
                catatan: body.catatan,
                tglinput: new Date()
            }, {
                transaction: transaction
            })
            createdOrUpdated = created.toJSON();
        }else{
            const penjualanSebelum = await t_penjualanbebas.findByPk(norec, {
                transaction: transaction
            })
            if(!penjualanSebelum) throw new NotFoundError("Penjualan sebelum tidak ditemukan")
            await penjualanSebelum.update({
                kdprofile: 0,
                statusenabled: true,
                reportdisplay: body.namapasien,
                objectpasienfk: body.norm || null,
                namapasien: body.namapasien,
                tgllahir: new Date(body.tanggallahir),
                notelepon: body.notelepon,
                alamat: body.alamat,
                tglresep: new Date(body.tanggalresep),
                objectjenisresepfk: body.jenis,
                objectunitfk: body.unittujuan,
                no_resep: body.noresep,
                namapenulis: body.penulisresep,
                catatan: body.catatan,
                tglinput: new Date()
            }, {
                transaction: transaction
            })
            createdOrUpdated = penjualanSebelum.toJSON();
        }
        const {createdOrUpdatedDetailBebas} =
        await hCreateOrUpdateDetailVerif(
            req,
            res,
            transaction,
            {
                norecpenjualanbebas: norec,
                resep: req.body.resep
            }
        )
        await transaction.commit()
        hUpsertVerifSatuSehat(null, createdOrUpdated)
        const tempres = {
            orderresep: createdOrUpdated,
            detailorder: createdOrUpdatedDetailBebas
        }
        res.status(200).send({
            code: 200,
            data: tempres,
            status: "success",
            msg: "sukses create or update penjualan bebas",
            success: true,
        });
    }catch(error){
        logger.error(error)
        await transaction.rollback()
        res.status(500).send({
            code: 200,
            data: error,
            status: "error",
            msg: "gagal create or update penjualan bebas",
            success: false,
        });
    }
}

const getPasienFromNoCm = async (req, res) => {
    const logger = res.locals.logger
    try{
        const {nocm} = req.query
        let dataAllPasien = await pool.query(qGetPasienFromId, [
            `${nocm}`,
        ])
        const tempres = {
            datapasien: dataAllPasien.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: "sukses get resep from dp"
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get all resep query"
        })
    }
}

const getAllVerifResep = async (req, res) => {
    const logger = res.locals.logger
    try{
        const { norecdp } = req.query
        let dataAllPasien = await pool.query(qGetAllVerif, [norecdp])
        const tempres = {
            dataverif: dataAllPasien.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: "sukses get all verif"
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get all verif"
        })
    }
}

const createOrUpdateRetur = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction]
        = await createTransaction(db, res)
    if(errorTransaction) return
    try{
        const body = req.body
        let norecretur = body.norecretur
        let createdOrUpdated = null
        if(!norecretur){
            norecretur = uuid.v4().substring(0, 32);
            const created = await t_returobatpasien.create({
                norec: norecretur,
                kdprofile: 0,
                statusenabled: true,
                objectverifresepfk: body.norecverif,
                qtyretur: body.qtyretur,
                objectalasanreturfk: body.alasan,
                tglinput: new Date(),
                objectpegawaifk: req.idPegawai
            }, {
                transaction: transaction
            })
            createdOrUpdated = created.toJSON()
        }else{
            const updated = await t_returobatpasien.findByPk(norecretur, {
                transaction: transaction
            })
            await updated.update({
                statusenabled: true,
                objectverifresepfk: body.norecverif,
                qtyretur: body.qtyretur,
                objectalasanreturfk: body.alasan,
                tglinput: new Date(),
            })
            createdOrUpdated = updated.toJSON()
        }
        const verif = await t_verifresep.findOne({
            where: {
                norec: body.norecverif
            },
            lock: transaction.LOCK.UPDATE,
            transaction: transaction
        })
        let verifVal = verif.toJSON()
        const updatedVerif = await verif.update({
            qty: verifVal.qty - body.qtyretur
        }, {
            transaction: transaction,
        })
        await hUpsertStok(req, res, transaction, {
            qtyDiff: body.qtyretur,
            nobatch: body.nobatch,
            objectprodukfk: verifVal.objectprodukfk,
            objectunitfk: req.body.unit,
            tabelTransaksi: "t_returobatpasien",
            norectransaksi: norecretur
        })

        await transaction.commit()
        const tempres = {
            retur: createdOrUpdated,
            updatedVerif: updatedVerif
        }

        res.status(200).send({
            code: 200,
            data: tempres,
            status: "success",
            msg: "sukses create or update retur",
            success: true,
        });

    }catch(error){
        logger.error(error)
        await transaction.rollback()
        res.status(500).send({
            code: 200,
            data: error,
            status: "error",
            msg: "gagal create or update retur",
            success: false,
        });
    }
}

const getAntreanFromDP = async (req, res) => {
    const logger = res.locals.logger
    try{
        const { norecdp } = req.query
        const {antrean} = await db.sequelize.transaction(async (transaction) => {
            let dataAllAntrean = await db.t_antreanpemeriksaan.findAll({
                where: {
                    objectdaftarpasienfk: norecdp
                },
                transaction: transaction
            })
            let antreanFarmasi = [...dataAllAntrean].filter((item) => {
                return item.objectunitfk === daftarUnit.UNIT_FARMASI
            })
            antreanFarmasi = antreanFarmasi.map((item) => {
                return {
                    ...item.toJSON()
                }
            })
            let antreanNonFarmasi = [...dataAllAntrean].filter((item) => {
                return item.objectunitfk !== daftarUnit.UNIT_FARMASI
            })
            antreanNonFarmasi = 
                await Promise.all(antreanNonFarmasi.map(async (item) => {
                    const dataAp = item.toJSON()
                    let dataApFarmasi = await  db.t_antreanpemeriksaan.findOne({
                        where: {
                            objectdaftarpasienfk: dataAp.objectdaftarpasienfk,
                            objectunitasalfk: dataAp.objectunitfk
                        },
                        transaction: transaction
                    })

                    if(!dataApFarmasi){
                        dataApFarmasi = await db.t_antreanpemeriksaan.create({
                            ...dataAp,
                            norec: uuid.v4().substring(0, 32),
                            objectunitasalfk: dataAp.objectunitfk,
                            objectunitfk: daftarUnit.UNIT_FARMASI,
                        }, {
                            transaction: transaction
                        })
                    }else{
                        const dataBefore = antreanFarmasi.find((item) => {
                            return item.norec === dataApFarmasi.norec
                        })
                        if(dataBefore) return null
                    }
                    dataApFarmasi = dataApFarmasi.toJSON()
                    return {
                        ...dataApFarmasi,
                    }
                }
            ))
            antreanNonFarmasi = antreanNonFarmasi.filter((item) => item !== null)
            return {
                antrean: [...antreanFarmasi, ...antreanNonFarmasi]
            }
        })
        const dataAllAntrean = await Promise.all( 
            antrean.map(async (item) => {
                let dataAllAntrean = (await pool.query(qGetAntreanFromDP, [item.norec]))
                .rows[0]
                return {
                    ...dataAllAntrean
                }
            })
        )
        const tempres = {
            dataantrean: dataAllAntrean
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: "sukses get resep from dp"
        });
    }catch(error){
        logger.error(error);
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get all resep query"
        })
    }
}

const upsertOrderPlusVerif = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try{
        const body = req.body
        let norecap = body.norecap
        let createdOrUpdated = null
        let norecorderresep = body.norecorder
        if(!norecorderresep){
            norecorderresep = uuid.v4().substring(0, 32)
            const date = new Date()
            const dateTodayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            const dateTodayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            let totalOrderToday = await t_orderresep.count({
                where: {
                    tglinput: {
                        [Op.between]: [dateTodayStart, dateTodayEnd]
                    }
                }
            })
            totalOrderToday = ("0000" + totalOrderToday).slice(-4)
            const kodeOrder = "O" + date.getFullYear() 
            + ("0" + (date.getMonth() + 1)).slice(-2)
            + ("0" + date.getDate()).slice(-2)
            + totalOrderToday
            const kodeResep = await createKodeResep()
            
            const created = await t_orderresep.create({
                norec: norecorderresep,
                kdprofile: 0,
                statusenabled: true,
                kodeexternal: kodeOrder,
                namaexternal: kodeOrder,
                reportdisplay: kodeOrder,
                objectantreanpemeriksaanfk: norecap,
                objectpegawaifk: body.penulisresep,
                tglinput: new Date(),
                objectunitasalfk: body.unittujuan,
                no_order: kodeOrder,
                no_resep: kodeResep,
                objectdepotujuanfk: body.unittujuan
            }, {
                transaction: transaction
            })
            createdOrUpdated = created.toJSON()
        }else{
            const updated = await t_orderresep.findByPk(norecorderresep, {
                transaction: transaction
            })
            if(!updated) throw new Error(`Tidak ada order dengan norec: ${norecorderresep}`)
            await updated.update({
                norec: norecorderresep,
                kdprofile: 0,
                statusenabled: true,
                objectantreanpemeriksaanfk: body.norecap,
                objectpegawaifk: req.dokter,
                tglinput: new Date(),
                objectunitasalfk: body.unittujuan,
                objectdepotujuanfk: body.unittujuan
            }, {
                transaction: transaction
            })
            createdOrUpdated = updated.toJSON();
        }
        const {createdOrUpdatedDetailOrder} =
        await hCreateOrUpdateDetailVerif(
            req,
            res,
            transaction,
            {
                norecorder: norecorderresep,
                resep: req.body.resep,
                newnorecap: norecap
            }
        )
        await transaction.commit()
        const tempres = {
            orderresep: createdOrUpdated,
            detailorder: createdOrUpdatedDetailOrder
        }
        res.status(200).send({
            code: 200,
            data: tempres,
            status: "success",
            msg: "sukses create or update order plus verif",
            success: true,
        });
    }catch(error){
        logger.error(error)
        await transaction.rollback()
        res.status(500).send({
            code: 200,
            data: error,
            status: "error",
            msg: "gagal create or update order plus verif",
            success: false,
        });
    }
}

const createAntreanFarmasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { norecdp } = req.body;
        const {antreanPemeriksaan} = 
            await db.sequelize.transaction(async (transaction) => {
                let norecAP = uuid.v4().substring(0, 32)
                const daftarPasien = await db.t_daftarpasien.findOne({
                    where: {
                        norec: norecdp
                    },
                    transaction: transaction
                });
                //TODO: noantrean masih null
                const antreanPemeriksaan = await db.t_antreanpemeriksaan.create({
                    norec: norecAP,
                    objectdaftarpasienfk: norecdp,
                    tglmasuk: new Date(),
                    tglkeluar: null,
                    objectdokterpemeriksafk: daftarPasien.objectdokterpemeriksafk,
                    objectunitfk: daftarUnit.UNIT_FARMASI,
                    noantrian: null,
                    objectkamarfk: null,
                    objectkelasfk: null,
                    nobed: null,
                    taskid: 6,
                    statusenabled: true
                }, {
                    transaction: transaction
                });

                return {antreanPemeriksaan}
            });
        
        const tempres = {
            antreanPemeriksaan
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


const getComboLaporanPengadaan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const instalasi = (await pool.query(instalasiQueries.getAll)).rows
        const unit = (await pool.query(unitQueries.getAll)).rows
        const asalProduk = (await pool.query(asalprodukQueries.getAll)).rows
        const supplier = (await pool.query(rekananQueries.getAll)).rows
        const tempres = {
            instalasi: instalasi,
            unit: unit,
            asalProduk: asalProduk,
            supplier: supplier
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

const getPenjualanBebas = async (req, res) => {
    const logger = res.locals.logger
    try{
        let { tglmulai, tglakhir } = req.query
        tglmulai = getDateStartNull(tglmulai);
        tglakhir = getDateEndNull(tglakhir) 
        let dataAllOrders = await pool.query(qGetPenjualanBebasAll, [
            tglmulai || '',
            tglakhir || ''
        ])
        dataAllOrders = hProcessOrderResep(dataAllOrders?.rows || null)
        const tempres = {
            dataPenjualanBebas: dataAllOrders
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: "sukses get resep from dp"
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get all resep query"
        })
    }
}

const getPenjualanBebasFromNorec = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let { norecjualbebas } = req.query
        if(!norecjualbebas) {
            throw new BadRequestError("Norec penjualan bebas")
        }
        let dataAllOrders = await pool.query(qGetPenjualanBebasFromNorec, [norecjualbebas])
        if(dataAllOrders.rows.length === 0) throw new NotFoundError("Data Penjualan Tidak ditemukan")
        dataAllOrders = hProcessOrderResep(dataAllOrders?.rows || null)
        const tempres = {
            dataPenjualanBebas: dataAllOrders[0]
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: "sukses get resep from dp"
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


const getObatFromUnit = async (req, res) => {
    const logger = res.locals.logger
    try {
        let { idunit, isbebas } = req.query
        isbebas = isbebas === "true"

        let dataGet = await pool.query(qGetObatFromUnit, [idunit || "", isbebas])
        let allObat = await pool.query(qGetAllObat)
        
        const tempres = {
            obat: dataGet.rows,
            allObat: allObat.rows
        }
        res.status(200).send({
            data: tempres,
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


export default {
    getOrderResepQuery,
    getOrderResepFromNorec,
    createOrUpdateVerifResep: upsertVerifResep,
    createOrUpdatePenjualanBebas,
    getPasienFromNoCm,
    getAllVerifResep,
    createOrUpdateRetur,
    getAntreanFromDP,
    createOrUpdateOrderPlusVerif: upsertOrderPlusVerif,
    createAntreanFarmasi,
    getComboLaporanPengadaan,
    getPenjualanBebas,
    getPenjualanBebasFromNorec,
    getObatFromUnit
}

const hCreateAntreanPemeriksaan = async(
    req,
    res,
    transaction,
    {
        norecap
    }
) => {
    let ap = await t_antreanpemeriksaan.findOne({
        where: {
            norec: norecap
        },
        transaction: transaction
    })
    ap = ap.toJSON();
    const newNorec = uuid.v4().substring(0, 32);
    delete ap.norec
    ap.objectunitfk = req.body.unittujuan;
    ap.tglmasuk = new Date();
    ap.noantrian = null
    ap.norec = newNorec
    let newAP = await t_antreanpemeriksaan.create(ap, {
        transaction: transaction
    })
    newAP = newAP.toJSON();
    return {newAP}
}

/**
 * digunakan di beberapa tempat: saat verifikasi order resep, saat resep langsung, dan penjualan obat bebas
 * @param {*} req 
 * @param {*} res 
 * @param {*} transaction 
 * @param {{
 *  norecorderresep: string | undefined,
 *  norecpenjualanbebas: string | undefined,
 *  resep: any[],
 *  newnorecap: string | undefined
 * }} param3
 * @returns 
 */
const hCreateOrUpdateDetailVerif = async (
    req, 
    res, 
    transaction,
    {
        norecorder,
        norecpenjualanbebas,
        resep,
        newnorecap
    }
) => {
    if(!norecorder && !norecpenjualanbebas) throw new Error("Salah satu norec harus diisi")
    let createdOrUpdatedDetailOrder = await Promise.all(
        resep.map(async (item) => {
            if(item.racikan.length > 0){
                // untuk racikan, maka masukkan sub item
                let createdOrUpdatedVerifs = []
                createdOrUpdatedVerifs = await Promise.all(
                    item.racikan.map(async (subItem) => {
                        let norecresepsub = subItem.norecverif
                        let createdOrUpdatedVerif
                        const {deleted} = await hDeleteVerif(
                            req,
                            res,
                            norecorder,
                            norecpenjualanbebas,
                            transaction
                        )
                        norecresepsub = uuid.v4().substring(0, 32);
                        const {created} = await hCreateVerif(
                            req,
                            res,
                            transaction,
                            {
                                norecorderresep: norecorder, 
                                item: item, 
                                norecpenjualanbebas: norecpenjualanbebas,
                                subItem: subItem,
                            } 
                        )
                        createdOrUpdatedVerif = created

                        newnorecap && await hCreatePelayanan(
                            req,
                            res,
                            transaction,
                            {
                                verifUsed: createdOrUpdatedVerif,
                                norecap: newnorecap
                            }
                        )
                        return createdOrUpdatedVerif
                    })
                )
                return createdOrUpdatedVerifs
            }
            // jika bukan racikan, maka tidak perlu subitem
            let norecverif = item.norecverif
            let createdOrUpdatedVerif
            const {deleted} = await hDeleteVerif(
                req,
                res,
                norecorder,
                norecpenjualanbebas,
                transaction
            )
            norecverif = uuid.v4().substring(0, 32);
            const { created } = await hCreateVerif(
                req,
                res,
                transaction,
                {
                    norecorderresep: norecorder, 
                    norecpenjualanbebas: norecpenjualanbebas,
                    item: item, 
                    subItem: null,
                } 
            )
            createdOrUpdatedVerif = created
            newnorecap && await hCreatePelayanan(
                req,
                res,
                transaction,
                {
                    verifUsed: createdOrUpdatedVerif,
                    norecap: newnorecap
                }
            )
            return createdOrUpdatedVerif
        })
    )
    createdOrUpdatedDetailOrder 
        = createdOrUpdatedDetailOrder.flat(1)
    return {createdOrUpdatedDetailOrder}
}

const hCreatePelayanan = async (
    req,
    res,
    transaction,
    {
        verifUsed,
        norecap
    }

) => {
    const createdPelayanan = await Promise.all(
        verifUsed.map(
            async (verifUsed) => {
                const norecPelayanan = uuid.v4().substring(0, 32);
                const createdPelayanan = await t_pelayananpasien.create({
                    norec: norecPelayanan,
                    statusenabled: true,
                    reportdisplay: verifUsed.reportdisplay,
                    objectorderresepfk: req.body.norecorder,
                    objectantreanpemeriksaanfk: norecap,
                    harga: verifUsed.harga,
                    qty: verifUsed.qtypembulatan,
                    discount: 0,
                    total: verifUsed.total,
                    tglinput: new Date(),
                    objectnotapelayananpasienfk: null,
                    objectprodukfk: verifUsed.objectprodukfk,
                    objectpegawaifk: req.idPegawai,
                    objectkelasfk: null,
                    jasa: null,
                    iscito: false,
                    objectverifresepfk: verifUsed.norec,
                }, {
                    transaction: transaction
                })
                return createdPelayanan.toJSON()
            }
        )
    )
    return {createdPelayanan}
}


const hCreateVerif = async (
    req,
    res,
    transaction,
    {
        norecorderresep, 
        norecpenjualanbebas,
        item, 
        subItem,
    } 
) => {
    if(!norecorderresep && !norecpenjualanbebas) throw new Error("Salah satu Norec harus diisi")
    let itemUsed = subItem || item
    const qtyPembulatan = itemUsed.qtypembulatan
    const qty = itemUsed.qty
    const {changedStok, batchStokUnitChanged} = await hSubstractStokProduct(
        req, 
        res, 
        transaction, 
        {
            idUnit: req.body.unittujuan,
            productId: itemUsed.obat, 
            stokChange: (qtyPembulatan || qty) 
        }
    )
    let created = await Promise.all(
        batchStokUnitChanged.map(
            async (batchstokunit) => {
                if(batchstokunit.qtyChange <= 0) return null
                let created = await t_verifresep.create({
                    norec: uuid.v4().substring(0, 32),
                    kdprofile: 0,
                    statusenabled: true,
                    reportdisplay: itemUsed.namaobat,
                    objectorderresepfk: norecorderresep || null,
                    kode_r: item.koder,
                    objectprodukfk: itemUsed.obat,
                    qty: batchstokunit.qtyChange || 0,
                    objectsediaanfk: item.sediaan,
                    harga: itemUsed.harga,
                    total: itemUsed.total,
                    objectsignafk: item.signa,
                    objectketeranganresepfk: item.keterangan,
                    qtyracikan: itemUsed.qtyracikan,
                    qtypembulatan: itemUsed.qtypembulatan,
                    qtyjumlahracikan: item.qty || 0,
                    // harus koder dari subitem
                    kode_r_tambahan: subItem?.koder || null,
                    nobatch: batchstokunit.nobatch,
                    objectpenjualanbebasfk: norecpenjualanbebas || null
                }, {
                    transaction: transaction
                })
                created = created.toJSON()
                return created
            }
        )
    )
    created = created.filter((item) => item !== null)

    return {created, norecresep: created.norec, changedStok}
}

const hDeleteVerif = async (
    req,
    res,
    norecorderresep, 
    norecpenjualanbebas,
    transaction
) => {
    if(!norecorderresep && !norecpenjualanbebas) throw new Error("Harus ada salah satu norec")
    let deleted
    if(norecorderresep){
        deleted = await t_verifresep.findAll({
            where: {
                objectorderresepfk: norecorderresep
            },
            transaction: transaction
        })
    } else{
        deleted = await t_verifresep.findAll({
            where: {
                objectpenjualanbebasfk: norecpenjualanbebas
            },
            transaction: transaction
        })
    }
    deleted = await Promise.all(
        deleted.map(
            async (del) => {
                const delVal = del.toJSON()
                const qtyPembulatan = del.qtypembulatan
                const qty = del.qty
                await hAddProductQty(
                    req, 
                    res, 
                    transaction, 
                    {
                        productId: del.objectprodukfk, 
                        nobatch: delVal.nobatch,
                        idUnit: req.body.unittujuan,
                        qtyChange: (qtyPembulatan || qty), 
                        tabelTransaksi: "t_verifresep"
                    }
                )
                const pelayanan = await db.t_pelayananpasien.findAll({
                    where: {
                        objectverifresepfk: del.norec
                    },
                    transaction: transaction
                })
                await Promise.all(
                    pelayanan.map((p) => {
                        const pelayananDeleted = p.toJSON()
                        p.destroy({
                            transaction: transaction
                        })
                        return pelayananDeleted
                    })
                )
                await del.destroy({
                    transaction: transaction
                })
                return delVal
            }
        )
    )

    return {deleted}
}

/**
 * change stock produk seluruh batch, tergantung prioritas
 * @param {*} req 
 * @param {*} res 
 * @param {*} transaction 
 * @param {*} param3 
 * @returns 
 */
export const hSubstractStokProduct = async (
    req, 
    res, 
    transaction, 
    {
        productId,
        idUnit,
        stokChange: qtyChange,
        tabelTransaksi = "t_verifresep",
    }
) => {
    let produkBatch = await pool.query(qGetObatFromProduct, [productId, idUnit])
    produkBatch = produkBatch.rows[0] || null
    if(!produkBatch){
        throw new Error("produk tidak ditemukan")
    }
    if(qtyChange > 0 && produkBatch.totalstok < qtyChange){
        throw new Error("stok tidak cukup")
    }
    let stokChangeUpdate = qtyChange
    let batchStokUnit = produkBatch.batchstokunit
    const batchStokUnitChanged = batchStokUnit.map((stokUnit) => {
        let newStokUnit = {...stokUnit}
        if(stokChangeUpdate <= 0){
            newStokUnit.qtyChange = 0
            return newStokUnit
        }
        const qty = newStokUnit.qty
        if(qty > stokChangeUpdate){
            newStokUnit.qty = qty - stokChangeUpdate
            newStokUnit.qtyChange = stokChangeUpdate
            stokChangeUpdate = 0
            return newStokUnit
        }
        newStokUnit.qty = 0
        newStokUnit.qtyChange = qty
        stokChangeUpdate = stokChangeUpdate - qty
        return newStokUnit
    })
    const updatedData = await Promise.all(
        batchStokUnitChanged.map(async (stokUnit, indexSU) => {
            const {
                stokBarangAwalVal,
                stokBarangAkhirVal: updated,
            } = await hUpsertStok(
                req, 
                res, 
                transaction,
                {
                    qtyDiff: -stokUnit.qtyChange,
                    nobatch: stokUnit.nobatch,
                    objectprodukfk: productId,
                    tabeltransaksi: tabelTransaksi,
                    norectransaksi: null,
                    objectunitfk: idUnit,
                }
            )

            return updated
        })
    )
    return {updatedData, batchStokUnitChanged}
}

export const hAddProductQty = async (
    req, 
    res, 
    transaction, 
    {
        productId,
        idUnit,
        nobatch,
        qtyChange,
        tabelTransaksi = "t_verifresep"
    }
) => {
    const {
        stokBarangAwalVal,
        stokBarangAkhirVal,
    } = await hUpsertStok(
        req, 
        res, 
        transaction,
        {
            qtyDiff: qtyChange,
            nobatch: nobatch,
            objectprodukfk: productId,
            objectunitfk: idUnit,
            tabeltransaksi: tabelTransaksi,
            norectransaksi: null
        }
    )

}


export const initValueResep = {
    norecap: "",
    norecresep: "",
    obat: "",
    namaobat: "",
    satuanobat: "",
    namasatuan: "",
    koder: 1,
    qty: "",
    qtyracikan: "",
    qtypembulatan: "",
    qtyjumlahracikan: "",
    sediaan: "",
    namasediaan: "",
    harga: "",
    total: "",
    signa: "",
    keterangan: "",
    namaketerangan: "",
    nobatch: "",
    racikan: []
}


export const hProcessOrderResep = (dataOrders) => {
    if (dataOrders === null) return []
    let newDataOrders = dataOrders.map((order) => {
        let newOrder = { ...order }
        const newOrdersResep = []

        newOrder.resep.map((resep) => {
            const newResep = { ...resep }
            if (newResep.kodertambahan) {
                const findResep = newOrdersResep.find((findItem) => {
                    return findItem.koder === newResep.koder
                })
                if (!findResep) {
                    const valueResepNew = { ...initValueResep }
                    valueResepNew.qty = newResep.qtyjumlahracikan
                    valueResepNew.sediaan = newResep.sediaan
                    valueResepNew.namasediaan = newResep.namasediaan
                    valueResepNew.signa = newResep.signa
                    valueResepNew.keterangan = newResep.keterangan
                    valueResepNew.namaketerangan = newResep.namaketerangan
                    valueResepNew.koder = newResep.koder
                    newResep.koder = newResep.kodertambahan
                    valueResepNew.racikan = [newResep]
                    newOrdersResep.push(valueResepNew)
                } else {
                    newResep.koder = newResep.kodertambahan
                    findResep.racikan = [...findResep.racikan, newResep]
                }
            } else {
                newResep.racikan = []
                newOrdersResep.push(newResep)
            }
        })
        newOrder.resep = newOrdersResep
        return newOrder
    })
    return newDataOrders
}