import * as uuid from 'uuid';
import db from "../../../models";
import pool from "../../../config/dbcon.query";
import { qGetPelayananFromDp, 
    qDaftarTagihanPasien, 
    qGetPelayananFromVerif, 
    qGetVerif,
    qGetKepesertaanFromAntrean as qGetKepesertaanFromDp,
    qGetKepesertaanFromNota,
    qGetPiutangFromDP,
    qGetNotaPelayananPasien,
    qGetBuktiBayar,
    qGetPiutangPasien,
    qTagihanGetFromDP,
    qGetPaymentForPiutang,
    qDaftarTagihanPasienFronNota,
    qGetDepositFromNota,
    qGetBuktiBayarFromNota,
    qGetCaraBayarFromBB
} from '../../../queries/payment/payment.queries';

import { Op } from "sequelize";


const t_notapelayananpasien = db.t_notapelayananpasien
const t_pelayananpasien = db.t_pelayananpasien
const t_buktibayarpasien = db.t_buktibayarpasien
const t_log_batalveriflayanan = db.t_log_batalveriflayanan
const t_kepesertaanasuransi = db.t_kepesertaanasuransi
const t_log_pasienbatalbayar = db.t_log_pasienbatalbayar
const t_piutangpasien = db.t_piutangpasien
const t_detailpiutangpasien = db.t_detailpiutangpasien
const t_carabayar = db.t_carabayar
const t_depositpasien = db.t_depositpasien
const Sequelize = {}

