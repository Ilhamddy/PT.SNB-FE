import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import { qGetJenisDetailProdukLainLain, qGetSatuanLainLain, qGetSediaanLainLain,  } from "../../../queries/gudang/gudang.queries";
const m_produk = db.m_produk;


const createProdukObat = async (req, res) => {
    let transaction = null;
    try{
        transaction = await db.sequelize.transaction();
    }catch(e){
        console.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
        return;
    }
    try{
        const objectBody = req.body

        const createdProduk = await m_produk.create({
            kdprofile: 0,
            statusenabled: true,
            namaexternal: objectBody.namaproduk,
            reportdisplay: objectBody.namaproduk,
            objectdetailjenisprodukfk: objectBody.detailjenisproduk,
            deskripsiproduk: objectBody.deskripsikandungan,
            kekuatan: objectBody.kekuatan || null,
            namaproduk: objectBody.namaproduk,
            nilainormal: null,
            qtyjualterkecil: objectBody.satuanjual || null,
            objectsediaanfk: objectBody.sediaan || null,
            keterangan: "" || null,
            objectvariabelbpjsfk: objectBody.variabelbpjs || null,
            isobat: objectBody.tipeproduk === 1,
            isfornas: objectBody.isnasional,
            isforrs: objectBody.isrs,
            isbmhp: objectBody.tipeproduk === 2,
            objectgolonganobatfk: objectBody.golonganobat || null,
            isalkes: objectBody.tipeproduk === 3,
        }, { 
            transaction: transaction 
        });

        transaction.commit();

        res.status(200).send({
            data: {
                createdProduk: createdProduk
            },
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    }catch(error){
        console.error("==Error Create Produk Obat");
        console.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Produk Obat Gagal',
            code: 500
        });
    }
}

const getLainLain = async (req, res) => {
    try{
        const detailJenisProduk = await pool.query(qGetJenisDetailProdukLainLain, [])
        detailJenisProduk.rows = detailJenisProduk.rows.sort((a, b) => a.id - b.id)
        const sediaan = await pool.query(qGetSediaanLainLain, [])
        sediaan.rows = sediaan.rows.sort((a, b) => a.id - b.id)
        const satuan = await pool.query(qGetSatuanLainLain, [])
        satuan.rows = satuan.rows.sort((a, b) => a.id - b.id)

        const tempres = {
            detailjenisproduk: detailJenisProduk.rows,
            sediaan: sediaan.rows,
            satuan: satuan.rows
        }

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    }catch(error){
        console.error("==Error Lain Lain");
        console.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get lain lain gagal',
            code: 500
        });
    }
}

export default {
    createProdukObat,
    getLainLain
}