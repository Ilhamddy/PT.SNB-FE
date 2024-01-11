import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import { 
    qGetDetailPemesanan, 
    qGetDetailPenerimaan, 
    qGetJenisDetailProdukLainLain, 
    qGetKartuStok, 
    qGetKemasan, 
    qGetListPemesanan, 
    qGetListPenerimaan, 
    qGetPemesanan, 
    qGetPenerimaan, 
    qGetProdukEdit, 
    qGetProdukKonversi, 
    qGetProdukKonversiFromId, 
    qGetProdukMaster, 
    qGetSatuanFromProduk, 
    qGetSatuanLainLain, 
    qGetSediaanLainLain,
    qGetStokOpname,
    qGetStokOpnameDetail,
    qGetStokOpnameStokUnit,
    qGetStokUnit,
    qGetUnitUser,
    qGetDetailRetur, 
    qGetReturBarang,
    qGetListRetur,
    qGetDetailReturFromDetailPenerimaan,
    qGetLaporanPengadaan,
    qGetLaporanPenerimaan
} from "../../../queries/gudang/gudang.queries";
import unitQueries, { daftarUnit } from "../../../queries/mastertable/unit/unit.queries"
import {
    createTransaction
} from "../../../utils/dbutils";
import { getDateEndNull, getDateStartNull } from "../../../utils/dateutils";
import { NotFoundError } from "../../../utils/errors";
import { hUpsertObatSatuSehat } from "../satuSehat/satuSehatMedication.helper";
const m_produk = db.m_produk;
const m_detailjenisproduk = db.m_detailjenisproduk;
const m_sediaan = db.m_sediaan
const m_satuan = db.m_satuan
const m_kemasanproduk = db.m_kemasanproduk
const t_penerimaanbarang = db.t_penerimaanbarang
const t_penerimaanbarangdetail = db.t_penerimaanbarangdetail
const t_stokunit = db.t_stokunit
const t_kartustok = db.t_kartustok
const t_stokopname = db.t_stokopname
const t_stokopnamedetail = db.t_stokopnamedetail



const createOrUpdateProdukObat = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction]
        = await createTransaction(db, res)
    if(errorTransaction) return
    try{
        const objectBody = req.body

        let upsertedProduk
        if(!objectBody.idproduk){
            upsertedProduk = await m_produk.create({
                kdprofile: 0,
                statusenabled: true,
                namaexternal: objectBody.namaproduk,
                reportdisplay: objectBody.namaproduk,
                objectdetailjenisprodukfk: objectBody.detailjenisproduk,
                deskripsiproduk: objectBody.deskripsikandungan,
                kekuatan: objectBody.kekuatan || null,
                namaproduk: objectBody.namaproduk,
                nilainormal: null,
                objectsatuanstandarfk: objectBody.satuanjual || null,
                objectgenerikfk: objectBody.statusgenerik || null,
                objectsediaanfk: objectBody.sediaan || null,
                keterangan: "" || null,
                objectvariabelbpjsfk: objectBody.variabelbpjs || null,
                isobat: objectBody.tipeproduk === 1,
                isfornas: objectBody.isnasional,
                isforrs: objectBody.isrs,
                isbmhp: objectBody.tipeproduk === 2,
                objectgolonganobatfk: objectBody.golonganobat || null,
                isalkes: objectBody.tipeproduk === 3,
                tglinput: new Date(),
                tglupdate: new Date(),
                objectpegawaiinputfk: req.idPegawai,
                objectpegawaiupdatefk: req.idPegawai,
                barcode: objectBody.barcode,
                kfa_id: objectBody.idkfa
            }, { 
                transaction: transaction 
            });
        }else{
            const updatedModel = await m_produk.findByPk(objectBody.idproduk, {
                transaction: transaction
            })
            if(!updatedModel) throw new NotFoundError("Updated tidak ditemukan")
            await updatedModel.update({
                statusenabled: true,
                namaexternal: objectBody.namaproduk,
                reportdisplay: objectBody.namaproduk,
                objectdetailjenisprodukfk: objectBody.detailjenisproduk,
                deskripsiproduk: objectBody.deskripsikandungan,
                kekuatan: objectBody.kekuatan || null,
                namaproduk: objectBody.namaproduk,
                nilainormal: null,
                objectsatuanstandarfk: objectBody.satuanjual || null,
                objectgenerikfk: objectBody.statusgenerik || null,
                objectsediaanfk: objectBody.sediaan || null,
                keterangan: "" || null,
                objectvariabelbpjsfk: objectBody.variabelbpjs || null,
                isobat: objectBody.tipeproduk === 1,
                isfornas: objectBody.isnasional,
                isforrs: objectBody.isrs,
                isbmhp: objectBody.tipeproduk === 2,
                objectgolonganobatfk: objectBody.golonganobat || null,
                isalkes: objectBody.tipeproduk === 3,
                tglupdate: new Date(),
                objectpegawaiupdatefk: req.idPegawai,
                islogistik: objectBody.tipeproduk === 4,
                barcode: objectBody.barcode,
                kfa_id: objectBody.idkfa,
            }, {
                transaction: transaction
            })
            upsertedProduk = updatedModel.toJSON()
        }

        await transaction.commit();
        if(objectBody.tipeproduk === 1){
            hUpsertObatSatuSehat(upsertedProduk.kfa_id)
        }
        
        
        res.status(200).send({
            data: {
                createdProduk: upsertedProduk
            },
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        await transaction.rollback();
        res.status(error.httpcode || 500).send({
            data: error,
            success: false,
            msg: 'Create Nota Produk Obat Gagal',
            code: error.httpcode || 500
        });
    }
}

const createOrUpdateDetailProduk = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction]
        = await createTransaction(db, res)
    if(errorTransaction) return
    try{
        const body = req.body

        let createdOrEdited = null

        if(!body.id){
            createdOrEdited = await m_detailjenisproduk.create({
                kd_profile: 0,
                statusenabled: body.statusenabled,
                detailjenisproduk: body.detailjenisproduk,
                objectjenisprodukfk: body.jenisproduk || null,
                reportdisplay: body.detailjenisproduk,
                namaexternal: body.detailjenisproduk,
                tglinput: new Date(),
                tglupdate: new Date(),
                objectpegawaiinputfk: req.idPegawai,
                objectpegawaiupdatefk: req.idPegawai
            }, {
                transaction: transaction
            })
        }else{
            createdOrEdited = await m_detailjenisproduk.update({
                statusenabled: body.statusenabled,
                detailjenisproduk: body.detailjenisproduk,
                objectjenisprodukfk: body.jenisproduk || null,
                tglupdate: new Date(),
                objectpegawaiupdatefk: req.idPegawai
            }, {
                where: {
                    id: body.id
                },
                transaction: transaction
            })
        }

        await transaction.commit();
        const tempres = {
            createdOrEditedProduk: createdOrEdited
        }

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });

    }catch(error){
        logger.error(error)
        await transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Detail Produk Gagal',
            code: 500
        });
    }
}


