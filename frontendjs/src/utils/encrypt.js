import CryptoJS from "crypto-js"
import CryptoENC from 'crypto-js/enc-utf8';

export function encryptSimrs(data, activationKey){
    try{
        const dataStr = JSON.stringify(data)
        let encrypted = CryptoJS.AES.encrypt(dataStr, activationKey)
        encrypted = encrypted.toString()
        return {
            _isencrypt: true,
            _dataencrypt: encrypted
        }
    } catch(e){
        console.error(e)
    }
}

export function decryptSimrs(text, activationKey){
    try{
        let decryptedData = CryptoJS.AES.decrypt(text, activationKey)
        decryptedData = decryptedData.toString(CryptoENC)
        const data = JSON.parse(decryptedData)
        return data
    } catch(e){
        console.error(e)
    }
}