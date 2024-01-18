import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/registrasi.queries';
import queriesUnit, { daftarUnit } from '../../../queries/mastertable/unit/unit.queries';

import db from "../../../models";
import { createTransaction, dateBetweenEmptyString, dateEmptyString, emptyIlike, emptyInt } from "../../../utils/dbutils";
import bcrypt from "bcryptjs";
import { pasienSignup } from "../../auth/authhelper";
import { belumDiperiksa, iconPenunjang, iconRI, iconRJ, sedangDiperiksa, selesaiDiperiksa, siapPakai, totalTempatRusak, totalTempatTerisi } from "./icon";
import { getDateEnd, getDateEndNull, getDateStart, getDateStartEnd, getDateStartEndNull, getDateStartNull } from "../../../utils/dateutils";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import { hUpsertEncounter, hUpsertEncounterPulang } from "../satuSehat/satuSehatEncounter.helper";
import { hupsertPatientNewBorn } from "../satuSehat/satuSehatPatient.helper";

const m_pasien = db.m_pasien
const running_Number = db.running_number
const t_daftarpasien = db.t_daftarpasien


const allSelect = (req, res) => {
    pool.query(queries.getAll, (error, result) => {
        if (error) throw error;
        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        });
    });
};

let queryPromise2 = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};

const addPost = (req, res) => {
    const { namapasien, noidentitas } = req.body;
    pool.query(queries.checkNewNumber, (error, result) => {
        if (error) {
            throw error
        } else {
            let nocm = result.rows[0].new_number + 1
            let new_number = result.rows[0].new_number + 1
            for (let x = result.rows[0].new_number.toString().length; x < result.rows[0].extention; x++) {
                nocm = '0' + nocm;
            }

            pool.query(
                queries.addPost, [nocm, namapasien, noidentitas],
                (error, result) => {
                    if (error) {
                        throw error
                    } else {
                        pool.query(queries.getPasienByNocm, [nocm], (error, result) => {
                            if (error) {
                                throw error
                            } else {
                                pool.query(queries.updateRunning_number, [new_number], (error, resultUpdate) => {
                                    if (error) {
                                        throw error
                                    } else {
                                        res.status(200).send({
                                            data: result.rows,
                                            status: "success",
                                            success: true,
                                        });
                                    }

                                })

                            }

                            // res.status(200).send(result.rows);

                        });
                    }
                }
            )
        }
    });
}

const updatePasienById = (req, res) => {
    const { namapasien, noidentitas, nobpjs, nohp, id } = req.body;
    const logger = res.locals.logger
    try {

        pool.query(queries.updatePasienById, [namapasien, noidentitas, nobpjs, nohp, id], (error, result) => {
            if (error) {
                logger.error(error)
                res.status(500).send({ message: error, status: "errors" });
            } else {
                pool.query(queries.getPasienById, [id], (error, resultx) => {
                    if (error) {
                        logger.error(error)
                        res.status(500).send({ message: error, status: "errors" });
                    } else {
                        res.status(200).send({
                            data: resultx.rows,
                            status: "success",
                            success: true,
                        });
                    }

                })

            }

        })


    } catch (e) {
        res.status(500).send({ message: e, status: "errors" });
    }
}

const getPasienById = (req, res) => {
    const id = parseInt(req.params.id);
    const logger = res.locals.logger
    pool.query(queries.getPasienById, [id], (error, result) => {
        if (error) {
            logger.error(error)
            res.status(500).send({ message: error, status: "errors" });
        } else {
            if (result.rows.length == 0) {
                res.status(201).send({
                    data: "",
                    status: "Data Tidak Ada",
                    success: true,
                });
            } else {
                let tempres = ""
                for (let i = 0; i < result.rows.length; ++i) {
                    if (result.rows[i] !== undefined) {
                        let todays = formatDate(new Date())
                        let tgldaftar = formatDate(new Date(result.rows[i].tgldaftar))
                        let statuspasien = 'LAMA'
                        if (todays === tgldaftar)
                            statuspasien = 'BARU'
                        tempres = {
                            id: result.rows[i].id, nocm: result.rows[i].nocm, namapasien: result.rows[i].namapasien,
                            noidentitas: result.rows[i].noidentitas, nobpjs: result.rows[i].nobpjs, nohp: result.rows[i].nohp,
                            tgllahir: result.rows[i].tgllahir, statuspasien: statuspasien,profile: result.rows[i].profile
                        }

                    }
                }

                res.status(200).send({
                    data: tempres,
                    status: "success",
                    success: true,
                });
            }
        }

    })
}

const getAllByOr = async (req, res) => {
    const logger = res.locals.logger
    res.locals.showBodyRes();
    try{
        const nocm = req.query.nocm;
        let query = queries.getAllByOr + ` 
        WHERE 
            nocm IS NOT NULL 
            AND (nocm ilike '%${nocm}%' OR namapasien ilike '%${nocm}%')
        `
        let taskid = ""
    
        if (req.query.taskid !== undefined) {
            if (req.query.taskid === '2') {
                // console.log(req.query.taskid)
                taskid = ` AND ta.taskid=4`;
            } else if (req.query.taskid === '3') {
                taskid = ` AND ta.taskid in (5,6,7,8,9)`;
            } else if (req.query.taskid === '1') {
                taskid = ` AND ta.taskid=3`;
            }
        } else {
            taskid = ` AND ta.taskid=3`;
        }
        const result = await pool.query(query)
        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        });
    } catch(error) {
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }
};

