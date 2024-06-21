import db from "../../../models";
import * as uuid from 'uuid';
import pool from "../../../config/dbcon.query";
import { qGetDokter, qGetPenjamin, qGetPoliklinik } from "../../../queries/daftarmandiri/daftarpasienlama/daftarpasienlama.queries";
import { groupBy } from "../../../utils/arutils";
import unitQueries from "../../../queries/mastertable/unit/unit.queries";
import pegawaiQueries from "../../../queries/mastertable/pegawai/pegawai.queries";
import rekananQueries from "../../../queries/mastertable/rekanan/rekanan.queries";
import { qGetDaftarPasienLama } from "../../../queries/daftarmandiri/daftarpasienlama/daftarpasienlama.queries";
import queriesRegistrasi from '../../../queries/transaksi/registrasi.queries';
import * as nodemailer from "nodemailer"
import { dateLocal, getDateStartEnd } from "../../../utils/dateutils";
import { hCreateNoreg } from "../../transaksi/registrasi/registrasi.controller.js"
import path from 'path'
import { apiFR } from "../../../config/api.config.js";
import absenQueries from "../../../queries/absen/absen.queries.js";
import { Op, QueryTypes } from "sequelize";
import { folderImageUpload, hSaveImage } from "../../../utils/backendUtils.js";
import { BadRequestError } from "../../../utils/errors.js";

const upsertAbsenFotoLokasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            absensiCreated
        } = await db.sequelize.transaction(async (transaction) => {
            const file = req.files.files[0]
            const pathAbs = path.resolve(file.path)
            const fotoPegawai = await db.sequelize.query(absenQueries.qGetFotoPengguna, {
                replacements: {
                    iduser: req.idPegawai
                },
                type: QueryTypes.SELECT
            })
            fotoPegawai.filter(f => !!f.uriFoto)
            const allUriFoto = fotoPegawai.map((f) => path.resolve(folderImageUpload, f.urifoto))
            const compared = await apiFR.post('/face-recognition/compare-face', {
                uriReferences: allUriFoto,
                uriImage: pathAbs
            })
            if(!compared) throw BadRequestError("Wajah tidak sesuai")
            const {norec, uri} = await hSaveImage(file.path, file.mimetype, "absensi")
            const { dateStart, dateEnd } = getDateStartEnd()

            const modelRiwayatMasuk = await db.t_riwayatabsensi.findOne({
                where: {
                    jenisabsensi: 'MASUK',
                    tglabsensi: {
                        [Op.lte]: dateEnd,
                        [Op.gt]: dateStart,
                    }
                }
            })
            const modelRiwayatKeluar = await db.t_riwayatabsensi.findOne({
                where: {
                    jenisabsensi: 'MASUK',
                    tglabsensi: {
                        [Op.lte]: dateEnd,
                        [Op.gt]: dateStart,
                    }
                }
            })
            let created 
            if(!modelRiwayatMasuk){
                created = await db.t_riwayatabsensi.create({
                    norec: norec,
                    statusenabled: true,
                    tglabsensi: new Date(),
                    jammasuk: new Date(),
                    jamkeluar: null,
                    objectpegawaifk: req.idPegawai,
                    jenisabsensi: 'MASUK',
                    statusabsensi: 'TERLAMBAT',
                    urifoto: uri
                }, {
                    transaction: transaction
                })
            }else{
                if(modelRiwayatKeluar) throw BadRequestError("Sudah absen pulang")
                created = modelRiwayatMasuk.update({
                    norec: norec,
                    statusenabled: true,
                    tglabsensi: new Date(),
                    jammasuk: null,
                    jamkeluar: new Date(),
                    objectpegawaifk: req.idPegawai,
                    jenisabsensi: 'KELUAR',
                    statusabsensi: 'TERLAMBAT',
                    urifoto: uri
                }, {
                    transaction: transaction
                })
            }
            return {
                absensiCreated: created.toJSON()
            }
        });
        
        const tempres = {
            absensiCreated
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        if(error.name === 'AxiosError' && error.response.data?.detail?.name){
            res.status(error.status || 500).send({
                msg: error.response.data?.detail?.message || 'Gagal',
                code: error.response.data?.detail?.name,
                data: error,
                success: false
            });
        }else{
            res.status(error.httpcode || 500).send({
                msg: error.message || 'Gagal',
                code: 500,
                data: error,
                success: false
            });
        }

    }
}

export default {
    upsertAbsenFotoLokasi
}