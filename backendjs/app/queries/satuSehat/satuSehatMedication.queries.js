

const qGetKFA = `
SELECT
    mk.code AS idkfaobat,
    mk.display AS display,
    mp.id AS idproduk,
    mp.ihs_id AS idihs,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'idkfa', mk.id,
            'templatecode', mk.templatecode,
            'templatedisplay', mk.templatedisplay,
            'bahancode', mk.bahancode,
            'kekuatan', mk.kekuatan,
            'satuan', mk.satuan,
            'satuancodesystem', mk.satuancodesystem,
            'denominator', mk.denominator,
            'bahanaktif', mk.bahanaktif,
            'bahandenominatordisesuaikan', mk.bahandenominatordisesuaikan,
            'bahansatuandisesuaikan', mk.bahansatuandisesuaikan,
            'bahancodesystem', mk.bahancodesystem,
            'sediaancode', mk.sediaancode,
            'sediaandisplay', mk.sediaandisplay
        )
    ) AS isibahan
FROM m_produk mp
    LEFT JOIN m_kfa mk ON mk.code = mp.kfa_id
WHERE mk.code = $1
GROUP BY mk.code,
    mk.display,
    mp.id,
    mp.ihs_id
`

const qGetPasienFromAP = `
SELECT
    mp.namapasien AS namapasien,
    mp.noidentitas AS nik,
    mp.ihs_id AS ihs_idpasien,
    tdp.ihs_id AS ihs_iddp,
    mpeg.ihs_id AS ihs_iddokter,
    mpeg.namalengkap AS namadokter
FROM t_antreanpemeriksaan tap
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_pegawai mpeg ON tap.objectdokterpemeriksafk = mpeg.id
WHERE tap.norec = $1
`

const qGetObat = `
SELECT
    mp.ihs_id AS ihs_idobat,
    mkfa.code AS kfa_id,
    ms.reportdisplay AS namasigna,
    ms.frekuensi AS frekuensi,
    ms.period AS period
FROM t_orderresepdetail tord
    LEFT JOIN m_produk mp ON mp.id = tord.objectprodukfk
    LEFT JOIN m_kfa mkfa ON mkfa.code = mp.kfa_id
    LEFT JOIN m_signa ms ON ms.id = tord.objectsignafk
WHERE tord.norec = $1
`

const qGetObatVerif = `
SELECT
    mp.ihs_id AS ihs_idobat,
    mkfa.code AS kfa_id,
    ms.reportdisplay AS namasigna,
    ms.frekuensi AS frekuensi,
    ms.period AS period,
    tvr.objectorderresepfk AS objectorderresepfk,
    tord.ihs_id AS ihs_idorder,
    tvr.qtypembulatan AS qtypembulatan,
    tvr.qty AS qty
FROM t_verifresep tvr
    LEFT JOIN t_penjualanbebas tpb ON (
        tpb.norec = tvr.objectpenjualanbebasfk
        AND
        tvr.objectpenjualanbebasfk IS NOT NULL
    )
    LEFT JOIN t_orderresepdetail tord ON (
        tvr.objectorderresepfk = tord.norec
        AND
        tvr.objectorderresepfk IS NOT NULL 
    )
    LEFT JOIN m_produk mp ON mp.id = tvr.objectprodukfk
    LEFT JOIN m_kfa mkfa ON mkfa.code = mp.kfa_id
    LEFT JOIN m_signa ms ON ms.id = tvr.objectsignafk
WHERE tvr.norec = $1
`


export default {
    qGetKFA,
    qGetPasienFromAP,
    qGetObat,
    qGetObatVerif
}