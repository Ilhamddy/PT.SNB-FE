import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import { qGetDetailPenerimaan, qGetJenisDetailProdukLainLain, 
    qGetKartuStok, 
    qGetKemasan, 
    qGetListPenerimaan, 
    qGetPenerimaan, 
    qGetProdukEdit, 
    qGetProdukKonversi, 
    qGetProdukKonversiFromId, 
    qGetProdukMaster, 
    qGetSatuanFromProduk, 
    qGetSatuanLainLain, 
    qGetSediaanLainLain,
    qGetStokUnit,  
} from "../../../queries/gudang/gudang.queries";
import {
    createTransaction
} from "../../../utils/dbutils";
const m_produk = db.m_produk;
const m_detailjenisproduk = db.m_detailjenisproduk;
const m_sediaan = db.m_sediaan
const m_satuan = db.m_satuan
const m_kemasanproduk = db.m_kemasanproduk
const t_penerimaanbarang = db.t_penerimaanbarang
const t_penerimaanbarangdetail = db.t_penerimaanbarangdetail
const t_stokunit = db.t_stokunit
const t_kartustok = db.t_kartustok


const createOrUpdateProdukObat = async (req, res) => {
    const [transaction, errorTransaction]
        = await createTransaction(db, res)
    if(errorTransaction) return
    try{
        const objectBody = req.body

        let createdProduk
        if(!objectBody.idproduk){
            createdProduk = await m_produk.create({
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
                objectpegawaiupdatefk: req.idPegawai
            }, { 
                transaction: transaction 
            });
        }else{
            createdProduk = await m_produk.update({
                statusenabled: true,
                namaexternal: objectBody.namaproduk,
                reportdisplay: objectBody.namaproduk,
                objectdetailjenisprodukfk: objectBody.detailjenisproduk,
                deskripsiproduk: objectBody.deskripsikandungan,
                kekuatan: objectBody.kekuatan || null,
                namaproduk: objectBody.namaproduk,
                nilainormal: null,
                objectsatuanstandarfk: objectBody.satuanjual || null,
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
                objectpegawaiupdatefk: req.idPegawai
            }, {
                where: {
                    id: objectBody.idproduk
                },
                transaction: transaction
            })
        }
        
        await transaction.commit();

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

const createOrUpdateDetailProduk = async (req, res) => {
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
        console.error("==Error Create Detail Produk");
        console.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Detail Produk Gagal',
            code: 500
        });
    }
}


const createOrUpdateSediaan = async (req, res) => {
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
        console.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create or update sediaan gagal',
            code: 500
        });
    }
}

const createOrUpdateSatuan = async (req, res) => {
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
            edited = edited[0]?.get() || null
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
        console.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create or update satuan gagal',
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
        console.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get lain lain gagal',
            code: 500
        });
    }
}

const getProdukKonversi = async (req, res) => {
    try{
        const produk = (await pool.query(qGetProdukKonversi, [])).rows
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
        console.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
        return;
    }
}

const getKemasanKonversi = async (req, res) => {
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
        console.error(e)
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
        console.error(e)
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
    try{
        let produk = (await pool.query(qGetProdukMaster, [])).rows
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
        console.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
    }
}

const getProdukEdit = async (req, res) => {
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
        console.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'get produk gagal',
            code: 500
        });
    }
}

const getKemasanFromProduk = async (req, res) => {
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
        console.error("==Get satuan from produk gagal");
        console.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get satuan from produk gagal',
            code: 500
        });
    }
}

const createOrUpdatePenerimaan = async (req, res) => {
    const [transaction, errorTransaction]
        = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const {
            createdOrUpdatedPenerimaan,
            norecpenerimaan
        } = await hCreateOrUpdatePenerimaan(req, res, transaction)


        const {
            createdOrUpdatedDetailPenerimaan
        } = await hCreateOrUpdateDetailPenerimaan(
            req, 
            res, 
            transaction, 
            {
                norecpenerimaan
            }
        )

        const {
            createdOrUpdatedStokUnit
        } = await hCreateOrUpdateStokUnit(
            req, 
            res,
            transaction,
            {
                createdOrUpdatedDetailPenerimaan,
                norecpenerimaan,
                createdOrUpdatedPenerimaan
            }
        )

        const {
            createdKartuStok
        } = await hCreateKartuStok(
            req,
            res,
            transaction,
            {
                createdOrUpdatedPenerimaan,
                createdOrUpdatedStokUnit
            }
        )

        await transaction.commit();

        const tempres = {
            createdOrUpdatedPenerimaan: createdOrUpdatedPenerimaan,
            createdOrUpdatedDetailPenerimaan: createdOrUpdatedDetailPenerimaan,
            createdOrUpdatedStokUnit: createdOrUpdatedStokUnit,
            createdKartuStok: createdKartuStok
        }

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Create or update penerimaan berhasil',
            code: 200
        });
    }catch(error){
        console.error("==Create or update produk penerimaan gagal");
        console.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create or update produk penerimaan gagal',
            code: 500
        });
    }
}

