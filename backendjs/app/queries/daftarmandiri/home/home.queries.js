

const qGetJadwalDokter = `
SELECT
    mj.objectpegawaifk AS dokterid,
    mp.namalengkap AS doktername,
    mh.reportdisplay AS hari,
    mh.id AS hariid,
    ms.reportdisplay AS spesialisasi,
    mup.namaunit AS unitdokter,
    json_agg(
        json_build_object(
            'id', mj.id,
            'jam_mulai', mj.jam_mulai,
            'jam_selesai', mj.jam_selesai,
            'objectstatushadirfk', mj.objectstatushadirfk,
            'unitid', mj.objectunitfk,
            'namaunit', mu.namaunit
        )
    ) AS jadwal
FROM m_jadwaldokter AS mj
    LEFT JOIN m_pegawai mp ON mp.id = mj.objectpegawaifk
    LEFT JOIN m_unit mu ON mu.id = mj.objectunitfk
    LEFT JOIN m_hari mh ON mh.id = mj.objectharifk
    LEFT JOIN m_spesialisasi ms ON ms.id = mp.objectspesialisasifk
    LEFT JOIN m_unit mup ON mup.id = mj.objectunitfk
WHERE
    mj.statusenabled = true
    AND ($1 = -1 OR mu.id = $1)
    AND ($2 = -1 OR mj.objectharifk = $2)
    AND ($3 = -1 OR mp.id = $3)
GROUP BY 
    mj.objectpegawaifk,
    mp.namalengkap,
    mh.reportdisplay,
    mh.id,
    ms.reportdisplay,
    mup.namaunit
ORDER BY
    mh.id ASC
`

const qGetBerita = `
SELECT 
    norec,
    gambar,
    judul,
    isi,
    tglposting,
    tglawal,
    tglakhir
FROM t_berita
`

const qGetBeritaHome = qGetBerita + `
WHERE statusenabled = true
    AND now() BETWEEN tglawal AND tglakhir
`

const qGetBeritaNorec = qGetBerita + `
WHERE statusenabled = true AND norec = $1
`

export {
    qGetJadwalDokter,
    qGetBeritaHome,
    qGetBeritaNorec
}