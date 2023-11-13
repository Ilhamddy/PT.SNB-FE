import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid';
import queries from '../../../queries/rekammedis/rekammedis.queries';
import db from "../../../models";
import { createTransaction } from "../../../utils/dbutils";

const m_maprltoproduk = db.m_maprltoproduk
const t_daftarpasien = db.t_daftarpasien

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

async function getListDaftarDokumenRekammedis(req, res) {
    const logger = res.locals.logger
    try {
        let tglregistrasi = ""
        if (req.query.start !== undefined) {
            tglregistrasi = ` and dp.tglregistrasi between '${req.query.start}'
         and '${req.query.end} 23:59' `;
        } else {
            // console.log('massuukk')
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = new Date()
            let todayend = formatDate(today) + ' 23:59'
            tglregistrasi = ` and dp.tglregistrasi between '${todaystart}'
        and '${todayend}' `;
        }
        let taskid = ""
        if (req.query.taskid !== undefined) {
            if (req.query.taskid === '1') {
                // console.log(req.query.taskid)
                taskid = ` and trm.objectstatuskendalirmfk is null`;
            } else if (req.query.taskid === '3') {
                taskid = ` and trm.objectstatuskendalirmfk=5`;
            } else if (req.query.taskid === '2') {
                taskid = ` and trm.objectstatuskendalirmfk <>5`;
            }
        } else {
            taskid = ` and trm.objectstatuskendalirmfk is null`;
        }

        const resultlistantreanpemeriksaan = await pool.query(`select dp.noregistrasi,mu.namaunit,ta.norec as norecap,
        mp.namapasien,mp.nocm, mrm.statuskendali,mp.objectstatuskendalirmfk as objectstatuskendalirmfkmp,
        trm.objectstatuskendalirmfk as objectstatuskendalirmfkap,
        dp.norec as norecdp,
        dp.objectunitlastfk, trm.norec as norectrm from t_daftarpasien dp
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
        and ta.objectunitfk =dp.objectunitlastfk 
        join m_unit mu on mu.id=dp.objectunitlastfk
        join m_pasien mp on mp.id=dp.nocmfk
        left join m_rm_statuskendali mrm on mrm.id=mp.objectstatuskendalirmfk
        left join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec
        where dp.noregistrasi ilike '%${req.query.noregistrasi}%' ${tglregistrasi} ${taskid} 
        AND dp.noregistrasi IS NOT NULL --- jika null maka masih belum teregistrasi
        `);

        let tempres = resultlistantreanpemeriksaan.rows

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function getWidgetListDaftarDokumenRekammedis(req, res) {
    const logger = res.locals.logger
    try {
        let tglregistrasi = ""
        if (req.query.start !== undefined) {

            tglregistrasi = ` and dp.tglregistrasi between '${req.query.start}'
         and '${req.query.end} 23:59' `;
        } else {
            // console.log('massuukk')
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            tglregistrasi = ` and dp.tglregistrasi between '${todaystart}'
        and '${todayend}' `;
        }
        const resultlistantreanpemeriksaan = await pool.query(`
        select 
            dp.noregistrasi,
            mu.namaunit,
            ta.norec as norecap,
            mp.namapasien,
            mp.nocm, 
            mrm.statuskendali,
            mp.objectstatuskendalirmfk as objectstatuskendalirmfkmp,
        trm.objectstatuskendalirmfk as objectstatuskendalirmfkap from t_daftarpasien dp
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
        and ta.objectunitfk =dp.objectunitlastfk 
        join m_unit mu on mu.id=dp.objectunitlastfk
        join m_pasien mp on mp.id=dp.nocmfk
        left join m_rm_statuskendali mrm on mrm.id=mp.objectstatuskendalirmfk
        left join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec
        where dp.noregistrasi ilike '%${req.query.noregistrasi}%' ${tglregistrasi}
        `);

        let tempres = resultlistantreanpemeriksaan.rows
        let totalBelum = 0
        let totalDipinjam = 0
        let totalSelesai = 0
        for (let x = 0; x < resultlistantreanpemeriksaan.rows.length; x++) {
            if (resultlistantreanpemeriksaan.rows[x].objectstatuskendalirmfkap == 5) {
                totalSelesai = totalSelesai + 1
            } else if (resultlistantreanpemeriksaan.rows[x].objectstatuskendalirmfkap == null) {
                totalBelum = totalBelum + 1
            } else {
                totalDipinjam = totalDipinjam + 1
            }
        }
        const taskWidgets = [
            {
                id: 1,
                label: "Belum Dikirim",
                counter: totalBelum,
                badge: "ri-arrow-up-line",
                badgeClass: "success",
                percentage: "17.32 %",
                icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAyIiBpZD0iTGF5ZXJfMiIgdmlld0JveD0iMCAwIDY0IDY0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZmZlOTRmO30uY2xzLTJ7ZmlsbDojZGViMTQyO30uY2xzLTN7ZmlsbDojZjc0YjUwO30uY2xzLTR7ZmlsbDojZDEzZjQ0O30uY2xzLTV7ZmlsbDojNDVkNGQ5O30uY2xzLTZ7ZmlsbDojMmQ5NWI1O30uY2xzLTd7ZmlsbDojMmMyYTNkO308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxyZWN0IGNsYXNzPSJjbHMtMSIgaGVpZ2h0PSI1OCIgcng9IjIiIHJ5PSIyIiB3aWR0aD0iNDIiIHg9IjExIiB5PSIzIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTMsM0g1MWEyLDIsMCwwLDEsMiwyVjZhMCwwLDAsMCwxLDAsMEgxMWEwLDAsMCwwLDEsMCwwVjVBMiwyLDAsMCwxLDEzLDNaIi8+PHJlY3QgY2xhc3M9ImNscy0zIiBoZWlnaHQ9IjEyIiB3aWR0aD0iMjAiIHg9IjI1IiB5PSIxMi45MiIvPjxyZWN0IGNsYXNzPSJjbHMtNCIgaGVpZ2h0PSIzIiB3aWR0aD0iMjAiIHg9IjI1IiB5PSIxMyIvPjxwYXRoIGNsYXNzPSJjbHMtNSIgZD0iTTEzLDNoNGEwLDAsMCwwLDEsMCwwVjYxYTAsMCwwLDAsMSwwLDBIMTNhMiwyLDAsMCwxLTItMlY1YTIsMiwwLDAsMSwyLTJaIi8+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNMTMsM2g0YTAsMCwwLDAsMSwwLDBWNmEwLDAsMCwwLDEsMCwwSDExYTAsMCwwLDAsMSwwLDBWNUEyLDIsMCwwLDEsMTMsM1oiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik01MSwySDEzYTMsMywwLDAsMC0zLDNWNTlhMywzLDAsMCwwLDMsM0g1MWEzLDMsMCwwLDAsMy0zVjVBMywzLDAsMCwwLDUxLDJaTTEzLDYwYTEsMSwwLDAsMS0xLTFWNWExLDEsMCwwLDEsMS0xaDNWNjBabTM5LTFhMSwxLDAsMCwxLTEsMUgxOFY0SDUxYTEsMSwwLDAsMSwxLDFaIi8+PHBhdGggY2xhc3M9ImNscy03IiBkPSJNNDUsMTJIMjVhMSwxLDAsMCwwLTEsMVYyNWExLDEsMCwwLDAsMSwxSDQ1YTEsMSwwLDAsMCwxLTFWMTNBMSwxLDAsMCwwLDQ1LDEyWk00NCwyNEgyNlYxNEg0NFoiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik00NSwzMUgyNWExLDEsMCwwLDAsMCwySDQ1YTEsMSwwLDAsMCwwLTJaIi8+PHBhdGggY2xhc3M9ImNscy03IiBkPSJNNDUsMzZIMjVhMSwxLDAsMCwwLDAsMkg0NWExLDEsMCwwLDAsMC0yWiIvPjxjaXJjbGUgY2xhc3M9ImNscy03IiBjeD0iMjkiIGN5PSIxNyIgcj0iMSIvPjwvc3ZnPg==",
                iconClass: "info",
                decimals: 1,
                prefix: "",
                suffix: "k",
            },
            {
                id: 2,
                label: "Sedang Dipinjam",
                counter: totalDipinjam,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "0.87 %",
                icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY0IDY0OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzYyQkVFNzt9Cgkuc3Qxe2ZpbGw6IzQ3NEU1RTt9Cgkuc3Qye2ZpbGw6I0YzRUVFNDt9Cgkuc3Qze2ZpbGw6I0ZGRkZGRjt9Cgkuc3Q0e2ZpbGw6I0U4RENDQTt9Cgkuc3Q1e29wYWNpdHk6MC4xO2ZpbGw6IzIzMUYyMDt9Cgkuc3Q2e2ZpbGw6IzUwNjI2ODt9Cgkuc3Q3e2ZpbGw6I0VCNTE1MTt9Cgkuc3Q4e2ZpbGw6I0M2NDQ0NDt9Cgkuc3Q5e2ZpbGw6IzlDQ0I1Qjt9Cgkuc3QxMHtmaWxsOiM0MDRBNEM7fQoJLnN0MTF7ZmlsbDojNjc2NzY3O30KCS5zdDEye2ZpbGw6I0UwRTFFNTt9Cgkuc3QxM3tmaWxsOiM5RDlFQTA7fQoJLnN0MTR7ZmlsbDojQjNCNEI3O30KCS5zdDE1e29wYWNpdHk6MC4xO30KCS5zdDE2e2ZpbGw6IzIzMUYyMDt9Cgkuc3QxN3tmaWxsOiNGQUNDMjA7fQoJLnN0MTh7ZmlsbDojRkRFRjM0O30KCS5zdDE5e2ZpbGw6I0Y3QTkwQjt9Cgkuc3QyMHtmaWxsOiMyMEI4RUE7fQoJLnN0MjF7ZmlsbDojMDBBOEVBO30KCS5zdDIye2ZpbGw6IzMzRDNGNDt9Cgkuc3QyM3tvcGFjaXR5OjAuMjU7ZmlsbDojRkZGRkZGO30KCS5zdDI0e2ZpbGw6I0NBQ0JDRTt9Cgkuc3QyNXtmaWxsOiMyRTM1NDU7fQoJLnN0MjZ7ZmlsbDojOERBRjRBO30KCS5zdDI3e2ZpbGw6I0Y5QzJBRjt9Cgkuc3QyOHtmaWxsOiNBRkRERjQ7fQoJLnN0Mjl7ZmlsbDojNjc3MTc3O30KCS5zdDMwe2ZpbGw6I0ZGRURCMzt9Cgkuc3QzMXtmaWxsOiM2OTU2NTI7fQoJLnN0MzJ7ZmlsbDojMzBBN0JGO30KCS5zdDMze2ZpbGw6IzRENTU1Njt9Cgkuc3QzNHtvcGFjaXR5OjAuMzU7fQoJLnN0MzV7ZmlsbDojRkZDQjA0O30KCS5zdDM2e2ZpbGw6Izk5RTlGQTt9Cgkuc3QzN3tvcGFjaXR5OjAuMjt9Cgkuc3QzOHtvcGFjaXR5OjMuMDAwMDAwZS0wMjt9Cgkuc3QzOXtmaWxsOiM5RUNBNUI7fQoJLnN0NDB7ZmlsbDojOThCQTU2O30KCS5zdDQxe2ZpbGw6IzQwRUVGRjt9Cgkuc3Q0MntmaWxsOiNGRjZBNTI7fQoJLnN0NDN7b3BhY2l0eTowLjE7ZmlsbDojRkZGRkZGO30KCS5zdDQ0e29wYWNpdHk6MC40O30KCS5zdDQ1e2ZpbGw6IzU3NjA2RDt9Cgkuc3Q0NntmaWxsOiNCQUNBNUI7fQoJLnN0NDd7b3BhY2l0eTowLjI1O30KCS5zdDQ4e29wYWNpdHk6NS4wMDAwMDBlLTAyO2ZpbGw6IzIzMUYyMDt9Cgkuc3Q0OXtvcGFjaXR5OjAuMjtmaWxsOiNGRkZGRkY7fQoJLnN0NTB7b3BhY2l0eTowLjM7fQoJLnN0NTF7ZmlsbDojRkZEODJGO30KCS5zdDUye2ZpbGw6I0Y0QzEyMTt9Cgkuc3Q1M3tmaWxsOiNFRjlEMEE7fQoJLnN0NTR7ZmlsbDojRjlFNTMyO30KCS5zdDU1e2ZpbGw6I0Y0QzAxRTt9Cgkuc3Q1NntmaWxsOiNGRkUxNEQ7fQoJLnN0NTd7ZmlsbDojQjdDMTU2O30KCS5zdDU4e2ZpbGw6I0RCQTkyQzt9Cgkuc3Q1OXtmaWxsOiMzNjNENEQ7fQoJLnN0NjB7ZmlsbDojM0Y0NjU2O30KCS5zdDYxe2ZpbGw6IzQ2M0UzMzt9Cgkuc3Q2MntmaWxsOm5vbmU7fQoJLnN0NjN7b3BhY2l0eTo0LjAwMDAwMGUtMDI7fQoJLnN0NjR7ZmlsbDojNERCNkFDO30KCS5zdDY1e2ZpbGw6I0NBREU0OTt9Cgkuc3Q2NntmaWxsOiM5RkQzNDM7fQoJLnN0Njd7ZmlsbDojQUFENjQzO30KCS5zdDY4e2ZpbGw6IzgyQzczNjt9Cgkuc3Q2OXtvcGFjaXR5OjAuMztmaWxsOiNGRkZGRkY7fQoJLnN0NzB7ZmlsbDojRkZENjQwO30KCS5zdDcxe29wYWNpdHk6MC41O30KCS5zdDcye29wYWNpdHk6MC42O30KPC9zdHlsZT48Zz48Y2lyY2xlIGNsYXNzPSJzdDciIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIvPjxnPjxnPjxwYXRoIGNsYXNzPSJzdDE3IiBkPSJNNDguNiw1My45YzAsMS4xLTAuOSwyLjEtMi4xLDIuMUgxNS4xYy0xLjEsMC0yLjEtMC45LTIuMS0yLjFWMTQuN2MwLTEuMSwwLjktMi4xLDIuMS0yLjFoNy4ydjMuOWgxN3YtMy45ICAgICBoNy4yYzEuMSwwLDIuMSwwLjksMi4xLDIuMVY1My45eiIvPjwvZz48cGF0aCBjbGFzcz0ic3QxOCIgZD0iTTM2LjcsMTYuNUMzMi41LDI2LjksMjMuOCwzNSwxMywzOC4zVjE0LjdjMC0xLjEsMC45LTIuMSwyLjEtMi4xaDcuMnYzLjlIMzYuN3oiLz48cGF0aCBjbGFzcz0ic3QxOSIgZD0iTTQ4LjYsMzIuMnYyMS43YzAsMS4yLTAuOSwyLjEtMi4xLDIuMUgzMC4zQzMxLDQ0LjksMzguNSwzNS42LDQ4LjYsMzIuMnoiLz48Zz48cmVjdCBjbGFzcz0ic3QzIiBoZWlnaHQ9IjM1LjYiIHdpZHRoPSIyNy45IiB4PSIxNi45IiB5PSIxNi41Ii8+PC9nPjxnPjxyZWN0IGNsYXNzPSJzdDIiIGhlaWdodD0iMC42IiB3aWR0aD0iMjcuOSIgeD0iMTYuOSIgeT0iNTIuMSIvPjwvZz48Zz48cmVjdCBjbGFzcz0ic3Q0IiBoZWlnaHQ9IjAuNiIgd2lkdGg9IjI3LjkiIHg9IjE2LjkiIHk9IjUyLjciLz48L2c+PHBhdGggY2xhc3M9InN0MTAiIGQ9Ik0zMC44LDhjLTEuMywwLTIuMywxLTIuMywyLjNjMCwxLjMsMSwyLjMsMi4zLDIuM3MyLjMtMSwyLjMtMi4zQzMzLjEsOSwzMi4xLDgsMzAuOCw4eiBNMzAuOCwxMS43ICAgIGMtMC44LDAtMS40LTAuNi0xLjQtMS40YzAtMC44LDAuNi0xLjQsMS40LTEuNHMxLjQsMC42LDEuNCwxLjRDMzIuMiwxMS4xLDMxLjYsMTEuNywzMC44LDExLjd6Ii8+PGc+PHBhdGggY2xhc3M9InN0MTAiIGQ9Ik0zMy4xLDEwLjNjMCwxLjMtMSwyLjMtMi4zLDIuM2MtMS4zLDAtMi4zLTEtMi4zLTIuM2gtNi4ydjYuMmgxN3YtNi4ySDMzLjF6Ii8+PC9nPjxnPjxwb2x5Z29uIGNsYXNzPSJzdDQiIHBvaW50cz0iMzMuNCw1MS41IDM5LjgsNDkuMSAzNS43LDQ1ICAgICIvPjxwb2x5Z29uIGNsYXNzPSJzdDMxIiBwb2ludHM9IjM0LjMsNDkgMzMuNCw1MS41IDM1LjgsNTAuNiAgICAiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzYsNDQuN2MtMC43LDAuNy0wLjcsMS43LTAuMiwyLjJjMC42LDAuNiwxLjYsMC41LDIuMi0wLjJsMTYuMi0xNi4ybC0yLTJMMzYsNDQuN3oiLz48cGF0aCBjbGFzcz0ic3QzMiIgZD0iTTM4LjEsNDYuOGMtMC43LDAuNy0wLjcsMS43LTAuMiwyLjJjMC42LDAuNiwxLjYsMC41LDIuMi0wLjJsMTYuMi0xNi4ybC0yLTJMMzguMSw0Ni44eiIvPjxyZWN0IGNsYXNzPSJzdDMxIiBoZWlnaHQ9IjUuOCIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxIC0wLjcwNzEgMC43MDcxIDAuNzA3MSAtNS4zNTE1IDQ3LjQ4MjIpIiB3aWR0aD0iMSIgeD0iNTQuMSIgeT0iMjcuMyIvPjxwYXRoIGNsYXNzPSJzdDE5IiBkPSJNNTQsMjYuOGwtMSwxbDQuMSw0LjFsMS0xYzAuMy0wLjMsMC4zLTAuOSwwLTEuMmwtMi45LTIuOUM1NC45LDI2LjQsNTQuMywyNi40LDU0LDI2Ljh6Ii8+PC9nPjxnPjxnPjxyZWN0IGNsYXNzPSJzdDEyIiBoZWlnaHQ9IjIuMyIgd2lkdGg9IjEuNSIgeD0iMjAuNCIgeT0iMjEuMiIvPjxyZWN0IGNsYXNzPSJzdDEyIiBoZWlnaHQ9IjIuMyIgd2lkdGg9IjE3LjMiIHg9IjI0IiB5PSIyMS4yIi8+PC9nPjxnPjxyZWN0IGNsYXNzPSJzdDEyIiBoZWlnaHQ9IjIuMyIgd2lkdGg9IjEuNSIgeD0iMjAuNCIgeT0iMjYuMSIvPjxyZWN0IGNsYXNzPSJzdDEyIiBoZWlnaHQ9IjIuMyIgd2lkdGg9IjE3LjMiIHg9IjI0IiB5PSIyNi4xIi8+PC9nPjxnPjxyZWN0IGNsYXNzPSJzdDEyIiBoZWlnaHQ9IjIuMyIgd2lkdGg9IjEuNSIgeD0iMjAuNCIgeT0iMzAuOSIvPjxyZWN0IGNsYXNzPSJzdDEyIiBoZWlnaHQ9IjIuMyIgd2lkdGg9IjE3LjMiIHg9IjI0IiB5PSIzMC45Ii8+PC9nPjxnPjxyZWN0IGNsYXNzPSJzdDEyIiBoZWlnaHQ9IjIuMyIgd2lkdGg9IjEuNSIgeD0iMjAuNCIgeT0iMzUuNyIvPjxyZWN0IGNsYXNzPSJzdDEyIiBoZWlnaHQ9IjIuMyIgd2lkdGg9IjE3LjMiIHg9IjI0IiB5PSIzNS43Ii8+PC9nPjwvZz48cGF0aCBjbGFzcz0ic3QzMyIgZD0iTTMzLjEsMTAuM2MwLDAuOS0wLjUsMS43LTEuMywyLjFjMCwwLDAsMCwwLDBoNWMwLjYsMCwxLjIsMC41LDEuMiwxYzAsMC42LTAuNSwxLTEuMiwxaC01ICAgIGMtMC42LDAtMS4yLDAuNS0xLjIsMWMwLDAuNiwwLjUsMSwxLjIsMWg3LjV2LTYuMkgzMy4xeiIvPjwvZz48L2c+PC9zdmc+",
                iconClass: "warning",
                decimals: 1,
                prefix: "",
                suffix: "k",
            },
            {
                id: 3,
                label: "Sudah Kembali",
                counter: totalSelesai,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "2.52 %",
                icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNiZWJlYmU7fS5jbHMtMntmaWxsOiNhMmEyYTI7fS5jbHMtM3tmaWxsOiNkZmRmZGY7fS5jbHMtNHtmaWxsOiMwMGIzNzg7fS5jbHMtNXtmaWxsOiMwOTY7fS5jbHMtNntmaWxsOiM1OWNlYTc7fS5jbHMtN3tmaWxsOiM0Y2IwOGU7fS5jbHMtOHtmaWxsOiMwMDcxYWY7fS5jbHMtOXtmaWxsOiNlYzkwOTA7fS5jbHMtMTB7ZmlsbDojNWNhNGNjO30uY2xzLTExe2ZpbGw6IzAwNjA5NTt9LmNscy0xMntmaWxsOiM0ZThjYWU7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZS8+PGcgZGF0YS1uYW1lPSIvIEZJTExFRF9PVVRMSU5FIiBpZD0iX0ZJTExFRF9PVVRMSU5FIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zODAuNjg2MjksMjguNjg2MjlsNTQuNjI3NDIsNTQuNjI3NDJBMTYsMTYsMCwwLDEsNDQwLDk0LjYyNzQyVjM3NmExNiwxNiwwLDAsMS0xNiwxNkgyMDBhMTYsMTYsMCwwLDEtMTYtMTZWNDBhMTYsMTYsMCwwLDEsMTYtMTZIMzY5LjM3MjU4QTE2LDE2LDAsMCwxLDM4MC42ODYyOSwyOC42ODYyOVoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xOTYuODEyNjIsMzkxLjY4MDY2QTE2LjA3MDc1LDE2LjA3MDc1LDAsMCwwLDIwMCwzOTJINDI0YTE2LjAwMDA4LDE2LjAwMDA4LDAsMCwwLDE2LTE2VjEzNi4wMDAyNEM0NDAsMjczLjA4ODM4LDMzMi4yNDQzOCwzODUuMDA0NjQsMTk2LjgxMjYyLDM5MS42ODA2NloiLz48cmVjdCBjbGFzcz0iY2xzLTMiIGhlaWdodD0iMTYiIHdpZHRoPSIyMDgiIHg9IjIwOCIgeT0iMTQ0Ii8+PHJlY3QgY2xhc3M9ImNscy0zIiBoZWlnaHQ9IjE2IiB3aWR0aD0iMjA4IiB4PSIyMDgiIHk9IjE4NCIvPjxyZWN0IGNsYXNzPSJjbHMtMyIgaGVpZ2h0PSIxNiIgd2lkdGg9IjIwOCIgeD0iMjA4IiB5PSIyMjQiLz48cmVjdCBjbGFzcz0iY2xzLTMiIGhlaWdodD0iMTYiIHdpZHRoPSIyMDgiIHg9IjIwOCIgeT0iMjY0Ii8+PHJlY3QgY2xhc3M9ImNscy0xIiBoZWlnaHQ9IjE2IiB3aWR0aD0iMjA4IiB4PSIyMDgiIHk9IjMwNCIvPjxyZWN0IGNsYXNzPSJjbHMtMSIgaGVpZ2h0PSIxNiIgd2lkdGg9IjIwOCIgeD0iMjA4IiB5PSIzNDQiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00MzUuMzEzNzIsODMuMzEzNzIsMzgwLjY4NjI4LDI4LjY4NjI4QTE1Ljk3MzczLDE1Ljk3MzczLDAsMCwwLDM3NiwyNS40NTYzVjcyYTE2LjAwMDA4LDE2LjAwMDA4LDAsMCwwLDE2LDE2aDQ2LjU0MzY0QTE1Ljk3NDI0LDE1Ljk3NDI0LDAsMCwwLDQzNS4zMTM3Miw4My4zMTM3MloiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00MTYsMjgwVjI2NEg0MDUuNzM2NTFxLTQuNzQwNiw4LjE5NDM0LTEwLjA1MzEsMTZaIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMzI0LjY4NjI5LDc2LjY4NjI5bDU0LjYyNzQyLDU0LjYyNzQyQTE2LDE2LDAsMCwxLDM4NCwxNDIuNjI3NDJWNDI0YTE2LDE2LDAsMCwxLTE2LDE2SDE0NGExNiwxNiwwLDAsMS0xNi0xNlY4OGExNiwxNiwwLDAsMSwxNi0xNkgzMTMuMzcyNThBMTYsMTYsMCwwLDEsMzI0LjY4NjI5LDc2LjY4NjI5WiIvPjxwYXRoIGNsYXNzPSJjbHMtNSIgZD0iTTE0MC44MTI2Miw0MzkuNjgwNjZBMTYuMDcwNzUsMTYuMDcwNzUsMCwwLDAsMTQ0LDQ0MEgzNjhhMTYuMDAwMDgsMTYuMDAwMDgsMCwwLDAsMTYtMTZWMTg0LjAwMDI0QzM4NCwzMjEuMDg4MzgsMjc2LjI0NDM4LDQzMy4wMDQ2NCwxNDAuODEyNjIsNDM5LjY4MDY2WiIvPjxyZWN0IGNsYXNzPSJjbHMtNiIgaGVpZ2h0PSIxNiIgd2lkdGg9IjIwOCIgeD0iMTUyIiB5PSIxOTIiLz48cmVjdCBjbGFzcz0iY2xzLTYiIGhlaWdodD0iMTYiIHdpZHRoPSIyMDgiIHg9IjE1MiIgeT0iMjMyIi8+PHJlY3QgY2xhc3M9ImNscy02IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMjA4IiB4PSIxNTIiIHk9IjI3MiIvPjxyZWN0IGNsYXNzPSJjbHMtNiIgaGVpZ2h0PSIxNiIgd2lkdGg9IjIwOCIgeD0iMTUyIiB5PSIzMTIiLz48cmVjdCBjbGFzcz0iY2xzLTciIGhlaWdodD0iMTYiIHdpZHRoPSIyMDgiIHg9IjE1MiIgeT0iMzUyIi8+PHJlY3QgY2xhc3M9ImNscy03IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMjA4IiB4PSIxNTIiIHk9IjM5MiIvPjxwYXRoIGNsYXNzPSJjbHMtNiIgZD0iTTM3OS4zMTM3MiwxMzEuMzEzNzIsMzI0LjY4NjI4LDc2LjY4NjI4QTE1Ljk3MzczLDE1Ljk3MzczLDAsMCwwLDMyMCw3My40NTYzVjEyMGExNi4wMDAwOCwxNi4wMDAwOCwwLDAsMCwxNiwxNmg0Ni41NDM2NEExNS45NzQyNCwxNS45NzQyNCwwLDAsMCwzNzkuMzEzNzIsMTMxLjMxMzcyWiIvPjxwYXRoIGNsYXNzPSJjbHMtOCIgZD0iTTI2OC42ODYyOSwxMjQuNjg2MjlsNTQuNjI3NDIsNTQuNjI3NDJBMTYsMTYsMCwwLDEsMzI4LDE5MC42Mjc0MlY0NzJhMTYsMTYsMCwwLDEtMTYsMTZIODhhMTYsMTYsMCwwLDEtMTYtMTZWMTM2YTE2LDE2LDAsMCwxLDE2LTE2SDI1Ny4zNzI1OEExNiwxNiwwLDAsMSwyNjguNjg2MjksMTI0LjY4NjI5WiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtOSIgcG9pbnRzPSIxMTIgMTIwIDExMiAxODQgMTMyIDE3MiAxNTIgMTg0IDE1MiAxMjAgMTEyIDEyMCIvPjxyZWN0IGNsYXNzPSJjbHMtMTAiIGhlaWdodD0iMTYiIHdpZHRoPSIxOTIiIHg9IjEwNCIgeT0iMjE2Ii8+PHJlY3QgY2xhc3M9ImNscy0xMCIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE5MiIgeD0iMTA0IiB5PSIyNDgiLz48cmVjdCBjbGFzcz0iY2xzLTEwIiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTkyIiB4PSIxMDQiIHk9IjI4MCIvPjxyZWN0IGNsYXNzPSJjbHMtMTAiIGhlaWdodD0iNjQiIHdpZHRoPSIxOTIiIHg9IjEwNCIgeT0iMzIwIi8+PHJlY3QgY2xhc3M9ImNscy0xMCIgaGVpZ2h0PSIxNiIgd2lkdGg9Ijg4IiB4PSIxMDQiIHk9IjQwOCIvPjxyZWN0IGNsYXNzPSJjbHMtMTAiIGhlaWdodD0iMTYiIHdpZHRoPSIxOTIiIHg9IjEwNCIgeT0iNDQwIi8+PHBhdGggY2xhc3M9ImNscy0xMCIgZD0iTTMyMy4zMTM3MiwxNzkuMzEzNzJsLTU0LjYyNzQ0LTU0LjYyNzQ0QTE1Ljk3MzczLDE1Ljk3MzczLDAsMCwwLDI2NCwxMjEuNDU2M1YxNjhhMTYuMDAwMDgsMTYuMDAwMDgsMCwwLDAsMTYsMTZoNDYuNTQzNjRBMTUuOTc0MjQsMTUuOTc0MjQsMCwwLDAsMzIzLjMxMzcyLDE3OS4zMTM3MloiLz48cGF0aCBjbGFzcz0iY2xzLTExIiBkPSJNODQuODEyNjIsNDg3LjY4MDY2QTE2LjA3MDc1LDE2LjA3MDc1LDAsMCwwLDg4LDQ4OEgzMTJhMTYuMDAwMDgsMTYuMDAwMDgsMCwwLDAsMTYtMTZWMjMyLjAwMDI0QzMyOCwzNjkuMDg4MzgsMjIwLjI0NDM4LDQ4MS4wMDQ2NCw4NC44MTI2Miw0ODcuNjgwNjZaIi8+PHBhdGggY2xhc3M9ImNscy0xMiIgZD0iTTE5Ni4wMjUyNyw0NTZIMjk2VjQ0MEgyMjEuMjY2MzZBMjU2LjE1NzUsMjU2LjE1NzUsMCwwLDEsMTk2LjAyNTI3LDQ1NloiLz48cGF0aCBjbGFzcz0iY2xzLTEyIiBkPSJNMjc3Ljk4ODM0LDM4NEgyOTZWMzU2LjAyOTc5QTI1Ni4yMTYxNiwyNTYuMjE2MTYsMCwwLDEsMjc3Ljk4ODM0LDM4NFoiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik0zNjAsMzI4VjMxMkgzNDkuNzM2NTFxLTQuNzQwNiw4LjE5NDM0LTEwLjA1MzEsMTZaIi8+PHBhdGggZD0iTTQ0MC45NzAyMSw3Ny42NTYyNWwtNTQuNjI3LTU0LjYyNjk1QTIzLjg0MjU0LDIzLjg0MjU0LDAsMCwwLDM2OS4zNzI1NiwxNkgyMDBhMjQuMDI3MTgsMjQuMDI3MTgsMCwwLDAtMjQsMjRWNjRIMTQ0YTI0LjAyNzE4LDI0LjAyNzE4LDAsMCwwLTI0LDI0djI0SDg4YTI0LjAyNzE4LDI0LjAyNzE4LDAsMCwwLTI0LDI0VjQ3MmEyNC4wMjcxOCwyNC4wMjcxOCwwLDAsMCwyNCwyNEgzMTJhMjQuMDI3MTgsMjQuMDI3MTgsMCwwLDAsMjQtMjRWNDQ4aDMyYTI0LjAyNzE4LDI0LjAyNzE4LDAsMCwwLDI0LTI0VjQwMGgzMmEyNC4wMjcxOCwyNC4wMjcxOCwwLDAsMCwyNC0yNFY5NC42MjY5NUEyMy44NDM4NSwyMy44NDM4NSwwLDAsMCw0NDAuOTcwMjEsNzcuNjU2MjVaTTM4NCw0My4zMTQsNDIwLjY4Niw4MEgzOTJhOC4wMDkxNyw4LjAwOTE3LDAsMCwxLTgtOFpNMTIwLDEyOGgyNHY0MS44NzAxMmwtMTItNy4xOTkyMi0xMiw3LjE5OTIyWk0zMjAsNDcyYTguMDA5MTcsOC4wMDkxNywwLDAsMS04LDhIODhhOC4wMDkxNyw4LjAwOTE3LDAsMCwxLTgtOFYxMzZhOC4wMDkxNyw4LjAwOTE3LDAsMCwxLDgtOGgxNnY3MC4xMjk4OGwyOC0xNi44MDA3OCwyOCwxNi44MDA3OFYxMjhoOTZ2NDBhMjQuMDI3NSwyNC4wMjc1LDAsMCwwLDI0LDI0aDQwWk0yNzIsMTY4VjEzOS4zMTRMMzA4LjY4NiwxNzZIMjgwQTguMDA5MTcsOC4wMDkxNywwLDAsMSwyNzIsMTY4Wk0zNzYsNDI0YTguMDA5MTcsOC4wMDkxNywwLDAsMS04LDhIMzM2VjQwOGgyNFYzOTJIMzM2VjM2OGgyNFYzNTJIMzM2VjMyOGgyNFYzMTJIMzM2VjI4OGgyNFYyNzJIMzM2VjI0OGgyNFYyMzJIMzM2VjIwOGgyNFYxOTJIMzM2VjE5MC42MjdhMjMuODQzODUsMjMuODQzODUsMCwwLDAtNy4wMjk3OS0xNi45NzA3bC01NC42MjctNTQuNjI2OTVBMjMuODQyNTQsMjMuODQyNTQsMCwwLDAsMjU3LjM3MjU2LDExMkgxMzZWODhhOC4wMDkxNyw4LjAwOTE3LDAsMCwxLDgtOEgzMTJ2NDBhMjQuMDI3NSwyNC4wMjc1LDAsMCwwLDI0LDI0aDQwWk0zMjgsMTIwVjkxLjMxNEwzNjQuNjg2LDEyOEgzMzZBOC4wMDkxNyw4LjAwOTE3LDAsMCwxLDMyOCwxMjBaTTQzMiwzNzZhOC4wMDkxNyw4LjAwOTE3LDAsMCwxLTgsOEgzOTJWMzYwaDI0VjM0NEgzOTJWMzIwaDI0VjMwNEgzOTJWMjgwaDI0VjI2NEgzOTJWMjQwaDI0VjIyNEgzOTJWMjAwaDI0VjE4NEgzOTJWMTYwaDI0VjE0NEgzOTJWMTQyLjYyN2EyMy44NDM4NSwyMy44NDM4NSwwLDAsMC03LjAyOTc5LTE2Ljk3MDdsLTU0LjYyNy01NC42MjY5NUEyMy44NDI1NCwyMy44NDI1NCwwLDAsMCwzMTMuMzcyNTYsNjRIMTkyVjQwYTguMDA5MTcsOC4wMDkxNywwLDAsMSw4LThIMzY4VjcyYTI0LjAyNzUsMjQuMDI3NSwwLDAsMCwyNCwyNGg0MFoiLz48cmVjdCBoZWlnaHQ9IjE2IiB3aWR0aD0iMTkyIiB4PSIxMDQiIHk9IjIxNiIvPjxyZWN0IGhlaWdodD0iMTYiIHdpZHRoPSIxOTIiIHg9IjEwNCIgeT0iMjQ4Ii8+PHJlY3QgaGVpZ2h0PSIxNiIgd2lkdGg9IjE5MiIgeD0iMTA0IiB5PSIyODAiLz48cGF0aCBkPSJNMTA0LDM5MkgyOTZWMzEySDEwNFptMTYtNjRIMjgwdjQ4SDEyMFoiLz48cmVjdCBoZWlnaHQ9IjE2IiB3aWR0aD0iODgiIHg9IjEwNCIgeT0iNDA4Ii8+PHJlY3QgaGVpZ2h0PSIxNiIgd2lkdGg9IjE5MiIgeD0iMTA0IiB5PSI0NDAiLz48L2c+PC9zdmc+",
                iconClass: "success",
                decimals: 2,
                prefix: "",
                suffix: "K",
            },

        ];
        res.status(200).send({
            data: taskWidgets,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function saveDokumenRekammedis(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        if (req.body.idpencarian === 1) {
            let norec = uuid.v4().substring(0, 32)
            const t_rm_lokasidokumen = await db.t_rm_lokasidokumen.create({
                norec: norec,
                objectantreanpemeriksaanfk: req.body.norecap,
                objectunitfk: req.body.objectunittujuan,
                objectstatuskendalirmfk: 1
            }, { transaction });
            transaction && await transaction.commit();
            res.status(200).send({
                data: t_rm_lokasidokumen,
                status: "success",
                success: true,
                msg: 'Berhasil',
                code: 200
            });
        } else if (req.body.idpencarian === 2) {
            const t_rm_lokasidokumen = await db.t_rm_lokasidokumen.update({
                objectstatuskendalirmfk: 5
            }, {
                where: {
                    norec: req.body.norectrm
                }
            }, { transaction });
            transaction && await transaction.commit();
            res.status(200).send({
                data: t_rm_lokasidokumen,
                status: "success",
                success: true,
                msg: 'Berhasil',
                code: 200
            });
        } else if (req.body.idpencarian === 4) {
            // ini untuk dokumen diterima di poliklinik
            const t_rm_lokasidokumen = await db.t_rm_lokasidokumen.update({
                objectstatuskendalirmfk: 2
            }, {
                where: {
                    norec: req.body.norectrm
                }
            }, { transaction });
            transaction && await transaction.commit();
            res.status(200).send({
                data: t_rm_lokasidokumen,
                status: "success",
                success: true,
                msg: 'Berhasil',
                code: 200
            });
        }
    } catch (error) {
        logger.error(error)
        await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }
}

async function getComboLaporanRekammedis(req, res) {
    const logger = res.locals.logger
    try {
        const resultDepartemen = await pool.query(`select id as value, namainstalasi as label from m_instalasi
            where statusenabled=true
        `);

        const resultUnit = await pool.query(`select id as value, namaunit as label from m_unit
            where statusenabled=true
        `);

        const resultRekanan = await pool.query(`select id as value, namarekanan as label from m_rekanan
            where statusenabled=true
        `);

        const resultPegawai = await pool.query(`select id as value, namalengkap as label from m_pegawai
         where objectprofesipegawaifk <> 1 and statusenabled=true
        `);

        let tempres = {
            departemen: resultDepartemen.rows,
            unit: resultUnit.rows,
            rekanan: resultRekanan.rows,
            pegawai: resultPegawai.rows
        }

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function getListLaporanDaftarPasien(req, res) {
    const logger = res.locals.logger
    try {
        let start = (new Date(req.query.start)).toISOString();
        let end = (new Date(req.query.end)).toISOString();
        end = formatDate(end) + ' 23:59'
        let search = `%${req.query.search}%`
        let instalasi = req.query.instalasi !== '' ? ` and td.objectinstalasifk = '${req.query.instalasi}'` : '';
        let unit = req.query.unit !== '' ? ` and td.objectunitlastfk = '${req.query.unit}'` : '';
        let rekanan = req.query.rekanan !== '' ? ` and td.objectpenjaminfk = '${req.query.rekanan}'` : '';
        let pegawai = req.query.pegawai !== '' ? ` and td.objectpegawaifk = '${req.query.pegawai}'` : '';
        console.log(start, end, search, instalasi, unit, rekanan, pegawai)

        // const result = await pool.query(queries.qResult, [start,end,search]) //,instalasi,unit,rekanan,pegawai
        const result = await pool.query(`select td.noregistrasi,td.norec,td.nocmfk,
        to_char(td.tglregistrasi,'dd Month YYYY') as tglregistrasi,to_char(td.tglpulang,'dd Month YYYY') as tglpulang,mp.namapasien,
        mi.namainstalasi,mu.namaunit,mp.nocm,mr.namarekanan,mp2.namalengkap,td.statuspasien  from t_daftarpasien td 
        left join m_pasien mp on mp.id=td.nocmfk
        left join m_instalasi mi on mi.id=td.objectinstalasifk
        left join m_unit mu on mu.id=td.objectunitlastfk
        left join m_rekanan mr on td.objectpenjaminfk=mr.id
        left join m_pegawai mp2 on mp2.id=td.objectpegawaifk
        where td.tglregistrasi between '${start}' and '${end}' and td.statusenabled=true and td.noregistrasi ilike '${search}'
        ${instalasi} ${unit} ${rekanan} ${pegawai}
        `);

        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function getListLaporanPasienBatal(req, res) {
    const logger = res.locals.logger
    try {
        let start = (new Date(req.query.start)).toISOString();
        let end = (new Date(req.query.end)).toISOString();
        end = formatDate(end) + ' 23:59'
        let search = `%${req.query.search}%`
        let instalasi = req.query.instalasi !== '' ? ` and td.objectinstalasifk = '${req.query.instalasi}'` : '';
        let unit = req.query.unit !== '' ? ` and td.objectunitlastfk = '${req.query.unit}'` : '';
        let rekanan = req.query.rekanan !== '' ? ` and td.objectpenjaminfk = '${req.query.rekanan}'` : '';
        let pegawai = req.query.pegawai !== '' ? ` and td.objectpegawaifk = '${req.query.pegawai}'` : '';
        console.log(start, end, search, instalasi, unit, rekanan, pegawai)

        // const result = await pool.query(queries.qResult, [start,end,search]) //,instalasi,unit,rekanan,pegawai
        const result = await pool.query(`select tb.norec,tb.alasanbatal,to_char(tb.tglbatal,'dd Month YYYY HH:MM') as tglbatal,td.noregistrasi,td.norec,td.nocmfk,
        to_char(td.tglregistrasi,'dd Month YYYY') as tglregistrasi,to_char(td.tglpulang,'dd Month YYYY') as tglpulang,mp.namapasien,
        mi.namainstalasi,mu.namaunit,mp.nocm,mr.namarekanan,mp2.namalengkap,
        mp3.namalengkap as pegawaipembatal from t_batalpasien tb 
        join t_daftarpasien td on td.norec=tb.objectdaftarpasienfk 
        left join m_pasien mp on mp.id=td.nocmfk
        left join m_instalasi mi on mi.id=td.objectinstalasifk
        left join m_unit mu on mu.id=td.objectunitlastfk
        left join m_rekanan mr on td.objectpenjaminfk=mr.id
        left join m_pegawai mp2 on mp2.id=td.objectpegawaifk
        left join m_pegawai mp3 on mp3.id=tb.objectpegawaifk 
        where td.tglregistrasi between '${start}' and '${end}' and td.noregistrasi ilike '${search}'
        ${instalasi} ${unit} ${rekanan} ${pegawai}
        `);

        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }
}

async function getListLaporanPasienKunjungan(req, res) {
    try {
        let start = (new Date(req.query.start)).toISOString();
        let end = (new Date(req.query.end)).toISOString();
        end = formatDate(end) + ' 23:59'
        let search = `%${req.query.search}%`
        let instalasi = req.query.instalasi !== '' ? ` and mu.objectinstalasifk = '${req.query.instalasi}'` : '';
        let unit = req.query.unit !== '' ? ` and ta.objectunitfk = '${req.query.unit}'` : '';
        let rekanan = req.query.rekanan !== '' ? ` and td.objectpenjaminfk = '${req.query.rekanan}'` : '';
        let pegawai = req.query.pegawai !== '' ? ` and td.objectpegawaifk = '${req.query.pegawai}'` : '';
        console.log(start, end, search, instalasi, unit, rekanan, pegawai)

        // const result = await pool.query(queries.qResult, [start,end,search]) //,instalasi,unit,rekanan,pegawai
        const result = await pool.query(`select td.noregistrasi,td.norec,td.nocmfk,
        to_char(td.tglregistrasi,'dd Month YYYY') as tglregistrasi,to_char(td.tglpulang,'dd Month YYYY') as tglpulang,mp.namapasien,
        mi.namainstalasi,mu.namaunit,mp.nocm,mr.namarekanan,mp2.namalengkap  from t_daftarpasien td 
        left join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=td.norec 
        left join m_pasien mp on mp.id=td.nocmfk
        left join m_unit mu on mu.id=ta.objectunitfk
        left join m_instalasi mi on mi.id=mu.objectinstalasifk
        left join m_rekanan mr on td.objectpenjaminfk=mr.id
        left join m_pegawai mp2 on mp2.id=td.objectpegawaifk
        where td.tglregistrasi between '${start}' and '${end}' and td.statusenabled=true and td.noregistrasi ilike '${search}'
        ${instalasi} ${unit} ${rekanan} ${pegawai}
        `);

        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        });

    } catch (error) {
        res.status(500).send({ message: error });
    }

}

async function getLaporanRL3_1(req, res) {
    const logger = res.locals.logger
    try {
        let start = (new Date(req.query.start)).toISOString();
        let end = (new Date(req.query.end)).toISOString();
        end = formatDate(end) + ' 23:59'
        let search = `%${req.query.search}%`
        let instalasi = req.query.instalasi !== '' ? ` and mu.objectinstalasifk = '${req.query.instalasi}'` : '';
        let unit = req.query.unit !== '' ? ` and ta.objectunitfk = '${req.query.unit}'` : '';
        let rekanan = req.query.rekanan !== '' ? ` and td.objectpenjaminfk = '${req.query.rekanan}'` : '';
        let pegawai = req.query.pegawai !== '' ? ` and td.objectpegawaifk = '${req.query.pegawai}'` : '';
// console.log(start.toLocaleDateString())
        // const result = await pool.query(queries.qResult, [start,end,search]) //,instalasi,unit,rekanan,pegawai
        const result = await pool.query(`select mp.objectspesialisasifk,ms.reportdisplay as jenis_spesialisasi,
        to_char(td.tglregistrasi,'dd-MM-YYYY') as tglregistrasi,to_char(td.tglpulang,'dd-MM-YYYY') as tglpulang,
        td.objectcarapulangrifk,td.objectkondisipulangrifk,
        EXTRACT(DAY FROM AGE(to_char(td.tglpulang,'YYYY-MM-dd')::DATE, to_char(td.tglregistrasi,'YYYY-MM-dd')::DATE)) AS days_difference
        from t_daftarpasien td 
        join m_pegawai mp on mp.id=td.objectdokterpemeriksafk
        join m_spesialisasi ms on ms.id=mp.objectspesialisasifk
        where td.objectinstalasifk=2 and td.tglpulang between '${start}' and '${end}' and td.statusenabled=true 
        and td.tglpulang is not null
        `);

        let data10 = [];
        result.rows.forEach(element => {
            let sama = false;
            let jmlPulangHidup = 0
            let jmlMeninggalK48 = 0
            let jmlMeninggalL48 = 0
            let jmlLamaRawat = 1
            if (element.objectcarapulangrifk !== 4) {
                jmlPulangHidup = 1
            } else if (element.objectcarapulangrifk === 4) {
                if (element.objectkondisipulangrifk === 4) {
                    jmlMeninggalK48 = 1
                } else if (element.objectkondisipulangrifk === 5) {
                    jmlMeninggalL48 = 1
                }
            }

            if (element.days_difference !== 0) {
                jmlLamaRawat = element.days_difference
            }
            data10.forEach(element2 => {
                if (element.jenis_spesialisasi === element2.jenis_spesialisasi) {
                    sama = true
                    element2.jumlah = parseFloat(element2.jumlah) + 1
                    element2.jmlpulanghidup = parseFloat(element2.jmlpulanghidup) + jmlPulangHidup
                    element2.jmlmeninggalk48 = parseFloat(element2.jmlmeninggalk48) + jmlMeninggalK48
                    element2.jmlmeninggall48 = parseFloat(element2.jmlmeninggall48) + jmlMeninggalL48
                    element2.lamarawat = parseFloat(element2.lamarawat) + jmlLamaRawat
                }
            });

            if (sama === false) {
                data10.push({
                    'jenis_spesialisasi': element.jenis_spesialisasi,
                    'jumlah': 1,
                    'row': data10.length + 1,
                    'jmlpulanghidup': jmlPulangHidup,
                    'jmlmeninggalk48': jmlMeninggalK48,
                    'jmlmeninggall48': jmlMeninggalL48,
                    'lamarawat': jmlLamaRawat,
                    'objectspesialisasifk': element.objectspesialisasifk,
                    'hariperawatankl1':0,
                    'hariperawatankl2':0,
                    'hariperawatankl3':0,
                    'hariperawatanklvvip':0,
                    'hariperawatanklvip':0,
                    'hariperawatanklkhusus':0
                });

            }


        });
        for (let i = 0; i < data10.length; i++) {
            const result = await pool.query(`select count(ts.objectdokterpemeriksafk) as jml,ts.objectkelasfk from t_sensusharian ts 
                join m_pegawai mp on mp.id=ts.objectdokterpemeriksafk
                join m_spesialisasi ms on ms.id=mp.objectspesialisasifk
                where ts.tglinput between '${start}' and '${end}' and mp.objectspesialisasifk='${data10[i].objectspesialisasifk}'
                group by ts.objectkelasfk`
            );
            let jmlhariperawatan = 0
            result.rows.forEach(element => {
                jmlhariperawatan = parseFloat(jmlhariperawatan)+parseFloat(element.jml)
                if (element.objectkelasfk === 3)
                    data10[i].hariperawatankl1 = parseFloat(data10[i].hariperawatankl1)+parseFloat(element.jml)
                else if (element.objectkelasfk === 4)
                    data10[i].hariperawatankl2 = parseFloat(data10[i].hariperawatankl2)+parseFloat(element.jml)
                else if (element.objectkelasfk === 5)
                    data10[i].hariperawatankl3 = parseFloat(data10[i].hariperawatankl3)+parseFloat(element.jml)
                else if (element.objectkelasfk === 1)
                    data10[i].hariperawatanklvvip = parseFloat(data10[i].hariperawatanklvvip)+parseFloat(element.jml)
                else if (element.objectkelasfk === 2)
                    data10[i].hariperawatanklvip = parseFloat(data10[i].hariperawatanklvip)+parseFloat(element.jml)
                else
                    data10[i].hariperawatanklkhusus = parseFloat(data10[i].hariperawatanklkhusus)+parseFloat(element.jml)
            });
            data10[i].hariperawatan = jmlhariperawatan
        }



        res.status(200).send({
            data: data10,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function getSensusManual(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
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
            queryResult.rows.map(
                async (item) => {
                    if (queryResult2.rows.length === 0) {
                        const add = await db.t_sensusharian.create({
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
                        return add
                    } else {
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
                                objectkelasfk: item.objectkelasfk,
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
        res.status(200).send({
            data: queryResult2.rows.length,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}


async function getLaporanRL3_2(req, res) {
    const logger = res.locals.logger
    try {
        let start = (new Date(req.query.start)).toISOString();
        let end = (new Date(req.query.end)).toISOString();
        end = formatDate(end) + ' 23:59'
        const result = await pool.query(`
        SELECT
            ROW_NUMBER() OVER (ORDER BY mj.reportdisplay) AS row_n,
            mj.reportdisplay,
            COUNT(CASE WHEN ma.id IN (1, 2, 3) THEN ma.id END) AS rujukan,
            COUNT(CASE WHEN ma.id NOT IN (1, 2, 3) THEN ma.id END) AS nonrujukan,
            COUNT(case when td.objectstatuspulangfk=1 then td.objectstatuspulangfk END)as pulang,
            COUNT(case when td.objectstatuspulangfk=2 then td.objectstatuspulangfk END)as rawat,
            COUNT(case when td.objectstatuspulangfk=3 then td.objectstatuspulangfk END)as rujuk,
            COUNT(case when td.objectstatuspulangfk=4 then td.objectstatuspulangfk END)as matidiigd,
            COUNT(case when td.objectstatuspulangfk=5 then td.objectstatuspulangfk END)as doa
        FROM
            t_daftarpasien td
        JOIN m_jenispelayanan mj ON mj.id = td.objectjenispelayananfk
        JOIN m_asalrujukan ma ON ma.id = td.objectasalrujukanfk
        WHERE
            td.objectinstalasifk = 7 and td.tglpulang between '${start}' and '${end}' and td.statusenabled=true 
        GROUP BY
            mj.reportdisplay
        `);


        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }
}

const updatePrinted = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { norecdp } = req.body
        const {updatedDP} = await db.sequelize.transaction(async (transaction) => {
            const dpmodel = await t_daftarpasien.findOne({
                where: {
                    norec: norecdp
                },
                transaction: transaction
            })

            const updatedDP = await dpmodel.update({
                isprinted: false,
            }, {
                transaction: transaction
            })
            
            return {updatedDP}
        });
        
        const tempres = {
            updateddp: updatedDP
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL3_3 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL3_3,[req.query.start,req.query.end])

        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getDetailJenisProduk = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { jenisproduk } = req.query;

        const detailJenisProduk = await pool.query(queries.qGetDetailFromJenisProduk, [
            jenisproduk
        ])
        const tempres = {
            detailjenisproduk: detailJenisProduk.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLayananJenis = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { detailjenisproduk } = req.query;
        const layanan = await pool.query(queries.qLayananJenis, 
            [
                detailjenisproduk
            ]
        );
        const tempres = {
            layanan: layanan.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getMasterRLFromInduk = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {idInduk} = req.query;
        const masterRL = await pool.query(queries.qGetMasterRLFromInduk, [idInduk])
        const tempres = {
            masterrl: masterRL.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const createOrUpdateMapRL = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { norldetail, idproduk } = req.body;
        const {rlToProduk} = await db.sequelize.transaction(async (transaction) => {
            const rlToProduk = await m_maprltoproduk.create({
                kdprofile: 0,
                statusenabled: true,
                objectprodukfk: idproduk,
                objectmasterrlfk: norldetail, 
            }, {
                transaction: transaction
            });

            return {rlToProduk}
        });
        
        const tempres = {
            rltoproduk: rlToProduk
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLayananFromMasterRL = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { norldetail } = req.query;
        const layanan = await pool.query(queries.qLayananFromNoRL, [norldetail])
        const tempres = {
            layanan: layanan.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const deleteMapRL = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { idmaprl } = req.params;
        const {deleted} = await db.sequelize.transaction(async (transaction) => {
            const deleted = await m_maprltoproduk.findOne({
                where: {
                    id: idmaprl
                }
            })
            const deletedVal = deleted.toJSON()
            await deleted.destroy({
                transaction: transaction
            })
            return {deleted: deletedVal}
        });

        const tempres = {
            deleted: deleted
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL3_6 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL3_6,[req.query.start,req.query.end])
        
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL3_14 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL3_14,[req.query.start,req.query.end])
        
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL3_15 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL3_15,[req.query.start,req.query.end])
        const resultLos = await pool.query(queries.qDetailLaporanRL3_15,[req.query.start,req.query.end])
        for (let i = 0; i < result.rows.length; i++) {
            const element = result.rows[i];
            for (let x = 0; x < resultLos.rows.length; x++) {
                const elementx = resultLos.rows[x];
                if(element.cara_bayar===elementx.namarekanan){
                    if (elementx.los === '00') {
                        element.jumlah_lama_dirawat = parseFloat(element.jumlah_lama_dirawat)+1
                    } else {
                        if (elementx.los.substr(0, 1) === '-') {
                            element.jumlah_lama_dirawat =element.jumlah_lama_dirawat + parseFloat(elementx.los.substring(1))
                            // resultlist.rows[i].los=resultlist.rows[i].los
                        }
                    }
                }
            }
        }
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL3_11 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL3_11,[req.query.start,req.query.end])

        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL3_10 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL3_10,[req.query.start,req.query.end])

        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL5_1 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL5_1,[req.query.start,req.query.end])

        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL5_2 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL5_2,[req.query.start,req.query.end])

        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL5_3 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL5_3,[req.query.start,req.query.end])

        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLaporanRL5_4 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result = await pool.query(queries.qLaporanRL5_4,[req.query.start,req.query.end])

        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

export default {
    getListDaftarDokumenRekammedis,
    getWidgetListDaftarDokumenRekammedis,
    saveDokumenRekammedis,
    getComboLaporanRekammedis,
    getListLaporanDaftarPasien,
    getListLaporanPasienBatal,
    getListLaporanPasienKunjungan,
    getSensusManual,
    getLaporanRL3_1,
    getLaporanRL3_2,
    getDetailJenisProduk,
    getLayananJenis,
    createOrUpdateMapRL,
    getMasterRLFromInduk,
    getLayananFromMasterRL,
    deleteMapRL,
    updatePrinted,
    getLaporanRL3_3,
    getLaporanRL3_6,
    getLaporanRL3_14,
    getLaporanRL3_15,
    getLaporanRL3_11,
    getLaporanRL3_10,
    getLaporanRL5_1,
    getLaporanRL5_2,
    getLaporanRL5_3,
    getLaporanRL5_4
};