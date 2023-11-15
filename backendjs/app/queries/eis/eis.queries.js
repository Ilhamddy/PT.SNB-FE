import { dateBetweenEmptyString } from "../../utils/dbutils"
import { daftarInstalasi } from "../master/instalasi/instalasi.queries"
import { daftarRekanan } from "../master/rekanan/rekanan.queries"
import { daftarStatusPulang } from "../master/statuspulang/statuspulang.queries"
import { statusBed } from "../sysadmin/sysadmin.queries"

const CARA_BAYAR_VALUE = {
    SEMUA: 1,
    BPJS: 2,
    UMUM: 3,
    ASURANSI_LAIN: 4
}

const whereCaraBayar = (q1) =>  `
(
        NULLIF(${q1}, '')::INT IS NULL
    OR
        NULLIF(${q1}, '')::INT = ${CARA_BAYAR_VALUE.SEMUA}
    OR
        (
            NULLIF(${q1}, '')::INT = ${CARA_BAYAR_VALUE.BPJS}
            AND
            (
                tdp.objectpenjaminfk = ${daftarRekanan.BPJSKESEHATAN}
                OR tdp.objectpenjamin2fk = ${daftarRekanan.BPJSKESEHATAN}
                OR tdp.objectpenjamin3fk = ${daftarRekanan.BPJSKESEHATAN}
            )
        )
    OR
        (
            NULLIF(${q1}, '')::INT = ${CARA_BAYAR_VALUE.UMUM}
            AND
            (
                tdp.objectpenjaminfk = ${daftarRekanan.UMUMPRIBADI}
                OR tdp.objectpenjamin2fk = ${daftarRekanan.UMUMPRIBADI}
                OR tdp.objectpenjamin3fk = ${daftarRekanan.UMUMPRIBADI}
            )
        )
    OR
        (
            NULLIF(${q1}, '')::INT = ${CARA_BAYAR_VALUE.ASURANSI_LAIN}
            AND
            (
                (
                    tdp.objectpenjaminfk != ${daftarRekanan.BPJSKESEHATAN}
                    AND
                        tdp.objectpenjaminfk != ${daftarRekanan.UMUMPRIBADI}
                    AND 
                        tdp.objectpenjaminfk IS NOT NULL
                )
                OR 
                (
                    tdp.objectpenjamin2fk != ${daftarRekanan.BPJSKESEHATAN}
                    AND
                        tdp.objectpenjamin2fk != ${daftarRekanan.UMUMPRIBADI}
                    AND 
                        tdp.objectpenjamin2fk IS NOT NULL
                )
                OR 
                (
                    tdp.objectpenjamin3fk != ${daftarRekanan.BPJSKESEHATAN}
                    AND
                        tdp.objectpenjamin3fk != ${daftarRekanan.UMUMPRIBADI}
                    AND 
                        tdp.objectpenjamin3fk IS NOT NULL
                )
            )
        )
)
`

const qGetPasienObj = `
SELECT
    tdp.objectinstalasifk AS instalasi,
    mi.namainstalasi AS namainstalasi,
    mp.namapasien AS namapasien,
    mp.nocm AS nocm,
    tdp.noregistrasi AS noregistrasi,
    mr.namarekanan AS namarekanan,
    tdp.tglregistrasi AS tglregistrasi,
    mu.namaunit AS namaunit
`

const qGetPasienTerdaftar = qGetPasienObj + `
FROM t_antreanpemeriksaan tap
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_unit mu ON mu.id = tap.objectunitfk
    LEFT JOIN m_instalasi mi ON mi.id = mu.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE tdp.statusenabled = true
    AND
        ${dateBetweenEmptyString("tap.tglmasuk", "$1", "$2")}
    AND mi.id = $3
    AND ${whereCaraBayar("$4")}
`

const qGetPasienPulangIGD = qGetPasienObj + `,
    tap.tglkeluar AS tglpulang
FROM t_antreanpemeriksaan tap
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_unit mu ON mu.id = tap.objectunitfk
    LEFT JOIN m_instalasi mi ON mi.id = mu.objectinstalasifk
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
    AND ${whereCaraBayar("$3")}
`

