
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
`

export {
    qGetLoket,
    qGetLoketSisa,
    qGetLastPemanggilan,
	qGetAllLoket,
    qGetLastPemanggilanLoket,
	qGetLastPemanggilanAll,
	qGetAllTerpanggil,
	qGetLastPemanggilanViewer
}