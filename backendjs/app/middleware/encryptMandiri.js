
import config from "../config/auth.config";
import db from "../models";
import * as dotenv from "dotenv"
import { decrypt, encrypt } from "../utils/encrypt";
import jwt from "jsonwebtoken";


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
        // let oldJson = res.json;    
        // res.json = function(data) {
        //     try{
        //         const newData = encrypt(data, clientSecret)
        //         res.json = oldJson 
        //         return res.json(newData) 
        //     }catch(e){
        //         logger.error(e)
        //         res.status(401).send({
        //             msg: "Unauthorized!"
        //         });
        //     }
        // }
    
        next();
    }catch(e){
        logger.error(e)
        res.status(401).send({
            msg: e?.message || "Unauthorized!"
        });
    }
}