const createOrUpdateSediaan = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction]
        = await createTransaction(db, res)
    if(errorTransaction) return
    try{
        const body = req.body

        let createdOrEdited = null
        if(!body.id){
            createdOrEdited = await m_sediaan.create({
                kdprofile: 0,
                statusenabled: body.statusenabled,
                sediaan: body.sediaan,
                reportdisplay: body.sediaan,
                namaexternal: body.sediaan,
                tglinput: new Date(),
                tglupdate: new Date,
                objectpegawaiinputfk: req.idPegawai,
                objectpegawaiupdatefk: req.idPegawai
            }, {
                transaction: transaction
            })
        }else{
            createdOrEdited = await m_sediaan.update({
                statusenabled: body.statusenabled,
                sediaan: body.sediaan,
                tglupdate: new Date(),
                objectpegawaiupdatefk: req.idPegawai
            }, {
                where: {
                    id: body.id
                },
                transaction: transaction
            })
        }

        await transaction.commit();
        const tempres = {
            createdOrEditedSediaan: createdOrEdited
        }

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });

    }catch(error){
        logger.error(error)
        await transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create or update sediaan gagal',
            code: 500
        });
    }
}

const createOrUpdateSatuan = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction]
        = await createTransaction(db, res)
    if(errorTransaction) return
    try{
        const body = req.body

        let createdOrEdited = null
        if(!body.id){
            createdOrEdited = await m_satuan.create({
                kdprofile: 0,
                statusenabled: body.statusenabled,
                satuan: body.satuan,
                reportdisplay: body.satuan,
                namaexternal: body.satuan,
                objectjenissatuanfk: body.jenissatuan || null,
                tglinput: new Date(),
                tglupdate: new Date,
                objectpegawaiinputfk: req.idPegawai,
                objectpegawaiupdatefk: req.idPegawai
            }, {
                transaction: transaction
            })
        }else{
            let [_, edited] = await m_satuan.update({
                statusenabled: body.statusenabled,
                satuan: body.satuan,
                objectjenissatuanfk: body.jenissatuan || null,
                tglupdate: new Date(),
                objectpegawaiupdatefk: req.idPegawai
            }, {
                where: {
                    id: body.id
                },
                transaction: transaction,
                returning: true
            })
            edited = edited[0]?.toJSON() || null
            createdOrEdited = edited[0]
        }

        await transaction.commit();
        const tempres = {
            createdOrEditedSediaan: createdOrEdited
        }

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan satuan Berhasil',
            code: 200
        });

    }catch(error){
        logger.error(error)
        await transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create or update satuan gagal',
            code: 500
        });
    }
}


const getLainLain = async (req, res) => {
    const logger = res.locals.logger
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
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get lain lain gagal',
            code: 500
        });
    }
}

const getProdukKonversi = async (req, res) => {
    const logger = res.locals.logger
    try{
        const { qsearch } = req.query
        const produk = (await pool.query(qGetProdukKonversi, [qsearch || ""])).rows
        const tempres = {
            produk: produk
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
        
    }catch(e){
        logger.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
    }
}

const getKemasanKonversi = async (req, res) => {
    const logger = res.locals.logger
    try{
        const idproduk = req.query.idproduk;
        if(!idproduk) throw Error("idproduk tidak boleh kosong")
        const kemasan = (await pool.query(qGetKemasan, [idproduk])).rows;
        const produk = (await pool.query(qGetProdukKonversiFromId, [idproduk])).rows[0] || null;
        const tempres = {
            kemasan: kemasan,
            produk: produk
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    }catch(e){
        logger.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
        return;
    }
}

const createOrUpdateKemasan = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] 
        = await createTransaction(db, res)
    try{
        const reqBody = req.body
        let     createdOrEditedKemasan
        if(!reqBody.idkemasanproduk){
            createdOrEditedKemasan = await m_kemasanproduk.create({
                kdprofile: 0,
                statusenabled: true,
                barcode: "",
                objectprodukfk: reqBody.idproduk,
                objectsatuanbesarfk: reqBody.idkemasan,
                objectsatuankecilfk: reqBody.satuanjual,
                nilaikonversi: reqBody.jumlahkonversi
            }, {
                transaction: transaction
            })    
        }else{
            createdOrEditedKemasan = await m_kemasanproduk.update({
                statusenabled: true,
                barcode: "",
                objectprodukfk: reqBody.idproduk,
                objectsatuanbesarfk: reqBody.idkemasan,
                objectsatuankecilfk: reqBody.satuanjual,
                nilaikonversi: reqBody.jumlahkonversi
            }, {
                where: {
                    id: reqBody.idkemasanproduk
                },
                transaction: transaction
            })
        }

        await transaction.commit();

        res.status(200).send({
            data: {
                createdKemasan: createdOrEditedKemasan
            },
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
        
    }catch(e){
        logger.error(e)
        await transaction.rollback();
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
        return;
    }
}

const getProdukMaster = async (req, res) => {
    const logger = res.locals.logger
    try{
        const { namaproduk } = req.query
        let produk = (await pool.query(qGetProdukMaster, [namaproduk || ""])).rows
        produk = produk.sort((a, b) => a.id - b.id)
        const tempres = {
            produk: produk
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get produk master Berhasil',
            code: 200
        });
    }catch(e){
        logger.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
    }
}

const getProdukEdit = async (req, res) => {
    const logger = res.locals.logger
    try{
        const produkid = req.query.produkid
        if(!produkid) throw Error("Produk id tidak boleh kosong")
        let produk = (await pool.query(qGetProdukEdit, [produkid])).rows
        const tempres = {
            produk: produk[0] || null
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get produk edit Berhasil',
            code: 200
        });
    } catch(e){
        logger.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'get produk gagal',
            code: 500
        });
    }
}

const getKemasanFromProduk = async (req, res) => {
    const logger = res.locals.logger
    try{
        const {idproduk} = req.query
        if(!idproduk) throw Error("idproduk tidak boleh kosong")
        const kemasanFromProduk = (await pool.query(qGetSatuanFromProduk, [idproduk])).rows
        let tempres = {
            satuan: kemasanFromProduk
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get satuan from produk Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get satuan from produk gagal',
            code: 500
        });
    }
}

const createOrUpdatePenerimaan = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction]
        = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const {
            createdOrUpdatedPenerimaan,
            norecpenerimaan
        } = await hCreateOrUpdatePenerimaan(req, res, transaction)


        const {
            createdDetailPenerimaan,
            deletedDetailPenerimaan
        } = await hCreateOrUpdateDetailPenerimaan(
            req, 
            res, 
            transaction, 
            {
                norecpenerimaan
            }
        )

        const {
            deletedStokUnitPenerimaan
        } = await hDeleteStokUnitPenerimaan(
            req, 
            res,
            transaction,
            {
                deletedDetailPenerimaan,
                createdOrUpdatedPenerimaan
            }
        )


        const {
            createdStokUnitPenerimaan
        } = await hCreateStokUnitPenerimaan(
            req, 
            res,
            transaction,
            {
                createdDetailPenerimaan,
                createdOrUpdatedPenerimaan
            }
        )


        await transaction.commit();

        const tempres = {
            createdOrUpdatedPenerimaan: createdOrUpdatedPenerimaan,
            createdOrUpdatedDetailPenerimaan: createdDetailPenerimaan,
            createdStokUnitPenerimaan: createdStokUnitPenerimaan,
        }

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Create or update penerimaan berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create or update produk penerimaan gagal',
            code: 500
        });
    }
}

