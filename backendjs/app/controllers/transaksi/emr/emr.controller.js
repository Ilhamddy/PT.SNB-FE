import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/registrasi.queries';
import { qGetObatFromUnit, qGetOrderResepFromDP, qGetOrderVerifResepFromDP,
qAsesmenBayiLahirByNorec,qComboApgar,qComboSebabKematian,qComboApgarScore,
qHistoryAsesmenBayiLahir, 
qGetAntreanPemeriksaanObat,qGetNilaiNormalTtv,qGetTtvByNorec,qGetSumberData,qGetListKeluhanUtama,
qGetStatusPsikologis,qGetListAlergi,qGetListPengkajianAwalKeperawatan,
qListKfa,qTransportasiKedatangan, qGetRiwayatPenyakitPribadi,qGetRiwayatAlergi,qGetRiwayatAlergiObat, qGetBadan,
qGetAsesmenAwalIGD,qHistorySkriningIGD,
qInterpretasiResiko,
qGetPasienFromDP,qGetDiagnosaPrimary,qGetTotalTagihan} from "../../../queries/emr/emr.queries";
import hubunganKeluargaQueries from "../../../queries/mastertable/hubunganKeluarga/hubunganKeluarga.queries";
import jenisKelaminQueries from "../../../queries/mastertable/jenisKelamin/jenisKelamin.queries";
import db from "../../../models";
import {
    createTransaction,
    updateNullToString
} from "../../../utils/dbutils";
import satuSehatQueries from "../../../queries/satuSehat/satuSehat.queries";
import { hProcessOrderResep } from "../farmasi/farmasi.controller";
import { calculateAge, getDateEnd, getDateStart } from "../../../utils/dateutils";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import { hUpsertOrderObatSatuSehat } from "../satuSehat/satuSehatMedication.helper";
import { hUpsertEncounterPulang } from "../satuSehat/satuSehatEncounter.helper";
import { hUpsertNyeri, hUpsertRiwayatPengobatan,hUpsertRisikoDecubitus } from "../satuSehat/satuSehatObservation.helper";
import { hUpsertSkriningBatuk,hUpsertSkriningGizi } from "../satuSehat/satuSehatQuestionnaireResponse.helper";
import satuanQueries from "../../../queries/mastertable/satuan/satuan.queries";
import { hupsertConditionRiwayatPenyakit,hupsertConditionDiagnosa } from "../satuSehat/satuSehatCondition.helper";
import { hupsertAllergyRiwayatAlergi } from "../satuSehat/satuSehatAllergyIntolerance.helper";
import { hupsertGrouping }from "../casemix/casemix.helper"

const t_emrpasien = db.t_emrpasien
const t_ttv = db.t_ttv
const t_cppt = db.t_cppt
const t_diagnosapasien = db.t_diagnosapasien
const t_diagnosatindakan = db.t_diagnosatindakan
const t_orderresep = db.t_orderresep
const t_orderresepdetail = db.t_orderresepdetail

const Op = db.Sequelize.Op;

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

const saveEmrPasienTtv = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultEmrPasien = await queryPromise1(req.body.norecap, req.body.idlabel);
        const rate = req.body.gcse + req.body.gcsm + req.body.gcsv;
        const { codeNadi } =await evaluateNadi(req.body.norecdp, req.body.nadi);
        const { codePernapasan} =await evaluatePernapasan(req.body.norecdp, req.body.pernapasan);
        const { codeSuhu} =await evaluateSuhu(req.body.norecdp, req.body.suhu);
        const { codeSistol} =await evaluateSistol(req.body.norecdp, req.body.sistole);
        const { codeDiastol} =await evaluateDiastol(req.body.norecdp, req.body.diastole);
        const idgcs = await getGcsId(rate);
        let norec = uuid.v4().substring(0, 32)
        const {emrPasien,ttv}=await db.sequelize.transaction(async (transaction) => {
            let emrPasien
            if (resultEmrPasien.rowCount != 0) {
                norec = resultEmrPasien.rows[0].norec
            } else {
                emrPasien = await db.t_emrpasien.create({
                    norec: norec,
                    statusenabled: true,
                    label: req.body.label,
                    idlabel: req.body.idlabel,
                    objectantreanpemeriksaanfk: req.body.norecap,
                    objectpegawaifk: req.userId,
                    tglisi: new Date()
                }, { 
                    transaction 
                });
            }
            let norecttv = uuid.v4().substring(0, 32)
            let ttv = await db.t_ttv.create({
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
                objectpegawaifk: req.idPegawai,
                sistole:req.body.sistole,
                diastole:req.body.diastole,
                objecthasilnadifk:codeNadi,
                objecthasilpernapasanfk:codePernapasan,
                objecthasilsuhufk:codeSuhu,
                objecthasilsistolfk:codeSistol,
                objecthasildiastolfk:codeDiastol
            }, { transaction });
            return {emrPasien,ttv}
        });
        
        const tempres = { ttv: ttv }
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

async function getListTtv(req, res) {
    const logger = res.locals.logger
    try {
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
        mu.namaunit,mr.reportdisplay as namagcs,tt.ihs_nadi,tt.ihs_pernapasan,case when tt.status_ihs_nadi=true then 'btn-soft-info' else 'btn-soft-danger'
        end as status_nadi,case when tt.status_ihs_pernapasan=true then 'btn-soft-info' else 'btn-soft-danger'
        end as status_pernafasan,case when tt.status_ihs_suhu=true then 'btn-soft-info' else 'btn-soft-danger'
        end as status_suhu,tt.ihs_suhu,tt.sistole || '/'||tt.diastole as sistolediastole,tt.sistole,tt.diastole,
        case when tt.status_ihs_sistole=true then 'btn-soft-info' else 'btn-soft-danger'
        end as status_sistole,
        case when tt.status_ihs_diastole=true then 'btn-soft-info' else 'btn-soft-danger'
        end as status_diastole,tt.ihs_sistole,tt.ihs_diastole,mh.code as codenadi,mh.display as displaynadi,mh.teks as teksnadi,
        mh2.code as codepernapasan,mh2.display as displaypernapasan,mh2.teks as tekspernapasan,
        case when tt.status_ihs_kesadaran=true then 'btn-soft-info' else 'btn-soft-danger'
        end as status_kesadaran,tt.status_ihs_kesadaran,tt.ihs_kesadaran
                FROM t_daftarpasien dp 
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
        join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
        join t_ttv tt on tt.objectemrfk =te.norec
        join m_unit mu on mu.id=ta.objectunitfk
        join m_hasilnilaittv mh on mh.id=tt.objecthasilnadifk
        join m_hasilnilaittv mh2 on mh2.id=tt.objecthasilpernapasanfk
        left join m_range mr on mr.id=tt.objectgcsfk where dp.nocmfk='${nocmfk}' and tt.statusenabled=true
        `);
        res.status(200).send({
            data: resultList.rows,
            status: "success",
            success: true,
        });
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });

    }

}

async function getHeaderEmr(req, res) {
    const norecta = req.query.norecta;
    const logger = res.locals.logger
    try {
        const resultCountNoantrianDokter = await queryPromise2(`select mu2.namaunit as ruanganta,mr.namarekanan, mp.tgllahir AS tgllahirkomplet,
        mj2.jeniskelamin,td.norec as norecdp,ta.norec as norecta,mj.jenispenjamin,ta.taskid,mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
        to_char(mp.tgllahir,'dd Month YYYY') as tgllahir,mu.namaunit,
        mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter,mp.alamatdomisili  from t_daftarpasien td 
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
        const nominalklaim = (await pool.query(queries.qListTotalKlaim, [norecdp])).rows[0];
        const totalbiaya = (await pool.query(qGetTotalTagihan, [norecdp])).rows[0];
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
                    deposit: deposit || [],
                    alamatdomisili: resultCountNoantrianDokter.rows[i].alamatdomisili,
                    nominalklaim:nominalklaim.nominalklaim,
                    totalbiaya:totalbiaya.totalbiaya
                }

            }
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

