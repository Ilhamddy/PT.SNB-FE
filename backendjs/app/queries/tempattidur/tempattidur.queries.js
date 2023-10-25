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

export {
    qGetTempatTidur,
    qGetUnitTempatTidur
}