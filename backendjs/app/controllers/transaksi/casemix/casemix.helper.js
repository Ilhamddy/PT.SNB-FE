import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { wrapperCasemix } from "../../../utils/casemixutils";
import crypto from 'crypto';
import axios from "axios";

const hupsertGrouping = wrapperCasemix(
    async (logger,params,norecdp) => {
        await db.sequelize.transaction(async(transaction) => {
            let key_inacbg = ''
            let url_inacbg = ''
            const resultlistKodeTarif = await pool.query(`select s_key,s_value from s_global where s_key ilike '%inacbg%'`);
            for (let x = 0; x < resultlistKodeTarif.rows.length; x++) {
                if (resultlistKodeTarif.rows[x].s_key === 'key_inacbg') {
                    key_inacbg = resultlistKodeTarif.rows[x].s_value
                }
                if (resultlistKodeTarif.rows[x].s_key === 'url_inacbg') {
                    url_inacbg = resultlistKodeTarif.rows[x].s_value
                }
            }
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*"
            };
                let responArr = []
                for (let i = 0; i < params.length; i++) {
                    let payload = await inacbg_encrypt(params[i], key_inacbg)
                    const config = {
                        method: "post",
                        url: url_inacbg,
                        headers: headers,
                        data: payload
                    };
                    const response = await axios(config);
                    const responseData = response.data;

                    // Extract the content between the first and last newlines
                    const firstNewlineIndex = await responseData.indexOf("\n") + 1;
                    const lastNewlineIndex = await responseData.lastIndexOf("\n") - 1;
                    const trimmedResponse = await responseData.substring(firstNewlineIndex, lastNewlineIndex);
                    const decryptedResponse = await inacbg_decrypt(responseData, key_inacbg);
                    if(params[i].metadata.method==='grouper'){
                        let responseJSONparse = JSON.parse(decryptedResponse)
                        const riwayatModel = await db.t_daftarpasien.findByPk(norecdp, {
                            transaction: transaction
                        })
                        await riwayatModel.update({
                            nominalklaim: responseJSONparse.response.cbg.tariff
                        }, {
                            transaction: transaction
                        })
                    }
                    responArr.push({
                        dataRequest: params[i],
                        dataResponse: JSON.parse(decryptedResponse)
                    })
                }
        })
    }
)

export{
    hupsertGrouping
}

// function decrypt
const inacbg_encrypt = async (data, strkey) => { //stringify when data os object
    if (typeof data === 'object') {
        data = JSON.stringify(data);
    } //make Key to binary type, stored in Buffer
    let keys = Buffer.from(strkey, 'hex');
    //make data to binary type, stored in Buffer 
    let data_encoded = Buffer.from(data);
    //make iv 16 byte of random 
    let iv = crypto.randomBytes(16);
    //create cyper for encrypt
    let enc = crypto.createCipheriv('aes-256-cbc', keys, iv);
    // encrypt data 
    let encrypt = Buffer.concat([enc.update(data_encoded), enc.final()]);
    //create signature 
    let signature = crypto.createHmac('sha256', keys)
        .update(encrypt).digest().slice(0, 10);
    //concat buffer then return in string encode with base64
    return Buffer.concat([signature, iv, encrypt]).toString('base64');
}

const inacbg_compare = (signature, encrypt, key_inacbg) => {
    let keys = Buffer.from(key_inacbg, 'hex');
    let calc_signature = crypto.createHmac('sha256', keys)
        .update(encrypt).digest().slice(0, 10);
    if (signature.compare(calc_signature) === 0) {
        return true;
    }
    return false;
}

// end

// inacbg decrypt
const inacbg_decrypt = async (data, key_inacbg) => {
    //Replacing Text
    if (typeof data === 'string') {
        data = data.replace(/----BEGIN ENCRYPTED DATA----|----END ENCRYPTED DATA----/g, '');
    } else {
        return `Should be String input`;
    } //make Key to binary type, stored in Buffer 
    let keys = Buffer.from(key_inacbg, 'hex');
    //make data to binary type, stored in Buffer 
    let data_decoded = Buffer.from(data, 'base64');
    //make iv to binary type, stored in Buffer 
    let iv = Buffer.from(data_decoded.slice(10, 26));
    //create Deciper with IV to decode data 
    let dec = crypto.createDecipheriv('aes-256-cbc', keys, iv);
    //cutting data that has binary type -- 26 is 10 for char and 16 for IV for aes-256-cbc 
    let encoded = Buffer.from(data_decoded.slice(26))
    //take Signature 
    let signature = data_decoded.slice(0, 10);
    //check if signature is right
    if (!inacbg_compare(signature, encoded, key_inacbg)) {
        return "SIGNATURE_NOT_MATCH"; /// signature doesn't match 
    }
    //decrypt data 
    let decrypted = Buffer.concat([dec.update(encoded), dec.final()]);
    return decrypted.toString('utf8');
}

//   end