const editEmrPasienTtv = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const rate = req.body.gcse + req.body.gcsm + req.body.gcsv;
        const idgcs = await getGcsId(rate);
        const cekTTV = await pool.query(qGetTtvByNorec, [req.body.norec]);
        let status_ihs_nadi=true
        let status_ihs_pernapasan=true
        let status_ihs_suhu=true
        let status_ihs_sistole=true
        let status_ihs_diastole=true
        const propertiesToCheck = ['nadi', 'pernapasan', 'suhu', 'sistole', 'diastole'];
        propertiesToCheck.forEach(property => {
            if (cekTTV.rows.some(element => parseFloat(element[property]) !== parseFloat(req.body[property]))) {
                switch (property) {
                    case 'nadi':
                        status_ihs_nadi = false;
                        break;
                    case 'pernapasan':
                        status_ihs_pernapasan = false;
                        break;
                    case 'suhu':
                        status_ihs_suhu = false;
                        break;
                    case 'sistole':
                        status_ihs_sistole = false;
                        break;
                    case 'diastole':
                        status_ihs_diastole = false;
                        break;
                    default:
                        break;
                }
            }
        });

        const { codeNadi } =await evaluateNadi(req.body.norecdp, req.body.nadi);
        const { codePernapasan} =await evaluatePernapasan(req.body.norecdp, req.body.pernapasan);
        const { codeSuhu} =await evaluateSuhu(req.body.norecdp, req.body.suhu);
        const { codeSistol} =await evaluateSistol(req.body.norecdp, req.body.sistole);
        const { codeDiastol} =await evaluateDiastol(req.body.norecdp, req.body.diastole);

        const {ttvupdate}=await db.sequelize.transaction(async (transaction) => {
            const ttvupdate = await db.t_ttv.update({
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
                sistole:req.body.sistole,
                diastole:req.body.diastole,
                objectpegawaifk: req.idPegawai,
                status_ihs_nadi:status_ihs_nadi,
                status_ihs_pernapasan:status_ihs_pernapasan,
                status_ihs_suhu:status_ihs_suhu,
                status_ihs_sistole:status_ihs_sistole,
                status_ihs_diastole:status_ihs_diastole,
                objecthasilnadifk:codeNadi,
                objecthasilpernapasanfk:codePernapasan,
                objecthasilsuhufk:codeSuhu,
                objecthasilsistolfk:codeSistol,
                objecthasildiastolfk:codeDiastol
            }, {
                where: {
                    norec: req.body.norec
                },
                transaction: transaction
            });
            return {ttvupdate}
        });
        
        const tempres = {
        ttv:ttvupdate
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

async function getGcsId(rate) {
    if (rate <= 3) return 33;
    if (rate === 4) return 32;
    if (rate >= 5 && rate <= 6) return 31;
    if (rate >= 7 && rate <= 9) return 30;
    if (rate >= 10 && rate <= 11) return 29;
    if (rate >= 12 && rate <= 13) return 28;
    if (rate >= 14 && rate <= 15) return 27;
}

async function evaluateNadi(norecdp, nadi) {
    const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm, [norecdp]);
    const nilaiNormalTTV = await pool.query(qGetNilaiNormalTtv);
    let codeNadi = 1;
    profilePasien.rows = profilePasien.rows.map(element => ({
        ...element,
        tahun: parseFloat(element.tahun.replace(/-/g, '')),
        bulan: parseFloat(element.bulan.replace(/-/g, '')),
        hari: parseFloat(element.hari.replace(/-/g, '')),
    }));
    if(profilePasien.rows[0].tahun<1){
        if(profilePasien.rows[0].bulan<1){
            let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'nadi'&& item.id === 1);
            if(parseFloat(nadi)<parseFloat(filteredDataNadi[0].nilaimin)){
                codeNadi=2
            }else if(parseFloat(nadi)>parseFloat(filteredDataNadi[0].nilaimax)){
                codeNadi=3
            }
        }else if(profilePasien.rows[0].bulan<5){
            let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'nadi'&& item.id === 3);
            if(parseFloat(nadi)<parseFloat(filteredDataNadi[0].nilaimin)){
                codeNadi=2
            }else if(parseFloat(nadi)>parseFloat(filteredDataNadi[0].nilaimax)){
                codeNadi=3
            }
        }else{
            let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'nadi'&& item.id === 2);
            if(parseFloat(nadi)<parseFloat(filteredDataNadi[0].nilaimin)){
                codeNadi=2
            }else if(parseFloat(nadi)>parseFloat(filteredDataNadi[0].nilaimax)){
                codeNadi=3
            }
        }
    }else if(profilePasien.rows[0].tahun<3){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'nadi'&& item.id === 4);
            if(parseFloat(nadi)<parseFloat(filteredDataNadi[0].nilaimin)){
                codeNadi=2
            }else if(parseFloat(nadi)>parseFloat(filteredDataNadi[0].nilaimax)){
                codeNadi=3
            }
    }else if(profilePasien.rows[0].tahun<6){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'nadi'&& item.id === 5);
            if(parseFloat(nadi)<parseFloat(filteredDataNadi[0].nilaimin)){
                codeNadi=2
            }else if(parseFloat(nadi)>parseFloat(filteredDataNadi[0].nilaimax)){
                codeNadi=3
            }
    }else if(profilePasien.rows[0].tahun<10){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'nadi'&& item.id === 6);
            if(parseFloat(nadi)<parseFloat(filteredDataNadi[0].nilaimin)){
                codeNadi=2
            }else if(parseFloat(nadi)>parseFloat(filteredDataNadi[0].nilaimax)){
                codeNadi=3
            }
    }else if(profilePasien.rows[0].tahun<15){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'nadi'&& item.id === 7);
            if(parseFloat(nadi)<parseFloat(filteredDataNadi[0].nilaimin)){
                codeNadi=2
            }else if(parseFloat(nadi)>parseFloat(filteredDataNadi[0].nilaimax)){
                codeNadi=3
            }
    }else{
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'nadi'&& item.id === 8);
            if(parseFloat(nadi)<parseFloat(filteredDataNadi[0].nilaimin)){
                codeNadi=2
            }else if(parseFloat(nadi)>parseFloat(filteredDataNadi[0].nilaimax)){
                codeNadi=3
            }
    }

    return { codeNadi};
}

async function evaluatePernapasan(norecdp, pernapasan) {
    const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm, [norecdp]);
    const nilaiNormalTTV = await pool.query(qGetNilaiNormalTtv);
    let codePernapasan = 1;
    profilePasien.rows = profilePasien.rows.map(element => ({
        ...element,
        tahun: parseFloat(element.tahun.replace(/-/g, '')),
        bulan: parseFloat(element.bulan.replace(/-/g, '')),
        hari: parseFloat(element.hari.replace(/-/g, '')),
    }));
    if(profilePasien.rows[0].tahun<1){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'pernapasan'&& item.id === 9);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codePernapasan=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codePernapasan=3
        }
    }else if(profilePasien.rows[0].tahun<3){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'pernapasan'&& item.id === 10);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codePernapasan=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codePernapasan=3
        }
    }else if(profilePasien.rows[0].tahun<6){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'pernapasan'&& item.id === 11);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codePernapasan=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codePernapasan=3
        }
    }else if(profilePasien.rows[0].tahun<12){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'pernapasan'&& item.id === 12);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codePernapasan=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codePernapasan=3
        }
    }else if(profilePasien.rows[0].tahun<18){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'pernapasan'&& item.id === 13);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codePernapasan=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codePernapasan=3
        }
    }else if(profilePasien.rows[0].tahun<65){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'pernapasan'&& item.id === 14);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codePernapasan=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codePernapasan=3
        }
    }else{
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'pernapasan'&& item.id === 15);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codePernapasan=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codePernapasan=3
        }
    }

    return { codePernapasan };
}

async function evaluateSuhu(norecdp, pernapasan) {
    const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm, [norecdp]);
    const nilaiNormalTTV = await pool.query(qGetNilaiNormalTtv);
    let codeSuhu = 1;
    profilePasien.rows = profilePasien.rows.map(element => ({
        ...element,
        tahun: parseFloat(element.tahun.replace(/-/g, '')),
        bulan: parseFloat(element.bulan.replace(/-/g, '')),
        hari: parseFloat(element.hari.replace(/-/g, '')),
    }));
    if(profilePasien.rows[0].tahun<5){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'suhu'&& item.id === 28);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeSuhu=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeSuhu=3
        }
    }else if(profilePasien.rows[0].tahun<15){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'suhu'&& item.id === 29);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeSuhu=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeSuhu=3
        }
    }else{
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'suhu'&& item.id === 30);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeSuhu=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeSuhu=3
        }
    }

    return { codeSuhu };
}

async function evaluateSistol(norecdp, pernapasan) {
    const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm, [norecdp]);
    const nilaiNormalTTV = await pool.query(qGetNilaiNormalTtv);
    let codeSistol = 1;
    profilePasien.rows = profilePasien.rows.map(element => ({
        ...element,
        tahun: parseFloat(element.tahun.replace(/-/g, '')),
        bulan: parseFloat(element.bulan.replace(/-/g, '')),
        hari: parseFloat(element.hari.replace(/-/g, '')),
    }));
    if(profilePasien.rows[0].tahun<3){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'sistol'&& item.id === 16);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeSistol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeSistol=3
        }
    }else if(profilePasien.rows[0].tahun<5){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'sistol'&& item.id === 17);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeSistol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeSistol=3
        }
    }else if(profilePasien.rows[0].tahun<13){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'sistol'&& item.id === 18);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeSistol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeSistol=3
        }
    }else if(profilePasien.rows[0].tahun<18){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'sistol'&& item.id === 19);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeSistol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeSistol=3
        }
    }else if(profilePasien.rows[0].tahun<65){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'sistol'&& item.id === 20);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeSistol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeSistol=3
        }
    }else{
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'sistol'&& item.id === 21);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeSistol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeSistol=3
        }
    }

    return { codeSistol };
}

async function evaluateDiastol(norecdp, pernapasan) {
    const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm, [norecdp]);
    const nilaiNormalTTV = await pool.query(qGetNilaiNormalTtv);
    let codeDiastol = 1;
    profilePasien.rows = profilePasien.rows.map(element => ({
        ...element,
        tahun: parseFloat(element.tahun.replace(/-/g, '')),
        bulan: parseFloat(element.bulan.replace(/-/g, '')),
        hari: parseFloat(element.hari.replace(/-/g, '')),
    }));
    if(profilePasien.rows[0].tahun<3){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'diastol'&& item.id === 22);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeDiastol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeDiastol=3
        }
    }else if(profilePasien.rows[0].tahun<5){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'diastol'&& item.id === 23);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeDiastol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeDiastol=3
        }
    }else if(profilePasien.rows[0].tahun<13){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'diastol'&& item.id === 24);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeDiastol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeDiastol=3
        }
    }else if(profilePasien.rows[0].tahun<18){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'diastol'&& item.id === 25);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeDiastol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeDiastol=3
        }
    }else if(profilePasien.rows[0].tahun<65){
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'diastol'&& item.id === 26);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeDiastol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeDiastol=3
        }
    }else{
        let filteredDataNadi = nilaiNormalTTV.rows.filter(item => item.jenisttv === 'diastol'&& item.id === 27);
        if(parseFloat(pernapasan)<parseFloat(filteredDataNadi[0].nilaimin)){
            codeDiastol=2
        }else if(parseFloat(pernapasan)>parseFloat(filteredDataNadi[0].nilaimax)){
            codeDiastol=3
        }
    }

    return { codeDiastol };
}

