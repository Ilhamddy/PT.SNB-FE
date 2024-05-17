import pool from "../../../../config/dbcon.query";
import * as uuid from 'uuid';
import queries from '../../../../queries/penunjang/laboratorium/laboratorium.queries';
import db from "../../../../models";
import t_hasilpemeriksaanModel from "../../../../models/t_hasilpemeriksaan.model";
import t_hasilpemeriksaandetailModel from "../../../../models/t_hasilpemeriksaandetail.model";
import { createTransaction } from "../../../../utils/dbutils";
import { imageBelumVerif, imageDitolak, imageSudahVerif } from "./image";

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
    const logger = res.locals.logger
    try {
        // res.locals.showBodyRes()
        const resultlist = await pool.query(`select id as value, detailjenisproduk as label,'' as detail  from m_detailjenisproduk md 
        where md.objectjenisprodukfk = 1 and md.statusenabled=true
        `);
        for (var i = 0; i < resultlist.rows.length; ++i) {

            const resultlistOrder = await pool.query(`select mp.id,mp.kodeexternal , 
            case 
                when mp."level" = 1 then mp.reportdisplay
                when mp."level" = 2 then '  '||mp.reportdisplay
                when mp."level" = 3 then '    '||mp.reportdisplay
            end as label, mp.objectindukfk , mp."level" , mp.urutan, mp.objectprodukfk as value,
            mp2.objectdetailjenisprodukfk from m_pemeriksaanlab mp 
            join m_produk mp2 on mp.objectprodukfk = mp2.id 
            where mp2.objectdetailjenisprodukfk = '${resultlist.rows[i].value}' and mp.statusenabled=true
            order by mp.kodeexternal`);
            let tempOrder = []
            for (var x = 0; x < resultlistOrder.rows.length; ++x) {
                if (resultlistOrder.rows[x].level === 1) {
                    const resultlistantreanpemeriksaan = await queryPromise2(`select mp.namaproduk as label,mp.id as value,mth.objectkelasfk,mm.objectunitfk,mu.reportdisplay,mth.totalharga  from m_mapunittoproduk mm
                        join m_produk mp on mp.id=mm.objectprodukfk
                        join m_unit mu on mu.id=mm.objectunitfk
                        join m_totalhargaprodukbykelas mth on mth.objectprodukfk=mp.id
                        where mth.objectkelasfk =8 and mm.objectunitfk =12 
                        and mp.id =${resultlistOrder.rows[x].value}`);
                    for (let y = 0; y < resultlistantreanpemeriksaan.rows.length; y++) {
                        resultlistOrder.rows[x].harga = 0
                        
                        resultlistOrder.rows[x].harga = resultlistantreanpemeriksaan.rows[y].totalharga
                    }
                    resultlistOrder.rows[x].subdata = []
                    tempOrder.push(resultlistOrder.rows[x])
                } else if (resultlistOrder.rows[x].level === 2) {
                    for (let y = 0; y < tempOrder.length; y++) {
                        if (tempOrder[y].value === resultlistOrder.rows[x].value) {
                            tempOrder[y].subdata.push(resultlistOrder.rows[x])
                        }
                    }
                } else {
                    for (let y = 0; y < tempOrder.length; y++) {
                        if (tempOrder[y].value === resultlistOrder.rows[x].value) {
                            for (let z = 0; z < tempOrder[y].subdata.length; z++) {
                                if (tempOrder[y].subdata[z].id === resultlistOrder.rows[x].objectindukfk) {
                                    if (tempOrder[y].subdata[z].subsubdata === undefined) {
                                        tempOrder[y].subdata[z].subsubdata = []
                                    }
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
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function saveOrderPelayanan(req, res) {
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    const logger = res.locals.logger
    try {
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
            objectjenisorderfk: 1,
            objectantreanpemeriksaanfk: req.body.norecap,
            nomororder: 'OL' + today.getFullYear() + todayMonth.toString() + noorder,
            objectpegawaifk: req.idPegawai,
            tglinput: new Date(),
            objectunitasalfk: req.body.objectunitasal,
            objectstatusveriffk: 1,
            keterangan: req.body.keterangan
        }, { transaction });
        console.log(req.body.listtindakan)
        for (var i = 0; i < req.body.listtindakan.length; ++i) {
            let norecdop = uuid.v4().substring(0, 32)
            const t_detailorderpelayanan = await db.t_detailorderpelayanan.create({
                norec: norecdop,
                objectorderpelayananfk: norec,
                objectprodukfk: req.body.listtindakan[i].value,
                objectkelasfk: 8,
                harga: req.body.listtindakan[i].harga,
                objectstatusveriffk: 1,
                qty: 1
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
        logger.error(error);
        await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }
}

async function getListHistoryOrder(req, res) {
    const logger = res.locals.logger
    try {

        const resultlist = await queryPromise2(`select td.noregistrasi,to2.nomororder,to2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput  from t_daftarpasien td 
        join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
        join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
        join m_pegawai mp on mp.id=to2.objectpegawaifk 
        join m_unit mu ON mu.id=ta.objectunitfk 
        where td.norec='${req.query.norecdp}' and to2.objectjenisorderfk=1
        `);
        for (var i = 0; i < resultlist.rows.length; ++i) {
            const resultlistOrder = await queryPromise2(`select mp.namaproduk  from t_detailorderpelayanan td  
            join m_produk mp on mp.id=td.objectprodukfk where
            td.objectorderpelayananfk ='${resultlist.rows[i].norec}'`);
            let tempOrder = ''
            for (var x = 0; x < resultlistOrder.rows.length; ++x) {
                tempOrder = tempOrder + resultlistOrder.rows[x].namaproduk + ', '
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
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function getWidgetListDaftarOrderLaboratorium(req, res) {
    const logger = res.locals.logger
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
            mp.namalengkap, 
            mu.namaunit,
            to2.keterangan,
            to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
            ms.statusverif,to2.objectstatusveriffk  from t_daftarpasien td 
            join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
            join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
            join m_pegawai mp on mp.id=to2.objectpegawaifk 
            join m_unit mu ON mu.id=ta.objectunitfk 
            join m_statusverif ms on ms.id=to2.objectstatusveriffk
            where to2.objectjenisorderfk=1 ${tglregistrasi}
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
                icon: imageBelumVerif,
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
                icon: imageSudahVerif,
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
                icon: imageDitolak,
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

async function getDaftarListHistoryOrder(req, res) {
    const logger = res.locals.logger
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
        const resultlist = await queryPromise2(`select td.noregistrasi,to2.nomororder,to2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
        ms.statusverif,to2.objectstatusveriffk,mps.namapasien,
        case when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
        when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mps.objectjeniskelaminfk=1 then 'anaklaki'
        when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mps.objectjeniskelaminfk=2 then 'anakperempuan'
        when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mps.objectjeniskelaminfk=1 then 'dewasalaki'
        when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mps.objectjeniskelaminfk=2 then 'dewasaperempuan'
        when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mps.objectjeniskelaminfk=1 then 'kakek'
        when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mps.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile from t_daftarpasien td 
        join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
        join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
        join m_pegawai mp on mp.id=to2.objectpegawaifk 
        join m_unit mu ON mu.id=ta.objectunitfk 
        join m_statusverif ms on ms.id=to2.objectstatusveriffk
        join m_pasien mps on mps.id=td.nocmfk
        where  td.noregistrasi ilike '%${req.query.noregistrasi}%' and to2.objectjenisorderfk=1 ${tglregistrasi}
        `);

        let tempres = resultlist.rows

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
async function getListOrderByNorecOrder(req, res) {
    const logger = res.locals.logger
    try {
        const resultlist = await queryPromise2(`select td.noregistrasi,to2.nomororder,td2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
        mp2.namaproduk,td2.harga ,td2.iscito, td2.qty, td2.qty*td2.harga as total,
        to_char(td2.tglperjanjian,'yyyy-MM-dd HH24:MI') as tglperjanjian,
        mpeg.namalengkap as pegawaiverif, mkr.namakamar from t_daftarpasien td 
        join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
        join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
        join m_pegawai mp on mp.id=to2.objectpegawaifk 
        join m_unit mu ON mu.id=ta.objectunitfk 
        join t_detailorderpelayanan td2 on td2.objectorderpelayananfk=to2.norec 
        join m_produk mp2 on mp2.id=td2.objectprodukfk 
        left join m_pegawai mpeg on mpeg.id=to2.objectpegawaiveriffk
        left join m_kamar mkr on mkr.id=td2.objectkamarfk
        where to2.norec='${req.query.norec}' and td2.statusenabled=true
        `);

        let tempres = resultlist.rows

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

async function updateTglRencanaLaboratorium(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const t_detailorderpelayanan = await db.t_detailorderpelayanan.update({
            tglperjanjian: req.body.tglinput,
        }, {
            where: {
                norec: req.body.norecselected
            }
        }, { transaction });
        await transaction.commit();

        res.status(200).send({
            data: t_detailorderpelayanan,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        logger.error(error)
        transaction && await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }

}

async function saveUserVerifikasi(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const resultlist = await queryPromise2(`select td.norec as norectd,td2.objectprodukfk,to2.objectunitasalfk,
        td.noregistrasi,to2.nomororder,td2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
        mp2.namaproduk,td2.harga ,td2.iscito, td2.qty, td2.qty*td2.harga as total,
        to_char(td2.tglperjanjian,'yyyy-MM-dd HH24:MI') as tglperjanjian,
        mpeg.namalengkap as pegawaiverif, mkr.namakamar from t_daftarpasien td 
        join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
        join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
        join m_pegawai mp on mp.id=to2.objectpegawaifk 
        join m_unit mu ON mu.id=ta.objectunitfk 
        join t_detailorderpelayanan td2 on td2.objectorderpelayananfk=to2.norec 
        join m_produk mp2 on mp2.id=td2.objectprodukfk 
        left join m_pegawai mpeg on mpeg.id=to2.objectpegawaiveriffk
        left join m_kamar mkr on mkr.id=td2.objectkamarfk
        where to2.norec='${req.body.norec}' and td2.statusenabled=true
        `);
        // console.log(resultlist.rows[0].norec)
        let tempres = resultlist.rows[0].norectd

        let norecAP = uuid.v4().substring(0, 32)
        const t_antreanpemeriksaan = await db.t_antreanpemeriksaan.create({
            norec: norecAP,
            objectdaftarpasienfk: resultlist.rows[0].norectd,
            tglmasuk: req.body.tglinput,
            tglkeluar: req.body.tglinput,
            objectunitfk: 12,
            objectkelasfk: 8,
            taskid: 3,
            statusenabled: true,
            objectunitasalfk: resultlist.rows[0].objectunitasalfk,
        }, { transaction });

        for (let x = 0; x < resultlist.rows.length; x++) {
            const resultlistantreanpemeriksaan = await queryPromise2(`select mh.harga,mh.objectkomponenprodukfk,mk.reportdisplay  from m_hargaprodukperkomponen mh
        join m_totalhargaprodukbykelas mt on mt.id=mh.objecttotalhargaprodukbykelasfk
        join m_komponenproduk mk on mk.id=mh.objectkomponenprodukfk 
        where mt.objectprodukfk =${resultlist.rows[x].objectprodukfk} and mt.objectkelasfk=8`);

            let norecpp = uuid.v4().substring(0, 32)

            const pelayananpasien = await db.t_pelayananpasien.create({
                norec: norecpp,
                objectantreanpemeriksaanfk: norecAP,
                harga: resultlist.rows[x].harga,
                qty: resultlist.rows[x].qty,
                total: resultlist.rows[x].qty * resultlist.rows[x].harga,
                tglinput: req.body.tglinput,
                objectprodukfk: resultlist.rows[x].objectprodukfk,
                objectpegawaifk: req.idPegawai,
                objectkelasfk: 8,

            }, { transaction });
            for (let i = 0; i < resultlistantreanpemeriksaan.rowCount; i++) {
                let norecppd = uuid.v4().substring(0, 32)
                const pelayananpasiend = await db.t_pelayananpasiendetail.create({
                    norec: norecppd,
                    objectpelayananpasienfk: norecpp,
                    objectkomponenprodukfk: resultlistantreanpemeriksaan.rows[i].objectkomponenprodukfk,
                    harga: resultlistantreanpemeriksaan.rows[i].harga,
                    qty: resultlist.rows[x].qty,
                }, { transaction });

            }
            // console.log(pelayananpasien.norec)
            const t_detailorderpelayanan = await db.t_detailorderpelayanan.update({
                objectpelayananpasienfk: pelayananpasien.norec
            }, {
                where: {
                    norec: resultlist.rows[x].norec
                }
            }, { transaction });
        }

        const t_orderpelayanan = await db.t_orderpelayanan.update({
            objectpegawaiveriffk: req.idPegawai,
            objectstatusveriffk: 2,
        }, {
            where: {
                norec: req.body.norec
            }
        }, { transaction });
        await transaction.commit();

        res.status(200).send({
            data: t_antreanpemeriksaan,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        transaction && await transaction.rollback();
        logger.error(error)
        res.status(201).send({
            status: "false",
            success: false,
            msg: error,
            code: 201
        });
    }

}

async function getDaftarPasienLaboratorium(req, res) {
    const logger = res.locals.logger
    try {
        const noregistrasi = req.query.noregistrasi;
        let tglregistrasi = ""
        if (req.query.start !== undefined) {

            tglregistrasi = ` and ta.tglmasuk between '${req.query.start}'
         and '${req.query.end} 23:59' `;
        } else {
            // console.log('massuukk')
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            tglregistrasi = ` and ta.tglmasuk between '${todaystart}'
        and '${todayend}' `;
        }
        const resultlist = await queryPromise2(`select mu2.namaunit as unitasal,ta.tglmasuk,td.norec as norecdp,ta.norec as norecta,mj.jenispenjamin,ta.taskid,mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
        to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
        mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter,
        trm.objectstatuskendalirmfk as objectstatuskendalirmfkap, 
        trm.norec as norectrm,to_char(td.tglpulang,'yyyy-MM-dd') as tglpulang,
        case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
        when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
        when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
        when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
        when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
        when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
        when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile from t_daftarpasien td 
        join m_pasien mp on mp.id=td.nocmfk 
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec
        join m_unit mu on mu.id=ta.objectunitfk 
        left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
        join m_instalasi mi on mi.id=mu.objectinstalasifk
        join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
        left join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec
        left join m_unit mu2 on mu2.id=ta.objectunitasalfk 
        where td.noregistrasi ilike '%${noregistrasi}%'
        ${tglregistrasi} and mu.objectinstalasifk =4
        `);


        let tempres = resultlist.rows

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

async function getTransaksiPelayananLaboratoriumByNorecDp(req, res) {
    const logger = res.locals.logger
    try {

        const resultlist = await queryPromise2(`select row_number() OVER (ORDER BY tp.norec) AS no,
        mu.namaunit,
        to_char(tp.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
        mp.namaproduk,
        tp.norec,
        tp.harga,
        tp.qty,
        tp.discount,
        tp.jasa,
        '' as petugas,
        case when tp.iscito=true then '✓' else '✕' end as statuscito,
        tp.total,
        mp2.namalengkap as pegawaipengirim,
        mu2.namaunit as unitpengirim,
        td2.tglperjanjian,to2.nomororder
    from
        t_daftarpasien td
    join t_antreanpemeriksaan ta on
        td.norec = ta.objectdaftarpasienfk
    join m_unit mu on
        mu.id = ta.objectunitfk
    join t_pelayananpasien tp on
        tp.objectantreanpemeriksaanfk = ta.norec
    join m_produk mp on
        mp.id = tp.objectprodukfk
     left join t_detailorderpelayanan td2 
     on td2.objectpelayananpasienfk=tp.norec
     left join t_orderpelayanan to2 on to2.norec=td2.objectorderpelayananfk
     left join m_pegawai mp2 on mp2.id=to2.objectpegawaifk 
     left join m_unit mu2 on mu2.id=ta.objectunitasalfk 
        where td.norec='${req.query.norecdp}' and mu.objectinstalasifk =4
        `);
        let resultsNilaiNormal = await Promise.all(
            resultlist.rows.map(async (item) => {
                const norecpp = item.norec;
                const listnilainormal = await pool.query(queries.qResult, [norecpp])
                return {
                    ...item,
                    listnilainormal: listnilainormal.rows
                }
            }
            ))

        let tempres = resultsNilaiNormal

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

async function getMasterLayananLaboratorium(req, res) {
    const logger = res.locals.logger
    try {
        let filterstatus = ` `
        if(req.query.status===2){
            filterstatus = ` and mp.statusenabled=true `
        }else if(req.query.status===3){
            filterstatus = ` and mp.statusenabled=false `
        }
        const resultlist = await queryPromise2(`select
        mp.id,mp.statusenabled,
        mp.kodeexternal,
        mp.namaproduk,md.detailjenisproduk,ml.code as kodesatusehat
    from
        m_produk mp
    join m_detailjenisproduk md on
        mp.objectdetailjenisprodukfk = md.id
    join m_jenisproduk mj on
        md.objectjenisprodukfk = mj.id
    left join m_pemeriksaanlab mpl on
        mp.id = mpl.objectprodukfk
    left join m_loinc ml on
        mpl.objectloincfk = ml.id
    where
        mj.id = 1 AND mpl.statusenabled = TRUE and mpl.objectindukfk is null ${filterstatus} and mp.namaproduk ilike '%${req.query.param}%'
        `);


        let tempres = resultlist.rows

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

async function getComboLaboratorium(req, res) {
    const logger = res.locals.logger
    
    try {

        const resultlist = await queryPromise2(`select ms.id as value,
        ms.satuan as label from m_satuan ms
        where kodeexternal ='lab' `);

        const resultlist2 = await queryPromise2(`select row_number() OVER (ORDER BY mk.id) AS no, mk.id as value, mk.kelompokumur as label,case when mk.statusenabled=true then 'AKTIF' else 'NON AKTIF' end as status
         from m_kelompokumur mk `);
        const resultlist3 = await queryPromise2(`select mj.id as value,mj.reportdisplay as label from m_jenishasillab mj`);
        const resultlist4 = await queryPromise2(`select row_number() OVER (ORDER BY ml.id) as no, ml.id as value,ml.namapemeriksaan as label,ml.display,ml.code,ml.id from m_loinc ml`)
        const resultlist5 = await queryPromise2(`select row_number() OVER (ORDER BY ml.id) as no, ml.id as value,ml.display as label,ml.code from m_spesimen ml`)
        const resultlist6 = await queryPromise2(`select row_number() OVER (ORDER BY ml.id) as no, ml.id as value,ml.namapemeriksaan as label,ml.code,ml.display from m_loinchasillab  ml
        `)

        let tempres = { datasatuan: resultlist.rows, datakelumur: resultlist2.rows,
        jenishasillab:resultlist3.rows,kodesatusehat:resultlist4.rows,spesimen:resultlist5.rows,
        loinchasillab:resultlist6.rows }

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
async function saveMasterNilaiNormal(req, res) {
    let transaction = null;
    try {
        transaction = await db.sequelize.transaction();
    } catch (e) {
        console.error(e)
        res.status(201).send({
            status: e.message,
            success: false,
            msg: 'Simpan Gagal',
            code: 201
        });
    }
    try {
        let filteredRowsLevel1 = req.body.data.filter((row) => row.level === 1);
        let filteredRowsLevel2 = req.body.data.filter((row) => row.level === 2);
        let filteredRowsLevel3 = req.body.data.filter((row) => row.level === 3);
        const updatepemeriksaanlab = await db.m_pemeriksaanlab.update({
            statusenabled: false
        }, {
            where: {
                objectprodukfk: req.body.objectproduk},
            transaction: transaction
        })

        const pemeriksaanlablevel1 = await Promise.all(
            filteredRowsLevel1.map(async (item) => {
                const pemeriksaanlablevel1 = await db.m_pemeriksaanlab.create({
                    statusenabled: true,
                    kodeexternal: item.kode,
                    namaexternal: item.nama,
                    reportdisplay: item.nama,
                    objectprodukfk: req.body.objectproduk,
                    objectsatuanfk: item.satuan,
                    level: item.level,
                    urutan: item.urutan,
                    objectkelompokumurfk: item.kelompokumur,
                    tglinput: new Date(),
                    tglupdate: new Date(),
                    objectpegawaiinputfk: req.idPegawai,
                    objectjenishasillabfk: item.jenishasillab,
                    objectloincfk: item.kodesatusehat,
                    objectspesimenfk: item.spesimen,
                }, {
                    transaction: transaction
                })
                return pemeriksaanlablevel1
            }
            ))

        const pemeriksaanlablevel2 = await Promise.all(
            filteredRowsLevel2.map(async (item) => {
                const pemeriksaanlablevel2 = await db.m_pemeriksaanlab.create({
                    statusenabled: true,
                    kodeexternal: item.kode,
                    namaexternal: item.nama,
                    reportdisplay: item.nama,
                    objectprodukfk: req.body.objectproduk,
                    objectsatuanfk: item.satuan,
                    level: item.level,
                    urutan: item.urutan,
                    objectkelompokumurfk: item.kelompokumur,
                    tglinput: new Date(),
                    tglupdate: new Date(),
                    objectpegawaiinputfk: req.idPegawai,
                    objectindukfk: pemeriksaanlablevel1[0].id,
                    id_temp: item.id,
                    objectjenishasillabfk: item.jenishasillab,
                    objectloincfk: item.kodesatusehat,
                    objectspesimenfk: item.spesimen,
                }, {
                    transaction: transaction
                })
                return pemeriksaanlablevel2
            }))
        const pemeriksaanlablevel3 = await Promise.all(
            filteredRowsLevel3.map(async (item) => {
                pemeriksaanlablevel2.map(async (itemx) => {
                    if (item.objectinduk === itemx.id_temp) {
                        let reqtemp = {
                            statusenabled: true,
                            kodeexternal: item.kode,
                            namaexternal: item.nama,
                            reportdisplay: item.nama,
                            objectprodukfk: req.body.objectproduk,
                            objectsatuanfk: item.satuan,
                            level: item.level,
                            urutan: item.urutan,
                            objectkelompokumurfk: item.kelompokumur,
                            tglinput: new Date(),
                            tglupdate: new Date(),
                            objectpegawaiinputfk: req.idPegawai,
                            objectindukfk: itemx.id,
                            objectjenishasillabfk: item.jenishasillab,
                            objectloincfk: item.kodesatusehat,
                            objectspesimenfk: item.spesimen,
                        };
                        const resultlistlevel3 = await someFunctionUsingSaveMasterNilaiNormal2(reqtemp);
                    }
                })
            }
            ))
        await transaction.commit();
        let tempres = { pemeriksaanlablevel1, pemeriksaanlablevel2 }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        transaction && await transaction.rollback();
        console.log(error)
        res.status(201).send({
            status: "false",
            success: false,
            msg: error,
            code: 201
        });
    }

}

async function someFunctionUsingSaveMasterNilaiNormal2(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const pemeriksaanlablevel3 = await db.m_pemeriksaanlab.create({
            statusenabled: true,
            kodeexternal: req.kodeexternal,
            namaexternal: req.namaexternal,
            reportdisplay: req.reportdisplay,
            objectprodukfk: req.objectprodukfk,
            objectsatuanfk: req.objectsatuanfk,
            level: req.level,
            urutan: req.urutan,
            objectkelompokumurfk: req.objectkelompokumurfk,
            tglinput: new Date(),
            tglupdate: new Date(),
            objectpegawaiinputfk: req.objectpegawaiinputfk,
            objectindukfk: req.objectindukfk,
            objectjenishasillabfk: req.jenishasillab,
            objectloincfk: req.kodesatusehat,
            objectspesimenfk: req.spesimen,
        }, {
            transaction
        })
        await transaction.commit(); // Commit the initial transaction
        // console.log(pemeriksaanlablevel3)
    } catch (error) {
        logger.error('Error executing query:', error);
    }
}

async function saveMasterKelompokUmur(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        let status = true
        if (req.body.status_enabled === 2)
            status = false
        const masterkelompokumur = await db.m_kelompokumur.create({
            statusenabled: status,
            kodeexternal: req.body.namakelompokumur,
            namaexternal: req.body.namakelompokumur,
            reportdisplay: req.body.namakelompokumur,
            kelompokumur: req.body.namakelompokumur
        }, {
            transaction: transaction
        })


        await transaction.commit();
        let tempres = { masterkelompokumur }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        transaction && await transaction.rollback();
        logger.error(error)
        res.status(201).send({
            status: "false",
            success: false,
            msg: error,
            code: 201
        });
    }

}

async function getListDetailKelompokUmur(req, res) {
    const logger = res.locals.logger
    try {

        const resultlist = await queryPromise2(`select
        row_number() over (
        order by md.id) as no,
        md.id,
        md.kdprofile,
        case when md.statusenabled=true then 'AKTIF' else 'NON AKTIF' end as status,
        md.kodeexternal,
        md.objectkelompokumurfk,
        md.reportdisplay,
        md.detailkelompokumur,
        md.statusumur,
        md.umurmin,
        md.umurmax,
        mk.kelompokumur 
    from
        m_detailkelompokumur md
    join m_kelompokumur mk on mk.id=md.objectkelompokumurfk where md.objectkelompokumurfk=${req.query.param}
    and md.statusenabled=true`);

        res.status(200).send({
            data: resultlist.rows,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function saveMasterDetailKelompokUmur(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        let masterdetailkelompokumur = null
        let status_enabled = true
        if (req.body.status === 0)
            status_enabled = false
        if (req.body.iddkelumur === '') {
            masterdetailkelompokumur = await db.m_detailkelompokumur.create({
                statusenabled: true,
                kodeexternal: req.body.detailkelompokumur,
                objectkelompokumurfk: req.body.idkelumur,
                reportdisplay: req.body.detailkelompokumur,
                detailkelompokumur: req.body.detailkelompokumur,
                statusumur: req.body.statusumur,
                umurmin: req.body.umurmin,
                umurmax: req.body.umurmax
            }, {
                transaction: transaction
            })
        } else {
            masterdetailkelompokumur = await db.m_detailkelompokumur.update({
                statusenabled: status_enabled,
                kodeexternal: req.body.detailkelompokumur,
                objectkelompokumurfk: req.body.idkelumur,
                reportdisplay: req.body.detailkelompokumur,
                detailkelompokumur: req.body.detailkelompokumur,
                statusumur: req.body.statusumur,
                umurmin: req.body.umurmin,
                umurmax: req.body.umurmax
            }, {
                where: {
                    id: req.body.iddkelumur
                },
                transaction: transaction
            })
        }



        await transaction.commit();
        let tempres = { masterdetailkelompokumur }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });

    } catch (error) {
        transaction && await transaction.rollback();
        logger.error(error)
        res.status(201).send({
            status: "false",
            success: false,
            msg: error,
            code: 201
        });
    }

}

async function getListSetNilaiNormal(req, res) {
    const logger = res.locals.logger
    try {

        const resultlist = await queryPromise2(`select
        row_number() over (
            order by mp.id) as no,
            mp.id,
            mp.kodeexternal,
            mp.reportdisplay,
            ms.satuan,
            mk.kelompokumur,
            mp.objectkelompokumurfk,
            mj.reportdisplay as jenishasillab
    from
        m_pemeriksaanlab mp
    join m_satuan ms on ms.id=mp.objectsatuanfk
    join m_kelompokumur mk on mk.id=mp.objectkelompokumurfk
    left join m_jenishasillab mj on mj.id=mp.objectjenishasillabfk
    where
        mp.objectprodukfk = ${req.query.param}
        and mp.statusenabled = true
    order by
        mp.kodeexternal asc`);

        res.status(200).send({
            data: resultlist.rows,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function getListSetNilaiNormalDetail(req, res) {
    const logger = res.locals.logger
    try {

        const resultlist = await queryPromise2(`select
        row_number() over (
            order by md.id) as no,
            md.id,
        md.detailkelompokumur,
        mn.nilaimin,
        mn.nilaimax,
        mn.nilaitext,
        mn.nilaikritis,
        mn.objectjeniskelaminfk,
        mn.id as idnilainormal,
        mp.id as objectpemeriksaanlabfk
    from
        m_detailkelompokumur md
    join m_pemeriksaanlab mp on
        md.objectkelompokumurfk = mp.objectkelompokumurfk
    left join m_nilainormallab mn on mn.objectpemeriksaanlabfk = mp.id and md.id=mn.objectdetailkelompokumurfk 
    where
        mp.id = ${req.query.idpemeriksaan} and md.objectkelompokumurfk=${req.query.kelompokumur} and mp.statusenabled=true`);

        let filteredRowsjkL = resultlist.rows.filter((row) => row.objectjeniskelaminfk === 1);
        let filteredRowsjkP = resultlist.rows.filter((row) => row.objectjeniskelaminfk === 2);
        if (filteredRowsjkL.length === 0) {
            for (let i = 0; i < resultlist.rows.length; i++) {
                filteredRowsjkL.push({
                    id: resultlist.rows[i].id,
                    detailkelompokumur: resultlist.rows[i].detailkelompokumur,
                    nilaimin: '', nilaimax: '', nilaitext: '', nilaikritis: '', idnilainormal: ''
                })
            }
        }
        if (filteredRowsjkP.length === 0) {
            for (let i = 0; i < resultlist.rows.length; i++) {
                filteredRowsjkP.push({
                    id: resultlist.rows[i].id,
                    detailkelompokumur: resultlist.rows[i].detailkelompokumur,
                    nilaimin: '', nilaimax: '', nilaitext: '', nilaikritis: '', idnilainormal: ''
                })
            }

        }
        let tempres = { datap: filteredRowsjkP, datal: filteredRowsjkL }
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

async function saveSetMasterNilaiNormalLab(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        const inputNilaiLab = (data, objectjeniskelamin) =>
            data.map(async (item) => {
                let nilainormallabp = null
                if (item.idnilainormal === '') {
                    nilainormallabp = await db.m_nilainormallab.create({
                        statusenabled: true,
                        namaexternal: req.body.header.namaPemeriksaan,
                        reportdisplay: req.body.header.namaPemeriksaan,
                        objectpemeriksaanlabfk: req.body.header.idnamaPemeriksaan,
                        objectjeniskelaminfk: objectjeniskelamin,
                        objectdetailkelompokumurfk: item.id,
                        metodepemeriksaan: req.body.header.metode,
                        nilaimin: item.nilaimin,
                        nilaimax: item.nilaimax,
                        nilaitext: item.nilaitext,
                        nilaikritis: item.nilaikritis,
                        tglinput: new Date(),
                        tglupdate: new Date(),
                        objectpegawaiinputfk: req.idPegawai,
                        tipedata: req.body.header.tipedata
                    }, {
                        transaction: transaction
                    })
                } else {
                    nilainormallabp = await db.m_nilainormallab.update({
                        statusenabled: true,
                        namaexternal: req.body.header.namaPemeriksaan,
                        reportdisplay: req.body.header.namaPemeriksaan,
                        objectpemeriksaanlabfk: req.body.header.idnamaPemeriksaan,
                        objectjeniskelaminfk: objectjeniskelamin,
                        objectdetailkelompokumurfk: item.id,
                        metodepemeriksaan: req.body.header.metode,
                        nilaimin: item.nilaimin,
                        nilaimax: item.nilaimax,
                        nilaitext: item.nilaitext,
                        nilaikritis: item.nilaikritis,
                        tglupdate: new Date(),
                        objectpegawaiupdatefk: req.idPegawai,
                        tipedata: req.body.header.tipedata
                    }, {
                        where: {
                            id: item.idnilainormal
                        },
                        transaction: transaction
                    })
                }
                return nilainormallabp
            })

        const nilainormallab = await Promise.all(
            inputNilaiLab(req.body.datal, 1)
        )

        const nilainormallabp = await Promise.all(
            inputNilaiLab(req.body.datap, 2)
        )
        await transaction.commit();
        let tempres = { nilainormallab, nilainormallabp }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });
    } catch (error) {
        transaction && await transaction.rollback();
        logger.error(error)
        res.status(201).send({
            status: "false",
            success: false,
            msg: error,
            code: 201
        });
    }

}

async function saveSetNilaiNormalt(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        let tempData = req.body.data
        let saveHasilPemeriksaan
        let norechasilpemeriksaan = uuid.v4().substring(0, 32)
        if(tempData[0].objecthasilpemeriksaanfk===null){
            
            saveHasilPemeriksaan = await db.t_hasilpemeriksaan.create({
                norec: norechasilpemeriksaan,
                statusenabled: true,
                objectpelayananpasienfk: tempData[0].norecpelayanan,
                objectpegawaiinputfk: req.idPegawai,
                objectpegawaiupdatefk: req.idPegawai,
                tglinput: new Date(),
                tglupdate: new Date()
            }, {
                transaction: transaction
            })


        }else{
            norechasilpemeriksaan = tempData[0].objecthasilpemeriksaanfk
        }
        const inputNilaiLab = (data) =>
            data.map(async (item) => {
                let saveHasilPemeriksaanDetail = null
                if (item.objecthasilpemeriksaanfk === null) {
                    let norecdetailhasilpemeriksaan = uuid.v4().substring(0, 32)
                    saveHasilPemeriksaanDetail = await db.t_hasilpemeriksaandetail.create({
                        norec:norecdetailhasilpemeriksaan,
                        statusenabled: true,
                        objecthasilpemeriksaanfk: norechasilpemeriksaan,
                        objectpemeriksaanlabfk: item.idpemeriksaanlab,
                        objectnilainormallabfk: item.idnilainormallab,
                        nilaihasil: item.nilaihasil,
                        metode: item.metodepemeriksaan,
                        nilaikritis: item.nilaikritis,
                        keterangan: item.keterangan
                    }, {
                        transaction: transaction
                    })
                } else {
                    saveHasilPemeriksaanDetail = await db.t_hasilpemeriksaandetail.update({
                        statusenabled: true,
                        objecthasilpemeriksaanfk: norechasilpemeriksaan,
                        objectpemeriksaanlabfk: item.idpemeriksaanlab,
                        objectnilainormallabfk: item.idnilainormallab,
                        nilaihasil: item.nilaihasil,
                        metode: item.metodepemeriksaan,
                        nilaikritis: item.nilaikritis,
                        keterangan: item.keterangan
                    }, {
                        where: {
                            norec: item.norecdetailhasil
                        },
                        transaction: transaction
                    })
                }
                return saveHasilPemeriksaanDetail
            })

            const nilainormallabDetail = await Promise.all(
                inputNilaiLab(tempData, 1)
            )

        await transaction.commit();
        let tempres = { saveHasilPemeriksaan, nilainormallabDetail }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Berhasil',
            code: 200
        });
    } catch (error) {
        transaction && await transaction.rollback();
        logger.error(error)
        res.status(201).send({
            status: "false",
            success: false,
            msg: error,
            code: 201
        });
    }

}

async function getCetakHasilLab(req, res){
    const logger = res.locals.logger
    try {
        let norecArray = req.query.norec.split(',');
        const resultlist = await pool.query(queries.qResultCetakHasil, [norecArray])
        for (let i = 0; i < resultlist.rows.length; i++) {
            if(resultlist.rows[i].tipedata===1){
                if(parseFloat(resultlist.rows[i].nilaihasil) < parseFloat(resultlist.rows[i].nilaimin)){
                    resultlist.rows[i].nilaihasil = resultlist.rows[i].nilaihasil+'*'
                }else if(parseFloat(resultlist.rows[i].nilaihasil) > parseFloat(resultlist.rows[i].nilaimax)){
                    resultlist.rows[i].nilaihasil = resultlist.rows[i].nilaihasil+'*'
                }
            }else if(resultlist.rows[i].tipedata===2){
                if(resultlist.rows[i].nilaihasil.toLowerCase() !== resultlist.rows[i].nilaimin.toLowerCase()){
                    resultlist.rows[i].nilaihasil = resultlist.rows[i].nilaihasil+'*'
                }
            }
        }
        res.status(200).send({
            data: resultlist.rows,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

const getListMasterHasilLab = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const listnilainormal = await pool.query(queries.qGetListMasterHasilLab,[req.query.id]) 
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: listnilainormal.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}

export default {
    getDetailJenisProdukLab,
    saveOrderPelayanan,
    getListHistoryOrder,
    getWidgetListDaftarOrderLaboratorium,
    getDaftarListHistoryOrder,
    getListOrderByNorecOrder,
    updateTglRencanaLaboratorium,
    saveUserVerifikasi,
    getDaftarPasienLaboratorium,
    getTransaksiPelayananLaboratoriumByNorecDp,
    getMasterLayananLaboratorium,
    getComboLaboratorium,
    saveMasterNilaiNormal,
    saveMasterKelompokUmur,
    getListDetailKelompokUmur,
    saveMasterDetailKelompokUmur,
    getListSetNilaiNormal,
    getListSetNilaiNormalDetail,
    saveSetMasterNilaiNormalLab,
    saveSetNilaiNormalt,
    getCetakHasilLab,
    getListMasterHasilLab
};