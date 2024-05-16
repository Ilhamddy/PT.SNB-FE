import { dateBetweenEmptyString } from "../../../utils/dbutils";

const getAll = `
SELECT 
    id as value, 
    namalengkap as label, 
    objectunitfk AS unit,
    reportdisplay 
FROM 
    m_pegawai;
`

const getAllDokter = `
SELECT 
    id as value, 
    namalengkap as label, 
    objectunitfk AS unit,
    reportdisplay 
FROM 
    m_pegawai 
WHERE objectprofesipegawaifk in (1,4,5,6)`;


const getAllNipUnit = `
SELECT 
    id AS value, 
    namalengkap AS label, 
    nip AS nip,
    objectunitfk AS unit,
    reportdisplay 
FROM 
    m_pegawai 
WHERE statusenabled = true`;


const getDokter = `
SELECT 
    id as value, 
    namalengkap as label, 
    reportdisplay 
FROM 
    m_pegawai 
WHERE objectprofesipegawaifk=1
AND statusenabled = true
`

const getDokterNip = `
SELECT 
    id as value, 
    namalengkap as label, 
    reportdisplay,
    nip,
    noidentitas,
    ihs_id
FROM 
    m_pegawai 
WHERE objectprofesipegawaifk=1
AND statusenabled = true order by id asc
`



export default {
    getAll,
    getAllDokter,
    getDokter,
    getDokterNip,
    getAllNipUnit
};