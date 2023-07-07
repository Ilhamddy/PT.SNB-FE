import * as uuid from 'uuid';
import db from "../../../models";
import pool from "../../../config/dbcon.query";
import { qGetPelayananFromAntrean, qGetNorecPenggunaFromAp } from '../../../queries/payment/payment.queries';

const t_notapelayananpasien = db.t_notapelayananpasien
const t_pelayananpasien = db.t_pelayananpasien

const getPelayananFromAntrean = async (req, res) => {
    try{
        const norecap = req.params.norecAP
        const pelayanan = await pool.query(qGetPelayananFromAntrean, [norecap])
        const dp = await pool.query(qGetNorecPenggunaFromAp, [norecap])
        console.log("dp", dp)
        let tempres = { 
            pelayanan: pelayanan.rows || [], 
            objectdaftarpasienfk: dp.rows[0].objectdaftarpasienfk || null 
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
            status: error,
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
            status: e.message,
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
        const changed = await t_notapelayananpasien.create({
            norec: norecnota,
            kdprofile: 0,
            statusenabled: true,
            objectdaftarpasienfk: body.objectdaftarpasienfk,
            total: body.total,
            no_nota: body.no_nota,
            objectpegawaifk: body.objectpegawaifk,
            tglinput: new Date(),
            keterangan: body.keterangan
        })
        const hasilPP = await Promise.all(norecppdone.map(async (norecpp) => {
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
        }))
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
            status: error,
            success: false,
            msg: 'Create Nota Verif Gagal',
            code: 500
        });
    }
}

export default {
    getPelayananFromAntrean,
    createNotaVerif
};