const qGetPasienRawatIGD = qGetPasienObj + `
FROM t_antreanpemeriksaan tap
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_unit mu ON mu.id = tap.objectunitfk
    LEFT JOIN m_instalasi mi ON mi.id = mu.objectinstalasifk
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
    AND ${whereCaraBayar("$3")}
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
        ${dateBetweenEmptyString("tdp.tglregistrasi", "$1", "$2")}
    AND 
        mi.id = ${daftarInstalasi.INSTALASI_RAWAT_INAP}
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
        ${dateBetweenEmptyString("tdp.tglpulang", "$1", "$2")}
    AND 
        mi.id = ${daftarInstalasi.INSTALASI_RAWAT_INAP}
`

const qGetPasienMeninggalRanap = qGetPasienObj + `,
    tdp.tglpulang AS tglpulang,
    tdp.tglmeninggal AS tglmeninggal
FROM t_daftarpasien tdp
    LEFT JOIN m_unit mu ON mu.id = tdp.objectunitlastfk
    LEFT JOIN m_instalasi mi ON mi.id = tdp.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE tdp.statusenabled = true
    AND 
        ${dateBetweenEmptyString("tdp.tglmeninggal", "$1", "$2")}
    AND 
        tdp.objectinstalasifk = ${daftarInstalasi.INSTALASI_RAWAT_INAP}
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
        ${dateBetweenEmptyString("tbp.tglbatal", "$1", "$2")}
    AND tdp.objectinstalasifk = $3
`

const qCountCaraBayar = qGetPasienObj + `
FROM t_daftarpasien tdp
    LEFT JOIN m_unit mu ON mu.id = tdp.objectunitlastfk
    LEFT JOIN m_instalasi mi ON mi.id = mu.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE 
    (
        tdp.objectpenjaminfk = $3
        OR tdp.objectpenjamin2fk = $3
        OR tdp.objectpenjamin3fk = $3
    )
    AND 
        ${dateBetweenEmptyString("tdp.tglregistrasi", "$1", "$2")}
    AND ${whereCaraBayar("$4")}
`

const qCountNonBPJS = qGetPasienObj + `
FROM t_daftarpasien tdp
    LEFT JOIN m_unit mu ON mu.id = tdp.objectunitlastfk
    LEFT JOIN m_instalasi mi ON mi.id = mu.objectinstalasifk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_rekanan mr ON mr.id = tdp.objectpenjaminfk
WHERE 
    (
        (
            tdp.objectpenjaminfk != ${daftarRekanan.BPJSKESEHATAN}
            AND
                tdp.objectpenjaminfk != ${daftarRekanan.UMUMPRIBADI}
            AND 
                tdp.objectpenjaminfk IS NOT NULL
        )
        OR 
        (
            tdp.objectpenjamin2fk != ${daftarRekanan.BPJSKESEHATAN}
            AND
                tdp.objectpenjamin2fk != ${daftarRekanan.UMUMPRIBADI}
            AND 
                tdp.objectpenjamin2fk IS NOT NULL
        )
        OR 
        (
            tdp.objectpenjamin3fk != ${daftarRekanan.BPJSKESEHATAN}
            AND
                tdp.objectpenjamin3fk != ${daftarRekanan.UMUMPRIBADI}
            AND 
                tdp.objectpenjamin3fk IS NOT NULL
        )
    )
    AND 
        ${dateBetweenEmptyString("tdp.tglregistrasi", "$1", "$2")}
    AND ${whereCaraBayar("$3")}
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
    ${dateBetweenEmptyString("tdp.tglregistrasi", "$1", "$2")}
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

const qGetCountPegawai = `
SELECT
    COUNT(mp.id)::INT AS jumlah
FROM m_pegawai mp
WHERE mp.statusenabled = true
`

const qGetCountSpesialis = `
SELECT
    COUNT(mp.id)::INT AS jumlah
FROM m_pegawai mp
WHERE mp.statusenabled = true 
and mp.objectprofesipegawaifk = 1
`

const qGetCountDokterUmum = `
SELECT
    COUNT(mp.id)::INT AS jumlah
FROM m_pegawai mp
WHERE mp.statusenabled = true 
and mp.objectprofesipegawaifk = 4;
`

const qGetCountPerawatBidan = `
SELECT
    COUNT(mp.id)::INT AS jumlah
FROM m_pegawai mp
WHERE mp.statusenabled = true 
and mp.objectprofesipegawaifk in (2,3); 
`

const qGetCountPenunjangMedis = `
SELECT
    COUNT(mp.id)::INT AS jumlah
