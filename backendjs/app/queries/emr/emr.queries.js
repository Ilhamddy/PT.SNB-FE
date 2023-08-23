
const qGetObatFromUnit = `
SELECT
    tsu.objectprodukfk AS value,
    mp.namaproduk AS label,
    ms.id AS satuanid,
    ms.satuan AS namasatuan,
    msd.id AS sediaanid,
    msd.sediaan AS namasediaan,
    json_agg(
        json_build_object(
            'norecstokunit', tsu.norec,
            'harga', tsu.harga,
            'qty', tsu.qty,
            'nobatch', tsu.nobatch
        )
    ) AS batchstokunit
FROM t_stokunit tsu
    LEFT JOIN m_produk mp ON mp.id = tsu.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msd ON msd.id = mp.objectsediaanfk
WHERE tsu.objectunitfk = $1
    AND tsu.qty > 0
    AND tsu.statusenabled = true
GROUP BY 
    tsu.objectprodukfk, 
    mp.namaproduk,
    ms.id,
    ms.satuan,
    msd.id,
    msd.sediaan
`

const qGetOrderResepFromDP = `
SELECT
    tor.norec AS norecorder,
    mpeg.id AS dokter,
    mpeg.namalengkap AS namadokter,
    mu.id AS unittujuan,
    mu.namaunit AS namaunittujuan,
    json_agg(
        json_build_object(
            'norecap', tap.norec,
            'norecresep', tord.norec,
            'obat', tord.objectprodukfk,
            'namaobat', mp.namaproduk,
            'satuanobat', ms.satuan,
            'koder', tord.kode_r,
            'qty', tord.qty,
            'qtyracikan', tord.qtyracikan,
            'qtypembulatan', tord.qtypembulatan,
            'sediaan', tord.objectsediaanfk,
            'namasediaan', msed.sediaan,
            'harga', tord.harga,
            'total', tord.total,
            'signa', tord.objectsignafk,
            'keterangan', tord.objectketeranganresepfk,
            'namaketerangan', mket.reportdisplay,
            'kodertambahan', tord.kode_r_tambahan

        )
    ) AS resep
FROM t_daftarpasien tdp
    LEFT JOIN t_antreanpemeriksaan tap ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN t_orderresep tor ON tor.objectantreanpemeriksaanfk = tap.norec
    LEFT JOIN t_orderresepdetail tord ON tord.objectorderresepfk = tor.norec
    LEFT JOIN m_pegawai mpeg ON mpeg.id = tor.objectpegawaifk
    LEFT JOIN m_unit mu ON mu.id = tor.objectdepotujuanfk
    LEFT JOIN m_produk mp ON mp.id = tord.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msed ON msed.id = mp.objectsediaanfk
    LEFT JOIN m_keteranganresep mket ON mket.id = tord.objectketeranganresepfk
WHERE tdp.norec = $1
GROUP BY
    tor.norec,
    mpeg.id,
    mpeg.namalengkap,
    mu.id,
    mu.namaunit
`

export {
    qGetObatFromUnit,
    qGetOrderResepFromDP
}