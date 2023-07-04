import pool from "../../../../config/dbcon.query";
import * as uuid from 'uuid';
import queries from '../../../../queries/transaksi/registrasi.queries';
import db from "../../../../models";

const queryPromise2 = (query) => {
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

        const resultlist = await queryPromise2(`select id as value, detailjenisproduk as label,'' as detail  from m_detailjenisproduk md 
        where md.objectjenisprodukfk = 1
        `);
        for (var i = 0; i < resultlist.rows.length; ++i) {

            const resultlistOrder = await queryPromise2(`select mp.id,mp.kodeexternal , 
            case 
                when mp."level" = 1 then mp.reportdisplay
                when mp."level" = 2 then '  '||mp.reportdisplay
                when mp."level" = 3 then '    '||mp.reportdisplay
            end as label, mp.objectindukfk , mp."level" , mp.urutan, mp.objectprodukfk as value,
            mp2.objectdetailjenisprodukfk from m_pemeriksaanlab mp 
            join m_produk mp2 on mp.objectprodukfk = mp2.id 
            where mp2.objectdetailjenisprodukfk = '${resultlist.rows[i].value}'
            order by mp.kodeexternal`);
            let tempOrder = []
            for (var x = 0; x < resultlistOrder.rows.length; ++x) {
                if (resultlistOrder.rows[x].level === 1){
                    resultlistOrder.rows[x].subdata=[]
                    tempOrder.push(resultlistOrder.rows[x])
                } else if (resultlistOrder.rows[x].level === 2){
                    for (let y = 0; y < tempOrder.length; y++) {
                        if(tempOrder[y].value===resultlistOrder.rows[x].value){
                            tempOrder[y].subdata.push(resultlistOrder.rows[x])
                        }
                    }
                }else{
                    for (let y = 0; y < tempOrder.length; y++) {
                        if(tempOrder[y].value===resultlistOrder.rows[x].value){
                            for (let z = 0; z < tempOrder[y].subdata.length; z++) {
                                if(tempOrder[y].subdata[z].id===resultlistOrder.rows[x].objectindukfk){
                                    tempOrder[y].subdata[z].subsubdata=[]
                                    tempOrder[y].subdata[z].subsubdata.push(resultlistOrder.rows[x])
                                }
                               
                            }
                        }
                    }
                }
            }
            resultlist.rows[i].detail = tempOrder
        }

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


export default {
    getDetailJenisProdukLab
};