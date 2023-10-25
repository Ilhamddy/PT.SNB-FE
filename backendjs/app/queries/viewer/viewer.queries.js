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
	AND tap.statusenabled = true
	AND 
		CASE 
			WHEN (NULLIF($4, '')::int IS NULL)
			THEN TRUE
			ELSE tap.objectstatuspanggilfk = NULLIF($4, '')::int
		END
ORDER BY 
	tap.tgldipanggildokter DESC
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
}