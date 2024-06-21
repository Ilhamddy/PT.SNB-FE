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
import { dateLocal } from "../../../utils/dateutils";
import { hCreateNoreg } from "../../transaksi/registrasi/registrasi.controller.js"
import path from 'path'
import axios from 'axios'
import { hSaveImage } from "../../../utils/backendUtils.js";

const upsertAbsenFotoLokasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const pathAbs = path.resolve(req.files.files[0].path)
        const compared = await axios.post('http://127.0.0.1:13000/face-recognition/compare-face', {
            uriReferences: [pathAbs],
            uriImage: pathAbs
        })

        await db.sequelize.transaction(async (transaction) => {
            
        });
        
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

export default {
    upsertAbsenFotoLokasi
}