const getPelayananFromDP = async (req, res) => {
    try{
        const norecdp = req.params.norecdp
        const pelayanan = await pool.query(qGetPelayananFromDp, [norecdp])
        let kepesertaan = await pool.query(qGetKepesertaanFromDp, [norecdp])
        kepesertaan = kepesertaan.rows[0]?.list_kpa || []
        kepesertaan = kepesertaan.filter((peserta) => peserta.no_kartu !== null)
        let tempres = { 
            pelayanan: pelayanan.rows || [], 
            kepesertaan: kepesertaan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch(error){
        console.error("===Error Get Pelayanan From Antrean");
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
        const deposit = await pool.query(qGetDepositFromNota, [norecnota])
        let buktiBayar = await pool.query(qGetBuktiBayarFromNota, [norecnota])
        buktiBayar = buktiBayar.rows[0] || null
        buktiBayar.createdCaraBayar = (await pool.query(qGetCaraBayarFromBB, [buktiBayar.norec])).rows || []
        let tempres = { 
            pelayanan: pelayanan.rows || [],
            nota: verif.rows[0] || null,
            kepesertaan: kepesertaan.rows[0]?.list_kpa || [],
            deposit: deposit.rows || [],
            buktiBayar: buktiBayar
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
        const totalTagihan = body.total
        const norecppdone = body.norecppdone
        const addedNota = await t_notapelayananpasien.create({
            norec: norecnota,
            kdprofile: 0,
            statusenabled: true,
            objectdaftarpasienfk: body.objectdaftarpasienfk,
            total: totalTagihan,
            no_nota: body.no_nota,
            objectpegawaifk: req.userId,
            tglinput: new Date(),
            keterangan: body.keterangan
        }, {transaction: transaction})

        const {addedDetailPiutang, addedPiutangPasien} = 
            await hAddPiutang(req, res, transaction, norecnota)

        const hasilPP = await Promise.all(
            norecppdone.map(async (norecpp) => {
                await t_pelayananpasien.update({
                    objectnotapelayananpasienfk: norecnota
                }, {
                    where: {
                        norec: norecpp
                    },
                    transaction: transaction
                })
                return norecpp
            }
        ))

        const hasilKepesertaan = await Promise.all(
            req.body.isipenjamin.map(async (penjamin) => {
                await t_kepesertaanasuransi.update({
                    nominalklaim: penjamin.value
                }, {
                    where: {
                        norec: penjamin.norec,
                    },
                    transaction: transaction
                })
                return penjamin.norec
            })
        )
        transaction.commit();
        
        res.status(200).send({
            data: {
                addedNota: addedNota,
                changedPP: hasilPP,
                addedPiutangPasien: addedPiutangPasien,
                addedDetailPiutang: addedDetailPiutang,
            },
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    }catch(error){
        console.error("==Error Create Nota Verif");
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
        const objectBody = req. body
        const norecbukti = uuid.v4().substring(0, 32);
        
        const {createdBuktiBayar, totalPayment} = 
            await hCreateBayar(norecbukti, objectBody, transaction)

        const sisa = objectBody.totaltagihan - totalPayment

        if(objectBody.norecpiutang){
            t_piutangpasien.update({
                totalbayar: totalPayment,
                sisapiutang: sisa,
                tglupdate: new Date()
            }, {
                where: {
                    norec: objectBody.norecpiutang
                }
            })
        }

        if(sisa > 0){
            const norecpiutangnew = uuid.v4().substring(0, 32);
            const addedPiutang = await  t_piutangpasien.create({
                norec: norecpiutangnew,
                statusenabled: true,
                objectdaftarpasienfk: objectBody.norecdp,
                objectpenjaminfk: 3,
                objectnotapelayananpasienfk: objectBody.norecnota,
                totalpiutang: sisa,
                totalbayar: 0,
                sisapiutang: sisa,
                tglinput: new Date(),
                tglupdate: new Date,
                objectpegawaifk: req.userId
            }, {
                transaction: transaction
            })
        }

        let createdDeposit = null
        let changedDeposit = null
        if(objectBody.isdeposit){
            createdDeposit = await t_depositpasien.create({
                norec: uuid.v4().substring(0, 32),
                statusenabled: true,
                objectdaftarpasienfk: objectBody.norecdp,
                nominal: totalPayment,
                objectpegawaifk: req.userId,
                objectbuktibayarpasienfk: norecbukti,
                tglinput: new Date(),
            }, {
                transaction: transaction
            })
        }else{
            let listDepositNota = await pool.query(qGetDepositFromNota, [objectBody.norecnota]);
            let depositUsed = objectBody.deposit || 0
            listDepositNota = listDepositNota.rows || []
            changedDeposit = await Promise.all(
                listDepositNota.map(async (deposit) => {
                    if(depositUsed > deposit.nominal){
                        depositUsed = depositUsed - deposit.nominal
                        return await t_depositpasien.update({
                            nominal: 0
                        }, {
                            where: {
                                norec: deposit.norec
                            },
                            transaction: transaction
                        })
                    }else{
                        return await t_depositpasien.update({
                            nominal: deposit.nominal - depositUsed
                        }, {
                            where: {
                                norec: deposit.norec
                            },
                            transaction: transaction
                        })
                    }
                })
            )
        }

        const tempres = {
            buktiBayar: createdBuktiBayar,
            createdDeposit: createdDeposit,
            changedDeposit: changedDeposit
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
        const norecdp = req.params.norecdp;
        const updatedPP = await t_pelayananpasien.update({
            objectnotapelayananpasienfk: null
        }, {
            where: {
                objectnotapelayananpasienfk: norecnota
            },
            transaction: transaction
        })



        const updatedNPP = await t_notapelayananpasien.update({
            statusenabled: false,
        }, {
            where: {
                norec: norecnota
            },
            transaction: transaction
        })


        const updatedPiutang = await t_piutangpasien.update({
            statusenabled: false,
        }, {
            where: {
                objectnotapelayananpasienfk: norecnota
            },
            transaction: transaction
        })
        

        const batalVerif = await t_log_batalveriflayanan.create({
            norec: uuid.v4().substring(0, 32),
            objectpegawaifk: req.userId,
            tglbatal: new Date(),
            alasanbatal: "Batal Verif",
            objectnotapelayananpasienfk: norecnota
        }, {
            transaction: transaction
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
        const norec = uuid.v4().substring(0, 32);
        const params = req.params
        const [cob, updatedBuktiB] = await t_buktibayarpasien.update({
            statusenabled: false,
        }, {
            where: {
                norec: params.norecbayar
            },
            returning: true,
            plain: true,
            transaction: transaction
        })

        const [hasil, updatedRestBB] = await t_buktibayarpasien.update({
            statusenabled: false,
        }, {
            where: {
                objectnotapelayananpasienfk: updatedBuktiB.objectnotapelayananpasienfk,
                tglinput: {
                    [Op.gte]: new Date(updatedBuktiB.tglinput.getTime() - new Date().getTimezoneOffset() * 60000)
                },
                statusenabled: true
            },
            transaction: transaction
        })

        const updatedCaraBayar = await t_carabayar.update({
            statusenabled: false,
        }, {
            where: {
                objectbuktibayarpasienfk: params.norecbayar
            },
            transaction: transaction
        })

        const updatedPiutang = await t_piutangpasien.update({
            statusenabled: false,
        }, {
            where: {
                objectnotapelayananpasienfk: params.norecnota,
                objectpenjaminfk: 3,
                tglinput: {
                    [Op.gte]: new Date(updatedBuktiB.tglinput.getTime() - new Date().getTimezoneOffset() * 60000)
                },
                statusenabled: true
            },
            transaction: transaction
        })


        const updatedPasien = await t_log_pasienbatalbayar.create({
            norec: norec,
            objectpegawaifk: req.userId,
            tglbatal: new Date(),
            alasanbatal: "Batal Bayar",
            objectnotapelayananpasienfk: params.norecnota,
            objectbuktibayarpasienfk: params.norecbayar
        }, {
            transaction: transaction
        })
        transaction.commit();
        res.status(200).send({
            data: {
                changedNPP: updatedBuktiB,
                updatedPasien: updatedPasien,
                updatedCaraBayar: updatedCaraBayar
            },
            status: "success",
            success: true,
            msg: 'Cancel Bayar Berhasil',
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

const getAllPiutang = async (req, res) => {
    try{
        const location = req.params.location;
        let piutangs = await pool.query(qGetPiutangPasien, [location])

        piutangs = [...piutangs.rows]
        let tempres = [...piutangs]
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get daftar piutang Berhasil',
            code: 200
        });
    }catch(error){
        console.error("===Error Get Daftar Piutang Pasien===");
        console.error(error);
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get daftar piutang pasien berhasil',
            code: 500
        });
    }
}


const getPaymentForPiutang = async (req, res) => {
    try{
        const norecpiutang = req.params.norecpiutang;
        let piutang = await pool.query(qGetPaymentForPiutang, [norecpiutang])
        piutang = piutang.rows[0] || null
        const norecnota = piutang.norecnota 
        const buktibayar = await pool.query(qDaftarTagihanPasienFronNota, [norecnota])
        let tempres = {
            piutang: piutang,
            buktibayar: buktibayar.rows || []
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get daftar tagihan berhasil Berhasil',
            code: 200
        });
    }catch(e){
        console.error("===Error Get Payment For Piutang===");
        console.error(e);
        res.status(500).send({
            data: e,
            success: false,
            msg: 'Get Payment For Piutang Gagal',
            code: 500
        });
    }
}


export default {
    getPelayananFromDP,
    createNotaVerif,
    getDaftarTagihanPasien,
    getPelayananFromVerif,
    createBuktiBayar,
    cancelNotaVerif,
    cancelBayar,
    getAllPiutang,
    getPaymentForPiutang
}


//helper
const hAddPiutang = async (req, res, transaction, norecnota) => {
    const isipenjamin = req.body.isipenjamin
    const newTotalTagihan = req.body.total
    let addedPiutangPasien
    const addedPenjamin = await Promise.all(
        isipenjamin.map(async (penjamin) => {
            const norecpiutangnew = uuid.v4().substring(0, 32);
            addedPiutangPasien = await t_piutangpasien.create({
                norec: norecpiutangnew,
                statusenabled: true,
                objectdaftarpasienfk: req.body.objectdaftarpasienfk,
                objectpenjaminfk: penjamin.objectpenjaminfk,
                objectnotapelayananpasienfk: norecnota,
                totalpiutang: penjamin.value,
                totalbayar: 0,
                sisapiutang: penjamin.value - 0,
                tglinput: new Date(),
                tglupdate: new Date,
                objectpegawaifk: req.userId
            }, {
                transaction: transaction
            })
        })
    )

    return {addedPenjamin}
}

const hChangeDetailPiutangPasien = async (norecSebelum, norecSetelah, transaction) => {
    const changedDetailPiutang = await t_detailpiutangpasien.update({
        objectpiutangpasienfk: norecSetelah
    }, {
        where: {
            objectpiutangpasienfk: norecSebelum,
        },
        transaction: transaction
    })
    return changedDetailPiutang
}

const hCreateBayar = async (norecbukti, objectBody, transaction) => {
    const totalPayment = objectBody.payment.reduce((total, payment) => {
        return total + payment.nominalbayar
    }, 0);
    await t_buktibayarpasien.create({
        norec: norecbukti,
        kdprofile: 0,
        statusenabled: true,
        objectdaftarpasienfk: objectBody.norecdp,
        totaltagihan: objectBody.totaltagihan,
        deposit: objectBody.deposit,
        totalbayar: totalPayment,
        no_bukti: objectBody.nobukti,
        objectpegawaifk: objectBody.pegawai,
        objectnotapelayananpasienfk: objectBody.norecnota || null,
        objectmetodebayarfk: null,
        objectjenisnontunaifk: null,
        objectrekeningrsfk: null,
        objectpiutangpasienfk: objectBody.norecpiutang || null,
        keterangan: objectBody.keterangan,
        pjpasien: objectBody.pjpasien,
        diskon: objectBody.diskon,
        klaim: objectBody.klaim,
        tglinput: new Date(),
    }, {transaction: transaction})

    const createdCaraBayar = await Promise.all(
        objectBody.payment.map(async (payment) => {
            const norecCaraBayar = uuid.v4().substring(0, 32);
            const createdCaraBayar = await t_carabayar.create({
                norec: uuid.v4().substring(0, 32),
                statusenabled: true,
                objectbuktibayarpasienfk: norecbukti,
                objectmetodebayarfk: payment.metodebayar,
                objectjenisnontunaifk: payment.nontunai || null,
                objectrekeningrsfk: payment.rekening || null,
                totalbayar: payment.nominalbayar,
                objectpiutangpasienfk: null,
                pjpasien: payment.pjpasien || null,
                approvalcode: payment.approvalcode || null,  
            }, {
                transaction: transaction
            })
            createdCaraBayar.objectmetodebayarfk 
                = (await pool.query(`
                SELECT metodebayar 
                FROM m_metodebayar 
                    WHERE id = $1`, [createdCaraBayar.objectmetodebayarfk])).rows[0].metodebayar
            if(createdCaraBayar.objectjenisnontunaifk){
                createdCaraBayar.objectjenisnontunaifk 
                    = (await pool.query(`
                    SELECT nontunai
                    FROM m_jenisnontunai 
                    WHERE id = $1`, [createdCaraBayar.objectjenisnontunaifk]))
                    .rows[0]
                    .nontunai
            }
            return createdCaraBayar
        }
    ))

    const createdBuktiBayar = await pool.query(qGetDepositFromNota, [objectBody.norecnota])
    createdBuktiBayar.createdCaraBayar = createdCaraBayar

    return {createdBuktiBayar, totalPayment}
}