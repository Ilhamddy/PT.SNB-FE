import db from "../../../models"
import { pasienSignup } from "../../auth/authhelper";
import jwt from "jsonwebtoken";
import config from "../../../config/auth.config";
import { encrypt } from "../../../utils/encrypt";


const m_pasien = db.m_pasien
const running_number = db.running_number

const createPasien = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const bodyDummy = req.body
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
                namaexternal: bodyDummy.step0.namalengkap,
                reportdisplay: bodyDummy.step0.namalengkap,
                objectagamafk: bodyDummy.step0.agama,
                objectgolongandarahfk: bodyDummy.step0.golongandarah,
                objectjeniskelaminfk: bodyDummy.step0.jeniskelamin,
                namapasien: bodyDummy.step0.namalengkap,
                nikibu: null,
                objectpekerjaanfk: bodyDummy.step0.pekerjaan,
                objectpendidikanfk: bodyDummy.step0.pendidikanterakhir,
                objectstatusperkawinanfk: bodyDummy.step0.statusperkawinan,
                tgldaftar: new Date(),
                tgllahir: new Date(bodyDummy.step0.tanggallahir),
                objecttitlefk: null,
                namaibu: bodyDummy.step3.namaibu,
                notelepon: bodyDummy.step3.nohppasien,
                noidentitas: bodyDummy.step0.noidentitas,
                tglmeninggal: null,
                objectkebangsaanfk: bodyDummy.step0.kewarganegaraan,
                objectnegaraktpfk: bodyDummy.step1.negara,
                namaayah: bodyDummy.step3.namaayah,
                namasuamiistri: bodyDummy.step0.namapasangan,
                nobpjs: bodyDummy.step0.noidentitas,
                nohp: bodyDummy.step3.nohppasien,
                tempatlahir: bodyDummy.step0.tempatlahir,
                jamlahir: null,
                namakeluarga: null,
                alamatrmh: bodyDummy.step1.alamat,
                nocmibu: null,
                objectkaryawanrsfk: null,
                objectetnisfk: bodyDummy.step0.suku,
                objectbahasafk: bodyDummy.step0.bahasayangdikuasai,
                alamatdomisili: bodyDummy.step2.alamat,
                rtktp: bodyDummy.step1.rt,
                rwktp: bodyDummy.step1.rw,
                objectdesakelurahanktpfk: bodyDummy.step1.kelurahan,
                rtdomisili: bodyDummy.step2.rt,
                rwdomisili: bodyDummy.step2.rw,
                objectdesakelurahandomisilifk: bodyDummy.step2.kelurahan,
                objectnegaradomisilifk: bodyDummy.step2.negara,
                nocm: nocmStr,
                objectstatuskendalirmfk: null,
            }, {
                transaction: transaction
            })
            dataPasien = dataPasien.toJSON()
            const userPasien = await pasienSignup(
                req, 
                res, 
                transaction, 
                { 
                    norm: dataPasien.nocm, 
                    noidentitas: dataPasien.noidentitas
                })
            await userPasien.update({
                clientsecret: bodyDummy.clientSecret
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
        }
        
        const tempres = {
            datapasien: dataPasien,
            user: user
        };

        const data = encrypt(tempres, bodyDummy.clientSecret)

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