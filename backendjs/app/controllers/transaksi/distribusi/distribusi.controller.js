import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import { 
    qGetKirim,
    qGetKirimStok,
    qGetOrder,
    qGetOrderStok,
    qGetStokUnit, qKemasanFromId
} from "../../../queries/gudang/distribusi.queries";
import gudangController, { generateKodeBatch, hCreateKartuStok, hUpsertStok } from "../gudang/gudang.controller"
import {
    createTransaction
} from "../../../utils/dbutils";
const t_orderbarang = db.t_orderbarang
const t_orderbarangdetail = db.t_orderbarangdetail
const t_kirimbarang = db.t_kirimbarang
const t_kirimbarangdetail = db.t_kirimbarangdetail
const t_stokunit = db.t_stokunit


export const getStokBatch = async (req, res) => {
    const logger = res.locals.logger
    try{
        let { idunit, islogistik } = req.query
        islogistik = islogistik === "true"
        const { rows } = await pool.query(qGetStokUnit, [idunit, islogistik])
        let datas = []
        // kelompokkan sesuai produk
        rows.forEach((stok) => {
            const iProdukFound = datas.findIndex((data) => {
                return data.value === stok.value
            })
            if(iProdukFound < 0){
                datas.push({
                    value: stok.value,
                    batchproduk: [{...stok}],
                    label: stok.label,
                })
            }else{
                datas[iProdukFound].batchproduk = [...datas[iProdukFound].batchproduk, {...stok}]
            }
        })
        res.status(200).send({
            data: datas,
            success: true,
            msg: 'Get Stok Batch Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Produk Obat Gagal',
            code: 500
        });
    }
}

const getKemasanById = async (req, res) => {
    const logger = res.locals.logger
    try {
        let { idkemasan } = req.query;
        if(!idkemasan) throw new Error("idkemasan is required")
        const kemasan = (await pool.query(qKemasanFromId, [Number(idkemasan)]));
        if(kemasan.rows.length === 0) throw new Error("kemasan not found")
        let tempres = {
            kemasan: kemasan.rows[0]
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error){
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }
}

const createOrUpdateOrderbarang = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res);
    if(errorTransaction) return
    try{
        let { body } = req;
        let createdOrUpdatedPenerimaan
        let norecorder
        if(!body.norecorder){
            norecorder = uuid.v4().substring(0, 32)
            createdOrUpdatedPenerimaan = await t_orderbarang.create({
                norec: norecorder,
                kdprofile: 0,
                statusenabled: true,
                noorder: body.noorder,
                objectunitasalfk: body.unitorder || null,
                objectunittujuanfk: body.unittujuan || null,
                objectjenisorderbarangfk: body.jenisorder || null,
                keterangan: body.keterangan,
                tglinput: new Date(body.tanggalorder),
                objectpegawaifk: req.idPegawai,
                objectstatusveriffk: 1,
                islogistik: body.islogistik,
                istolak: false,
            }, {
                transaction: transaction
            })
        }else{
            norecorder = body.norecorder
            const orderBarang = await t_orderbarang.findByPk(norecorder, {
                transaction: transaction
            })
            if(!orderBarang) throw new Error("Barang tidak ditemukan")
            await orderBarang.update({
                noorder: body.noorder,
                objectunitasalfk: body.unitorder || null,
                objectunittujuanfk: body.unittujuan || null,
                objectjenisorderbarangfk: body.jenisorder || null,
                keterangan: body.keterangan,
                tglinput: new Date(body.tanggalorder),
                objectpegawaifk: req.idPegawai,
                objectstatusveriffk: 1,
                islogistik: body.islogistik,
                istolak: false,
                alasantolak: null
            }, {
                transaction: transaction
            })
            createdOrUpdatedPenerimaan = orderBarang.toJSON() ;
        }

        const createdDetail = await hUpsertOrderDetail(req, res, transaction, {norecorder})
        await transaction.commit();
        const tempres = {
            createdOrUpdatedPenerimaan,
            createdDetail
        }
        res.status(200).send({
            data: tempres,
            success: true,
            msg: 'Create or update order barang berhasil',
            code: 200
        });

    }catch(error){
        logger.error(error)
        await transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create or update order barang gagal',
            code: 500
        });
    }
} 

