import config from "../config";
import crypto from "crypto-browserify"
import {Buffer} from "buffer"

const algorithm = 'aes-256-ctr'

export function encrypt(data) {
    let key = JSON.parse(localStorage.getItem("clientSecret")) 
        ? JSON.parse(localStorage.getItem("clientSecret")) : null;
    if(!key) throw new Error("No key provided");
    key = Buffer.concat([Buffer.from(key), Buffer.alloc(32)], 32)
    const json = {dataenc: data};
    let text = JSON.stringify(json);
    let iv = crypto.randomBytes(config.api.IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        dataenc: iv.toString('hex') + ':' + encrypted.toString('hex'), 
        isencrypt: true
    }
}

export function decrypt(text) {
    let secret = JSON.parse(localStorage.getItem("clientSecret")) 
        ? JSON.parse(localStorage.getItem("clientSecret")) : null;
    if(!secret) {
        throw new Error("No key provided");
    }
    try{
        console.log(text)
        console.log(secret)
        const key = Buffer.concat([Buffer.from(secret), Buffer.alloc(32)], 32)
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        const decryptedText = decrypted.toString();
        console.log(decryptedText)
        return {
            data: (JSON.parse(decryptedText)).dataenc,
            isencrypt: true
        };
    }catch(e){
        console.error(e)
        throw new Error("Invalid token or bad token format");
    }
}