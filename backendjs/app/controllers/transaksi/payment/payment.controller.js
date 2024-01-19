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
    qDaftarTagihanPasienFromNota,
    qGetDepositFromNota,
    qGetBuktiBayarFromNorec,
    qGetCaraBayarFromBB,
    qGetLaporanPendapatanKasir,
    qGetPembayaran,
    qGetSetor,
} from '../../../queries/payment/payment.queries';
import { qDaftarVerifikasi,qListSudahVerifikasi,qListTagihan,qCariPetugas, qListKomponenTarif } from '../../../queries/remunerasi/remunerasi.queries';
import { createTransaction } from "../../../utils/dbutils"

import { Op } from "sequelize";
import { checkValidDate, getDateEnd, getDateStart, getDateStartEnd, getDateStartNull } from '../../../utils/dateutils';
import { statusEnabled, valueStatusEnabled } from '../../../queries/mastertable/globalvariables/globalvariables.queries';
import jenispembayaranQueries from '../../../queries/mastertable/jenispembayaran/jenispembayaran.queries';
import jenisNonTunaiQueries from '../../../queries/mastertable/jenisNonTunai/jenisNonTunai.queries';
import pegawaiQueries from '../../../queries/mastertable/pegawai/pegawai.queries';
import metodebayarQueries from '../../../queries/mastertable/metodebayar/metodebayar.queries';
import { groupBy } from '../../../utils/arutils';
import shiftkasirQueries from '../../../queries/mastertable/shiftkasir/shiftkasir.queries';

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
    const logger = res.locals.logger
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
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get Gagal',
            code: 500
        });
    }
};

const getPelayananFromVerif = async (req, res) => {
    const logger = res.locals.logger
    try{
        const norecnota = req.query.norecnota
        const norecbayar = req.query.norecbayar

        const pelayanan = await pool.query(qGetPelayananFromVerif, [norecnota])
        const verif = await pool.query(qGetVerif, [norecnota])
        const kepesertaan = await pool.query(qGetKepesertaanFromNota, [norecnota])
        const deposit = await pool.query(qGetDepositFromNota, [norecnota])
        let buktiBayar = await pool.query(qGetBuktiBayarFromNorec, [norecbayar])
        buktiBayar = buktiBayar.rows[0] || null
        if(buktiBayar?.carabayar){
            // masukkan nilai empty string karena di query susah
            const newCaraBayars = [...buktiBayar.carabayar].map(caraBayar => {
                const newCaraBayar = {...caraBayar}
                Object.keys(newCaraBayar).forEach(function(key) {
                    newCaraBayar[key] = newCaraBayar[key] || ""
                });
                return newCaraBayar
            })
            buktiBayar.carabayar = newCaraBayars
            buktiBayar.createdCaraBayar 
                = ((await pool.query(qGetCaraBayarFromBB, [buktiBayar.norec])).rows)
        }

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
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get Gagal',
            code: 500
        });
    }
};

const createNotaVerif = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] 
        = await createTransaction(db, res);
    if(errorTransaction) return;
    try{
        const norecnota = uuid.v4().substring(0, 32);
        const body = req.body
        const totalTagihan = body.total
        const norecppdone = body.norecppdone
        const {todayStart, todayEnd} = getDateStartEnd()
        let { count } = await t_notapelayananpasien.findAndCountAll({
            where: {
                tglinput: {
                    [db.Sequelize.Op.between]: [todayStart, todayEnd]
                }
            },
            transaction: transaction
        })
        count = count + 1
        let nonota = ("0000" + count).slice(-4)
        let tanggal = ("00" + todayStart.getDate()).slice(-2)
        let bulan = ("00" + todayStart.getMonth()).slice(-2)
        let tahun = ("" + todayStart.getFullYear()).slice(-4)
        nonota = `V${tahun}${bulan}${tanggal}${nonota}`

        const addedNota = await t_notapelayananpasien.create({
            norec: norecnota,
            kdprofile: 0,
            statusenabled: true,
            objectdaftarpasienfk: body.objectdaftarpasienfk,
            total: totalTagihan,
            no_nota: nonota,
            objectpegawaifk: req.idPegawai,
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
        await transaction.commit();
        
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
        logger.error(error)
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
    const logger = res.locals.logger
    try{
        let {datestart, dateend, namapasien} = req.query
        datestart = getDateStart(datestart)
        dateend = getDateEnd(dateend)
        const tagihan = await pool.query(qDaftarTagihanPasien, [
            datestart, 
            dateend,
            namapasien
        ])
        let tempres = tagihan.rows || []
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get daftar tagihan berhasil Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get daftar tagihan pasien berhasil',
            code: 500
        });
    }
}

