const getAll =
    `
SELECT 
    id as value, 
    namakelas as label, 
    kelas_bpjs 
FROM m_kelas 
WHERE statusenabled=true`;

const getKelasMap = `SELECT mk.id as value, 
mk.namakelas as label, 
mk.kelas_bpjs,mu.reportdisplay, mk.reportdisplay,mu.id as valueunit FROM (
SELECT objectkelasfk, objectunitfk FROM m_kamar 
GROUP BY objectkelasfk, objectunitfk
) aa
JOIN m_kelas mk ON aa.objectkelasfk = mk.id
JOIN m_unit mu ON aa.objectunitfk = mu.id
WHERE mk.statusenabled=true
`

export default {
    getAll,
    getKelasMap
};