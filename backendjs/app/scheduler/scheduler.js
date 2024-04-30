// scheduler.mjs
import schedule from 'node-schedule';
import pool from "../config/dbcon.query";
import db from "../models";
import * as uuid from 'uuid'
import {qGetUnitTempatTidurScheduler} from '../queries/sysadmin/sysadmin.queries'
import queries from "../queries/system/system.queries"
import { groupBy } from '../utils/arutils';
import axios from "axios"
import { dateLocal } from '../utils/dateutils';

// Schedule a task to run at a specific time (e.g., 2:30 PM every day)


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
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const scheduledTask = schedule.scheduleJob('40 * * * *', async function () {
    // const logger = res.locals.logger;
    console.log('Running scheduled task...');
    try{
        let today = new Date();
        let todaystart = formatDate(today) + ' 00:00'
        let todayend = formatDate(today) + ' 23:59'
        const queryResult = await pool.query(`select ta.objectkelasfk ,td.norec,ta.norec as norecta,ta.objectunitfk,td.noregistrasi,td.nocmfk,
        ta.objectdokterpemeriksafk  from t_daftarpasien td
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=td.norec and ta.objectunitfk=td.objectunitlastfk 
        where td.tglpulang is null and td.statusenabled =true and ta.statusenabled=true`); // Your SQL query here

        const queryResult2 = await pool.query(`select * from t_sensusharian where tglinput between '${todaystart}' and '${todayend}'`);

        const kamars = (await pool.query(qGetUnitTempatTidurScheduler))
        const queryBedHarian = await pool.query(`select * from t_bedharian where tglinput between '${todaystart}' and '${todayend}'`);

        const { add,addBed } = await db.sequelize.transaction(async (transaction) => {
            let add = ''
            let addBed = ''
            for (let i = 0; i < queryResult.rows.length; i++) {
                const item = queryResult.rows[i];
                if (queryResult2.rows.length === 0) {
                    add = await db.t_sensusharian.create({
                        norec: uuid.v4().substring(0, 32),
                        objectantreanpemeriksaanfk: item.norecta,
                        objectunitfk: item.objectunitfk,
                        objectdaftarpasienfk: item.norec,
                        noregistrasi: item.noregistrasi,
                        objectpasienfk: item.nocmfk,
                        objectdokterpemeriksafk: item.objectdokterpemeriksafk,
                        objectkelasfk: item.objectkelasfk,
                        tglinput: new Date()
                    }, {
                        transaction: transaction
                    });
                }else{
                    const foundItems = queryResult2.rows.filter(itemx => itemx.objectantreanpemeriksaanfk === item.norecta);
                    if (foundItems.length > 0) {
                        // console.log('Items found: sensus harian');
                    } else {
                        add = await db.t_sensusharian.create({
                            norec: uuid.v4().substring(0, 32),
                            objectantreanpemeriksaanfk: item.norecta,
                            objectunitfk: item.objectunitfk,
                            objectdaftarpasienfk: item.norec,
                            noregistrasi: item.noregistrasi,
                            objectpasienfk: item.nocmfk,
                            objectdokterpemeriksafk: item.objectdokterpemeriksafk,
                            objectkelasfk:item.objectkelasfk,
                            tglinput: new Date()
                        }, {
                            transaction: transaction
                        });
                    }
                }
            }
            await Promise.all(kamars.rows.map(async (itemx) =>{
                // console.log(itemx.idunit,itemx.totalbed)
                if(queryBedHarian.rows.length ===0){
                    addBed = await db.t_bedharian.create({
                        norec: uuid.v4().substring(0, 32),
                        objectunitfk: itemx.idunit,
                        jumlahbed: itemx.totalbed,
                        jumlahbedrusak: itemx.totalrusak,
                        tglinput: new Date()
                    }, {
                        transaction: transaction
                    });
                }else{
                    await Promise.all(queryBedHarian.rows.map(async(itemy)=>{
                        if(itemx.idunit===itemy.objectunitfk){
                            // console.log(itemx.idunit,itemy.objectunitfk,itemx.totalbed)
                            addBed = await db.t_bedharian.update({
                                jumlahbed: itemx.totalbed,
                                jumlahbedrusak:itemx.totalrusak,
                                tglinput: new Date()
                            }, {
                                where: {
                                    norec: itemy.norec,
                                },
                                transaction: transaction
                            });
                        }else{
                            var newArray = queryBedHarian.rows.filter(function (el) {
                                return el.objectunitfk === itemy.objectunitfk;
                            });
                            if(newArray.length===0){
                                addBed = await db.t_bedharian.create({
                                    norec: uuid.v4().substring(0, 32),
                                    objectunitfk: itemx.idunit,
                                    jumlahbed: itemx.totalbed,
                                    jumlahbedrusak: itemx.totalrusak,
                                    tglinput: new Date()
                                }, {
                                    transaction: transaction
                                });
                            }
                        }
                    }))
                }
            }))
            return { add,addBed }
        });
        // console.log(kamars.rows)
    } catch (error) {
        // logger.error(error);
        console.error('Error executing query:', error);
    }
});

