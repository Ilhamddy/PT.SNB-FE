import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/registrasi.queries';
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";

const t_emrpasien = db.t_emrpasien
const t_ttv = db.t_ttv
const t_cppt = db.t_cppt
const t_diagnosapasien = db.t_diagnosapasien
const t_diagnosatindakan = db.t_diagnosatindakan

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
const queryPromise1 = (norecta, idlabel) => {
    return new Promise((resolve, reject) => {
        pool.query(`select norec from t_emrpasien where objectantreanpemeriksaanfk='${norecta}' and idlabel='${idlabel}'`, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};
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

async function saveEmrPasienTtv(req, res) {
    // res.status(500).send({ message: req.userId });
    // return
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
    const resultEmrPasien = await queryPromise1(req.body.norecap, req.body.idlabel);
    try {
        let rate = req.body.gcse + req.body.gcsm + req.body.gcsv
        let idgcs = null
        if (rate <= 3) {
            idgcs = 33
        } else if (rate === 4) {
            idgcs = 32
        } else if (rate >= 5 && rate <= 6) {
            idgcs = 31
        } else if (rate >= 7 && rate <= 9) {
            idgcs = 30
        } else if (rate >= 10 && rate <= 11) {
            idgcs = 29
        } else if (rate >= 12 && rate <= 13) {
            idgcs = 28
        } else if (rate >= 14 && rate <= 15) {
            idgcs = 27
        }
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
            tekanandarah: req.body.tekanandarah,
            tglisi: new Date(),
            objectgcsfk: idgcs,
            objectpegawaifk: req.idPegawai
        }, { transaction });

        await transaction.commit();
        let tempres = { ttv: ttv }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Data Tanda Vital Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        transaction && await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Simpan Data Tanda Vital Gagal',
            code: 201
        });
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
    mu.namaunit,mr.reportdisplay as namagcs
            FROM t_daftarpasien dp 
    join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
    join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
    join t_ttv tt on tt.objectemrfk =te.norec
    join m_unit mu on mu.id=ta.objectunitfk
    left join m_range mr on mr.id=tt.objectgcsfk where dp.nocmfk='${nocmfk}' and tt.statusenabled=true
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
        const resultCountNoantrianDokter = await queryPromise2(`select mu2.namaunit as ruanganta,mr.namarekanan, mp.tgllahir AS tgllahirkomplet,
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
            mu.namaunit,mr.reportdisplay as namagcs
                    FROM t_daftarpasien dp 
            join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
            join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
            join t_ttv tt on tt.objectemrfk =te.norec
            join m_unit mu on mu.id=ta.objectunitfk
            left join m_range mr on mr.id=tt.objectgcsfk where dp.norec='${req.query.norecdp}' order by tt.tglisi 
            desc limit 1
            `);
        let beratbadan = ''
        let tinggibadan = ''
        let suhu = ''
        let nadi = ''
        let alergi = ''
        let tekanandarah = ''
        let spo2 = ''
        let pernapasan = ''
        let keadaanumum = ''
        let namagcs = ''
        
        const norecdp = resultCountNoantrianDokter.rows[0].norecdp

        for (let i = 0; i < resultTtv.rows.length; ++i) {
            beratbadan = resultTtv.rows[0].beratbadan,
                tinggibadan = resultTtv.rows[0].tinggibadan,
                suhu = resultTtv.rows[0].suhu,
                nadi = resultTtv.rows[0].nadi,
                alergi = resultTtv.rows[0].alergi,
                tekanandarah = resultTtv.rows[0].tekanandarah,
                spo2 = resultTtv.rows[0].spo2,
                pernapasan = resultTtv.rows[0].pernapasan,
                keadaanumum = resultTtv.rows[0].keadaanumum,
                namagcs = resultTtv.rows[0].namagcs
        }
        let tempres = ""
        let tglLahir = resultCountNoantrianDokter.rows[0].tgllahirkomplet || new Date()
        let umur = getUmur(new Date(tglLahir), new Date())
        umur = `${umur.years} Tahun ${umur.months} Bulan ${umur.days} Hari`
        const deposit = (await pool.query(queries.qGetDepositFromPasien, [norecdp])).rows || []
        for (var i = 0; i < resultCountNoantrianDokter.rows.length; ++i) {
            if (resultCountNoantrianDokter.rows[i] !== undefined) {
                tempres = {
                    nocm: resultCountNoantrianDokter.rows[i].nocm,
                    namapasien: resultCountNoantrianDokter.rows[i].namapasien,
                    tgllahir: resultCountNoantrianDokter.rows[i].tgllahir,
                    jeniskelamin: resultCountNoantrianDokter.rows[i].jeniskelamin,
                    umur: umur,
                    namarekanan: resultCountNoantrianDokter.rows[i].namarekanan,
                    ruanganta: resultCountNoantrianDokter.rows[i].ruanganta,
                    noregistrasi: resultCountNoantrianDokter.rows[i].noregistrasi,
                    beratbadan: beratbadan,
                    tinggibadan: tinggibadan,
                    suhu: suhu,
                    nadi: nadi,
                    alergi: alergi,
                    tekanandarah: tekanandarah,
                    spo2: spo2,
                    pernapasan: pernapasan,
                    keadaanumum: keadaanumum,
                    namagcs: namagcs,
                    deposit: deposit || []
                }

            }
        }
        
        
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error });
    }

}

