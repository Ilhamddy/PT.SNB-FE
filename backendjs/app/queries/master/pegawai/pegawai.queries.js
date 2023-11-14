import { dateBetweenEmptyString } from "../../../utils/dbutils";

const getAll = `
SELECT 
    id as value, 
    namalengkap as label, 
    reportdisplay 
FROM 
    m_pegawai 
WHERE objectprofesipegawaifk=1`;


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
    nip
FROM 
    m_pegawai 
WHERE objectprofesipegawaifk=1
AND statusenabled = true
`



export default {
    getAll,
    getDokter,
    getDokterNip,
    getAllNipUnit
};