const savePasien = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {

        const objBody = req.body
        let nocm

        if(!objBody.ismanualnorm){
            const getNocm = await running_Number.findAll({
                where: {
                    id: 1
                }
            })
            await running_Number.update({ new_number: nocm }, {
                where: {
                    id: 1
                },
                transaction: transaction
            });
            nocm = getNocm[0].new_number + 1
            let totalExtension = Number(getNocm[0].extention)
            let zero = ''
            for (let x = 0; x < totalExtension; x++) {
                zero = zero + '0'
            }
            nocm = (zero + nocm).slice(-totalExtension)
        } else {
            nocm = objBody.manualnorm
        }
        
        let userPasien = null
        let result
        if (!objBody.id) {
            result = await hCreatePasien(req, res, transaction, { objBody, nocm })

            userPasien = await pasienSignup(
                req,
                res,
                transaction,
                {
                    norm: result.nocm,
                    password: result.noidentitas
                })
            userPasien = userPasien?.toJSON() || null
        } else {
            result = await hUpdatePasien(
                req, 
                res, 
                transaction, 
                {
                    nocm
                })
        }
        await transaction.commit();
        res.status(200).send({
            data: result,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        logger.error(error);
        await transaction.rollback();
        res.status(error.httpcode || 500).send({
            msg: error.message || 'Gagal',
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}

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

async function saveRegistrasiPasien(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {
        let norecDP = uuid.v4().substring(0, 32)
        let objectpenjaminfk = req.body?.penjamin?.[0]?.value || null
        let objectpenjamin2fk = req.body?.penjamin?.[1]?.value || null
        let objectpenjamin3fk = req.body?.penjamin?.[2]?.value || null
        const todayStart = getDateStart()
        const todayEnd = getDateEnd()
        const noregistrasi = await hCreateNoreg(new Date().toISOString())
        let resultCountNoantrianDokter = await pool.query(queries.qNoAntrian, [req.body.dokter, todayStart, todayEnd]);
        let noantrian = parseFloat(resultCountNoantrianDokter.rows[0].count) + 1
        if (!req.body.kelas)
            req.body.kelas = 8

        let tglpulang = req.body.tglregistrasi
        if(req.body.tujkunjungan===2)
            tglpulang = null
        let dpBefore = null
        let daftarPasien = null
        if(req.body.norecdp){
            // verifikasi
            norecDP = req.body.norecdp
            dpBefore = await t_daftarpasien.findOne({
                where:{
                    norec:req.body.norecdp
                },
                transaction: transaction
            })
            if(!dpBefore) throw new NotFoundError(`Daftar pasien tidak ada: ${req.body.norecdp}`)
            await dpBefore.update({
                nocmfk: req.body.id,
                noregistrasi: noregistrasi,
                tglregistrasi: req.body.tglregistrasi,
                objectunitlastfk: req.body.unittujuan,
                objectdokterpemeriksafk: req.body.dokter,
                objectpegawaifk: req.idPegawai,
                objectkelasfk: req.body.kelas,
                objectjenispenjaminfk: req.body.jenispenjamin,
                tglpulang: tglpulang,
                objectasalrujukanfk: req.body.rujukanasal,
                objectinstalasifk: req.body.tujkunjungan,
                objectpenjaminfk: objectpenjaminfk,
                objectpenjamin2fk: objectpenjamin2fk,
                objectpenjamin3fk: objectpenjamin3fk,
                objectpjpasienfk: req.body.penanggungjawab,
                objectcaramasukfk: req.body.caramasuk,
                statusenabled: true,
                statuspasien: req.body.statuspasien
            }, {
                transaction: transaction
            })
            await hDeactivateAp(req, res, transaction, {
                norecDP
            })
            daftarPasien = dpBefore.toJSON()
        } else{
            daftarPasien = await db.t_daftarpasien.create({
                norec: norecDP,
                nocmfk: req.body.id,
                noregistrasi: noregistrasi,
                tglregistrasi: req.body.tglregistrasi,
                objectunitlastfk: req.body.unittujuan,
                objectdokterpemeriksafk: req.body.dokter,
                objectpegawaifk: req.idPegawai,
                objectkelasfk: req.body.kelas,
                objectjenispenjaminfk: req.body.jenispenjamin,
                tglpulang: tglpulang,
                objectasalrujukanfk: req.body.rujukanasal,
                objectinstalasifk: req.body.tujkunjungan,
                objectpenjaminfk: objectpenjaminfk,
                objectpenjamin2fk: objectpenjamin2fk,
                objectpenjamin3fk: objectpenjamin3fk,
                objectpjpasienfk: req.body.penanggungjawab,
                objectcaramasukfk: req.body.caramasuk,
                statusenabled: true,
                statuspasien: req.body.statuspasien,
                caradaftar: 'LOKET'
            }, { 
                transaction 
            });
            daftarPasien = daftarPasien.toJSON()
        }
        const [
            antreanPemeriksaan,
            ttp,
            pasienigd
        ] = await hCreateAp(req, res, transaction, {
            noantrian,
            daftarPasien,
            norecDP
        })
        if(!req.body.norecdp){
            hUpsertEncounter(norecDP,'arrived',false,req.body.norectriage)
        }
        await transaction.commit();
        let tempres = {
            daftarPasien: daftarPasien,
            antreanPemeriksaan: antreanPemeriksaan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        logger.error(error);
        transaction && await transaction.rollback();
        res.status(error.httpcode || 500).send({
            status: error.httpcode || 500,
            success: false,
            msg: error.message || 'Simpan Gagal',
            code: "Error"
        });
    }
}

const getNoAntrean = async (req, res) => {
    const logger = res.locals.logger
    try {
        let query = `
        select nobed,objectkamarfk from t_antreanpemeriksaan
            where 
            t_antreanpemeriksaan.norec='${req.params.norec}'`
        const antrean = await pool.query(query, [])
        res.status(200).send({
            data: antrean.rows?.[0] || [],
            status: 'success',
            success: true,
            msg: 'get berhasil',
            code: 200
        });
    } catch (error) {
        logger.error(error);
        res.status(201).send({
            status: error,
            success: false,
            msg: 'get gagal',
            code: 201
        });
    }
}


const updateRegistrasiPPulang = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {
        const norecDP = req.body.norec
        const norecAP = req.body.norecAP
        if (!req.body.norec) {
            throw new BadRequestError('norec tidak boleh kosong');
        }
        if (!req.body.norecAP) {
            throw new BadRequestError('norecAP tidak boleh kosong');
        }

        const {
            updatedBody,
            updatedBodyAp,
            updatedBodyK,
            updatedBodyKPindah
        }
            = await hUpdateRegistrasiPulang(req, res, transaction)
        await transaction.commit();
        hUpsertEncounterPulang(req.body.norec)
        if (updatedBody && updatedBodyAp) {
            updatedBody.norec = norecDP
            updatedBodyAp.norec = norecAP
        }
        let tempres = { updatedBody, updatedBodyAp, updatedBodyK, updatedBodyKPindah }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Update Pulang Berhasil',
            code: 200
        });

    } catch (e) {
        logger.error(e)
        await transaction.rollback()
        res.status(500).send({
            status: "error",
            success: false,
            msg: e.message,
            code: 500
        });
    }
}
const getRegistrasiPasienNorec = async (req, res) => {
    const logger = res.locals.logger
    try {
        const norec = req.params.norec;
        if (!JSON.stringify(norec)) {
            throw new Error('norec tidak boleh kosong')
        }
        let ruanganpasien = await pool
            .query(`
            SELECT 
                t_daftarpasien.*,
                json_agg(peg) as pegawai, 
                json_agg(dok) as dokter,    
                json_agg(mk) as kelas,
                json_agg(mps) as pasien,
                json_agg(mu) as unit,
                json_agg(mka) as kamar,
                json_agg(tap) as antrean,
                json_agg(mrek1) as penjamin1,
                json_agg(mrek2) as penjamin2,
                json_agg(mrek3) as penjamin3,
                json_agg(mu2) as unitantrean,
                mj.jeniskelamin
            FROM 
                t_daftarpasien
                left join m_pegawai peg on peg.id = t_daftarpasien.objectpegawaifk    
                left join m_pegawai dok on dok.id = t_daftarpasien.objectdokterpemeriksafk
                left join m_kelas mk on mk.id = t_daftarpasien.objectkelasfk
                left join m_pasien mps on mps.id = t_daftarpasien.nocmfk
                left join m_unit mu on mu.id = t_daftarpasien.objectunitlastfk
                left join t_antreanpemeriksaan tap on tap.objectdaftarpasienfk = t_daftarpasien.norec
                left join m_kamar mka on mka.id = tap.objectkamarfk
                left join m_rekanan mrek1 on mrek1.id = t_daftarpasien.objectpenjaminfk
                left join m_rekanan mrek2 on mrek2.id = t_daftarpasien.objectpenjamin2fk
                left join m_rekanan mrek3 on mrek3.id = t_daftarpasien.objectpenjamin3fk
                left join m_unit mu2 on mu2.id = tap.objectunitfk
                left join m_jeniskelamin mj on mj.id=mps.objectjeniskelaminfk 
                where t_daftarpasien.norec = $1
                group by t_daftarpasien.norec,mj.jeniskelamin 
            `
                , [norec])
        if (ruanganpasien.rows[0]) {
            ruanganpasien.rows[0].penjamin1 = ruanganpasien.rows[0].penjamin1?.[0] || null
            ruanganpasien.rows[0].penjamin2 = ruanganpasien.rows[0].penjamin2?.[0] || null
            ruanganpasien.rows[0].penjamin3 = ruanganpasien.rows[0].penjamin3?.[0] || null
        }


        if (ruanganpasien.rows.length === 0) {
            res.status(404).send({
                data: [],
                success: false,
                msg: 'Data Kosong',
                code: 404
            });
            return
        }
        const data = ruanganpasien.rows[0]
        res.status(200).send({
            data: data,
            success: true,
            msg: 'Data Berhasil',
            code: 200
        })
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            status: error,
            success: false,
            msg: 'Simpan Gagal',
            code: 500
        });
    }
}

const getDaftarPasienFilter = async (req, res) => {
    const logger = res.locals.logger
    try {
        let filterTglLast = getDateEndNull(req.query.dateEnd);
        let filterTglStart = getDateStartNull(req.query.dateStart);
        let filterInstalasi = req.query.instalasi;
        const daftarpasien = await pool
            .query(`SELECT td.norec AS norecdp,
            td.noregistrasi AS noregistrasi,
            td.nocmfk AS nocmfk,
            td.tglregistrasi AS tglregistrasi,
            td.tglpulang AS tglpulang,
            peg.namalengkap as namapegawai, 
            dok.namalengkap as namadokter,    
            mk.namakelas as namakelas,
            mps.namapasien as namapasien,
            mu.namaunit as namaunit,
            mrk.namaexternal as namapenjamin,
            mps.noidentitas as noidentitas,
            case when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
            when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mps.objectjeniskelaminfk=1 then 'anaklaki'
            when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mps.objectjeniskelaminfk=2 then 'anakperempuan'
            when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mps.objectjeniskelaminfk=1 then 'dewasalaki'
            when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mps.objectjeniskelaminfk=2 then 'dewasaperempuan'
            when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mps.objectjeniskelaminfk=1 then 'kakek'
            when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mps.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile
                FROM 
                t_daftarpasien td
                left join m_pegawai peg on peg.id = td.objectpegawaifk    
                left join m_pegawai dok on dok.id = td.objectdokterpemeriksafk
                left join m_kelas mk on mk.id = td.objectkelasfk
                left join m_pasien mps on mps.id = td.nocmfk
                left join m_unit mu on mu.id = td.objectunitlastfk
                left join m_rekanan mrk on mrk.id = td.objectpenjaminfk
            WHERE 
                td.tglpulang IS NOT null
                AND
                ${dateBetweenEmptyString("td.tglpulang", "$1", "$2")}
                AND
                ${emptyInt("td.objectinstalasifk", "$3")}
            ORDER BY td.tglpulang DESC
                    LIMIT 25
            `,
            [
                filterTglStart || "",
                filterTglLast || "",
                filterInstalasi || ""
            ]
            )

        if (daftarpasien.rows.length === 0) {
            res.status(200).send({
                data: [],
                success: true,
                msg: 'Data Kosong',
                code: 200
            });
            return
        }
        res.status(200).send({
            data: daftarpasien.rows,
            success: true,
            msg: 'Data Berhasil',
            code: 200
        })
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            status: error,
            success: false,
            msg: error.message,
            code: 500
        });
    }
}