async function saveEmrPasienCppt(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {
        let norec = uuid.v4().substring(0, 32)
        const resultEmrPasien = await queryPromise1(req.body.norecap, req.body.idlabel);

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
        logger.error(error);
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
    const logger = res.locals.logger
    try {
        const resultNocmfk = await queryPromise2(`SELECT nocmfk
            FROM t_daftarpasien where norec='${req.query.norecdp}'
        `);
        if (resultNocmfk.rowCount === 0) {
            res.status(500).send({ message: 'Data Tidak Ada' });
            return
        }
        let nocmfk = resultNocmfk.rows[0].nocmfk
        const resultList = await pool.query(`
            SELECT 
                row_number() OVER (ORDER BY tt.norec) AS no,
                dp.noregistrasi,
                to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,
                tt.norec, 
                tt.objectemrfk, 
                tt.subjective,
                tt.objective, 
                tt.assesment,
                tt.plan,
                mu.namaunit
            FROM t_daftarpasien dp 
                JOIN t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
                JOIN t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
                JOIN t_cppt tt on tt.objectemrfk =te.norec
                JOIN m_unit mu on mu.id=ta.objectunitfk where dp.nocmfk = $1 and tt.statusenabled=true
        `, [nocmfk]);
        res.status(200).send({
            data: resultList.rows,
            status: "success",
            success: true,
        });
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function editEmrPasienCppt(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
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
        logger.error(error)
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
    const logger = res.locals.logger
    try {
        const result = await queryPromise2(`SELECT id as value,kodeexternal || ' - '|| reportdisplay as label,
        kodeexternal
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
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function getListDiagnosa9(req, res) {
    const logger = res.locals.logger
    try {
        const result = await queryPromise2(`SELECT id as value,kodeexternal || ' - '||reportdisplay as label,kodeexternal
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
    } catch (error) {
        logger.error(error);
        res.status(500).send({ message: error });
    }

}

async function getListComboDiagnosa(req, res) {
    const logger = res.locals.logger
    try {
        const result = await queryPromise2(`SELECT id as value,reportdisplay as label
            FROM m_tipediagnosa
        `);
        const result2 = await queryPromise2(`SELECT id as value,reportdisplay as label
            FROM m_jeniskasus
        `);

        const result3 = await queryPromise2(`SELECT id as value,reportdisplay as label
            FROM m_jenispelayanan
        `);
        const result4 = await queryPromise2(`SELECT id as value,reportdisplay as label
            FROM m_jenisoperasi
        `);

        let tempres = {
            tipediagnosa: result.rows, jeniskasus: result2.rows,
            jenispelayanan: result3.rows, jenisoperasi: result4.rows
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

async function saveEmrPasienDiagnosa(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {
        let chek = (await pool.query(qGetDiagnosaPrimary,[req.body.norecdp])).rows;
        if(chek.length>0 && req.body.tipediagnosa===1){
            res.status(201).send({
                status: 'Simpan Gagal, Diagnosa Primary Hanya Boleh Satu',
                success: false,
                msg: 'Simpan Gagal, Diagnosa Primary Hanya Boleh Satu',
                code: 201
            });
            return
        }
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

        let temp ={
            norec:norec,
            norecdp:req.body.norecdp,
            codestatus:'active',
            displaystatus:'Active',
            codekodediagnosa:req.body.codekodediagnosa,
            namakodediagnosa:req.body.namakodediagnosa,
            ihs_diagnosa:''
        }
        hupsertConditionDiagnosa(temp)
        await transaction.commit();
        let tempres = { diagnosapasien: diagnosapasien }
        let tempData = []
        tempData.push(await tempJsonNewClaim())
        tempData.push(await tempJsonSetClaim(req.body.norecdp))
        tempData.push(await tempJsonGrouper())
        // hupsertGrouping(tempData,req.body.norecdp) dikomen dulu 
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        logger.error(error)
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
    const logger = res.locals.logger
    try {
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
        td.objectjeniskasusfk, jk.reportdisplay as jeniskasus, mu.namaunit, mi.kodeexternal as kodediagnosa,
        dp.ihs_id as ihs_dp,td.ihs_id as ihs_diagnosa, mp.namapasien,mp.ihs_id as ihs_pasien,dp.norec as norecdp
        FROM t_daftarpasien dp 
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
        join t_diagnosapasien td  on td.objectantreanpemeriksaanfk =ta.norec
        join m_unit mu on mu.id=ta.objectunitfk
        join m_tipediagnosa mt on mt.id=td.objecttipediagnosafk
        join m_jeniskasus jk on jk.id=td.objectjeniskasusfk
        join m_icdx mi on mi.id=td.objecticdxfk
        join m_pasien mp on mp.id=dp.nocmfk where dp.nocmfk='${nocmfk}' and td.statusenabled=true
        `);
        res.status(200).send({
            data: resultList.rows,
            status: "success",
            success: true,
        });
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function getListDiagnosaIxPasien(req, res) {
    const logger = res.locals.logger
    try {
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
        mi.id as value, td.keterangan, td.qty,dp.ihs_id as ihs_dp,td.ihs_id as ihs_diagnosa, mp.namapasien,mp.ihs_id as ihs_pasien,dp.norec as norecdp,
        mi.kodeexternal as kodediagnosa,mp2.ihs_id as ihs_dokter
                FROM t_daftarpasien dp 
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
        join t_diagnosatindakan td  on td.objectantreanpemeriksaanfk =ta.norec
        join m_unit mu on mu.id=ta.objectunitfk
        join m_icdix mi on mi.id=td.objecticdixfk
        join m_pasien mp on mp.id=dp.nocmfk
        join m_pegawai mp2 on mp2.id=td.objectpegawaifk where dp.nocmfk='${nocmfk}' and td.statusenabled=true
        `);
        res.status(200).send({
            data: resultList.rows,
            status: "success",
            success: true,
        });
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: error });
    }

}

async function saveEmrPasienDiagnosaix(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
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
            qty: req.body.jumlahtindakan,
            objectdokterfk:req.body.dokterPelaksana
        }, { transaction });

        await transaction.commit();
        let tempres = { diagnosatindakan: diagnosatindakan }
        let tempData = []
        tempData.push(await tempJsonNewClaim())
        tempData.push(await tempJsonSetClaim(req.body.norecdp))
        tempData.push(await tempJsonGrouper())
        hupsertGrouping(tempData,req.body.norecdp)
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        logger.error(error);
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
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
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
        logger.error(error)
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
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
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
        logger.error(error)
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
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
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
            taskid: 3,
            objectkelasfk: 8
        }, { transaction });
        let norectrm = uuid.v4().substring(0, 32)
        const t_rm_lokasidokumen = await db.t_rm_lokasidokumen.create({
            norec: norectrm,
            objectantreanpemeriksaanfk: norec,
            objectunitfk: req.body.unittujuan,
            objectstatuskendalirmfk: 3
        }, { transaction });


        await transaction.commit();
        let tempres = { antreanPemeriksaan: antreanPemeriksaan, lokasidokumen: t_rm_lokasidokumen }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        logger.error(error)
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
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {
        let edit = {
            taskid: req.body.taskid,
            objectstatuspanggilfk: req.body.objectstatuspanggilfk || 1,
        }
        if (req.body.taskid === 4){
            edit.tgldipanggildokter = new Date()
        }
        const antreanpemeriksaan = await db.t_antreanpemeriksaan.update(
            edit, {
                where: {
                    norec: req.body.norec
                }
            }, { 
                transaction 
            });
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
        logger.error(error)
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
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {
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
        hUpsertEncounterPulang(req.body.norec)
        let tempres = { daftarpasien: daftarpasien, antreanpemeriksaan: antreanpemeriksaan }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Status Pulang Berhasil',
            code: 200
        });
    } catch (error) {
        logger.error(error)
        await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Simpan Status Pulang Gagal',
            code: 201
        });
    }
}


function getUmur(dateOfBirth, tillDate) {
    var dob = new Date(dateOfBirth);
    var endDt = new Date(tillDate) || new Date();
    var age = {};
    age.years = endDt.getUTCFullYear() - dob.getUTCFullYear();
    age.months = endDt.getUTCMonth() - dob.getUTCMonth();
    age.days = endDt.getUTCDate() - dob.getUTCDate();
    if (age.days < 0) {
        age.months--;
        var daysInMonth = new Date(endDt.getUTCFullYear(), endDt.getUTCMonth(), 0).getUTCDate();
        age.days += daysInMonth;
    }
    if (age.months < 0) {
        age.years--;
        age.months += 12;
    }
    return age;
}

const getObatFromUnit = async (req, res) => {
    const logger = res.locals.logger
    try {
        let { idunit, isbebas } = req.query
        isbebas = isbebas === "true"
        let dataGet = await pool.query(qGetObatFromUnit, [idunit, isbebas])
        const tempres = {
            obat: dataGet.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error) {
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }
}

const createOrUpdateEmrResepDokter = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {
        const body = req.body
        let norecorderresep = req.body.norecorder
        let upsertedOrder = null
        if (!norecorderresep) {
            norecorderresep = uuid.v4().substring(0, 32)
            const kodeOrder = await hCreateOrderResep()
            const created = await t_orderresep.create({
                norec: norecorderresep,
                kdprofile: 0,
                statusenabled: true,
                kodeexternal: kodeOrder,
                namaexternal: kodeOrder,
                reportdisplay: kodeOrder,
                objectantreanpemeriksaanfk: body.norecap,
                objectpegawaifk: body.dokter,
                tglinput: new Date(),
                objectunitasalfk: body.unitasal,
                no_order: kodeOrder,
                objectdepotujuanfk: body.unittujuan
            }, {
                transaction: transaction
            })
            upsertedOrder = created.toJSON()
        } else {
            const orderResepBefore = await t_orderresep.findByPk(norecorderresep, {
                transaction: transaction
            })
            if(!orderResepBefore){
                throw new NotFoundError(`Order resep tidak ada ada: ${norecorderresep}`)
            }
            const updated = await orderResepBefore.update({
                norec: norecorderresep,
                kdprofile: 0,
                statusenabled: true,
                objectantreanpemeriksaanfk: body.norecap,
                objectpegawaifk: body.dokter,
                tglinput: new Date(),
                objectunitasalfk: body.unittujuan,
                objectdepotujuanfk: body.unittujuan
            }, {
                transaction: transaction
            })
            upsertedOrder = updated.toJSON();
        }
        const { createdOrUpdatedDetailOrder } =
            await hCreateOrUpdateDetailOrderObat(
                req,
                res,
                transaction,
                {
                    norecorderresep: norecorderresep
                }
            )
        hUpsertOrderObatSatuSehat(upsertedOrder, createdOrUpdatedDetailOrder)
        
        await transaction.commit()
        const tempres = {
            orderresep: upsertedOrder,
            detailorder: createdOrUpdatedDetailOrder
        }
        res.status(200).send({
            code: 200,
            data: tempres,
            status: "success",
            msg: "sukses create or update resep",
            success: true,
        });
    } catch (error) {
        logger.error(error)
        await transaction.rollback()
        res.status(error.httpcode || 500).send({
            data: error.httpcode || 500,
            status: "error",
            msg: "gagal create or update resep",
            success: false,
        });
    }
}