const getOrderBarang = async (req, res) => {
    const logger = res.locals.logger
    try {
        const isGudang = req.query.isGudang === "true"
        const isLogistik = req.query.isLogistik === "true"

        const order = (await pool.query(qGetOrder, [isGudang ? '' : req.userId, isLogistik]));
        const kirim = (await pool.query(qGetKirim, [isGudang ? '' : req.userId, isLogistik]));

        let tempres = {
            order: order.rows,
            kirim: kirim.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error){
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }
}

export const getOrderStokBatch = async (req, res) => {
    const logger = res.locals.logger
    try{
        const norecorder = req.query.norecorder
        const noreckirim = req.query.noreckirim


        let { rows: rowsOrder } = await pool.query(qGetOrderStok, [norecorder])
        let { rows: rowsKirim } = await pool.query(qGetKirimStok, [norecorder, noreckirim])
        let dataItemOrders = []
        let sisaQtyOutPerItem = {}
        rowsOrder = [...rowsOrder].sort((a, b) => {
            return new Date(a.tglinput) - new Date(b.tglinput)
        })
        
        // kelompokkan sesuai produk
        rowsOrder.forEach((stok) => {
            const iProdukFound = dataItemOrders.findIndex((data) => {
                return data.value === stok.value
            })
            if(iProdukFound < 0){

                let sisaQtyOut = stok.qtyout
                let qty = stok.qty
                if(sisaQtyOut > qty){
                    stok.qtykirim = qty
                    sisaQtyOut = sisaQtyOut - qty
                }else{
                    stok.qtykirim = sisaQtyOut
                    sisaQtyOut = 0
                }
                sisaQtyOutPerItem[stok.value] = sisaQtyOut
                dataItemOrders.push({
                    value: stok.value,
                    qty: stok.qty,
                    // qty out adalah qty order, 
                    qtyout: stok.qtyout,
                    batchproduk: [{...stok}],
                    label: stok.label,
                    qtykirim: stok.qtykirim
                })
            }else{
                let sisaQtyOut = sisaQtyOutPerItem[stok.value]
                let qty = stok.qty
                if(sisaQtyOut > qty){
                    stok.qtykirim = qty
                    sisaQtyOut = sisaQtyOut - qty
                }else{
                    stok.qtykirim = sisaQtyOut
                    sisaQtyOut = 0 
                }
                sisaQtyOutPerItem[stok.value] = sisaQtyOut
                const dataItemOrder = dataItemOrders[iProdukFound]
                dataItemOrder.batchproduk 
                    = [...dataItemOrder.batchproduk, {...stok}]
                dataItemOrder.qty 
                    = dataItemOrder.qty + stok.qty
                dataItemOrder.qtykirim 
                    = dataItemOrder.qtykirim + stok.qtykirim
            }
        })

        let tempres = {
            order: null,
            itemorders: dataItemOrders,
            itemkirims: rowsKirim
        }

        // kalau bukan order, pakai data kirim seadanya
        const dataOrderOrKirim = rowsOrder[0] ? rowsOrder[0] : rowsKirim[0]

        const dataOrder = { 
            noreckirim: dataOrderOrKirim.noreckirim,
            tglkirim: dataOrderOrKirim.tglkirim,
            nokirim: dataOrderOrKirim.nokirim,
            keterangankirim: dataOrderOrKirim.keterangankirim,
            norecorder: dataOrderOrKirim.norecorder,
            jenisorder: dataOrderOrKirim.jenisorder,
            noorder: dataOrderOrKirim.noorder,
            namajenisorder: dataOrderOrKirim.namajenisorder,
            unittujuan: dataOrderOrKirim.unittujuan,
            unitasal: dataOrderOrKirim.unitasal,
            tglorder: dataOrderOrKirim.tglorder || dataOrderOrKirim.tglkirim,
            keterangan: dataOrderOrKirim.keterangan,
            isverif: dataOrderOrKirim?.isverif || false
        }
        tempres.order = dataOrder

        res.status(200).send({
            data: tempres,
            success: true,
            msg: 'Get Stok Batch Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Produk Obat Gagal',
            code: 500
        });
    }
}



const createOrUpdateKirimBarang = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res);
    if(errorTransaction) return
    try {
        const { createdOrUpdatedKirimBarang, noreckirim} =
            await hUpsertKirimBarang(req, res, transaction)

        const {createdKirimDetail} = 
            await hUpsertKirimDetail(
                req, 
                res, 
                transaction, 
                {
                    noreckirim: noreckirim
                }
            )

        await transaction.commit();
        const tempres = {
            createdOrUpdated: createdOrUpdatedKirimBarang,
            createdKirimDetail,
        }

        res.status(200).send({
            data: tempres,
            success: true,
            msg: 'kirim barang berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        await transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create or update kirim barang gagal',
            code: 500
        });
    }
}

