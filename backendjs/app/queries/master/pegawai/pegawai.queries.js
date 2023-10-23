const getAll = `
SELECT 
    id as value, 
    namalengkap as label, 
    reportdisplay 
FROM 
    m_pegawai 
WHERE objectprofesipegawaifk=1`;

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
    getDokterNip
};