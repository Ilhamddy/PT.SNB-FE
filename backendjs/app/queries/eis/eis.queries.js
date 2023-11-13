import { daftarInstalasi } from "../master/instalasi/instalasi.queries"
import { daftarRekanan } from "../master/rekanan/rekanan.queries"
import { daftarStatusPulang } from "../master/statuspulang/statuspulang.queries"
import { statusBed } from "../sysadmin/sysadmin.queries"

const qGetPasienObj = `
SELECT
    tdp.objectinstalasifk AS instalasi,
    mi.namainstalasi AS namainstalasi,
    mp.namapasien AS namapasien,
    mp.nocm AS nocm,
    tdp.noregistrasi AS noregistrasi,
    mr.namarekanan AS namarekanan,
    tdp.tglregistrasi AS tglregistrasi
`

const qGetPasienTerdaftar = qGetPasienObj + `
FROM t_daftarpasien tdp
    LEFT JOIN m_instalasi mi ON mi.id = tdp.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE tdp.statusenabled = true
    AND 
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi >= $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi <= $2::TIMESTAMP
        END
    AND tdp.objectinstalasifk = $3
`

const qGetPasienPulangIGD = qGetPasienObj + `,
    tap.tglkeluar AS tglpulang
FROM t_daftarpasien tdp
    LEFT JOIN t_antreanpemeriksaan tap ON tap.objectdaftarpasienfk = tdp.norec
    LEFT JOIN m_instalasi mi ON mi.id = tdp.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE tdp.statusenabled = true
    AND 
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tap.tglkeluar >= $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tap.tglkeluar <= $2::TIMESTAMP
        END
    AND tdp.objectinstalasifk = ${daftarInstalasi.INSTALASI_GAWAT_DARURAT}
`

const qGetPasienRawatIGD = qGetPasienObj + `
FROM t_daftarpasien tdp
    LEFT JOIN m_instalasi mi ON mi.id = tdp.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE tdp.statusenabled = true
    AND 
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi > $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tdp.tglpulang < $2::TIMESTAMP
        END
    AND tdp.objectinstalasifk = ${daftarInstalasi.INSTALASI_GAWAT_DARURAT}
    AND tdp.objectstatuspulangfk = ${daftarStatusPulang.RAWAT}
`

const qGetPasienTerdaftarRanap = qGetPasienObj + `,
    tdp.tglpulang AS tglpulang,
    mk.reportdisplay AS namakamar,
    mk.id AS idkamar
FROM t_antreanpemeriksaan tap 
    LEFT JOIN m_kamar mk ON mk.id = tap.objectkamarfk
    LEFT JOIN m_unit mu ON mu.id = tap.objectunitfk
    LEFT JOIN m_instalasi mi ON mi.id = mu.objectinstalasifk
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE tdp.statusenabled = true
    AND 
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi >= $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi <= $2::TIMESTAMP
        END
    AND mi.id = ${daftarInstalasi.INSTALASI_RAWAT_INAP}
`

const qGetPasienPulangRanap = qGetPasienObj + `,
    tdp.tglpulang AS tglpulang,
    mk.reportdisplay AS namakamar,
    mk.id AS idkamar
FROM t_antreanpemeriksaan tap 
    LEFT JOIN m_kamar mk ON mk.id = tap.objectkamarfk
    LEFT JOIN m_unit mu ON mu.id = tap.objectunitfk
    LEFT JOIN m_instalasi mi ON mi.id = mu.objectinstalasifk
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE tdp.statusenabled = true
    AND 
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tdp.tglpulang >= $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tdp.tglpulang <= $2::TIMESTAMP
        END
    AND mi.id = ${daftarInstalasi.INSTALASI_RAWAT_INAP}
`

const qGetPasienMeninggalRanap = qGetPasienObj + `,
    tdp.tglpulang AS tglpulang,
    tdp.tglmeninggal AS tglmeninggal
FROM t_daftarpasien tdp
    LEFT JOIN m_instalasi mi ON mi.id = tdp.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE tdp.statusenabled = true
    AND 
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tdp.tglmeninggal >= $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tdp.tglmeninggal <= $2::TIMESTAMP
        END
    AND tdp.objectinstalasifk = ${daftarInstalasi.INSTALASI_RAWAT_INAP}
`



const qGetPasienBatal = `
SELECT
    tdp.objectinstalasifk AS instalasi,
    mi.namainstalasi AS namainstalasi,
    mp.namapasien AS namapasien,
    mp.nocm AS nocm,
    tdp.noregistrasi AS noregistrasi,
    mr.namarekanan AS namarekanan,
    tdp.tglregistrasi AS tglregistrasi
FROM t_batalpasien tbp
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tbp.objectdaftarpasienfk
    LEFT JOIN m_instalasi mi ON mi.id = tdp.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE TRUE
    AND 
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tbp.tglbatal >= $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tbp.tglbatal <= $2::TIMESTAMP
        END
    AND tdp.objectinstalasifk = $3
`

const qCountCaraBayar = `
SELECT 
    COUNT(*)::INT AS count
FROM t_daftarpasien tdp
WHERE 
    (
        tdp.objectpenjaminfk = $3
        OR tdp.objectpenjamin2fk = $3
        OR tdp.objectpenjamin3fk = $3
    )
    AND 
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi >= $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi <= $2::TIMESTAMP
        END
`

