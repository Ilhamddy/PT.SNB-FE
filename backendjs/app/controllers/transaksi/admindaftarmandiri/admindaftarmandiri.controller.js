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
import userpasienQueries from "../../../queries/daftarmandiri/userpasien/userpasien.queries";
import { getDateStartEnd } from "../../../utils/dateutils";

const uploadBerita = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const bodyReq = JSON.parse(fs.readFileSync(req.files.json[0].path).toString())
        const data = await hSaveImage(req, res)
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
                        gambar: data.uri,
                        judul: bodyReq.judul,
                        isi: bodyReq.konten,
                        tglawal: new Date(bodyReq.tglawal),
                        tglakhir: new Date(bodyReq.tglakhir),
                    }, {
                        transaction: transaction
                    })
                    berita = beritaModel
                }else{
                    berita = await db.t_berita.create({
                        norec: uuid.v4().substring(0, 32),
                        statusenabled: true,
                        gambar: data.uri,
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
            berita: berita.toJSON()
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

const getAntreanPemeriksaanManual = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {todayStart, todayEnd} = getDateStartEnd();
        const antreanPasien = (await pool.query(
            userpasienQueries.qGetAntreanPasienManual, 
            [
                req.query.noregistrasi
            ]
        )).rows[0]
        const isDateCorrect = isDateToday(new Date(antreanPasien.tglregistrasi))
        if(!isDateCorrect){
            const tempres = {
                antreanPasien: null,
                antreanTerakhir: null,
                antreanFarmasi: null
            };
            res.status(200).send({
                msg: 'Success',
                code: 200,
                data: tempres,
                success: true
            });
            return
        }
        const antreanTerakhir = (await pool.query(
            userpasienQueries.qGetAntreanTerakhir, 
            [
                antreanPasien?.iddokter || -1,
                todayStart,
                todayEnd
            ]
        )).rows[0]
        const antreanFarmasi = (await pool.query(
            userpasienQueries.qGetAntreanPasienFarmasi, 
            [
                req.query.noregistrasi
            ]
        )).rows
        const tempres = {
            antreanPasien: antreanPasien || null,
            antreanTerakhir: antreanTerakhir || null,
            antreanFarmasi: antreanFarmasi || null
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
    getBeritaNorec,
    getAntreanPemeriksaanManual
}

const hSaveImage = async (req, res) => {
    const logger = res.locals.logger;
    const tempPath = req.files.file[0].path;
    const __dirname = path.resolve(path.dirname(''));
    const folderImage = "./app/media/upload/"
    const fileName = uuid.v4().substring(0, 32);
    const extension = path.extname(req.files.file[0].originalname).toLowerCase()
    const targetPath = path.join(__dirname, 
        folderImage 
        + fileName 
        + extension
    );

    await db.sequelize.transaction(async (transaction) => {
        
    });
    
    fs.renameSync(tempPath, targetPath);
    const delay = time => new Promise(resolve => setTimeout(resolve, time));
    await delay(2000)

    const data = {
        uri: fileName + extension
    };
    return data
    
}

function isDateToday(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight

    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0); // Set time to midnight
    return today.getTime() === inputDate.getTime();
}