const deleteOrderResep = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const norecresep = req.body.norecresep
        if(typeof norecresep !== "string") throw new Error("norecresep salah")
        const {deleted} 
        = await db.sequelize.transaction(async (transaction) => {
            const resep = await db.t_orderresep.findByPk(norecresep, {
                transaction: transaction
            })
            if(!resep){
                throw new Error(`Resep tidak ditemukan: ${norecresep}`)
            }
            await resep.update({
                statusenabled: false,
            }, {
                transaction: transaction
            })
            const deleted = resep.toJSON()
            return {
                deleted
            }
        });
        
        const tempres = {
            deleted: deleted
        };
        res.status(200).send({
            msg: 'Sukses Hapus order',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

const saveTriageIgd = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let norecigd
        const { pasienigd, createdRiwayat,createdRiwayatPenyakit } = await db.sequelize.transaction(async (transaction) => {
            let statusrujukan=false
            if(req.body.statusRujukan===1)
                statusrujukan=true
            norecigd = req.body.norec
            let pasienigd
            if (!norecigd) {
                norecigd = uuid.v4().substring(0, 32)
                pasienigd = await db.t_pasienigd.create({
                    norec: norecigd,
                    statusenabled: true,
                    tglinput: new Date(),
                    namapasien: req.body.namapasien,
                    umur: req.body.umurpasien,
                    keluhan: req.body.keluhan,
                    namapj: req.body.namakeluarga,
                    nohp: req.body.nohpkeluarga,
                    objectpegawaiinputfk: req.idPegawai,
                    // riwayatpenyakit: req.body.riwayatpenyakit,
                    skalanyeri: req.body.skalanyeri === '' ? 0 : req.body.skalanyeri,
                    airway: req.body.airway === '' ? 0 : req.body.airway,
                    breathing: req.body.breathing === '' ? 0 : req.body.breathing,
                    circulation: req.body.circulation === '' ? 0 : req.body.circulation,
                    disability: req.body.disability === '' ? 0 : req.body.disability,
                    kondisimental: req.body.kondisimental === '' ? 0 : req.body.kondisimental,
                    objectdaruratigdfk: req.body.tingkatdarurat === '' ? 0 : req.body.tingkatdarurat,
                    objecthubunganpjfk: req.body.hubungankeluarga === '' ? null : req.body.hubungankeluarga,
                    rencanaterapi: req.body.rencanaterapi,
                    objecttransportasikedatanganfk: req.body.transportasiKedatangan === '' ? 0 : req.body.transportasiKedatangan,
                    objectterminologikeluhanfk: req.body.keluhanUtama === '' ? 0 : req.body.keluhanUtama,
                    // objectterminologialergimakananfk: req.body.alergiMakanan === '' ? 0 : req.body.alergiMakanan,
                    // objectterminologialergiobatfk: req.body.alergiObat === '' ? 0 : req.body.alergiObat,
                    // objectterminologialergilingkunganfk: req.body.alergiLingkungan === '' ? 0 : req.body.alergiLingkungan,
                    status_rujukan: statusrujukan
                }, { transaction });
            } else {
                pasienigd = await db.t_pasienigd.update({
                    statusenabled: true,
                    tglinput: new Date(),
                    namapasien: req.body.namapasien,
                    umur: req.body.umurpasien,
                    keluhan: req.body.keluhan,
                    namapj: req.body.namakeluarga,
                    nohp: req.body.nohpkeluarga,
                    objectpegawaiinputfk: req.idPegawai,
                    // riwayatpenyakit: req.body.riwayatpenyakit,
                    skalanyeri: req.body.skalanyeri === '' ? 0 : req.body.skalanyeri,
                    airway: req.body.airway === '' ? 0 : req.body.airway,
                    breathing: req.body.breathing === '' ? 0 : req.body.breathing,
                    circulation: req.body.circulation === '' ? 0 : req.body.circulation,
                    disability: req.body.disability === '' ? 0 : req.body.disability,
                    kondisimental: req.body.kondisimental === '' ? 0 : req.body.kondisimental,
                    objectdaruratigdfk: req.body.tingkatdarurat === '' ? 0 : req.body.tingkatdarurat,
                    objecthubunganpjfk: req.body.hubungankeluarga === '' ? 0 : req.body.hubungankeluarga,
                    rencanaterapi: req.body.rencanaterapi,
                    objecttransportasikedatanganfk: req.body.transportasiKedatangan === '' ? 0 : req.body.transportasiKedatangan,
                    objectterminologikeluhanfk: req.body.keluhanUtama === '' ? 0 : req.body.keluhanUtama,
                    // objectterminologialergimakananfk: req.body.alergiMakanan === '' ? 0 : req.body.alergiMakanan,
                    // objectterminologialergiobatfk: req.body.alergiObat === '' ? 0 : req.body.alergiObat,
                    // objectterminologialergilingkunganfk: req.body.alergiLingkungan === '' ? 0 : req.body.alergiLingkungan,
                    status_rujukan: statusrujukan
                }, {
                    where: {
                        norec: norecigd,
                    },
                    transaction: transaction
                });
            }
            let createdRiwayat
            if(req.body.resep[0].obat!==''){
                createdRiwayat = await hCreateRiwayatObat(req, res, transaction, {
                    resep: req.body.resep,
                    norecpasienigd: norecigd
                })
            }
            const createdRiwayatPenyakit = await hCreateRiwayatPenyakit(req, res, transaction, {
                riwayat: req.body.riwayatpenyakit,
                norecpasienigd: norecigd
            })
            const createdRiwayatAlergiMakanan = await hCreateRiwayatAlergi(req, res, transaction, {
                riwayat: req.body.alergiMakanan,
                norecpasienigd: norecigd,
                jenisalergi: 1
            })
            const createdRiwayatAlergiObat = await hCreateRiwayatAlergi(req, res, transaction, {
                riwayat: req.body.alergiObat,
                norecpasienigd: norecigd,
                jenisalergi: 2
            })
            const createdRiwayatAlergiLingkungan = await hCreateRiwayatAlergi(req, res, transaction, {
                riwayat: req.body.alergiMakanan,
                norecpasienigd: norecigd,
                jenisalergi: 3
            })
            return { pasienigd, createdRiwayat,createdRiwayatPenyakit,createdRiwayatAlergiMakanan,createdRiwayatAlergiObat,createdRiwayatAlergiLingkungan }
        });
        hupsertAllergyRiwayatAlergi(norecigd)

        const tempres = {
            pasienigd: pasienigd
        };
        res.status(200).json({
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

const getComboTriageIgd = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let query = queries.qM_DaruratIgd
        const result = await pool.query(query, [])

        let query2 = queries.qM_HubunganKeluarga
        const result2 = await pool.query(query2, [])

        const result3 = await pool.query(qTransportasiKedatangan)
        const task = [
            {
              value: 1,
              label: "Ya",
            },
            {
              value: 2,
              label: "Tidak",
            },
          ]
        const result4 = await pool.query(qGetListKeluhanUtama)
        const result5 = await pool.query(qGetListAlergi)
        const tempres = {
            mdaruratigd: result.rows,
            mhubungankeluarga: result2.rows,
            transportasi :result3.rows,
            yatidak:task,
            keluhanutama:result4.rows,
            alergi:result5.rows
        };
        res.status(200).json({
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

const upsertAssesmenBayiLahir = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const bodyReq = req.body
        const resultEmrPasien = await queryPromise1(req.body.norecap, req.body.idlabel);
        const { emrPasien,asesmenbayilahir } = await db.sequelize.transaction(async (transaction) => {
            let emrPasien 
            let asesmenbayilahir 
            if(bodyReq.norecemrpasien==='' || bodyReq.norecemrpasien===undefined){
                let norec = uuid.v4().substring(0, 32)
                let norecassesmen = uuid.v4().substring(0, 32)
                if (resultEmrPasien.rowCount != 0) {
                    norec = resultEmrPasien.rows[0].norec
                } else {
                    emrPasien = await db.t_emrpasien.create({
                        norec: norec,
                        statusenabled: true,
                        label: bodyReq.label,
                        idlabel: bodyReq.idlabel,
                        objectantreanpemeriksaanfk: bodyReq.norecap,
                        objectpegawaifk: req.idPegawai,
                        tglisi: new Date()
                    }, { transaction });
                }
                asesmenbayilahir = await db.t_asesmenbayilahir.create({
                    norec: norecassesmen,
                    objectemrfk: norec,
                    responden: bodyReq.responden,
                    objecthubungankeluargafk: bodyReq.hubungan || null,
                    anamnesa: bodyReq.anamnesaBayi || null,
                    gravida: bodyReq.skalaGravida || null,
                    partus: bodyReq.skalaPartus || null,
                    abortus: bodyReq.skalaAbortus || null,
                    keadaanibu: bodyReq.keadanIbuSelamaHamil || null,
                    tempatpersalinan: bodyReq.tempatPersalinan || null,
                    penolong: bodyReq.penolong || null,
                    ketubanpecah: bodyReq.ketubanPecah || new Date(),
                    airketuban: bodyReq.airKetuban || null,
                    lahir: bodyReq.jamLahir || new Date(),
                    lamapersalinan: bodyReq.jamPersalinan || null,
                    macampersalinan: bodyReq.macamPersalinan || null,
                    indikasi: bodyReq.indikasi || null,
                    objectjeniskelaminfk: bodyReq.jenisKelamin || null,
                    keadaan: bodyReq.keadaan || null,
                    berat: bodyReq.beratBadanBayi || null,
                    panjang: bodyReq.panjangBadan || null,
                    lingkardada: bodyReq.lingkarDada || null,
                    lingkarkepala: bodyReq.lingkarKepala || null,
                    lahirmeninggal: bodyReq.menitMeninggal || null,
                    objectstatuspulangrifk: bodyReq.sebabKematianBayi || null,
                    a1: bodyReq.a1Menit || null,
                    a5: bodyReq.a5Menit || null,
                    a10: bodyReq.a10Menit || null,
                    p1: bodyReq.p1Menit || null,
                    p5: bodyReq.p5Menit || null,
                    p10: bodyReq.p10Menit || null,
                    g1: bodyReq.g1Menit || null,
                    g5: bodyReq.g5Menit || null,
                    g10: bodyReq.g10Menit || null,
                    c1: bodyReq.ac1Menit || null,
                    c5: bodyReq.ac5Menit || null,
                    c10: bodyReq.ac10Menit || null,
                    r1: bodyReq.r1Menit || null,
                    r5: bodyReq.r5Menit || null,
                    r10: bodyReq.r10Menit || null,
                    total1: bodyReq.total1Menit || null,
                    total5: bodyReq.total5Menit || null,
                    total10: bodyReq.total10Menit || null,
                    durasitpiece: bodyReq.pieceDurasi || null,
                    durasio2: bodyReq.sungkupDurasi || null,
                    durasipompa: bodyReq.pompaDurasi || null,
                    durasiintubatic: bodyReq.intubaticDurasi || null,
                    kulit: bodyReq.kulit || null,
                    tht: bodyReq.tht || null,
                    mulut: bodyReq.mulut || null,
                    leher: bodyReq.leher || null,
                    dada: bodyReq.dada || null,
                    paru: bodyReq.paru || null,
                    jantung: bodyReq.jantung || null,
                    abdomen: bodyReq.abdomen || null,
                    genitalia: bodyReq.genitalia || null,
                    anus: bodyReq.anus || null,
                    extremitasatas: bodyReq.extremitasAtas || null,
                    extremitasbawah: bodyReq.extremitasBawah || null,
                    reflexhisap: bodyReq.reflekHisap || null,
                    pengeluaranairkeruh: bodyReq.pengeluaranAirKeruh || null,
                    pengeluaranmokeneum: bodyReq.pengeluaranMekoneum || null,
                    pemeriksaanlab: bodyReq.pemeriksaanLaboratorium || null,
                    diagnosakerja: bodyReq.diagnosaKerja || null,
                    penatalaksanaan: bodyReq.pentalakaksanaan || null,
                }, { transaction });
            }else{
                asesmenbayilahir = await db.t_asesmenbayilahir.update({responden: bodyReq.responden,objecthubungankeluargafk: bodyReq.hubungan || null,anamnesa: bodyReq.anamnesaBayi || null,gravida: bodyReq.skalaGravida || null,
                    partus: bodyReq.skalaPartus || null,abortus: bodyReq.skalaAbortus || null,keadaanibu: bodyReq.keadanIbuSelamaHamil || null,
                    tempatpersalinan: bodyReq.tempatPersalinan || null,penolong: bodyReq.penolong || null,ketubanpecah: bodyReq.ketubanPecah || new Date(),
                    airketuban: bodyReq.airKetuban || null,lahir: bodyReq.jamLahir || new Date(),lamapersalinan: bodyReq.jamPersalinan || null,macampersalinan: bodyReq.macamPersalinan || null,
                    indikasi: bodyReq.indikasi || null,objectjeniskelaminfk: bodyReq.jenisKelamin || null,keadaan: bodyReq.keadaan || null,berat: bodyReq.beratBadanBayi || null,panjang: bodyReq.panjangBadan || null,
                    lingkardada: bodyReq.lingkarDada || null,lingkarkepala: bodyReq.lingkarKepala || null,lahirmeninggal: bodyReq.menitMeninggal || null,
                    objectstatuspulangrifk: bodyReq.sebabKematianBayi || null,a1: bodyReq.a1Menit || null,a5: bodyReq.a5Menit || null,a10: bodyReq.a10Menit || null,
                    p1: bodyReq.p1Menit || null,p5: bodyReq.p5Menit || null,p10: bodyReq.p10Menit || null,g1: bodyReq.g1Menit || null,g5: bodyReq.g5Menit || null,
                    g10: bodyReq.g10Menit || null,c1: bodyReq.ac1Menit || null,c5: bodyReq.ac5Menit || null,c10: bodyReq.ac10Menit || null,r1: bodyReq.r1Menit || null,r5: bodyReq.r5Menit || null,r10: bodyReq.r10Menit || null,total1: bodyReq.total1Menit || null,total5: bodyReq.total5Menit || null,total10: bodyReq.total10Menit || null,durasitpiece: bodyReq.pieceDurasi || null,durasio2: bodyReq.sungkupDurasi || null,durasipompa: bodyReq.pompaDurasi || null,durasiintubatic: bodyReq.intubaticDurasi || null,kulit: bodyReq.kulit || null,tht: bodyReq.tht || null,mulut: bodyReq.mulut || null,leher: bodyReq.leher || null,dada: bodyReq.dada || null,paru: bodyReq.paru || null,jantung: bodyReq.jantung || null,abdomen: bodyReq.abdomen || null,genitalia: bodyReq.genitalia || null,anus: bodyReq.anus || null,extremitasatas: bodyReq.extremitasAtas || null,extremitasbawah: bodyReq.extremitasBawah || null,reflexhisap: bodyReq.reflekHisap || null,pengeluaranairkeruh: bodyReq.pengeluaranAirKeruh || null,pengeluaranmokeneum: bodyReq.pengeluaranMekoneum || null,pemeriksaanlab: bodyReq.pemeriksaanLaboratorium || null,diagnosakerja: bodyReq.diagnosaKerja || null,penatalaksanaan: bodyReq.pentalakaksanaan || null,
                }, {
                    where: {
                        norec: bodyReq.norecemrpasien
                    },
                    transaction: transaction
                });
            }
            
            return {
                emrPasien,asesmenbayilahir
            }
        });
        
        const tempres = {
            emrPasien,asesmenbayilahir
        };
        res.status(200).send({
            msg: 'Success',code: 200,data: tempres,success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,code: 500,data: error,success: false
        });
    }
}

const getAsesmenBayiLahirByNorec = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result1 = await pool.query(qAsesmenBayiLahirByNorec,[req.query.norecap])

        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result1.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getHistoryAsesmenBayiLahir = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultNocmfk = await queryPromise2(`SELECT nocmfk
            FROM t_daftarpasien where norec='${req.query.norecdp}'
        `);
        if (resultNocmfk.rowCount === 0) {
            res.status(500).send({ message: 'Data Tidak Ada' });
            return
        }
        let nocmfk = resultNocmfk.rows[0].nocmfk
        const result1 = await pool.query(qHistoryAsesmenBayiLahir,[nocmfk])

        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result1.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}


const getOrderResepFromDP = async (req, res) => {
    const logger = res.locals.logger
    try {
        let { norecdp, norecresep, norecap, isduplicate } = req.query

        isduplicate = isduplicate === "true"
        let dataOrders = await pool.query(qGetOrderResepFromDP, [
            'norecdp',
            null,
            norecdp
        ])
        let dataOrderNorec = (await pool.query(qGetOrderResepFromDP, [
            'norecresep',
            norecresep,
            null
        ])).rows
        const pasien = (await pool.query(qGetPasienFromDP, [norecdp])).rows[0]
        if(!pasien) throw NotFoundError("Pasien tidak ditemukan")
        let dataVerif = (await pool.query(qGetOrderVerifResepFromDP, [
            'idpasien',
            null,
            null,
            pasien.idpasien
        ]))
        let dataVerifNorec = (await pool.query(qGetOrderVerifResepFromDP, [
            'norecresep',
            norecresep,
            null,
            null
        ])).rows

        dataOrders = dataOrders.rows
        dataOrders = hProcessOrderResep(dataOrders)
        dataOrderNorec = hProcessOrderResep(dataOrderNorec)[0] || null
        dataVerifNorec = hProcessOrderResep(dataVerifNorec)[0] || null

        if(dataVerifNorec && dataVerifNorec && isduplicate){
            dataOrderNorec = {
                ...dataOrderNorec,
                norecorder: null,
                resep: dataVerifNorec.resep
            }
        }
        const tempres = {
            order: dataOrders,
            ordernorec: dataOrderNorec,
            veriforder: dataVerif.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: "sukses get resep from dp"
        });
    } catch (error) {
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get resep from dp"
        })
    }
}

