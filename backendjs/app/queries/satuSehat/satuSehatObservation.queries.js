

const qGetRiwayatObat = `
SELECT
    mprod.ihs_id AS ihs_obat,
    mp.ihs_id AS ihs_pasien,
    mp.namapasien AS namapasien,
    ms.reportdisplay AS namasigna,
    ms.frekuensi AS frekuensisigna,
    ms.period AS periodsigna,
    msat.ihs_code AS satuansigna,
    tdp.ihs_id AS ihs_encounter
FROM t_riwayatobatpasien trop
    LEFT JOIN t_pasienigd tpi ON tpi.norec = trop.objectpasienigdfk
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tpi.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_signa ms ON ms.id = trop.objectsignafk
    LEFT JOIN m_satuan msat ON msat.id = ms.objectsatuanfk
    LEFT JOIN m_produk mprod ON mprod.id = trop.objectprodukfk
WHERE trop.norec = $1
`

const qGetRiwayatObatByNorecReferenci = `
select
trop.norec,
    mprod.ihs_id AS ihs_obat,
    mp.ihs_id AS ihs_pasien,
    mp.namapasien AS namapasien,
    ms.reportdisplay AS namasigna,
    ms.frekuensi AS frekuensisigna,
    ms.period AS periodsigna,
    msat.ihs_code AS satuansigna,
    tdp.ihs_id AS ihs_encounter
FROM t_riwayatobatpasien trop
    LEFT JOIN t_pasienigd tpi ON tpi.norec = trop.objectpasienigdfk
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tpi.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_signa ms ON ms.id = trop.objectsignafk
    LEFT JOIN m_satuan msat ON msat.id = ms.objectsatuanfk
    LEFT JOIN m_produk mprod ON mprod.id = trop.objectprodukfk
WHERE tpi.norec = $1`


const qGetAsesmen = `
SELECT
    taaigd.isnyeri AS isnyeri,
    mpeg.ihs_id AS ihs_dokter,
    mp.ihs_id AS ihs_pasien,
    mp.namapasien AS namapasien,
    tdp.ihs_id AS ihs_encounter,
    taaigd.isnyeri_ihs_id AS isnyeri_ihs_id,
    taaigd.isnyeri AS isnyeri,
    taaigd.skalanyeri AS skalanyeri,
    taaigd.skalanyeri_ihs_id AS skalanyeri_ihs_id,
    taaigd.skalanyeribrs_ihs_id AS skalanyeribrs_ihs_id,
    taaigd.lokasinyeri_ihs_id AS lokasinyeri_ihs_id,
    taaigd.penyebabnyeri AS penyebabnyeri,
    taaigd.penyebabnyeri_ihs_id AS penyebabnyeri_ihs_id,
    taaigd.durasi AS durasi,
    taaigd.durasinyeri_ihs_id AS durasinyeri_ihs_id,
    taaigd.frekuensinyeri AS frekuensinyeri,
    taaigd.mfs_skorjatuh AS mfs_skorjatuh,
    taaigd.mfs_totalskor AS mfs_totalskor,
    taaigd.mfs_ihs_id AS mfs_ihs_id,
    taaigd.hds_totalskor AS hds_totalskor,
    taaigd.hds_ihs_id AS hds_ihs_id,
    mt.code AS lokasinyericode_ihs_id,
    mt.display AS namalokasinyeri,
    mt.namalain AS namalainlokasinyeri,
    mt.codesystem AS codesystemlokasinyeri,
    ms.ihs_code AS satuandurasi_ihs_id,
    ms.ihs_system AS codesystemsatuandurasi,
    mimfs.code AS mfsscode,
    mimfs.display AS mfsdisplay,
    mimfs.codesystem AS mfscodesystem,
    mimfs.id AS mfsid,
    mihds.code AS hdsscode,
    mihds.display AS hdsdisplay,
    mihds.codesystem AS hdscodesystem,
    mihds.id AS hdsid
FROM t_asesmenawaligd taaigd
    LEFT JOIN t_emrpasien tep ON tep.norec = taaigd.objectemrpasienfk 
    LEFT JOIN t_antreanpemeriksaan tap ON tap.norec = tep.objectantreanpemeriksaanfk
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_pegawai mpeg ON mpeg.id = tap.objectdokterpemeriksafk
    LEFT JOIN m_terminologi mt ON mt.id = taaigd.objectterminologilokasinyerifk
    LEFT JOIN m_satuan ms ON ms.id = taaigd.objectsatuannyerifk
    LEFT JOIN m_interpretasi mimfs ON mimfs.id = taaigd.objectinterpretasimfsfk
    LEFT JOIN m_interpretasi mihds ON mihds.id = taaigd.objectinterpretasihdsfk
WHERE taaigd.norec = $1
`
const qSkriningIGDByNorecDp = `
SELECT
    tp.norec,dp.noregistrasi,
    mu.namaunit,to_char(tp.tglinput,'dd Month YYYY HH24:MI') as tglinput,
    tp.tglinput as tglinput_ihs,tp.risikodecubitus,tp.ihs_decubitus,tp.ihs_batuk,tp.ihs_gizi,
	tp.batuk_demam,
	tp.batuk_keringat,
	tp.batuk_daerahwabah,
	tp.batuk_obatjangkapanjang,
	tp.batuk_bbturun,
	tp.gizi_bbturun,
	tp.gizi_nafsumakan,
	tp.gizi_gejala,
	tp.gizi_komorbid,
	tp.gizi_fungsional
FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
join t_skriningigd tp on tp.objectemrpasienfk=te.norec 
join m_unit mu on mu.id=ta.objectunitfk
where tp.norec=$1`

export {
    qGetRiwayatObat,
    qGetRiwayatObatByNorecReferenci,
    qGetAsesmen,
    qSkriningIGDByNorecDp
}