import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import { qGetAntreanFromDP, qGetObatFromUnit, qGetOrderResepFromDP, qGetOrderVerifResepFromDP } from "../../../queries/emr/emr.queries";
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { hProcessOrderResep } from "../emr/emr.controller";
import { qGetAllVerif, qGetObatFromProduct, qGetPasienFromId } from "../../../queries/farmasi/farmasi.queries";
import { generateKodeBatch, hCreateKartuStok } from "../gudang/gudang.controller";
import { daftarUnit } from "../../../queries/master/unit/unit.queries";

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
        let dataAllOrders = await pool.query(qGetOrderResepFromDP, [
            'all',
            null,
            null
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
        let createdOrUpdated = null

        let orderTable = await t_orderresep.findOne({
            where: {
                norec: norecorder
            },
            transaction: transaction
        })
        if(!orderTable){
            throw new Error("order tidak ditemukan")
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
        const tempres = {
            orderresep: createdOrUpdated,
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
        let [createdOrUpdated, norec] = [null, req.body.norecjualbebas || null]
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
            const [_, updated] = await t_penjualanbebas.update({
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
                where: {
                    norec: norec
                },
                returning: true,
                transaction: transaction
            })
            createdOrUpdated = updated[0].toJSON();
        }
        const {createdOrUpdatedDetailBebas} =
        await hCreateOrUpdateDetailBebas(
            req,
            res,
            transaction,
            {
                norecpenjualanbebas: norec
            }
        )
        await transaction.commit()
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
            `%${nocm}%`,
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
            const [_, updated] = t_returobatpasien.update({
                statusenabled: true,
                objectverifresepfk: body.norecverif,
                qtyretur: body.qtyretur,
                objectalasanreturfk: body.alasan,
                tglinput: new Date(),
            }, {
                where: {
                    norec: norecretur
                },
                transaction: transaction,
                returning: true
            })
            createdOrUpdated = updated[0]?.toJSON()
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
        await hAddStock(req, res, transaction, {
            nobatch: body.nobatch,
            idUnit: req.body.unit,
            idProduk: verifVal.objectprodukfk,
            tabelTransaksi: "t_returobatpasien",
            qtyAdd: body.qtyretur
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
            const [_, updated] = await t_orderresep.update({
                norec: norecorderresep,
                kdprofile: 0,
                statusenabled: true,
                objectantreanpemeriksaanfk: body.norecap,
                objectpegawaifk: req.dokter,
                tglinput: new Date(),
                objectunitasalfk: body.unittujuan,
                objectdepotujuanfk: body.unittujuan
            }, {
                where: {
                    norec: norecorderresep
                },
                transaction: transaction,
                returning: true,
            })
            createdOrUpdated = updated[0].toJSON();
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
    createAntreanFarmasi
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
    const norecdp = ap.objectdaftarpasienfk
    let dp = await t_daftarpasien.findOne({
        where: {
            norec: norecdp
        },
        transaction: transaction
    })
    const updatedDp = await dp?.update({
        objectunitlastfk: req.body.unittujuan
    }, {
        transaction: transaction
    })
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

const hCreateOrUpdateDetailVerif = async (
    req, 
    res, 
    transaction,
    {
        norecorder,
        resep,
        newnorecap
    }
) => {
    let createdOrUpdatedDetailOrder = await Promise.all(
        resep.map(async (item) => {
            if(item.racikan.length > 0){
                // untuk racikan, maka masukkan sub item
                let createdOrUpdatedVerifs = []
                createdOrUpdatedVerifs = await Promise.all(
                    item.racikan.map(async (subItem) => {
                        let norecresepsub = subItem.norecverif
                        let createdOrUpdatedVerif
                        if(!norecresepsub){
                            norecresepsub = uuid.v4().substring(0, 32);
                            const {created} = await hCreateVerif(
                                req,
                                res,
                                transaction,
                                {
                                    norecorderresep: norecorder, 
                                    item: item, 
                                    subItem: subItem,
                                } 
                            )
                            createdOrUpdatedVerif = created
                        }else{
                            const {updated} = await hUpdateVerif(
                                norecorder,
                                norecresepsub,
                                item,
                                subItem,
                                transaction
                            )
                            createdOrUpdatedVerif = updated;
                        }
                        await hCreatePelayanan(
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
            if(!norecverif){
                norecverif = uuid.v4().substring(0, 32);
                const {created} = await hCreateVerif(
                    req,
                    res,
                    transaction,
                    {
                        norecorderresep: norecorder, 
                        item: item, 
                        subItem: null,
                    } 
                )
                createdOrUpdatedVerif = created
            }else{
                const {updated} = await hUpdateVerif(
                    norecorder,
                    norecverif,
                    item,
                    null,
                    transaction
                )
                createdOrUpdatedVerif = updated
            }
            await hCreatePelayanan(
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
        item, 
        subItem,
    } 
) => {
    // jika bukan subitem, maka yang digunakan adalah item
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
                    objectorderresepfk: norecorderresep,
                    kode_r: item.koder,
                    objectprodukfk: itemUsed.obat,
                    qty: batchstokunit.qtyChange || 0,
                    objectsediaanfk: item.sediaan,
                    harga: batchstokunit.harga || 0,
                    total: batchstokunit.harga * (batchstokunit.qtyChange || 0),
                    objectsignafk: item.signa,
                    objectketeranganresepfk: item.keterangan,
                    qtyracikan: itemUsed.qtyracikan,
                    qtypembulatan: itemUsed.qtypembulatan,
                    qtyjumlahracikan: batchstokunit.qtyChange || 0,
                    // harus koder dari subitem
                    kode_r_tambahan: subItem?.koder || null,
                    nobatch: batchstokunit.nobatch,
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

const hUpdateVerif = async (
    norecorderresep, 
    norecverif, 
    item, 
    subItem, 
    transaction
) => {
    // jika bukan subitem, maka yang digunakan adalah item
    let itemUsed = subItem || item
    let [_, updated] = await t_verifresep.update({
        kdprofile: 0,
        statusenabled: true,
        reportdisplay: itemUsed.namaobat,
        objectorderresepfk: norecorderresep,
        kode_r: itemUsed.koder,
        objectprodukfk: itemUsed.obat,
        qty: itemUsed.qty || 0,
        objectsediaanfk: itemUsed.sediaan,
        harga: itemUsed.harga || 0,
        total: itemUsed.total ||0,
        objectsignafk: itemUsed.signa,
        objectketeranganresepfk: itemUsed.keterangan,
        qtyracikan: itemUsed.qtyracikan,
        qtypembulatan: itemUsed.qtypembulatan,
        // harus koder dari subitem
        kode_r_tambahan: subItem?.koder || null,
        qtyjumlahracikan: itemUsed.qtyjumlahracikan,
    }, {
        where: {
            norec: norecverif
        },
        transaction: transaction,
        returning: true 
    })
    updated = updated[0].toJSON();
    return {updated, norecresep: norecverif}
}

const hCreateOrUpdateDetailBebas = async (
    req, 
    res, 
    transaction,
    {
        norecpenjualanbebas,
    }
) => {
    const resep = req.body.resep
    let createdOrUpdatedDetailBebas = await Promise.all(
        resep.map(async (item) => {
            if(item.racikan.length > 0){
                // untuk racikan, maka masukkan sub item
                let createdOrUpdatedVerifs = []
                createdOrUpdatedVerifs = await Promise.all(
                    item.racikan.map(async (subItem) => {
                        let norecresepsub = subItem.norecdetail
                        let createdOrUpdatedBebas
                        if(!norecresepsub){
                            norecresepsub = uuid.v4().substring(0, 32);
                            const {created} = await hCreateDetailBebas(
                                req,
                                res,
                                transaction,
                                {
                                    norecpenjualanbebas: norecpenjualanbebas, 
                                    item: item, 
                                    subItem: subItem,
                                } 
                            )
                            createdOrUpdatedBebas = created
                        }else{
                            const {updated} = await hUpdateDetailBebas(
                                norecpenjualanbebas,
                                norecresepsub,
                                item,
                                subItem,
                                transaction
                            )
                            createdOrUpdatedBebas = updated;
                        }
                        return createdOrUpdatedBebas
                    })
                )
                return createdOrUpdatedVerifs
            }
            // jika bukan racikan, maka tidak perlu subitem
            let norecdetail = item.norecdetail
            let createdOrUpdatedBebas
            if(!norecdetail){
                norecdetail = uuid.v4().substring(0, 32);
                const {created} = await hCreateDetailBebas(
                    req,
                    res,
                    transaction,
                    {
                        norecpenjualanbebas: norecpenjualanbebas, 
                        item: item, 
                        subItem: null,
                    } 
                )
                createdOrUpdatedBebas = created
            }else{
                const {updated} = await hUpdateDetailBebas(
                    norecpenjualanbebas,
                    norecdetail,
                    item,
                    null,
                    transaction
                )
                createdOrUpdatedBebas = updated
            }
            return createdOrUpdatedBebas
        })
    )
    createdOrUpdatedDetailBebas 
        = createdOrUpdatedDetailBebas.flat(1)
    return {createdOrUpdatedDetailBebas}
}

const hCreateDetailBebas = async (
    req,
    res,
    transaction,
    {
        norecpenjualanbebas, 
        item, 
        subItem,
    } 
) => {
    // jika bukan subitem, maka yang digunakan adalah item
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
    const created = Promise.all(
        batchStokUnitChanged.map(
            async (batchstokunit) => {
                let created = await t_penjualanbebasdetail.create({
                    norec: uuid.v4().substring(0, 32),
                    kdprofile: 0,
                    statusenabled: true,
                    reportdisplay: itemUsed.namaobat,
                    objectpenjualanbebasfk: norecpenjualanbebas,
                    kode_r: item.koder,
                    objectprodukfk: itemUsed.obat,
                    qty: batchstokunit.qtyChange || 0,
                    objectsediaanfk: item.sediaan,
                    harga: batchstokunit.harga || 0,
                    total: batchstokunit.harga * (batchstokunit.qtyChange || 0),
                    objectsignafk: item.signa,
                    objectketeranganresepfk: item.keterangan,
                    qtyracikan: itemUsed.qtyracikan,
                    qtypembulatan: itemUsed.qtypembulatan,
                    qtyjumlahracikan: batchstokunit.qtyChange || 0,
                    // harus koder dari subitem
                    kode_r_tambahan: subItem?.koder || null,
                    nobatch: batchstokunit.nobatch,
                }, {
                    transaction: transaction
                })
                created = created.toJSON()
                return created
            }
        )
    )
    return {created, norecresep: created.norec, changedStok}
}

const hUpdateDetailBebas = async (
    norecpenjualanbebas, 
    norecverif, 
    item, 
    subItem, 
    transaction
) => {
    // jika bukan subitem, maka yang digunakan adalah item
    let itemUsed = subItem || item
    let [_, updated] = await t_verifresep.update({
        kdprofile: 0,
        statusenabled: true,
        reportdisplay: itemUsed.namaobat,
        objectpenjualanbebasfk: norecpenjualanbebas,
        kode_r: itemUsed.koder,
        objectprodukfk: itemUsed.obat,
        qty: itemUsed.qty || 0,
        objectsediaanfk: itemUsed.sediaan,
        harga: itemUsed.harga || 0,
        total: itemUsed.total ||0,
        objectsignafk: itemUsed.signa,
        objectketeranganresepfk: itemUsed.keterangan,
        qtyracikan: itemUsed.qtyracikan,
        qtypembulatan: itemUsed.qtypembulatan,
        // harus koder dari subitem
        kode_r_tambahan: subItem?.koder || null,
        qtyjumlahracikan: itemUsed.qtyjumlahracikan,
    }, {
        where: {
            norec: norecverif
        },
        transaction: transaction,
        returning: true 
    })
    updated = updated[0].toJSON();
    return {updated, norecresep: norecverif}
}

// substract stock produk (bukan nobatch)
const hSubstractStokProduct = async (
    req, 
    res, 
    transaction, 
    {
        productId,
        idUnit,
        stokChange: qtySubstract,
        tabelTransaksi = "t_verifresep",
    }
) => {
    let produkBatch = await pool.query(qGetObatFromProduct, [productId, idUnit])
    produkBatch = produkBatch.rows[0] || null
    if(!produkBatch){
        throw new Error("produk tidak ditemukan")
    }
    if(qtySubstract > 0 && produkBatch.totalstok < qtySubstract){
        throw new Error("stok tidak cukup")
    }
    let stokChangeUpdate = qtySubstract
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
            const stokUnitModel = await t_stokunit.findOne({
                where: {
                    norec: stokUnit.norecstokunit,
                },
                lock: transaction.LOCK.UPDATE,
                transaction: transaction
            })
            let updated = await stokUnitModel.update({
                qty: stokUnit.qty
            }, {
                transaction: transaction,
                returning: true
            })

            updated = updated.toJSON()
            await hCreateKartuStok(req, res, transaction, {
                idUnit: idUnit,
                idProduk: productId,
                saldoAwal: batchStokUnit[indexSU].qty,
                saldoAkhir: updated.qty,
                tabelTransaksi: tabelTransaksi,
                norecTransaksi: null,
                noBatch: updated.kodebatch
            })
            return updated
        })
    )
    return {updatedData, batchStokUnitChanged}
} 

const hAddStock = async (
    req,
    res,
    transaction,
    {
        nobatch,
        idUnit,
        idProduk,
        tabelTransaksi,
        qtyAdd
    }
) => {
    const stokAwal = await t_stokunit.findOne({
        where: {
            kodebatch: generateKodeBatch(nobatch, idProduk, idUnit),
        },
        lock: transaction.LOCK.UPDATE,
        transaction: transaction
    })
    let stokAwalVal = stokAwal.toJSON()
    const stokAkhir = await stokAwal.update({
        qty: stokAwalVal.qty + qtyAdd
    }, {
        transaction: transaction
    })
    let stokAkhirVal = stokAkhir.toJSON()
    const kartuStok = await hCreateKartuStok(req, res, transaction, {
        idUnit: idUnit,
        idProduk: idProduk,
        saldoAwal: stokAwalVal.qty,
        saldoAkhir: stokAkhirVal.qty,
        tabelTransaksi: tabelTransaksi,
        norecTransaksi: null,
        noBatch: nobatch
    })
    return {stok: stokAkhirVal, kartuStok: kartuStok}
}