const verifyKirim = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {noreckirim} = req.body
        const { stokUnit, kartuStokKirim } 
        = await db.sequelize.transaction(async (transaction) => {
            let kirimBarang = await t_kirimbarang.findByPk(noreckirim)
            let kirimBarangDetail = await t_kirimbarangdetail.findAll({
                where: {
                    objectdistribusibarangfk: noreckirim,
                }
            })
            if(!kirimBarang){
                throw new Error("Kirim barang tidak ada")
            }
            await kirimBarang.update({
                isverif: true,
                tglverif: new Date(),
                objectpegawaiterimafk: req.idPegawai
            }, {
                transaction: transaction
            })
            kirimBarang = kirimBarang.toJSON()
            kirimBarangDetail = kirimBarangDetail.map(det => det.toJSON())

            const {stokUnit}
                = await hUpdateStokUnit(
                    req, 
                    res, 
                    transaction, 
                    {
                        kirimBarang,
                        kirimBarangDetail
                    }
                )

            const {kartuStokKirim} =
                await hCreateKartuStokKirim(
                    req, 
                    res, 
                    transaction, 
                    {
                        stokUnit,
                        kirimBarang
                    }
                )
            return {
                stokUnit,
                kartuStokKirim
            }
        });
        
        const tempres = {
            stokUnit,
            kartuStokKirim
        };
        res.status(200).send({
            msg: 'Sukses verifikasi',
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

const tolakOrder = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            norecorder,
            alasantolak
        } = req.body
        const {
            orderBefore,
            orderAfter
        } = await db.sequelize.transaction(async (transaction) => {
            const order = await db.t_orderbarang.findByPk(norecorder, {
                transaction: transaction
            });
            if(!order) throw new Error(`Order tidak ditemukan ${norecorder}`)
            const orderBefore = order.toJSON()
            await order.update({
                istolak: true,
                alasantolak: alasantolak
            }, {
                transaction: transaction
            })
            const orderAfter = order.toJSON()
            return {
                orderBefore,
                orderAfter
            }
        });
        
        const tempres = {
            orderBefore: orderBefore,
            orderAfter: orderAfter
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

const tolakKirim = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            noreckirim,
            alasantolak
        } = req.body
        const {
            kirimBefore,
            kirimAfter
        } = await db.sequelize.transaction(async (transaction) => {
            const kirim = await db.t_kirimbarang.findByPk(noreckirim, {
                transaction: transaction
            });
            if(!kirim) throw new Error(`Kiriman tidak ditemukan ${noreckirim}`)
            const kirimBefore = kirim.toJSON()
            await kirim.update({
                istolak: true,
                alasantolak: alasantolak
            }, {
                transaction: transaction
            })
            const kirimAfter = kirim.toJSON()
            return {
                kirimBefore,
                kirimAfter
            }
        });
        
        const tempres = {
            kirimBefore,
            kirimAfter
        };

        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

export default {
    getStokBatch,
    getKemasanById,
    createOrUpdateOrderbarang,
    getOrderBarang,
    getOrderStokBatch,
    createOrUpdateKirimBarang,
    verifyKirim,
    tolakOrder,
    tolakKirim
}

const hUpsertOrderDetail = async (req, res, transaction, {norecorder}) => {
    const produks = req.body.isiproduk
    // const { body } = req
    await t_orderbarangdetail.destroy({
        where: {
            objectorderbarangfk: norecorder
        },
        transaction: transaction
    })
    const created = await Promise.all(
        produks.map(async(batch) => {
            const created = await t_orderbarangdetail.create({
                norec: uuid.v4().substring(0, 32),
                kdprofile: 0,
                statusenabled: true,
                objectorderbarangfk: norecorder,
                objectprodukfk: batch.value,
                qty: batch.qtyout,
                jumlah: batch.jumlah,
                objectsatuanfk: batch.satuan
            }, {
                transaction: transaction
            })
            
            return {created, }
        })
    )
    return created
}

const hUpsertKirimDetail = async (req, res, transaction, {noreckirim}) => {
    /**
     * @type {import("../../../queries/gudang/distribusi.queries").ListStokUnit}
     */
    const batches = req.body.batchproduk
    await t_kirimbarangdetail.destroy({
        where: {
            objectdistribusibarangfk: noreckirim
        },
        transaction: transaction
    })
    const createdKirimDetail = await Promise.all(
        batches.map(async(batch) => {
            const norec = uuid.v4().substring(0, 32)
            const createdKirimDetail = await t_kirimbarangdetail.create({
                norec: norec,
                kdprofile: 0,
                statusenabled: true,
                objectdistribusibarangfk: noreckirim,
                objectorderbarangdetailfk: batch.norecorderdetail,
                objectprodukfk: batch.value,
                nobatch: batch.nobatch,
                qty: batch.qtykirim,
                jumlah: batch.jumlah,
                objectsatuanfk: batch.satuan
            }, {
                transaction: transaction
            })
            
            return createdKirimDetail.toJSON()
        })
    )

    return {createdKirimDetail}
}

const hUpsertKirimBarang = async (req, res, transaction) => {
    let body = req.body
    let createdOrUpdatedKirimBarang
    let noreckirim
    if(!body.noreckirim){
        noreckirim = uuid.v4().substring(0, 32)
        createdOrUpdatedKirimBarang = await t_kirimbarang.create({
            norec: noreckirim,
            kdprofile: 0,
            statusenabled: true,
            objectorderbarangfk: body.norecorder || null,
            nopengiriman: body.nokirim,
            objectunitpengirimfk: body.unitpengirim,
            objectunittujuanfk: body.unitpenerima,
            objectjenisorderbarangfk: body.jeniskirim,
            keterangan: body.keterangankirim,
            tglinput: new Date(body.tanggalkirim),
            objectpegawaifk: req.idPegawai,
            islogistik: body.islogistik,
            istolak: false,
            alasantolak: null
        }, {
            transaction: transaction
        })
    }else{
        noreckirim = body.noreckirim
        const [_, updated] = await t_kirimbarang.update({
            kdprofile: 0,
            statusenabled: true,
            objectorderbarangfk: body.norecorder || null,
            nopengiriman: body.nokirim,
            objectunitpengirimfk: body.unitpengirim,
            objectunittujuanfk: body.unitpenerima,
            objectjenisorderbarangfk: body.jeniskirim,
            keterangan: body.keterangankirim,
            tglinput: new Date(body.tanggalkirim),
            objectpegawaifk: req.idPegawai,
            islogistik: body.islogistik,
            istolak: false,
            alasantolak: null
        }, {
            where: {
                norec: body.noreckirim
            },
            returning: true,
            transaction: transaction
        })
        createdOrUpdatedKirimBarang = updated[0]?.toJSON() || null;
    }
    return {createdOrUpdatedKirimBarang, noreckirim}
}

const hUpdateStokUnit = async (
    req, 
    res, 
    transaction, {
        kirimBarang,
        kirimBarangDetail
    }) => {
    let stokUnit = []
    stokUnit = await Promise.all(
        kirimBarangDetail.map(
            async (kirimDetail) => {
                const {
                    stokBarangAwalVal: stokPengirimAwalVal, 
                    stokBarangAkhirVal: stokPengirimAkhirVal
                } = await hUpsertStok(req, res, transaction, {
                    qtyDiff: -kirimDetail.qty,
                    nobatch: kirimDetail.nobatch,
                    objectprodukfk: kirimDetail.objectprodukfk,
                    objectunitfk: kirimBarang.objectunitpengirimfk
                })

                const {
                    stokBarangAwalVal: stokTujuanAwalVal, 
                    stokBarangAkhirVal: stokTujuanAkhirVal
                } = await hUpsertStok(req, res, transaction, {
                    qtyDiff: kirimDetail.qty,
                    nobatch: kirimDetail.nobatch,
                    objectprodukfk: kirimDetail.objectprodukfk,
                    objectunitfk: kirimBarang.objectunittujuanfk,
                    ed: stokPengirimAwalVal.ed,
                    persendiskon: stokPengirimAwalVal.persendiskon,
                    hargadiskon: stokPengirimAwalVal.hargadiskon,
                    harga: stokPengirimAwalVal.harga,
                    objectpenerimaanbarangdetailfk: stokPengirimAwalVal.objectpenerimaanbarangdetailfk,
                    tglterima: kirimBarang.tglinput,
                    objectasalprodukfk: stokPengirimAwalVal.objectasalprodukfk,
                })

                return {
                    stokPengirimAwalVal,
                    stokPengirimAkhirVal,
                    stokTujuanAwalVal,
                    stokTujuanAkhirVal, 
                }
            }
        )
    )
    return {stokUnit}
}


const hCreateKartuStokKirim = async (
    req,
    res,
    transaction,
    {
        stokUnit,
        kirimBarang
    }
) => {
    const kartuStokKirim = await Promise.all(
        stokUnit.map(
            async function ({
                stokPengirimAwalVal, 
                stokPengirimAkhirVal,
                stokTujuanAwalVal,
                stokTujuanAkhirVal
            }){
                const kartuStokPengirim = await hCreateKartuStok(
                    req,
                    res,
                    transaction,
                    {
                        idUnit: stokPengirimAwalVal.objectunitfk,
                        idProduk: stokPengirimAwalVal.objectprodukfk,
                        saldoAwal: stokPengirimAwalVal.qty,
                        saldoAkhir: stokPengirimAkhirVal.qty,
                        tabelTransaksi: "t_kirimbarangdetail",
                        norecTransaksi: kirimBarang.norec,
                        noBatch: stokPengirimAwalVal.nobatch,
                    }
                )
                let saldoAkhirTujuan = stokTujuanAkhirVal.qty
                let saldoAwalTujuan
                if(!stokTujuanAwalVal){
                    saldoAwalTujuan = 0
                }else{
                    saldoAwalTujuan = stokTujuanAwalVal.qty
                }
                const kartuStokTujuan = await hCreateKartuStok(
                    req,
                    res,
                    transaction,
                    {
                        idUnit: stokTujuanAkhirVal.objectunitfk,
                        idProduk: stokTujuanAkhirVal.objectprodukfk,
                        saldoAwal: saldoAwalTujuan,
                        saldoAkhir: saldoAkhirTujuan,
                        tabelTransaksi: "t_kirimbarangdetail",
                        norecTransaksi: kirimBarang.norec,
                        noBatch: stokTujuanAkhirVal.nobatch,
                    }
                )
                return {
                    kartuStokPengirim,
                    kartuStokTujuan
                }
            }
        )
    )
    return { kartuStokKirim}
}
