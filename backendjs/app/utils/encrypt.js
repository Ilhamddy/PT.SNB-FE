import * as dotenv from "dotenv"
import crypto from "crypto"
dotenv.config()

const IV_LENGTH = process.env.API_IV_LENGTH ? Number(process.env.API_IV_LENGTH) : 16;
const algorithm = process.env.API_ENC_ALGORITHM ? process.env.API_ENC_ALGORITHM : 'aes-256-cbc';

export function encrypt(data, clientSecret) {
    const key = Buffer.concat([Buffer.from(clientSecret), Buffer.alloc(32)], 32)
    if(!key) throw new Error("No key provided");
    const json = {dataenc: data};
    let text = JSON.stringify(json);
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        dataenc: iv.toString('hex') + ':' + encrypted.toString('hex'), 
        isencrypt: true
    }
}

export function decrypt(text, clientSecret) {
    try{
        const key = Buffer.concat([Buffer.from(clientSecret), Buffer.alloc(32)], 32)
        if(!key) throw new Error("No key provided");
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        const decryptedText = decrypted.toString();
            return {
                data: (JSON.parse(decryptedText)).dataenc,
                isencrypt: true
            };
    }catch(e){
        console.error(e)
        throw new Error("Invalid token or bad token format");
    }
}