const saveRegistrasiPenjaminFK = async (req, res) => {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {
        let norecPenjaminFK = uuid.v4().substring(0, 32)
        const dataForm = req.body
        let daftarPasien = null;
        if (!!dataForm.nokartunonbpjs) {
            daftarPasien = await db.t_kepesertaanasuransi.create({
                norec: norecPenjaminFK,
                objectdaftarpasienfk: dataForm.norecdp,
                objectpenjaminfk: dataForm.penjamin,
                no_kartu: dataForm.nokartunonbpjs,
                objectdpjpfk: dataForm.dpjpmelayani,
                objectpenjaminfk: dataForm.penjamin,
                plafon: dataForm.plafon,
            }, { transaction: transaction })
        } else {
            daftarPasien = await db.t_kepesertaanasuransi.create({
                norec: norecPenjaminFK,
                objectdaftarpasienfk: dataForm.norecdp,
                objectpenjaminfk: dataForm.penjamin,
                no_kartu: dataForm.nokartu,
                jenisrujukan: dataForm.jenisrujukan,
                tglsep: dataForm.tanggalsep,
                no_rujukan: dataForm.norujukan,
                no_sep: dataForm.nosep,
                tujuankunjungan: dataForm.tujuankunjungan,
                objectdpjpfk: dataForm.dpjpmelayani,
                asalrujukan: dataForm.asalrujukan,
                tglrujukan: dataForm.tanggalrujukan,
                no_skdp: dataForm.nosuratkontrol,
                dpjppemberisurat: dataForm.dpjppemberi,
                objectdiagnosarujukanfk: dataForm.diagnosarujukan,
                jenispeserta: dataForm.jenispeserta,
                no_telp: dataForm.notelepon,
                catatan: dataForm.catatan,
                ll_namaprovinsi: dataForm.provinsilakalantas,
                ll_kodeprovinsi: dataForm.kprovinsilakalantas || null,
                ll_namakabupaten: dataForm.kotalakalantas,
                ll_kodekabupaten: dataForm.kkabupatenlakalantas || null,
                ll_namakecamatan: dataForm.kecamatanlakalantas,
                ll_kodekecamatan: dataForm.kkecamatanlakalantas || null,
                ll_tgl: dataForm.tanggallakalantas,
                ll_suplesi: dataForm.nosepsuplesi,
                ll_keterangan: dataForm.keteranganlakalantas,
                lk_namaprovinsi: dataForm.provinsilakalantas,
                lk_kodeprovinsi: dataForm.kprovinsilakalantas || null,
                lk_namakabupaten: dataForm.kotalakalantas,
                lk_kodekabupaten: dataForm.kkabupatenlakalantas || null,
                lk_namakecamatan: dataForm.kecamatanlakalantas,
                lk_kodekecamatan: dataForm.kkecamatanlakalantas || null,
                objectkelasfk: dataForm.kelasditanggung || null,
            }, { transaction: transaction });
        }


        await transaction.commit();
        let tempres = { daftarPasien: daftarPasien }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        transaction && await transaction.rollback();
        logger.error(error);
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Simpan Gagal',
            code: 201
        });
    }
};


const getPasienNoregistrasi = async (req, res) => {
    const logger = res.locals.logger
    try {
        const id = parseInt(req.params.noregistrasi);
        const result = await pool.query(queries.getPasienByNoregistrasi, [id])
        if (result.rows.length == 0) {
            res.status(201).send({
                data: "",
                status: "Data Tidak Ada",
                success: true,
            });
        } else {
            let tempres = ""
            for (let i = 0; i < result.rows.length; ++i) {
                if (result.rows[i] !== undefined) {
                    tempres = {
                        noregistrasi: result.rows[i].noregistrasi,
                        namapasien: result.rows[i].namapasien,
                        tglregistrasi: result.rows[i].tglregistrasi,
                        nocm: result.rows[i].nocm,
                        namaunit: result.rows[i].namaunit,
                        noantrian: result.rows[i].noantrian,
                        namadokter: result.rows[i].namadokter,
                        objectasalrujukanfk: result.rows[i].objectasalrujukanfk
                    }

                }
            }

            res.status(200).send({
                data: tempres,
                status: "success",
                success: true,
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            status: error,
            success: false,
            msg: 'Simpan Gagal',
            code: 500
        });
    }

}
const getDaftarPasienRegistrasi = async (req, res) => {
    const logger = res.locals.logger
    try {
        const {noregistrasi, start, end} = req.query;
        const startDate = getDateStartNull(start)
        const endDate = getDateEndNull(end)
        let query = queries.getDaftarPasienRegistrasi(`
            WHERE td.statusenabled=true 
            AND (
                ${emptyIlike("td.noregistrasi", "$1")}
                OR 
                ${emptyIlike("mp.namapasien", "$1")}
            )
            AND ${dateBetweenEmptyString("td.tglregistrasi", "$2", "$3")}
        `)
        const result = await pool.query(query, [noregistrasi, startDate || "", endDate || ""])
        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        })
    }

}

const getDaftarPasienFarmasi = async (req, res) => {
    const logger = res.locals.logger
    try {
        const {
            start,
            noregistrasi,
            end
        } = req.query;
        // console.log(req.query.tglregistrasi)
        // return
        let tglregistrasi = ""
        if (start !== undefined) {
            tglregistrasi = ` and td.tglregistrasi between '${start}'
             and '${end} 23:59' `;
        } else {
            // console.log('massuukk')
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            tglregistrasi = ` and td.tglregistrasi between '${todaystart}'
            and '${todayend}' `;
        }
        let query = queries.getDaftarPasienRegistrasi(`
        where 
            td.statusenabled=true 
        AND ta.objectunitfk = ${daftarUnit.UNIT_FARMASI}`) 
        const result = await pool.query(query)
        //TODO: harusnya level query
        let final = []
        result.rows.forEach(data => {
            const finalFind = final.find(x => x.noregistrasi === data.noregistrasi)
            if (!finalFind) {
                final.push(data)
            }
        })
        res.status(200).send({
            data: final,
            status: "success",
            success: true,
        });
    } catch (e) {
        logger.error(e)
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        });
    }
}

