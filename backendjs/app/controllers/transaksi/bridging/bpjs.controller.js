
import pool from "../../../config/dbcon.query";
import * as uuid from 'uuid';
import db from "../../../models";
import LZString from 'lz-string';
import crypto from 'crypto';
import axios from "axios";
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

async function generateAuthHeaders () {


    const consumerId = "20886";
    const consumerSecret = "1xNE2DE971";
    const userKey = "8d3183f515075fb411aa5d036e65af05";

   
    // keep track of this timestamp, you will need it for the RequestInfo Object
    const timestamp   = Math.floor(Date.now() / 1000)
    const variable = consumerId + "&" + timestamp.toString();

    const hash = crypto.createHmac('sha256', consumerSecret)
                    .update(variable)
                    .digest('base64')
    
    const headers = {
        'X-cons-id': consumerId,
        'X-timestamp': timestamp,
        'X-signature': hash,
        'user-key': userKey
    };

    let keyDecrypt = consumerId + consumerSecret + timestamp.toString();

    return [headers, keyDecrypt];
};


const createBpjsInstance = async () => {
    const [header, keydecrypt] = await generateAuthHeaders();
    const instance = axios.create({
        baseURL: 'https://apijkn.bpjs-kesehatan.go.id',
        timeout: 25000,
        headers: header
    });
    axios.create({
        baseURL: 'https://apijkn.bpjs-kesehatan.go.id',
    });
    return [instance, keydecrypt];
}


function decrypt(message, key) {
    // const iv = Buffer.from(key.substring(0,16), 'hex');
    if(message === null || message === undefined) return "null";
    let hash = crypto.createHash('sha256');
    const keyhash = hash
        .update(new TextEncoder().encode(key))
        .digest();

    let decipher = crypto.createDecipheriv(algorithm, keyhash.subarray(0, 32), keyhash.subarray(0,16));
    let decrypted = decipher.update(message, 'base64', 'utf-8');
    decrypted += decipher.final('utf8');

    const decompress = LZString.decompressFromEncodedURIComponent(decrypted);
    return decompress;
}



async function getHistoryBPJS(req, res) {
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
        res.status(400).send({
            message: "Nokartu tidak boleh kosong",
            status: "error",
            success: false
        })
        return;
    }
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


    const decryptDataHistori = JSON.parse(decrypt(dataHistori?.data?.response, keydecrypt));
    const decryptDataBpjs = JSON.parse(decrypt(dataBpjs?.data?.response, keydecrypt));
    const decryptDataSPR = JSON.parse(decrypt(dataSPR?.data?.response, keydecrypt));
    const decryptRujukanKlinik = JSON.parse(decrypt(dataRujukanKlinik?.data?.response, keydecrypt));
    const decryptRujukanRS = JSON.parse(decrypt(dataRujukanRS?.data?.response, keydecrypt));

    const tempres = {
        histori: decryptDataHistori,
        kepesertaan: decryptDataBpjs,
        spr: decryptDataSPR,
        rujukanklinik: decryptRujukanKlinik,
        rujukanrs: decryptRujukanRS
    }

    res.status(200).send({
        data: tempres,
        status: "success",
        success: true,
    });
}

async function getProvinsi(req, res){
    const [bpjs, keydecrypt] = await createBpjsInstance();
    let dataProvinsi = null
    try{
        dataProvinsi = await bpjs.get(`/vclaim-rest/referensi/propinsi`)
    }catch(e){
        console.error("error data provinsi")
        console.error(e)
    }
    const decryptDataProvinsi = JSON.parse(decrypt(dataProvinsi?.data?.response, keydecrypt));
    const tempres = {
        provinsi: decryptDataProvinsi
    }
    res.status(200).send({
        data: tempres,
        status: "success",
        success: true,
    });
}

async function getKabupaten(req, res){
    const [bpjs, keydecrypt] = await createBpjsInstance();
    let { provinsi } = req.params
    let dataKabupaten = null
    try{
        dataKabupaten = await bpjs.get(`/vclaim-rest/referensi/kabupaten/propinsi/${provinsi}`)
    }catch(e){
        console.error("error data kabupaten")
        console.error(e)
    }
    const decryptDataKabupaten = JSON.parse(decrypt(dataKabupaten?.data?.response, keydecrypt));
    const tempres = {
        kabupaten: decryptDataKabupaten
    }
    res.status(200).send({
        data: tempres,
        status: "success",
        success: true,
    });
}

async function getKecamatan(req, res){
    const [bpjs, keydecrypt] = await createBpjsInstance();
    let { kabupaten } = req.params
    let dataKecamatan = null
    try{
        dataKecamatan = await bpjs.get(`/vclaim-rest/referensi/kecamatan/kabupaten/${kabupaten.padStart(4, '0')}}`)
    }catch(e){
        console.error("error data kecamatan")
        console.error(e)
    }
    const decryptDataKecamatan = JSON.parse(decrypt(dataKecamatan?.data?.response, keydecrypt));
    const tempres = {
        kecamatan: decryptDataKecamatan
    }
    res.status(200).send({
        data: tempres,
        status: "success",
        success: true,
    });
}


async function getFaskes(req, res){
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
    const decryptFaskes = JSON.parse(decrypt(dataFaskes?.data?.response, keydecrypt));
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
        data: tempres,
        status: "success",
        success: true,
    });
}





export default {
    generateSignature,
    getHistoryBPJS,
    getProvinsi,
    getKabupaten,
    getKecamatan,
    getFaskes
};