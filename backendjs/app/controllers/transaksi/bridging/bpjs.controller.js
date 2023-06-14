const pool = require("../../../config/dbcon.query");
const uuid = require('uuid')
const db = require("../../../models");

const t_antreanpemeriksaan = db.t_antreanpemeriksaan

var crypto = require('crypto');

function generateAuthHeaders (consumerID, consumerSecret) {

    if (!consumerID || !consumerSecret) {
        throw new Error('Must provide a Client ID and a Client Key');
    }

   
    // keep track of this timestamp, you will need it for the RequestInfo Object
    var timestamp   = Math.floor(Date.now() / 1000),  

        unescapeBase64Url = function (key) {
            return key.replace(/-/g, '+').replace(/_/g, '/');
        },

        escapeBase64Url = function (key) {
            return key.replace(/\+/g, '-').replace(/\//g, '_');
        },

        signKey = function (consumerSecret, message) {
            var key = new Buffer(unescapeBase64Url(consumerSecret), 'base64');
            var hash = crypto.createHmac('sha256', key).update(message).digest('base64');
            return escapeBase64Url(hash);

        },

        encodedData = signKey(consumerSecret, requestData + timestamp),
        headers = {
            'Hound-Request-Authentication': requestData,
            'Hound-Client-Authentication': consumerID + ';' + timestamp + ';' + encodedData
        };

    return headers;
};


queryPromise2 = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};

async function generateSignature(req, res) {
    try {
        
        let tempres = 'test'
        generateAuthHeaders()
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        res.status(500).send({ message: error });
    }

}


module.exports = {
    generateSignature
};