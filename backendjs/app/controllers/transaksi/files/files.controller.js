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


const postImage = async (req, res) => {
    const logger = res.locals.logger;
    const tempPath = req.file.path;
    try{
        const __dirname = path.resolve(path.dirname(''));
        const folderImage = "./app/media/upload/image"
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
        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      
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
        res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

export default {
    postImage}