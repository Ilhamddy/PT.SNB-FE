import { statusBed } from "../../sysadmin/sysadmin.queries"


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

const qGetCutiDokter = `
SELECT
    mp.namalengkap AS namadokter,
    tl.tgllibur AS tgllibur,
    tl.alasan AS alasan
FROM m_pegawai mp
    LEFT JOIN t_liburpegawai tl ON (
        tl.statusenabled = true
        AND (
            tl.objectunitfk = mp.objectunitfk
            OR tl.objectpegawaifk = mp.id
            OR (
                tl.objectunitfk IS NULL
                AND tl.objectpegawaifk IS NULL
            )
        )
    )
WHERE
    mp.id = $1
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

const qGetKelasTempatTidur = `
SELECT
	mkel.id AS kelasid,
	mkel.namakelas AS namakelas,
	count(
		CASE 
			mt.objectstatusbedfk WHEN ${statusBed.ISI} 
				THEN 1 
			ELSE null 
		END
	)::int as totalisi,
	count(
		CASE 
			mt.objectstatusbedfk WHEN ${statusBed.KOSONG} 
				THEN 1 
			ELSE null 
		END
	)::int as totalkosong,
	count(
		CASE 
			mt.objectstatusbedfk WHEN ${statusBed.RUSAK} 
				THEN 1 
			ELSE null 
		END
	)::int as totalrusak,
	count(mt.objectstatusbedfk)::int as totalbed,
	json_agg(
		json_build_object(
			'id', mt.id,
			'namatt', mt.reportdisplay,
			'kelas', mkel.namakelas,
			'kelasid', mkel.id,
			'nobed', mt.nomorbed,
			'status', mt.objectstatusbedfk,
			'namastatus', msb.statusbed
		)
		ORDER BY mkel.namakelas ASC, mt.nomorbed ASC
	) AS tempattidur
FROM m_tempattidur mt
	LEFT JOIN m_kamar mk ON mt.objectkamarfk = mk.id
	LEFT JOIN m_kelas mkel ON mk.objectkelasfk = mkel.id
	LEFT JOIN m_statusbed msb ON mt.objectstatusbedfk = msb.id
WHERE mt.statusenabled = true
	AND
		CASE 
			WHEN (NULLIF($1, '')::int IS NULL)
			THEN TRUE
			ELSE mk.objectunitfk = NULLIF($1, '')::int
		END
	AND
		CASE 
			WHEN (NULLIF($2, '')::int IS NULL)
			THEN TRUE
			ELSE mk.objectkelasfk = NULLIF($2, '')::int
		END
GROUP BY
	mkel.id,
	mkel.namakelas
`

export {
    qGetJadwalDokter,
    qGetBeritaHome,
    qGetBeritaNorec,
    qGetCutiDokter,
    qGetKelasTempatTidur
}