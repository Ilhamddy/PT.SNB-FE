import pool from "../../../../config/dbcon.query";
import queryBankDarah from "../../../../queries/penunjang/bankDarah/bankDarah.queries"
import db from "../../../../models";
import queryTypes from "sequelize/lib/query-types";
import * as uuid from 'uuid'

const getDetailJenisProdukBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultlist = await pool.query(`select id as value, detailjenisproduk as label,'' as detail  from m_detailjenisproduk md 
        where md.objectjenisprodukfk = 14 and md.statusenabled=true
        `);
        for (var i = 0; i < resultlist.rows.length; ++i) {

            const resultlistOrder = await pool.query(`select
            mp2.id,mp2.id as value,
            mp2.namaproduk as label,
            1 as level,mp2.objectdetailjenisprodukfk,0 as harga,0 as totalharga
        from
            m_produk mp2 
            where mp2.objectdetailjenisprodukfk = '${resultlist.rows[i].value}' and mp2.statusenabled=true
            order by mp2.namaproduk`);
            resultlist.rows[i].detail = resultlistOrder.rows
            for (var x = 0; x < resultlistOrder.rows.length; ++x) {
                let dataGet = (await pool.query(queryBankDarah.qGetDarahFromUnit, [resultlistOrder.rows[x].value])).rows[0]
                resultlistOrder.rows[x].harga = dataGet.totalharga,
                resultlistOrder.rows[x].totalharga = dataGet.totalharga
            }
        }
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: resultlist.rows,
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

const upsertOrderPelayananBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { t_orderpelayanan,t_detailorderpelayanan}=await db.sequelize.transaction(async (transaction) => {
            let t_detailorderpelayanan
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'

            const resultcount = (await db.sequelize.query(`select count(norec) from t_orderpelayanan
            where tglinput between :todaystart and :todayend and objectjenisorderfk=4`, {
                replacements: {
                    todaystart: todaystart,
                    todayend:todayend
                },
                transaction: transaction,
                type: queryTypes.SELECT
            }))[0]
            let noorder = parseFloat(resultcount.count) + 1
            for (let x = resultcount.count.toString().length; x < 4; x++) {
                noorder = '0' + noorder;
            }
            let norec = uuid.v4().substring(0, 32)
            const t_orderpelayanan = await db.t_orderpelayanan.create({
                norec: norec,
                objectjenisorderfk: 4,
                objectantreanpemeriksaanfk: req.body.norecap,
                nomororder: 'OBDR' + today.getFullYear() + todayMonth.toString() + noorder,
                objectpegawaifk: req.idPegawai,
                tglinput: new Date(),
                objectunitasalfk: req.body.objectunitasal,
                objectstatusveriffk: 1,
                keterangan: req.body.keterangan
            }, { transaction });

            for (var i = 0; i < req.body.listtindakan.length; ++i) {
                let norecdop = uuid.v4().substring(0, 32)
                t_detailorderpelayanan = await db.t_detailorderpelayanan.create({
                    norec: norecdop,
                    objectorderpelayananfk: norec,
                    objectprodukfk: req.body.listtindakan[i].value,
                    objectkelasfk: 8,
                    harga: req.body.listtindakan[i].harga,
                    objectstatusveriffk: 1,
                    qty: req.body.listtindakan[i].totalpesan
                }, { transaction });

            }
            return {t_orderpelayanan,t_detailorderpelayanan}
        });
        
        const tempres = {
            t_orderpelayanan,t_detailorderpelayanan
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

const getRiwayatOrderBankDarah = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultlist = await pool.query(`select td.noregistrasi,to2.nomororder,to2.norec,
        mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput  from t_daftarpasien td 
        join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
        join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
        join m_pegawai mp on mp.id=to2.objectpegawaifk 
        join m_unit mu ON mu.id=ta.objectunitfk 
        where td.norec='${req.query.norecdp}' and to2.objectjenisorderfk=4
        `);
        for (var i = 0; i < resultlist.rows.length; ++i) {
            const resultlistOrder = await pool.query(`select mp.namaproduk  from t_detailorderpelayanan td  
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
            msg: 'Success',
            code: 200,
            data: tempres,
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

export default{
    getDetailJenisProdukBankDarah,
    upsertOrderPelayananBankDarah,
    getRiwayatOrderBankDarah
}

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