import { statusBed } from "../sysadmin/sysadmin.queries"

export const panggilStatus = {
	belumPanggil: 1,
	sedangPanggil: 2,
	selesaiPanggil: 3
}


const qGetLoket = `
SELECT
    id,
    reportdisplay as label
FROM
    m_loket
`

const qGetLoketSisa = `
select 
	mj.id, 
	mj.prefix || ' (' || mj.reportdisplay || ')'  AS label,
	coalesce (t1.ispanggil,1) AS ispanggil, 
	coalesce (t1.jumlahantrean,0) AS jumlahantrean, 
	coalesce (t1.antreanterakhir,0) AS antreanterakhir 
from (
	SELECT 
	    id,
	    prefix || ' (' || mja.reportdisplay || ')'  AS label,
	    tal.ispanggil AS ispanggil,
	    count(tal.norec)::int AS jumlahantrean,
	    MAX(tal.noantrean) AS antreanterakhir
	FROM m_jenisantrean mja
	    LEFT JOIN t_antreanloket tal ON tal.objectjenisantreanfk = mja.id
	WHERE mja.statusenabled = true  
	    AND tal.tglinput > $1 AND tal.tglinput <= $2
	GROUP BY 
	    mja.id,
	    mja.prefix,
	    tal.ispanggil
)t1
right join m_jenisantrean mj on t1.id = mj.id;
`


const qGetLastPemanggilan = `
SELECT 
    tal.ispanggil AS ispanggil,
    mja.prefix AS prefix,
    tal.noantrean AS noantrean,
	ml.reportdisplay AS loket
FROM t_antreanloket tal
    LEFT JOIN m_jenisantrean mja ON tal.objectjenisantreanfk = mja.id
	LEFT JOIN m_loket ml ON tal.objectloketfk = ml.id
WHERE tal.statusenabled = true  
    AND tal.tglinput > $1 AND tal.tglinput <= $2
	AND tal.tglpanggil IS NOT NULL
	AND (
		tal.ispanggil = ${panggilStatus.sedangPanggil}
		OR tal.ispanggil = ${panggilStatus.selesaiPanggil}
		)
ORDER BY tal.tglpanggil DESC
`

const qGetAllLoket = `
SELECT
	id AS value,
	reportdisplay as label
FROM
	m_loket
`

const qGetLastPemanggilanLoket = `
SELECT
    tal.ispanggil AS ispanggil,
    mja.prefix AS prefix,
    tal.noantrean AS noantrean
FROM t_antreanloket tal
    LEFT JOIN m_jenisantrean mja ON tal.objectjenisantreanfk = mja.id
WHERE 
	tal.statusenabled = true
	AND tal.objectloketfk = $1
	AND tal.tglinput > $2 AND tal.tglinput <= $3
	AND (
		tal.ispanggil = ${panggilStatus.sedangPanggil} 
		OR tal.ispanggil = ${panggilStatus.selesaiPanggil}
	)
	AND tal.tglpanggilviewer IS NOT NULL
ORDER BY tal.tglpanggilviewer DESC
`

const qGetLastPemanggilanAll = `
SELECT
	tal.norec AS norec,
    tal.ispanggil AS ispanggil,
    mja.prefix AS prefix,
    tal.noantrean AS noantrean,
	ml.reportdisplay AS loket
FROM t_antreanloket tal
    LEFT JOIN m_jenisantrean mja ON tal.objectjenisantreanfk = mja.id
	LEFT JOIN m_loket ml ON tal.objectloketfk = ml.id
WHERE 
	tal.statusenabled = true
	AND tal.tglinput > $1 AND tal.tglinput <= $2
	AND tal.ispanggil = $3
ORDER BY tal.tglpanggil ASC
`

const qGetLastPemanggilanViewer = `
SELECT
	tal.norec AS norec,
    tal.ispanggil AS ispanggil,
    mja.prefix AS prefix,
    tal.noantrean AS noantrean,
	ml.reportdisplay AS loket
FROM t_antreanloket tal
    LEFT JOIN m_jenisantrean mja ON tal.objectjenisantreanfk = mja.id
	LEFT JOIN m_loket ml ON tal.objectloketfk = ml.id
WHERE 
	tal.statusenabled = true
	AND tal.tglinput > $1 AND tal.tglinput <= $2
	AND tal.tglpanggilviewer IS NOT NULL
ORDER BY tal.tglpanggilviewer DESC
`

