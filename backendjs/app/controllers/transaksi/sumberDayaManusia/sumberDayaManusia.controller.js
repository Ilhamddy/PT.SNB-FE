import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import queries from '../../../queries/sumberDayaManusia/sumberDayaManusia.queries';
import unitQueries from '../../../queries/mastertable/unit/unit.queries'
import pegawaiQueries from '../../../queries/mastertable/pegawai/pegawai.queries'
import kamarQueries from "../../../queries/mastertable/kamar/kamar.queries";
import hariQueries from "../../../queries/mastertable/hari/hari.queries";
import { createDateAr, getDateStartEndNull, getTimeOnly } from "../../../utils/dateutils";
import bcrypt from "bcryptjs";
import sumberDayaManusiaQueries from "../../../queries/sumberDayaManusia/sumberDayaManusia.queries";
import cutiQueries from "../../../queries/mastertable/cuti/cuti.queries";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import { hDeleteImage, hSaveImage } from "../../../utils/backendUtils";

const folderFotoPegawai = "fotoPegawai"


const getDaftarPegawai = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let unit = ' '
        if (req.query.unit !== '') {
            unit = ` mp.objectunitfk=${req.query.unit} and `
        }
        let query = queries.qDaftarPegawai + ` where ${unit} (mp.namalengkap ilike '%${req.query.search}%' or 
        mp.nip ilike '%${req.query.search}%') `
        const resultlist = await pool.query(query);
        const tempres = {

        };
        console.log(query)
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: resultlist.rows,
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