const upsertReturBarang = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            upsertedRetur,
            upsertedDetailRetur,
            upsertedStokUnitRetur,
            createdKartuStokPenerimaan
        } = await db.sequelize.transaction(async (transaction) => {
            const {upsertedRetur, norecretur, norecpenerimaan, penerimaan}
            = await hUpsertRetur(req, res, transaction)
            const {upsertedDetailRetur} 
            = await hUpsertDetailRetur(req, res, transaction, {
                norecretur, 
                norecpenerimaan
            })
            const {upsertedStokUnitRetur} 
            = await hUpsertStokUnitRetur(req, res, transaction, {
                upsertedDetailRetur, 
                penerimaan
            })

            return {
                upsertedRetur,
                upsertedDetailRetur,
                upsertedStokUnitRetur,
                createdKartuStokPenerimaan
            }
        });
        
        const tempres = {
            upsertedRetur,
            upsertedDetailRetur,
            upsertedStokUnitRetur,
            createdKartuStokPenerimaan
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


const getPenerimaan = async (req, res) => {
    const logger = res.locals.logger
    try{
        const {norecpenerimaan, norecretur} = req.query
        if(!norecpenerimaan) throw Error("norecpenerimaan tidak boleh kosong")
        let detailPenerimaan = 
            (await pool.query(qGetDetailPenerimaan, [norecpenerimaan])).rows
        let penerimaan = 
            (await pool.query(qGetPenerimaan, [norecpenerimaan])).rows[0]
        let detailPemesanan = 
            (await pool.query(qGetDetailPemesanan, [penerimaan.norecpemesanan])).rows
        
        detailPenerimaan = await Promise.all(
            detailPenerimaan.map(
                async (item) => {
                    let allRetur = (await pool.query(qGetDetailReturFromDetailPenerimaan, [item.norecdetailpenerimaan])).rows
                    allRetur = allRetur.filter(f => f.norecretur !== norecretur)
                    const jumlahTotalRetur = allRetur.reduce((prev, ret) => prev + ret.jumlahretur, 0)
                    return ({
                        ...item,
                        jumlahterima: item.jumlahterima.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        hargasatuankecil: item.hargasatuankecil.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        hargasatuanterima: item.hargasatuanterima.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        diskonrupiah: item.diskonrupiah.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        diskonpersen: item.diskonpersen.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        diskonrupiah: item.diskonrupiah.toLocaleString('id-ID', {maximumFractionDigit: 10}), 
                        ppnrupiahproduk: item.ppnrupiahproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        ppnpersenproduk: item.ppnpersenproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        subtotalproduk: item.subtotalproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        totalproduk: item.totalproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        allretur: allRetur,
                        jumlahtotalretur: jumlahTotalRetur
                    })
                }
            )
        )

        let tempres = {
            detailPenerimaan: detailPenerimaan,
            penerimaan: penerimaan,
            detailPemesanan: detailPemesanan,
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get penerimaan Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get penerimaan gagal',
            code: 500
        });
    }
}



const getListPenerimaan = async (req, res) => {
    const logger = res.locals.logger
    try{
        const isLogistik = req.query.isLogistik === 'true'
        let listPenerimaan = (await pool.query(qGetListPenerimaan, [isLogistik])).rows
        listPenerimaan = await Promise.all(
            listPenerimaan.map(async (penerimaan) => {
                const newPenerimaan = { ...penerimaan }
                const listDetail = 
                    (await pool.query(
                        qGetDetailPenerimaan, 
                        [penerimaan.norecpenerimaan]
                        )).rows
                newPenerimaan.detailpenerimaan = listDetail
                return newPenerimaan
            }
        ))
        const tempres = {
            listpenerimaan: listPenerimaan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get list penerimaan Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get list penerimaan gagal',
            code: 500
        });
    }
}

const getComboKartuStok = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const unit = (await pool.query(unitQueries.getAll, [])).rows
        let unitUser = (await pool.query(unitQueries.qGetUnitUser, [req.userId])).rows
        const gudangFound = unitUser.findIndex(x => x.value === daftarUnit.GUDANG_FARMASI) >= 0
        if(gudangFound){
            unitUser = unit    
        }
        const tempres = {
            unit: unit,
            unitUser: unitUser
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



const getKartuStok = async (req, res) => {
    const logger = res.locals.logger
    try{
        const unitChosen = req.query.unit
        const unitUser = await pool.query(unitQueries.qGetUnitUser, [req.userId])
        const idUnitUser = unitUser.rows.map(unitUser => unitUser.value)
        const kartuStok = (await pool.query(qGetKartuStok, [idUnitUser, unitChosen || ''])).rows
        const tempres = {
            kartustok: kartuStok
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get kartu stok Berhasil',
            code: 200
        });
    }catch(e){
        logger.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
    }
}

const getStokUnit = async (req, res) => {
    const logger = res.locals.logger
    try{
        const unitChosen = req.query.unit
        const unitUser = await pool.query(unitQueries.qGetUnitUser, [req.userId])
        const idUnitUser = unitUser.rows.map(unitUser => unitUser.value)
        const stokUnit = (await pool.query(qGetStokUnit, [idUnitUser, unitChosen || ''])).rows
        const tempres = {
            stokUnit: stokUnit
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get stok unit Berhasil',
            code: 200
        });
    }catch(e){
        logger.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Get stok unit gagal',
            code: 500
        });
    }
}

const getComboStokUnit = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const unit = (await pool.query(unitQueries.getAll, [])).rows
        let unitUser = (await pool.query(unitQueries.qGetUnitUser, [req.userId])).rows
        const gudangFound = unitUser.findIndex(x => x.value === daftarUnit.GUDANG_FARMASI) >= 0
        if(gudangFound){
            unitUser = unit    
        }
        const tempres = {
            unit: unit,
            unitUser: unitUser
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

const createOrUpdateStokOpname = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] 
        = await createTransaction(db, res)
    if(errorTransaction) return
    try{
        const body = req.body
        let createdOrUpdated
        if(!body.norecstokopname){
            const norecstokopname = uuid.v4().substring(0, 32)
            createdOrUpdated = await t_stokopname.create({
                norec: norecstokopname,
                kdprofile: 0,
                statusenabled: true,
                objectunitfk: body.unitso,
                tglawal: new Date(body.tanggalawal),
                tglakhir: new Date(body.tanggalakhir),
                tglinput: new Date(),
                tglselesai: body.tglselesai ? new Date(body.tglselesai) : null,
                statusselesai: body.statusselesai,
                objectpegawaifk: req.idPegawai,
                objectpegawaiupdatefk: req.idPegawai
            }, {
                transaction: transaction
            })
        }else{
            createdOrUpdated = await t_stokopname.update({
                statusenabled: true,
                objectunitfk: body.unitso,
                tglawal: new Date(body.tglawal),
                tglakhir: new Date(body.tglakhir),
                tglinput: new Date(),
                tglselesai: body.tglselesai ? new Date(body.tglselesai) : null,
                statusselesai: body.statusselesai,
                objectpegawaiupdatefk: req.idPegawai
            }, {
                where: {
                    norec: body.norecstokopname,
                    returning: true
                },
                transaction: transaction
            })
            createdOrUpdated
        }
        let tempres = {
            createdOrUpdated: createdOrUpdated
        }
        transaction.commit();
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error.message,
            success: false,
            msg: 'Create or update sediaan gagal',
            code: 500
        });
    }
}