const createBuktiBayar = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] 
        = await createTransaction(db, res);
    if(errorTransaction) return;
    try{
        
        const objectBody = req.body
        
        const {
            createdBuktiBayar, 
            totalPayment,
            norecbukti
        } = await hCreateBayar(req, transaction)

        const sisa = objectBody.totaltagihan - totalPayment

        await hChangeYangDibayar(
            req, 
            res, 
            transaction, 
            {
                norecbukti,
                sisa,
                totalPayment
            })

        if(sisa > 0){
            let piutangSebelum = null
            if(objectBody.norecpiutang){
                piutangSebelum = await t_piutangpasien.findByPk(objectBody.norecpiutang)
                if(!piutangSebelum) throw new Error("Piutang tidak ada norec: ", objectBody.norecpiutang)
                piutangSebelum = piutangSebelum.toJSON()
            }
            const norecpiutangnew = uuid.v4().substring(0, 32);
            const addedPiutang = await  t_piutangpasien.create({
                norec: norecpiutangnew,
                statusenabled: true,
                objectdaftarpasienfk: objectBody.norecdp,
                objectpenjaminfk: piutangSebelum?.objectpenjaminfk || 3,
                objectnotapelayananpasienfk: objectBody.norecnota,
                totalpiutang: sisa,
                totalbayar: 0,
                sisapiutang: sisa,
                tglinput: new Date(),
                tglupdate: new Date(),
                objectpegawaifk: req.idPegawai
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
                objectpegawaifk: req.idPegawai,
                objectbuktibayarfk: norecbukti,
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
        await transaction.commit();
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
            data: error,
            success: false,
            msg: 'Create Bukti Bayar Gagal',
            code: 500
        });
    }
}

