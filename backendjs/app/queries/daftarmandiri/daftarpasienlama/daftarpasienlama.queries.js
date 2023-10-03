


const qGetDaftarPasienLama = `
SELECT
    mp.nocm AS nocm,
    mp.namapasien AS namapasien
FROM users_pasien up
    LEFT JOIN m_pasien mp ON mp.nocm = up.norm
WHERE up.id = $1
`



const qGetDokter = `
SELECT
    mp.id AS iddokter,
    mp.namaexternal AS namadokter,
    mp.nippns AS nippns,
    mp.objectunitfk AS idunit,
    mu.namaunit AS namaunit
FROM m_pegawai mp
    LEFT JOIN m_unit mu ON mu.id = mp.objectunitfk
WHERE mp.statusenabled = true
    AND mp.id = $1
`


export {
    qGetDokter,
    qGetDaftarPasienLama
}