async function editEmrPasienTtv(req, res) {
    // res.status(500).send({ message: 'error',msg:'Edit Data Tanda Vital Gagal'  });

    // return
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
        let rate = req.body.gcse + req.body.gcsm + req.body.gcsv
        let idgcs = null
        if (rate <= 3) {
            idgcs = 33
        } else if (rate === 4) {
            idgcs = 32
        } else if (rate >= 5 && rate <= 6) {
            idgcs = 31
        } else if (rate >= 7 && rate <= 9) {
            idgcs = 30
        } else if (rate >= 10 && rate <= 11) {
            idgcs = 29
        } else if (rate >= 12 && rate <= 13) {
            idgcs = 28
        } else if (rate >= 14 && rate <= 15) {
            idgcs = 27
        }

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
            tekanandarah: req.body.tekanandarah,
            isedit: true,
            objectttvfk: req.body.norec,
            objectgcsfk: idgcs,
            tglisi: new Date(),
            objectpegawaifk: req.idPegawai
        }, { transaction });

        const ttvupdate = await db.t_ttv.update({
            statusenabled: false,
            // tglisi: new Date()
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
            msg: 'Edit Data Tanda Vital Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        transaction && await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Edit Data Tanda Vital Gagal',
            code: 201
        });
    }
}

async function saveEmrPasienCppt(req, res) {
    // res.status(500).send({ message: req.userId });
    // return
    const resultEmrPasien = await queryPromise1(req.body.norecap, req.body.idlabel);
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
        let noreccppt = uuid.v4().substring(0, 32)
        const cppt = await db.t_cppt.create({
            norec: noreccppt,
            statusenabled: true,
            objectemrfk: norec,
            subjective: req.body.subjective,
            objective: req.body.objective,
            assesment: req.body.assesment,
            plan: req.body.plan,
            tglisi: new Date(),
            objectpegawaifk: req.idPegawai
        }, { transaction });

        await transaction.commit();
        let tempres = { cppt: cppt }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        transaction && await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Simpan Gagal',
            code: 201
        });
    }
}

async function getListCppt(req, res) {

    const resultNocmfk = await queryPromise2(`SELECT nocmfk
        FROM t_daftarpasien where norec='${req.query.norecdp}'
    `);
    if (resultNocmfk.rowCount === 0) {
        res.status(500).send({ message: 'Data Tidak Ada' });
        return
    }
    let nocmfk = resultNocmfk.rows[0].nocmfk
    const resultList = await queryPromise2(`SELECT row_number() OVER (ORDER BY tt.norec) AS no,dp.noregistrasi,
    to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,tt.norec, tt.objectemrfk, tt.subjective,
    tt.objective, tt.assesment,tt.plan,mu.namaunit
            FROM t_daftarpasien dp 
    join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
    join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
    join t_cppt tt on tt.objectemrfk =te.norec
    join m_unit mu on mu.id=ta.objectunitfk where dp.nocmfk='${nocmfk}' and tt.statusenabled=true
    `);
    res.status(200).send({
        data: resultList.rows,
        status: "success",
        success: true,
    });
}