const getComboSDM = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const result1 = await pool.query(queries.qUnit, []);
        const result2 = await pool.query(queries.qJenisKelamin, []);
        const result3 = await pool.query(queries.qGolonganDarah, []);
        const result4 = await pool.query(queries.qEtnis, []);
        const result5 = await pool.query(queries.qPendidikan, []);
        const result6 = await pool.query(queries.qPerkawinan, []);
        const result7 = await pool.query(queries.qAgama, []);
        const result8 = await pool.query(queries.qGolonganPegawai, []);
        const result9 = await pool.query(queries.qStatusPegawai, []);
        const result10 = await pool.query(queries.qProfesiPegawai, []);
        const result11 = await pool.query(queries.qJabatan, []);
        const result12 = await pool.query(queries.qGolonganPtkp, []);
        const result13 = await pool.query(queries.qUnitKerja, []);
        const result14 = await pool.query(queries.qRole, []);
        const tempres = {
            unit: result1.rows,
            jenisKelamin: result2.rows,
            golonganDarah: result3.rows,
            etnis: result4.rows,
            pendidikan: result5.rows,
            perkawinan: result6.rows,
            agama: result7.rows,
            golonganPegawai: result8.rows,
            statusPegawai: result9.rows,
            profesi: result10.rows,
            jabatan: result11.rows,
            golonganPtkp: result12.rows,
            unitKerja: result13.rows,
            roles: result14.rows
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

const saveBiodataPegawai = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { pegawai } = await db.sequelize.transaction(async (transaction) => {
            const body = req.body
            let pegawai = null
            const findPegawaiModel = async () => {
                const pegawaiModel = await db.m_pegawai.findByPk(body.idPegawai, {
                    transaction: transaction
                })
                if(!pegawaiModel) throw NotFoundError(`Tidak ditemukan pegawai: ${body.idPegawai}`)
                return pegawaiModel
            }
            
            if (body.task === 1) {
                if (body.idPegawai === '') {
                    pegawai = await db.m_pegawai.create({
                        statusenabled: true,
                        nama: body.namalengkap,
                        namaexternal: body.gelardepan + body.namalengkap + body.gelarbelakang,
                        reportdisplay: body.inisialNama,
                        namahafis: body.inisialNama,
                        namalengkap: body.gelardepan + body.namalengkap + body.gelarbelakang,
                        gelardepan: body.gelardepan,
                        gelarbelakang: body.gelarbelakang,
                        noidentitas: body.nik,
                        objectjeniskelaminfk: body.jenisKelamin,
                        tempatlahir: body.tempatLahir,
                        tgllahir: body.tglLahir,
                        objectagamafk: body.agama,
                        objectgolongandarahfk: body.golonganDarah,
                        objectetnisfk: body.suku,
                        notlp: body.noTelp,
                        nohandphone: body.noHp,
                        email: body.email,
                        objectpendidikanterakhirfk: body.pendidikanTerakhir,
                        objectstatusperkawinanpegawaifk: body.statusPernikahan,
                        namaibu: body.namaIbuKandung,
                        nip: body.nip,
                    }, { 
                        transaction: transaction
                    });
                } else {
                    pegawai = await findPegawaiModel()
                    await pegawai.update({
                        statusenabled: true,
                        nama: body.namalengkap,
                        namaexternal: body.gelardepan + body.namalengkap + body.gelarbelakang,
                        reportdisplay: body.inisialNama,
                        namahafis: body.inisialNama,
                        namalengkap: body.gelardepan + body.namalengkap + body.gelarbelakang,
                        gelardepan: body.gelardepan,
                        gelarbelakang: body.gelarbelakang,
                        noidentitas: body.nik,
                        objectjeniskelaminfk: body.jenisKelamin,
                        tempatlahir: body.tempatLahir,
                        tgllahir: body.tglLahir,
                        objectagamafk: body.agama,
                        objectgolongandarahfk: body.golonganDarah,
                        objectetnisfk: body.suku,
                        notlp: body.noTelp,
                        nohandphone: body.noHp,
                        email: body.email,
                        objectpendidikanterakhirfk: body.pendidikanTerakhir,
                        objectstatusperkawinanpegawaifk: body.statusPernikahan,
                        namaibu: body.namaIbuKandung,
                        nip: body.nip,
                    }, {
                        transaction: transaction
                    });
                }
            } else if (body.task === 2) {
                pegawai = await findPegawaiModel()
                await pegawai.update({
                    alamatktp: body.alamat,
                    rtktp: body.rt,
                    rwktp: body.rw,
                    objectdesakelurahanktpfk: body.desa,
                    kodeposktp: body.kodepos,
                    alamatdom: body.alamatDomisili,
                    rtdom: body.rtDomisili,
                    rwdom: body.rwDomisili,
                    objectdesakelurahandomfk: body.desaDomisili,
                    kodeposdom: body.kodeposDomisili,
                }, {
                    transaction: transaction
                });
            } else if (body.task === 3) {
                pegawai = await findPegawaiModel()
                await pegawai.update({
                    nosk: body.noSK, nosip: body.noSIP,
                    nostr: body.noSTR, npwp: body.npwp,
                    objectgolonganfk: body.golongan || null, objectstatuspegawaifk: body.statusPegawai || null,
                    objectprofesipegawaifk: body.profesi || null, objectjabatanfk: body.jabatan || null,
                    tglmasuk: body.tglSKStart || null, tglpensiun: body.tglSKend || null,
                    tglterbitsip: body.tglSIPStart || null, tglberakhirsip: body.tglSIPend || null, tglterbitstr: body.tglSTRStart || null,
                    tglberakhirstr: body.tglSTRend || null, objectgolonganptkpfk: body.golonganPTKP || null, qtyanak: body.jumlahAnak || null,
                    qtytanggungan: body.jumlahTanggungan || null,
                    objectunitfk: body.unitPelayanan, objectunitkerjafk: body.unitKerja || null,
                }, {
                    transaction: transaction
                });
            }
            const { fotoPegawai } = await hSaveFotoPegawai(body.idPegawai, req.idPegawai, req.files.file, transaction)
            return { pegawai: pegawai?.toJSON() || null, fotoPegawai: fotoPegawai }
        });
        const tempres = {
            pegawai: pegawai
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

const getPegawaiById = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const result1 = await pool.query(queries.qPegawaiById, [req.query.idPegawai]);
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

const getUserRoleById = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const result1 = await pool.query(queries.qUserRoleById, [req.query.idPegawai]);
        for (let i = 0; i < result1.rows.length; ++i) {
            const resultlistPetugas =await pool.query(queries.qAccesUnit,[result1.rows[i].id])

            result1.rows[i].listunit = resultlistPetugas.rows
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

const getComboJadwal = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const dokter = (await pool.query(pegawaiQueries.getDokterNip)).rows
        const poliklinik = (await pool.query(unitQueries.getPoliklinik)).rows
        const kamar = (await pool.query(kamarQueries.getAllRj)).rows
        const hari = (await pool.query(hariQueries.getAll)).rows

        const tempres = {
            dokter: dokter,
            poliklinik: poliklinik,
            kamar: kamar,
            hari: hari
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

const getJadwalDokter = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let jadwal = (await pool.query(queries.qJadwalDokter, [])).rows
        jadwal = jadwal.map(item => {
            const dateNow = new Date().toLocaleDateString("id-ID",
                {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })
            const parts = dateNow.split("/")
            const partsTimeMulai = item.jam_mulai.split(":")
            const partsTimeSelesai = item.jam_selesai.split(":")
            const dateMulai = new Date(
                parts[2],
                parts[1] - 1,
                parts[0],
                partsTimeMulai[0],
                partsTimeMulai[1],
                partsTimeMulai[2]
            )
            const dateSelesai = new Date(
                parts[2],
                parts[1] - 1,
                parts[0],
                partsTimeSelesai[0],
                partsTimeSelesai[1],
                partsTimeSelesai[2]
            )
            return {
                ...item,
                jam_mulai: dateMulai.toISOString(),
                jam_selesai: dateSelesai.toISOString(),
            }
        })
        const tempres = {
            jadwal: jadwal
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

const upsertJadwal = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const reqBody = req.body
        const { jadwal } =
            await db.sequelize.transaction(async (transaction) => {
                let jadwal = null
                if (reqBody.idjadwal) {
                    const jadwalModel = await db.m_jadwaldokter.findOne({
                        where: {
                            id: reqBody.idjadwal,
                        },
                        transaction: transaction
                    })
                    await jadwalModel?.update({
                        objectpegawaifk: reqBody.dokter,
                        objectharifk: reqBody.hari,
                        jam_mulai: getTimeOnly(reqBody.jamkerjastart),
                        jam_selesai: getTimeOnly(reqBody.jamkerjaend),
                        objectunitfk: reqBody.unit,
                        objectkamarfk: reqBody.ruangrawat,
                    }, {
                        transaction: transaction
                    })
                    jadwal = jadwalModel.toJSON()
                } else {
                    const jadwalModel = await db.m_jadwaldokter.create({
                        kdprofile: 0,
                        statusenabled: true,
                        kodeexternal: null,
                        objectpegawaifk: reqBody.dokter,
                        objectharifk: reqBody.hari,
                        jam_mulai: getTimeOnly(reqBody.jamkerjastart),
                        jam_selesai: getTimeOnly(reqBody.jamkerjaend),
                        objectunitfk: reqBody.unit,
                        objectstatushadirfk: null,
                        objectkamarfk: reqBody.ruangrawat,
                    }, {
                        transaction
                    });
                    jadwal = jadwalModel.toJSON()
                }
                return {
                    jadwal
                }
            });

        const tempres = {
            jadwal: jadwal
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

const updateUserRole = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { pegawai,mapUserToUnit,insertmapUserToUnit } = await db.sequelize.transaction(async (transaction) => {
            let status = true
            let mapUserToUnit = ''
            let insertmapUserToUnit=''
            if (req.body.statusEnabled === 2) {
                status = false
            }
            const pegawai = await db.user.update({
                objectaccesmodulfk: req.body.roles, statusenabled: status,
            }, {
                where: {
                    id: req.body.idUser,
                },
                transaction: transaction
            });
            mapUserToUnit = await db.m_mapusertounit.update({
                statusenabled:false
                },  {
              where: {
                objectuserfk: req.body.idUser,
              },
              transaction: transaction
              });
            for (let i = 0; i < req.body.accesUnit.length; i++) {
                const element = req.body.accesUnit[i];
                insertmapUserToUnit = await db.m_mapusertounit.create({
                    objectuserfk: req.body.idUser,
                    objectunitfk: element.value,
                    tglinput: new Date(),
                    tglupdate: new Date(),
                    objectpegawaifk:req.body.idpegawai
                    }, { transaction });
            }
            return { pegawai,mapUserToUnit,insertmapUserToUnit }
        });
        const tempres = {

        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: pegawai,
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

const updateResetPassword = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { pegawai } = await db.sequelize.transaction(async (transaction) => {
           
            const pegawai = await db.user.update({
                password: bcrypt.hashSync(req.body.password, 8),
            }, {
                where: {
                    id: req.body.idUser,
                },
                transaction: transaction
            });
            return { pegawai }
        });
        const tempres = {

        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: pegawai,
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

const getLiburPegawai = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            namadokter,
            tanggal
        } = req.query
        const {todayStart, todayEnd} = getDateStartEndNull(tanggal)
        let liburPegawai = (await pool.query(
            sumberDayaManusiaQueries.qGetLiburPegawai, 
            [
                todayStart || "", 
                todayEnd || "",
                namadokter || ""
            ]
        )).rows
        liburPegawai = liburPegawai.map((libur) => {
            let newLibur = {...libur}
            if(!newLibur.namapegawai){
                newLibur.namapegawai = "(Seluruh Pegawai)"
                if(!newLibur.idunitlibur){
                    newLibur.namaunitlibur = "(Seluruh Unit)"
                }
            }
            return newLibur
        })
        const tempres = {
            liburPegawai: liburPegawai
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

const getComboCuti = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const pegawai = (await pool.query(pegawaiQueries.getAllNipUnit)).rows
        const unit = (await pool.query(unitQueries.getAll)).rows
        const cuti = (await pool.query(cutiQueries.getAll)).rows
        const tempres = {
            pegawai: pegawai, 
            cuti: cuti,
            unit: unit
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

const upsertCuti = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const reqBody = req.body
        const {
            liburs
        } = await db.sequelize.transaction(async (transaction) => {
            const dateAr = createDateAr(reqBody.tgllibur, reqBody.tglliburend)
            const liburs = await Promise.all(
                dateAr.map(async (date) => {
                    const norec = uuid.v4().substring(0, 32)
                    const libur = await db.t_liburpegawai.create({
                        norec: norec,
                        statusenabled: true,
                        objectpegawaifk: reqBody.namapegawai || null,
                        tgllibur: date,
                        objectunitfk: reqBody.unit || null,
                        objectcutifk: reqBody.jeniscuti,
                        alasan: reqBody.alasannamalibur,
                        objectpegawaiinputfk: req.idPegawai
                    }, {
                        transaction: transaction
                    })
                    return libur.toJSON()
                })
            )
            return {
                liburs
            }
        });
        
        const tempres = {
            liburs
        };
        res.status(200).send({
            msg: 'Sukses update',
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

const batalCuti = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const reqBody = req.body
        const {
            libur
        } = await db.sequelize.transaction(async (transaction) => {
            const liburModel = await db.t_liburpegawai.findByPk(
                reqBody.norecbatal, 
            {
                transaction: transaction
            })
            if(!liburModel) throw new Error("norec tidak ditemukan")
            await liburModel.update({
                statusenabled: false
            }, {
                transaction: transaction
            })
            const libur = liburModel.toJSON()
            return {
                libur
            }
        });
        
        const tempres = {
            libur: libur
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

const getPegawaiInput = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let pegawai = (await pool.query(queries.qGetPegawai, [req.userId])).rows[0]
        if(!pegawai) throw new NotFoundError(`User id ${req.userId} tidak ada`)
        const tempres = {
            pegawai: pegawai
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}

const updatePassword = async (req, res) => {
    const logger = res.locals.logger;
    try{
        await db.sequelize.transaction(async (transaction) => {
            const user = await db.user.findByPk(req.userId, {
                transaction: transaction
            })
            if(!user) throw new Error("User tidak ditemukan")
            let passwordIsValid = bcrypt.compareSync(
                req.body.passwordlama,
                user.password
            );
            if(!passwordIsValid){
                throw new BadRequestError("Password salah")
            }
            const newPassword = bcrypt.hashSync(req.body.passwordbaru, 8)
            await user.update({
                password: newPassword
            }, {
                transaction: transaction
            })
        });
        
        const tempres = {

        };
        res.status(200).send({
            msg: 'Sukses reset password',
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
    getDaftarPegawai,
    getComboSDM,
    saveBiodataPegawai,
    getPegawaiById,
    getUserRoleById,
    getComboJadwal,
    getJadwalDokter,
    upsertJadwal,
    updateUserRole,
    updateResetPassword,
    getLiburPegawai,
    getComboCuti,
    upsertCuti,
    batalCuti,
    getPegawaiInput,
    updatePassword
}


const hSaveFotoPegawai = async (idPegawai, idEdit, files, transaction) => {
    const fotoBefore = await db.t_fotopegawai.findAll({
        where: {
            objectpegawaifk: idPegawai
        }
    }, {
        transaction: transaction
    })
    await Promise.all(
        fotoBefore.map(async (foto) => {
            const fotoDataDeleted = foto.toJSON()
            await hDeleteImage(fotoDataDeleted.urifoto, folderFotoPegawai)
            await foto.destroy()
            return fotoDataDeleted
        })
    )
    const fotoPegawaiData = await Promise.all(
        files.map(async (file) => {
            const image = await hSaveImage(file.path, file.mimetype, folderFotoPegawai)
            const fotoPegawai = await db.t_fotopegawai.create({
                norec: image.norec,
                statusenabled: true,
                kdprofile: 5,
                objectpegawaifk: idPegawai,
                urifoto: image.uri,
                tglinput: new Date(),
                tglupdate: new Date(),
                objectpegawaiinputfk: idEdit,
                objectpegawaiupdatefk: idEdit
            }, {
                transaction: transaction
            })
            return fotoPegawai.toJSON()
        })
    )
    return {
        fotoPegawaiData
    }
}