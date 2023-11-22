import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import { qGetAntreanFromDP, qGetObatFromUnit, qGetOrderResepFromDP, qGetOrderVerifResepFromDP } from "../../../queries/emr/emr.queries";
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { qGetSuratKeputusan, qGetTotalHargaProduk } from "../../../queries/master/tariftindakan/tariftindakan.queries";
import komponenprodukQueries from "../../../queries/mastertable/komponenproduk/komponenproduk.queries";
import asalprodukQueries from "../../../queries/mastertable/asalproduk/asalproduk.queries";
import produkQueries from "../../../queries/mastertable/produk/produk.queries";
import kelasQueries from "../../../queries/mastertable/kelas/kelas.queries";

const getTotalHargaProduk = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            namakode,
            kelas
        } = req.query
        const totalHargaProduk = await pool.query(
            qGetTotalHargaProduk, 
            [
                namakode || '', 
                kelas || ''
            ])
        const tempres = {
            totalHargaProduk: totalHargaProduk.rows
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

const getComboTarifTindakan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const komponenProduk = (await pool.query(komponenprodukQueries.getAll)).rows
        const suratKeputusan = (await pool.query(qGetSuratKeputusan)).rows
        const asalProduk = (await pool.query(asalprodukQueries.getAll)).rows
        const produk = (await pool.query(produkQueries.getAll)).rows
        const kelas = (await pool.query(kelasQueries.getAll)).rows
        const tempres = {
            komponenProduk: komponenProduk,
            suratKeputusan: suratKeputusan,
            asalProduk: asalProduk,
            produk: produk,
            kelas: kelas
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
    getTotalHargaProduk,
    getComboTarifTindakan
}