const getStokOpname = async (req, res) => {
    const logger = res.locals.logger
    try {
        const stokOpname = (await pool.query(qGetStokOpname, [])).rows
        const tempres = {
            stokopname: stokOpname
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get stok opname Berhasil',
            code: 200
        });
    } catch(error){
        logger.error(error)
        res.status(500).send({
            data: error.message,
            success: false,
            msg: 'Get stok opname gagal',
            code: 500
        });
    }
}

const getStokOpnameDetail = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    try {
        if(errorTransaction) return
        const {norecstokopname} = req.query
        if(!norecstokopname) throw Error("norecstokopname tidak boleh kosong")
        let stokOpnameDetails = (await pool.query(qGetStokOpnameDetail, [norecstokopname])).rows;
        let stokOpnameStokUnit = []
        let updatedStokOpnameDetails = []
        if(stokOpnameDetails.length === 0) {
            // jika tidak ada maka buat baru
            stokOpnameStokUnit = (await pool.query(qGetStokOpnameStokUnit, [norecstokopname])).rows
            updatedStokOpnameDetails = await Promise.all(
                stokOpnameStokUnit.map(
                    async (stokUnit) => {
                        const norecstokopnamedetail = uuid.v4().substring(0, 32)
                        const stokOpnameDetail = await t_stokopnamedetail.create({
                            norec: norecstokopnamedetail,
                            kdprofile: 0,
                            objectstokopnamefk: norecstokopname,
                            objectprodukfk: stokUnit.objectprodukfk,
                            stokaplikasi: stokUnit.stokaplikasi,
                            stokfisik: stokUnit.stokfisik,
                            selisih: stokUnit.selisih,
                            keterangan: stokUnit.keterangan,
                            tglupdate: new Date(),
                            objectpegawaifk: req.idPegawai
                        }, {
                            transaction: transaction
                        })
                        return stokOpnameDetail.toJSON();
                    }
                )
            )
            
        }

        
        await transaction.commit();
        if(stokOpnameDetails.length === 0) {
            stokOpnameDetails = (await pool.query(qGetStokOpnameDetail, [norecstokopname])).rows;
        }
        const tempres = {
            stokopnamestokunit: stokOpnameStokUnit,
            stokopnamedetails: stokOpnameDetails,
            unitstokopname: stokOpnameDetails[0]?.objectunitfk || null,
            statusselesai: stokOpnameDetails[0]?.statusselesai || false,
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get stok opname Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error);
        transaction.rollback();
        res.status(500).send({
            data: error.message,
            success: false,
            msg: 'Get stok opname stok unit gagal',
            code: 500
        })
    }
}

const updatedStokOpnameDetails = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    try {
        if(errorTransaction) return
        const {
            issimpan, 
            norecstokopname
        } = req.body
        let stokOpnameUpdated = null
        if(issimpan){
            const stokopname = await t_stokopname.findOne({
                where: {
                    norec: norecstokopname
                },
                lock: transaction.LOCK.UPDATE,
                transaction: transaction
            })
            const stokopnameVal = stokopname.toJSON()
            const alreadySavedBySomeone = stokopnameVal.statusselesai
            if(alreadySavedBySomeone) throw Error("Stok opname sudah disimpan oleh orang lain")
            const stokopnameUpdated = await stokopname.update({
                statusselesai: true,
                tglselesai: new Date(),
            }, {
                where: {
                    norec: norecstokopname
                },
                transaction: transaction,
                returning: true
            })
            stokOpnameUpdated = stokopnameUpdated.toJSON()
        }

        const {updatedAll} = await hUpdateStokOpnameDetails(
            req,
            res,
            transaction,
        )
        
        let tempres = {
            updatedAll: updatedAll
        }
        await transaction.commit();
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: issimpan ? 'Finalisasi stok opname berhasil' : 'Update stok opname detail Berhasil',
            code: 200
        });
    } catch(error){
        logger.error(error);
        await transaction.rollback();
        res.status(500).send({
            data: error.message,
            success: false,
            msg: 'Update stok opname detail gagal',
            code: 500
        })
    }
}

const createOrUpdatePemesanan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            newPemesanan, 
            detailPesan
        } = await db.sequelize.transaction(async (transaction) => {
            const newPemesanan = await hUpsertPesan(req, res, transaction)
            const detailPesan = await hCreatePesanDetail(req, res, transaction, {
                newPemesanan: newPemesanan,
            })
            return {
                newPemesanan: newPemesanan,
                detailPesan: detailPesan
            }
        });
        
        const tempres = {
            newPemesanan,
            detailPesan
        };
        res.status(200).send({
            msg: 'Sukses create pemesanan',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        error.errors.map(e => logger.error(e.message)) 
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getPemesanan = async (req, res) => {
    const logger = res.locals.logger
    try{
        const {norecpesan} = req.query
        if(!norecpesan) throw Error("norecpesan tidak boleh kosong")
        let detailPemesanan = 
            (await pool.query(qGetDetailPemesanan, [norecpesan])).rows
        let pemesanan = 
            (await pool.query(qGetPemesanan, [norecpesan])).rows[0]

        detailPemesanan = detailPemesanan.map((item) => ({
            ...item,
            jumlahterima: item.jumlahterima.toLocaleString('id-ID', {maximumFractionDigit: 10}),
            hargasatuankecil: item.hargasatuankecil.toLocaleString('id-ID', {maximumFractionDigit: 10}),
            hargasatuanterima: item.hargasatuanterima.toLocaleString('id-ID', {maximumFractionDigit: 10}),
            diskonrupiah: item.diskonrupiah.toLocaleString('id-ID', {maximumFractionDigit: 10}),
            diskonpersen: item.diskonpersen.toLocaleString('id-ID', {maximumFractionDigit: 10}),
            diskonrupiah: item.diskonrupiah.toLocaleString('id-ID', {maximumFractionDigit: 10}), 
            ppnrupiahproduk: item.ppnrupiahproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
            ppnpersenproduk: item.ppnpersenproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
            subtotalproduk: item.subtotalproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
            totalproduk: item.totalproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
        }))
        let tempres = {
            detailPemesanan: detailPemesanan,
            pemesanan: pemesanan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get penerimaan Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get penerimaan gagal',
            code: 500
        });
    }
}

const getListPemesanan = async (req, res) => {
    const logger = res.locals.logger
    try{
        const isLogistik = req.query.isLogistik === 'true'
        let listPemesanan = (await pool.query(qGetListPemesanan, [isLogistik])).rows
        listPemesanan = await Promise.all(
            listPemesanan.map(async (penerimaan) => {
                const newPenerimaan = { ...penerimaan }
                const listDetail = 
                    (await pool.query(
                        qGetDetailPemesanan, 
                        [penerimaan.norecpemesanan]
                        )).rows
                newPenerimaan.detailpemesanan = listDetail
                return newPenerimaan
            }
        ))
        const tempres = {
            listpemesanan: listPemesanan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get list penerimaan Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get list penerimaan gagal',
            code: 500
        });
    }
}