async function editEmrPasienCppt(req, res) {
    // res.status(500).send({ message: req.body });
    // return
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

        let noreccppt = uuid.v4().substring(0, 32)
        const cppt = await db.t_cppt.create({
            norec: noreccppt,
            statusenabled: true,
            objectemrfk: req.body.objectemrfk,
            subjective: req.body.subjective,
            objective: req.body.objective,
            assesment: req.body.assesment,
            plan: req.body.plan,
            isedit: true,
            objectcpptfk: req.body.norec,
            tglisi: new Date(),
            objectpegawaifk: req.idPegawai
        }, { transaction });

        const cpptupdate = await db.t_cppt.update({
            statusenabled: false,
        }, {
            where: {
                norec: req.body.norec
            }
        }, { transaction });



        await transaction.commit();
        let tempres = { cppt: cppt }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Edit Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        transaction && await transaction.rollback();
        res.status(201).send({
            status: "false",
            success: false,
            msg: 'Edit Gagal',
            code: 201
        });
    }
}

async function getListDiagnosa10(req, res) {

    const result = await queryPromise2(`SELECT id as value,kodeexternal || ' - '|| reportdisplay as label
        FROM m_icdx where reportdisplay ilike '%${req.query.namadiagnosa}%' 
        or kodeexternal ilike '%${req.query.namadiagnosa}%' limit 10
    `);
    if (result.rowCount === 0) {
        res.status(201).send({
            data: [],
            status: "success",
            success: true,
        });
        return
    }

    res.status(200).send({
        data: result.rows,
        status: "success",
        success: true,
    });
}

async function getListDiagnosa9(req, res) {

    const result = await queryPromise2(`SELECT id as value,kodeexternal || ' - '||reportdisplay as label
        FROM m_icdix where reportdisplay ilike '%${req.query.namadiagnosa}%' or kodeexternal ilike '%${req.query.namadiagnosa}%' limit 10
    `);
    if (result.rowCount === 0) {
        res.status(201).send({
            data: [],
            status: "success",
            success: true,
        });
        return
    }

    res.status(200).send({
        data: result.rows,
        status: "success",
        success: true,
    });
}

async function getListComboDiagnosa(req, res) {

    const result = await queryPromise2(`SELECT id as value,reportdisplay as label
        FROM m_tipediagnosa
    `);
    const result2 = await queryPromise2(`SELECT id as value,reportdisplay as label
        FROM m_jeniskasus
    `);

    let tempres = { tipediagnosa: result.rows, jeniskasus: result2.rows }
    res.status(200).send({
        data: tempres,
        status: "success",
        success: true,
    });
}

async function saveEmrPasienDiagnosa(req, res) {
    // res.status(500).send({ message: req.userId });
    // return
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
        let norec = uuid.v4().substring(0, 32)
        const diagnosapasien = await db.t_diagnosapasien.create({
            norec: norec,
            statusenabled: true,
            objectantreanpemeriksaanfk: req.body.norecap,
            objecttipediagnosafk: req.body.tipediagnosa,
            objecticdxfk: req.body.kodediagnosa,
            objectjeniskasusfk: req.body.kasuspenyakit,
            keterangan: req.body.keteranganicd10,
            tglinput: new Date(),
            objectpegawaifk: req.idPegawai
        }, { transaction });

        await transaction.commit();
        let tempres = { diagnosapasien: diagnosapasien }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        transaction && await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Simpan Gagal',
            code: 201
        });
    }
}

async function getListDiagnosaPasien(req, res) {

    const resultNocmfk = await queryPromise2(`SELECT nocmfk
        FROM t_daftarpasien where norec='${req.query.norecdp}'
    `);
    if (resultNocmfk.rowCount === 0) {
        res.status(500).send({ message: 'Data Tidak Ada' });
        return
    }
    let nocmfk = resultNocmfk.rows[0].nocmfk
    const resultList = await queryPromise2(`SELECT row_number() OVER (ORDER BY td.norec) AS no,dp.noregistrasi,
    to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,td.norec, mi.kodeexternal ||' - '|| mi.reportdisplay as label,
    mi.id as value, td.keterangan,td.objecttipediagnosafk,mt.reportdisplay as tipediagnosa,
    td.objectjeniskasusfk, jk.reportdisplay as jeniskasus, mu.namaunit
            FROM t_daftarpasien dp 
    join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
    join t_diagnosapasien td  on td.objectantreanpemeriksaanfk =ta.norec
    join m_unit mu on mu.id=ta.objectunitfk
    join m_tipediagnosa mt on mt.id=td.objecttipediagnosafk
    join m_jeniskasus jk on jk.id=td.objectjeniskasusfk
    join m_icdx mi on mi.id=td.objecticdxfk where dp.nocmfk='${nocmfk}' and td.statusenabled=true
    `);
    res.status(200).send({
        data: resultList.rows,
        status: "success",
        success: true,
    });
}

