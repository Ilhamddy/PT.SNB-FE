import db from "../../../models"
import { pasienSignup } from "../../auth/authhelper";
import jwt from "jsonwebtoken";
import config from "../../../config/auth.config";
import { encrypt } from "../../../utils/encrypt";
import { Op } from "sequelize";
import { getDateStartEnd, getDateStartEndMonth } from "../../../utils/dateutils";

const m_pasien = db.m_pasien
const running_number = db.running_number

const createPasien = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const bodyReq = req.body
        const getNocm = await running_number.findAll({
            where: {
                id: 1
            }
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
        const { dataPasien, userPasien, token } = 
        await db.sequelize.transaction(async (transaction) => {
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
                nobpjs: bodyReq.step0.noidentitas,
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
            dataPasien = dataPasien.toJSON()
            const userPasien = await pasienSignup(
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
            let token = jwt.sign({ 
                    id: userPasien.id, 
                    expired: new Date() + (86400 * 1000),
                }, 
                config.secret, 
                {
                    expiresIn: 86400 * 1000
                });

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

        const data = encrypt(tempres, bodyReq.clientSecret)

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

export default {
    createPasien
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