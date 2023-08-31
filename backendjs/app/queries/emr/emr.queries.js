
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
    ) AS batchstokunit,
    sum(tsu.qty) AS totalstok
FROM t_stokunit tsu
    LEFT JOIN m_produk mp ON mp.id = tsu.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msd ON msd.id = mp.objectsediaanfk
WHERE tsu.objectunitfk = $1
    AND tsu.qty > 0
    AND tsu.statusenabled = true
    AND
CASE WHEN $2 = true 
    THEN mp.objectgolonganobatfk = 2
    ELSE true
END
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
    tdp.objectunitlastfk AS unitasal,
    tor.no_order AS noorder,
    tor.tglinput AS tanggalorder,
    tor.no_resep AS noresep,
    tor.tglverif AS tglverif,
    tdp.objectpenjaminfk AS penjamin,
    json_agg(
        json_build_object(
            'norecap', tap.norec,
            'norecresep', tord.norec,
            'obat', tord.objectprodukfk,
            'namaobat', mp.namaproduk,
            'satuanobat', ms.id,
            'namasatuan', ms.satuan,
            'koder', tord.kode_r,
            'qty', tord.qty,
            'qtyracikan', tord.qtyracikan,
            'qtypembulatan', tord.qtypembulatan,
            'qtyjumlahracikan', tord.qtyjumlahracikan,
            'sediaan', tord.objectsediaanfk,
            'namasediaan', msed.sediaan,
            'harga', tord.harga,
            'total', tord.total,
            'signa', tord.objectsignafk,
            'namasigna', msig.reportdisplay,
            'keterangan', tord.objectketeranganresepfk,
            'namaketerangan', mket.reportdisplay,
            'kodertambahan', tord.kode_r_tambahan,
            'stok', s.stok,
            'batch', s.batch
        )
        ORDER BY tord.kode_r ASC, tord.kode_r_tambahan ASC
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
    LEFT JOIN m_signa msig ON msig.id = tord.objectsignafk
CROSS JOIN LATERAL (
    SELECT 
        json_agg(
            json_build_object(
                'norecstokunit', tsu.norec,
                'harga', tsu.harga,
                'qty', tsu.qty,
                'nobatch', tsu.nobatch
            )
        ) AS batch,
        sum(tsu.qty) AS stok
        FROM t_stokunit tsu
    WHERE tsu.objectprodukfk = tord.objectprodukfk
        AND tsu.qty > 0
        AND tsu.objectunitfk = tor.objectdepotujuanfk
    ) s
WHERE CASE 
    WHEN $1 = 'all' THEN tor.statusenabled = true
    WHEN $1 = 'norecresep' THEN tor.norec = $2
    ELSE tdp.norec = $3
END
GROUP BY
    tor.norec,
    mpeg.id,
    mpeg.namalengkap,
    mu.id,
    mu.namaunit,
    tdp.objectunitlastfk,
    tdp.objectpenjaminfk
`

const qGetOrderVerifResepFromDP = `
SELECT
    tor.norec AS norecorder,
    mpeg.id AS dokter,
    mpeg.namalengkap AS namadokter,
    mu.id AS unittujuan,
    mu.namaunit AS namaunittujuan,
    tdp.objectunitlastfk AS unitasal,
    tor.no_order AS noorder,
    tor.no_resep AS noresep,
    tor.tglinput AS tanggalorder,
    tor.no_resep AS noresep,
    tor.tglverif AS tanggalverif,
    tdp.objectpenjaminfk AS penjamin,
    json_agg(
        json_build_object(
            'norecap', tap.norec,
            'norecresep', tv.norec,
            'obat', tv.objectprodukfk,
            'namaobat', mp.namaproduk,
            'satuanobat', ms.id,
            'namasatuan', ms.satuan,
            'koder', tv.kode_r,
            'qty', tv.qty,
            'qtyracikan', tv.qtyracikan,
            'qtypembulatan', tv.qtypembulatan,
            'qtyjumlahracikan', tv.qtyjumlahracikan,
            'sediaan', tv.objectsediaanfk,
            'namasediaan', msed.sediaan,
            'harga', tv.harga,
            'total', tv.total,
            'signa', tv.objectsignafk,
            'namasigna', msig.reportdisplay,
            'keterangan', tv.objectketeranganresepfk,
            'namaketerangan', mket.reportdisplay,
            'kodertambahan', tv.kode_r_tambahan,
            'stok', s.stok,
            'batch', s.batch
        )
        ORDER BY tv.kode_r ASC, tv.kode_r_tambahan ASC
    ) AS resep
FROM t_daftarpasien tdp
    LEFT JOIN t_antreanpemeriksaan tap ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN t_orderresep tor ON tor.objectantreanpemeriksaanfk = tap.norec
    LEFT JOIN t_verifresep tv ON tv.objectorderresepfk = tor.norec
    LEFT JOIN m_pegawai mpeg ON mpeg.id = tor.objectpegawaifk
    LEFT JOIN m_unit mu ON mu.id = tor.objectdepotujuanfk
    LEFT JOIN m_produk mp ON mp.id = tv.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msed ON msed.id = mp.objectsediaanfk
    LEFT JOIN m_keteranganresep mket ON mket.id = tv.objectketeranganresepfk
    LEFT JOIN m_signa msig ON msig.id = tv.objectsignafk
CROSS JOIN LATERAL (
    SELECT 
        json_agg(
            json_build_object(
                'norecstokunit', tsu.norec,
                'harga', tsu.harga,
                'qty', tsu.qty,
                'nobatch', tsu.nobatch
            )
        ) AS batch,
        sum(tsu.qty) AS stok
        FROM t_stokunit tsu
    WHERE tsu.objectprodukfk = tv.objectprodukfk
        AND tsu.qty > 0
        AND tsu.objectunitfk = tor.objectdepotujuanfk
    ) s
WHERE CASE 
    WHEN $1 = 'all' THEN tor.statusenabled = true
    WHEN $1 = 'norecresep' THEN tor.norec = $2
    ELSE tdp.norec = $3
END
    AND tor.no_resep IS NOT NULL
GROUP BY
    tor.norec,
    mpeg.id,
    mpeg.namalengkap,
    mu.id,
    mu.namaunit,
    tdp.objectunitlastfk,
    tdp.objectpenjaminfk
`




export {
    qGetObatFromUnit,
    qGetOrderResepFromDP,
    qGetOrderVerifResepFromDP
}