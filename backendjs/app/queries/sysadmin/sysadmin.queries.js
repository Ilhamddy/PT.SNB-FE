export const statusBed = {
    ISI: 1,
    KOSONG: 2,
    ADMINISTRASI: 3,
    TIDAK_TERPAKAI: 4,
    DIBERSIHKAN: 5,
    RUSAK: 6,
}


const qGetTempatTidur = `
SELECT 
    COUNT(*) as total
FROM 
    m_tempattidur mt 
WHERE statusenabled =true
    AND objectstatusbedfk = $1`;

const qGetUnitTempatTidur = `
SELECT
	mu.id AS idunit,
	mu.namaunit AS namaunit,
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
			'kamarid', mk.id,
			'namakamar', mk.reportdisplay,
			'kelas', mkel.namakelas,
			'kelasid', mkel.id,
			'nobed', mt.nomorbed,
			'status', mt.objectstatusbedfk,
			'namastatus', msb.statusbed
		)
		ORDER BY mk.reportdisplay ASC, mt.nomorbed ASC
	) AS tempattidur
FROM m_tempattidur mt
	LEFT JOIN m_kamar mk ON mt.objectkamarfk = mk.id
	LEFT JOIN m_kelas mkel ON mk.objectkelasfk = mkel.id
	LEFT JOIN m_unit mu ON mk.objectunitfk = mu.id
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
	mu.id,
	mu.namaunit
`

const qGetAllUnit = `
SELECT
	mu.id AS idunit,
	mu.kdprofile AS kdprofile,
	mu.statusenabled AS statusenabled,
	mu.kodeexternal AS kodeexternal,
	mu.namaexternal AS namaexternal,
	mu.reportdisplay AS reportdisplay,
	mu.objectinstalasifk AS objectinstalasifk,
	mi.namainstalasi AS namainstalasi,
	mu.namaunit AS namaunit
FROM m_unit mu
	LEFT JOIN m_instalasi mi ON mu.objectinstalasifk = mi.id
WHERE 
	CASE
		WHEN (NULLIF($1, '')::int IS NULL)
		THEN TRUE
		ELSE mu.objectinstalasifk = NULLIF($1, '')::int
	END
ORDER BY mu.id ASC
`

const qGetAllKamar = `
SELECT
	mk.id AS idkamar,
	mk.kdprofile AS kdprofile,
	mk.statusenabled AS statusenabled,
	mk.kodeexternal AS kodeexternal,
	mk.namaexternal AS namaexternal,
	mk.reportdisplay AS reportdisplay,
	mk.objectkelasfk AS objectkelasfk,
	mkel.namakelas AS namakelas,
	mk.objectunitfk AS objectunitfk,
	mu.namaunit AS namaunit,
	mk.namakamar AS namakamar,
	mk.qtybed AS qtybed,
	mk.jumlahbedisi AS jumlahbedisi,
	mk.jumlahbedkosong AS jumlahbedkosong,
	mk.keterangan AS keterangan,
	mk.objectprodukfk AS objectprodukfk,
	mk.objectruangperawatankemenkesfk AS objectruangperawatankemenkesfk,
	mk.tglupdate AS tglupdate,
	mk.produkfk AS produkfk
FROM m_kamar mk
	LEFT JOIN m_kelas mkel ON mk.objectkelasfk = mkel.id
	LEFT JOIN m_unit mu ON mk.objectunitfk = mu.id
WHERE 
	true 
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
	AND 
		CASE
			WHEN $3 = ''
			THEN TRUE
			ELSE mk.namakamar ILIKE '%' || $3 || '%'
		END
ORDER BY mk.id ASC
			
`

export {
    qGetTempatTidur,
    qGetUnitTempatTidur,
	qGetAllUnit,
	qGetAllKamar
}