const getAntreanPemeriksaanObat = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { norecap } = req.query
        const antreanPemeriksaan = (await pool.query(qGetAntreanPemeriksaanObat, [
            norecap
        ])).rows[0]
        if(!antreanPemeriksaan){
            throw new Error("Antrean pemeriksaan tidak ada")
        }
        const tempres = {
            antreanPemeriksaan: antreanPemeriksaan
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}


async function saveEmrJenisPelayanan(req, res) {
    const logger = res.locals.logger
    // const [transaction, errorTransaction] = await createTransaction(db, res)
    // if (errorTransaction) return
    try {
        // const daftarpasien = await db.t_daftarpasien.update({
        //     objectjenispelayananfk: req.body.jenispelayanan
        // }, {
        //     where: {
        //         norec: req.body.norecdp
        //     },
        //     transaction: transaction
        // });

        // await transaction.commit();
        const result = await db.sequelize.transaction(async (t) => {

            const user = await db.t_daftarpasien.update({
                objectjenispelayananfk: req.body.jenispelayanan
            }, {
                where: {
                    norec: req.body.norecdp
                }, transaction: t
            });


            return user;

        });
        let tempres = { daftarpasien: result }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        logger.error(error)
        // transaction && await transaction.rollback();
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Simpan Gagal',
            code: 201
        });
    }
}

const getHistoriJenisPelayananPasien = async (req, res) => {
    const logger = res.locals.logger
    try {
        const result4 = await queryPromise2(`SELECT objectjenispelayananfk
            FROM t_daftarpasien where norec='${req.query.norecdp}'
            `);

        res.status(200).send({
            data: result4.rows,
            status: "success",
            success: true,
            msg: "sukses get Histori Jenis Pelayanan"
        });
    } catch (error) {
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
            msg: "gagal get Histori Jenis Pelayanan"
        })
    }
}

