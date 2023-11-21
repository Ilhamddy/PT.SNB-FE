import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/registrasi.queries';
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { qCountCaraBayar, qCountNonBPJS, qGetCountDokterUmum, qGetCountJenisKelamin, qGetCountPegawai, qGetCountPendidikanTerakhir, qGetCountPenunjangMedis, qGetCountPerawatBidan, qGetCountProfesi, qGetCountSpesialis, qGetCountSpesialisasi, qGetCountStatus, qGetCountUnit, qGetJabatan, qGetKartuStok, qGetKunjunganPoliklinik, qGetPasienBatal, qGetPasienMeninggalRanap, qGetPasienPulangIGD, qGetPasienPulangRanap, qGetPasienRawatIGD, qGetPasienTerdaftar, qGetPasienTerdaftarRanap, qGetPegawaiPensiun, qGetPegawaiSIP, qGetPembayaran, qGetPembayaranLain, qGetPembayaranPelayanan, qGetPembayaranTime, qGetPemesanan, qGetPenerimaan, qGetProdukTerbanyak, qGetRetur, qGetSepuluhBesarObat, qGetTempatTidur, qGetUsia } from "../../../queries/eis/eis.queries";
import { getDateStartEnd, getDateStartEndYear } from "../../../utils/dateutils";
import { daftarInstalasi } from "../../../queries/mastertable/instalasi/instalasi.queries";
import { daftarRekanan } from "../../../queries/mastertable/rekanan/rekanan.queries";
import { groupBy } from '../../../utils/arutils'

const Op = db.Sequelize.Op;


