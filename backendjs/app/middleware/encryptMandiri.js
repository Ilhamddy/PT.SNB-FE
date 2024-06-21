
import config from "../config/auth.config";
import db from "../models";
import * as dotenv from "dotenv"
import { decrypt, decryptSimrs, encrypt, encryptSimrs } from "../utils/encrypt";
import jwt from "jsonwebtoken";
import fs from 'fs'
import multer from "multer";

const upload = multer({dest: './app/media/upload'})

dotenv.config()

const m_user = db.users_pasien

export const decryptMandiri = async (req, res, next) => {
    const logger = res.locals.logger
    try{
        if(!req.body.isencrypt){
            next()
            return
        }
        let bearerHeader = req.headers['authorization'];
        let bearer = bearerHeader.split(' ');
        let bearerToken = bearer[1]
        const decoded = jwt.verify(bearerToken, config.secret);
        const user = (await m_user.findByPk(decoded.id)).toJSON()
        if(!user){
            throw new Error("User not found!")
        }
        const clientSecret = user.clientsecret 
        const decrypted = decrypt(req.body.dataencrypt, clientSecret)
        req.body = decrypted.data
        next();
    } catch(e){
        logger.error(e)
        res.status(401).send({
            msg: "Unauthorized!"
        });
    }
}

export const encryptMandiri = async (req, res, next) => {
    const logger = res.locals.logger

    try{
        if(!req.headers['authorization']){
            throw new Error("No token provided")
        }
        let bearerHeader = req.headers['authorization'];
        let bearer = bearerHeader.split(' ');
        let bearerToken = bearer[1]
        const decoded = jwt.verify(bearerToken, config.secret);
        const user = (await m_user.findByPk(decoded.id)).toJSON()
        if(!user){
            throw new Error("User not found!")
        }
        const clientSecret = user.clientsecret 
        let oldSend = res.send;    
        res.send = function(data) {
            try{
                if(data.isencrypt){
                    res.send = oldSend 
                    return res.send(data)
                }
                const newData = encrypt(data, clientSecret)
                res.send = oldSend 
                return res.send(newData) 
            }catch(e){
                logger.error(e)
                res.status(401).send({
                    msg: "Unauthorized!"
                });
            }
        }
    
        next();
    }catch(e){
        logger.error(e)
        res.status(401).send({
            msg: e?.message || "Unauthorized!"
        });
    }
}


export const decryptMiddleware = async (req, res, next) => {
    const logger = res.locals.logger
    try{
        if(!req.body._isencrypt){
            next()
            return
        }
        const decrypted = decryptSimrs(req.body._dataencrypt)
        req.body = decrypted
        next();
    } catch(e){
        logger.error(e)
        res.status(401).send({
            data: "ERROR_DECRYPT",
            msg: "Terdapat masalah di kode aktivasi"
        });
    }
}

const decryptJsonForm = async (req, res, next) => {
    const logger = res.locals.logger
    try{
        const dataObj = JSON.parse(fs.readFileSync(req.files.json[0].path).toString())
        if(!dataObj._isencrypt){
            next()
            return
        }
        const decrypted = decryptSimrs(dataObj._dataencrypt)
        req.body = decrypted
        next();
    } catch(e){
        logger.error(e)
        res.status(401).send({
            data: "ERROR_DECRYPT",
            msg: "Terdapat masalah di kode aktivasi"
        });
    }
}

export const paketMulter = [upload.fields([{ name: 'files' }, { name: 'json' }]), decryptJsonForm]

export const encryptMiddleware = async (req, res, next) => {
    const logger = res.locals.logger
    try{
        let oldSend = res.send;    
        const url = req.url
        const notIncludedLinks = ["/api/daftarmandiri"]
        const isNotIncluded = notIncludedLinks.every(links => !url.includes(links))
        if(!isNotIncluded){
            res.send = oldSend
        }else{
            res.send = function(data) {
                try{
                    if(data._isencrypt){
                        res.send = oldSend 
                        return res.send(data)
                    }
                    const newData = encryptSimrs(data)
                    res.send = oldSend 
                    return res.send(newData) 
                }catch(e){
                    logger.error(e)
                    res.status(401).send({
                        data: "ERROR_ENCRYPT",
                        msg: "Terdapat masalah di kode aktivasi"
                    });
                }
            }
        }

        
        next();
    }catch(e){
        logger.error(e)
        res.status(401).send({
            data: "ERROR_ENCRYPT",
            msg: e?.message || "Terdapat masalah di kode aktivasi"
        });
    }
}
