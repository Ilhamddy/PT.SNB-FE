

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

export {
    qGetRiwayatObat,qGetRiwayatObatByNorecReferenci
}