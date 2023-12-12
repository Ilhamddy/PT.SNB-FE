import db from "../../../models";
import * as uuid from 'uuid';
import pool from "../../../config/dbcon.query";
import { qGetDokter, qGetPenjamin, qGetPoliklinik } from "../../../queries/daftarmandiri/daftarpasienlama/daftarpasienlama.queries";
import { groupBy } from "../../../utils/arutils";
import unitQueries from "../../../queries/mastertable/unit/unit.queries";
import pegawaiQueries from "../../../queries/mastertable/pegawai/pegawai.queries";
import rekananQueries from "../../../queries/mastertable/rekanan/rekanan.queries";
import { qGetDaftarPasienLama } from "../../../queries/daftarmandiri/daftarpasienlama/daftarpasienlama.queries";
import queriesRegistrasi from '../../../queries/transaksi/registrasi.queries';
import * as nodemailer from "nodemailer"
import { dateLocal } from "../../../utils/dateutils";


const getPasienLama = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const pasien = await pool.query(qGetDaftarPasienLama, [req.id])
        const isNotPasienSementara = (pasien.rows?.[0]?.nocm || null) !== null
        const tempres = {
            pasien: pasien.rows?.[0] || null,
            isNotPasienSementara: isNotPasienSementara
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

const getComboDaftar = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const poliklinik = (await pool.query(unitQueries.getPoliklinik)).rows
        const dokter = (await pool.query(pegawaiQueries.getDokter)).rows
        const penjamin = (await pool.query(rekananQueries.getPenjamin)).rows

        const tempres = {
            poliklinik,
            dokter,
            penjamin
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

const getDokter = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const iddokter = req.query.iddokter
        const dokter = (await pool.query(qGetDokter, [iddokter])).rows?.[0]
        const tempres = {
            dokter: dokter || null
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

const savePasienMandiri = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {daftarPasien, antreanPemeriksaan} = await db.sequelize.transaction(async (transaction) => {
            const {dokter, penjamin, nocmfk, poliklinik, jenispenjamin, jadwal} = req.body
            let norecDP = uuid.v4().substring(0, 32)
            let objectpenjaminfk = penjamin || null
            const pasien = (await pool.query(qGetDaftarPasienLama, [req.id])).rows[0]
            if(!pasien) throw new Error("Pasien tidak ditemukan")
            let todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0)
            let todayEnd = new Date();
            todayEnd.setHours(23, 59, 59, 999)
            let resultCountNoantrianDokter = await pool.query(queriesRegistrasi.qNoAntrian, [dokter, todayStart, todayEnd]);
            const dataDokter = (await pool.query(qGetDokter, [dokter])).rows?.[0]
            const dataPenjamin = (await pool.query(qGetPenjamin, [objectpenjaminfk])).rows?.[0]
            const dataPoliklinik = (await pool.query(qGetPoliklinik, [poliklinik])).rows?.[0]

            let noantrian = parseFloat(resultCountNoantrianDokter.rows[0].count) + 1
            const noreservasi = await hCreateNores(jadwal)
            const noregistrasi = await hCreateNoreg(jadwal)

            let statuspasien = pasien.nocm ? "BARU" : "LAMA"

            const daftarPasien = await db.t_daftarpasien.create({
                norec: norecDP,
                nocmfk: nocmfk,
                noregistrasi: !pasien.nocm ? null : noregistrasi,
                tglregistrasi: !pasien.nocm ? null : new Date(jadwal),
                objectunitlastfk: poliklinik,
                objectdokterpemeriksafk: dokter,
                objectpegawaifk: null,
                objectkelasfk: 8,
                objectjenispenjaminfk: jenispenjamin,
                statuspasien: statuspasien,
                tglpulang: null,
                objectasalrujukanfk: null,
                objectinstalasifk: 1,
                objectpenjaminfk: objectpenjaminfk,
                objectpenjamin2fk: null,
                objectpenjamin3fk: null,
                objectpjpasienfk: null,
                objectcaramasukfk: null,
                statusenabled: true,
                caradaftar: 'RO'
            }, { transaction });
            const norecRegistrasi = uuid.v4().substring(0, 32);
            const regisOnline = await db.t_registrasionline.create({
                norec: norecRegistrasi,
                kdprofile: 0,
                statusenabled: true,
                nocmfk: daftarPasien.nocmfk,
                noreservasi: "R" + noreservasi,
                objectunitfk: poliklinik,
                objectdokterfk: dokter,
                tglrencana: new Date(jadwal),
                objectjadwaldokterfk: null,
                tglinput: new Date(),
                objectdaftarpasienfk: daftarPasien.norec
            }, {
                transaction: transaction
            });
            let norecAP = uuid.v4().substring(0, 32);
            let antreanPemeriksaan = null
            if(pasien.nocm){
                antreanPemeriksaan = await db.t_antreanpemeriksaan.create({
                    norec: norecAP,
                    objectdaftarpasienfk: norecDP,
                    tglmasuk: new Date(jadwal),
                    tglkeluar: null,
                    objectdokterpemeriksafk: dokter,
                    objectunitfk: poliklinik,
                    noantrian: noantrian,
                    objectkamarfk: null,
                    objectkelasfk: null,
                    nobed: null,
                    taskid: 3,
                    statusenabled: true
                }, {
                    transaction: transaction
                });
            }
            await hSendEmailDaftar(
                pasien.email, 
                pasien.namapasien, 
                pasien.nocm || pasien.nocmtemp,
                noreservasi,
                !pasien.nocm ? null : noregistrasi,
                dataDokter.namadokter,
                jadwal,
                dataPenjamin?.namapenjamin || "",
                dataPoliklinik?.namaunit || ""
            )

            return { daftarPasien, antreanPemeriksaan }
        });
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
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getRiwayatPasien = async (req, res) => {
    const logger = res.locals.logger;
    try{
        
        const tempres = {
        
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
    getPasienLama,
    getComboDaftar,
    getDokter,
    savePasienMandiri
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

export const hCreateNores = async (date) => {
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
    let query = `select count(norec) from t_registrasionline
    where tglrencana between $1 and $2`
    let resultCount = await pool.query(query, [todayStart, todayEnd]);
    let noreservasi = parseFloat(resultCount.rows[0].count) + 1
    for (let x = resultCount.rows[0].count.toString().length; x < 4; x++) {
        if (noreservasi.toString().length !== 4)
            noreservasi = '0' + noreservasi;
    }
    noreservasi = 
        today.getFullYear() + todayMonth.toString() + todayDate.toString() + noreservasi
    return noreservasi
}

// disable karena hanya string
// eslint-disable-next-line max-lines-per-function
const hSendEmailDaftar = async (email, nama, norm, noreservasi, noregistrasi, dokter, jadwal, namapenjamin, namaunit) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'snberdikarinoreply@gmail.com',
            pass: 'heztcjllcnyiivol'
        }
    })

    const tNoRegistrasi = !noregistrasi ? ``: 
    `
        <tr>
            <td scope="row">
                <div dir="ltr">
                    No Registrasi
                </div>
            </td>
            <td>
                <div id="basic-rater" dir="ltr">
                    : ${noreservasi}
                </div>
            </td>
        </tr>
    `
    const tPenjamin = !namapenjamin ? ``: 
    `
        <tr>
            <td scope="row">
                <div dir="ltr">
                    Penjamin
                </div>
            </td>
            <td>
                <div id="basic-rater" dir="ltr">
                    : ${namapenjamin}
                </div>
            </td>
        </tr>
    `


    let mailOptions = {
        from: 'snberdikarinoreply@gmail.com',
        to: email,
        subject: 'Pendaftaran anda di Rumah Sakit SNB',
        text: `Terima kasih telah mendaftar ke SNB`,
        html: `<p>Terima kasih telah mendaftar ke SNB, berikut merupakan data anda</p>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div dir="ltr">
                                        Nama Pengguna
                                    </div>
                                </td>
                                <td>
                                    <div dir="ltr">
                                        : ${nama}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    <div dir="ltr">
                                        No RM
                                    </div>
                                </td>
                                <td>
                                    <div id="basic-rater" dir="ltr">
                                        : ${norm}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    <div dir="ltr">
                                        E-Mail
                                    </div>
                                </td>
                                <td>
                                    <div id="basic-rater" dir="ltr">
                                        : ${email}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    <div dir="ltr">
                                        No Reservasi
                                    </div>
                                </td>
                                <td>
                                    <div id="basic-rater" dir="ltr">
                                        : ${noreservasi}
                                    </div>
                                </td>
                            </tr>
                            ${tNoRegistrasi}
                            <tr>
                                <td scope="row">
                                    <div dir="ltr">
                                        Poliklinik
                                    </div>
                                </td>
                                <td>
                                    <div id="basic-rater" dir="ltr">
                                        : ${namaunit}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    <div dir="ltr">
                                        Dokter
                                    </div>
                                </td>
                                <td>
                                    <div id="basic-rater" dir="ltr">
                                        : ${dokter}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    <div dir="ltr">
                                        Tanggal Janji
                                    </div>
                                </td>
                                <td>
                                    <div id="basic-rater" dir="ltr">
                                        : ${dateLocal(jadwal)}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    <div dir="ltr">
                                        Tanggal Daftar
                                    </div>
                                </td>
                                <td>
                                    <div id="basic-rater" dir="ltr">
                                        : ${dateLocal(new Date())}
                                    </div>
                                </td>
                            </tr>
                            ${tPenjamin}
                        </tbody>
                    </table>
                <p> Anda dapat menunjukkan data anda ke loket untuk verifikasi data anda</p>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    return info
}

