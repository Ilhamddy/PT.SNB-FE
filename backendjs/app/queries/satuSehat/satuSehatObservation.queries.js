

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
    mt.code AS lokasinyericode_ihs_id,
    mt.display AS namalokasinyeri,
    mt.namalain AS namalainlokasinyeri,
    mt.codesystem AS codesystemlokasinyeri,
    ms.ihs_code AS satuandurasi_ihs_id,
    ms.ihs_system AS codesystemsatuandurasi
FROM t_asesmenawaligd taaigd
    LEFT JOIN t_emrpasien tep ON tep.norec = taaigd.objectemrpasienfk 
    LEFT JOIN t_antreanpemeriksaan tap ON tap.norec = tep.objectantreanpemeriksaanfk
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_pegawai mpeg ON mpeg.id = tap.objectdokterpemeriksafk
    LEFT JOIN m_terminologi mt ON mt.id = taaigd.objectterminologilokasinyerifk
    LEFT JOIN m_satuan ms ON ms.id = taaigd.objectsatuannyerifk
WHERE taaigd.norec = $1
`

export {
    qGetRiwayatObat,
    qGetRiwayatObatByNorecReferenci,
    qGetAsesmen,
}