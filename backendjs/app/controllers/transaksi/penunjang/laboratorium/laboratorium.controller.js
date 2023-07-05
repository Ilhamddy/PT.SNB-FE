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
                if (resultlistOrder.rows[x].level === 1) {
                    const resultlistantreanpemeriksaan = await queryPromise2(`select mp.namaproduk as label,mp.id as value,mth.objectkelasfk,mm.objectunitfk,mu.reportdisplay,mth.totalharga  from m_mapunittoproduk mm
                        join m_produk mp on mp.id=mm.objectprodukfk
                        join m_unit mu on mu.id=mm.objectunitfk
                        join m_totalhargaprodukbykelas mth on mth.objectmapunittoprodukfk=mm.id and mth.objectprodukfk=mp.id
                        where mth.objectkelasfk =8 and mm.objectunitfk =12 
                        and mp.id =${resultlistOrder.rows[x].value}`);
                    for (let y = 0; y < resultlistantreanpemeriksaan.rows.length; y++) {
                        resultlistOrder.rows[x].harga = 0
                        resultlistOrder.rows[x].label =resultlistOrder.rows[x].label+` (${resultlistantreanpemeriksaan.rows[y].totalharga})`
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
                                    tempOrder[y].subdata[z].subsubdata = []
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


async function saveOrderPelayanan(req, res) {
    let transaction = null;

    try{
        transaction = await db.sequelize.transaction();
    }catch(e){
        console.error(e)
        res.status(201).send({
            status: e.message,
            success: false,
            msg: 'Simpan Gagal',
            code: 201
        });
    }
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
        console.error(error);
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

    try {

        const resultlist = await queryPromise2(`select td.noregistrasi,to2.nomororder,to2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH:mm') as tglinput  from t_daftarpasien td 
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
        res.status(500).send({ message: error });
    }

}


export default {
    getDetailJenisProdukLab,
    saveOrderPelayanan,
    getListHistoryOrder
};