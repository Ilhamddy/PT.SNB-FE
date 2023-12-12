


const qGetDaftarPasienLama = `
SELECT
    mp.id AS nocmfk,
    mp.nocm AS nocm,
    mp.nocmtemp AS nocmtemp,
    mp.namapasien AS namapasien,
    mp.tgldaftar AS tgldaftar,
    mp.email AS email
FROM users_pasien up
    LEFT JOIN m_pasien mp 
        ON (
            mp.nocm = up.norm 
            OR mp.nocmtemp = up.norm
            OR mp.id = up.objectpasienfk
        )
WHERE up.id = $1
`


const qGetDokter = `
SELECT
    mp.id AS iddokter,
    mp.namaexternal AS namadokter,
    mp.nip AS nip,
    mp.objectunitfk AS idunit,
    mu.namaunit AS namaunit
FROM m_pegawai mp
    LEFT JOIN m_unit mu ON mu.id = mp.objectunitfk
WHERE mp.statusenabled = true
    AND mp.id = $1
`

const qGetPenjamin = `
SELECT
    mr.id AS idpenjamin,
    mr.namarekanan AS namapenjamin
FROM m_rekanan mr
WHERE mr.id = $1
`

const qGetPoliklinik = `
SELECT
    mu.id AS idunit,
    mu.namaunit AS namaunit
FROM m_unit mu
WHERE mu.id = $1
`


export {
    qGetDokter,
    qGetDaftarPasienLama,
    qGetPenjamin,
    qGetPoliklinik
}