async function getWidgetDaftarPasienRegistrasi(req, res) {
    const logger = res.locals.logger
    try {
        let tglregistrasi = ""
        if (req.query.start !== undefined) {

            tglregistrasi = ` td.tglregistrasi between '${req.query.start}'
         and '${req.query.end} 23:59' `;
        } else {
            // console.log('massuukk')
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            tglregistrasi = ` td.tglregistrasi between '${todaystart}'
        and '${todayend}' `;
        }
        const resultlistantreanpemeriksaan = await queryPromise2(`select mj.jenispenjamin,mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
        to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
        mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter,
        mu.objectinstalasifk  from t_daftarpasien td 
        join m_pasien mp on mp.id=td.nocmfk 
        join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec and td.objectunitlastfk=ta.objectunitfk
        join m_unit mu on mu.id=ta.objectunitfk 
        left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
        join m_instalasi mi on mi.id=mu.objectinstalasifk
        join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
        where ${tglregistrasi}
        `);

        let totalRJ = 0
        let totalRI = 0
        let totalPenunjang = 0
        for (let x = 0; x < resultlistantreanpemeriksaan.rows.length; x++) {
            if (resultlistantreanpemeriksaan.rows[x].objectinstalasifk == 1) {
                totalRJ = totalRJ + 1
            } else if (resultlistantreanpemeriksaan.rows[x].objectstatusveriffk == 2) {
                totalRI = totalRI + 1
            } else {
                totalPenunjang = totalPenunjang + 1
            }
        }
        const taskWidgets = [
            {
                id: 1,
                label: "Rawat Inap",
                counter: totalRI,
                badge: "ri-arrow-up-line",
                badgeClass: "success",
                percentage: "17.32 %",
                icon: iconRI,
                iconClass: "info",
                decimals: 1,
                prefix: "",
                suffix: "k",
            },
            {
                id: 2,
                label: "Rawat Jalan",
                counter: totalRJ,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "2.52 %",
                icon: iconRJ,
                iconClass: "success",
                decimals: 2,
                prefix: "",
                suffix: "K",
            },
            {
                id: 3,
                label: "Penunjang",
                counter: totalPenunjang,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "0.87 %",
                icon: iconPenunjang,
                iconClass: "warning",
                decimals: 1,
                prefix: "",
                suffix: "k",
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

async function getDaftarPasienRawatJalan(req, res) {
    const logger = res.locals.logger
    try {
        const noregistrasi = req.query.noregistrasi;
        let tglregistrasi = ""
        if (req.query.start !== undefined) {

            tglregistrasi = ` and td.tglregistrasi between '${req.query.start}'
            and '${req.query.end} 23:59' `;
        } else {
            // console.log('massuukk')
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            tglregistrasi = ` and td.tglregistrasi between '${todaystart}'
            and '${todayend}' `;
        }
        let taskid = ""

        if (req.query.taskid !== undefined) {
            if (req.query.taskid === '2') {
                // console.log(req.query.taskid)
                taskid = ` and ta.taskid=4`;
            } else if (req.query.taskid === '3') {
                taskid = ` and ta.taskid in (5,6,7,8,9)`;
            } else if (req.query.taskid === '1') {
                taskid = ` and ta.taskid=3`;
            }
        } else {
            taskid = ` and ta.taskid=3`;
        }

        let unit = ''
        if (req.query.unit !== undefined && req.query.unit !== '') {
            unit = ` and ta.objectunitfk in (${req.query.unit}) `
        }
        // let query = queries.getAllByOr + ` where nocm ilike '%` + nocm + `%'` + ` or namapasien ilike '%` + nocm + `%' limit 200`
        let query = queries.getDaftarPasienRawatJalan + `  where td.noregistrasi ilike '%${noregistrasi}%'
        ${tglregistrasi} ${taskid} and td.objectinstalasifk=1 and trm.objectstatuskendalirmfk is not null
        ${unit} ORDER BY td.noregistrasi DESC`
        const resultCountNoantrianDokter = await pool.query(query, [])
        res.status(200).send({
            data: resultCountNoantrianDokter.rows,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        })
    }

}

async function getWidgetDaftarPasienRJ(req, res) {
    const logger = res.locals.logger
    try {
        const noregistrasi = ""//req.query.noregistrasi;
        let tglregistrasi = ""
        if (req.query.start !== undefined) {
            // console.log("masukkk")
            tglregistrasi = ` and td.tglregistrasi between '${req.query.start}'
            and '${req.query.end} 23:59'`;

        } else {
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            tglregistrasi = ` and td.tglregistrasi between '${todaystart}'
            and '${todayend}' `;
        }

        // let query = queries.getAllByOr + ` where nocm ilike '%` + nocm + `%'` + ` or namapasien ilike '%` + nocm + `%' limit 200`
        let taskid = ""

        if (req.query.taskid !== undefined) {
            if (req.query.taskid === '2') {
                // console.log(req.query.taskid)
                taskid = ` and ta.taskid=4`;
            } else if (req.query.taskid === '3') {
                taskid = ` and ta.taskid in (5,6,7,8,9)`;
            } else if (req.query.taskid === '1') {
                taskid = ` and ta.taskid=3`;
            }
        } else {
            taskid = ` and ta.taskid=3`;
        }
        let query = queries.getDaftarPasienRawatJalan + `  where td.noregistrasi ilike '%${noregistrasi}%'
        ${tglregistrasi} and td.objectinstalasifk=1 and trm.objectstatuskendalirmfk is not null`
        const resultCountNoantrianDokter = await pool.query(query)

        let totalBP = 0
        let totalSP = 0
        let totalSSP = 0
        for (let x = 0; x < resultCountNoantrianDokter.rowCount; x++) {
            if (resultCountNoantrianDokter.rows[x].taskid == 3 || resultCountNoantrianDokter.rows[x].taskid == null) {
                totalBP = totalBP + 1
            } else if (resultCountNoantrianDokter.rows[x].taskid == 4) {
                totalSP = totalSP + 1

            } else {
                totalSSP = totalSSP + 1
            }
        }
        const taskWidgets = [
            {
                id: 1,
                label: "Belum Diperiksa",
                counter: totalBP,
                badge: "ri-arrow-up-line",
                badgeClass: "success",
                percentage: "17.32 %",
                icon: belumDiperiksa,
                iconClass: "info",
                decimals: 1,
                prefix: "",
                suffix: "k",
            },
            {
                id: 2,
                label: "Sedang Diperiksa",
                counter: totalSP,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "0.87 %",
                icon: sedangDiperiksa,
                iconClass: "warning",
                decimals: 1,
                prefix: "",
                suffix: "k",
            },
            {
                id: 3,
                label: "Selesai Diperiksa",
                counter: totalSSP,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "2.52 %",
                icon: selesaiDiperiksa,
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
    } catch (e) {
        logger.error(e)
        res.status(500).send({
            data: e,
            status: "error",
            success: false,
        })
    }

}

async function getHeaderEmr(req, res) {
    const logger = res.locals.logger
    try {
        const norecta = req.query.norecta;
        let query = queries.getHeaderEmr + ` where ta.norec ilike '%${norecta}%'`
        const resultCountNoantrianDokter = await pool.query(query)
        let tempres = ""
        for (let i = 0; i < resultCountNoantrianDokter.rows.length; ++i) {
            if (resultCountNoantrianDokter.rows[i] !== undefined) {
                let umur = new Date(resultCountNoantrianDokter.rows[i].umur)
                umur = umur.toISOString()
                tempres = {
                    nocm: resultCountNoantrianDokter.rows[i].nocm,
                    namapasien: resultCountNoantrianDokter.rows[i].namapasien,
                    tgllahir: resultCountNoantrianDokter.rows[i].tgllahir,
                    jeniskelamin: resultCountNoantrianDokter.rows[i].jeniskelamin,
                    umur: umur,
                    namarekanan: resultCountNoantrianDokter.rows[i].namarekanan,
                    ruanganta: resultCountNoantrianDokter.rows[i].ruanganta,
                    noregistrasi: resultCountNoantrianDokter.rows[i].noregistrasi
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
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }

}

async function getWidgetDaftarPasienRI(req, res) {
    const logger = res.locals.logger
    try {
        let query = queries.widgetgetDaftarPasienRawatInap
        const resultCountNoantrianDokter = await pool.query(query)
        let totalTKosong = 0
        let totalTTerisi = 0
        let totalTRusak = 0
        for (let x = 0; x < resultCountNoantrianDokter.rowCount; x++) {
            if (resultCountNoantrianDokter.rows[x].objectstatusbedfk == 2) {
                totalTKosong = totalTKosong + 1
            } else if (resultCountNoantrianDokter.rows[x].objectstatusbedfk == 1) {
                totalTTerisi = totalTTerisi + 1
            } else if (resultCountNoantrianDokter.rows[x].objectstatusbedfk == 6) {
                totalTRusak = totalTRusak + 1
            }
        }
        const taskWidgets = [
            {
                id: 1,
                label: "Siap Pakai",
                counter: totalTKosong,
                badge: "ri-arrow-up-line",
                badgeClass: "success",
                percentage: "17.32 %",
                icon: siapPakai,
                iconClass: "info",
                decimals: 1,
                prefix: "",
                suffix: "k",
            },
            {
                id: 2,
                label: "Terpakai",
                counter: totalTTerisi,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "0.87 %",
                icon: totalTempatTerisi,
                iconClass: "warning",
                decimals: 1,
                prefix: "",
                suffix: "k",
            },
            {
                id: 3,
                label: "Rusak",
                counter: totalTRusak,
                badge: "ri-arrow-down-line",
                badgeClass: "danger",
                percentage: "2.52 %",
                icon: totalTempatRusak,
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
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            data: e,
            status: "error",
            success: false,
        });
    }
}

async function getDaftarPasienRawatInap(req, res) {
    const logger = res.locals.logger
    try {
        const noregistrasi = req.query.noregistrasi;
        let unit = ''
        if (req.query.unit !== undefined && req.query.unit !== '') {
            unit = ` and ta.objectunitfk in (${req.query.unit}) `
        }
        let query = queries.getDaftarPasienRawatInap + ` and td.noregistrasi ilike '%${noregistrasi}%' ${unit}`
            + `ORDER BY td.tglregistrasi DESC`
        let resultCountNoantrianDokter = await pool.query(query, [])
        let resultsDeposit = await Promise.all(
            resultCountNoantrianDokter.rows.map(async (rawatInap) => {
                const norecdp = rawatInap.norecdp;
                const deposit = await pool.query(queries.qGetDepositFromPasien, [norecdp])
                return {
                    ...rawatInap,
                    deposit: deposit.rows
                }
            }
            ))
        res.status(200).send({
            data: resultsDeposit,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error);
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        })
    }
}

const getDepositFromPasien = async (req, res) => {
    const logger = res.locals.logger
    try {
        const norecdp = req.query.norecdp;
        let result = await pool.query(queries.qGetDepositFromPasien, [norecdp])
        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        })
    } catch (e) {
        logger.error(e);
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        })
    }
}

const getPasienFormById = async (req, res) => {
    const logger = res.locals.logger
    try {
        const { idpasien } = req.query
        let pasien = (await pool.query(queries.qGetPasienFormById, [Number(idpasien)])).rows
        pasien = pasien?.[0] || null
        if(pasien){
            // fix sementara postgre gak menemrima kapital
            pasien.alamatDomisili = pasien.alamatdomisili
            pasien.desaDomisili = pasien.desadomisili
            pasien.labelDesaDomisili = pasien.labeldesadomisili
            pasien.kecamatanDomisili = pasien.kecamatandomisili
            pasien.kotaDomisili = pasien.kotadomisili
            pasien.provinsiDomisili = pasien.provinsidomisili
            pasien.posDomisili = pasien.posdomisili
            pasien.negaraDomisili = pasien.negaradomisili
            pasien.labelNegaraDomisili = pasien.labelnegaradomisili
            pasien.needVerif = !pasien.nocm && pasien.nocmtemp
        }
        const tempres = {
            pasien: pasien
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Get Pasien Form by Id Berhasil',
            code: 200
        });
    } catch (e) {
        logger.error(e)
        res.status(500).send({
            data: e.message,
            success: false,
            msg: 'Transaksi gagal',
            code: 500
        });
    }
}

async function saveBatalRegistrasi(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return

    try {
        let resqueryCek = await pool.query(`select ap.objectdaftarpasienfk  from t_pelayananpasien pp
        join t_antreanpemeriksaan ap on ap.norec=pp.objectantreanpemeriksaanfk
        where ap.objectdaftarpasienfk ='${req.body.norecdp}'`);
        if (resqueryCek.rowCount > 0) {
            await transaction.rollback();
            res.status(201).send({
                status: 'Pasien Sudah Mendapat Tindakan, tidak bisa di batalkan',
                success: false,
                msg: 'Pasien Sudah Mendapat Tindakan, tidak bisa di batalkan',
                code: 201
            });
            return
        }

        let saveBatal
        let norec = uuid.v4().substring(0, 32)

        saveBatal = await db.t_batalpasien.create({
            norec: norec,
            objectdaftarpasienfk: req.body.norecdp,
            objectpegawaifk: req.idPegawai,
            alasanbatal: req.body.alasan,
            objectbatalpasienfk: req.body.pembatal,
            tglbatal: new Date()
        }, {
            transaction: transaction
        })

        const updatedBody = await db.t_daftarpasien.update({
            statusenabled: false
        }, {
            where: {
                norec: req.body.norecdp
            },
            transaction: transaction
        });
        await transaction.commit();

        let tempres = { batal: saveBatal, td: updatedBody }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'success',
            code: 200
        });
    } catch (error) {
        logger.error(error)
        res.status(201).send({
            status: error,
            success: false,
            msg: 'Gagal',
            code: 201
        });
    }

}

async function getListPasienMutasi(req, res) {
    const logger = res.locals.logger
    try {
        let start = formatDate(req.query.start) + ' 00:00'
        let end = formatDate(req.query.end) + ' 23:59'
        let search = `%${req.query.search}%`
        let instalasi = req.query.instalasi !== '' ? ` and td.objectinstalasifk = '${req.query.instalasi}'` : '';
        let unit = req.query.unit !== '' ? ` and td.objectunitlastfk = '${req.query.unit}'` : '';
        let rekanan = req.query.rekanan !== '' ? ` and td.objectpenjaminfk = '${req.query.rekanan}'` : '';
        let pegawai = req.query.pegawai !== '' ? ` and td.objectpegawaifk = '${req.query.pegawai}'` : '';
        console.log(start, end, search, instalasi, unit, rekanan, pegawai)

        // const result = await pool.query(queries.qResult, [start,end,search]) //,instalasi,unit,rekanan,pegawai
        const result = await queryPromise2(`select td.noregistrasi,td.norec,td.nocmfk,
        to_char(td.tglregistrasi,'dd Month YYYY') as tglregistrasi,to_char(td.tglpulang,'dd Month YYYY') as tglpulang,mp.namapasien,
        mi.namainstalasi,mu.namaunit,mp.nocm,mr.namarekanan,mp2.namalengkap,td.statuspasien  from t_daftarpasien td 
        left join m_pasien mp on mp.id=td.nocmfk
        left join m_instalasi mi on mi.id=td.objectinstalasifk
        left join m_unit mu on mu.id=td.objectunitlastfk
        left join m_rekanan mr on td.objectpenjaminfk=mr.id
        left join m_pegawai mp2 on mp2.id=td.objectpegawaifk
        where td.objectinstalasifk=1 and td.objectstatuspulangfk=2 and td.tglregistrasi between '${start}' and '${end}' and td.statusenabled=true and td.noregistrasi ilike '${search}'
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

async function saveRegistrasiPasienMutasi(req, res) {
    const logger = res.locals.logger
    const [transaction, errorTransaction] = await createTransaction(db, res)
    if (errorTransaction) return
    try {

        // console.log(req.body?.penjamin)
        let objectpenjaminfk = req.body?.penjamin?.[0]?.value || null
        let objectpenjamin2fk = req.body?.penjamin?.[1]?.value || null
        let objectpenjamin3fk = req.body?.penjamin?.[2]?.value || null
        let today = new Date();
        let todayMonth = '' + (today.getMonth() + 1)
        if (todayMonth.length < 2)
            todayMonth = '0' + todayMonth;
        let todayDate = '' + (today.getDate())
        if (todayDate.length < 2)
            todayDate = '0' + todayDate;
        let todaystart = formatDate(today)
        let todayend = formatDate(today) + ' 23:59'
        let resultCountNoantrianDokter = await pool.query(queries.qNoAntrian, [req.body.dokter, todaystart, todayend]);
        let noantrian = parseFloat(resultCountNoantrianDokter.rows[0].count) + 1
        let query = `select count(norec) from t_daftarpasien
            where tglregistrasi between '${todaystart}' and '${todayend}'`
        let resultCount = await pool.query(query);

        if (req.body.kelas === "")
            req.body.kelas = 8
        if (req.body.kamar === "")
            req.body.kamar = null
        if (req.body.tempattidur === "")
            req.body.tempattidur = null

        if (req.body.tujkunjungan === 2) {
            let queryCekBed = `select id from m_tempattidur
            where objectstatusbedfk =1 and id=${req.body.tempattidur}`
            let resqueryCekBed = await pool.query(queryCekBed);
            if (resqueryCekBed.rowCount === 1) {
                await transaction.rollback();
                res.status(201).send({
                    status: 'Bed yang dipilih sudah terisi',
                    success: false,
                    msg: 'Simpan Gagal',
                    code: 201
                });
                return
            }
        }

        const daftarPasien = await db.t_daftarpasien.update({
            tglregistrasi: req.body.tglregistrasi,
            objectunitlastfk: req.body.unittujuan,
            objectdokterpemeriksafk: req.body.dokter,
            objectpegawaifk: req.idPegawai,
            objectkelasfk: req.body.kelas,
            objectjenispenjaminfk: req.body.jenispenjamin,
            tglpulang: null,
            objectasalrujukanfk: req.body.rujukanasal,
            objectinstalasifk: req.body.tujkunjungan,
            objectpenjaminfk: objectpenjaminfk,
            objectpenjamin2fk: objectpenjamin2fk,
            objectpenjamin3fk: objectpenjamin3fk,
            objectpjpasienfk: req.body.penanggungjawab,
            objectcaramasukfk: req.body.caramasuk,
            statusenabled: true,
            statuspasien: req.body.statuspasien
        }, {
            where: {
                norec: req.body.norecdp
            }
        }, { transaction });

        let norecAP = uuid.v4().substring(0, 32)
        const antreanPemeriksaan = await db.t_antreanpemeriksaan.create({
            norec: norecAP,
            objectdaftarpasienfk: req.body.norecdp,
            tglmasuk: req.body.tglregistrasi,
            objectdokterpemeriksafk: req.body.dokter,
            objectunitfk: req.body.unittujuan,
            noantrian: noantrian,
            objectkamarfk: req.body.kamar,
            objectkelasfk: req.body.kelas,
            nobed: req.body.tempattidur,
            taskid: 3,
            statusenabled: true
        }, {
            transaction: transaction
        });
        // console.log(antreanPemeriksaan);
        if (req.body.tujkunjungan === 2) {
            const ttp = await db.m_tempattidur.update({
                objectstatusbedfk: 1
            }, {
                where: {
                    id: req.body.tempattidur
                }
            }, { transaction });
        }
        hUpsertEncounter(req.body.norecdp,'arrived',true,'')
        await transaction.commit();
        let tempres = {
            daftarPasien: daftarPasien,
            antreanPemeriksaan: antreanPemeriksaan
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
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

async function getDaftarPasienIGD(req, res) {
    const logger = res.locals.logger
    try {
        const noregistrasi = req.query.noregistrasi;
        let tglregistrasi = ""
        if (req.query.start !== undefined) {

            tglregistrasi = ` and td.tglregistrasi between '${req.query.start}'
            and '${req.query.end} 23:59' `;
        } else {
            // console.log('massuukk')
            let today = new Date();
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            tglregistrasi = ` and td.tglregistrasi between '${todaystart}'
            and '${todayend}' `;
        }


        let query = queries.getDaftarPasienIGD + `  where td.noregistrasi ilike '%${noregistrasi}%'
        ${tglregistrasi} and td.objectinstalasifk=7
        ORDER BY td.tglregistrasi DESC`
        const resultCountNoantrianDokter = await pool.query(query, [])
        res.status(200).send({
            data: resultCountNoantrianDokter.rows,
            status: "success",
            success: true,
        });

    } catch (error) {
        logger.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        })
    }

}

const getWidgetPasienTriage = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let query = queries.qWidgetDaftarPasienTriage
        const result = await pool.query(query, [])
        const taskWidgets = [
            {
                id: 1,
                label: "Jumlah Pasien Resusitasi",
                counter: result.rows[0].satu,
                badge: "ri-arrow-up-line",
                color: "#B7DBFD",
                decimals: 1,
            },
            {
                id: 2,
                label: "Jumlah Pasien Emergency",
                counter: result.rows[0].dua,
                badge: "ri-arrow-down-line",
                color: "#FDB7B7",
                decimals: 1,
            },
            {
                id: 3,
                label: "Jumlah Pasien Urgent",
                counter: result.rows[0].tiga,
                badge: "ri-arrow-down-line",
                color: "#FCFDB7",
                decimals: 1,
            },
            {
                id: 4,
                label: "Jumlah Pasien Non Urgent",
                counter: result.rows[0].empat,
                badge: "ri-arrow-down-line",
                color: "#B8FDB7",
                decimals: 1,
            },
            {
                id: 5,
                label: "Jumlah Pasien False Emergency",
                counter: result.rows[0].lima,
                badge: "ri-arrow-down-line",
                color: "#E1E1E1",
                decimals: 1,
            },


        ];
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: taskWidgets,
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

const getDaftarPasienTriage = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let param2 = ' '
        let param3 = ' '
        if (req.query.tingkatdarurat !== undefined && req.query.tingkatdarurat !== '')
            param2 = ` and tp.objectdaruratigdfk=${req.query.tingkatdarurat}`

        if (req.query.statuspasien === '2') {
            param3 = ` and tp.objectdaftarpasienfk is not null`
        } else if (req.query.statuspasien === '3') {
            param3 = ` and tp.objectdaftarpasienfk is null`
        }

        const result = await pool.query(queries.qDaftarPasienTriage + ` where td.objectstatuspulangfk is null and tp.namapasien ilike '%${req.query.search}%' ${param2} ${param3}`)
        const tempres = {
            data: result.rows
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

const getPasienOnline = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            nocmnamapasien,
            tglmasuk,
            unit,
            jenispasien
        } = req.query
        const {todayStart, todayEnd} = getDateStartEndNull(tglmasuk)
        const pasien = await pool.query(queries.qGetPasienOnline, [
            nocmnamapasien || '',
            todayStart || '',
            todayEnd || '',
            unit || '',
            jenispasien || ''
        ])
        const tempres = {
            pasien: pasien.rows
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

const getComboVerifikasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const unit = await pool.query(queriesUnit.getPoliklinik)
        const tempres = {
            unit: unit.rows
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

const getHistoryRegistrasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const result1 = await pool.query(queries.qHistoryRegistrasi,[req.query.nocmfk])
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

const saveMergeNoRegistrasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            norecdp,
            tglbatal,
            alasan,
            norectujuan,
            password,
        } = req.body

        const {updated} 
        = await db.sequelize.transaction(async (transaction) => {
            let user = await db.user.findByPk(req.userId, {
                transaction: transaction
            })
            if(!user) throw new Error("User not found")
            user = user.toJSON()
            let passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );
            if(!passwordIsValid){
                throw new Error("Wrong password")
            }
            const dpTujuan = await db.t_daftarpasien.findByPk(norectujuan, {
                transaction: transaction
            })
            let dpTujuanVal = dpTujuan.toJSON()
            const dpAsal = await db.t_daftarpasien.findByPk(norecdp, {
                transaction: transaction
            })
            let dpAsalVal = dpTujuan.toJSON()

            if(dpTujuanVal.nocmfk !== dpAsalVal.nocmfk){
                throw new Error("nocmfk tidak sama")
            }
            const norecmerge = uuid.v4().substring(0, 32)
            await db.t_mergedaftarpasien.create({
                norec: norecmerge,
                objectdaftarpasienasalfk: norecdp,
                objectdaftarpasientujuanfk: norectujuan,
                objectpegawaifk: req.userId,
                alasan: alasan,
                tglinput: tglbatal
            }, {
                transaction: transaction
            })

            await dpAsal.update({
                statusenabled: false
            }, {
                transaction: transaction
            })

            const [_, updated] = await db.t_antreanpemeriksaan.update({
                objectdaftarpasienfk: norectujuan
            }, {
                where: {
                    objectdaftarpasienfk: norecdp
                },
                transaction: transaction,
                returning: true
            })

            return {
                updated
            }
        });
        
        const tempres = {
            updated
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

const getNoRegistrasiPasien = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const norecdp = req.query.norecdp
        if(!norecdp) throw new Error("Norec dp kosong")
        const pasien = (await pool.query(queries.qGetPasienRegistrasi, [norecdp])).rows[0]
        if(!pasien) throw new Error("Pasien tidak ada")
        const noregistrasi = (await pool
            .query(queries.qGetNoregistrasi, 
                [
                    pasien.nocmfk, 
                    norecdp
                ])).rows

        const tempres = {
            pasien: pasien,
            noregistrasi: noregistrasi
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

const savePasienBayi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const getNocm = await running_Number.findAll({
            where: {
                id: 1
            }
        })
        let nocm = getNocm[0].new_number + 1
        let totalExtension = Number(getNocm[0].extention)
        let zero = ''
        for (let x = 0; x < totalExtension; x++) {
            zero = zero + '0'
        }
        nocm = (zero + nocm).slice(-totalExtension)
        req.body.nocm=nocm
        let tempDate=new Date(req.body.tglLahirPasien);
        req.body.tglLahirPasien = tempDate.toISOString().split('T')[0];
        const objBody = req.body
        let userPasien = null
        // hupsertPatientNewBorn(objBody)
        const { result } = await db.sequelize.transaction(async (transaction) => {
            let result
            if (!objBody.id) {
                result = await hCreatePasienBayi(req, res, transaction, { objBody, nocm })
                await running_Number.update({ new_number: nocm }, {
                    where: {
                        id: 1
                    },
                    transaction: transaction
                });
                userPasien = await pasienSignup(
                    req,
                    res,
                    transaction,
                    {
                        norm: result.nocm,
                        password: result.noidentitas
                    })
                userPasien = userPasien?.toJSON() || null
                req.body.id=result.id
                hupsertPatientNewBorn(objBody)
            } else {
                result = await hUpdatePasienBayi(
                    req, 
                    res, 
                    transaction, 
                    {
                        nocm
                    })
            }
            return { result }
        });
        
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: result,
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

const updateNoRM = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {
            newDataPasien
        } = await db.sequelize.transaction(async (transaction) => {
            const newNoRM = req.body.norm
            const idPasien = req.body.idpasien
            const findNoRM = await db.m_pasien.findOne({
                where: {
                    nocm: newNoRM,
                },
                transaction: transaction
            })
            if(findNoRM) throw new BadRequestError(`No sudah ada dengan nama ${findNoRM.namapasien}`)
            const changed = await db.m_pasien.findByPk(idPasien, {
                transaction: transaction
            })
            await changed.update({
                nocm: newNoRM
            })
            const newDataPasien = changed.toJSON()
            return {
                newDataPasien
            }
        });
        
        const tempres = {
            newDataPasien: newDataPasien
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

export default {
    allSelect,
    addPost,
    updatePasienById,
    getPasienById,
    getAllByOr,
    savePasien,
    getRegistrasiPasienNorec,
    saveRegistrasiPasien,
    saveRegistrasiPenjaminFK,
    getPasienNoregistrasi,
    getDaftarPasienRawatJalan,
    getDaftarPasienRegistrasi,
    getWidgetDaftarPasienRJ,
    getHeaderEmr,
    getWidgetDaftarPasienRI,
    getDaftarPasienRawatInap,
    getDaftarPasienFilter,
    updateRegistrasiPPulang,
    getNoAntrean,
    getDepositFromPasien,
    getWidgetDaftarPasienRegistrasi,
    getPasienFormById,
    saveBatalRegistrasi,
    getListPasienMutasi,
    saveRegistrasiPasienMutasi,
    getDaftarPasienFarmasi,
    getDaftarPasienIGD,
    getWidgetPasienTriage,
    getDaftarPasienTriage,
    getPasienOnline,
    getComboVerifikasi,
    getHistoryRegistrasi,
    saveMergeNoRegistrasi,
    getNoRegistrasiPasien,
    savePasienBayi,
    updateNoRM
};

const hUpdateRegistrasiPulang = async (req, res, transaction) => {
    const norecDP = req.body.norec
    const norecAP = req.body.norecAP
    const caraKeluar = req.body.carakeluar
    const isPulangOrAPS = caraKeluar === 1 || caraKeluar === 2
    const isMeninggal = caraKeluar === 4
    const isRujuk = caraKeluar === 5
    const isPindah = caraKeluar === 3
    const objectBody = req.body
    const objectEdit = {
        objectcarapulangrifk: objectBody.carakeluar,
        objectkondisipulangrifk: objectBody.kondisipulang,
        objectstatuspulangrifk: objectBody.statuspulang,
        pembawapulang: objectBody.pembawapulang,
        tglpulang: new Date(objectBody.tanggalpulang),
        tglkeluar: new Date(objectBody.tanggalpulang),
        objecthubunganpembawapasienfk: objectBody.hubungan
    }
    const objectEditAP = {
        tglkeluar: objectBody.tanggalpulang,
    }
    const objectEditMeninggal = {
        ...objectEdit,
        tglmeninggal: objectBody.tanggalmeninggal
    }

    const objectEditRujuk = {
        ...objectEdit,
        alasanrujuk: objectBody.alasanrujuk,
        namafaskes: objectBody.namafaskes,
        objectpjpasienfk: objectBody.dokterperujuk,
    }

    const objectEditPindahDp = {
        objectcarapulangrifk: objectBody.carakeluar,
    }

    const objectEditPindahAp = {
        ...objectEditAP,
        objectketeranganranapfk: objectBody.keteranganpindah,
        objectkelasfk: objectBody.kelas,
        objectkamarfk: objectBody.kamar,
        nobed: objectBody.nobed,
        tglmasuk: objectBody.tanggalpulang,
        tglkeluar: objectBody.tanggalpulang,
    }
    let updatedBody = null;
    let updatedBodyAp = null;
    let updatedBodyK = null;
    let updatedBodyKPindah = null;
    const updateDPAP = async (oEdit, oEditAp) => {
        updatedBody = await db.t_daftarpasien.update(oEdit, {
            where: {
                norec: norecDP
            },
            transaction: transaction
        });
        updatedBodyAp = await db.t_antreanpemeriksaan.update(oEditAp, {
            where: {
                norec: norecAP
            },
            transaction: transaction
        });
    }
    if (isPulangOrAPS) {
        await updateDPAP(objectEdit, objectEditAP)
        await db.m_tempattidur.update({
            objectstatusbedfk: 2
        }, {
            where: {
                id: objectBody.nobedsebelum
            },
            transaction: transaction
        });
    } else if (isMeninggal) {
        await updateDPAP(objectEditMeninggal, objectEditAP)
        updatedBodyK = await db.m_tempattidur.update({
            objectstatusbedfk: 2
        }, {
            where: {
                id: objectBody.nobedsebelum
            },
            transaction: transaction
        });
    } else if (isRujuk) {
        await updateDPAP(objectEditRujuk, objectEditAP)
        updatedBodyK = await db.m_tempattidur.update({
            objectstatusbedfk: 2
        }, {
            where: {
                id: objectBody.nobedsebelum
            },
            transaction: transaction
        });
        updatedBody = objectEditRujuk
        updatedBodyAp = objectEditAP
    } else if (isPindah) {
        await updateDPAP(objectEditPindahDp, objectEditPindahAp)
        updatedBodyK = await db.m_tempattidur.update({
            objectstatusbedfk: 2
        }, {
            where: {
                id: objectBody.nobedsebelum
            },
            transaction: transaction
        });
        updatedBodyKPindah = await db.m_tempattidur.update({
            objectstatusbedfk: 1
        }, { where: { id: objectBody.nobed } }, { transaction });
        updatedBody = objectEditPindahDp
        updatedBodyAp = objectEditPindahAp

    } else {
        throw new Error('cara keluar tidak ditemukan')
    }
    return { updatedBody, updatedBodyAp, updatedBodyK, updatedBodyKPindah }
}

const hCreatePasien = async (req, res, transaction, { objBody, nocm }) => {

    const result = await m_pasien.create({
        nocm: nocm,
        namapasien: objBody.namapasien,
        noidentitas: objBody.noidentitas,
        objectjeniskelaminfk: objBody.jeniskelamin,
        objecttitlefk: objBody.titlepasien,
        objectagamafk: objBody.agama,
        objectgolongandarahfk: objBody.goldarah,
        objectkebangsaanfk: objBody.kebangsaan,
        objectstatusperkawinanfk: objBody.statusperkawinan,
        tgldaftar: new Date(),
        tempatlahir: objBody.tempatlahir,
        tgllahir: new Date(objBody.tgllahir),
        objectpendidikanfk: objBody.pendidikan,
        objectpekerjaanfk: objBody.pekerjaan,
        objectetnisfk: objBody.suku,
        objectbahasafk: objBody.bahasa,
        alamatrmh: objBody.alamatktp,
        rtktp: objBody.rt,
        rwktp: objBody.rw,
        objectdesakelurahanktpfk: objBody.desa,
        objectnegaraktpfk: objBody.negara,
        alamatdomisili: objBody.alamatdomisili,
        rtdomisili: objBody.rtdomisili,
        rwdomisili: objBody.rwdomisili,
        objectdesakelurahandomisilifk: objBody.desaDomisili,
        objectnegaradomisilifk: objBody.negaraDomisili,
        statusenabled: true,
        nobpjs: objBody.nobpjs || null,
        nohp: objBody.nohp || null,
        notelepon: objBody.notelepon || null,
        namaayah: objBody.namaayah || null,
        namasuamiistri: objBody.namasuamiistri || null,
        namakeluarga: objBody.namakeluargalain || null,
        namaibu: objBody.namaibu || null,
        objectkaryawanrsfk: 2,
    }, {
        transaction: transaction
    })
    return result
}

const hUpdatePasien = async (req, res, transaction, {nocm}) => {
    const objBody = req.body
    const pasienBefore = await m_pasien.findOne({
        where: {
            id: objBody.id
        },
        transaction: transaction
    })
    if(!pasienBefore.nocm) {
        await running_Number.update({ new_number: nocm }, {
            where: {
                id: 1
            },
            transaction: transaction
        });
    }

    await pasienBefore.update({
        nocm: pasienBefore.nocm || nocm,
        namapasien: objBody.namapasien,
        noidentitas: objBody.noidentitas,
        objectjeniskelaminfk: objBody.jeniskelamin,
        objecttitlefk: objBody.titlepasien,
        objectagamafk: objBody.agama,
        objectgolongandarahfk: objBody.goldarah,
        objectkebangsaanfk: objBody.kebangsaan,
        objectstatusperkawinanfk: objBody.statusperkawinan,
        tempatlahir: objBody.tempatlahir,
        tgllahir: new Date(objBody.tgllahir),
        objectpendidikanfk: objBody.pendidikan,
        objectpekerjaanfk: objBody.pekerjaan,
        objectetnisfk: objBody.suku,
        objectbahasafk: objBody.bahasa,
        alamatrmh: objBody.alamatktp,
        rtktp: objBody.rt,
        rwktp: objBody.rw,
        objectdesakelurahanktpfk: objBody.desa,
        objectnegaraktpfk: objBody.negara,
        alamatdomisili: objBody.alamatdomisili,
        rtdomisili: objBody.rtdomisili,
        rwdomisili: objBody.rwdomisili,
        objectdesakelurahandomisilifk: objBody.desaDomisili,
        objectnegaradomisilifk: objBody.negaraDomisili,
        statusenabled: true,
        nobpjs: objBody.nobpjs || null,
        nohp: objBody.nohp || null,
        notelepon: objBody.notelepon || null,
        namaayah: objBody.namaayah || null,
        namasuamiistri: objBody.namasuamiistri || null,
        namakeluarga: objBody.namakeluargalain || null,
        namaibu: objBody.namaibu || null,
        objectkaryawanrsfk: 2,
    }, {
        transaction: transaction
    })
    return pasienBefore.toJSON()
}

export const hCreateNoreg = async (date) => {
    let today = new Date(date);
    let todayStart = new Date(date);
    todayStart.setHours(0, 0, 0, 0)
    let todayEnd = new Date(date);
    todayEnd.setHours(23, 59, 59, 999)
    let todayMonth = '' + (today.getMonth() + 1)
    if (todayMonth.length < 2)
        todayMonth = '0' + todayMonth;
    let todayDate = '' + (today.getDate())
    if (todayDate.length < 2)
        todayDate = '0' + todayDate;
    let query = `select count(norec) from t_daftarpasien
    where tglregistrasi between $1 and $2`
    let resultCount = await pool.query(query, [todayStart, todayEnd]);
    let noregistrasi = parseFloat(resultCount.rows[0].count) + 1
    for (let x = resultCount.rows[0].count.toString().length; x < 4; x++) {
        if (noregistrasi.toString().length !== 4)
            noregistrasi = '0' + noregistrasi;
    }
    noregistrasi = 
        today.getFullYear() + todayMonth.toString() + todayDate.toString() + noregistrasi
    return noregistrasi
}

const hDeactivateAp = async (
    req, 
    res, 
    transaction, 
    {
        norecDP
    }) => {
    const allAp = await db.t_antreanpemeriksaan.findAll({
        where: {
            objectdaftarpasienfk: norecDP,
            statusenabled: true
        },
        transaction: transaction
    })
    if(allAp.length > 1) {
        throw new BadRequestError("Pasien memiliki lebih dari 1 antrean")
    }
    await Promise.all(
        allAp.map(async (ap) => {
            const apData = ap.toJSON()
            const nobed = apData.nobed
            if(nobed) {
                const ttp = await db.m_tempattidur.update({ 
                    objectstatusbedfk: 2 
                }, {
                    where: {
                        id: nobed
                    },
                    transaction: transaction
                });
            }
            const allLokasi = await db.t_rm_lokasidokumen.findAll({
                where: {
                    objectantreanpemeriksaanfk: apData.norec,
                },
                transaction: transaction
            })
            await Promise.all(
                allLokasi.map(async (lok) => {
                    lok.update({
                        statusenabled: false
                    }, {
                        transaction: transaction
                    })
                })
            )
            await ap.update({
                statusenabled: false
            }, {
                transaction: transaction
            })
        })
    )
}

const hCreateAp = async (
    req,
    res,
    transaction, 
    {
        noantrian,
        daftarPasien,
        norecDP,
    }
) => {
    let norecAP = uuid.v4().substring(0, 32)
    const antreanPemeriksaan = await db.t_antreanpemeriksaan.create({
        norec: norecAP,
        objectdaftarpasienfk: daftarPasien.norec,
        tglmasuk: req.body.tglregistrasi,
        tglkeluar: null,
        objectdokterpemeriksafk: req.body.dokter,
        objectunitfk: req.body.unittujuan,
        noantrian: noantrian,
        objectkamarfk: req.body.kamar || null,
        objectkelasfk: req.body.kelas,
        nobed: req.body.tempattidur || null,
        taskid: 3,
        statusenabled: true
    }, {
        transaction: transaction
    });

    let ttp = null
    let pasienigd = null
    if (req.body.tujkunjungan === 2 && req.body.tempattidur) {
        if(!req.body.tempattidur) throw new BadRequestError("tempat tidur kosong")
        ttp = await db.m_tempattidur.findByPk(req.body.tempattidur, {
            transaction: transaction
        })
        const ttpBefore = ttp.toJSON()
        if(!ttp) throw new NotFoundError(`Tempat tidur dengan id`
        + ` ${req.body.tempattidur} tidak ada`)
        if(ttpBefore.objectstatusbedfk === 1) throw new BadRequestError("Bed sudah terisi")
        await ttp.update({ 
            objectstatusbedfk: 1 
        }, {
            transaction: transaction
        });
        ttp = ttp.toJSON()
    }
    if (req.body.norectriage !== '') {
        pasienigd = await db.t_pasienigd.findByPk(req.body.norectriage, {
            transaction: transaction
        })
        await pasienigd.update({ 
            objectdaftarpasienfk: norecDP 
        }, {
            transaction: transaction
        });
        pasienigd = pasienigd.toJSON()
    }

    return [antreanPemeriksaan, ttp, pasienigd]
}

const hCreatePasienBayi = async (req, res, transaction, { objBody, nocm }) => {
    const result = await m_pasien.create({
        nocm: nocm,
        namapasien: objBody.namaPasien,
        noidentitas: objBody.nikPasien,
        objectjeniskelaminfk: objBody.jenisKelamin,
        objecttitlefk: objBody.titlepasien,
        objectagamafk: objBody.agama,
        objectgolongandarahfk: objBody.golDarah,
        objectkebangsaanfk: objBody.kebangsaan,
        objectstatusperkawinanfk: 1,
        tgldaftar: new Date(),
        tempatlahir: objBody.tempatLahir,
        tgllahir: new Date(objBody.tglLahirPasien),
        objectpendidikanfk: 20,
        objectpekerjaanfk: 1,
        objectetnisfk: objBody.suku,
        alamatrmh: objBody.alamatPasien,
        rtktp: objBody.rt,
        rwktp: objBody.rw,
        objectdesakelurahanktpfk: objBody.desa,
        objectnegaraktpfk: objBody.negara,
        alamatdomisili: objBody.alamatdomisili,
        rtdomisili: objBody.rtdomisili,
        rwdomisili: objBody.rwdomisili,
        objectdesakelurahandomisilifk: objBody.desaDomisili,
        objectnegaradomisilifk: objBody.negaraDomisili,
        statusenabled: true,
        nobpjs: objBody.nobpjs || null,
        nohp: objBody.nohp || null,
        nocmibu:objBody.nocmfkibu||null
    }, {
        transaction: transaction
    })
    return result
}
const hUpdatePasienBayi = async (req, res, transaction, {nocm}) => {
    const objBody = req.body
    const pasienBefore = await m_pasien.findOne({
        where: {
            id: objBody.id
        },
        transaction: transaction
    })
    if(!pasienBefore.nocm) {
        await running_Number.update({ new_number: nocm }, {
            where: {
                id: 1
            },
            transaction: transaction
        });
    }

    await pasienBefore.update({
        nocm: pasienBefore.nocm || nocm,
        namapasien: objBody.namaPasien,
        noidentitas: objBody.nikPasien,
        objectjeniskelaminfk: objBody.jenisKelamin,
        objecttitlefk: objBody.titlepasien,
        objectagamafk: objBody.agama,
        objectgolongandarahfk: objBody.golDarah,
        objectkebangsaanfk: objBody.kebangsaan,
        objectstatusperkawinanfk: 1,
        tgldaftar: new Date(),
        tempatlahir: objBody.tempatLahir,
        tgllahir: new Date(objBody.tglLahirPasien),
        objectpendidikanfk: 20,
        objectpekerjaanfk: 1,
        objectetnisfk: objBody.suku,
        alamatrmh: objBody.alamatPasien,
        rtktp: objBody.rt,
        rwktp: objBody.rw,
        objectdesakelurahanktpfk: objBody.desa,
        objectnegaraktpfk: objBody.negara,
        alamatdomisili: objBody.alamatdomisili,
        rtdomisili: objBody.rtdomisili,
        rwdomisili: objBody.rwdomisili,
        objectdesakelurahandomisilifk: objBody.desaDomisili,
        objectnegaradomisilifk: objBody.negaraDomisili,
        statusenabled: true,
        nobpjs: objBody.nobpjs || null,
        nohp: objBody.nohp || null,
        nocmibu:objBody.nocmfkibu||null
    }, {
        transaction: transaction
    })
    return pasienBefore.toJSON()
}