const qCountNonBPJS = `
SELECT 
    COUNT(*)::INT AS count
FROM t_daftarpasien tdp
WHERE 
    (
        (
            tdp.objectpenjaminfk != 
                ANY(ARRAY[
                    ${daftarRekanan.BPJSKESEHATAN}, 
                    ${daftarRekanan.UMUMPRIBADI}
                ])
            AND 
                tdp.objectpenjaminfk IS NOT NULL
        )
        OR 
        (
            tdp.objectpenjamin2fk != 
                ANY(ARRAY[
                    ${daftarRekanan.BPJSKESEHATAN}, 
                    ${daftarRekanan.UMUMPRIBADI}
                ])
            AND 
                tdp.objectpenjaminfk IS NOT NULL
        )
        OR 
        (
            tdp.objectpenjamin3fk != 
                ANY(ARRAY[
                    ${daftarRekanan.BPJSKESEHATAN}, 
                    ${daftarRekanan.UMUMPRIBADI}
                ])
            AND 
                tdp.objectpenjaminfk IS NOT NULL
        )
    )
    AND 
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi >= $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi <= $2::TIMESTAMP
        END
`

const qGetKunjunganPoliklinik = qGetPasienObj + `,
    mu.namaunit,
    mu.id AS idunit
FROM m_unit mu
    LEFT JOIN t_antreanpemeriksaan tap ON tap.objectunitfk = mu.id
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_instalasi mi ON mi.id = tdp.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE
    mu.objectinstalasifk = ${daftarInstalasi.INSTALASI_RAWAT_JALAN}
    AND
        CASE WHEN NULLIF($1, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi >= $1::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF($2, '') IS NULL
            THEN TRUE
            ELSE tdp.tglregistrasi <= $2::TIMESTAMP
        END
`

const qGetTempatTidur = `
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
	count(mt.objectstatusbedfk)::int as totalbed
FROM m_tempattidur mt
	LEFT JOIN m_kamar mk ON mt.objectkamarfk = mk.id
	LEFT JOIN m_kelas mkel ON mk.objectkelasfk = mkel.id
	LEFT JOIN m_statusbed msb ON mt.objectstatusbedfk = msb.id
WHERE mt.statusenabled = true
GROUP BY
	mk.id,
	mk.namakamar
`

const qGetCountUnit = `
SELECT
    count(
        CASE 
            mu.objectinstalasifk WHEN ${daftarInstalasi.INSTALASI_RAWAT_INAP} 
                THEN 1 
            ELSE null 
        END
    )::INT as pasienranap,
    count(
        CASE 
            mu.objectinstalasifk WHEN ${daftarInstalasi.INSTALASI_RAWAT_JALAN} 
                THEN 1 
            ELSE null 
        END
    )::INT as pasienrajal,
    count(
        CASE 
            mu.objectinstalasifk WHEN ${daftarInstalasi.INSTALASI_GAWAT_DARURAT} 
                THEN 1 
            ELSE null 
        END
    )::INT as pasienigd,
    count(
        CASE 
            mu.objectinstalasifk WHEN ${daftarInstalasi.INSTALASI_LABORATORIUM} 
                THEN 1 
            ELSE null 
        END
    )::INT as pasienlaboratorium,
    count(
        CASE 
            mu.objectinstalasifk WHEN ${daftarInstalasi.INSTALASI_RADIOLOGI} 
                THEN 1 
            ELSE null 
        END
    )::INT as pasienradiologi
FROM t_antreanpemeriksaan tap
    LEFT JOIN m_unit mu ON mu.id = tap.objectunitfk
WHERE tap.statusenabled = true
    AND tap.tglkeluar IS NULL
`

const qGetCountStatus = `
SELECT
    msp.reportdisplay AS label,
    msp.id AS value,
    COUNT(mp.id)::INT AS jumlah
FROM m_statuspegawai msp
    LEFT JOIN m_pegawai mp ON mp.objectstatuspegawaifk = msp.id
WHERE msp.statusenabled = true
GROUP BY
    msp.reportdisplay,
    msp.id
`

const qGetCountJenisKelamin = `
SELECT
    mjk.reportdisplay AS label,
    mjk.id AS value,
    COUNT(mp.id)::INT AS jumlah
FROM m_jeniskelamin mjk
    LEFT JOIN m_pegawai mp ON mp.objectjeniskelaminfk = mjk.id
WHERE mjk.statusenabled = true
GROUP BY
    mjk.reportdisplay,
    mjk.id
`



export {
    qGetPasienTerdaftar,
    qGetPasienTerdaftarRanap,
    qGetPasienBatal,
    qGetPasienPulangIGD,
    qGetPasienRawatIGD,
    qGetPasienPulangRanap,
    qGetPasienMeninggalRanap,
    qCountCaraBayar,
    qCountNonBPJS,
    qGetKunjunganPoliklinik,
    qGetTempatTidur,
    qGetCountUnit,
    qGetCountStatus,
    qGetCountJenisKelamin
}