async function getListDiagnosaIxPasien(req, res) {

    const resultNocmfk = await queryPromise2(`SELECT nocmfk
        FROM t_daftarpasien where norec='${req.query.norecdp}'
    `);
    if (resultNocmfk.rowCount === 0) {
        res.status(500).send({ message: 'Data Tidak Ada' });
        return
    }
    let nocmfk = resultNocmfk.rows[0].nocmfk
    const resultList = await queryPromise2(`SELECT row_number() OVER (ORDER BY td.norec) AS no,dp.noregistrasi,
    to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,td.norec,mu.namaunit,
    mi.kodeexternal ||' - '|| mi.reportdisplay as label,
    mi.id as value, td.keterangan, td.qty
            FROM t_daftarpasien dp 
    join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
    join t_diagnosatindakan td  on td.objectantreanpemeriksaanfk =ta.norec
    join m_unit mu on mu.id=ta.objectunitfk
    join m_icdix mi on mi.id=td.objecticdixfk where dp.nocmfk='${nocmfk}' and td.statusenabled=true
    `);
    res.status(200).send({
        data: resultList.rows,
        status: "success",
        success: true,
    });
}

async function saveEmrPasienDiagnosaix(req, res) {
    // res.status(500).send({ message: req.userId });
    // return
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

        let norec = uuid.v4().substring(0, 32)
        const diagnosatindakan = await db.t_diagnosatindakan.create({
            norec: norec,
            statusenabled: true,
            objectantreanpemeriksaanfk: req.body.norecap,
            objecticdixfk: req.body.kodediagnosa9,
            keterangan: req.body.keteranganicd9,
            tglinput: new Date(),
            objectpegawaifk: req.idPegawai,
            qty:req.body.jumlahtindakan
        }, { transaction });

        await transaction.commit();
        let tempres = { diagnosatindakan: diagnosatindakan }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        transaction && await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Simpan Gagal',
            code: 201
        });
    }
}

async function deleteEmrPasienDiagnosax(req, res) {

    // res.status(500).send({ message: req.query });
    // return
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
        const t_diagnosapasien = await db.t_diagnosapasien.update({
            statusenabled: false,
            // tglisi: new Date()
        }, {
            where: {
                norec: req.params.norec
            }
        }, { transaction });


        await transaction.commit();

        res.status(200).send({
            data: "success",
            status: "success",
            success: true,
            msg: 'Delete Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Delete Gagal',
            code: 201
        });
    }
}

async function deleteEmrPasienDiagnosaix(req, res) {

    // res.status(500).send({ message: req.query });
    // return
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
        const t_diagnosatindakan = await db.t_diagnosatindakan.update({
            statusenabled: false,
            // tglisi: new Date()
        }, {
            where: {
                norec: req.params.norec
            }
        }, { transaction });


        await transaction.commit();

        res.status(200).send({
            data: "success",
            status: "success",
            success: true,
            msg: 'Delete Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        transaction && await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Delete Gagal',
            code: 201
        });
    }
}

