import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import { 
    qGetStokUnit, qKemasanFromId
} from "../../../queries/gudang/distribusi.queries";
import {
    createTransaction
} from "../../../utils/dbutils";
const t_orderbarang = db.t_orderbarang
const t_orderbarangdetail = db.t_orderbarangdetail
const t_stokunit = db.t_stokunit


export const getStokBatch = async (req, res) => {
    try{
        const { rows } = await pool.query(qGetStokUnit)
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
            createdOrUpdatedPenerimaan = updated[0]?.get() || null;
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

export default {
    getStokBatch,
    getKemasanById,
    createOrUpdateOrderbarang
}

const hCreateOrderDetail = async (req, res, transaction, {norecorder}) => {
    const batches = req.body.batchproduk
    // const { body } = req
    const created = await Promise.all(
        batches.map(async(batch) => {
            const created = await t_orderbarangdetail.create({
                norec: uuid.v4().substring(0, 32),
                kdprofile: 0,
                statusenabled: true,
                objectorderbarangfk: norecorder,
                objectprodukfk: batch.value,
                qty: batch.qtyout,
                jumlah: 0,
                objectsatuanfk: batch.satuankirim
            }, {
                transaction: transaction
            })
            
            return {created, }
        })
    )
    return created
}

// let stokUnitModel = await t_stokunit.findOne({
//     where: {
//         nobatch: batch.nobatch
//     },
//     lock: transaction.LOCK.UPDATE,
// })
// const stokUnit = stokUnitModel?.get() || null
// const saldoAwal = stokUnit?.qty || 0
// let saldoAkhir = saldoAwal - batch.qtyout
// const masuk = saldoAkhir > saldoAwal ? saldoAkhir - saldoAwal : 0
// const keluar = saldoAwal > saldoAkhir ? saldoAwal - saldoAkhir : 0

// if(stokUnitModel){
//     await stokUnitModel.update({
//         qty: saldoAkhir
//     }, {
//         transaction: transaction
//     })
// }
// const norecKartuStok = uuid.v4().substring(0, 32)
// const createdKartuStok = await t_kartustok.create({
//     norec: norecKartuStok,
//     kdprofile: 0,
//     statusenabled: true,
//     objectunitfk: body.unittujuan,
//     objectprodukfk: batch.value,
//     saldoawal: saldoAwal,
//     masuk: masuk,
//     keluar: keluar,
//     saldoakhir: saldoAkhir,
//     keteranan: "",
//     status: false,
//     tglinput: new Date(),
//     tglupdate: new Date(),
//     tabeltransaksi: "t_orderbarangdetail",
//     norectransaksi: createdOrUpdatedPenerimaan.norec,
//     batch: createdOrUpdated.nobatch
// }, {
//     transaction: transaction
// })