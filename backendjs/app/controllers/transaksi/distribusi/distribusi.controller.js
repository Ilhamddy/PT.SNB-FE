import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import { 
    qGetOrder,
    qGetOrderStok,
    qGetStokUnit, qKemasanFromId
} from "../../../queries/gudang/distribusi.queries";
import gudangController, { generateKodeBatch, hCreateKartuStok } from "../gudang/gudang.controller"
import {
    createTransaction
} from "../../../utils/dbutils";
const t_orderbarang = db.t_orderbarang
const t_orderbarangdetail = db.t_orderbarangdetail
const t_kirimbarang = db.t_kirimbarang
const t_kirimbarangdetail = db.t_kirimbarangdetail
const t_stokunit = db.t_stokunit


export const getStokBatch = async (req, res) => {
    try{
        const { idunit } = req.query
        const { rows } = await pool.query(qGetStokUnit, [idunit])
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
        console.error("==error get stok batch==")
        console.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Produk Obat Gagal',
            code: 500
        });
    }
}

const getKemasanById = async (req, res) => {
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
        console.error("===get combo setting error=== ")
        console.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }
}

const createOrUpdateOrderbarang = async (req, res) => {
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
            }, {
                transaction: transaction
            })
        }else{
            norecorder = body.norecorder
            const [_, updated] = await t_orderbarang.update({
                noorder: body.noorder,
                objectunitasalfk: body.unitorder || null,
                objectunittujuanfk: body.unittujuan || null,
                objectjenisorderbarangfk: body.jenisorder || null,
                keterangan: body.keterangan,
                tglinput: new Date(body.tanggalorder),
                objectpegawaifk: req.idPegawai,
                objectstatusveriffk: 1,
            }, {
                where: {
                    norec: body.norecorder
                },
                returning: true,
                transaction: transaction
            })
            createdOrUpdatedPenerimaan = updated[0]?.toJSON() || null;
        }

        const createdDetail = await hCreateOrderDetail(req, res, transaction, {norecorder})
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
        console.error("==Create or update produk penerimaan gagal");
        console.error(error)
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
    try {
        const order = (await pool.query(qGetOrder, []));
        if(order.rows.length === 0) throw new Error("order not found")
        let tempres = {
            order: order.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error){
        console.error("===get combo setting error=== ")
        console.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }
}

export const getOrderStokBatch = async (req, res) => {
    try{
        const norecorder = req.query.norecorder
        if(!norecorder) throw new Error("norecorder is required");

        const { rows: rowsOrder } = await pool.query(qGetOrderStok, [norecorder])
        let datas = []
        
        // kelompokkan sesuai produk
        rowsOrder.forEach((stok) => {
            const iProdukFound = datas.findIndex((data) => {
                return data.value === stok.value
            })
            if(iProdukFound < 0){
                datas.push({
                    value: stok.value,
                    qty: stok.qty,
                    qtyout: stok.qtyout,
                    batchproduk: [{...stok}],
                    label: stok.label,
                })
            }else{
                datas[iProdukFound].batchproduk = [...datas[iProdukFound].batchproduk, {...stok}]
                datas[iProdukFound].qty = datas[iProdukFound].qty + stok.qty
            }
        })

        let tempres = {
            order: null,
            itemorders: datas
        }

        if(rowsOrder.length === 0) {
            res.status(200).send({
                data: tempres,
                success: true,
                msg: 'Get Stok Batch Berhasil',
                code: 200
            });
            return
        }

        const dataOrder = { 
            noreckirim: rowsOrder[0].noreckirim,
            tglkirim: rowsOrder[0].tglkirim,
            nokirim: rowsOrder[0].nokirim,
            keterangankirim: rowsOrder[0].keterangankirim,
            norecorder: rowsOrder[0].norecorder,
            jenisorder: rowsOrder[0].jenisorder,
            noorder: rowsOrder[0].noorder,
            namajenisorder: rowsOrder[0].namajenisorder,
            unittujuan: rowsOrder[0].unittujuan,
            unitasal: rowsOrder[0].unitasal,
            tglorder: rowsOrder[0].tglorder,
            keterangan: rowsOrder[0].keterangan,
        }
        tempres.order = dataOrder

        res.status(200).send({
            data: tempres,
            success: true,
            msg: 'Get Stok Batch Berhasil',
            code: 200
        });
    }catch(error){
        console.error("==error get stok batch==")
        console.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Produk Obat Gagal',
            code: 500
        });
    }
}



