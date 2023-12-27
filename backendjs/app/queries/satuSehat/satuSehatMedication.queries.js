

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
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectantreanpemeriksaanfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_pegawai mpeg ON tap.objectdokterpemeriksafk = mpeg.id
WHERE tap.norec = $1

`

export default {
    qGetKFA,
    qGetPasienFromAP
}