const cancelNotaVerif = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] 
        = await createTransaction(db, res);
    if(errorTransaction) return;
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
            objectpegawaifk: req.idPegawai,
            tglbatal: new Date(),
            alasanbatal: "Batal Verif",
            objectnotapelayananpasienfk: norecnota
        }, {
            transaction: transaction
        })

        await transaction.commit();
        
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
        logger.error(error)
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
    const logger = res.locals.logger
    const [transaction, errorTransaction] 
        = await createTransaction(db, res);
    if(errorTransaction) return;
    try{
        const norecnota = req.params.norecnota;
        const norec = uuid.v4().substring(0, 32);
        const params = req.params
        let [_, updatedBuktiB] = await t_buktibayarpasien.update({
            statusenabled: false,
            tglbatal: new Date(),
        }, {
            where: {
                norec: params.norecbayar
            },
            returning: true,
            transaction: transaction
        })

        const notaSebelum = await t_notapelayananpasien.findOne({
            where: {
                objectbuktibayarfk: params.norecbayar
            }
        })

        const piutangSebelum = await t_piutangpasien.findOne({
            where: {
                objectbuktibayarfk: params.norecbayar
            }
        })

        if(notaSebelum){
            const updateNota = await notaSebelum.update({
                statusenabled: true,
                objectbuktibayarfk: null
            }, {
                returning: true
            })
        }

        if(piutangSebelum){
            const piutangSebelumVal = piutangSebelum?.toJSON() || null
            let totalPiutangBefore = piutangSebelumVal?.totalpiutang || 0
            const piutangUpdated = await piutangSebelum?.update({
                statusenabled: true,
                tglupdate: new Date(),
                totalbayar: 0,
                sisapiutang: totalPiutangBefore,
                objectbuktibayarfk: null
            }, {
                transaction: transaction,
            })
        }
        updatedBuktiB = updatedBuktiB[0]?.toJSON() || null

        await hCancelPiutangAfter(
            req, 
            res, 
            transaction, 
        {
            updatedBuktiBayar: updatedBuktiB,
        })

        const updatedCaraBayar = await t_carabayar.update({
            statusenabled: false,
        }, {
            where: {
                objectbuktibayarpasienfk: params.norecbayar
            },
            transaction: transaction
        })

        const logBatal = await t_log_pasienbatalbayar.create({
            norec: norec,
            objectpegawaifk: req.idPegawai,
            tglbatal: new Date(),
            alasanbatal: "Batal Bayar",
            objectnotapelayananpasienfk: params.norecnota,
            objectbuktibayarpasienfk: params.norecbayar
        }, {
            transaction: transaction
        })
        await transaction.commit();
        res.status(200).send({
            data: {
                changedNPP: updatedBuktiB,
                logBatal: logBatal,
                updatedCaraBayar: updatedCaraBayar
            },
            status: "success",
            success: true,
            msg: 'Cancel Bayar Berhasil',
            code: 200
        });
    }catch(error){
        logger.error(error)
        await transaction.rollback();
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Create Nota Verif Gagal',
            code: 500
        });
    }
}

const getAllPiutang = async (req, res) => {
    const logger = res.locals.logger
    try{
        const location = req.query.location;
        let {datestart, dateend, namapasien} = req.query
        datestart = getDateStartNull(datestart)
        dateend = getDateStartNull(dateend)

        let piutangs = await pool.query(qGetPiutangPasien, [
            location, 
            '',
            '',
            false,
            datestart || '',
            dateend || '',
            namapasien || ''
        ])

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
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get daftar piutang pasien berhasil',
            code: 500
        });
    }
}

const getPaymentForPiutang = async (req, res) => {
    const logger = res.locals.logger
    try{
        const norecpiutang = req.query.norecpiutang;
        const norecbayar = req.query.norecbayar;
        let piutang = await pool.query(qGetPaymentForPiutang, [norecpiutang])
        piutang = piutang.rows[0] || null
        const norecnota = piutang.norecnota
        let buktiBayar = await pool.query(qGetBuktiBayarFromNorec, [norecbayar])
        buktiBayar = buktiBayar.rows[0] || null

        const buktiBayarSebelumnya = await pool.query(qDaftarTagihanPasienFromNota, [
            norecnota,
            buktiBayar?.tglinput || ""
        ])

        if(buktiBayar?.carabayar){
            // masukkan nilai empty string karena di query susah
            const newCaraBayars = [...buktiBayar.carabayar].map(caraBayar => {
                const newCaraBayar = {...caraBayar}
                Object.keys(newCaraBayar).forEach(function(key) {
                    newCaraBayar[key] = newCaraBayar[key] || ""
                });
                return newCaraBayar
            })
            buktiBayar.carabayar = newCaraBayars
            buktiBayar.createdCaraBayar 
                = ((await pool.query(qGetCaraBayarFromBB, [buktiBayar.norec])).rows)
        }

        let tempres = {
            piutang: piutang,
            buktibayarsebelum: buktiBayarSebelumnya.rows || [],
            buktiBayar: buktiBayar
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get daftar tagihan berhasil Berhasil',
            code: 200
        });
    }catch(e){
        logger.error(e)
        res.status(500).send({
            data: e,
            success: false,
            msg: 'Get Payment For Piutang Gagal',
            code: 500
        });
    }
}

