import pool from "../../../../config/dbcon.query";
import * as uuid from 'uuid';
import queries from '../../../../queries/penunjang/laboratorium/laboratorium.queries';
import db from "../../../../models";
import t_hasilpemeriksaanModel from "../../../../models/t_hasilpemeriksaan.model";
import t_hasilpemeriksaandetailModel from "../../../../models/t_hasilpemeriksaandetail.model";
import { createTransaction } from "../../../../utils/dbutils";

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
                icon: "data:image/png;base64,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",
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
                icon: "data:image/png;base64,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",
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
                icon: "data:image/png;base64,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",
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
        logger.log(error)
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

        const resultlist = await queryPromise2(`select
        mp.id,case when mp.statusenabled = true then 'AKTIF' else 'NONAKTIF' end as status,
        mp.kodeexternal,
        mp.namaproduk,md.detailjenisproduk 
    from
        m_produk mp
    join m_detailjenisproduk md on
        mp.objectdetailjenisprodukfk = md.id
    join m_jenisproduk mj on
        md.objectjenisprodukfk = mj.id
    where
        mj.id = 1 and mp.namaproduk ilike '%${req.query.param}%'
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

        let tempres = { datasatuan: resultlist.rows, datakelumur: resultlist2.rows }

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
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if(errorTransaction) return
    try {
        let filteredRowsLevel1 = req.body.data.filter((row) => row.level === 1);
        let filteredRowsLevel2 = req.body.data.filter((row) => row.level === 2);
        let filteredRowsLevel3 = req.body.data.filter((row) => row.level === 3);
        const updatepemeriksaanlab = await db.m_pemeriksaanlab.update({
            statusenabled: false
        }, {
            where: {
                objectprodukfk: req.body.objectproduk
            },
            transaction: transaction
        })
        const saveFilteredRows = async (filteredRows) => {
            return Promise.all(filteredRows.map(async (item) => {
                const pemeriksaanlablevel = await db.m_pemeriksaanlab.create({
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

                }, {
                    transaction: transaction
                })

                return pemeriksaanlablevel
            }))
        }

        const pemeriksaanlablevel1 = await saveFilteredRows(filteredRowsLevel1)
        const pemeriksaanlablevel2 = await saveFilteredRows(filteredRowsLevel2)
        const pemeriksaanlablevel3 = await saveFilteredRows(filteredRowsLevel3)


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
        logger.error(error)
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
            mp.objectkelompokumurfk
    from
        m_pemeriksaanlab mp
    join m_satuan ms on ms.id=mp.objectsatuanfk
    join m_kelompokumur mk on mk.id=mp.objectkelompokumurfk 
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
    getCetakHasilLab
};