FROM m_pegawai mp
WHERE mp.statusenabled = true 
and mp.objectprofesipegawaifk in (13,14,15,16,17);
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

const qGetUsia = `
SELECT
    mp.tgllahir AS tgllahir,
    mjk.reportdisplay AS jeniskelamin
FROM m_pegawai mp 
    LEFT JOIN m_jeniskelamin mjk ON mp.objectjeniskelaminfk = mjk.id
WHERE mp.statusenabled = true
`

const qGetJabatan = `
SELECT
    mj.reportdisplay AS label,
    mj.id AS value,
    COUNT(mp.id)::INT AS jumlah
FROM m_jabatan mj
    LEFT JOIN m_pegawai mp ON mp.objectjabatanfk = mj.id
WHERE mj.statusenabled = true
GROUP BY
    mj.reportdisplay,
    mj.id
`

const qGetCountProfesi = `
SELECT
    mprof.reportdisplay AS label,
    mprof.id AS value,
    COUNT(mp.id)::INT AS jumlah
FROM m_profesipegawai mprof
    LEFT JOIN m_pegawai mp ON mp.objectprofesipegawaifk = mprof.id
WHERE mprof.statusenabled = true
GROUP BY
    mprof.reportdisplay,
    mprof.id
`

const qGetCountPendidikanTerakhir = `
SELECT
    mpend.reportdisplay AS label,
    mpend.id AS value,
    COUNT(mp.id)::INT AS jumlah
FROM m_pendidikan mpend
    LEFT JOIN m_pegawai mp ON mp.objectpendidikanterakhirfk = mpend.id
WHERE mpend.statusenabled = true
GROUP BY
    mpend.reportdisplay,
    mpend.id
`

const qGetCountSpesialisasi = `
SELECT
    ms.reportdisplay AS label,
    ms.id AS value,
    COUNT(mp.id)::INT AS jumlah
FROM m_spesialisasi ms
    LEFT JOIN m_pegawai mp ON mp.objectspesialisasifk = ms.id
WHERE ms.statusenabled = true
GROUP BY
    ms.reportdisplay,
    ms.id
`

const qGetPegawaiPensiun = `
SELECT
    mp.namalengkap AS namalengkap,
    mp.tgllahir AS tgllahir,
    mu.namaunit AS namaunit,
    mp.tglpensiun AS tglpensiun
FROM m_pegawai mp
    LEFT JOIN m_unit mu ON mu.id = mp.objectunitfk
WHERE mp.statusenabled = true
    AND mp.tglpensiun > $1
`

const qGetPegawaiSIP = `
SELECT
    mp.namalengkap AS namalengkap,
    mprof.reportdisplay AS profesi,
    mu.namaunit AS namaunit,
    mp.tglberakhirsip AS tglberakhirsip
FROM m_pegawai mp
    LEFT JOIN m_unit mu ON mu.id = mp.objectunitfk
    LEFT JOIN m_profesipegawai mprof ON mp.objectprofesipegawaifk = mprof.id
WHERE mp.statusenabled = true
    AND mp.tglpensiun > $1
`

const qGetPemesanan = `
SELECT
    tpb.norec AS norecorder,
    tpb.no_order AS noorder,
    tpb.tglorder AS tglorder,
    mr.namarekanan AS namasupplier,
    COUNT(tpbd.norec)::INT AS totalpesan,
    mu.namaunit AS namaunit
FROM t_pemesananbarang tpb
    LEFT JOIN m_unit mu ON mu.id = tpb.objectunitfk
    LEFT JOIN m_rekanan mr ON mr.id = tpb.objectrekananfk
    LEFT JOIN t_pemesananbarangdetail tpbd ON tpbd.objectpemesananbarangfk = tpb.norec
WHERE tpb.statusenabled = true
GROUP BY 
    tpb.norec,
    tpb.no_order,
    tpb.tglorder,
    mr.namarekanan,
    mu.namaunit
ORDER BY tpb.tglorder DESC
`