const createOrUpdateKirimBarang = async (req, res) => {
    const [transaction, errorTransaction] = await createTransaction(db, res);
    if(errorTransaction) return
    try {
        const { createdOrUpdatedKirimBarang, noreckirim} =
            await hCreateKirimBarang(req, res, transaction)

        const {createdKirimDetail} = 
            await hCreateKirimDetail(
                req, 
                res, 
                transaction, 
                {
                    noreckirim: noreckirim
                }
            )
    
        const {createdOrUpdatedStokUnit}
            = await hCreateDetail(
                req, 
                res, 
                transaction, 
                {
                    createdOrUpdatedKirimBarang,
                    createdKirimDetail
                }
            )

        const {createdKartuStokKirim} =
            await hCreateKartuStokKirim(
                req, 
                res, 
                transaction, 
                {
                    createdOrUpdatedStokUnit,
                    createdKirimDetail
                }
            )
        
        await transaction.commit();
        const tempres = {
            createdOrUpdated: createdOrUpdatedKirimBarang,
            createdKirimDetail,
            createdOrUpdatedStokUnit,
            createdKartuStokKirim
        }

        res.status(200).send({
            data: tempres,
            success: true,
            msg: 'Create or update kirim barang berhasil',
            code: 200
        });
    }catch(error){
        console.error("==Create or update kirim barang gagal");
        console.error(error)
        await transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create or update kirim barang gagal',
            code: 500
        });
    }
} 

export default {
    getStokBatch,
    getKemasanById,
    createOrUpdateOrderbarang,
    getOrderBarang,
    getOrderStokBatch,
    createOrUpdateKirimBarang
}

const hCreateOrderDetail = async (req, res, transaction, {norecorder}) => {
    const produks = req.body.isiproduk
    // const { body } = req
    const created = await Promise.all(
        produks.map(async(batch) => {
            const created = await t_orderbarangdetail.create({
                norec: uuid.v4().substring(0, 32),
                kdprofile: 0,
                statusenabled: true,
                objectorderbarangfk: norecorder,
                objectprodukfk: batch.value,
                qty: batch.qtyout,
                jumlah: 0,
                objectsatuanfk: batch.satuan
            }, {
                transaction: transaction
            })
            
            return {created, }
        })
    )
    return created
}

const hCreateKirimDetail = async (req, res, transaction, {noreckirim}) => {
    /**
     * @type {import("../../../queries/gudang/distribusi.queries").ListStokUnit}
     */
    const batches = req.body.batchproduk
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
            
            return createdKirimDetail
        })
    )

    return {createdKirimDetail}
}

