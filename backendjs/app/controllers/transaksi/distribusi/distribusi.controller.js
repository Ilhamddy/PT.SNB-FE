import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import { 
    qGetStokUnit, qKemasanFromId
} from "../../../queries/gudang/distribusi.queries";
import {
    createTransaction
} from "../../../utils/dbutils";
const t_penerimaanbarangdetail = db.t_penerimaanbarangdetail
const t_stokunit = db.t_stokunit
const t_kartustok = db.t_kartustok


export const getStokBatch = async (req, res) => {
    try{
        const { rows } = await pool.query(qGetStokUnit)
        let datas = []
        // kelompokkan sesuai produk
        rows.forEach((stok) => {
            const iProdukFound = datas.findIndex((data) => {
                return data.produkid === stok.produkid
            })
            if(iProdukFound < 0){
                datas.push({
                    produkid: stok.produkid,
                    value: [{...stok}],
                    label: stok.label,
                })
            }else{
                datas[iProdukFound].value = [...datas[iProdukFound].value, {...stok}]
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
        // id kemasan boleh kosong
        const kemasan = (await pool.query(qKemasanFromId, [idkemasan]));

        let tempres = {
            kemasan: kemasan.rows
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

export default {
    getStokBatch,
    getKemasanById
}