async function saveEmrPasienKonsul(req, res) {
    // res.status(500).send({ message: req.body });
    // return
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
        const resultNocmfk = await queryPromise2(`SELECT norec,objectdaftarpasienfk,objectunitfk
        FROM t_antreanpemeriksaan where norec='${req.body.norecap}'
    `);

        if (resultNocmfk.rowCount === 0) {
            res.status(500).send({ message: 'Data Tidak Ada' });
            return
        }
        let today = new Date();
        let todayMonth = '' + (today.getMonth() + 1)
        if (todayMonth.length < 2)
            todayMonth = '0' + todayMonth;
        let todayDate = '' + (today.getDate() + 1)
        if (todayDate.length < 2)
            todayDate = '0' + todayDate;
        let todaystart = formatDate(today)
        let todayend = formatDate(today) + ' 23:59'

        let queryNoAntrian = `select count(noantrian)  from t_antreanpemeriksaan ta
        join m_pegawai mp on mp.id=ta.objectdokterpemeriksafk where ta.objectdokterpemeriksafk='${req.body.doktertujuan}' 
        and ta.tglmasuk between '${todaystart}' and '${todayend}'`

        var resultCountNoantrianDokter = await pool.query(queryNoAntrian);
        let noantrian = parseFloat(resultCountNoantrianDokter.rows[0].count) + 1



        let norec = uuid.v4().substring(0, 32)
        const antreanPemeriksaan = await db.t_antreanpemeriksaan.create({
            norec: norec,
            objectdaftarpasienfk: resultNocmfk.rows[0].objectdaftarpasienfk,
            tglmasuk: new Date(),
            tglpulang: new Date(),
            objectdokterpemeriksafk: req.body.doktertujuan,
            objectunitfk: req.body.unittujuan,
            objectunitasalfk: resultNocmfk.rows[0].objectunitfk,
            noantrian: noantrian,
            statusenabled: true,
            objectpegawaifk: req.idPegawai,
            taskid:3,
            objectkelasfk:8
        }, { transaction });
        let norectrm = uuid.v4().substring(0, 32)
        const t_rm_lokasidokumen = await db.t_rm_lokasidokumen.create({
            norec: norectrm,
            objectantreanpemeriksaanfk: norec,
            objectunitfk: req.body.unittujuan,
            objectstatuskendalirmfk: 3
        }, { transaction });
      

        await transaction.commit();
        let tempres = { antreanPemeriksaan: antreanPemeriksaan,lokasidokumen:t_rm_lokasidokumen }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        transaction && await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Simpan Gagal',
            code: 201
        });
    }
}

async function updateTaskid(req, res) {
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
        const antreanpemeriksaan = await db.t_antreanpemeriksaan.update({
            taskid: req.body.taskid
        }, {
            where: {
                norec: req.body.norec
            }
        }, { transaction });
        console.log(antreanpemeriksaan);
        await transaction.commit();
        let tempres = { antreanpemeriksaan: antreanpemeriksaan }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Panggil Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        transaction && await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Panggil Gagal',
            code: 201
        });
    }
}

async function updateStatusPulangRJ(req, res) {
    const [transaction, errorTransaction] = await createTransaction()
    try {
        if(errorTransaction) return
        const daftarpasien = await db.t_daftarpasien.update({
            objectstatuspulangfk: req.body.statuspulang,
            tglpulang: new Date()
        }, {
            where: {
                norec: req.body.norec
            },
            transaction: transaction
        });
        const antreanpemeriksaan = await db.t_antreanpemeriksaan.update({
            taskid: 5
        }, {
            where: {
                norec: req.body.norecta
            },
            transaction: transaction
        });
        await transaction.commit();
        let tempres = { daftarpasien: daftarpasien,antreanpemeriksaan:antreanpemeriksaan }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Status Pulang Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Simpan Status Pulang Gagal',
            code: 201
        });
    }
}


function getUmur (dateOfBirth, tillDate) {
    var dob = new Date (dateOfBirth);
    var endDt = new Date (tillDate) || new Date ();
    var age = {};
    age.years = endDt.getUTCFullYear () - dob.getUTCFullYear ();
    age.months = endDt.getUTCMonth () - dob.getUTCMonth ();
    age.days = endDt.getUTCDate () - dob.getUTCDate ();
    if (age.days < 0) {
      age.months--;
      var daysInMonth = new Date (endDt.getUTCFullYear (), endDt.getUTCMonth (), 0).getUTCDate ();
      age.days += daysInMonth;
    }
    if (age.months < 0) {
      age.years--;
      age.months += 12;
    }
    return age;
}


export default {
    saveEmrPasienTtv,
    getListTtv,
    getHeaderEmr,
    editEmrPasienTtv,
    saveEmrPasienCppt,
    getListCppt,
    editEmrPasienCppt,
    getListDiagnosa10,
    getListDiagnosa9,
    getListComboDiagnosa,
    saveEmrPasienDiagnosa,
    getListDiagnosaPasien,
    getListDiagnosaIxPasien,
    saveEmrPasienDiagnosaix,
    deleteEmrPasienDiagnosax,
    deleteEmrPasienDiagnosaix,
    saveEmrPasienKonsul,
    updateTaskid,
    updateStatusPulangRJ
};