const getPasienRJ = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { tanggalmulai, tanggalselesai, carabayar } = req.query
        const {
            todayStart: awalTanggalMulai, 
        } 
        = getDateStartEnd(tanggalmulai);
        const {
            todayEnd: akhirTanggalSelesai
        } 
        = getDateStartEnd(tanggalselesai);

        const pasienTerdaftar = (await pool.query(qGetPasienTerdaftar, [
            awalTanggalMulai || '',
            akhirTanggalSelesai || '',
            daftarInstalasi.INSTALASI_RAWAT_JALAN,
            carabayar || ""
        ])).rows
        const pasienBatal = (await pool.query(qGetPasienBatal , [
            awalTanggalMulai || '',
            akhirTanggalSelesai || '',
            daftarInstalasi.INSTALASI_RAWAT_JALAN
        ])).rows
        const arrTimesTerdaftar = hGroupDateAr(
            pasienTerdaftar, 
            awalTanggalMulai, 
            akhirTanggalSelesai
        )
        const arrTimesBatal = hGroupDateAr(
            pasienBatal, 
            awalTanggalMulai, 
            akhirTanggalSelesai
        )
        const tempres = {
            pasienTerdaftar: arrTimesTerdaftar,
            pasienBatal: arrTimesBatal
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

const getPasienIGD = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { tanggalmulai, tanggalselesai, carabayar } = req.query
        const {
            todayStart: awalTanggalMulai, 
        } 
        = getDateStartEnd(tanggalmulai);
        const {
            todayEnd: akhirTanggalSelesai
        } 
        = getDateStartEnd(tanggalselesai);

        const pasienTerdaftar = (await pool.query(qGetPasienTerdaftar, [
            awalTanggalMulai || '',
            akhirTanggalSelesai || '',
            daftarInstalasi.INSTALASI_GAWAT_DARURAT,
            carabayar || ""
        ])).rows


        const pasienPulang = (await pool.query(qGetPasienPulangIGD , [
            awalTanggalMulai || '',
            akhirTanggalSelesai || '',
            carabayar || ''
        ])).rows

        const pasienRawat = (await pool.query(qGetPasienRawatIGD , [
            awalTanggalMulai || '',
            akhirTanggalSelesai || '',
            carabayar || ''
        ])).rows

        const arrTimesTerdaftar = hGroupDateAr(
            pasienTerdaftar, 
            awalTanggalMulai, 
            akhirTanggalSelesai
        )

        const arrTimesPulang = hGroupDateAr(
            pasienPulang, 
            awalTanggalMulai, 
            akhirTanggalSelesai,
            (data) => data.tglpulang 
        )

        const arrTimesRawat = hGroupDateAr(
            pasienRawat, 
            awalTanggalMulai, 
            akhirTanggalSelesai, 
        )
        
        const tempres = {
            pasienTerdaftar: arrTimesTerdaftar,
            pasienPulang: arrTimesPulang,
            pasienRawat: arrTimesRawat
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

const getPasienRanap = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { tanggalmulai, tanggalselesai } = req.query
        const {
            todayStart: awalTanggalMulai, 
        } 
        = getDateStartEnd(tanggalmulai);
        const {
            todayEnd: akhirTanggalSelesai
        } 
        = getDateStartEnd(tanggalselesai);

        let [pasienTerdaftar, pasienPulang, pasienMeninggal] = await Promise.all([
            pool.query(qGetPasienTerdaftarRanap, [
                awalTanggalMulai || '',
                akhirTanggalSelesai || ''
            ]),
            pool.query(qGetPasienPulangRanap , [
                awalTanggalMulai || '',
                akhirTanggalSelesai || ''
            ]),
            pool.query(qGetPasienMeninggalRanap , [
                awalTanggalMulai || '',
                akhirTanggalSelesai || ''
            ])
        ])
        pasienTerdaftar = pasienTerdaftar.rows
        pasienPulang = pasienPulang.rows
        pasienMeninggal = pasienMeninggal.rows
        let kamarTerdaftar = groupBy(pasienTerdaftar, "idkamar", "namakamar")
        let kamarPasienPulang = groupBy(pasienPulang, "idkamar", "namakamar")
        kamarTerdaftar.map((terdaftar) => {
            const totalPulang = kamarPasienPulang.reduce((prev, pulang) => {
                if(pulang.idkamar === terdaftar.idkamar){
                    return prev + pulang._total
                }
                return prev
            }, 0)
            terdaftar._totalpulang = totalPulang
        })
        kamarTerdaftar = kamarTerdaftar.sort((a, b) => b._total - a._total)

        const arrTimesTerdaftar = hGroupDateAr(
            pasienTerdaftar, 
            awalTanggalMulai, 
            akhirTanggalSelesai
        )

        const arrTimesPulang = hGroupDateAr(
            pasienPulang, 
            awalTanggalMulai, 
            akhirTanggalSelesai,
            (data) => data.tglpulang 
        )

        const arrTimesMeninggal = hGroupDateAr(
            pasienMeninggal, 
            awalTanggalMulai, 
            akhirTanggalSelesai, 
        )

        // TODO: numpang sementara
        const tempatTidur = await pool.query(qGetTempatTidur)

        const tempres = {
            pasienTerdaftar: arrTimesTerdaftar,
            pasienPulang: arrTimesPulang,
            pasienMeninggal: arrTimesMeninggal,
            kamarTerdaftar: kamarTerdaftar,
            tempatTidur: tempatTidur.rows
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

const getCountCaraBayar = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { tanggalmulai, tanggalselesai, carabayar } = req.query
        const {
            todayStart: awalTanggalMulai, 
        } 
        = getDateStartEnd(tanggalmulai);
        const {
            todayEnd: akhirTanggalSelesai
        } 
        = getDateStartEnd(tanggalselesai);

        const [bpjs, umum, nonBPJS] = await Promise.all([
            pool.query(qCountCaraBayar, [
                awalTanggalMulai || '',
                akhirTanggalSelesai  || '',
                daftarRekanan.BPJSKESEHATAN,
                carabayar || ''
            ]), 
            pool.query(qCountCaraBayar, [
                awalTanggalMulai || '',
                akhirTanggalSelesai || '',
                daftarRekanan.UMUMPRIBADI,
                carabayar || ''
            ]),
            pool.query(qCountNonBPJS, [
                awalTanggalMulai || '',
                akhirTanggalSelesai || '',
                carabayar || ''
            ]),
        ])

        const tempres = {
            bpjs: {
                data: bpjs.rows,
                count: bpjs.rows.length
            },
            umum: {
                data: umum.rows,
                count: umum.rows.length
            },
            nonBPJS: {
                data: nonBPJS.rows,
                count: nonBPJS.rows.length
            }
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

const getPoliklinikTerbanyak = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { tanggalmulai, tanggalselesai } = req.query
        const {
            todayStart: awalTanggalMulai, 
        } 
        = getDateStartEnd(tanggalmulai);
        const {
            todayEnd: akhirTanggalSelesai
        } 
        = getDateStartEnd(tanggalselesai);

        const kunjungan = await pool.query(qGetKunjunganPoliklinik, [
            awalTanggalMulai,
            akhirTanggalSelesai
        ])
        let kunjunganGrouped = groupBy(kunjungan.rows, "idunit", "namaunit")
        kunjunganGrouped = kunjunganGrouped.sort((a, b) => b._total - a._total)
        const tempres = {
            kunjungan: kunjunganGrouped
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

const getCountUnit = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { tanggalmulai, tanggalselesai } = req.query
        const {
            todayStart: awalTanggalMulai, 
        } 
        = getDateStartEnd(tanggalmulai);
        const {
            todayEnd: akhirTanggalSelesai
        } 
        = getDateStartEnd(tanggalselesai);

        const countUnit = (await pool
            .query(qGetCountUnit, []))
            .rows[0]
        const tempres = {
            countUnit: countUnit
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

const getStatusPegawai = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const countPegawai = (await pool.query(qGetCountPegawai)).rows[0]
        const countSpesialis = (await pool.query(qGetCountSpesialis)).rows[0]
        const countDokterUmum = (await pool.query(qGetCountDokterUmum)).rows[0]
        const countPerawatBidan = (await pool.query(qGetCountPerawatBidan)).rows[0]
        const countPenunjangMedis = (await pool.query(qGetCountPenunjangMedis)).rows[0]
        const countStatus = (await pool.query(qGetCountStatus)).rows
        const countJenisKelamin = (await pool.query(qGetCountJenisKelamin)).rows
        const usiaPegawai = (await pool.query(qGetUsia)).rows
        const countJabatan = (await pool.query(qGetJabatan)).rows
        const countProfesi = (await pool.query(qGetCountProfesi)).rows
        const countPendidikanTerakhir = (await pool.query(qGetCountPendidikanTerakhir)).rows
        const countSpesialisasi = (await pool.query(qGetCountSpesialisasi)).rows
        const arUsiaPegawai = hGroupAgeAr(usiaPegawai)
        const tempres = {
            countPegawai: countPegawai || null,
            countSpesialis: countSpesialis || null,
            countDokterUmum: countDokterUmum || null,
            countPerawatBidan: countPerawatBidan || null,
            countPenunjangMedis: countPenunjangMedis || null,
            countStatus: countStatus || [],
            countJenisKelamin: countJenisKelamin || [],
            arUsiaPegawai: arUsiaPegawai || [],
            countJabatan: countJabatan || [],
            countProfesi: countProfesi || [],
            countPendidikanTerakhir: countPendidikanTerakhir || [],
            countSpesialisasi: countSpesialisasi || [],
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

const getPegawaiPensiun = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { yearStart } = getDateStartEndYear()
        const pegawaiPensiun = (await pool.query(qGetPegawaiPensiun, [yearStart.toISOString()])).rows
        const pegawaiSIP = (await pool.query(qGetPegawaiSIP, [yearStart.toISOString()])).rows

        const tempres = {
            pegawaiPensiun,
            pegawaiSIP
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

const getDasborFarmasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { tanggalmulai, tanggalselesai } = req.query
        const {
            todayStart: awalTanggalMulai, 
        } 
        = getDateStartEnd(tanggalmulai);
        const {
            todayEnd: akhirTanggalSelesai
        } 
        = getDateStartEnd(tanggalselesai);

        const pemesanan = (await pool.query(qGetPemesanan)).rows
        const penerimaan = (await pool.query(qGetPenerimaan)).rows
        const retur = (await pool.query(qGetRetur)).rows
        const kartuStok = (await pool.query(qGetKartuStok)).rows
        const arrTimesPemesanan = hGroupDateAr(
            pemesanan, 
            awalTanggalMulai, 
            akhirTanggalSelesai,
            (data) => data.tglorder,
            (arData) => arData.reduce((prev, c) => prev + (c.totalpesan || 0), 0)
        )
        const arrTimesPenerimaan = hGroupDateAr(
            penerimaan, 
            awalTanggalMulai, 
            akhirTanggalSelesai,
            (data) => data.tglterima,
            (arData) => arData.reduce((prev, c) => prev + (c.totalterima || 0), 0)
        )
        const arrTimesRetur = hGroupDateAr(
            retur, 
            awalTanggalMulai, 
            akhirTanggalSelesai,
            (data) => data.tglretur,
            (arData) => arData.reduce((prev, c) => prev + (c.totalretur || 0), 0)
        )
        const sepuluhBesarObat = (await pool.query(qGetSepuluhBesarObat))
            .rows
            .slice(0, 10)
        const produkTerbanyak = (await pool.query(qGetProdukTerbanyak)).rows
        const jmlPemesanan = pemesanan.length
        const jmlPenerimaan = penerimaan.length
        const jmlRetur = retur.length
        const tempres = {
            pemesanan: pemesanan,
            arTimePemesanan: arrTimesPemesanan,
            jmlPemesanan: jmlPemesanan,
            penerimaan: penerimaan,
            arTimesPenerimaan: arrTimesPenerimaan,
            jmlPenerimaan: jmlPenerimaan,
            retur: retur,
            arTimesRetur: arrTimesRetur,
            jmlRetur: jmlRetur,
            kartuStok: kartuStok,
            sepuluhBesarObat: sepuluhBesarObat,
            produkTerbanyak: produkTerbanyak
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

const getDasborPendapatan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { tanggalmulai, tanggalselesai, carabayar } = req.query
        const {
            todayStart: awalTanggalMulai, 
        } 
        = getDateStartEnd(tanggalmulai);
        const {
            todayEnd: akhirTanggalSelesai
        } 
        = getDateStartEnd(tanggalselesai);

        const pembayaran = 
            (await pool.query(qGetPembayaran, [awalTanggalMulai, akhirTanggalSelesai]))
            .rows
        const pembayaranPelayanan = 
            (await pool.query(qGetPembayaranPelayanan, [awalTanggalMulai, akhirTanggalSelesai]))
            .rows
        const pembayaranLain = 
            (await pool.query(qGetPembayaranLain, [awalTanggalMulai, akhirTanggalSelesai]))
            .rows
        let pembayaranTime = 
            (await pool.query(qGetPembayaranTime, [awalTanggalMulai, akhirTanggalSelesai]))
            .rows
        pembayaranTime = pembayaranTime.map((p) => {
            const newP = {...p}
            const arrTimesData = hGroupDateAr(
                p.datas, 
                awalTanggalMulai, 
                akhirTanggalSelesai,
                (data) => data.tglbayar,
                (arData) => arData.reduce((prev, c) => prev + (c.totalbayar || 0), 0)
            )
            newP.datas = arrTimesData
            return newP
        })
        const tempres = {
            pembayaran: pembayaran,
            pembayaranPelayanan: pembayaranPelayanan,
            pembayaranLain: pembayaranLain,
            bayarWaktu: pembayaranTime,
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
    getPasienRJ,
    getPasienIGD,
    getPasienRanap,
    getCountCaraBayar,
    getPoliklinikTerbanyak,
    getCountUnit,
    getStatusPegawai,
    getPegawaiPensiun,
    getDasborFarmasi,
    getDasborPendapatan
}

/**
 * 
 * @param {*} datas 
 * @param {*} tanggalMulai 
 * @param {*} tanggalSelesai 
 * @param {(data) => Date} [getDate] 
 * @param {(arData) => number} [getTotal] 
 * @returns 
 */
const hGroupDateAr = (datas, tanggalMulai, tanggalSelesai, getDate, getTotal) => {
    const arrTimes = hCreateDateAr(tanggalMulai, tanggalSelesai)
    datas.forEach((data) => {
        for (let i = 0; i < arrTimes.length; i++) {
            let arrTime = arrTimes[i], isGrouped = false;
            [arrTime, isGrouped] = hGroupDate(arrTime, data, getDate, getTotal)
            arrTimes[i] = arrTime
            if(isGrouped){
                break
            }
        }  
    })
    return arrTimes
}

const hCreateDateAr = (start, end) => {
    let initialTime = start ? new Date(start) : new Date()
    let endTime = end ? new Date(end) : new Date()
    let arrTimes = []
    let dayMillisec = 24 * 60 * 60 * 1000;
    for (let q = initialTime; q <= endTime; q = new Date(q.getTime() + dayMillisec)) {
        arrTimes.push({
            date: q.toISOString(),
            items: [],
            total: 0
        });
    }
    return arrTimes
}

const hGroupDate = (arrTime, data, getDate, getTotal) => {
    const {todayStart, todayEnd} = getDateStartEnd(arrTime.date);
    const tglRegistrasi = getDate ? getDate(data) : data.tglregistrasi
    if(!tglRegistrasi){
        return [arrTime, false]
    }
    if(new Date(tglRegistrasi) >= todayStart && new Date(tglRegistrasi) <= todayEnd){
        const newAr =  [...arrTime.items, data]
        let newArrTime = {
            ...arrTime, 
            total: getTotal ? getTotal(newAr) : newAr.length,
            items: newAr
        }
        return [newArrTime, true]
    }
    return [arrTime, false]
}

/**
 * 
 * @param {*} pegawai 
 * @param {(data) => number} [getAge] 
 * @param {(data) => string} [getGender] 
 * @returns 
 */
const hGroupAgeAr = (pegawai, getAge, getGender) => {
    const arrTimes = hCreateAgeAr(0, 95)
    pegawai.forEach((data) => {
        for (let i = 0; i < arrTimes.length; i++) {
            let arrTime = arrTimes[i], isGrouped = false;
            [arrTime, isGrouped] = hGroupAge(arrTime, data, getAge, getGender)
            arrTimes[i] = arrTime
            if(isGrouped){
                break
            }
        }  
    })
    return arrTimes
}


const hCreateAgeAr = (start, end) => {
    let initialAge = start
    let endAge = end
    let arrAge = []
    let ageGap = 10;
    for (let a = initialAge; a <= endAge; a = (a + ageGap)) {
        arrAge.push({
            ageStart: a,
            ageEnd: a + ageGap,
            items: [],
            gender: 'L',
            total: 0
        });
        arrAge.push({
            ageStart: a,
            ageEnd: a + ageGap,
            items: [],
            gender: 'P',
            total: 0
        });
    }
    return arrAge
}

const hGroupAge = (arrAge, data, getAge, getGender) => {
    const ageStart = arrAge.ageStart
    const ageEnd = arrAge.ageEnd
    const age = getAge ? getAge(data) : calculateAge(data.tgllahir)
    const gender = getGender ? getGender(data) : (data.jeniskelamin || '')
    const ageSesuai = age >= ageStart && age <= ageEnd
    const genderSesuai = gender.toUpperCase() === arrAge.gender
    if(ageSesuai && genderSesuai){
        const newAr =  [...arrAge.items, data]
        let newArrTime = {
            ...arrAge, 
            total: newAr.length,
            items: newAr
        }
        return [newArrTime, true]
    }
    return [arrAge, false]
}

const calculateAge = (birthDate) => {
    let newBirthDate = new Date(birthDate);
    let date = new Date();

    let years = (date.getFullYear() - newBirthDate.getFullYear());

    if (date.getMonth() < newBirthDate.getMonth() || 
        date.getMonth() == newBirthDate.getMonth() && date.getDate() < newBirthDate.getDate()) {
        years--;
    }

    return years;
}