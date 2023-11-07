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
        const folderLog = "./logs"
        const fileName = createFormattedDateTime()
        const targetLog = path.join(__dirname, 
            folderLog 
            + fileName 
            + ".log"
        )
        const getLog = (fileName, minLength) => {
            let inStream = fs.createReadStream(fileName);
            let outStream = new Stream;
            return new Promise((resolve, reject)=> {
                let rl = readline.createInterface(inStream, outStream);
        
                let lastLine = '';
                rl.on('line', function (line) {
                    if (line.length >= minLength) {
                        lastLine = line;
                    }
                });
        
                rl.on('error', reject)
        
                rl.on('close', function () {
                    resolve(lastLine)
                });
            })
        }
        const tempres = {
        
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

const createFormattedDateTime = () => {
    let current_datetime = new Date();
    let formatted_date_time =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() 
    return formatted_date_time
}

export default {
    postImage
}