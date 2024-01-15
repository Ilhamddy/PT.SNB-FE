import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { qGetSuratKeputusan, qGetTotalHargaProduk, qGetTotalTarifTindakan } from "../../../queries/master/tariftindakan/tariftindakan.queries";
import komponenprodukQueries from "../../../queries/mastertable/komponenproduk/komponenproduk.queries";
import asalprodukQueries from "../../../queries/mastertable/asalproduk/asalproduk.queries";
import produkQueries from "../../../queries/mastertable/produk/produk.queries";
import kelasQueries from "../../../queries/mastertable/kelas/kelas.queries";
import { daftarMataUang } from "../../../queries/mastertable/matauang/matauang.queries";

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

const upsertTarifTindakan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const reqBody = req.body
        const {
            createdOrUpdated,
            createdKomponen,
            deletedKomponen
        } = await db.sequelize.transaction(async (transaction) => {
            let createdOrUpdated
            if(reqBody.id){
                const totalHargaModel = await db
                    .m_totalhargaprodukbykelas
                    .findByPk(reqBody.id, {
                        transaction: transaction
                    })
                if(!totalHargaModel) throw new Error("Total harga tidak ada")
                totalHargaModel.update({
                    kdprofile: 0,
                    statusenabled: true,
                    kodeexternal: reqBody.kodetarif,
                    namaexternal: reqBody.namatarif,
                    reportdisplay: reqBody.namatarif,
                    objectprodukfk: reqBody.namatindakan,
                    objectjenistariffk: 1,
                    objectkelasfk: reqBody.kelas,
                    objectmatauangfk: daftarMataUang.RUPIAH,
                    totalharga: reqBody.totalharga,
                    tglberlakuakhir: new Date(reqBody.tglawal),
                    tglberlakuawal: new Date(reqBody.tglakhir),
                    objectsuratkeputusanfk: reqBody.suratkeputusan
                }, {
                    transaction: transaction
                })
                createdOrUpdated = totalHargaModel.toJSON()
            } else {
                const created = await  db.m_totalhargaprodukbykelas.create({
                    kdprofile: 0,
                    statusenabled: true,
                    kodeexternal: reqBody.kodetarif,
                    namaexternal: reqBody.namatarif,
                    reportdisplay: reqBody.namatarif,
                    objectprodukfk: reqBody.namatindakan,
                    objectjenistariffk: 1,
                    objectkelasfk: reqBody.kelas,
                    objectmatauangfk: daftarMataUang.RUPIAH,
                    totalharga: reqBody.totalharga,
                    qtycurrentstok: null,
                    tglberlakuakhir: new Date(reqBody.tglawal),
                    tglberlakuawal: new Date(reqBody.tglakhir),
                    tglkadaluarsalast: null,
                    objectjenispelayananfk: null,
                    objectsuratkeputusanfk: reqBody.suratkeputusan
                }, {
                    transaction: transaction
                })
                createdOrUpdated = created.toJSON()
            }
            const {
                createdKomponen,
                deletedKomponen
            } = await hInsertHargaProdukPerKomponen(req, res, transaction, {
                createdOrUpdatedTotal: createdOrUpdated
            })
            return {
                createdOrUpdated,
                createdKomponen,
                deletedKomponen
            }
        });
        
        const tempres = {
            createdOrUpdated: createdOrUpdated,
            createdKomponen: createdKomponen,
            deletedKomponen: deletedKomponen
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
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getTotalTarif = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { idtotal } = req.query
        const totalTarif = (await pool.query(qGetTotalTarifTindakan, [idtotal])).rows
        if(!totalTarif[0]) throw new Error("Total tarif tidak ada")
        const tempres = {
            totalTarif: totalTarif[0]
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
    getComboTarifTindakan,
    upsertTarifTindakan,
    getTotalTarif,
}

const hInsertHargaProdukPerKomponen = async (req, res, transaction, {
    createdOrUpdatedTotal
}) => {
    const reqBody = req.body
    const komponenHarga = reqBody.komponenharga
    let deletedKomponen = []
    if(reqBody.id){
        const deletedModel = await db.m_hargaprodukperkomponen.findAll({
            where: {
                objecttotalhargaprodukbykelasfk: reqBody.id
            }
        }, {
            transaction: transaction
        })
        deletedKomponen = deletedModel.map((m) => m.toJSON())
        Promise.all(
            deletedModel.map(async (data) => await data.destroy())
        )
    }
    const createdKomponen = await Promise.all(
        komponenHarga.map(
            async (data) => {
                const created = await db.m_hargaprodukperkomponen.create({
                    kdprofile: 0,
                    statusenabled: true,
                    kodeexternal: null,
                    namaexternal: null,
                    reportdisplay: null,
                    objectasalprodukfk: null,
                    objecttotalhargaprodukbykelasfk: createdOrUpdatedTotal.id,
                    objectjenistariffk: 1,
                    objectkomponenprodukfk: data.komponenharga,
                    objectmatauangfk: daftarMataUang.RUPIAH,
                    harga: data.harga,
                    hargasatuan: data.harga,
                    qtycurrentstok: null,
                    tglberlakuakhir: new Date(reqBody.tglakhir),
                    tglberlakuawal: new Date(reqBody.tglawal),
                    tglkadaluarsalast: null,
                    objectjenispelayananfk: null,
                    objectsuratkeputusanfk: reqBody.suratkeputusan
                }, {
                    transaction: transaction
                })
                return created.toJSON()
            }
        )
    )

    return {createdKomponen, deletedKomponen}
}