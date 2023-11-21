export const daftarUnit = {
    UNIT_FARMASI: 14,
    GUDANG_FARMASI: 16
}

const getAll =
`
SELECT 
    id as value, 
    namaunit as label, 
    objectinstalasifk 
FROM m_unit 
    WHERE statusenabled = true
`;

const getRawatInap =
    `SELECT 
    id as value, 
    namaunit as label, 
    objectinstalasifk 
        FROM 
        m_unit  
            WHERE 
            statusenabled = true
            and objectinstalasifk = 2`
            ;

const getPoliklinik = 
`SELECT 
    id as value, 
    namaunit as label, 
    objectinstalasifk 
FROM m_unit  
WHERE 
    statusenabled = true
    and objectinstalasifk = 1`
            ;

const qGetUnitUser = `
SELECT 
    mu.id as value, 
    mu.namaunit as label, 
    mu.objectinstalasifk AS objectinstalasifk
FROM m_unit mu
    LEFT JOIN m_mapusertounit mmap ON mmap.objectunitfk = mu.id
WHERE mu.statusenabled = true AND (
    mmap.objectuserfk = $1 
    OR $1 = ${daftarUnit.GUDANG_FARMASI} --- kalau gudang farmasi beri akses semua
)
`

export default {
    getAll,
    getRawatInap,
    getPoliklinik,
    qGetUnitUser
};