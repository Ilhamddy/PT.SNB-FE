import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/registrasi.queries';
import { qGetObatFromUnit, qGetOrderResepFromDP } from "../../../queries/emr/emr.queries";
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { hProcessOrderResep } from "../emr/emr.controller";

const t_emrpasien = db.t_emrpasien
const t_ttv = db.t_ttv
const t_cppt = db.t_cppt
const t_diagnosapasien = db.t_diagnosapasien
const t_diagnosatindakan = db.t_diagnosatindakan
const t_orderresep = db.t_orderresep
const t_orderresepdetail = db.t_orderresepdetail

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


export default {
    getOrderResepQuery
}