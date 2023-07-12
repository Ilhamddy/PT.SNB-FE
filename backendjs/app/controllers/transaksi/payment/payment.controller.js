import * as uuid from 'uuid';
import db from "../../../models";
import pool from "../../../config/dbcon.query";
import { qGetPelayananFromAntrean, 
    qGetNorecPenggunaFromAp, 
    qDaftarTagihanPasien, 
    qGetPelayananFromVerif, 
    qGetVerif,
    qGetKepesertaanFromAntrean,
    qGetKepesertaanFromNota
} from '../../../queries/payment/payment.queries';

const t_notapelayananpasien = db.t_notapelayananpasien
const t_pelayananpasien = db.t_pelayananpasien
const t_buktibayarpasien = db.t_buktibayarpasien
const t_log_batalveriflayanan = db.t_log_batalveriflayanan
const t_kepesertaanasuransi = db.t_kepesertaanasuransi
const t_log_pasienbatalbayar = db.t_log_pasienbatalbayar
const Sequelize = {}

const getPelayananFromAntrean = async (req, res) => {
    try{
        const norecap = req.params.norecAP
        const pelayanan = await pool.query(qGetPelayananFromAntrean, [norecap])
        const kepesertaan = await pool.query(qGetKepesertaanFromAntrean, [norecap])
        const dp = await pool.query(qGetNorecPenggunaFromAp, [norecap])
        let tempres = { 
            pelayanan: pelayanan.rows || [], 
            objectdaftarpasienfk: dp.rows[0].objectdaftarpasienfk || null,
            kepesertaan: kepesertaan.rows[0]?.list_kpa || []
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch(error){
        console.error("Error Get Pelayanan From Antrean");
        console.error(error);
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get Gagal',
            code: 500
        });
    }
};

const getPelayananFromVerif = async (req, res) => {
    try{
        const norecnota = req.params.norecnota
        const pelayanan = await pool.query(qGetPelayananFromVerif, [norecnota])
        const verif = await pool.query(qGetVerif, [norecnota])
        const kepesertaan = await pool.query(qGetKepesertaanFromNota, [norecnota])
        let tempres = { 
            pelayanan: pelayanan.rows || [],
            nota: verif.rows[0] || null,
            kepesertaan: kepesertaan.rows[0]?.list_kpa || []
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch(error){
        console.error("===Error Get Pelayanan From Verif");
        console.error(error);
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get Gagal',
            code: 500
        });
    }
};



const createNotaVerif = async (req, res) => {
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
        const norecnota = uuid.v4().substring(0, 32);
        const body = req.body
        const norecppdone = body.norecppdone
        const isipenjamin = body.isipenjamin
        const changed = await t_notapelayananpasien.create({
            norec: norecnota,
            kdprofile: 0,
            statusenabled: true,
            objectdaftarpasienfk: body.objectdaftarpasienfk,
            total: body.total,
            no_nota: body.no_nota,
            objectpegawaifk: req.userId,
            tglinput: new Date(),
            keterangan: body.keterangan
        })
        const hasilPP = await Promise.all(
            norecppdone.map(async (norecpp) => {
                await t_pelayananpasien.update({
                    objectnotapelayananpasienfk: norecnota
                }, {
                    where: {
                        norec: norecpp
                    }
                }, {
                    transaction
                })
                return norecpp
            }
        ))
        console.log("penjamin", isipenjamin)
        const hasilKepesertaan = await Promise.all(
            isipenjamin.map(async (penjamin) => {
                await t_kepesertaanasuransi.update({
                    nominalklaim: penjamin.value
                }, {
                    where: {
                        norec: penjamin.norec
                    }
                }, {
                    transaction
                })
                return penjamin.norec
            })
        )
        transaction.commit();
        
        res.status(200).send({
            data: {
                addedNota: changed,
                changedPP: hasilPP
            },
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    }catch(error){
        console.error("Error Create Nota Verif");
        console.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Verif Gagal',
            code: 500
        });
    }
}

