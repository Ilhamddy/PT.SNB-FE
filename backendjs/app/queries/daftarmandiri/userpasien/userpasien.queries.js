



const qGetRiwayatRegistrasi = `
SELECT
    tro.norec AS norec,
    tro.nocmfk AS nocmfk,
    tro.objectunitfk AS unit,
    tro.objectdokterfk AS dokter,
    tro.tglrencana AS tglrencana,
    tro.noreservasi AS noreservasi,
    mp.namalengkap AS namadokter,
    mu.namaunit AS namaunit,
    tro.tglinput AS tglinput
FROM users_pasien up
    LEFT JOIN m_pasien mpas ON (up.norm = mpas.nocm OR up.norm = mpas.nocmtemp)
    LEFT JOIN t_registrasionline tro ON tro.nocmfk = mpas.id
    LEFT JOIN m_unit mu ON tro.objectunitfk = mu.id
    LEFT JOIN m_pegawai mp ON tro.objectdokterfk = mp.id
WHERE up.id = $1 AND (tro.tglrencana >= $2 AND tro.tglrencana < $3)
    AND tro.statusenabled = true
ORDER BY tro.tglrencana DESC
`

export default {
    qGetRiwayatRegistrasi
}