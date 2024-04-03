
import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid';
import db from "../../../models";
import LZString from 'lz-string';
import crypto from 'crypto';
import axios from "axios";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import Queries from "../../../queries/bpjs/bpjs.queries"
const algorithm = 'aes-256-cbc';
const t_antreanpemeriksaan = db.t_antreanpemeriksaan

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

async function generateSignature(req, res) {
    try {
        let tempres = 'test'
        tempres = generateAuthHeaders()
        res.status(200).send({
            data: "kosong",
            status: "success",
            success: true,
        });

    } catch (error) {
        res.status(500).send({ message: JSON.stringify(error) });
    }
}

/**
 * 
 * @returns {Promise<[
 * {
 * 'X-cons-id': string,
 * 'X-timestamp': number,
 * 'X-signature': string,
 * 'user-key': string
 * },
 * string 
 * ]>}
 */
async function generateAuthHeaders () {
    const sGlobal = (await pool.query(Queries.qGetGlobalVclaim)).rows
    let vclaim_consumerid = ''
    let vclaim_consumersecret = ''
    let vclaim_userkey = ''
    let vclaim_url = ''
    for (let x = 0; x < sGlobal.length; x++) {
        if (sGlobal[x].s_key === 'consumerid_vclaim') {
            vclaim_consumerid = sGlobal[x].s_value
        }
        if (sGlobal[x].s_key === 'consumersecret_vclaim') {
            vclaim_consumersecret = sGlobal[x].s_value
        }
        if (sGlobal[x].s_key === 'userkey_vclaim') {
            vclaim_userkey = sGlobal[x].s_value
        }
        if (sGlobal[x].s_key === 'url_vclaim') {
            vclaim_url = sGlobal[x].s_value
        }
    }
    if(!vclaim_consumerid){
        return [null, null,null]
    }
    // keep track of this timestamp, you will need it for the RequestInfo Object
    const timestamp   = Math.floor(Date.now() / 1000)
    const variable = vclaim_consumerid + "&" + timestamp.toString();

    const hash = crypto.createHmac('sha256', vclaim_consumersecret)
                    .update(variable)
                    .digest('base64')
    
    const headers = {
        'X-cons-id': vclaim_consumerid,
        'X-timestamp': timestamp,
        'X-signature': hash,
        'user-key': vclaim_userkey
    };

    let keyDecrypt = vclaim_consumerid + vclaim_consumersecret + timestamp.toString();

    return [headers, keyDecrypt,vclaim_url];
};

async function generateAuthHeadersIcare () {

    const sGlobal = (await pool.query(Queries.qGetGlobalIcare)).rows
    let icare_consumerid = ''
    let icare_consumersecret = ''
    let icare_userkey = ''
    let icare_url = ''
    for (let x = 0; x < sGlobal.length; x++) {
        if (sGlobal[x].s_key === 'consumerid_icare') {
            icare_consumerid = sGlobal[x].s_value
        }
        if (sGlobal[x].s_key === 'consumersecret_icare') {
            icare_consumersecret = sGlobal[x].s_value
        }
        if (sGlobal[x].s_key === 'userkey_icare') {
            icare_userkey = sGlobal[x].s_value
        }
        if (sGlobal[x].s_key === 'url_icare') {
            icare_url = sGlobal[x].s_value
        }
    }
    if(!icare_consumerid){
        return [null, null]
    }
    // keep track of this timestamp, you will need it for the RequestInfo Object
    const timestamp   = Math.floor(Date.now() / 1000)
    const variable = icare_consumerid + "&" + timestamp.toString();

    const hash = crypto.createHmac('sha256', icare_consumersecret)
                    .update(variable)
                    .digest('base64')


    const headers = {
        'X-cons-id': icare_consumerid,
        'X-timestamp': timestamp,
        'X-signature': hash,
        'Content-Type': 'application/json',
        'Format': 'Json',
        'user-key': icare_userkey
    };

    let keyDecrypt = icare_consumerid + icare_consumersecret + timestamp.toString();

    return [headers, keyDecrypt,icare_url];
};

/**
 * 
 * @returns {Promise<[import("axios").AxiosInstance, string]>}
 */
const createBpjsInstance = async () => {
    const [header, keydecrypt,vclaim_url] = await generateAuthHeaders();
    const instance = axios.create({
        baseURL: vclaim_url,
        timeout: 25000,
        headers: header
    });
    axios.create({
        baseURL: vclaim_url,
    });
    return [instance, keydecrypt];
}
export const createBpjsIcareInstance = async () => {
    const [header, keydecrypt,icare_url] = await generateAuthHeadersIcare();
    if(header === null){
        return [null, null]
    }
    const instance = axios.create({
        baseURL: icare_url,
        timeout: 25000,
        headers: header
    });
    axios.create({
        baseURL: icare_url,
    });
    return [instance, keydecrypt];
}

export function decryptBPJS(message, key) {
    // const iv = Buffer.from(key.substring(0,16), 'hex');
    if(message === null || message === undefined) return null;
    let hash = crypto.createHash('sha256');
    const keyhash = hash
        .update(new TextEncoder().encode(key))
        .digest();

    let decipher = crypto.createDecipheriv(algorithm, keyhash.subarray(0, 32), keyhash.subarray(0,16));
    let decrypted = decipher.update(message, 'base64', 'utf-8');
    decrypted += decipher.final('utf8');

    let decompress = LZString.decompressFromEncodedURIComponent(decrypted);
    decompress = JSON.parse(decompress)
    return decompress;
}

