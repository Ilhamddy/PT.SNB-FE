// scheduler.mjs
import schedule from 'node-schedule';
import pool from "../config/dbcon.query";
import db from "../models";
import * as uuid from 'uuid'

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
    console.log('Running scheduled task...');
    // Put your code here (e.g., invoke your backend function)
    let transaction = null;
    try {
        transaction = await db.sequelize.transaction();
    } catch (e) {
        console.error(e)
        return;
    }

    try {
        let today = new Date();
        let todaystart = formatDate(today) + ' 00:00'
        let todayend = formatDate(today) + ' 23:59'

        const queryResult = await pool.query(`select ta.objectkelasfk ,td.norec,ta.norec as norecta,ta.objectunitfk,td.noregistrasi,td.nocmfk,
        ta.objectdokterpemeriksafk  from t_daftarpasien td
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=td.norec and ta.objectunitfk=td.objectunitlastfk 
        where td.tglpulang is null and td.statusenabled =true and ta.statusenabled=true`); // Your SQL query here

        const queryResult2 = await pool.query(`select * from t_sensusharian where tglinput between '${todaystart}' and '${todayend}'`);
        
        const cmgOptions = await Promise.all(
            queryResult.rows.map(async (item) => {
                if (queryResult2.rows.length === 0) {
                    const add = await db.t_sensusharian.create({
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
                    return add
                }else{
                    const foundItems = queryResult2.rows.filter(itemx => itemx.objectantreanpemeriksaanfk === item.norecta);
                    if (foundItems.length > 0) {
                        console.log('Items found: sensus harian');
                    } else {
                        const add = await db.t_sensusharian.create({
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
                        return add
                    }
                }
            }
            )
        )
        await transaction.commit();
        console.log(queryResult2.rows.length)
    } catch (error) {
        transaction && await transaction.rollback();
        console.error('Error executing query:', error);
    }
});

export default scheduledTask;