const getDaftarTagihanPasien = async (req, res) => {
    try{
        const tagihan = await pool.query(qDaftarTagihanPasien, [])
        let tempres = tagihan.rows || []
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get daftar tagihan berhasil Berhasil',
            code: 200
        });
    }catch(error){
        console.error("===Error Get Daftar Tagihan Pasien===");
        console.error(error);
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get daftar tagihan pasien berhasil',
            code: 500
        });
    }
}

const createBuktiBayar = async (req, res) => {
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
        const norecbukti = uuid.v4().substring(0, 32);
        const buktiBayarP = await t_buktibayarpasien.create({
            norec: norecbukti,
            kdprofile: 0,
            statusenabled: true,
            objectdaftarpasienfk: objectBody.norecdp,
            totaltagihan: objectBody.totaltagihan,
            deposit: objectBody.deposit,
            totalbayar: objectBody.nominalbayar,
            no_bukti: objectBody.nobukti,
            objectpegawaifk: objectBody.pegawai,
            objectnotapelayananpasienfk: objectBody.norecnota,
            objectmetodebayarfk: objectBody.metodebayar,
            objectjenisnontunaifk: objectBody.nontunai || null,
            objectrekeningrsfk: objectBody.rekeningrs || null,
            pjpasien: objectBody.pjpasien,
            diskon: objectBody.diskon,
            klaim: objectBody.klaim,
        }, {transaction: transaction})
        const tempres = {
            buktiBayar: buktiBayarP
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
        console.error("===Error Create Bukti Bayar===");
        console.error(error);
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Bukti Bayar Gagal',
            code: 500
        });
    }
}

const cancelNotaVerif = async (req, res) => {
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
        const norecnota = req.params.norecnota;
        const updatedPP = await t_pelayananpasien.update({
            objectnotapelayananpasienfk: null
        }, {
            where: {
                objectnotapelayananpasienfk: norecnota
            }
        }, {
            transaction
        })

        const updatedNPP = await t_notapelayananpasien.update({
            statusenabled: false,
        }, {
            where: {
                norec: norecnota
            }
        }, {
            transaction
        })

        const batalVerif = await t_log_batalveriflayanan.create({
            norec: uuid.v4().substring(0, 32),
            objectpegawaifk: req.userId,
            tglbatal: new Date(),
            alasanbatal: "Batal Verif",
            objectnotapelayananpasienfk: norecnota
        }, {
            transaction
        })

        transaction.commit();
        
        res.status(200).send({
            data: {
                // changedPP: updatedPP,
                changedTPP: updatedNPP,
                newLog: batalVerif
            },
            status: "success",
            success: true,
            msg: 'Cancel Nota Berhasil',
            code: 200
        });
    }catch(error){
        console.error("Error Create Nota Verif");
        console.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Verif Gagal',
            code: 500
        });
    }
}

const cancelBayar = async (req, res) => {
    let transaction = null;
    try{
        transaction = await db.sequelize.transaction();
    }catch(e){
        console.error(e)
        const norec = uuid.v4().substring(0, 32);
        const body = {
            norecnota: "ca1ca2c9-f30b-46b0-a493-76b10fd2",
            norecbayar: "2dbe45cb-5116-4a52-bc69-67d09559"
        }
        const updatedNPP = await t_buktibayarpasien.update({
            statusenabled: false,
        }, {
            where: {
                norec: body.norecbayar
            }
        }, {
            transaction
        })

        t_log_pasienbatalbayar.create({
            norec: norec,
            objectpegawaifk: req.userId,
            tglbatal: new Date(),
            alasanbatal: "Batal Bayar",
            objectnotapelayananpasienfk: body.norecnota,
            objectbuktibayarfk: body.norecbayar
        })

        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
        return;
    }
    try{
        const norecnota = req.params.norecnota;
        console.log(norecnota)
    }catch(error){
        console.error("Error Create Nota Verif");
        console.error(error)
        transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Verif Gagal',
            code: 500
        });
    }
}



export default {
    getPelayananFromAntrean,
    createNotaVerif,
    getDaftarTagihanPasien,
    getPelayananFromVerif,
    createBuktiBayar,
    cancelNotaVerif,
    cancelBayar
};