const getHistoriTriagiByNorec = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const result = await queryPromise2(`SELECT
        tp.*,
        CASE
            WHEN tp.status_rujukan = TRUE THEN 1
            ELSE 2
        END AS status_rujukan,
        json_agg(json_build_object('norec', mr.norec,'value', mt.id,'label', mt.display,'display', mt.display,'code', mt.code)) as riwayatpenyakit 
    FROM
        t_pasienigd tp
        LEFT JOIN t_riwayatpenyakit mr ON tp.norec = mr.norecreferenci
        left join m_terminologi mt on mt.id=mr.objectterminologifk 
    WHERE
        tp.norec = '${req.query.norec}'
    group by tp.norec
            `);
        const listAlergiMakanan = await pool.query(
            qGetRiwayatAlergi, 
            [
                1,req.query.norec
            ])
        result.rows[0].riwayatalergimakanan = listAlergiMakanan.rows
        const listAlergiObat = await pool.query(
            qGetRiwayatAlergiObat, 
            [
                2,req.query.norec
            ])
        result.rows[0].riwayatalergiobat = listAlergiObat.rows
        const listAlergiLingkungan = await pool.query(
            qGetRiwayatAlergi, 
            [
                3,req.query.norec
            ])
        result.rows[0].riwayatalergilingkungan = listAlergiLingkungan.rows
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getComboAsesmenBayiLahir = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result1 = await pool.query(hubunganKeluargaQueries.getAll)
        const result2 = await pool.query(jenisKelaminQueries.getAll)
        const result3 = await pool.query(qComboApgarScore,['MacamPersalinan'])
        const result4 = await pool.query(qComboApgarScore,['KeadaanBayi'])
        const result5 = await pool.query(qComboSebabKematian)
        const result6 = await pool.query(qComboApgar,['a'])
        const result7 = await pool.query(qComboApgar,['p'])
        const result8 = await pool.query(qComboApgar,['g'])
        const result9 = await pool.query(qComboApgar,['c'])
        const result10 = await pool.query(qComboApgar,['r'])
        const result11 = await pool.query(qComboApgarScore,['AirKetuban'])

        const tempres = {
            hubungan :  result1.rows,
            jeniskelamin :result2.rows,
            macampersalinan:result3.rows,
            keadaanbayi:result4.rows,
            sebabkematianbayi:result5.rows,
            apgarA:result6.rows,
            apgarP:result7.rows,
            apgarG:result8.rows,
            apgarC:result9.rows,
            apgarR:result10.rows,
            ketuban:result11.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getComboAsesmenAwalKeperawatan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result1 = await pool.query(qGetSumberData)
        const result2 = await pool.query(qGetListKeluhanUtama)
        const result3 = await pool.query(qGetStatusPsikologis)
        const result4 = await pool.query(qGetListAlergi)
        const tempres = {
            sumberdata:result1.rows,
            keluhanutama:result2.rows,
            statuspsikologis:result3.rows,
            alergi:result4.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const upsertPengkajianAwalKeperawatan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultEmrPasien = await queryPromise1(req.body.norecap, req.body.idlabel);
        let norec = uuid.v4().substring(0, 32)
        const {emrPasien,ttv}=await db.sequelize.transaction(async (transaction) => {
            let emrPasien
            if (req.body.sumberdata === '') req.body.sumberdata = 1;
            if (resultEmrPasien.rowCount != 0) {
                norec = resultEmrPasien.rows[0].norec
            } else {
                emrPasien = await db.t_emrpasien.create({
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
            let ttv
            if(req.body.norec===''){
                ttv = await db.t_pengkajianawalkeperawatan.create({
                    norec: norecttv,
                    objectemrfk: norec,
                    objectsumberdatafk: req.body.sumberdata,
                    keluhanutama: req.body.keluhanUtamaText,
                    objectterminologikeluhanfk: !req.body.keluhanUtama ? null : req.body.keluhanUtama,
                    objectstatuspsikologisfk: !req.body.psikologis ? null : req.body.psikologis,
                    objectterminologialergifk: !req.body.alergi ? null : req.body.alergi,
                    tglinput: req.body.tanggalPemeriksaan,objectalergiobatfk:!req.body.alergiObat ? null : req.body.alergiObat,
                }, { transaction });
            }else{
                ttv = await db.t_pengkajianawalkeperawatan.update({
                    objectsumberdatafk: req.body.sumberdata,
                    keluhanutama: req.body.keluhanUtamaText,
                    objectterminologikeluhanfk: !req.body.keluhanUtama ? null : req.body.keluhanUtama,
                    objectstatuspsikologisfk: !req.body.psikologis ? null : req.body.psikologis,
                    objectterminologialergifk: !req.body.alergi ? null : req.body.alergi,
                    tglinput: req.body.tanggalPemeriksaan,objectalergiobatfk:!req.body.alergiObat ? null : req.body.alergiObat,
                }, {
                    where: {
                        norec: req.body.norec
                    },
                    transaction: transaction
                });
            }
            
            return {emrPasien,ttv}
        });
        
        const tempres = {
            emrpasien:emrPasien,
            pengkajian:ttv
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

const getListPengkajianAwalKeperawatan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultNocmfk = await queryPromise2(`SELECT nocmfk
        FROM t_daftarpasien where norec='${req.query.norecdp}'
    `);
    if (resultNocmfk.rowCount === 0) {
        res.status(500).send({ message: 'Data Tidak Ada' });
        return
    }
    let nocmfk = resultNocmfk.rows[0].nocmfk
    const result = await pool.query(qGetListPengkajianAwalKeperawatan,[nocmfk])
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
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}

const getListKfa = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            nama
        } = req.query
        const list = await pool.query(
            qListKfa, 
            [
                nama || ''
            ])
        const tempres = {
            list: list.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getComboAsesmenAwalIGD = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const badans = (await pool.query(qGetBadan)).rows
        const satuanWaktu = (await pool.query(satuanQueries.getSatuanWaktu)).rows
        const allInitBadan = [
            "Kepala",
            "Mata",
            "Mulut",
            "Leher",
            "Dada",
            "Perut",
        ]
        let badanInit = badans.map((badan) => ({
                ...badan,
                normal: true,
                abnormalteks: '',
        }))
        badanInit = badanInit.filter((badanFilter) => {
            const findAllInit = allInitBadan.findIndex(
                (find) => find === badanFilter.label
            )
            return findAllInit >= 0
        })
        const tempres = {
            badan: badans,
            satuanWaktu,
            badanInit
        }
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
    
const getListRiwayatPenyakitPribadi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            nama
        } = req.query
        const list = await pool.query(
            qGetRiwayatPenyakitPribadi, 
            [
                nama || ''
            ])
        const tempres = {
            list: list.rows
        };
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

const upsertAsesmenAwalIGD = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            emrPasien,
            upsertedAsesmen,
            upsertedPemeriksaanFisik
        } = await db.sequelize.transaction(async (transaction) => {

            const {emrPasien, norecemr} = await hUpsertEMRAsesmenAwalIGD(req, res, transaction)

            const upsertedAsesmen = await hUpsertAsesmenAwalIGD(req, res, transaction, {
                norecemr: norecemr
            })

            await hUpsertTTVAsesmenAwalIGD(req, res, transaction, {
                norecemr: norecemr
            })
            const upsertedPemeriksaanFisik = await hUpsertPemeriksaanFisik(
                req, 
                res,
                transaction,
                {
                    upsertedAsesmen: upsertedAsesmen
                }
            )
            
            return {
                upsertedAsesmen,
                emrPasien,
                upsertedPemeriksaanFisik
            }
        });
        
        const tempres = {
            emrPasien,
            upsertedAsesmen,
            upsertedPemeriksaanFisik
        };
        hUpsertNyeri(upsertedAsesmen.norec)


        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

const getAsesmenAwalIGD = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const asesmenAwal = (await pool.query(qGetAsesmenAwalIGD, [req.query.norecap])).rows[0]
        if(!asesmenAwal) throw new NotFoundError("Asesmen awal tidak ditemukan")
        const norecttv = asesmenAwal.norecttv
        updateNullToString(asesmenAwal)
        const ttvAwal = (await pool.query(qGetTtvByNorec, [norecttv])).rows[0]
        asesmenAwal.umur = calculateAge(new Date(asesmenAwal.tgllahir), new Date())
        const tempres = {
            asesmenAwal,
            ttvawal: ttvAwal || null
        };
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


const upsertSkriningIGD = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultEmrPasien = await queryPromise1(req.body.norecap, req.body.idlabel);
        let norec = uuid.v4().substring(0, 32)
        const {emrPasien,ttv}=await db.sequelize.transaction(async (transaction) => {
            let emrPasien
            
            if (resultEmrPasien.rowCount != 0) {
                norec = resultEmrPasien.rows[0].norec
            } else {
                emrPasien = await db.t_emrpasien.create({
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
            let ttv
            const skriningBatuk = req.body.skriningbatuk
            const skriningGizi = req.body.skrininggizi
            const ckNull = (data) => data === "" || data === null || data === undefined ? null : data
            if(req.body.norec===''){
                ttv = await db.t_skriningigd.create({
                    norec: norecttv,
                    objectemrpasienfk: norec,
                    tglinput: req.body.datepengkajian,
                    risikodecubitus: ckNull(req.body.statusdecubitus),
                    batuk_demam: ckNull(skriningBatuk.pertanyaan1),batuk_keringat: ckNull(skriningBatuk.pertanyaan2),
                    batuk_daerahwabah: ckNull(skriningBatuk.pertanyaan3),batuk_obatjangkapanjang: ckNull(skriningBatuk.pertanyaan4),batuk_bbturun:ckNull(skriningBatuk.pertanyaan5),
                    gizi_bbturun:ckNull(skriningGizi.pertanyaan1),gizi_nafsumakan:ckNull(skriningGizi.pertanyaan2),gizi_gejala:ckNull(skriningGizi.pertanyaan3),gizi_komorbid:ckNull(skriningGizi.pertanyaan4),gizi_fungsional:ckNull(skriningGizi.pertanyaan5)
                }, { transaction });
            }else{
                norec = req.body.norec
                ttv = await db.t_skriningigd.update({
                    tglinput: req.body.datepengkajian,
                    risikodecubitus: ckNull(req.body.statusdecubitus),
                    batuk_demam: ckNull(skriningBatuk.pertanyaan1),batuk_keringat: ckNull(skriningBatuk.pertanyaan2),
                    batuk_daerahwabah: ckNull(skriningBatuk.pertanyaan3),batuk_obatjangkapanjang: ckNull(skriningBatuk.pertanyaan4),batuk_bbturun:ckNull(skriningBatuk.pertanyaan5),
                    gizi_bbturun:ckNull(skriningGizi.pertanyaan1),gizi_nafsumakan:ckNull(skriningGizi.pertanyaan2),gizi_gejala:ckNull(skriningGizi.pertanyaan3),gizi_komorbid:ckNull(skriningGizi.pertanyaan4),gizi_fungsional:ckNull(skriningGizi.pertanyaan5)
                }, {
                    where: {
                        norec: req.body.norec
                    },
                    transaction: transaction
                });
            }
            
            return {emrPasien,ttv}
        });
        hUpsertRisikoDecubitus(req.body.norecdp,norec)
        hUpsertSkriningBatuk(req.body.norecdp,norec)
        hUpsertSkriningGizi(req.body.norecdp,norec)
        const tempres = {
            emrpasien:emrPasien,
            skrining:ttv
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

const getListHistorySkriningIGD = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultNocmfk = await queryPromise2(`SELECT nocmfk
        FROM t_daftarpasien where norec='${req.query.norecdp}'
    `);
    if (resultNocmfk.rowCount === 0) {
        res.status(500).send({ message: 'Data Tidak Ada' });
        return
    }
    let nocmfk = resultNocmfk.rows[0].nocmfk
    const result = await pool.query(qHistorySkriningIGD,[nocmfk])
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
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
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
    updateStatusPulangRJ,
    getObatFromUnit,
    createOrUpdateEmrResepDokter,
    getOrderResepFromDP,
    saveEmrJenisPelayanan,
    getHistoriJenisPelayananPasien,
    saveTriageIgd,
    getComboTriageIgd,
    getHistoriTriagiByNorec,
    upsertAssesmenBayiLahir,
    getAsesmenBayiLahirByNorec,
    getComboAsesmenBayiLahir,
    getHistoryAsesmenBayiLahir,
    getAntreanPemeriksaanObat,
    deleteOrderResep,
    getComboAsesmenAwalKeperawatan,
    upsertPengkajianAwalKeperawatan,
    getListPengkajianAwalKeperawatan,
    getListKfa,
    getComboAsesmenAwalIGD,
    getListRiwayatPenyakitPribadi,
    upsertAsesmenAwalIGD,
    getAsesmenAwalIGD,
    upsertSkriningIGD,
    getListHistorySkriningIGD,
};


const hCreateOrUpdateDetailOrderObat = async (
    req,
    res,
    transaction,
    {
        norecorderresep
    }
) => {
    const resep = req.body.resep
    let createdOrUpdatedDetailOrder = await Promise.all(
        resep.map(async (item) => {
            if (item.racikan.length > 0) {
                // untuk racikan, maka masukkan sub item
                let createdOrUpdatedRacikans = []
                createdOrUpdatedRacikans = await Promise.all(
                    item.racikan.map(async (subItem) => {
                        let norecresepsub = subItem.norecresep
                        let createdOrUpdated
                        const { deleted } = await hDeleteResep(
                            norecorderresep,
                            transaction
                        )

                        norecresepsub = uuid.v4().substring(0, 32);
                        const { created } = await hCreateResep(
                            norecorderresep,
                            item,
                            subItem,
                            transaction
                        )
                        createdOrUpdated = created
                        return createdOrUpdated
                    })
                )
                return createdOrUpdatedRacikans
            }
            // jika bukan racikan, maka tidak perlu subitem
            let norecresep = item.norecresep
            let createdOrUpdatedObat
            const { deleted } = await hDeleteResep(
                norecorderresep,
                transaction
            )
            norecresep = uuid.v4().substring(0, 32);
            const { created } = await hCreateResep(
                norecorderresep,
                item,
                null,
                transaction
            )
            createdOrUpdatedObat = created
            return createdOrUpdatedObat
        })
    )
    createdOrUpdatedDetailOrder
        = createdOrUpdatedDetailOrder.flat(1)
    return { createdOrUpdatedDetailOrder }
}


const hCreateResep = async (
    norecorderresep,
    item,
    subItem,
    transaction
) => {
    // jika bukan subitem, maka yang digunakan adalah item
    let itemUsed = subItem || item
    let created = await t_orderresepdetail.create({
        norec: uuid.v4().substring(0, 32),
        kdprofile: 0,
        statusenabled: true,
        kodeexternal: "",
        namaexternal: itemUsed.namaobat,
        reportdisplay: itemUsed.namaobat,
        objectorderresepfk: norecorderresep,
        kode_r: item.koder,
        objectprodukfk: itemUsed.obat,
        qty: itemUsed.qty || 0,
        objectsediaanfk: item.sediaan,
        harga: itemUsed.harga || 0,
        total: itemUsed.total || 0,
        objectsignafk: item.signa,
        objectketeranganresepfk: item.keterangan,
        qtyracikan: itemUsed.qtyracikan,
        qtypembulatan: itemUsed.qtypembulatan,
        qtyjumlahracikan: item.qty,
        // harus koder dari subitem
        kode_r_tambahan: subItem?.koder || null,
        nobatch: itemUsed.nobatch
    }, {
        transaction: transaction
    })
    created = created.toJSON()
    return { created, norecresep: created.norec }
}

const hDeleteResep = async (
    norecorderresep,
    transaction
) => {

    let deleted = await t_orderresepdetail.destroy({
        where: {
            objectorderresepfk: norecorderresep
        },
        transaction: transaction,
        returning: true
    })
    return { deleted }
}

const hCreateOrderResep = async () => {
    const date = new Date()
    const dateTodayStart = getDateStart()
    const dateTodayEnd = getDateEnd()
    let totalOrderToday = await t_orderresep.count({
        where: {
            tglinput: {
                [Op.between]: [dateTodayStart, dateTodayEnd]
            }
        },
    })
    totalOrderToday = ("0000" + totalOrderToday).slice(-4)
    const kodeOrder = "O" + date.getFullYear()
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + ("0" + date.getDate()).slice(-2)
        + totalOrderToday

    return kodeOrder
}

// 63
const hCreateRiwayatObat = async (req, res, transaction, {
    resep,
    norecpasienigd,
}) => {
    const deleted = await db.t_riwayatobatpasien.destroy({
        where: {
            objectpasienigdfk: norecpasienigd
        },
        transaction: transaction
    })
    const createdRiwayat = await Promise.all(
        resep.map(async (r) => {
            const created = await db.t_riwayatobatpasien.create({
                norec: uuid.v4().substring(0, 32),
                kdprofile: 0,
                statusenabled: true,
                reportdisplay: r.namaobat,
                objectpasienigdfk: norecpasienigd,
                kode_r: r.koder,
                objectprodukfk: r.obat,
                objectsignafk: r.signa,
                objectketeranganresepfk: r.keterangan,
                objectlinkmenufk: 63, // triage
            }, {
                transaction: transaction
            })
            return created.toJSON()
        })
    )
    return createdRiwayat
}

const hCreateRiwayatPenyakit = async (req, res, transaction, {
    riwayat,
    norecpasienigd,
}) => {
    const deleted = await db.t_riwayatpenyakit.destroy({
        where: {
            norecreferenci: norecpasienigd
        },
        transaction: transaction
    })
    const createdRiwayat = await Promise.all(
        riwayat.map(async (r) => {
            const created = await db.t_riwayatpenyakit.create({
                norec: uuid.v4().substring(0, 32),
                norecreferenci: norecpasienigd,
                namapenyakit: r.display,
                objectlinkfk: 63,
                objectterminologifk: r.value,
            }, {
                transaction: transaction
            })
            return created.toJSON()
        })
    )
    return createdRiwayat
}

const hCreateRiwayatAlergi = async (req, res, transaction, {
    riwayat,
    norecpasienigd,
    jenisalergi
}) => {
    const deleted = await db.t_riwayatalergi.destroy({
        where: {
            norecreferenci: norecpasienigd,
            objectjenisalergifk:jenisalergi
        },
        transaction: transaction
    })
    const createdRiwayat = await Promise.all(
        riwayat.map(async (r) => {
            const created = await db.t_riwayatalergi.create({
                norec: uuid.v4().substring(0, 32),
                norecreferenci: norecpasienigd,
                namaalergi: r.label,
                objectlinkfk: 63,
                objectterminologikfafk: r.value,
                objectjenisalergifk:jenisalergi
            }, {
                transaction: transaction
            })
            return created.toJSON()
        })
    )
    return createdRiwayat
}

const hUpsertEMRAsesmenAwalIGD = async (req, res, transaction) => {
    let norecemr
    let emrPasien = await db.t_emrpasien.findOne({
        where: {
            objectantreanpemeriksaanfk: req.body.ttvval.norecap,
            idlabel: req.body.ttvval.idlabel
        },
        transaction: transaction
    })
    if (emrPasien) {
        emrPasien = emrPasien.toJSON()
        norecemr = emrPasien.norec
    } else {
        emrPasien = await db.t_emrpasien.create({
            norec: uuid.v4().substring(0, 32),
            statusenabled: true,
            label: req.body.ttvval.label,
            idlabel: req.body.ttvval.idlabel,
            objectantreanpemeriksaanfk: req.body.ttvval.norecap,
            objectpegawaifk: req.userId,
            tglisi: new Date()
        }, { 
            transaction 
        });
        let emrData = emrPasien.toJSON()
        norecemr = emrData.norec
    }
    return {emrPasien, norecemr}
}

const hUpsertTTVAsesmenAwalIGD = async (req, res, transaction, {
    norecemr
}) => {
    let ttv
    const ttvVal = req.body.ttvval
    let norecttv = req.body.norecttv || ""

    const rate = ttvVal.gcse + ttvVal.gcsm + ttvVal.gcsv;
    const { codeNadi } =await evaluateNadi(ttvVal.norecdp, ttvVal.nadi);
    const { codePernapasan} =await evaluatePernapasan(ttvVal.norecdp, ttvVal.pernapasan);
    const { codeSuhu} =await evaluateSuhu(ttvVal.norecdp, ttvVal.suhu);
    const { codeSistol} =await evaluateSistol(ttvVal.norecdp, ttvVal.sistole);
    const { codeDiastol} =await evaluateDiastol(ttvVal.norecdp, ttvVal.diastole);
    const idgcs = await getGcsId(rate);

    if(!norecttv){
        norecttv = uuid.v4().substring(0, 32)
        ttv = await db.t_ttv.create({
            norec: norecttv,
            statusenabled: true,
            objectemrfk: norecemr,
            tinggibadan: ttvVal.tinggibadan,
            beratbadan: ttvVal.beratbadan,
            suhu: ttvVal.suhu,
            e: ttvVal.gcse,
            m: ttvVal.gcsm,
            v: ttvVal.gcsv,
            nadi: ttvVal.nadi,
            alergi: ttvVal.alergi,
            spo2: ttvVal.spo2,
            pernapasan: ttvVal.pernapasan,
            keadaanumum: ttvVal.keadaanumum,
            tekanandarah: ttvVal.tekanandarah,
            tglisi: new Date(),
            objectgcsfk: idgcs,
            objectpegawaifk: req.idPegawai,
            sistole:ttvVal.sistole,
            diastole:ttvVal.diastole,
            objecthasilnadifk:codeNadi,
            objecthasilpernapasanfk:codePernapasan,
            objecthasilsuhufk:codeSuhu,
            objecthasilsistolfk:codeSistol,
            objecthasildiastolfk:codeDiastol
        }, { transaction });
        ttv = ttv.toJSON()
    } else {
        const updatedTTV = await db.t_ttv.findByPk(norecttv, {
            transaction: transaction
        })
        await updatedTTV.update({
            statusenabled: true,
            objectemrfk: norecemr,
            tinggibadan: ttvVal.tinggibadan,
            beratbadan: ttvVal.beratbadan,
            suhu: ttvVal.suhu,
            e: ttvVal.gcse,
            m: ttvVal.gcsm,
            v: ttvVal.gcsv,
            nadi: ttvVal.nadi,
            alergi: ttvVal.alergi,
            spo2: ttvVal.spo2,
            pernapasan: ttvVal.pernapasan,
            keadaanumum: ttvVal.keadaanumum,
            tekanandarah: ttvVal.tekanandarah,
            tglisi: new Date(),
            objectgcsfk: idgcs,
            objectpegawaifk: req.idPegawai,
            sistole:ttvVal.sistole,
            diastole:ttvVal.diastole,
            objecthasilnadifk:codeNadi,
            objecthasilpernapasanfk:codePernapasan,
            objecthasilsuhufk:codeSuhu,
            objecthasilsistolfk:codeSistol,
            objecthasildiastolfk:codeDiastol
        }, { transaction });
        ttv = updatedTTV.toJSON()
    }

    return ttv
}

const hUpsertAsesmenAwalIGD = async (req, res, 
    transaction, 
    {
        norecemr
    }
) => {
    
    const resikoJatuhBody = req.body.resikojatuh
    const resikoJatuhHDSBody = req.body.resikojatuhhds

    const cekNull = (data) => data === "" || data === null || data === undefined ? null : data
    let upsertedAsesmen

    let norecasesmenawaligd = req.body.norecasesmenawaligd || ""
    const isMfs = cekNull(resikoJatuhBody.riwayatjatuh) !== null
    let interpretasimfs = null
    let interpretasihds = null
    if(isMfs){
        const skor = resikoJatuhBody.skor || 0
        const interpretasi = (await pool.query(qInterpretasiResiko, ['mfs'])).rows

        interpretasi.forEach((interpretasi) => {
            if(skor >= interpretasi.nilaimin && skor < interpretasi.nilaimax){
                interpretasimfs = interpretasi.value
            }
        })
    } else {
        const skor = resikoJatuhBody.skor || 0
        const interpretasi = (await pool.query(qInterpretasiResiko, ['hds'])).rows

        interpretasi.forEach((interpretasi) => {
            if(skor >= interpretasi.nilaimin && skor < interpretasi.nilaimax){
                interpretasihds = interpretasi.value
            }
        })
    }
    if(!norecasesmenawaligd){
        norecasesmenawaligd = uuid.v4().substring(0, 32)
        upsertedAsesmen = await db.t_asesmenawaligd.create({
            norec: norecasesmenawaligd,
            objectemrpasienfk: norecemr,
            statusenabled: true,
            tglinput: new Date(),
            isnyeri: req.body.statusnyeri,
            isnyeri_ihs_id: null,
            skalanyeri: req.body.skalanyeri || null,
            skalanyeri_ihs_id: null,
            objectterminologilokasinyerifk: req.body.lokasi || null,
            lokasinyeri_ihs_id: req.body.ihs_idlokasi || null,
            penyebabnyeri: req.body.penyebab || "",
            penyebabnyeri_ihs_id: null,
            durasi: req.body.durasi || null,
            objectsatuannyerifk: req.body.satuandurasi || null,
            durasinyeri_ihs_id: null,
            frekuensinyeri: req.body.frekuensinyeri || "",
            frekuensinyeri_ihs_id: null,
            mfs_skorjatuh: cekNull(resikoJatuhBody.riwayatjatuh),
            mfs_penyakit: cekNull(resikoJatuhBody.diagnosissekunder),
            mfs_alatbantujalan: cekNull(resikoJatuhBody.alatbantuberjalan),
            mfs_infus: cekNull(resikoJatuhBody.infus),
            mfs_carajalan: cekNull(resikoJatuhBody.kondisi),
            mfs_statusmental: cekNull(resikoJatuhBody.statusmental),
            mfs_totalskor: resikoJatuhBody.skor || 0,
            // TODO: hitung interpretasi
            objectinterpretasimfsfk: interpretasimfs,
            mfs_ihs_id: null,
            hds_usia: cekNull(resikoJatuhHDSBody.umur),
            hds_jeniskelamin: cekNull(resikoJatuhHDSBody.jeniskelamin),
            hds_diagnosa: cekNull(resikoJatuhHDSBody.diagnosa),
            hds_gangguankognitif: cekNull(resikoJatuhHDSBody.gangguankognitif),
            hds_lingkungan: cekNull(resikoJatuhHDSBody.faktorlingkungan),
            hds_pembedahan: cekNull(resikoJatuhHDSBody.pembedahan),
            hds_medikamentosa: cekNull(resikoJatuhHDSBody.medikamentosa),
            hds_totalskor: cekNull(resikoJatuhHDSBody.skor),
            objectinterpretasihdsfk: interpretasihds,
            hds_ihs_id: null,
            objectttvfk: null,
        }, {
            transaction: transaction
        })
        upsertedAsesmen = upsertedAsesmen.toJSON()
    } else {
        let updatedAsesmen = await db.t_asesmenawaligd.findByPk(norecasesmenawaligd, {
            transaction: transaction
        })
        await updatedAsesmen.update({
            objectemrpasienfk: norecemr,
            statusenabled: true,
            tglinput: new Date(),
            isnyeri: req.body.statusnyeri,
            isnyeri_ihs_id: null,
            skalanyeri: req.body.skalanyeri || null,
            skalanyeri_ihs_id: null,
            objectterminologilokasinyerifk: req.body.lokasi || null,
            lokasinyeri_ihs_id: req.body.ihs_idlokasi || null,
            penyebabnyeri: req.body.penyebab || "",
            penyebabnyeri_ihs_id: null,
            durasi: req.body.durasi || null,
            objectsatuannyerifk: req.body.satuandurasi || null,
            durasinyeri_ihs_id: null,
            frekuensinyeri: req.body.frekuensinyeri || "",
            frekuensinyeri_ihs_id: null,
            mfs_skorjatuh: cekNull(resikoJatuhBody.riwayatjatuh),
            mfs_penyakit: cekNull(resikoJatuhBody.diagnosissekunder),
            mfs_alatbantujalan: cekNull(resikoJatuhBody.alatbantuberjalan),
            mfs_infus: cekNull(resikoJatuhBody.infus),
            mfs_carajalan: cekNull(resikoJatuhBody.kondisi),
            mfs_statusmental: cekNull(resikoJatuhBody.statusmental),
            mfs_totalskor: resikoJatuhBody.skor || 0,
            // TODO: hitung interpretasi
            objectinterpretasimfsfk: interpretasimfs,
            mfs_ihs_id: null,
            hds_usia: cekNull(resikoJatuhHDSBody.umur),
            hds_jeniskelamin: cekNull(resikoJatuhHDSBody.jeniskelamin),
            hds_diagnosa: cekNull(resikoJatuhHDSBody.diagnosa),
            hds_gangguankognitif: cekNull(resikoJatuhHDSBody.gangguankognitif),
            hds_lingkungan: cekNull(resikoJatuhHDSBody.faktorlingkungan),
            hds_pembedahan: cekNull(resikoJatuhHDSBody.pembedahan),
            hds_medikamentosa: cekNull(resikoJatuhHDSBody.medikamentosa),
            hds_totalskor: cekNull(resikoJatuhHDSBody.skor),
            objectinterpretasihdsfk: interpretasihds,
            hds_ihs_id: null,
            objectttvfk: null,
        }, {
            transaction: transaction
        })
        upsertedAsesmen = updatedAsesmen.toJSON()
    }
    return upsertedAsesmen
}

const hUpsertPemeriksaanFisik = async (req, res, transaction, {
    upsertedAsesmen,
}) => {
    const norecasesmenawal = upsertedAsesmen.norec
    let pemeriksaanFisik = []
    const hasilPemeriksaanFisik = req.body.pemeriksaanfisik || []
    let allPemeriksaanBeforeModel = await db.t_asesmenawaligd_fisik.findAll({
        where: {
            objectasesmenawaligd: norecasesmenawal
        },
        transaction: transaction
    })
    const allPemeriksaanBefore = await Promise.all(
        allPemeriksaanBeforeModel.map(async (model) => {
            const val = model.toJSON()
            await model.destroy({transaction: transaction})
            return val
        })
    )
    pemeriksaanFisik = await Promise.all(
        hasilPemeriksaanFisik.map(async (pemeriksaan) => {
            if(pemeriksaan.normal) return null
            const created = await db.t_asesmenawaligd_fisik.create({
                norec: uuid.v4().substring(0, 32),
                objectasesmenawaligd: norecasesmenawal,
                objectterminologifk: pemeriksaan.value,
                keterangan: pemeriksaan.abnormalteks,
                ihs_id: null
            }, {
                transaction: transaction
            })
            return created.toJSON()
        })
    )
    pemeriksaanFisik.filter(pemeriksaan => pemeriksaan !== null)
    return pemeriksaanFisik
}

async function tempJsonNewClaim(reqTemp) {
    let conditionData = {
        "metadata": {
            "method": "new_claim"
        },
        "data": {
            "nomor_kartu": '000000000001COBA',
            "nomor_sep": '0123456789COBA',
            "nomor_rm": '000COBA',
            "nama_pasien": 'COBA',
            "tgl_lahir": '1940-01-01 02:00:00',
            "gender": '2'
        }
    };
                return conditionData
}

async function tempJsonSetClaim(reqTemp) {
        const resultList = await queryPromise2(`SELECT row_number() OVER (ORDER BY td.norec) AS no,dp.noregistrasi,
        to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,td.norec, mi.kodeexternal ||' - '|| mi.reportdisplay as label,
        mi.id as value, td.keterangan,td.objecttipediagnosafk,mt.reportdisplay as tipediagnosa,
        td.objectjeniskasusfk, jk.reportdisplay as jeniskasus, mu.namaunit, mi.kodeexternal as kodediagnosa,
        dp.ihs_id as ihs_dp,td.ihs_id as ihs_diagnosa, mp.namapasien,mp.ihs_id as ihs_pasien,dp.norec as norecdp
        FROM t_daftarpasien dp 
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
        join t_diagnosapasien td  on td.objectantreanpemeriksaanfk =ta.norec
        join m_unit mu on mu.id=ta.objectunitfk
        join m_tipediagnosa mt on mt.id=td.objecttipediagnosafk
        join m_jeniskasus jk on jk.id=td.objectjeniskasusfk
        join m_icdx mi on mi.id=td.objecticdxfk
        join m_pasien mp on mp.id=dp.nocmfk where dp.norec='${reqTemp}' and td.statusenabled=true
        `);
        let paramDiagnosa = ''
        for (let x = 0; x < resultList.rows.length; x++) {
            if (paramDiagnosa === '') {
                paramDiagnosa = resultList.rows[x].kodediagnosa
            } else {
                paramDiagnosa = paramDiagnosa + '#' + resultList.rows[x].kodediagnosa
            }
        }
        const resultList9 = await queryPromise2(`SELECT row_number() OVER (ORDER BY td.norec) AS no,dp.noregistrasi,
        to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,td.norec,mu.namaunit,
        mi.kodeexternal ||' - '|| mi.reportdisplay as label,
        mi.id as value, td.keterangan, td.qty,dp.ihs_id as ihs_dp,td.ihs_id as ihs_diagnosa, mp.namapasien,mp.ihs_id as ihs_pasien,dp.norec as norecdp,
        mi.kodeexternal as kodediagnosa,mp2.ihs_id as ihs_dokter
                FROM t_daftarpasien dp 
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
        join t_diagnosatindakan td  on td.objectantreanpemeriksaanfk =ta.norec
        join m_unit mu on mu.id=ta.objectunitfk
        join m_icdix mi on mi.id=td.objecticdixfk
        join m_pasien mp on mp.id=dp.nocmfk
        join m_pegawai mp2 on mp2.id=td.objectpegawaifk where dp.norec='${reqTemp}' and td.statusenabled=true
        `);
        let paramDiagnosa9 = ''
        for (let x = 0; x < resultList9.rows.length; x++) {
            if (paramDiagnosa9 === '') {
                paramDiagnosa9 = resultList9.rows[x].kodediagnosa
            } else {
                paramDiagnosa9 = paramDiagnosa9 + '#' + resultList9.rows[x].kodediagnosa
            }
        }
    let conditionData = {
        "metadata": {
            "method": "set_claim_data",
            "nomor_sep": '0123456789COBA'
        },
        "data": {
            "nomor_sep": '0123456789COBA',
            "nomor_kartu": '000000000001COBA',
            "tgl_masuk": "2024-01-15 12:55:00",
            "tgl_pulang": "2024-01-15 12:55:00",
            "cara_masuk": 'gp',
            "jenis_rawat": '1',
            "kelas_rawat": "3",
            "adl_sub_acute": "",
            "adl_chronic": "",
            "icu_indikator": "",
            "icu_los": "",
            "ventilator_hour": "",
            "ventilator": {
                "use_ind": "",
                "start_dttm": "",
                "stop_dttm": ""
            },
            "upgrade_class_ind": "0",
            "upgrade_class_class": "",
            "upgrade_class_los": "",
            "upgrade_class_payor": "",
            "add_payment_pct": "",
            "birth_weight": 0,
            "sistole": "",
            "diastole": '',
            "discharge_status": 1,
            "diagnosa": paramDiagnosa,//unu Grouper
            "procedure": paramDiagnosa9,
            "diagnosa_inagrouper": "#",
            "procedure_inagrouper": "#",
            "tarif_rs": {
                "prosedur_non_bedah": 0,
                "prosedur_bedah": 0,
                "konsultasi": 0,
                "tenaga_ahli": 0,
                "keperawatan": 0,
                "penunjang": 0,
                "radiologi": 0,
                "laboratorium": 0,
                "pelayanan_darah": 0,
                "rehabilitasi": 0,
                "kamar": 0,
                "rawat_intensif": 0,
                "obat": 0,
                "obat_kronis": 0,
                "obat_kemoterapi": 0,
                "alkes": 0,
                "bmhp": 0,
                "sewa_alat": 0
            },
            "tarif_poli_eks": "0",
            "nama_dokter": 'COBA',
            "kode_tarif": "AP",
            "payor_id": "3",
            "payor_cd": "JKN",
            "cob_cd": "",
            "coder_nik": "123123123123"
        }
    };
                return conditionData
}

async function tempJsonGrouper(reqTemp) {
    let conditionData = {
        "metadata": {
            "method": "grouper",
            "stage": "1"
        },
        "data": {
            "nomor_sep": '0123456789COBA'
        }
    };
                return conditionData
}