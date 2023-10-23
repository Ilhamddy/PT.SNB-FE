import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import db from "../../../models";
import queries from '../../../queries/sumberDayaManusia/sumberDayaManusia.queries';
import unitQueries from '../../../queries/master/unit/unit.queries'
import pegawaiQueries from '../../../queries/master/pegawai/pegawai.queries'
import kamarQueries from "../../../queries/master/kamar/kamar.queries";
import hariQueries from "../../../queries/master/hari/hari.queries";

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

const getDaftarPegawai = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let unit = ' '
        if (req.query.unit !== '') {
            unit = ` mp.objectunitfk=${req.query.unit} and `
        }
        let query = queries.qDaftarPegawai + ` where ${unit} (mp.namalengkap ilike '%${req.query.search}%' or 
        mp.nip ilike '%${req.query.search}%') `
        const resultlist = await pool.query(query);
        const tempres = {

        };
        console.log(query)
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: resultlist.rows,
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

const getComboSDM = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const result1 = await pool.query(queries.qUnit, []);
        const result2 = await pool.query(queries.qJenisKelamin, []);
        const result3 = await pool.query(queries.qGolonganDarah, []);
        const result4 = await pool.query(queries.qEtnis, []);
        const result5 = await pool.query(queries.qPendidikan, []);
        const result6 = await pool.query(queries.qPerkawinan, []);
        const result7 = await pool.query(queries.qAgama, []);
        const result8 = await pool.query(queries.qGolonganPegawai, []);
        const result9 = await pool.query(queries.qStatusPegawai, []);
        const result10 = await pool.query(queries.qProfesiPegawai, []);
        const result11 = await pool.query(queries.qJabatan, []);
        const result12 = await pool.query(queries.qGolonganPtkp, []);
        const result13 = await pool.query(queries.qUnitKerja, []);
        const tempres = {
            unit: result1.rows,
            jenisKelamin: result2.rows,
            golonganDarah: result3.rows,
            etnis: result4.rows,
            pendidikan: result5.rows,
            perkawinan: result6.rows,
            agama: result7.rows,
            golonganPegawai :result8.rows,
            statusPegawai:result9.rows,
            profesi:result10.rows,
            jabatan:result11.rows,
            golonganPtkp:result12.rows,
            unitKerja:result13.rows
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

const saveBiodataPegawai = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { pegawai } = await db.sequelize.transaction(async (transaction) => {
            let pegawai = ''
            if(req.body.task===1){
                if (req.body.idPegawai === '') {
                    pegawai = await db.m_pegawai.create({
                        statusenabled: true,
                        nama:req.body.namalengkap,
                        namaexternal: req.body.gelardepan + req.body.namalengkap + req.body.gelarbelakang,
                        reportdisplay: req.body.inisialNama,
                        namahafis:req.body.inisialNama,
                        namalengkap: req.body.gelardepan + req.body.namalengkap + req.body.gelarbelakang,
                        gelardepan: req.body.gelardepan,
                        gelarbelakang: req.body.gelarbelakang,
                        noidentitas: req.body.nik,
                        objectjeniskelaminfk: req.body.jenisKelamin,
                        tempatlahir: req.body.tempatLahir,
                        tgllahir: req.body.tglLahir,
                        objectagamafk: req.body.agama,
                        objectgolongandarahfk: req.body.golonganDarah,
                        objectetnisfk: req.body.suku,
                        notlp: req.body.noTelp,
                        nohandphone: req.body.noHp,
                        email: req.body.email,
                        objectpendidikanterakhirfk: req.body.pendidikanTerakhir,
                        objectstatusperkawinanpegawaifk: req.body.statusPernikahan,
                        namaibu: req.body.namaIbuKandung,
                        nip: req.body.nip,
                    }, { transaction });
                } else {
                    pegawai = await db.m_pegawai.update({
                        statusenabled: true,
                        nama:req.body.namalengkap,
                        namaexternal: req.body.gelardepan + req.body.namalengkap + req.body.gelarbelakang,
                        reportdisplay: req.body.inisialNama,
                        namahafis:req.body.inisialNama,
                        namalengkap: req.body.gelardepan + req.body.namalengkap + req.body.gelarbelakang,
                        gelardepan: req.body.gelardepan,
                        gelarbelakang: req.body.gelarbelakang,
                        noidentitas: req.body.nik,
                        objectjeniskelaminfk: req.body.jenisKelamin,
                        tempatlahir: req.body.tempatLahir,
                        tgllahir: req.body.tglLahir,
                        objectagamafk: req.body.agama,
                        objectgolongandarahfk: req.body.golonganDarah,
                        objectetnisfk: req.body.suku,
                        notlp: req.body.noTelp,
                        nohandphone: req.body.noHp,
                        email: req.body.email,
                        objectpendidikanterakhirfk: req.body.pendidikanTerakhir,
                        objectstatusperkawinanpegawaifk: req.body.statusPernikahan,
                        namaibu: req.body.namaIbuKandung,
                        nip: req.body.nip,
                    }, {
                        where: {
                            id: req.body.idPegawai,
                        },
                        transaction: transaction
                    });
                }
            }else if(req.body.task===2){
                pegawai = await db.m_pegawai.update({
                    alamatktp: req.body.alamat,
                    rtktp: req.body.rt,
                    rwktp: req.body.rw,
                    objectdesakelurahanktpfk: req.body.desa,
                    kodeposktp: req.body.kodepos,
                    alamatdom: req.body.alamatDomisili,
                    rtdom: req.body.rtDomisili,
                    rwdom: req.body.rwDomisili,
                    objectdesakelurahandomfk: req.body.desaDomisili,
                    kodeposdom: req.body.kodeposDomisili,
                }, {
                    where: {
                        id: req.body.idPegawai,
                    },
                    transaction: transaction
                });
            }else if(req.body.task===3){
                pegawai = await db.m_pegawai.update({
                    nosk: req.body.noSK,nosip: req.body.noSIP,
                    nostr: req.body.noSTR,npwp: req.body.npwp,
                    objectgolonganfk: req.body.golongan,objectstatuspegawaifk: req.body.statusPegawai,
                    objectprofesipegawaifk: req.body.profesi,objectjabatanfk: req.body.jabatan,
                    tglmasuk: req.body.tglSKStart,tglpensiun: req.body.tglSKend,
                    tglterbitsip: req.body.tglSIPStart,tglberakhirsip: req.body.tglSIPend,tglterbitstr: req.body.tglSTRStart,
                    tglberakhirstr: req.body.tglSTRend,objectgolonganptkpfk: req.body.golonganPTKP,qtyanak: req.body.jumlahAnak,
                    qtytanggungan: req.body.jumlahTanggungan,
                    objectunitfk: req.body.unitPelayanan,objectunitkerjafk: req.body.unitKerja,
                }, {
                    where: {
                        id: req.body.idPegawai,
                    },
                    transaction: transaction
                });
            }
            

            return { pegawai }
        });
        const tempres = {
            pegawai: pegawai
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


const getPegawaiById = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result1 = await pool.query(queries.qPegawaiById, [req.query.idPegawai]);
        const tempres = {
        
        };
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

const getComboJadwal = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const dokter = (await pool.query(pegawaiQueries.getDokterNip)).rows
        const poliklinik = (await pool.query(unitQueries.getPoliklinik)).rows
        const kamar = (await pool.query(kamarQueries.getAll)).rows
        const hari = (await pool.query(hariQueries.getAll)).rows

        const tempres = {
            dokter: dokter,
            poliklinik: poliklinik,
            kamar: kamar,
            hari: hari
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

const getJadwalDokter = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let jadwal = (await pool.query(queries.qJadwalDokter, [])).rows
        jadwal = jadwal.map(item => {
            const dateNow = new Date().toLocaleDateString("id-ID",
                {
                    year: "numeric",
                     month: "2-digit", 
                     day: "2-digit", 
                })
            const parts = dateNow.split("/")
            const partsTimeMulai = item.jam_mulai.split(":")
            const partsTimeSelesai = item.jam_selesai.split(":")
            const dateMulai = new Date(
                parts[2], 
                parts[1] - 1, 
                parts[0], 
                partsTimeMulai[0], 
                partsTimeMulai[1], 
                partsTimeMulai[2]
            )
            const dateSelesai = new Date(
                parts[2], 
                parts[1] - 1, 
                parts[0], 
                partsTimeSelesai[0], 
                partsTimeSelesai[1], 
                partsTimeSelesai[2]
            )
            return {
                ...item,
                jam_mulai: dateMulai.toISOString(),
                jam_selesai: dateSelesai.toISOString(),
            }
        })
        const tempres = {
            jadwal: jadwal
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

export default {
    getDaftarPegawai,
    getComboSDM,
    saveBiodataPegawai,
    getPegawaiById,
    getComboJadwal,
    getJadwalDokter
}