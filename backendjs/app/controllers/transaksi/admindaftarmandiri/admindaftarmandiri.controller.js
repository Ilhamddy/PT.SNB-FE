import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import { qGetAntreanFromDP, qGetObatFromUnit, qGetOrderResepFromDP, qGetOrderVerifResepFromDP } from "../../../queries/emr/emr.queries";
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { hProcessOrderResep } from "../emr/emr.controller";
import { qGetAllVerif, qGetObatFromProduct, qGetPasienFromId } from "../../../queries/farmasi/farmasi.queries";
import { generateKodeBatch, hCreateKartuStok } from "../gudang/gudang.controller";
import fs from 'fs';
import path from "path";

const uploadBerita = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const bodyReq = req.body
        const {berita} = await db.sequelize.transaction(
            async (transaction) => {
                const berita = await db.t_berita.create({
                    norec: uuid.v4().substring(0, 32),
                    statusenabled: true,
                    gambar: bodyReq.imageuri,
                    judul: bodyReq.judul,
                    isi: bodyReq.konten,
                    tglposting: new Date(),
                    tglawal: new Date(bodyReq.tglawal),
                    tglakhir: new Date(bodyReq.tglakhir),
                    objectpegawaifk: req.idPegawai,
                })
                return {berita}
            }
        );
        
        const tempres = {
            berita: berita
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
    uploadBerita
}