const hCreateKirimBarang = async (req, res, transaction) => {
    let body = req.body
    let createdOrUpdatedKirimBarang
    let noreckirim
    if(!body.noreckirim){
        noreckirim = uuid.v4().substring(0, 32)
        createdOrUpdatedKirimBarang = await t_kirimbarang.create({
            norec: noreckirim,
            kdprofile: 0,
            statusenabled: true,
            objectorderbarangfk: body.norecorder,
            nopengiriman: body.nokirim,
            objectunitpengirimfk: body.unitpengirim,
            objectunittujuanfk: body.unitpenerima,
            objectjenisorderbarangfk: body.jeniskirim,
            keterangan: body.keterangankirim,
            tglinput: new Date(body.tanggalkirim),
            objectpegawaifk: req.idPegawai
        }, {
            transaction: transaction
        })
    }else{
        noreckirim = body.noreckirim
        const [_, updated] = await t_kirimbarang.update({
            kdprofile: 0,
            statusenabled: true,
            objectorderbarangfk: body.norecorder,
            nopengiriman: body.nokirim,
            objectunitpengirimfk: body.unitpengirim,
            objectunittujuanfk: body.unitpenerima,
            objectjenisorderbarangfk: body.jeniskirim,
            keterangan: body.keterangankirim,
            tglinput: new Date(body.tanggalkirim),
            objectpegawaifk: req.idPegawai
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

const hCreateDetail = async (
    req, 
    res, 
    transaction, {
        createdOrUpdatedKirimBarang,
        createdKirimDetail
    }) => {
    let createdOrUpdatedStokUnit = []
    createdOrUpdatedStokUnit = await Promise.all(
        createdKirimDetail.map(
            async (createdKirimDetail) => {
                const stokPengirim = await t_stokunit.findOne({
                    where: {
                        kodebatch: generateKodeBatch(
                            createdKirimDetail.nobatch,
                            createdKirimDetail.objectprodukfk,
                            createdOrUpdatedKirimBarang.objectunitpengirimfk
                        ),
                    },
                    lock: transaction.LOCK.UPDATE
                })

                let stokPengirimAwalVal = stokPengirim?.toJSON() || null
                
                const stokTujuanAwalVal = await t_stokunit.findOne({
                    where: {
                        kodebatch: generateKodeBatch(
                            createdKirimDetail.nobatch,
                            createdKirimDetail.objectprodukfk,
                            createdOrUpdatedKirimBarang.objectunittujuanfk
                        ),
                    },
                    lock: transaction.LOCK.UPDATE
                })
                
                let stokTujuanAkhirVal

                if(!stokTujuanAwalVal){
                    stokTujuanAkhirVal = await t_stokunit.create({
                        norec: uuid.v4().substring(0, 32),
                        kdprofile: 0,
                        statusenabled: true,
                        objectunitfk: createdOrUpdatedKirimBarang.objectunittujuanfk,
                        objectasalprodukfk: stokPengirimAwalVal.objectasalprodukfk,
                        objectprodukfk: stokPengirimAwalVal.objectprodukfk,
                        nobatch: createdKirimDetail.nobatch,
                        ed: stokPengirimAwalVal.ed,
                        persendiskon: stokPengirimAwalVal.persendiskon,
                        hargadiskon: stokPengirimAwalVal.hargadiskon,
                        harga: stokPengirimAwalVal.harga,
                        qty: createdKirimDetail.qty,
                        objectpenerimaanbarangdetailfk: stokPengirimAwalVal.objectpenerimaanbarangdetailfk,
                        tglterima: createdOrUpdatedKirimBarang.tglinput,
                        tglinput: new Date(),
                        tglupdate: new Date(),
                        kodebatch: generateKodeBatch(
                            createdKirimDetail.nobatch,
                            createdKirimDetail.objectprodukfk,
                            createdOrUpdatedKirimBarang.objectunittujuanfk
                        )
                    }, {
                        transaction: transaction
                    })
                }else{
                    const qty = stokTujuanAwalVal.qty + createdKirimDetail.qty
                    if(qty < 0){
                        throw new Error("Stok tidak cukup")
                    }
                    let updated = await stokTujuanAwalVal.update({
                        qty: qty
                    }, {
                        transaction: transaction,
                    })
                    stokTujuanAkhirVal = updated?.toJSON() || null
                }
                let stokPengirimUpdated = await stokPengirim.update({
                    qty: stokPengirimAwalVal.qty - createdKirimDetail.qty
                }, {
                    returning: true,
                    transaction: transaction
                })

                const stokPengirimAkhirVal = stokPengirimUpdated?.toJSON() || null
                
                return {
                    stokPengirimAwalVal,
                    stokPengirimAkhirVal,
                    stokTujuanAwalVal,
                    stokTujuanAkhirVal, 
                }
            }
        )
    )
    return {createdOrUpdatedStokUnit}
}


const hCreateKartuStokKirim = async (
    req,
    res,
    transaction,
    {
        createdOrUpdatedStokUnit,
        createdKirimDetail
    }
) => {
    const createdKartuStokKirim = await Promise.all(
        createdOrUpdatedStokUnit.map(
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
                        norecTransaksi: createdKirimDetail.norec,
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
                        norecTransaksi: createdKirimDetail.norec,
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
    return {createdKartuStokKirim}
}