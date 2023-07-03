const pool = require("../../../../config/dbcon.query");
const uuid = require('uuid')
const queries = require('../../../../queries/transaksi/registrasi.queries');
const db = require("../../../../models");

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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
async function getDetailJenisProdukLab(req, res) {

    try {
        
        const resultlist = await queryPromise2(`select id,detailjenisproduk  from m_detailjenisproduk md 
        where md.objectjenisprodukfk = 1
        `);


        let tempres = resultlist.rows

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
    getDetailJenisProdukLab
};