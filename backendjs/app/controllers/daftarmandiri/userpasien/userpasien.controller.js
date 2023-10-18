import db from "../../../models"
import { pasienSignup } from "../../auth/authhelper";
import jwt from "jsonwebtoken";
import config from "../../../config/auth.config";
import { encrypt } from "../../../utils/encrypt";
import { Op } from "sequelize";
import pool from "../../../config/dbcon.query";
import { getDateStartEnd, getDateStartEndMonth } from "../../../utils/dateutils";
import userpasienQueries from "../../../queries/daftarmandiri/userpasien/userpasien.queries";
import bcrypt from "bcryptjs"
import rekananQueries from "../../../queries/master/rekanan/rekanan.queries";
import * as uuid from "uuid";


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
        const {monthStart, monthEnd} = getDateStartEndMonth();
        const {todayStart, todayEnd} = getDateStartEnd();
        const riwayat = await pool.query(userpasienQueries.qGetRiwayatRegistrasi, 
            [
                req.id, 
                '1970-01-1 00:00:00', 
                todayStart
            ])
        const riwayatToday = await pool.query(userpasienQueries.qGetRiwayatRegistrasi, 
            [
                req.id, 
                todayStart, 
                todayEnd
            ])
        const riwayatMendatang = await pool.query(userpasienQueries.qGetRiwayatRegistrasi,
            [
                req.id, 
                todayEnd, 
                '9999-12-31 23:59:59'
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

export default {
    upsertPasien,
    getRiwayatReservasi,
    batalRegis,
    getPasienEdit,
    getPasienAkun,
    getComboPenjamin,
    upsertPenjamin,
    getPenjaminPasien
}

const hCreatePasien = async (req, res, transaction) => {
    const bodyReq = req.body
    const getNocm = await running_number.findAll({
        where: {
            id: 1
        },
        transaction: transaction
    })
    const getNocmData = getNocm[0].toJSON();
    const nocm = getNocmData.new_number + 1
    let nocmStr = getNocmData.new_number + 1
    let totalExtension = Number(getNocmData.extention)
    let zero = ''
    for (let x = 0; x < totalExtension; x++) {
        zero = zero + '0'
    }
    nocmStr = (zero + nocmStr).slice(-totalExtension)
    const nocmSementara = await hCreateCMSementara()
    await getNocm[0].update({
        new_number: nocm
    }, {
        transaction: transaction
    })
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
        objectkaryawanrsfk: null,
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
            noidentitas: dataPasien.noidentitas
        })
    await userPasien.update({
        clientsecret: bodyReq.clientSecret
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
        objectkaryawanrsfk: null,
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
    const newPassword = bcrypt.hashSync(dataPasien.noidentitas, 8)
    userPasien = await userPasien.update({
        password: newPassword
    })
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
                [Op.between]: [monthStart, monthEnd]
            }
        }
    })
    let nocmSementara = (zeroSement + total).slice(-3)
    let bulan = (monthStart.getMonth() + 1).toString().slice(-2)
    let tahun = monthStart.getFullYear().toString().slice(-2)
    nocmSementara = "HT" + tahun + bulan + nocmSementara
    return nocmSementara
}