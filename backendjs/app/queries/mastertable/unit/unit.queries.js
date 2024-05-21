export const daftarUnit = {
    UNIT_FARMASI: 14,
    GUDANG_FARMASI: 16,
    LABORATORIUM_ANATOMI: 30,
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

const getAllUnitIhs =
`SELECT 
mu.id as value, 
mu.namaunit as label,
mu.namaunit || ', ' || mi.namainstalasi as description, 
mu.objectinstalasifk,
mi.ihs_id as ihs_instalasi,
mu.ihs_id
FROM m_unit mu
left join m_instalasi mi on mi.id=mu.objectinstalasifk 
WHERE mu.statusenabled = true order by mu.id asc`;

export default {
    getAll,
    getRawatInap,
    getPoliklinik,
    qGetUnitUser,
    getAllUnitIhs,
    daftarUnit
};