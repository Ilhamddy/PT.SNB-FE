import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import admindaftarmandiriQueries from "../../../queries/admindaftarmandiri/admindaftarmandiri.queries";
import { generateKodeBatch, hCreateKartuStok } from "../gudang/gudang.controller";
import fs from 'fs';
import path from "path";

const uploadBerita = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const bodyReq = req.body
        const {berita} = await db.sequelize.transaction(
            async (transaction) => {
                let berita = null
                if(bodyReq.norec){
                    const beritaModel = await db.t_berita.findOne({
                        where: {
                            norec: bodyReq.norec
                        },
                        transaction: transaction
                    })
                    await beritaModel.update({
                        gambar: bodyReq.imageuri,
                        judul: bodyReq.judul,
                        isi: bodyReq.konten,
                        tglawal: new Date(bodyReq.tglawal),
                        tglakhir: new Date(bodyReq.tglakhir),
                    }, {
                        transaction: transaction
                    })
                    berita = beritaModel.toJSON()
                }else{
                    berita = await db.t_berita.create({
                        norec: uuid.v4().substring(0, 32),
                        statusenabled: true,
                        gambar: bodyReq.imageuri,
                        judul: bodyReq.judul,
                        isi: bodyReq.konten,
                        tglposting: new Date(),
                        tglawal: new Date(bodyReq.tglawal),
                        tglakhir: new Date(bodyReq.tglakhir),
                        objectpegawaifk: req.idPegawai,
                    }, {
                        transaction: transaction
                    })
                }

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

const getBerita = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const berita = (await pool.query(admindaftarmandiriQueries.qGetBeritaAll)).rows
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

const getBeritaNorec = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {norecberita} = req.query
        const berita = (await pool.query(
            admindaftarmandiriQueries.qGetBeritaNorec, 
            [
                norecberita
            ]
        )).rows
        const tempres = {
            berita: berita[0]
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
    uploadBerita,
    getBerita,
    getBeritaNorec
}