/**
 * TODO: kasih dokumentasi
 */
let timesKirimWA = [
    {hour: 6, minute: 0}, 
];
timesKirimWA.forEach(function(time) {
    let j = schedule.scheduleJob(time, async function() {
        try{
            const dokterCBG = (await pool.query(queries.qGetDaftarPasienCBG, [])).rows
            const dokters = groupBy(dokterCBG, "iddokter", "nohpdokter", "namadokter")
            const sentWhatsapps = await Promise.all(
                dokters.map(
                    async(dokter) => {
                        if(!dokter.nohpdokter) return
                        let text = `*Informasi pasien BPJS Kesehatan yang tagihannya >= 80% dari total estimasi klaim INA-CBG*
                        `
                        let pasienGrouped = groupBy(
                            dokter._values, 
                            "idpasien", 
                            "namapasien", 
                            "norm", 
                            "noregistrasi",
                            "estimasiklaim",
                            "tglregistrasi",
                            "totalbiaya"
                        )
                        pasienGrouped.forEach((pasien, index) => {
                            const percentageEstimasi = pasien.estimasiklaim * 8 / 10
                            const is80Percent = pasien.totalbiaya > percentageEstimasi
                            const groupedDiagIcdx = groupBy(pasien._values, "diagnosaicdx")
                            const groupedDiagIcdix = groupBy(pasien._values, "diagnosaicdix")
                            if(!is80Percent){
                                return
                            }
                            let texticdx = ``
                            groupedDiagIcdx.forEach((diagnosa) => {
                                if(!diagnosa.diagnosaicdx) return 
                                texticdx += diagnosa.diagnosaicdx + " ## "
                            })
                            let texticdix = ``
                            groupedDiagIcdix.forEach((diagnosa) => {
                                if(!diagnosa.diagnosaicdix) return 
                                texticdix += diagnosa.diagnosaicdix + " ## "
                            })
                            if(!texticdx){
                                texticdx = "-"
                            }
                            if(!texticdix){
                                texticdix = "-"
                            }
                            text += `
================================
PASIEN ${index + 1}
================================
DPJP Pasien	: ${dokter.namadokter}
Nama pasien	: ${pasien.namapasien}
No. RM		: ${pasien.norm}
Tgl. Masuk	: ${dateLocal(pasien.tglregistrasi)}
No. Registrasi	: ${pasien.noregistrasi}
ICD 10		: ${texticdx}
ICD 9		: ${texticdix}
Total Pelayanan	: Rp${pasien.totalbiaya?.toLocaleString("id-ID") || "0"}
Estimasi Klaim	: Rp${pasien.estimasiklaim?.toLocaleString("id-ID") || "0"}
    `
                        })
    
                        try{
                            const sentWhatsapp = await axios.post("https://graph.facebook.com/v17.0/167007769837153/messages", {
                                "messaging_product": "whatsapp",
                                "to": dokter.nohpdokter,
                                "type": "text",
                                "text": {
                                    "body": text
                                }
                            }, {
                                headers: {
                                    Authorization: "Bearer EAAOWxZCIIQ2cBO362ITrEuhj0n6dWptkZBzGv1ux3yUlrCycebp0LMw6WZACn08Mazao2pKCg1zqeA5O0xZBc4cFSNnwRxsjnZBotRa2d92SSvLPpZCGCGjbEiro3oLaRQD7oZC1PXL3KZCxtCZCu3glHA74YIpTXMxL3dZA5PID2Wa6LE2VKU7feCryvO8YmKK8N9vReCtTSsytSemzroSxw1P77t9CWdVZBPyJrYZD"
                                }
                            })
                            return sentWhatsapp.data
                        } catch(e) {
                            return null
                        }
                    }
                )
            )
            
        } catch (error) {
            console.log(error)
        }
    });
})
  

export default scheduledTask;