const qGetAllTerpanggil = `
SELECT
	tal.norec AS value,
	tal.ispanggil AS ispanggil,
	mja.prefix AS prefix,
	tal.noantrean AS noantrean,
	ml.reportdisplay AS loket
FROM t_antreanloket tal
	LEFT JOIN m_jenisantrean mja ON tal.objectjenisantreanfk = mja.id
	LEFT JOIN m_loket ml ON tal.objectloketfk = ml.id
WHERE 
	tal.statusenabled = true
	AND tal.tglinput > $1 AND tal.tglinput <= $2
	AND (
		tal.ispanggil = ${panggilStatus.selesaiPanggil}
		OR tal.ispanggil = ${panggilStatus.sedangPanggil})
	AND tal.objectloketfk = $3
ORDER BY tal.tglpanggil DESC
`

const jadwalDokter = `
SELECT
	mjd.id AS idjadwal,
	mjd.jam_mulai,
	mjd.jam_selesai,
	mjd.objectunitfk,
	mjd.objectkamarfk,
	mk.namakamar,
	mjd.objectpegawaifk,
	mp.namaexternal AS namadokter,
	mu.namaunit AS namaunit
FROM m_jadwaldokter mjd
	LEFT JOIN m_kamar mk ON mjd.objectkamarfk = mk.id
	LEFT JOIN m_pegawai mp ON mjd.objectpegawaifk = mp.id
	LEFT JOIN m_unit mu ON mjd.objectunitfk = mu.id
`

const qGetJadwalDokter = jadwalDokter +  `
WHERE mjd.objectharifk = $1
ORDER BY mk.id ASC
`

const qGetJadwalDokterNorec = jadwalDokter + `
WHERE mjd.objectpegawaifk = $1
ORDER BY mk.id ASC
`


const qGetLastAntrean =  `
SELECT
	tap.norec AS norecap,
	tap.noantrian AS noantrian,
	mpeg.namaexternal AS namadokter,
	mpeg.id AS objectdokterpemeriksafk,
	mpeg.reportdisplay AS reportdisplay,
	tap.tgldipanggildokter AS tgldipanggildokter,
	tap.objectstatuspanggilfk AS objectstatuspanggilfk
FROM t_antreanpemeriksaan tap
	LEFT JOIN m_pegawai mpeg ON tap.objectdokterpemeriksafk = mpeg.id
WHERE 
	CASE 
		WHEN (NULLIF($1, '')::int IS NULL)
		THEN TRUE
		ELSE tap.objectdokterpemeriksafk = NULLIF($1, '')::int
	END
	AND tap.tgldipanggildokter > $2 AND tap.tgldipanggildokter < $3
	AND tap.statusenabled = TRUE
	AND 
		CASE 
			WHEN (NULLIF($4, '')::int IS NULL)
			THEN TRUE
			ELSE tap.objectstatuspanggilfk = NULLIF($4, '')::int
		END
ORDER BY 
	tap.tgldipanggildokter DESC
`

const qGetDaftarOperasi = `
SELECT
	too.norec AS norecoperasi,
	too.nomororder AS nomororder,
	too.tglrencana AS tglrencana,
	mpeg.namaexternal AS namadokter,
	ms.reportdisplay AS spesialisasi
FROM t_orderoperasi too
	LEFT JOIN m_pegawai mpeg ON too.objectdokteroperatorfk = mpeg.id
	LEFT JOIN m_spesialisasi ms ON mpeg.objectspesialisasifk = ms.id
WHERE too.statusenabled = true
	AND too.tglrencana IS NOT NULL
	AND	too.tglrencana > $1
ORDER BY too.tglrencana ASC
`

const qGetKamarTempatTidur = `
SELECT
	mk.id AS kamarid,
	mk.reportdisplay AS namakamar,
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
		ORDER BY mk.reportdisplay ASC, mt.nomorbed ASC
	) AS tempattidur
FROM m_kelas mkel
	LEFT JOIN m_kamar mk ON mkel.id = mk.objectkelasfk
	LEFT JOIN m_tempattidur mt ON mk.id = mt.objectkamarfk
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
	mk.id,
	mk.reportdisplay
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
    qGetLoket,
    qGetLoketSisa,
    qGetLastPemanggilan,
	qGetAllLoket,
    qGetLastPemanggilanLoket,
	qGetLastPemanggilanAll,
	qGetAllTerpanggil,
	qGetLastPemanggilanViewer,
	qGetJadwalDokter,
	qGetLastAntrean,
	qGetJadwalDokterNorec,
	qGetDaftarOperasi,
	qGetKamarTempatTidur,
	qGetKelasTempatTidur
}