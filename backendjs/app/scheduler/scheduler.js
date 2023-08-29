// scheduler.mjs
import schedule from 'node-schedule';
import pool from "../config/dbcon.query";
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
const scheduledTask = schedule.scheduleJob('34 * * * *',async function () {
    console.log('Running scheduled task...');
    // Put your code here (e.g., invoke your backend function)

    try {
        const queryResult = await pool.query(`select td.norec,ta.norec as norecta,ta.objectunitfk,td.noregistrasi,td.nocmfk,
        ta.objectdokterpemeriksafk  from t_daftarpasien td
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=td.norec and ta.objectunitfk=td.objectunitlastfk 
        where td.tglpulang is null and td.statusenabled =true and ta.statusenabled=true`); // Your SQL query here
        console.log(queryResult.rows);
    } catch (error) {
        console.error('Error executing query:', error);
    }
});

export default scheduledTask;