const getUnitUser = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const unitUser = await pool.query(qGetUnitUser, [req.userId])
        const tempres = {
            unitUser
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


const getListRetur = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let listRetur = (await pool.query(qGetListRetur)).rows
        listRetur = await Promise.all(
            listRetur.map(async (retur) => {
                const newRetur = { ...retur }
                
                const listDetail = 
                    (await pool.query(
                        qGetDetailRetur, 
                        [retur.norecretur]
                        )).rows
                newRetur.detailretur = listDetail
                return newRetur
            }
        ))
        const tempres = {
            listRetur
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

const getRetur = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {norecretur} = req.query
        let detailRetur = 
        (await pool.query(qGetDetailRetur, [norecretur])).rows
        const retur = 
        (await pool.query(qGetReturBarang, [norecretur])).rows[0]
        detailRetur = await Promise.all(
            detailRetur.map( 
                async (item) => {
                    let allRetur = (await pool.query(qGetDetailReturFromDetailPenerimaan, [item.norecdetailpenerimaan])).rows
                    allRetur = allRetur.filter(f => f.norecretur !== norecretur)
                    const jumlahTotalRetur = allRetur.reduce((prev, ret) => prev + ret.jumlahretur, 0)
                    return ({
                    ...item,
                        jumlahretur: item.jumlahretur.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        jumlahterima: item.jumlahterima.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        hargasatuankecil: item.hargasatuankecil.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        hargasatuanterima: item.hargasatuanterima.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        diskonrupiah: item.diskonrupiah.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        diskonpersen: item.diskonpersen.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        ppnrupiahproduk: item.ppnrupiahproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        ppnpersenproduk: item.ppnpersenproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        subtotalproduk: item.subtotalproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        totalproduk: item.totalproduk.toLocaleString('id-ID', {maximumFractionDigit: 10}),
                        jumlahtotalretur: jumlahTotalRetur
                    })
            })
        )
        const tempres = {
            detailRetur: detailRetur,
            retur: retur || null
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

const getLaporanPengadaan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            instalasi,
            unit,
            tglpengadaanstart,
            tglpengadaanend,
            asalproduk,
            supplier
        } = req.query
        const start = getDateStartNull(tglpengadaanstart)
        const end = getDateEndNull(tglpengadaanend)
        const pengadaan = (await pool.query(qGetLaporanPengadaan, [
            unit || '',
            start || '',
            end || '', 
            asalproduk || '',
            supplier || ''
        ])).rows
        const tempres = {
            pengadaan: pengadaan
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

const getLaporanPenerimaan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            instalasi,
            unit,
            tglpengadaanstart,
            tglpengadaanend,
            asalproduk,
            supplier
        } = req.query
        const start = getDateStartNull(tglpengadaanstart)
        const end = getDateEndNull(tglpengadaanend)
        const penerimaan = (await pool.query(qGetLaporanPenerimaan, [
            unit || '',
            start || '',
            end || '', 
            asalproduk || '',
            supplier || ''
        ])).rows
        const tempres = {
            penerimaan: penerimaan
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
    createOrUpdateProdukObat,
    getLainLain,
    createOrUpdateDetailProduk,
    createOrUpdateSediaan,
    createOrUpdateSatuan,
    getProdukKonversi,
    getKemasanKonversi,
    createOrUpdateKemasan,
    getProdukMaster,
    getProdukEdit,
    getKemasanFromProduk,
    getPenerimaan,
    createOrUpdatePenerimaan,
    upsertReturBarang,
    getListPenerimaan,
    getComboKartuStok,
    getKartuStok,
    getComboStokUnit,
    getStokUnit,
    createOrUpdateStokOpname,
    getStokOpname,
    getStokOpnameDetail,
    updatedStokOpnameDetails,
    createOrUpdatePemesanan,
    getPemesanan,
    getListPemesanan,
    getUnitUser,
    getListRetur,
    getRetur,
    getLaporanPengadaan,
    getLaporanPenerimaan
}

const hCreatePesanDetail = async (req, res, transaction, {newPemesanan}) => {
    const allDetail = req.body.detail || []
    const norecpesan = req.body.norecpesan 
    let detailPesan = []
    if(norecpesan){
        const allPesanBefore = await db.t_pemesananbarangdetail.findAll({
            where: {
                objectpemesananbarangfk: norecpesan
            }
        })
        await Promise.all(
            allPesanBefore.map(async (pesan) => {
                await pesan.destroy({
                    transaction: transaction
                })
            })
        )
    }

    detailPesan = await Promise.all(
        allDetail.map(
            async (detail) => {
                const norec = uuid.v4().substring(0, 32)
                let detailPemesanan = await db.t_pemesananbarangdetail.create({
                    norec: norec,
                    statusenabled: true,
                    objectpemesananbarangfk: newPemesanan.norec,
                    objectprodukfk: detail.produk.idproduk,
                    objectsatuanfk: detail.satuanterima,
                    jumlah: detail.jumlahterima,
                    hargasatuankecil: detail.hargasatuankecil,
                    hargasatuanterima: detail.hargasatuanterima,
                    subtotal: detail.subtotalproduk,
                    diskonpersen: detail.diskonpersen,
                    diskon: detail.diskonrupiah,
                    ppnpersen: detail.ppnpersenproduk,
                    ppn: detail.ppnrupiahproduk,
                    total: detail.totalproduk,
                    jumlahkonversi: detail.konversisatuan,
                }, {
                    transaction: transaction
                })
                return detailPemesanan.toJSON();
            }
        )
    )
    
    return detailPesan
}

const hUpsertPesan = async (req, res, transaction) => {
    const bodyReq = req.body
    const norecpesan = bodyReq.norecpesan 
    let newPemesanan = null
    if(!norecpesan){
        const created = await db.t_pemesananbarang.create({
            norec: uuid.v4().substring(0, 32),
            kdprofile: 0,
            statusenabled: true,
            no_order: bodyReq.penerimaan.nomorpo,
            tglorder: new Date(bodyReq.penerimaan.tanggalpesan),
            objectrekananfk: bodyReq.penerimaan.namasupplier,
            objectunitfk: bodyReq.penerimaan.unitpesan,
            objectasalprodukfk: bodyReq.penerimaan.sumberdana,
            keterangan: null,
            objectpegawaifk: req.idPegawai,
            tglinput: new Date(),
            tglupdate: new Date(),
            islogistik: bodyReq.islogistik
        }, {
            transaction: transaction
        })
        newPemesanan = created.toJSON();
    } else{
        const updated = await db.t_pemesananbarang.findOne({
            where: {
                norec: norecpesan
            },
        })
        await updated.update({
            no_order: bodyReq.penerimaan.nomorpo,
            tglorder: new Date(bodyReq.penerimaan.tanggalpesan),
            objectrekananfk: bodyReq.penerimaan.namasupplier,
            objectunitfk: bodyReq.penerimaan.unitpesan,
            objectasalprodukfk: bodyReq.penerimaan.sumberdana,
            keterangan: null,
            objectpegawaifk: req.idPegawai,
            tglinput: new Date(),
            tglupdate: new Date()
        })
        newPemesanan = updated.toJSON();
    }

    return newPemesanan
}



const hUpsertRetur = async (req, res, transaction) => {
    let upsertedRetur
    const bodyPenerimaan = req.body.penerimaan
    if(!bodyPenerimaan) throw new Error("Body kosong")
    let norecretur = req.body.norecretur
    let norecpenerimaan = req.body.norecpenerimaan

    if(!norecretur){
        norecretur = uuid.v4().substring(0, 32)
        upsertedRetur = await db.t_returbarang.create({
            norec: norecretur,
            kdprofile: 0,
            statusenabled: true,
            objectpenerimaanbarangfk: norecpenerimaan,
            tglretur: new Date(),
            objectpegawaifk: req.idPegawai,
            tglinput: new Date(),
            tglupdate: new Date(),
            islogistik: !!bodyPenerimaan.islogistik,
            noretur: bodyPenerimaan.nomorretur
        }, {
            transaction: transaction
        })
        upsertedRetur = upsertedRetur.toJSON()
    }else{
        const oldData = await db.t_returbarang.findByPk(norecretur)
        await oldData.update({
            kdprofile: 0,
            statusenabled: true,
            objectpenerimaanbarangfk: norecpenerimaan,
            objectpegawaifk: req.idPegawai,
            tglinput: new Date(),
            tglupdate: new Date(),
            islogistik: bodyPenerimaan.islogistik
        })
        upsertedRetur = oldData[0]?.toJSON() || null;
    }
    let penerimaan = await db.t_penerimaanbarang.findByPk(norecpenerimaan)
    penerimaan = penerimaan.toJSON()
    return { upsertedRetur, norecretur, norecpenerimaan, penerimaan }
}

const hUpsertDetailRetur = async (
    req, 
    res, 
    transaction, 
    {
        norecretur,
        norecpenerimaan
    }
) => {
    const arRetur = req.body.retur
    let upsertedDetailRetur = []
    upsertedDetailRetur = await Promise.all(
        arRetur.map(async (bodyRetur) => {
            let norecDetailRetur = bodyRetur.norecdetailretur
            const norecDetailPenerimaan = bodyRetur.norecdetailpenerimaan
            let updatedValue = null
            let prevsVal = []
            if(norecDetailRetur){
                let prevs = await db.t_returbarangdetail.findByPk(norecDetailRetur,
                {
                    lock: transaction.LOCK.UPDATE,
                    transaction: transaction
                })
                prevsVal = prevs?.toJSON() || null
                await prevs?.destroy({
                    transaction: transaction
                })
            }
            updatedValue = await db.t_returbarangdetail.create({
                norec: uuid.v4().substring(0, 32),
                statusenabled: true,
                objectreturbarangfk: norecretur,
                objectpenerimaanbarangdetailfk: norecDetailPenerimaan,
                jumlah: bodyRetur.jumlahretur,
                subtotal: bodyRetur.subtotalproduk,
                diskonpersen: bodyRetur.diskonpersen,
                diskon: bodyRetur.diskonrupiah,
                ppnpersen: bodyRetur.ppnpersenproduk,
                ppn: bodyRetur.ppnrupiahproduk,
                total: bodyRetur.totalproduk,
                alasanretur: bodyRetur.alasanretur
            }, {
                transaction: transaction
            }) 
            const penerimaanDetail = await db.t_penerimaanbarangdetail.findByPk(norecDetailPenerimaan)
            return {
                prevValue: prevsVal || null,
                updatedValue: updatedValue.toJSON(),
                penerimaanDetail: penerimaanDetail.toJSON()
            }
        })
    )
    
    return {
        upsertedDetailRetur
    }
}

const hUpsertStokUnitRetur  = async (
    req, 
    res,
    transaction,
    {
        upsertedDetailRetur,
        penerimaan
    }
) => {
    let upsertedStokUnitRetur = []
    upsertedStokUnitRetur = await Promise.all(
        upsertedDetailRetur.map(
            async ({prevValue, updatedValue, penerimaanDetail}) => {
                const {
                    nobatch
                } = penerimaanDetail

                let changedQty = 0
                const jmlPaket = updatedValue.jumlah || 0
                const jmlPaketPrev = prevValue?.jumlah || 0
                const konversi = penerimaanDetail.jumlahkonversi || 0
                const konversiPrev = penerimaanDetail?.jumlahkonversi || 0
                changedQty = (jmlPaketPrev * konversiPrev - jmlPaket * konversi)
                const {
                    stokBarangAwalVal: prevStok, 
                    stokBarangAkhirVal: upserted
                } = await hUpsertStok(req, res, transaction, {
                    qtyDiff: changedQty,
                    nobatch: nobatch,
                    objectprodukfk: penerimaanDetail.objectprodukfk,
                    objectunitfk: penerimaan.objectunitfk,
                })

                return {upserted, prevStok, changedQty}
            }
        )
    )
    
    return {upsertedStokUnitRetur}
}


const hCreateOrUpdatePenerimaan = async (req, res, transaction) => {
    let createdOrUpdatedPenerimaan
    const bodyPenerimaan = req.body.penerimaan
    if(!bodyPenerimaan) return null
    let norecpenerimaan = req.body.norecpenerimaan
    if(!norecpenerimaan){
        norecpenerimaan = uuid.v4().substring(0, 32)
        createdOrUpdatedPenerimaan = await t_penerimaanbarang.create({
            norec: norecpenerimaan,
            kdprofile: 0,
            statusenabled: true,
            no_terima: bodyPenerimaan.nomorterima || null,
            no_order: bodyPenerimaan.nomorpo || null,
            tglorder: new Date(bodyPenerimaan.tanggalterima),
            tglterima: new Date(bodyPenerimaan.tanggalterima),
            tgljatuhtempo: new Date(bodyPenerimaan.tanggaljatuhtempo),
            objectrekananfk: bodyPenerimaan.namasupplier,
            objectunitfk: bodyPenerimaan.unitpesan,
            objectasalprodukfk: bodyPenerimaan.sumberdana,
            keterangan: bodyPenerimaan.keterangan,
            objectpegawaifk: req.idPegawai,
            tglinput: new Date(),
            tglupdate: new Date(),
            objectpemesananbarangfk: req.body.norecpemesanan,
            islogistik: req.body.islogistik
        }, {
            transaction: transaction
        })
    }else{
        const [_, updated] = await t_penerimaanbarang.update({
            no_terima: bodyPenerimaan.nomorterima || null,
            no_order: bodyPenerimaan.nomorpo || null,
            tglorder: new Date(bodyPenerimaan.tanggalterima),
            tglterima: new Date(bodyPenerimaan.tanggalterima),
            tgljatuhtempo: new Date(bodyPenerimaan.tanggaljatuhtempo),
            objectrekananfk: bodyPenerimaan.namasupplier,
            objectunitfk: bodyPenerimaan.unitpesan,
            objectasalprodukfk: bodyPenerimaan.sumberdana,
            keterangan: bodyPenerimaan.keterangan,
            objectpegawaifk: req.idPegawai,
            tglupdate: new Date()
        }, {
            where: {
                norec: norecpenerimaan
            },
            returning: true,
            transaction: transaction
        })
        createdOrUpdatedPenerimaan = updated[0]?.toJSON() || null;
    }
    return { createdOrUpdatedPenerimaan, norecpenerimaan }
}

const hCreateOrUpdateDetailPenerimaan = async (
    req, 
    res, 
    transaction, 
    {
        norecpenerimaan
    }
) => {
    const arDetail = req.body.detail
    let prevs = await t_penerimaanbarangdetail.findAll({
        where: {
            objectpenerimaanbarangfk: norecpenerimaan
        },
        transaction: transaction
    })
    
    const deletedDetailPenerimaan = await Promise.all(
        prevs.map(async (prev) => {
            const prevVal = prev.toJSON()
            let stokUnit = await t_stokunit.findAll({
                where: {
                    objectpenerimaanbarangdetailfk: prevVal.norec
                },
                transaction: transaction,
            })
            await Promise.all(
                stokUnit.map(
                    async (s) => {
                        await s.update({
                            objectpenerimaanbarangdetailfk: null
                        }, {
                            transaction: transaction,
                        })
                    }
                )
            )
            await prev.destroy({
                transaction: transaction
            })
            return {deletedValue: prevVal}
        })
    )
    let createdDetailPenerimaan = await Promise.all(
        arDetail.map(async (bodyDetail) => {
            let norecDetailPenerimaan = bodyDetail.norecdetailpenerimaan
            let createdValue = await t_penerimaanbarangdetail.create({
                norec: uuid.v4().substring(0, 32),
                statusenabled: true,
                objectpenerimaanbarangfk: norecpenerimaan,
                objectprodukfk: bodyDetail.produk.idproduk,
                ed: new Date(bodyDetail.tanggaled),
                nobatch: bodyDetail.nobatch,
                objectsatuanfk: bodyDetail.satuanterima,
                jumlah: bodyDetail.jumlahterima,
                hargasatuankecil: bodyDetail.hargasatuankecil,
                hargasatuanterima: bodyDetail.hargasatuanterima,
                subtotal: bodyDetail.subtotalproduk,
                diskonpersen: bodyDetail.diskonpersen,
                diskon: bodyDetail.diskonrupiah,
                ppnpersen: bodyDetail.ppnpersenproduk,
                ppn: bodyDetail.ppnrupiahproduk,
                total: bodyDetail.totalproduk,
                jumlahkonversi: bodyDetail.konversisatuan
            }, {
                transaction: transaction
            }) 
            return {
                createdValue: createdValue.toJSON()
            }
        })
    )
    return {
        createdDetailPenerimaan,
        deletedDetailPenerimaan,
    }
}

const hCreateStokUnitPenerimaan  = async (
    req, 
    res,
    transaction,
    {
        createdDetailPenerimaan,
        createdOrUpdatedPenerimaan,
    }
) => {
    let createdStokUnitPenerimaan = []
    createdStokUnitPenerimaan = await Promise.all(
        createdDetailPenerimaan.map(
            async ({createdValue}) => {
                const {
                    nobatch
                } = createdValue

                let changedQty = 0
                const persenPpn = (createdValue.ppnpersen || 0) / 100
                const hargaKecil = (createdValue.hargasatuankecil || 0)
                const harga = (hargaKecil + (persenPpn * hargaKecil))
                const jmlPaket = createdValue.jumlah || 0
                const konversi = createdValue.jumlahkonversi || 0
                changedQty = jmlPaket * konversi
                const hargaDiskon = (createdValue.total || 0) / changedQty
                const {
                    stokBarangAwalVal: prevStok, 
                    stokBarangAkhirVal: finalStok,
                    createdKartuStok
                } = await hUpsertStok(req, res, transaction, {
                    qtyDiff: changedQty,
                    nobatch: nobatch,
                    objectprodukfk: createdValue.objectprodukfk,
                    objectunitfk: createdOrUpdatedPenerimaan.objectunitfk,
                    ed: createdValue.ed,
                    persendiskon: createdValue.diskonpersen,
                    hargadiskon: hargaDiskon,
                    harga: harga,
                    objectpenerimaanbarangdetailfk: createdValue.norec,
                    tglterima: createdOrUpdatedPenerimaan.tglterima,
                    tabeltransaksi: "t_penerimaanbarang",
                    norectransaksi: createdOrUpdatedPenerimaan.norec,
                    objectasalprodukfk: createdOrUpdatedPenerimaan.objectasalprodukfk,
                })
                return {finalStok, createdKartuStok}

            }
        )
    )
    
    
    return {createdStokUnitPenerimaan}
}

const hDeleteStokUnitPenerimaan  = async (
    req, 
    res,
    transaction,
    {
        deletedDetailPenerimaan,
        createdOrUpdatedPenerimaan,
    }
) => {
    let createdStokUnitPenerimaan = []
    createdStokUnitPenerimaan = await Promise.all(
        deletedDetailPenerimaan.map(
            async ({deletedValue}) => {
                const {
                    nobatch
                } = deletedValue

                let changedQty = 0
                const jmlPaket = deletedValue.jumlah || 0
                const konversi = deletedValue.jumlahkonversi || 0
                changedQty = - jmlPaket * konversi
                const {
                    stokBarangAwalVal: prevStok, 
                    stokBarangAkhirVal: finalStok,
                    createdKartuStok
                } = await hUpsertStok(req, res, transaction, {
                    qtyDiff: changedQty,
                    nobatch: nobatch,
                    objectprodukfk: deletedValue.objectprodukfk,
                    objectunitfk: createdOrUpdatedPenerimaan.objectunitfk,
                    tabeltransaksi: "t_penerimaanbarang",
                    norectransaksi: createdOrUpdatedPenerimaan.norec
                })

                return {finalStok, createdKartuStok}

            }
        )
    )
    
    
    return {createdStokUnitPenerimaan}
}

/**
 * harus menggunakan ini agar nobatch, idProduk, idUnit tidak terbalik2
 * dan konvensi nama kodebatch selalu sama
 * @param {string} nobatch 
 * @param {string} idProduk 
 * @param {string} idUnit 
 * @returns {string}
 */
export const generateKodeBatch = (nobatch, idProduk, idUnit) => {
    return `${nobatch}-${idProduk}-${idUnit}`
}

/**
 * @typedef {object} UpsertedStok
 * @property {object} stokBarangAwalVal barang sebelum perubahan stok, 
 * jika belum ada maka dibuat menjadi stoknya nol
 * @property {object} stokBarangAkhirVal barang setelah perubahan stok
 * @property {object} createdKartuStok kartustok terbuat
 * @property {boolean} isNew menandakan bahwa hasil upsert ini adalah barang baru atau bukan
 * 
 */

/**
 * Seluruh perubahan stok unit harus melalui satu pintu ini
 * @returns {Promise<UpsertedStok>}
 */
export const hUpsertStok = async (
    req,
    res,
    transaction,
    {
        // wajib, untuk create dan update
        qtyDiff,
        nobatch,
        objectprodukfk,
        objectunitfk,
        norectransaksi,
        tabeltransaksi = "t_penerimaanbarangdetail",
        // optional, hanya untuk create stok unit baru
        ed,
        persendiskon,
        hargadiskon,
        harga,
        objectpenerimaanbarangdetailfk,
        tglterima,
        objectasalprodukfk,
    }
) => {
    if(
        (!qtyDiff && qtyDiff !== 0) 
        || !nobatch 
        || !objectprodukfk 
        || !objectunitfk 
    ){
        throw new Error("Salah satu param kosong")
    }
    const stokBarang = await t_stokunit.findOne({
        where: {
            kodebatch: generateKodeBatch(
                nobatch,
                objectprodukfk,  
                objectunitfk
            ),
        },
        lock: transaction.LOCK.UPDATE,
        transaction: transaction
    })
    let stokBarangAwalVal = stokBarang?.toJSON() || null   
    let stokBarangAkhirVal

    if(!stokBarang){
        // buat baru
        if(qtyDiff < 0){
            throw new Error("Stok baru tidak boleh kurang dari nol")
        }
        if(!ed) throw new Error("Ed kosong")
        if(!persendiskon && persendiskon !== 0) throw new Error("PersenDiskon kosong")
        if(!hargadiskon && hargadiskon !== 0) throw new Error("Harga diskon kosong")
        if(!harga && harga !== 0) throw new Error("Harga diskon kosong")
        if(!objectpenerimaanbarangdetailfk) throw new Error("Penerimaan barang detail kosong")
        if(!tglterima) throw new Error("Tanggal terima kosong")
        if(!objectasalprodukfk) throw new Error("Asal Produk kosong")
        stokBarangAkhirVal = await t_stokunit.create({
            norec: uuid.v4().substring(0, 32),
            kdprofile: 0,
            statusenabled: true,
            objectunitfk: objectunitfk,
            objectasalprodukfk: objectasalprodukfk,
            objectprodukfk: objectprodukfk,
            nobatch: nobatch,
            ed: ed,
            persendiskon: persendiskon,
            hargadiskon: hargadiskon,
            harga: harga,
            qty: qtyDiff,
            objectpenerimaanbarangdetailfk: objectpenerimaanbarangdetailfk,
            tglterima: tglterima,
            tglinput: new Date(),
            tglupdate: new Date(),
            kodebatch: generateKodeBatch(
                nobatch,
                objectprodukfk,
                objectunitfk
            )
        }, {
            transaction: transaction,
        })
        stokBarangAkhirVal = stokBarangAkhirVal.toJSON()
        stokBarangAwalVal = {...stokBarangAkhirVal}
        stokBarangAwalVal.qty = 0
    }else{
        const qty = stokBarang.qty + qtyDiff
        if(qty < 0){
            throw new Error("Stok tidak cukup")
        }
        let updated = await stokBarang.update({
            qty: qty,
            tglupdate: new Date(),
        }, {
            transaction: transaction,
        })
        stokBarangAkhirVal = updated?.toJSON() || null
    }
    const saldoAwal = stokBarangAwalVal.qty || 0
    const saldoAkhir = stokBarangAkhirVal.qty || 0
    const createdKartuStok = await hCreateKartuStok(
        req,
        res,
        transaction,
        {
            idUnit: objectunitfk,
            idProduk: objectprodukfk,
            saldoAwal: saldoAwal,
            saldoAkhir: saldoAkhir,
            tabelTransaksi: tabeltransaksi,
            norecTransaksi: norectransaksi,
            noBatch: nobatch
        }
    )
    return {
        stokBarangAwalVal,
        stokBarangAkhirVal,
        createdKartuStok,
        isNew: !stokBarang
    }
}

/**
 * 
 * create kartu stok harus menggunakan ini agar selalu sama
 * @returns 
 */
export const hCreateKartuStok = async (
    req,
    res,
    transaction,
    {
        idUnit,
        idProduk,
        saldoAwal,
        saldoAkhir,
        tabelTransaksi,
        norecTransaksi,
        noBatch
    }
) => {
    if(saldoAwal === saldoAkhir) return null
    const masuk = saldoAkhir - saldoAwal > 0 ? saldoAkhir - saldoAwal : 0
    const keluar = saldoAkhir - saldoAwal < 0 ? saldoAwal - saldoAkhir : 0
    const norecKartuStok = uuid.v4().substring(0, 32)
    const createdKartuStok = await t_kartustok.create({
        norec: norecKartuStok,
        kdprofile: 0,
        statusenabled: true,
        objectunitfk: idUnit,
        objectprodukfk: idProduk,
        saldoawal: saldoAwal,
        masuk: masuk,
        keluar: keluar,
        saldoakhir: saldoAkhir,
        keteranan: "",
        status: false,
        tglinput: new Date(),
        tglupdate: new Date(),
        tabeltransaksi: tabelTransaksi,
        norectransaksi: norecTransaksi,
        batch: noBatch
    }, {
        transaction: transaction
    })
    return createdKartuStok
}

const hUpdateStokOpnameDetails = async (
    req,
    res,
    transaction
) => {
    const {
        stokopnamedetails, 
        idunit, 
        issimpan,
    } = req.body
    let updatedAll = await Promise.all(
        stokopnamedetails.map(async (stokopnamedetail) => {
            const SODetailBefore = await t_stokopnamedetail.findOne({
                where: {
                    norec: stokopnamedetail.norecstokopnamedetail
                },
                lock: transaction.LOCK.UPDATE,
                transaction: transaction
            })
            const SODetailValBefore = SODetailBefore.toJSON()
            const stokUnitDiopnames = (await t_stokunit.findAll({
                where: {
                    objectprodukfk: stokopnamedetail.objectprodukfk,
                    objectunitfk: idunit
                },
                lock: transaction.LOCK.UPDATE,
                transaction: transaction,
                order: [['tglinput', 'ASC']]
            }))
            let stokUnitDiopnameVal = stokUnitDiopnames.map((stokUnit) => stokUnit.toJSON())
            let totalStokAplikasi = stokUnitDiopnameVal.reduce((prev, stokUnit) => {
                return prev + stokUnit.qty
            }, 0)
            let totalStokFisik = stokopnamedetail.stokfisik
            let selisih = totalStokFisik - totalStokAplikasi
            const SODetailUpdated = await SODetailBefore.update({
                stokaplikasi: totalStokAplikasi,
                stokfisik: totalStokFisik,
                selisih: selisih,
                objectpegawaiupdatefk: req.idPegawai,
                keterangan: stokopnamedetail.keterangan,
            }, {
                transaction: transaction,
                returning: true
            })
            const SODetailValUpdated = SODetailUpdated.toJSON()
            if(!issimpan){
                return {
                    SODetailValBefore: SODetailValBefore,
                    SODetailValUpdated: SODetailValUpdated
                }
            }
            let stokUnitDiopnameValUpdated = stokUnitDiopnameVal.map((stokUnit) => {
                const newStokUnit = {...stokUnit}
                if(selisih > 0){                 
                    newStokUnit.qty = newStokUnit.qty + selisih
                    selisih = 0          
                }else if(selisih < 0){
                    if(newStokUnit.qty > - selisih){
                        newStokUnit.qty = newStokUnit.qty + selisih
                        selisih = 0
                    }else{
                        selisih = newStokUnit.qty + selisih
                        newStokUnit.qty = 0
                    }
                }
                return newStokUnit
            })

            stokUnitDiopnameValUpdated = await Promise.all(
                stokUnitDiopnames.map(
                    async (stokUnitDiopname, index) => {
                        const updatedStokUnit = await stokUnitDiopname.update({
                            qty: stokUnitDiopnameValUpdated[index].qty,
                        }, {
                            transaction: transaction,
                            returning: true
                        })
                        const newStokUnit = updatedStokUnit.toJSON()
                        const created = await hCreateKartuStok(
                            req,
                            res,
                            transaction,
                            {
                                idUnit: idunit,
                                idProduk: stokopnamedetail.objectprodukfk,
                                saldoAwal: stokUnitDiopnameVal[index].qty,
                                saldoAkhir: newStokUnit.qty,
                                tabelTransaksi: "t_stokopnamedetail",
                                norecTransaksi: SODetailUpdated.norec,
                                noBatch: stokUnitDiopnameVal[index].nobatch,   
                            }
                        )
                        return newStokUnit

                    }
                )
            )

            return {
                SODetailValBefore: SODetailValBefore,
                SODetailValUpdated: SODetailValUpdated,
                stokUnitDiopnameValUpdated: stokUnitDiopnameValUpdated,
                stokUnitDiopnameVal: stokUnitDiopnameVal
            }
        })
    )
    return {updatedAll}
}