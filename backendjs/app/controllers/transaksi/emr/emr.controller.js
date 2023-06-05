const pool = require("../../../config/dbcon.query");
const uuid = require('uuid')
const queries = require('../../../queries/transaksi/registrasi.queries');
const db = require("../../../models");

const t_emrpasien = db.t_emrpasien
const t_ttv = db.t_ttv

queryPromise1 = (norecta, idlabel) => {
    return new Promise((resolve, reject) => {
        pool.query(`select norec from t_emrpasien where objectantreanpemeriksaanfk='${norecta}' and idlabel='${idlabel}'`, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};
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

async function saveEmrPasienTtv(req, res) {
    // res.status(500).send({ message: req.userId });
    // return
    const resultEmrPasien = await queryPromise1(req.body.norecap, req.body.idlabel);
    try {

        transaction = await db.sequelize.transaction();
        let norec = uuid.v4().substring(0, 32)

        if (resultEmrPasien.rowCount != 0) {
            norec = resultEmrPasien.rows[0].norec
        } else {
            const emrPasien = await db.t_emrpasien.create({
                norec: norec,
                statusenabled: true,
                label: req.body.label,
                idlabel: req.body.idlabel,
                objectantreanpemeriksaanfk: req.body.norecap,
                objectpegawaifk: req.userId,
                tglisi: new Date()
            }, { transaction });
        }
        let norecttv = uuid.v4().substring(0, 32)
        const ttv = await db.t_ttv.create({
            norec: norecttv,
            statusenabled: true,
            objectemrfk: norec,
            tinggibadan: req.body.tinggibadan,
            beratbadan: req.body.beratbadan,
            suhu: req.body.suhu,
            e: req.body.gcse,
            m: req.body.gcsm,
            v: req.body.gcsv,
            nadi: req.body.nadi,
            alergi: req.body.alergi,
            spo2: req.body.spo2,
            pernapasan: req.body.pernapasan,
            keadaanumum: req.body.keadaanumum,
            tekanandarah:req.body.tekanandarah,
            tglisi: new Date()
        }, { transaction });

        await transaction.commit();
        let tempres = { ttv: ttv }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error) {
        // console.log(error);
        if (transaction) {
            await transaction.rollback();
            res.status(500).send({ message: error });
        }
    }
}

async function getListTtv(req, res) {

    const resultNocmfk = await queryPromise2(`SELECT nocmfk
        FROM t_daftarpasien where norec='${req.query.norecdp}'
    `);
    if (resultNocmfk.rowCount === 0) {
        res.status(500).send({ message: 'Data Tidak Ada' });
        return
    }
    let nocmfk = resultNocmfk.rows[0].nocmfk
    const resultList = await queryPromise2(`SELECT row_number() OVER (ORDER BY tt.norec) AS no,dp.noregistrasi,
    to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,tt.norec, tt.objectemrfk, tt.tinggibadan,
    tt.beratbadan, tt.suhu,tt.e, tt.m, tt.v, tt.nadi, tt.alergi, tt.tekanandarah, tt.spo2, 
    tt.pernapasan,tt.keadaanumum, tt.objectpegawaifk, tt.isedit, tt.objectttvfk, tt.tglisi,
    mu.namaunit
            FROM t_daftarpasien dp 
    join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
    join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
    join t_ttv tt on tt.objectemrfk =te.norec
    join m_unit mu on mu.id=ta.objectunitfk   where dp.nocmfk='${nocmfk}' and tt.statusenabled=true
    `);
    res.status(200).send({
        data: resultList.rows,
        status: "success",
        success: true,
    });
}

async function getHeaderEmr(req, res) {
    const norecta = req.query.norecta;
    // console.log(req.query.norecdp)
    try {
        const resultCountNoantrianDokter = await queryPromise2(`select mu2.namaunit as ruanganta,mr.namarekanan,to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY Tahun mm Bulan DD Hari')) AS umur,
        mj2.jeniskelamin,td.norec as norecdp,ta.norec as norecta,mj.jenispenjamin,ta.taskid,mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
        to_char(mp.tgllahir,'dd Month YYYY') as tgllahir,mu.namaunit,
        mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter  from t_daftarpasien td 
        join m_pasien mp on mp.id=td.nocmfk 
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec
        join m_unit mu on mu.id=td.objectunitlastfk 
        left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
        join m_instalasi mi on mi.id=mu.objectinstalasifk
        join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
        left join m_jeniskelamin mj2 on mj2.id=mp.objectjeniskelaminfk
        left join m_rekanan mr on mr.id=td.objectpenjaminfk
        left join m_unit mu2 on mu2.id=ta.objectunitfk where ta.norec= '${norecta}'
        `);

        const resultTtv = await queryPromise2(`SELECT dp.noregistrasi,
            to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,tt.norec, tt.objectemrfk, tt.tinggibadan,
            tt.beratbadan, tt.suhu,tt.e, tt.m, tt.v, tt.nadi, tt.alergi, tt.tekanandarah, tt.spo2, 
            tt.pernapasan,tt.keadaanumum, tt.objectpegawaifk, tt.isedit, tt.objectttvfk, tt.tglisi,
            mu.namaunit
                    FROM t_daftarpasien dp 
            join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
            join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
            join t_ttv tt on tt.objectemrfk =te.norec
            join m_unit mu on mu.id=ta.objectunitfk where dp.norec='${req.query.norecdp}' order by tt.tglisi 
            desc limit 1
            `);
            
        let tempres = ""
        for (var i = 0; i < resultCountNoantrianDokter.rows.length; ++i) {
            if (resultCountNoantrianDokter.rows[i] !== undefined) {
                tempres = {
                    nocm: resultCountNoantrianDokter.rows[i].nocm,
                    namapasien: resultCountNoantrianDokter.rows[i].namapasien,
                    tgllahir: resultCountNoantrianDokter.rows[i].tgllahir,
                    jeniskelamin: resultCountNoantrianDokter.rows[i].jeniskelamin,
                    umur: resultCountNoantrianDokter.rows[i].umur.substring(1),
                    namarekanan: resultCountNoantrianDokter.rows[i].namarekanan,
                    ruanganta: resultCountNoantrianDokter.rows[i].ruanganta,
                    noregistrasi: resultCountNoantrianDokter.rows[i].noregistrasi,
                    beratbadan: resultTtv.rows[0].beratbadan,
                    tinggibadan: resultTtv.rows[0].tinggibadan,
                    suhu: resultTtv.rows[0].suhu,
                    nadi: resultTtv.rows[0].nadi,
                    alergi: resultTtv.rows[0].alergi,
                    tekanandarah: resultTtv.rows[0].tekanandarah,
                    spo2: resultTtv.rows[0].spo2,
                    pernapasan: resultTtv.rows[0].pernapasan,
                    keadaanumum: resultTtv.rows[0].keadaanumum,
                }

            }
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        res.status(500).send({ message: error });
    }

}

async function editEmrPasienTtv(req, res) {
    // res.status(500).send({ message: 'masuk' });
    // return
    try {

        transaction = await db.sequelize.transaction();
      
        let norecttv = uuid.v4().substring(0, 32)
        const ttv = await db.t_ttv.create({
            norec: norecttv,
            statusenabled: true,
            objectemrfk: req.body.objectemrfk,
            tinggibadan: req.body.tinggibadan,
            beratbadan: req.body.beratbadan,
            suhu: req.body.suhu,
            e: req.body.gcse,
            m: req.body.gcsm,
            v: req.body.gcsv,
            nadi: req.body.nadi,
            alergi: req.body.alergi,
            spo2: req.body.spo2,
            pernapasan: req.body.pernapasan,
            keadaanumum: req.body.keadaanumum,
            tekanandarah:req.body.tekanandarah,
            isedit:true,
            objectttvfk:req.body.norec,
            tglisi: new Date()
        }, { transaction });

        const ttvupdate = await db.t_ttv.update({
            statusenabled: false,
            tglisi: new Date()
        }, {
            where: {
                norec: req.body.norec
            }
        }, { transaction });

       

        await transaction.commit();
        let tempres = { ttv: ttv }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error) {
        // console.log(error);
        if (transaction) {
            await transaction.rollback();
            res.status(500).send({ message: error });
        }
    }
}

module.exports = {
    saveEmrPasienTtv,
    getListTtv,
    getHeaderEmr,
    editEmrPasienTtv
};