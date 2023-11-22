import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import { qGetAntreanFromDP, qGetObatFromUnit, qGetOrderResepFromDP, qGetOrderVerifResepFromDP } from "../../../queries/emr/emr.queries";
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { qGetDetailJenisProduk, qGetJenisProduk, qGetLayanan, qGetLayananMapping, qGetMapUnitToProduk } from "../../../queries/master/layanan/layanan.queries";
import jenisprodukQueries from "../../../queries/mastertable/jenisproduk/jenisproduk.queries";
import detailjenisprodukQueries from "../../../queries/mastertable/detailjenisproduk/detailjenisproduk.queries";
import variabelbpjsQueries from "../../../queries/mastertable/variabelbpjs/variabelbpjs.queries";
import instalasiQueries from "../../../queries/mastertable/instalasi/instalasi.queries";
import jenisoperasiQueries from "../../../queries/mastertable/jenisoperasi/jenisoperasi.queries";
import { statusEnabled, valueStatusEnabled } from "../../../queries/mastertable/globalvariables/globalvariables.queries";
import unitQueries from "../../../queries/mastertable/unit/unit.queries"

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

const getComboMapRuangPelayanan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const instalasi = (await pool.query(instalasiQueries.getAll)).rows
        const unit = (await pool.query(unitQueries.getAll)).rows
        const jenisProduk = (await pool.query(jenisprodukQueries.getAll)).rows
        const detailJenisProduk = (await pool.query(detailjenisprodukQueries.getAll)).rows
        const tempres = {
            instalasi: instalasi,
            unit: unit,
            jenisProduk: jenisProduk,
            detailJenisProduk: detailJenisProduk
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

const getMapUnitToProduk = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { unit } = req.query
        const mapping = (await pool.query(qGetMapUnitToProduk, [unit])).rows
        const tempres = {
            mapping: mapping
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

const getLayananMapping = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            instalasi,
            jenisproduk,
            detailjenisproduk,
            namalayanan,
        } = req.query
        const layanan = (await pool.query(qGetLayananMapping, [
            instalasi || '', 
            jenisproduk || '',
            detailjenisproduk || '',
            namalayanan || ''
        ])).rows
        const tempres = {
            layanan: layanan
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

const saveOrDeleteMapping = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { idproduk, idunit, idmapping } = req.body
        const { createdOrDeleted } 
        = await db.sequelize.transaction(async (transaction) => {
            let createdOrDeleted = null
            if(idmapping){
                const mapModel = await db.m_mapunittoproduk.findByPk(idmapping, {
                    transaction: transaction
                })
                createdOrDeleted = mapModel.toJSON()
                await mapModel.destroy({
                    transaction: transaction
                })
            }else{
                const created = await db.m_mapunittoproduk.create({
                    kdprofile: 0,
                    objectprodukfk: idproduk,
                    objectunitfk: idunit,
                }, {
                    transaction: transaction
                })
                createdOrDeleted = created.toJSON()
            }
            return {
                createdOrDeleted: createdOrDeleted
            }
        });
        
        const tempres = {
            createdOrDeleted: createdOrDeleted
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

const getLainLain = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const jenisProduk = (await pool.query(qGetJenisProduk)).rows
        const comboJenisProduk = jenisProduk.map((data) => ({
            value: data.idjenisproduk,
            label: data.namajenisproduk,
            instalasi: data.instalasi
        }))
        const detailJenisProduk = (await pool.query(qGetDetailJenisProduk)).rows
        const instalasi = (await pool.query(instalasiQueries.getAll)).rows
        const statusEnabled = valueStatusEnabled()
        const tempres = {
            jenisProduk: jenisProduk,
            detailJenisProduk: detailJenisProduk,
            statusEnabled: statusEnabled,
            instalasi: instalasi,
            comboJenisProduk: comboJenisProduk
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

const upsertJenisProduk = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const reqBody = req.body
        const {
            createdOrUpdated
        } = await db.sequelize.transaction(async (transaction) => {
            let createdOrUpdated = null
            if(reqBody.id) {
                const jenisProdukModel = await db.m_jenisproduk.findByPk(reqBody.id, {
                    transaction: transaction
                })
                if(!jenisProdukModel) throw new Error("Jenis Produk tidak ada ")
                await jenisProdukModel.update({
                    namaexternal: reqBody.namajenisproduk,
                    reportdisplay:reqBody.namajenisproduk,
                    jenisproduk: reqBody.namajenisproduk,
                    statusEnabled: reqBody.statusenabled === statusEnabled.TRUE
                }, {
                    transaction: transaction
                })
                createdOrUpdated = jenisProdukModel.toJSON()
            } else {
                const createdModel = await db.m_jenisproduk.create({
                    kdprofile: 0,
                    statusenabled: reqBody.statusenabled === statusEnabled.TRUE,
                    kodeexternal: null,
                    namaexternal: reqBody.namajenisproduk,
                    reportdisplay: reqBody.namajenisproduk,
                    objectinstalasifk: reqBody.instalasi,
                    objectjenisprodukheadfk: null,
                    objectkelompokprodukfk: null,
                    jenisproduk: reqBody.namajenisproduk,
                    umurasset: null,
                    objectpenerimaankasirfk: null,
                })
                createdOrUpdated = createdModel.toJSON()
            }
            return {
                createdOrUpdated: createdOrUpdated
            }
        });
        
        const tempres = {
            createdOrUpdated
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

const upsertDetailJenisProduk = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const reqBody = req.body
        const {
            upserted
        } = await db.sequelize.transaction(async (transaction) => {
            let upserted = null
            if(reqBody.id){
                const detailModel = await db.m_detailjenisproduk
                    .findByPk(reqBody.id, {
                        transaction: transaction
                    })
                if(!detailModel) throw new Error("Detail tidak ditemukan")
                await detailModel.update({
                    namaexternal: reqBody.namadetailjenisproduk,
                    reportdisplay: reqBody.namadetailjenisproduk,
                    objectinstalasifk: reqBody.instalasi,
                    objectjenisprodukfk: reqBody.jenisproduk,
                    detailjenisproduk: reqBody.namadetailjenisproduk,
                    tglupdate: new Date(),
                    objectpegawaiupdatefk: req.idPegawai
                }, {
                    transaction: transaction
                })
                upserted = detailModel.toJSON()
            } else {
                const created = await db.m_detailjenisproduk.create({
                    kdprofile: 0,
                    statusenabled: reqBody.statusenabled === statusEnabled.TRUE,
                    kodeexternal: null,
                    namaexternal: reqBody.namadetailjenisproduk,
                    reportdisplay: reqBody.namadetailjenisproduk,
                    objectinstalasifk: reqBody.instalasi,
                    objectjenisprodukfk: reqBody.jenisproduk,
                    detailjenisproduk: reqBody.namadetailjenisproduk,
                    persenhargacito: null,
                    tglinput: new Date(),
                    tglupdate: new Date(),
                    objectpegawaiinputfk: req.idPegawai,
                    objectpegawaiupdatefk: req.idPegawai
                }, {
                    transaction: transaction
                })
                upserted = created.toJSON()
            }
            return {
                upserted
            }
        });
        
        const tempres = {
            upserted: upserted
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
    getLayanan,
    getComboMapRuangPelayanan,
    getMapUnitToProduk,
    getLayananMapping,
    saveOrDeleteMapping,
    getLainLain,
    upsertJenisProduk,
    upsertDetailJenisProduk
}