const getPenerimaan = async (req, res) => {
    try{
        const {norecpenerimaan} = req.query
        if(!norecpenerimaan) throw Error("norecpenerimaan tidak boleh kosong")
        let detailPenerimaan = 
            (await pool.query(qGetDetailPenerimaan, [norecpenerimaan])).rows
        let penerimaan = 
            (await pool.query(qGetPenerimaan, [norecpenerimaan])).rows[0]

        detailPenerimaan = detailPenerimaan.map((item) => ({
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
            detailPenerimaan: detailPenerimaan,
            penerimaan: penerimaan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get penerimaan Berhasil',
            code: 200
        });
    }catch(error){
        console.error("==Get penerimaan gagal");
        console.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get penerimaan gagal',
            code: 500
        });
    }
}



const getListPenerimaan = async (req, res) => {
    try{
        let listPenerimaan = (await pool.query(qGetListPenerimaan, [])).rows
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
        console.error("==Get list penerimaan gagal");
        console.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get list penerimaan gagal',
            code: 500
        });
    }
}

const getKartuStok = async (req, res) => {
    try{
        const kartuStok = (await pool.query(qGetKartuStok, [])).rows
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
        console.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
    }
}

const getStokUnit = async (req, res) => {
    try{
        const stokUnit = (await pool.query(qGetStokUnit, [])).rows
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
        console.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Get stok unit gagal',
            code: 500
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
    getListPenerimaan,
    getKartuStok,
    getStokUnit
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
            tglupdate: new Date()
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
        createdOrUpdatedPenerimaan = updated[0]?.get() || null;
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
    let createdOrUpdatedDetailPenerimaan = []
    createdOrUpdatedDetailPenerimaan = await Promise.all(
        arDetail.map(async (bodyDetail) => {
            let norecDetailPenerimaan = bodyDetail.norecdetailpenerimaan
            let prev = null
            let updatedValue = null
            if(!norecDetailPenerimaan){
                prev = await t_penerimaanbarangdetail.findOne({
                    where: {
                        norec: norecDetailPenerimaan
                    },
                    lock: transaction.LOCK.UPDATE,
                    transaction: transaction
                })
            }
            if(!norecDetailPenerimaan || !prev){
                norecDetailPenerimaan = uuid.v4().substring(0, 32)
                updatedValue = await t_penerimaanbarangdetail.create({
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
            }else{
                let updated = await prev.update({
                    objectprodukfk: bodyDetail.produk.idproduk,
                    ed: new Date(bodyDetail.tanggaled),
                    nobatch: bodyDetail.nobatch,
                    objectsatuanfk: bodyDetail.produk.satuanjual,
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
                    returning: true,
                    transaction: transaction
                })
                updated = updated?.get() || null
                updatedValue = updated ;
            }
            return {
                prevValue: prev?.get() || null,
                updatedValue
            }
        })
    )
    
    return {
        createdOrUpdatedDetailPenerimaan
    }
}

const hCreateOrUpdateStokUnit  = async (
    req, 
    res,
    transaction,
    {
        createdOrUpdatedDetailPenerimaan,
        norecpenerimaan,
        createdOrUpdatedPenerimaan,
    }
) => {
    let createdOrUpdatedStokUnit = []
    createdOrUpdatedStokUnit = await Promise.all(
        createdOrUpdatedDetailPenerimaan.map(
            async ({prevValue, updatedValue}) => {
                const {
                    nobatch
                } = updatedValue
                let stokBatch = await t_stokunit.findAll({
                    where: {
                        nobatch: nobatch,
                        objectprodukfk: updatedValue.objectprodukfk
                    },
                    lock: transaction.LOCK.UPDATE,
                })
                let createdOrUpdated = null
                let stokBatchItemFind = stokBatch.find((stokBatch) => {
                    const data = stokBatch.get()
                    const idProduk = data.objectprodukfk
                    const idProdukDetail = updatedValue.objectprodukfk
                    const isSame = idProduk === idProdukDetail
                    return isSame
                })
                let changedQty = 0
                let prevStok
                // if batch found, create new batch
                if(!stokBatchItemFind){
                    const qty = updatedValue.jumlah || 0
                    const konversi = updatedValue.jumlahkonversi || 0
                    changedQty = qty * konversi
                    const persenPpn = (updatedValue.ppnpersen || 0) / 100
                    const hargaKecil = (updatedValue.hargasatuankecil || 0)
                    const harga = (hargaKecil + (persenPpn * hargaKecil))
                    const hargaDiskon = (updatedValue.total || 0) / changedQty
                    createdOrUpdated = await t_stokunit.create({
                        norec: uuid.v4().substring(0, 32),
                        kdprofile: 0,
                        statusenabled: true,
                        objectunitfk: createdOrUpdatedPenerimaan.objectunitfk,
                        objectasalprodukfk: createdOrUpdatedPenerimaan.objectasalprodukfk,
                        objectprodukfk: updatedValue.objectprodukfk,
                        nobatch: nobatch,
                        ed: updatedValue.ed,
                        persendiskon: updatedValue.diskonpersen,
                        hargadiskon: hargaDiskon,
                        harga: harga,
                        qty: changedQty,
                        objectpenerimaanbarangdetailfk: norecpenerimaan,
                        tglterima: createdOrUpdatedPenerimaan.tglterima,
                        tglinput: new Date(),
                        tglupdate: new Date(),
                    }, {
                        transaction: transaction
                    })
                }else{
                    // if batch found, use old batch
                    prevStok = stokBatchItemFind.get() 
                    const jmlPaket = updatedValue.jumlah || 0
                    const jmlPaketPrev = prevValue?.jumlah || 0
                    const konversi = updatedValue.jumlahkonversi || 0
                    const konversiPrev = prevValue?.jumlahkonversi || 0
                    changedQty = (jmlPaket * konversi - jmlPaketPrev * konversiPrev)
                    const qty = prevStok.qty + changedQty
                    
                    let updated = await stokBatchItemFind.update({
                        qty: qty,
                        objectpenerimaanbarangdetailfk: norecpenerimaan,
                        tglterima: createdOrUpdatedPenerimaan.tglterima,
                        tglupdate: new Date(),
                    }, {
                        returning: true,
                        transaction: transaction
                    })
                    updated = updated?.get() || null
                    createdOrUpdated = updated
                }
                return {createdOrUpdated, prevStok, changedQty}
            }
        )
    )
    
    
    return {createdOrUpdatedStokUnit}
}


const hCreateKartuStok = async (
    req,
    res,
    transaction,
    {
        createdOrUpdatedPenerimaan,
        createdOrUpdatedStokUnit
    }
) => {
    
    let createdKartuStok = await Promise.all(
        createdOrUpdatedStokUnit.map(async({
            createdOrUpdated, 
            prevStok, 
            changedQty
        }) => {
            const masuk = changedQty >= 0 ? changedQty : 0
            const keluar = changedQty < 0 ? changedQty : 0
            const norecKartuStok = uuid.v4().substring(0, 32)
            const saldoAwal = prevStok?.qty || 0
            const createdKartuStok = await t_kartustok.create({
                norec: norecKartuStok,
                kdprofile: 0,
                statusenabled: true,
                objectunitfk: createdOrUpdatedPenerimaan.objectunitfk,
                objectprodukfk: createdOrUpdated.objectprodukfk,
                saldoawal: saldoAwal,
                masuk: masuk,
                keluar: keluar,
                saldoakhir: saldoAwal + changedQty,
                keteranan: "",
                status: false,
                tglinput: new Date(),
                tglupdate: new Date(),
                tabeltransaksi: "t_penerimaanbarangdetail",
                norectransaksi: createdOrUpdatedPenerimaan.norec,
                batch: createdOrUpdated.nobatch
            }, {
                transaction: transaction
            })
            return createdKartuStok
        })
    )

    return {createdKartuStok}
}