import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid'
import queries from '../../../queries/transaksi/registrasi.queries';
import db from "../../../models";
import {
    createTransaction
} from "../../../utils/dbutils";
import { qCountCaraBayar, qCountNonBPJS, qGetKunjunganPoliklinik, qGetPasienBatal, qGetPasienMeninggalRanap, qGetPasienPulangIGD, qGetPasienPulangRanap, qGetPasienRawatIGD, qGetPasienTerdaftar, qGetPasienTerdaftarRanap } from "../../../queries/eis/eis.queries";
import { getDateStartEnd } from "../../../utils/dateutils";
import { daftarInstalasi } from "../../../queries/master/instalasi/instalasi.queries";
import { daftarRekanan } from "../../../queries/master/rekanan/rekanan.queries";
import { groupBy } from '../../../utils/arutils'

const Op = db.Sequelize.Op;


const getPasienRJ = async (req, res) => {
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

        const pasienTerdaftar = (await pool.query(qGetPasienTerdaftar, [
            awalTanggalMulai || '',
            akhirTanggalSelesai || '',
            daftarInstalasi.INSTALASI_RAWAT_JALAN
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
        const { tanggalmulai, tanggalselesai } = req.query
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
            daftarInstalasi.INSTALASI_GAWAT_DARURAT
        ])).rows


        const pasienPulang = (await pool.query(qGetPasienPulangIGD , [
            awalTanggalMulai || '',
            akhirTanggalSelesai || ''
        ])).rows

        const pasienRawat = (await pool.query(qGetPasienRawatIGD , [
            awalTanggalMulai || '',
            akhirTanggalSelesai || ''
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

        const tempres = {
            pasienTerdaftar: arrTimesTerdaftar,
            pasienPulang: arrTimesPulang,
            pasienMeninggal: arrTimesMeninggal,
            kamarTerdaftar: kamarTerdaftar
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
        const { tanggalmulai, tanggalselesai } = req.query
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
                awalTanggalMulai,
                akhirTanggalSelesai,
                daftarRekanan.BPJSKESEHATAN
            ]), 
            pool.query(qCountCaraBayar, [
                awalTanggalMulai,
                akhirTanggalSelesai,
                daftarRekanan.UMUMPRIBADI
            ]),
            pool.query(qCountNonBPJS, [
                awalTanggalMulai,
                akhirTanggalSelesai
            ]),
        ])

        const tempres = {
            bpjs: bpjs.rows[0] || null,
            umum: umum.rows[0] || null,
            nonBPJS: nonBPJS.rows[0] || null
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

export default {
    getPasienRJ,
    getPasienIGD,
    getPasienRanap,
    getCountCaraBayar,
    getPoliklinikTerbanyak
}

/**
 * 
 * @param {*} pasiens 
 * @param {*} tanggalMulai 
 * @param {*} tanggalSelesai 
 * @param {(data) => Date} [getDate] 
 * @returns 
 */
const hGroupDateAr = (pasiens, tanggalMulai, tanggalSelesai, getDate) => {
    const arrTimes = hCreateDateAr(tanggalMulai, tanggalSelesai)
    pasiens.forEach((data) => {
        for (let i = 0; i < arrTimes.length; i++) {
            let arrTime = arrTimes[i], isGrouped = false;
            [arrTime, isGrouped] = hGroupDate(arrTime, data, getDate)
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
    ,endTime = end ? new Date(end) : new Date()
    ,arrTimes = []
    ,dayMillisec = 24 * 60 * 60 * 1000;
    for (let q = initialTime; q <= endTime; q = new Date(q.getTime() + dayMillisec)) {
        arrTimes.push({
            date: q.toISOString(),
            items: [],
            total: 0
        });
    }
    return arrTimes
}

const hGroupDate = (arrTime, data, getDate) => {
    const {todayStart, todayEnd} = getDateStartEnd(arrTime.date);
    const tglRegistrasi = getDate ? getDate(data) : data.tglregistrasi
    if(new Date(tglRegistrasi) >= todayStart && new Date(tglRegistrasi) <= todayEnd){
        const newAr =  [...arrTime.items, data]
        let newArrTime = {
            ...arrTime, 
            total: newAr.length,
            items: newAr
        }
        return [newArrTime, true]
    }
    return [arrTime, false]
}