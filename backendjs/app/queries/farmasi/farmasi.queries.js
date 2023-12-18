import { dateBetweenEmptyString, emptyIlike, emptyInt } from "../../utils/dbutils"

const qGetObatFromProduct = `
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
        ORDER BY tsu.tglinput
    ) AS batchstokunit,
    COALESCE(sum(tsu.qty), 0) AS totalstok
FROM t_stokunit tsu
    LEFT JOIN m_produk mp ON mp.id = tsu.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msd ON msd.id = mp.objectsediaanfk
WHERE tsu.objectprodukfk = $1
    AND tsu.objectunitfk = $2
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

const qGetPenjualanBebasFromNorec = `
SELECT
    tpb.norec AS norecjualbebas,
    tpb.namapasien AS namapasien,
    tpb.tgllahir AS tanggallahir,
    tpb.notelepon AS notelepon,
    tpb.alamat AS alamat,
    tpb.tglresep AS tanggalresep,
    tpb.objectjenisresepfk AS jenis,
    mjr.reportdisplay AS namajenis,
    mu.id AS unittujuan,
    mu.namaunit AS namaunittujuan,
    tpb.no_resep AS noresep,
    mu.id AS unittujuan,
    mu.namaunit AS namaunittujuan,
    tpb.no_resep AS noresep,
    tpb.namapenulis AS penulisresep,
    mpeg.id AS petugasapotek,
    mpeg.namalengkap AS namapetugasapotek,
    tpb.catatan AS catatan,
    tpb.tglinput AS tanggalorder,
    json_agg(
        json_build_object(
            'norecresep', tpbd.norec,
            'obat', tpbd.objectprodukfk,
            'namaobat', mp.namaproduk,
            'satuanobat', ms.id,
            'namasatuan', ms.satuan,
            'koder', tpbd.kode_r,
            'qty', tpbd.qty,
            'qtyracikan', tpbd.qtyracikan,
            'qtypembulatan', tpbd.qtypembulatan,
            'qtyjumlahracikan', tpbd.qtyjumlahracikan,
            'sediaan', tpbd.objectsediaanfk,
            'namasediaan', msed.sediaan,
            'harga', tpbd.harga,
            'total', tpbd.total,
            'signa', tpbd.objectsignafk,
            'namasigna', msig.reportdisplay,
            'keterangan', tpbd.objectketeranganresepfk,
            'namaketerangan', mket.reportdisplay,
            'kodertambahan', tpbd.kode_r_tambahan,
            'stok', s.stok,
            'batch', s.batch
        )
        ORDER BY tpbd.kode_r ASC, tpbd.kode_r_tambahan ASC
    ) AS resep
FROM t_penjualanbebas tpb
    LEFT JOIN m_jenisresep mjr ON mjr.id = tpb.objectjenisresepfk
    LEFT JOIN t_penjualanbebasdetail tpbd ON tpbd.objectpenjualanbebasfk = tpb.norec
    LEFT JOIN m_pegawai mpeg ON mpeg.id = tpb.objectpegawaifk
    LEFT JOIN m_unit mu ON mu.id = tpb.objectunitfk
    LEFT JOIN m_produk mp ON mp.id = tpbd.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msed ON msed.id = mp.objectsediaanfk
    LEFT JOIN m_keteranganresep mket ON mket.id = tpbd.objectketeranganresepfk
    LEFT JOIN m_signa msig ON msig.id = tpbd.objectsignafk
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
    WHERE tsu.objectprodukfk = tpbd.objectprodukfk
        AND tsu.qty > 0
        AND tsu.objectunitfk = tpb.objectunitfk
    ) s
WHERE CASE 
    WHEN $1 = 'all' THEN tpb.statusenabled = true
    WHEN $1 = 'norecjualbebas' THEN tpb.norec = $2
END
    AND tpb.no_resep IS NOT NULL
GROUP BY
    tpb.norec,
    mpeg.id,
    mpeg.namalengkap,
    mu.id,
    mu.namaunit,
    mjr.reportdisplay
`

const qGetPasienFromId = `
SELECT
    mpas.id AS value,
    mpas.nocm || ' - ' || mpas.namapasien AS label,
    mpas.namapasien AS namapasien,
    mpas.notelepon AS notelepon,
    mpas.alamatdomisili AS alamat,
    mpas.tgllahir AS tanggallahir
FROM m_pasien AS mpas
WHERE 
    ${emptyIlike("CAST(mpas.nocm AS text)", "$1")}
LIMIT 10
`

const qGetAllVerif = `
SELECT 
    row_number() OVER () AS no,
    tvr.norec AS norecverif,
    tvr.kode_r AS koder,
    tvr.kode_r_tambahan AS kodertambahan,
    tor.no_resep AS noresep,
    tvr.qty AS qty,
    tvr.harga AS harga,
    tvr.total AS total,
    mu.id AS unit,
    mu.namaunit AS namaunit,
    mp.id AS produk,
    mp.namaproduk AS namaproduk,
    tvr.nobatch AS nobatch
FROM t_daftarpasien tdp
    LEFT JOIN t_antreanpemeriksaan tap ON tap.objectdaftarpasienfk = tdp.norec
    LEFT JOIN t_pelayananpasien tp ON tp.objectantreanpemeriksaanfk = tap.norec
    LEFT JOIN t_verifresep tvr ON tvr.norec = tp.objectverifresepfk
    LEFT JOIN t_orderresep tor ON tvr.objectorderresepfk = tor.norec
    LEFT JOIN m_unit mu ON mu.id = tor.objectdepotujuanfk
    LEFT JOIN m_produk mp ON mp.id = tvr.objectprodukfk
WHERE tvr.statusenabled = true
    AND tvr.nobatch IS NOT NULL
    AND tdp.norec = $1
`



export {
    qGetObatFromProduct,
    qGetPenjualanBebasFromNorec,
    qGetPasienFromId,
    qGetAllVerif,
}