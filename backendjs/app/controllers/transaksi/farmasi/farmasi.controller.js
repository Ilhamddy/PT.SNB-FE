import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import { qGetObatFromUnit, qGetOrderResepFromDP, qGetOrderVerifResepFromDP } from "../../../queries/emr/emr.queries";
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { hProcessOrderResep } from "../emr/emr.controller";
import { qGetObatFromProduct, qGetPasienFromId } from "../../../queries/farmasi/farmasi.queries";
import { hCreateKartuStok } from "../gudang/gudang.controller";
import { createLogger } from "../../../utils/logger";

const t_verifresep = db.t_verifresep
const t_pelayananpasien = db.t_pelayananpasien
const t_orderresep = db.t_orderresep
const t_stokunit = db.t_stokunit
const t_penjualanbebas = db.t_penjualanbebas
const t_penjualanbebasdetail = db.t_penjualanbebasdetail


const Op = db.Sequelize.Op;

const getOrderResepQuery = async (req, res) => {
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
        console.error("== gagal get all resep query")
        console.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get all resep query"
        })
    }
}

const getOrderResepFromNorec = async (req, res) => {
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
        console.error("== gagal get Resep from DP")
        console.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get resep from norec"
        })
    }
}

const createOrUpdateVerifResep = async (req, res) => {
    const [transaction, errorTransaction] = await createTransaction(db, res)
    try{
        if(errorTransaction) return
        let norecorder = req.body.norecorder
        let createdOrUpdated = null

        let orderTable = await t_orderresep.findOne({
            where: {
                norec: norecorder
            }
        })
        if(!orderTable){
            throw new Error("order tidak ditemukan")
        }
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
        await orderTable.update({
            no_resep: kodeResep,
            tglverif: new Date()
        }, {
            transaction: transaction
        })
        let orderData = orderTable.toJSON()
        
        const {createdOrUpdatedDetailOrder} = 
        await hCreateOrUpdateDetailVerif(
            req, 
            res, 
            transaction,
            {
                norecorder: norecorder,
                orderData: orderData
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
            msg: "sukses create or update resep",
            success: true,
        });
    }catch(error){
        console.error(error)
        await transaction.rollback()
        res.status(500).send({
            data: error,
            status: "error",
            msg: "gagal create or update resep",
            success: false,
        });
    }
}

const createOrUpdatePenjualanBebas = async (req, res) => {
    const logger = createLogger("create or update penjualan bebas")
    const [transaction, errorTransaction] 
        = await createTransaction(db, res, logger)
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
        logger.info("sukses")
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
    logger.print()
}

const getPasienFromNoCm = async (req, res) => {
    const logger = createLogger("get dp from no cm")
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
        logger.info("sukses")
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get all resep query"
        })
    }
    logger.print()
}

export default {
    getOrderResepQuery,
    getOrderResepFromNorec,
    createOrUpdateVerifResep,
    createOrUpdatePenjualanBebas,
    getPasienFromNoCm
}

const hCreateOrUpdateDetailVerif = async (
    req, 
    res, 
    transaction,
    {
        norecorder,
        orderData
    }
) => {
    const resep = req.body.resep
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
                                orderData: orderData
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
                    orderData: orderData
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
        orderData
    }

) => {
    const norecPelayanan = uuid.v4().substring(0, 32);
    const createdPelayanan = await t_pelayananpasien.create({
        norec: norecPelayanan,
        statusenabled: true,
        reportdisplay: verifUsed.reportdisplay,
        objectorderresepfk: req.body.norecorder,
        objectantreanpemeriksaanfk: orderData.objectantreanpemeriksaanfk,
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
    let created = await t_verifresep.create({
        norec: uuid.v4().substring(0, 32),
        kdprofile: 0,
        statusenabled: true,
        reportdisplay: itemUsed.namaobat,
        objectorderresepfk: norecorderresep,
        kode_r: item.koder,
        objectprodukfk: itemUsed.obat,
        qty: itemUsed.qty || 0,
        objectsediaanfk: item.sediaan,
        harga: itemUsed.harga || 0,
        total: itemUsed.total ||0,
        objectsignafk: item.signa,
        objectketeranganresepfk: item.keterangan,
        qtyracikan: itemUsed.qtyracikan,
        qtypembulatan: itemUsed.qtypembulatan,
        qtyjumlahracikan: item.qty,
        // harus koder dari subitem
        kode_r_tambahan: subItem?.koder || null
    }, {
        transaction: transaction
    })
    const qtyPembulatan = itemUsed.qtypembulatan
    const qty = itemUsed.qty
    const changedStok = await hChangeStok(
        req, 
        res, 
        transaction, 
        {
            idUnit: req.body.unittujuan,
            productId: itemUsed.obat, 
            stokChange: (qtyPembulatan || qty) 
        }
    )
    created = created.toJSON()
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
    let created = await t_penjualanbebasdetail.create({
        norec: uuid.v4().substring(0, 32),
        kdprofile: 0,
        statusenabled: true,
        reportdisplay: itemUsed.namaobat,
        objectpenjualanbebasfk: norecpenjualanbebas,
        kode_r: item.koder,
        objectprodukfk: itemUsed.obat,
        qty: itemUsed.qty || 0,
        objectsediaanfk: item.sediaan,
        harga: itemUsed.harga || 0,
        total: itemUsed.total ||0,
        objectsignafk: item.signa,
        objectketeranganresepfk: item.keterangan,
        qtyracikan: itemUsed.qtyracikan,
        qtypembulatan: itemUsed.qtypembulatan,
        qtyjumlahracikan: item.qty,
        // harus koder dari subitem
        kode_r_tambahan: subItem?.koder || null
    }, {
        transaction: transaction
    })
    const qtyPembulatan = itemUsed.qtypembulatan
    const qty = itemUsed.qty
    const changedStok = await hChangeStok(
        req, 
        res, 
        transaction, 
        {
            idUnit: req.body.unittujuan,
            productId: itemUsed.obat, 
            stokChange: (qtyPembulatan || qty),
            tabelTransaksi: "t_penjualanbebasdetail",
        }
    )
    created = created.toJSON()
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

const hChangeStok = async (
    req, 
    res, 
    transaction, 
    {
        productId,
        idUnit,
        stokChange,
        tabelTransaksi = "t_verifresep",
    }
) => {
    let produkBatch = await pool.query(qGetObatFromProduct, [productId, idUnit])
    produkBatch = produkBatch.rows[0] || null
    if(!produkBatch){
        throw new Error("produk tidak ditemukan")
    }
    if(stokChange > 0 && produkBatch.totalstok < stokChange){
        throw new Error("stok tidak cukup")
    }
    let stokChangeUpdate = stokChange
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
    return updatedData
} 