import db from "../../../models"
import { hCheckCaptcha, pasienSignup } from "../../auth/authhelper";
import jwt from "jsonwebtoken";
import config from "../../../config/auth.config";
import { encrypt } from "../../../utils/encrypt";
import { Op } from "sequelize";
import pool from "../../../config/dbcon.query";
import { getDateStartEnd, getDateStartEndMonth } from "../../../utils/dateutils";
import userpasienQueries from "../../../queries/daftarmandiri/userpasien/userpasien.queries";
import bcrypt from "bcryptjs"
import rekananQueries from "../../../queries/mastertable/rekanan/rekanan.queries";
import * as uuid from "uuid";
import * as nodemailer from "nodemailer"


const m_pasien = db.m_pasien
const running_number = db.running_number
const users_pasien = db.users_pasien

const upsertPasien = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const bodyReq = req.body
        const { dataPasien, userPasien, token } = 
        await db.sequelize.transaction(async (transaction) => {
            const id = req.id
            let dataPasien, userPasien, token = null;
            const { correct } = hCheckCaptcha(
                req.body.step3.uuid, 
                req.body.step3.answer
            )
            if(!correct) throw new Error("Captcha salah")
            const email = bodyReq.step3.email.toLowerCase()
            const pasienEmail = await db.m_pasien.findOne({
                where: {
                    email: email
                },
                transaction: transaction
            })
            if(pasienEmail) throw new Error("Email sudah digunakan")
            if(!id){
                [
                    dataPasien,
                    userPasien,
                    token
                ] = await hCreatePasien(req, res, transaction);
            } else {
                [
                    dataPasien,
                    userPasien,
                ] = await hUpdatePasien(req, res, transaction);
            }

            return {
                dataPasien,
                userPasien,
                token
            }
        });
        const user = {
            id: userPasien?.id,
            username: userPasien?.norm || null,
            isverifemail: userPasien?.isverifemail || false,
            accessToken: token,
            namapasien: dataPasien?.namapasien || null
        }
        
        const tempres = {
            datapasien: dataPasien,
            user: user
        };

        const data = encrypt(tempres, bodyReq.clientSecret || userPasien.clientsecret)

        res.status(200).send(data);
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


const getRiwayatReservasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {todayStart, todayEnd} = getDateStartEnd();
        const riwayat = await pool.query(userpasienQueries.qGetRiwayatRegistrasi, 
            [
                req.id, 
                '1970-01-1 00:00:00', 
                todayStart,
                ''
            ])
        const riwayatToday = await pool.query(userpasienQueries.qGetRiwayatRegistrasi, 
            [
                req.id, 
                todayStart, 
                todayEnd,
                ''
            ])
        const riwayatMendatang = await pool.query(userpasienQueries.qGetRiwayatRegistrasi,
            [
                req.id, 
                todayEnd, 
                '9999-12-31 23:59:59',
                ''
            ])
        const tempres = {
            riwayat: riwayat.rows,
            riwayatToday: riwayatToday.rows,
            riwayatMendatang: riwayatMendatang.rows
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


const batalRegis = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const updated = await db.sequelize.transaction(async (transaction) => {
            const {norec, alasan} = req.body
            const registrasiModel = await db.t_registrasionline.findOne({
                where: {
                    norec: norec,
                },
                transaction: transaction
            })
            await registrasiModel.update({
                statusenabled: false
            }, {
                transaction: transaction
            })
            const regisVal = registrasiModel?.toJSON() || null
            await db.t_batalpasien.create({
                norec: uuid.v4().substring(0, 32),
                objectdaftarpasienfk: regisVal?.objectdaftarpasienfk || null,
                objectpegawaifk: null,
                alasanbatal: alasan || '',
                objectbatalpasienfk: null,
                tglbatal: new Date()
            })
            return {updated: norec}
        });
        
        const tempres = {
            updated
        };
        res.status(200).send({
            msg: 'Sukses batal reservasi',
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

const getPasienEdit = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const pasien = await pool.query(userpasienQueries.qGetPasienEdit,
            [
                req.id
            ]
        )

        const step0 = {
            namalengkap: pasien.rows[0].namalengkap || "",
            noidentitas: pasien.rows[0].noidentitas || "",
            tempatlahir: pasien.rows[0].tempatlahir || "",
            tanggallahir: pasien.rows[0].tanggallahir || "",
            jeniskelamin: pasien.rows[0].jeniskelamin || "",
            golongandarah: pasien.rows[0].golongandarah || "",
            agama: pasien.rows[0].agama || "",
            kewarganegaraan: pasien.rows[0].kewarganegaraan || "",
            suku: pasien.rows[0].suku || "",
            bahasayangdikuasai: pasien.rows[0].bahasayangdikuasai || "",
            pendidikanterakhir: pasien.rows[0].pendidikanterakhir || "",
            pekerjaan: pasien.rows[0].pekerjaan || "",
            statusperkawinan: pasien.rows[0].statusperkawinan || "",
            namapasangan: pasien.rows[0].namapasangan || "",
        }

        const step1 = {
            alamat: pasien.rows[0].alamatktp || "",
            rt: pasien.rows[0].rtktp || "",
            rw: pasien.rows[0].rwktp || "",
            kelurahan: pasien.rows[0].kelurahanktp || "",
            kelurahanname: pasien.rows[0].kelurahannamektp || "",
            kecamatan: pasien.rows[0].kecamatanktp || "",
            kecamatanname: pasien.rows[0].kecamatannamektp || "",
            kabupaten: pasien.rows[0].kabupatenktp || "",
            kabupatenname: pasien.rows[0].kabupatennamektp || "",
            provinsi: pasien.rows[0].provinsiktp || "",
            provinsiname: pasien.rows[0].provinsinamektp || "",
            kodepos: pasien.rows[0].kodeposktp || "",
            negara: pasien.rows[0].negaraktp || ""
        }

        const step2 = {
            alamat: pasien.rows[0].alamatdomisili || "",
            rt: pasien.rows[0].rtdomisili || "",
            rw: pasien.rows[0].rwdomisili || "",
            kelurahan: pasien.rows[0].kelurahandomisili || "",
            kelurahanname: pasien.rows[0].kelurahannamedomisili || "",
            kecamatan: pasien.rows[0].kecamatandomisili || "",
            kecamatanname: pasien.rows[0].kecamatannamedomisili || "",
            kabupaten: pasien.rows[0].kabupatendomisili || "",
            kabupatenname: pasien.rows[0].kabupatennamedomisili || "",
            provinsi: pasien.rows[0].provinsidomisili || "",
            provinsiname: pasien.rows[0].provinsinamedomisili || "",
            kodepos: pasien.rows[0].kodeposdomisili || "",
            negara: pasien.rows[0].negaradomisili || ""
        }

        const step3 = {
            namaibu: pasien.rows[0].namaibu || "",
            namaayah: pasien.rows[0].namaayah || "",
            nobpjs: pasien.rows[0].nobpjs || "",
            nohppasien: pasien.rows[0].nomorhppasien || "",
        }
        const tempres = {
            step0,
            step1,
            step2,
            step3
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

const getPasienAkun = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const pasienAkun = await pool.query(userpasienQueries.qGetPasienAkun, [req.id])
        const tempres = {
            pasienAkun: pasienAkun.rows[0]
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

const getComboPenjamin = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const penjamin = (await pool.query(rekananQueries.getPenjamin)).rows
        const tempres = {
            penjamin: penjamin
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

const upsertPenjamin = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {penjamin} = await db.sequelize.transaction(async (transaction) => {
            const bodyReq = req.body
            const pasien = (await pool.query(userpasienQueries.qGetAllPasienFromUser, [req.id])).rows[0]
            if(!bodyReq.penjamin || !bodyReq.nokartu) 
                throw new Error('Penjamin dan No Kartu harus diisi')
            let penjamin = null
            let pasienUpdate = null
            if(bodyReq.penjamin === 1){
                pasienUpdate = await db.m_pasien.findOne({
                    where: {
                        id: pasien?.id
                    }
                })
                pasienUpdate = await pasienUpdate.update({
                    nobpjs: bodyReq.nokartu,
                }, {
                    transaction: transaction
                })
                pasienUpdate = pasienUpdate?.toJSON() || null
            }else if(!bodyReq.idpenjamin){
                penjamin = await db.m_penjaminpasien.create({
                    kdprofile: 0,
                    statusenabled: true,
                    nocmfk: pasien?.id,
                    objectrekananfk: bodyReq.penjamin,
                    nokartu: bodyReq.nokartu,
                }, {
                    transaction: transaction
                })
            } else{
                const penjaminModel = await db.m_penjaminpasien.findOne({
                    where: {
                        id: bodyReq.idpenjamin
                    }
                })
                await penjaminModel.update({
                    objectrekananfk: bodyReq.penjamin,
                    nokartu: bodyReq.nokartu,
                }, {
                    transaction: transaction
                })
                penjamin = penjaminModel?.toJSON() || null
            }
            return {penjamin}
        });
        
        const tempres = {
            penjamin
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

const getPenjaminPasien = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const penjamin = (await pool.query(userpasienQueries.qGetPenjaminPasien, [req.id])).rows
        const tempres = {
            penjamin: penjamin
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

const getAntreanPemeriksaan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {todayStart, todayEnd} = getDateStartEnd();
        const antreanPasien = (await pool.query(
            userpasienQueries.qGetAntreanPasien, 
            [
                req.id,
                todayStart,
                todayEnd
            ]
        )).rows[0]
        const antreanTerakhir = (await pool.query(
            userpasienQueries.qGetAntreanTerakhir, 
            [
                antreanPasien?.iddokter || -1,
                todayStart,
                todayEnd
            ]
        )).rows[0]
        const tempres = {
            antreanPasien: antreanPasien || null,
            antreanTerakhir: antreanTerakhir || null
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

const getRegistrasiNorec = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const registrasi = await pool.query(userpasienQueries.qGetRiwayatRegistrasi, 
            [
                req.id, 
                '', 
                '',
                req.query.norec
            ])
        const tempres = {
            registrasi: registrasi.rows[0]
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

const getVerifUser = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            tglcode,
            tglexpired,
            email,
            isAlreadyVerified
        } = await db.sequelize.transaction(async (transaction) => {
            const idPasien = req.id
            const userPasien = await db.users_pasien.findByPk(idPasien, {
                transaction: transaction
            })
            const pasien = await db.m_pasien.findByPk(userPasien.objectpasienfk, {
                transaction: transaction
            })

            if(!pasien){
                throw new Error("Pasien tidak ditemukan")
            }
            if(!pasien?.email){
                throw new Error("Pasien belum mendaftarkan email")
            }
            const dateToday = new Date()
            const dateExpired = new Date();
            dateExpired.setTime(dateExpired.getTime() + 5 * 60 * 1000)
            let randomNumber = Math.floor(Math.random() * 1000000);
            let randomString = randomNumber.toString().padStart(6, "0");
            const isAlreadyVerified = !!pasien.isverifemail
            if(!isAlreadyVerified){
                await userPasien.update({
                    tglcode: dateToday,
                    tglexpired: dateExpired,
                    verifcode: bcrypt.hashSync(randomString, 8),
                })
                await hSendEmail(pasien.email, randomString)
            }

            return {
                tglcode: dateToday,
                tglexpired: dateExpired,
                email: pasien.email,
                isAlreadyVerified: isAlreadyVerified
            }
        });
        
        const tempres = {
            tglcode,
            tglexpired,
            pesanKirim: `E-mail sudah dikirim ke ${email}, Jika tidak ada mohon cek spam`,
            isAlreadyVerified
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

const verifUserEmail = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            pasien
        } = await db.sequelize.transaction(async (transaction) => {
            const verifcode = req.body.verifcode
            const idPasien = req.id
            let userPasien = await db.users_pasien.findByPk(idPasien, {
                transaction: transaction
            })
            if(!userPasien) throw new Error("User pasien tidak ada")
            userPasien = userPasien.toJSON()
            if(!userPasien.verifcode) throw new Error("Anda belum mengirim email")
            let passwordIsValid = bcrypt.compareSync(
                verifcode,
                userPasien.verifcode
            );
            if(!passwordIsValid) throw new Error("Kode verifikasi salah");
            let isExpired = userPasien.tglexpired < new Date()
            if(isExpired) throw new Error("Kode sudah expired, kirim kembali")
            let pasien = await db.m_pasien.findByPk(userPasien.objectpasienfk, {
                transaction: transaction
            })
            if(!pasien) throw new Error("Pasien tidak ditemukan")
            await pasien.update({
                isverifemail: true
            }, {
                transaction: transaction
            })
            pasien = pasien.toJSON()
            return {
                pasien
            }

        });
        
        const tempres = {
            status: "User sudah terverifikasi",
            pasien: pasien
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

const sendResetPassword = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {tglexpired} 
        = await db.sequelize.transaction(async (transaction) => {
            const { correct } = hCheckCaptcha(
                req.body.uuidcaptcha, 
                req.body.answer
            )
            if(!correct) throw new Error("Captcha yang dimasukkan salah")
            const pasienModel = await db.m_pasien.findOne({
                where: {
                    email: req.body.email,
                },
                transaction: transaction
            })

            const userPasienModel = await db.users_pasien.findOne({
                where: {
                    objectpasienfk: pasienModel.id
                },
                transaction: transaction
            })
            if(!pasienModel || !userPasienModel){
                return {
                    tglexpired: tglexpired
                }
            }
            const norecReset = uuid.v4().substring(0, 32)
            const dateToday = new Date()
            const dateExpired = new Date();
            dateExpired.setTime(dateExpired.getTime() + 5 * 60 * 1000)
            await userPasienModel.update({
                resetemail: norecReset,
                tglexpiredreset: dateExpired,
                tglcodereset: dateToday
            }, {
                transaction: transaction
            })
            await hSendResetEmail(pasienModel.email, norecReset, pasienModel.nocm || pasienModel.nocmtemp)
            return {
                tglexpired: dateExpired
            }
        });
        
        const tempres = {
            tglexpired: tglexpired
        };
        res.status(200).send({
            msg: 'Sukses, Jika E-Mail anda benar maka akan masuk inbox/spam',
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

const getResetPassword = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resetemailid = req.query.resetemailid
        const resetEmail = (await pool.query(userpasienQueries.qGetResetEmail, [resetemailid])).rows[0]
        if(!resetEmail) throw new Error("Tidak ada kode reset")
        if(new Date(resetEmail.tglexpiredreset) < new Date()){
            throw new Error("Link reset email sudah kadaluwarsa")
        }
        const tempres = {
            tglexpiredreset: resetEmail.tglexpiredreset
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

const resetPassword = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const updated = 
        await db.sequelize.transaction(async (transaction) => {
            const resetemailid = req.body.resetemailid
            const userModel = await db.users_pasien.findOne({
                where: {
                    resetemail: resetemailid
                },
                transaction: transaction
            })
            if(!userModel) throw new Error("Tidak ada kode reset")

            if(new Date(userModel.tglexpiredreset) < new Date()){
                throw new Error("Link reset email sudah kadaluwarsa")
            }
            const newPassword = bcrypt.hashSync(req.body.password, 8)
            await userModel.update({
                password: newPassword,
                resetemail: null,
                tglexpiredreset: null,
                tglcodereset: null
            }, {
                transaction: transaction
            })

            return {
                updated: new Date()
            }
        })
        const tempres = {
            updated: updated
        };
        res.status(200).send({
            msg: 'Sukses ganti password',
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
    upsertPasien,
    getRiwayatReservasi,
    batalRegis,
    getPasienEdit,
    getPasienAkun,
    getComboPenjamin,
    upsertPenjamin,
    getPenjaminPasien,
    getAntreanPemeriksaan,
    getRegistrasiNorec,
    getVerifUser: getVerifUser,
    verifUserEmail: verifUserEmail,
    sendResetPassword,
    getResetPassword,
    resetPassword
}

const hCreatePasien = async (req, res, transaction) => {
    const bodyReq = req.body
    const nocmSementara = await hCreateCMSementara()
    let dataPasien = await m_pasien.create({
        kdprofile: 0,
        statusenabled: true,
        kodeexternal: null,
        namaexternal: bodyReq.step0.namalengkap,
        reportdisplay: bodyReq.step0.namalengkap,
        objectagamafk: bodyReq.step0.agama,
        objectgolongandarahfk: bodyReq.step0.golongandarah,
        objectjeniskelaminfk: bodyReq.step0.jeniskelamin,
        namapasien: bodyReq.step0.namalengkap,
        nikibu: null,
        objectpekerjaanfk: bodyReq.step0.pekerjaan,
        objectpendidikanfk: bodyReq.step0.pendidikanterakhir,
        objectstatusperkawinanfk: bodyReq.step0.statusperkawinan,
        tgldaftar: new Date(),
        tgllahir: new Date(bodyReq.step0.tanggallahir),
        objecttitlefk: null,
        namaibu: bodyReq.step3.namaibu,
        notelepon: bodyReq.step3.nohppasien,
        noidentitas: bodyReq.step0.noidentitas,
        tglmeninggal: null,
        objectkebangsaanfk: bodyReq.step0.kewarganegaraan,
        objectnegaraktpfk: bodyReq.step1.negara,
        namaayah: bodyReq.step3.namaayah,
        namasuamiistri: bodyReq.step0.namapasangan,
        nobpjs: bodyReq.step3.nobpjs || null,
        nohp: bodyReq.step3.nohppasien,
        tempatlahir: bodyReq.step0.tempatlahir,
        jamlahir: null,
        namakeluarga: null,
        alamatrmh: bodyReq.step1.alamat,
        nocmibu: null,
        objectkaryawanrsfk: 2,
        objectetnisfk: bodyReq.step0.suku,
        objectbahasafk: bodyReq.step0.bahasayangdikuasai,
        alamatdomisili: bodyReq.step2.alamat,
        rtktp: bodyReq.step1.rt,
        rwktp: bodyReq.step1.rw,
        objectdesakelurahanktpfk: bodyReq.step1.kelurahan,
        rtdomisili: bodyReq.step2.rt,
        rwdomisili: bodyReq.step2.rw,
        objectdesakelurahandomisilifk: bodyReq.step2.kelurahan,
        objectnegaradomisilifk: bodyReq.step2.negara,
        nocm: null,
        objectstatuskendalirmfk: null,
        nocmtemp: nocmSementara,
        email: bodyReq.step3.email,
    }, {
        transaction: transaction
    })
    dataPasien = dataPasien.toJSON();
    let userPasien = await pasienSignup(
        req, 
        res, 
        transaction, 
        { 
            norm: dataPasien.nocmtemp, 
            password: bodyReq.step3.password
        })
    await userPasien.update({
        clientsecret: bodyReq.clientSecret,
        objectpasienfk: dataPasien.id
    }, {
        transaction: transaction
    })
    userPasien = userPasien?.toJSON() || null;
    let token = jwt.sign({ 
            id: userPasien.id, 
            expired: new Date() + (86400 * 1000),
        }, 
        config.secret, 
        {
            expiresIn: 86400 * 1000
        });

    return [
        dataPasien,
        userPasien,
        token
    ]
}

const hUpdatePasien = async (req, res, transaction) => {
    const bodyReq = req.body
    let userPasien = await users_pasien.findOne({
        where: {
            id: req.id
        },
    })
    const pasienUpdate = await m_pasien.findOne({
        where: {
            [db.Sequelize.Op.or]: [
                {
                    nocm: userPasien.norm

                }, {
                    nocmtemp: userPasien.norm
                }]
        },
    })
    
    let dataPasien = await pasienUpdate.update({
        kdprofile: 0,
        statusenabled: true,
        kodeexternal: null,
        namaexternal: bodyReq.step0.namalengkap,
        reportdisplay: bodyReq.step0.namalengkap,
        objectagamafk: bodyReq.step0.agama,
        objectgolongandarahfk: bodyReq.step0.golongandarah,
        objectjeniskelaminfk: bodyReq.step0.jeniskelamin,
        namapasien: bodyReq.step0.namalengkap,
        nikibu: null,
        objectpekerjaanfk: bodyReq.step0.pekerjaan,
        objectpendidikanfk: bodyReq.step0.pendidikanterakhir,
        objectstatusperkawinanfk: bodyReq.step0.statusperkawinan,
        tgldaftar: new Date(),
        tgllahir: new Date(bodyReq.step0.tanggallahir),
        objecttitlefk: null,
        namaibu: bodyReq.step3.namaibu,
        notelepon: bodyReq.step3.nohppasien,
        noidentitas: bodyReq.step0.noidentitas,
        tglmeninggal: null,
        objectkebangsaanfk: bodyReq.step0.kewarganegaraan,
        objectnegaraktpfk: bodyReq.step1.negara,
        namaayah: bodyReq.step3.namaayah,
        namasuamiistri: bodyReq.step0.namapasangan,
        nobpjs: bodyReq.step3.nobpjs || null,
        nohp: bodyReq.step3.nohppasien,
        tempatlahir: bodyReq.step0.tempatlahir,
        jamlahir: null,
        namakeluarga: null,
        alamatrmh: bodyReq.step1.alamat,
        nocmibu: null,
        objectkaryawanrsfk: 2,
        objectetnisfk: bodyReq.step0.suku,
        objectbahasafk: bodyReq.step0.bahasayangdikuasai,
        alamatdomisili: bodyReq.step2.alamat,
        rtktp: bodyReq.step1.rt,
        rwktp: bodyReq.step1.rw,
        objectdesakelurahanktpfk: bodyReq.step1.kelurahan,
        rtdomisili: bodyReq.step2.rt,
        rwdomisili: bodyReq.step2.rw,
        objectdesakelurahandomisilifk: bodyReq.step2.kelurahan,
        objectnegaradomisilifk: bodyReq.step2.negara,
        // nocm: bodyReq.step0.nocm || null,
        objectstatuskendalirmfk: null,
        // nocmtemp: bodyReq.step0.nocmtemp || null,
    }, {
        transaction: transaction
    })
    dataPasien = dataPasien.toJSON();
    userPasien = userPasien.toJSON();
    return [
        dataPasien,
        userPasien,
    ]
}

const hCreateCMSementara = async () => {
    let zeroSement = ''
    for (let x = 0; x < 3; x++) {
        zeroSement = zeroSement + '0'
    }
    const {monthStart, monthEnd} = getDateStartEndMonth()
    const total = await m_pasien.count({
        where: {
            tgldaftar: {
                [Op.between]: [monthStart, monthEnd],
            },
            nocmtemp: {
                [Op.not]: null
            }
        }
    })
    let nocmSementara = (zeroSement + total).slice(-3)
    let bulan = (monthStart.getMonth() + 1).toString().slice(-2)
    let tahun = monthStart.getFullYear().toString().slice(-2)
    nocmSementara = "HT" + tahun + bulan + nocmSementara
    return nocmSementara
}

const hSendEmail = async (email, verifcode, norm) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'snberdikarinoreply@gmail.com',
            pass: 'heztcjllcnyiivol'
        }
    })
      
    let mailOptions = {
        from: 'snberdikarinoreply@gmail.com',
        to: email,
        subject: 'Kode Verifikasi SNBerdikari',
        text: `Berikut merupakan kode verifikasi anda ${verifcode}`
    };

    const info = await transporter.sendMail(mailOptions);
    return info
}

const hSendResetEmail = async (email, resetcode, norm) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'snberdikarinoreply@gmail.com',
            pass: 'heztcjllcnyiivol'
        }
    })
      
    let mailOptions = {
        from: 'snberdikarinoreply@gmail.com',
        to: email,
        subject: 'Reset Password anda',
        text: `Berikut merupakan reset password anda http://dev.snberdikari.co.id:3000/reset-password?k=${resetcode}`,
        html: `<p>Berikut merupakan link untuk reset password anda</p>
            <p>No RM anda adalah: ${norm}</p>
            <p><a href='http://dev.snberdikari.co.id:3003/reset-password?k=${resetcode}'>http://dev.snberdikari.co.id:3003/reset-password?k=${resetcode}</a></p>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    return info
}