const getHistoryBPJS = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const [bpjs, keydecrypt] = await createBpjsInstance();
        // const {nokartu} = req.params
        let nokartu = '0001503919326';
        let dataHistori = null;
        let dataBpjs = null;
        let dataSPR = null;
        let dataRujukanKlinik = null;
        let dataRujukanRS = null;
        let dataNomorKartu = null;
        let tanggalData = formatDate(new Date())
        let tanggal60Hari = formatDate(new Date(
            (new Date()).getTime() - (50 * 24 * 60 * 60 * 1000)
        ))
        if(!nokartu){
            throw new BadRequestError("No Kartu tidak boleh kosong")
        }
        // get beberapa data opsional
        try{
            dataHistori = await bpjs.get(`/vclaim-rest/monitoring/HistoriPelayanan` +
                `/NoKartu/${nokartu}/tglMulai/${tanggal60Hari}/tglAkhir/${tanggalData}`,
            )
        }catch(e){
            console.error("error Histori")
            console.error(e)
        }
        try{
            dataBpjs = await bpjs.get(`/vclaim-rest/Peserta/nokartu/${nokartu}/tglSEP/${tanggalData}`)
        }catch(e){
            console.error("error BPJS")
            console.error(e)
        }
        try{
            dataSPR = await bpjs.get(`/vclaim-rest/RencanaKontrol/ListRencanaKontrol/Bulan/0` + 
                `${(new Date()).getMonth() + 1}/Tahun/${(new Date()).getFullYear()}` + 
                `/Nokartu/${nokartu}/filter/1`)
        }catch(e){
            console.error("error SPR")
            console.error(e.message)
        }
        try{
            dataRujukanKlinik = await bpjs.get(`/vclaim-rest/Rujukan/Peserta/${nokartu}`)
        }catch(e){
            console.error("error Rujukan Klinik")
            console.error(e.message)
        }
        try{
            dataRujukanRS = await bpjs.get(`/vclaim-rest/Rujukan/RS/Peserta/${nokartu}`)
        }catch(e){
            console.error("error Rujukan RS")
            console.error(e.message)
        }
    
    
        const decryptDataHistori = decryptBPJS(dataHistori?.data?.response, keydecrypt);
        const decryptDataBpjs = decryptBPJS(dataBpjs?.data?.response, keydecrypt);
        const decryptDataSPR = decryptBPJS(dataSPR?.data?.response, keydecrypt);
        const decryptRujukanKlinik = decryptBPJS(dataRujukanKlinik?.data?.response, keydecrypt);
        const decryptRujukanRS = decryptBPJS(dataRujukanRS?.data?.response, keydecrypt);
    
        const tempres = {
            histori: decryptDataHistori,
            kepesertaan: decryptDataBpjs,
            spr: decryptDataSPR,
            rujukanklinik: decryptRujukanKlinik,
            rujukanrs: decryptRujukanRS
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


const getProvinsi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const [bpjs, keydecrypt] = await createBpjsInstance();
        let dataProvinsi = null
        try{
            dataProvinsi = await bpjs.get(`/vclaim-rest/referensi/propinsi`)
        }catch(e){
            console.error("error data provinsi")
            console.error(e)
        }
        const decryptDataProvinsi = decryptBPJS(dataProvinsi?.data?.response, keydecrypt);
        const tempres = {
            provinsi: decryptDataProvinsi
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

const getKabupaten = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const [bpjs, keydecrypt] = await createBpjsInstance();
        let { provinsi } = req.params
        let dataKabupaten = null
        try{
            dataKabupaten = await bpjs.get(`/vclaim-rest/referensi/kabupaten/propinsi/${provinsi}`)
        }catch(e){
            console.error("error data kabupaten")
            console.error(e)
        }
        const decryptDataKabupaten = decryptBPJS(dataKabupaten?.data?.response, keydecrypt);
        const tempres = {
            kabupaten: decryptDataKabupaten
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

const getKecamatan = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const [bpjs, keydecrypt] = await createBpjsInstance();
        let { kabupaten } = req.params
        let dataKecamatan = null
        try{
            dataKecamatan = await bpjs.get(`/vclaim-rest/referensi/kecamatan/kabupaten/${kabupaten.padStart(4, '0')}}`)
        }catch(e){
            console.error("error data kecamatan")
            console.error(e)
        }
        const decryptDataKecamatan = decryptBPJS(dataKecamatan?.data?.response, keydecrypt);
        const tempres = {
            kecamatan: decryptDataKecamatan
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

const getFaskes = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const [bpjs, keydecrypt] = await createBpjsInstance();
        let { qfaskes, faskesType } = req.query
    
        qfaskes = decodeURIComponent(qfaskes)
        let dataFaskes = null
        console.log(qfaskes, faskesType)
        try{
            dataFaskes = await bpjs.get(`/vclaim-rest/referensi/faskes/${qfaskes}/${faskesType}`)
        }catch(e){
            console.error("error data kecamatan")
            console.error(e)
        }
        const decryptFaskes = decryptBPJS(dataFaskes?.data?.response, keydecrypt);
        let faskesLabel = decryptFaskes?.faskes?.map((faskes) => {
            return {
                label: faskes.nama,
                value: faskes.nama,
                kode: faskes.kode
            }
        }) || []
        const tempres = {
            faskes: faskesLabel
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

const getPeserta = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {nik} = req.query
        const [bpjs, keydecrypt] = await createBpjsInstance();
        let tanggalData = formatDate(new Date())
        let peserta
        peserta = await bpjs.get(`/vclaim-rest/Peserta/nik/${nik}/tglSEP/${tanggalData}`)
        const decryptPeserta = decryptBPJS(peserta?.data?.response, keydecrypt);

        const tempres = {
            peserta: decryptPeserta?.peserta || null
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




export default {
    generateSignature,
    getHistoryBPJS,
    getProvinsi,
    getKabupaten,
    getKecamatan,
    getFaskes,
    getPeserta
};