const getLaporanPendapatanKasir = async (req, res) => {
    const logger = res.locals.logger
    try{
        let Laporan = await pool.query(qGetLaporanPendapatanKasir, [
            req.query.start,
            req.query.end, 
            `%${req.query.search}%`])
        let tempres = {
            laporan: Laporan.rows || []
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get Laporan Pendapatan Kasir berhasil Berhasil',
            code: 200
        });
    }catch(e){
        logger.error(e)
        res.status(500).send({
            data: e,
            success: false,
            msg: 'Get Laporan Pendapatan Kasir Gagal',
            code: 500
        });
    }
}

const getPiutangAfterDate = async (req, res) => {
    const logger = res.locals.logger
    try {
        const {tglterakhir, norecnota} = req.query
        if(!checkValidDate(tglterakhir)){
            throw new Error("Tanggal tidak valid")
        }
        if(!norecnota){
            throw new Error("No nota tidak boleh kosong")
        }
        const piutangs = await pool.query(qGetPiutangPasien, 
            [
                'pasien', 
                new Date(tglterakhir),
                norecnota,
                true,
                '',
                '',
                ''
            ])
        const tempres = piutangs.rows || []
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get daftar piutang Berhasil',
            code: 200
        });
    } catch(error) {
        logger.error(error)
        res.status(500).send({
            data: error,
            success: false,
            msg: 'Get All Payment Gagal',
            code: 500
        });
    }
}

const getDaftarVerifikasiRemunerasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        //TODO:sini
        // const result1 = await pool.query(qDaftarVerifikasi, [req.query.tglAwal, req.query.tglAkhir])
        const instalasi = req.query.instalasi !== '' ? ` and mu.objectinstalasifk='${req.query.instalasi}'` : ' ';
        const unit = req.query.unit !== '' ? ` and mu.id='${req.query.unit}'` : ' ';
        const penjamin = req.query.penjamin !== '' ? ` and td.objectpenjaminfk='${req.query.penjamin}'` : ' ';
        let query = qDaftarVerifikasi + ` and td.tglpulang between '${req.query.tglAwal}' and '${req.query.tglAkhir}' 
        ${instalasi} ${unit} ${penjamin}
        group by td.norec,td.noregistrasi,td.tglregistrasi,td.tglpulang,mp.nocm,mp.namapasien,
        mp2.namarekanan,mp3.namalengkap,tp.total,tp.norec
        ) as x
        group by x.norecdp,x.noregistrasi,x.tglregistrasi,x.tglpulang,x.nocm,x.namapasien,
        x.namarekanan,x.dpjp`

        const result1 = await pool.query(query)
        
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result1.rows,
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

const saveVerifikasiRemunerasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result1 = await pool.query(qListTagihan, [req.body.norecdp])
        if(result1.rowCount===0){
            res.status(201).send({
                msg: 'List Pelayanan Tidak Ada / Sudah Diverifikasi',
                code: 201,
                data: 'List Pelayanan Tidak Ada / Sudah Diverifikasi',
                success: false
            });
            return
        }
        const { verifikasi,updateNorec } = await db.sequelize.transaction(async (transaction) => {
            let verifikasi = ''
            let updateNorec = ''
           
        
            const norec = uuid.v4().substring(0, 32);
            verifikasi = await db.t_verifremunerasi.create({
                norec:norec,
                objectpegawaifk: req.idPegawai,
                tglinput: new Date()
            }, { transaction });
          
            for (let i = 0; i < result1.rows.length; i++) {
                const element = result1.rows[i];
                updateNorec = await db.t_pelayananpasien.update({
                    objectverifremunerasifk: norec,
                }, {
                    where: {
                        norec: element.norec
                    },
                    transaction: transaction
                });
            }
            return { verifikasi,updateNorec }
        });
        
        const tempres = {
            verifikasi:verifikasi,
            updateNorec:updateNorec
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

const getDaftarSudahVerifikasiRemun = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const instalasi = req.query.instalasi !== '' ? ` and mu.objectinstalasifk='${req.query.instalasi}'` : ' ';
        const unit = req.query.unit !== '' ? ` and mu.id='${req.query.unit}'` : ' ';
        const penjamin = req.query.penjamin !== '' ? ` and td.objectpenjaminfk='${req.query.penjamin}'` : ' ';
        let query = qListSudahVerifikasi + ` tp.objectverifremunerasifk is not null and td.tglpulang between '${req.query.tglAwal}' and '${req.query.tglAkhir}' 
        ${instalasi} ${unit} ${penjamin} and tp.statusenabled = true order by no asc`
        // console.log(query)
        const result1 = await pool.query(query)
        for (let i = 0; i < result1.rows.length; ++i) {
            const resultlistPetugas =await pool.query(qCariPetugas,[result1.rows[i].norec])
            let tempPetugas = ''
            let tempJenisPelaksana = ''
            for (let x = 0; x < resultlistPetugas.rows.length; ++x) {
                tempPetugas = tempPetugas + resultlistPetugas.rows[x].namalengkap + ', '
                tempJenisPelaksana = tempJenisPelaksana + resultlistPetugas.rows[x].reportdisplay + ', '
            }
            result1.rows[i].petugas = tempPetugas
            result1.rows[i].jenispelaksana = tempJenisPelaksana

            const resultKomponen =await pool.query(qListKomponenTarif,[result1.rows[i].norec])
            for (let y = 0; y < resultKomponen.rows.length; y++) {
                const element = resultKomponen.rows[y];
                if(element.id===1)
                    result1.rows[i].komdokdpjp= element.totalkomponen
                else if(element.id===2)
                    result1.rows[i].komperawat= element.totalkomponen
                else if(element.id===3)
                    result1.rows[i].komdokanastesi= element.totalkomponen
                else if(element.id===4)
                    result1.rows[i].komjasars= element.totalkomponen
            }
        }
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result1.rows,
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

const getComboSetor = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const metodeBayar = (await pool.query(metodebayarQueries.getAll)).rows
        const jenisNonTunai = (await pool.query(jenisNonTunaiQueries.getAll)).rows
        const pegawai = (await pool.query(pegawaiQueries.getAll)).rows
        const shiftKasir = (await pool.query(shiftkasirQueries.getAll)).rows
        const pegawaiInput = pegawai.find(peg => peg.value === req.idPegawai)
        const tempres = {
            metodeBayar,
            jenisNonTunai,
            pegawai,
            shiftKasir,
            idpegawai: req.idPegawai,
            pegawaiInput: pegawaiInput
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

const getPembayaranSetor = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { tanggalshift } = req.query
        if(!tanggalshift) throw new Error("tglshift kosong")
        const {todayStart, todayEnd} = getDateStartEnd(tanggalshift)
        const setor = (await pool.query(qGetSetor, [
            todayStart, 
            todayEnd, 
            req.idPegawai
        ])).rows
        let buktiBayar = (await pool.query(
            qGetPembayaran, [
                todayStart, 
                todayEnd, 
                req.idPegawai
            ])).rows
        buktiBayar = groupBy(buktiBayar, "metodebayar")
        const tempres = {
            buktiBayar: buktiBayar,
            setor: setor[0] || null
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

const upsertSetoran = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {upsertedDetail, upsertedSetoran} 
        = await db.sequelize.transaction(async (transaction) => {
            const {
                upsertedSetoran, 
                norecsetoran
            } = await hUpsertSetoran(req, res, transaction)
            const details = await hUpsertSetoranDetail(
                req, 
                res, 
                transaction, 
                {
                    norecsetoran: norecsetoran
                })
            return {
                upsertedSetoran: upsertedSetoran,
                upsertedDetail: details
            }
        });

        const tempres = {
            upsertedDetail: upsertedDetail, 
            upsertedSetoran: upsertedSetoran
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
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
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
    getPaymentForPiutang,
    getLaporanPendapatanKasir,
    getPiutangAfterDate,
    getDaftarVerifikasiRemunerasi,
    saveVerifikasiRemunerasi,
    getDaftarSudahVerifikasiRemun,
    getComboSetor,
    getPembayaranSetor,
    upsertSetoran
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
                tglupdate: new Date(),
                objectpegawaifk: req.idPegawai
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

const hCreateBayar = async ( req, transaction) => {
    const norecbukti = uuid.v4().substring(0, 32);
    const objectBody = req.body
    const totalPayment = objectBody.payment.reduce((total, payment) => {
        return total + payment.nominalbayar
    }, 0);
    const { todayStart, todayEnd } = getDateStartEnd()
    let { count } = await t_buktibayarpasien.findAndCountAll({
        where: {
            tglinput: {
                [db.Sequelize.Op.between]: [todayStart, todayEnd]
            }
        },
        transaction: transaction
    })
    count = count + 1
    let nobb = ("0000" + count).slice(-4)
    let tanggal = ("00" + todayStart.getDate()).slice(-2)
    let bulan = ("00" + todayStart.getMonth()).slice(-2)
    let tahun = ("" + todayStart.getFullYear()).slice(-4)
    nobb = `B${tahun}${bulan}${tanggal}${nobb}`

    let createdBuktiBayar = await t_buktibayarpasien.create({
        norec: norecbukti,
        kdprofile: 0,
        statusenabled: true,
        objectdaftarpasienfk: objectBody.norecdp,
        totaltagihan: objectBody.totaltagihan,
        deposit: objectBody.deposit,
        totalbayar: totalPayment,
        no_bukti: nobb,
        objectpegawaifk: req.idPegawai,
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
        objectjenispembayaranfk:objectBody.objectjenispembayaranfk,
    }, {
        transaction: transaction
    })

    const createdCaraBayar = await Promise.all(
        objectBody.payment.map(async (payment) => {
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
            
            return createdCaraBayar
        }
    ))

    createdBuktiBayar = createdBuktiBayar.toJSON()
    createdBuktiBayar.createdCaraBayar = createdCaraBayar

    return {
        createdBuktiBayar, 
        totalPayment,
        norecbukti
    }
}

// piutang yang sudah terbayarkan setelahnya
const hCancelPiutangAfter = async (req, res, transaction, {
    updatedBuktiBayar,
}) => {
    const piutangPasienBefores = await t_piutangpasien.findAll({
        where: {
            objectnotapelayananpasienfk: req.params.norecnota,
            objectpenjaminfk: 3,
            tglinput: {
                [Op.gt]: new Date(updatedBuktiBayar.tglinput)
            },
            statusenabled: true
        },
        transaction: transaction
    })

    await Promise.all(
        piutangPasienBefores.map(
            async (piutangPasienBefore) => {
                const piutangPasienBeforeVal = piutangPasienBefore?.toJSON() || null
                let totalPiutangBefore = piutangPasienBeforeVal?.totalpiutang || 0
                let totalBayarBefore = piutangPasienBeforeVal?.totalbayar || 0

                const buktiBayarSebelum = await t_buktibayarpasien.findOne({
                    where: {
                        norec: piutangPasienBeforeVal.objectbuktibayarfk
                    },
                    transaction: transaction
                })

                const buktiBayarSebelumUpdated = await buktiBayarSebelum?.update({
                    statusenabled: false,
                    tglbatal: new Date(),
                }, {
                    transaction: transaction
                })
        
                const updatedPiutangAfter = await piutangPasienBefore?.update({
                    statusenabled: false,
                    objectbuktibayarfk: null
                }, {
                    transaction: transaction
                })
                
            }
        )
    )
}

const hChangeYangDibayar = async (
    req, 
    res, 
    transaction,
    {
        norecbukti,
        sisa,
        totalPayment
    }
) => {
    const objectBody = req.body
    let nota, piutang   
    if(objectBody.norecnota){
        nota = await t_notapelayananpasien.findOne({
            where: {
                norec: objectBody.norecnota
            },
            transaction: transaction
        })

        await nota.update({
            objectbuktibayarfk: norecbukti
        }, {
            transaction: transaction
        })
    }
    
    if(objectBody.norecpiutang){
        const [_, updatedPiutang] = await t_piutangpasien.update({
            totalbayar: totalPayment,
            sisapiutang: sisa,
            tglupdate: new Date(),
            objectbuktibayarfk: norecbukti
        }, {
            where: {
                norec: objectBody.norecpiutang
            },
            transaction: transaction,
            returning: true
        })
        piutang = updatedPiutang
    }
    return {nota, piutang}
}

const hUpsertSetoran = async  (req, res, transaction) => {
    const reqBody = req.body
    let upsertedSetoran
    let norecsetoran = uuid.v4().substring(0, 32)

    if(!reqBody.norecsetoran){
        let created = await db.t_setorankasir.create({
            norec: norecsetoran,
            kdprofile: 0,
            statusenabled: true,
            objectpegawaifk: req.idPegawai,
            objectshiftfk: reqBody.jadwalshift,
            tglinput: new Date(),
            jumlahsetor: reqBody.totalsetor,
            tglsetor: new Date(reqBody.tanggalshift)
        }, {
            transaction: transaction
        })
        upsertedSetoran = created.toJSON()
    } else{
        const updatedModel = await db.t_setorankasir.findByPk(reqBody.norecsetoran)
        if(!updatedModel) throw new Error("Tidak ditemukan setoran kasir: " + reqBody.norecsetoran)
        await updatedModel.update({
            norec: norecsetoran,
            kdprofile: 0,
            statusenabled: true,
            objectpegawaifk: req.idPegawai,
            objectshiftfk: reqBody.jadwalshift,
            jumlahsetor: reqBody.totalsetor,
            tglsetor: new Date(reqBody.tanggalshift)
        }, {
            transaction: transaction
        })
        norecsetoran = reqBody.norecsetoran
        upsertedSetoran = updatedModel.toJSON()
    }
    return {upsertedSetoran, norecsetoran}
}

const hUpsertSetoranDetail = async (
    req, 
    res, 
    transaction, 
    {
        norecsetoran
    }
) => {
    const reqBody = req.body
    const details = await Promise.all(
        reqBody.detail.map(async (det) => {
            const norecDetail = uuid.v4().substring(0, 32)
            let createdDetail = await db.t_setorankasirdetail.create({
                norec: norecDetail,
                objectsetorankasirfk: norecsetoran,
                objectjenisnontunaifk: det.jenisnontunai,
                total: det.total,
                objectmetodebayarfk: det.metodebayar || null
            }, {
                transaction: transaction
            })
            const updatedBuktiBayar = await Promise.all(
                det.values.map(async (val) => {
                    const all = await Promise.all(
                        val.map(async (val) => {
                            const cb = await db.t_carabayar.findByPk(
                                val.noreccarabayar, {
                                    transaction: transaction
                                }
                            )
                            const bb = await db.t_buktibayarpasien.findByPk(
                                val.norecbuktibayar,
                                {
                                    transaction: transaction
                                }
                            )
                            if(!cb) throw new Error("Tidak ada Cara Bayar " + val.noreccarabayar)
                            if(!bb) throw new Error("Tidak ada Bukti Bayar " + val.norecbuktibayar)
                            await cb.update({
                                objectsetorankasirdetailfk: norecDetail
                            }, {
                                transaction: transaction
                            })
                            await bb.update({
                                objectsetorankasirfk: norecsetoran
                            }, {
                                transaction: transaction
                            })

                            return bb.toJSON()
                        })
                    )
                    return all
                })
            )
            createdDetail = createdDetail.toJSON()
            createdDetail._updatedBuktiBayar = updatedBuktiBayar
            return {
                createdDetail: createdDetail
            }
        })
    )
    return details
}