const qGetPenerimaan = `
SELECT
    tpb.norec AS norecpenerimaan,
    tpb.no_terima AS noterima,
    tpb.no_order AS noorder,
    tpb.tglorder AS tglorder,
    tpb.tglterima AS tglterima,
    mr.namarekanan AS namasupplier,
    COUNT(tpbd.norec)::INT AS totalpesan,
    mu.namaunit AS namaunit
FROM t_penerimaanbarang tpb
    LEFT JOIN m_unit mu ON mu.id = tpb.objectunitfk
    LEFT JOIN m_rekanan mr ON mr.id = tpb.objectrekananfk
    LEFT JOIN t_penerimaanbarangdetail tpbd ON tpbd.objectpenerimaanbarangfk = tpb.norec
WHERE tpb.statusenabled = true
GROUP BY 
    tpb.norec,
    tpb.no_order,
    tpb.tglorder,
    mr.namarekanan,
    mu.namaunit
ORDER BY tpb.tglorder DESC
`

const qGetRetur = `
SELECT
    trb.norec AS norecretur,
    trb.noretur AS noretur,
    tpb.no_terima AS noterima,
    trb.tglretur AS tglretur,
    tpb.tglterima AS tglterima,
    mr.namarekanan AS namasupplier,
    COUNT(trbd.norec)::INT AS totalpesan,
    mu.namaunit AS namaunit
FROM t_returbarang trb
    LEFT JOIN t_penerimaanbarang tpb ON tpb.norec = trb.objectpenerimaanbarangfk
    LEFT JOIN m_unit mu ON mu.id = tpb.objectunitfk
    LEFT JOIN m_rekanan mr ON mr.id = tpb.objectrekananfk
    LEFT JOIN t_returbarangdetail trbd ON trbd.objectreturbarangfk = trb.norec
WHERE tpb.statusenabled = true
GROUP BY 
    trb.norec,
    trb.noretur,
    tpb.no_terima,
    trb.tglretur,
    tpb.tglterima,
    mr.namarekanan,
    mu.namaunit
ORDER BY trb.tglretur DESC
`

const qGetSepuluhBesarObat = `
SELECT
    mp.id AS idproduk,
    mp.namaproduk AS namaproduk,
    COALESCE(SUM(CEIL(tvr.qty))::INT, 0) AS jumlahpenggunaan
FROM m_produk mp
    LEFT JOIN t_verifresep tvr ON (
        tvr.objectprodukfk = mp.id
    )
WHERE mp.isobat = true AND mp.statusenabled = true
GROUP BY
    mp.id,
    mp.namaproduk
ORDER BY
    COALESCE(SUM(CEIL(tvr.qty))::INT, 0) DESC
`

const qGetKartuStok = `
SELECT
    tks.norec AS noreckartustok,
    mp.namaproduk AS namaproduk,
    tks.tglinput AS tglinput,
    tks.saldoawal AS saldoawal,
    tks.masuk AS saldomasuk,
    tks.keluar AS saldokeluar,
    tks.saldoakhir AS saldoakhir,
    mu.namaunit AS namaunit
FROM t_kartustok tks
    LEFT JOIN m_produk mp ON mp.id = tks.objectprodukfk
    LEFT JOIN m_unit mu ON mu.id = tks.objectunitfk
WHERE tks.statusenabled = true
ORDER BY tks.tglinput DESC
LIMIT 120
`

const qGetProdukTerbanyak = `
SELECT
    mp.id AS idproduk,
    mp.namaproduk AS namaproduk,
    COALESCE(SUM(CEIL(tsu.qty))::INT, 0) AS jumlahproduk,
    ms.reportdisplay AS namasatuan
FROM m_produk mp
    LEFT JOIN t_stokunit tsu ON mp.id = tsu.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
WHERE (
        mp.isobat = true
        OR mp.isalkes = true
    ) 
    AND mp.statusenabled = true
GROUP BY
    mp.id,
    mp.namaproduk,
    ms.reportdisplay
ORDER BY
    COALESCE(SUM(CEIL(tsu.qty))::INT, 0) DESC
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
    qGetCountPegawai,
    qGetCountSpesialis,
    qGetCountDokterUmum,
    qGetCountPerawatBidan,
    qGetCountPenunjangMedis,
    qGetCountJenisKelamin,
    qGetUsia,
    qGetJabatan,
    qGetCountProfesi,
    qGetCountPendidikanTerakhir,
    qGetCountSpesialisasi,
    qGetPegawaiPensiun,
    qGetPegawaiSIP,
    qGetPemesanan,
    qGetPenerimaan,
    qGetRetur,
    qGetKartuStok,
    qGetSepuluhBesarObat,
    qGetProdukTerbanyak
}