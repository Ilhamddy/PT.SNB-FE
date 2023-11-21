import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import { qGetAntreanFromDP, qGetObatFromUnit, qGetOrderResepFromDP, qGetOrderVerifResepFromDP } from "../../../queries/emr/emr.queries";
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { qGetLayanan } from "../../../queries/master/layanan/layanan.queries";
import jenisprodukQueries from "../../../queries/mastertable/jenisproduk/jenisproduk.queries";
import detailjenisprodukQueries from "../../../queries/mastertable/detailjenisproduk/detailjenisproduk.queries";
import variabelbpjsQueries from "../../../queries/mastertable/variabelbpjs/variabelbpjs.queries";
import instalasiQueries from "../../../queries/mastertable/instalasi/instalasi.queries";
import jenisoperasiQueries from "../../../queries/mastertable/jenisoperasi/jenisoperasi.queries";
import { statusEnabled, valueStatusEnabled } from "../../../queries/mastertable/globalvariables/globalvariables.queries";

const getComboTambahLayanan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const jenisProduk = await pool.query(jenisprodukQueries.getAll)
        const detailJenisProduk = await pool.query(detailjenisprodukQueries.getAll)
        const variabelBPJS = await pool.query(variabelbpjsQueries.getAll)
        const instalasi = await pool.query(instalasiQueries.getAll)
        const jenisOperasi = await pool.query(jenisoperasiQueries.getAll)
        const statusEnabled = valueStatusEnabled()
        const tempres = {
            jenisProduk: jenisProduk.rows,
            detailJenisProduk: detailJenisProduk.rows,
            variabelBPJS: variabelBPJS.rows,
            instalasi: instalasi.rows,
            jenisOperasi: jenisOperasi.rows,
            statusEnabled: statusEnabled
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

const upsertLayanan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const reqBody = req.body
        const {dataLayanan}  
        = await db.sequelize.transaction(async (transaction) => {
            let dataFinal = null
            if(!reqBody.idproduk){
                const dataCreated = await db.m_produk.create({
                    kdprofile: 0,
                    statusenabled: reqBody.statusenabled === statusEnabled.TRUE,
                    kodeexternal: reqBody.kodelayanan,
                    namaexternal: reqBody.namalayanan,
                    reportdisplay: reqBody.namalayanan,
                    objectbentukprodukfk: null,
                    objectinstalasifk: reqBody.instalasi,
                    objectdetailjenisprodukfk: reqBody.detailjenisproduk,
                    objectkategoriprodukfk: null,
                    objectsatuanbesarfk: null,
                    objectsatuankecilfk: null,
                    objectsatuanstandarfk: null,
                    objectstatusprodukfk: null,
                    deskripsiproduk: reqBody.deskripsilayanan,
                    kekuatan: null,
                    namaproduk: reqBody.namalayanan,
                    nilainormal: null,
                    qtyjualterkecil: null,
                    objectjenisperiksapenunjangfk: null,
                    objectgenerikfk: null,
                    objectsediaanfk: null,
                    keterangan: "",
                    objectvariabelbpjsfk: reqBody.variabelbpjs,
                    isobat: false,
                    isfornas: false,
                    isforrs: false,
                    isobatkronis: false,
                    isbmhp: false,
                    objectgolonganobatfk: null,
                    isalkes: false,
                    tglinput: new Date(),
                    tglupdate: new Date(),
                    objectpegawaiinputfk: req.idPegawai,
                    objectpegawaiupdatefk: req.idPegawai,
                    barcode: null,
                    islogistik: false,
                }, {
                    transaction: transaction
                })
                dataFinal = dataCreated.toJSON()
            } else{
                const dataFound = await db.m_produk.findByPk(
                    reqBody.idproduk, 
                    {
                        transaction: transaction
                    })
                await dataFound.update({
                    kdprofile: 0,
                    statusenabled: reqBody.statusenabled === statusEnabled.TRUE,
                    kodeexternal: reqBody.kodelayanan,
                    namaexternal: reqBody.namalayanan,
                    reportdisplay: reqBody.namalayanan,
                    objectinstalasifk: reqBody.instalasi,
                    objectdetailjenisprodukfk: reqBody.detailjenisproduk,
                    deskripsiproduk: reqBody.deskripsilayanan,
                    objectvariabelbpjsfk: reqBody.variabelbpjs,
                    tglinput: new Date(),
                    tglupdate: new Date(),
                    objectpegawaiinputfk: req.idPegawai,
                    objectpegawaiupdatefk: req.idPegawai,
                }, {
                    transaction: transaction
                })
                dataFinal = dataFound.toJSON()
            }
            return {
                dataLayanan: dataFinal
            }
        });
        
        const tempres = {
            dataLayanan
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

const getLayanan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { idlayanan } = req.query
        const layanan = (await pool.query(qGetLayanan, [idlayanan])).rows
        if(!layanan[0]) throw new Error("Layanan tidak ditemukan")
        const tempres = {
            layanan: layanan[0]
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
    getComboTambahLayanan,
    upsertLayanan,
    getLayanan
}