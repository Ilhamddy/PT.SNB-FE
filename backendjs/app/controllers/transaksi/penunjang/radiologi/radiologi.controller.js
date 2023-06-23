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

async function saveOrderPelayanan(req, res) {


    try {

        transaction = await db.sequelize.transaction();
        let today = new Date();
        let todayMonth = '' + (today.getMonth() + 1)
        if (todayMonth.length < 2)
            todayMonth = '0' + todayMonth;
        let todaystart = formatDate(today)
        let todayend = formatDate(today) + ' 23:59'
        
        const resultcount = await queryPromise2(`select count(norec) from t_orderpelayanan
        where tglinput between '${todaystart}' and '${todayend}'
        `);
        
        let noorder = parseFloat(resultcount.rows[0].count) + 1
        for (let x = resultcount.rows[0].count.toString().length; x < 4; x++) {
            noorder = '0' + noorder;
        }
        let norec = uuid.v4().substring(0, 32)
        const t_orderpelayanan = await db.t_orderpelayanan.create({
            norec: norec,
            objectjenisorderfk: 2,
            objectantreanpemeriksaanfk: req.body.norecap,
            nomororder: 'OR'+today.getFullYear() + todayMonth.toString() + noorder,
            objectpegawaifk: req.idPegawai,
            tglinput: new Date(),
            objectunitasalfk: req.body.objectunitasal,
            objectstatusveriffk: 1,
            keterangan: req.body.keterangan
        }, { transaction });
  
        for (var i = 0; i < req.body.listtindakan.length; ++i) {
            let norecdop = uuid.v4().substring(0, 32)
            const t_detailorderpelayanan = await db.t_detailorderpelayanan.create({
                norec: norecdop,
                objectorderpelayananfk: norec,
                objectprodukfk: req.body.listtindakan[i].tindakan,
                objectkelasfk: 8,
                harga: req.body.listtindakan[i].harga,
                objectstatusveriffk: 1,
                qty: req.body.listtindakan[i].qty
            }, { transaction });
            
        }
        await transaction.commit();
        res.status(200).send({
            data: req.body,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });



        // let tempres = { statu: t_rm_lokasidokumen }

    } catch (error) {
        // console.log(error);
        if (transaction) {
            await transaction.rollback();
            res.status(201).send({
                status: "false",
                success: false,
                msg: 'Gagal',
                code: 201
            });
        }
    }
}

async function getListHistoryOrder(req, res) {

    try {
       
        const resultlist = await queryPromise2(`select td.noregistrasi,to2.nomororder,to2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH:mm') as tglinput  from t_daftarpasien td 
        join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
        join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
        join m_pegawai mp on mp.id=to2.objectpegawaifk 
        join m_unit mu ON mu.id=ta.objectunitfk 
        where td.norec='${req.query.norecdp}' and to2.objectjenisorderfk=2
        `);
        for (var i = 0; i < resultlist.rows.length; ++i) {
            const resultlistOrder = await queryPromise2(`select mp.namaproduk  from t_detailorderpelayanan td  
            join m_produk mp on mp.id=td.objectprodukfk where
            td.objectorderpelayananfk ='${resultlist.rows[i].norec}'`);
            let tempOrder = ''
            for (var x = 0; x < resultlistOrder.rows.length; ++x) {
                tempOrder = tempOrder +resultlistOrder.rows[x].namaproduk +', '
            }
            resultlist.rows[i].namaproduk = tempOrder
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

async function getWidgetListDaftarOrderRadiologi(req, res) {


    try {
        let tglregistrasi = ""
        if (req.query.start !== undefined) {

            tglregistrasi = ` and to2.tglinput between '${req.query.start}'
         and '${req.query.end} 23:59' `;
        } else {
            // console.log('massuukk')
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            tglregistrasi = ` and to2.tglinput between '${todaystart}'
        and '${todayend}' `;
        }
        const resultlistantreanpemeriksaan = await queryPromise2(`select td.noregistrasi,to2.nomororder,to2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH:mm') as tglinput,
        ms.statusverif,to2.objectstatusveriffk  from t_daftarpasien td 
        join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
        join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
        join m_pegawai mp on mp.id=to2.objectpegawaifk 
        join m_unit mu ON mu.id=ta.objectunitfk 
        join m_statusverif ms on ms.id=to2.objectstatusveriffk
        where to2.objectjenisorderfk=2 ${tglregistrasi}
        `);

        let totalBelum = 0
        let totalVerif = 0
        let totalTolak = 0
        for (let x = 0; x < resultlistantreanpemeriksaan.rows.length; x++) {
            if (resultlistantreanpemeriksaan.rows[x].objectstatusveriffk == 3) {
                totalTolak = totalTolak + 1
            } else if (resultlistantreanpemeriksaan.rows[x].objectstatusveriffk == 1) {
                totalBelum = totalBelum + 1
            } else {
                totalVerif = totalVerif + 1
            }
        }
        const taskWidgets = [
            {
                id: 1,
                label: "Belum Verif",
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
                label: "Sudah Verif",
                counter: totalVerif,
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
                label: "Ditolak",
                counter: totalTolak,
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
        res.status(500).send({ message: error });
    }

}

module.exports = {
    saveOrderPelayanan,
    getListHistoryOrder,
    getWidgetListDaftarOrderRadiologi
};