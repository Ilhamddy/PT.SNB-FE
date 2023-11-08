import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { hProcessOrderResep } from "../emr/emr.controller";
import { qGetAllVerif, qGetObatFromProduct, qGetPasienFromId } from "../../../queries/farmasi/farmasi.queries";
import { generateKodeBatch, hCreateKartuStok } from "../gudang/gudang.controller";
import fs from 'fs';
import path from "path";
import readline from 'readline';
import Stream from 'stream';
import backwardStream from 'fs-backwards-stream'


const postImage = async (req, res) => {
    const logger = res.locals.logger;
    const tempPath = req.file.path;
    try{
        const __dirname = path.resolve(path.dirname(''));
        const folderImage = "./app/media/upload/"
        const fileName = uuid.v4().substring(0, 32);
        const extension = path.extname(req.file.originalname).toLowerCase()
        const targetPath = path.join(__dirname, 
            folderImage 
            + fileName 
            + extension
        );
    
        await db.sequelize.transaction(async (transaction) => {
            
        });
        
        fs.renameSync(tempPath, targetPath);
 
        const tempres = {
            uri: fileName + extension
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        fs.unlinkSync(tempPath);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLogFile = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const __dirname = path.resolve(path.dirname(''));
        const folderLog = "./logs/"
        const fileName = createFormattedDate()
        const targetLog = path.join(__dirname, 
            folderLog 
            + fileName 
            + ".log"
        )
        const getLog = (fileName, length) => {
            return new Promise((res, rej) => {
                const lineLog = backwardStream(fileName)
                lineLog.on('error', rej)
                let string = ''
                let total = 0
                lineLog.on('data', (buf) => {
                    if(total > length){
                        res(string)
                    }
                    total++
                    string = buf.toString().replace(/(?:\r\n|\r|\n)/g, '\n') + string
                })
                lineLog.on('end', () => {
                    res(string)
                })
            })
        }
        
        let lineLog = await getLog(targetLog, 40);
        lineLog = lineLog.split('\n')
        lineLog = lineLog.reverse()
        lineLog = lineLog.join('\n')
        const tempres = {
            lineLog
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

const createFormattedDate = () => {
    let current_datetime = new Date();
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() 
    return formatted_date
}

export default {
    postImage,
    getLogFile
}