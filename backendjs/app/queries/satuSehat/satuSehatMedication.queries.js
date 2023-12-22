

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

export default {
    qGetKFA
}