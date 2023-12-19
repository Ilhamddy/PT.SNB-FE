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

const qPenjualanObatBebas = `
SELECT
    tpb.norec AS norecjualbebas,
    tpb.objectpasienfk AS norm,
    tpb.namapasien AS namapasien,
    tpb.tgllahir AS tanggallahir,
    tpb.notelepon AS notelepon,
    tpb.alamat AS alamat,
    tpb.tglresep AS tanggalresep,
    tpb.objectjenisresepfk AS jenis,
    tpb.namapenulis AS namapenulis,
    mjr.reportdisplay AS namajenis,
    mu.id AS unittujuan,
    mu.namaunit AS namaunittujuan,
    tpb.no_resep AS noresep,
    mu.id AS unittujuan,
    mu.namaunit AS namaunittujuan,
    tpb.namapenulis AS penulisresep,
    mpeg.id AS petugasapotek,
    mpeg.namalengkap AS namapetugasapotek,
    tpb.catatan AS catatan,
    tpb.tglinput AS tanggalorder,
    json_agg(
        json_build_object(
            'norecresep', tvr.norec,
            'obat', tvr.objectprodukfk,
            'namaobat', mp.namaproduk,
            'satuanobat', ms.id,
            'namasatuan', ms.satuan,
            'koder', tvr.kode_r,
            'qty', tvr.qty,
            'qtyracikan', tvr.qtyracikan,
            'qtypembulatan', tvr.qtypembulatan,
            'qtyjumlahracikan', tvr.qtyjumlahracikan,
            'sediaan', tvr.objectsediaanfk,
            'namasediaan', msed.sediaan,
            'harga', tvr.harga,
            'total', tvr.total,
            'signa', tvr.objectsignafk,
            'namasigna', msig.reportdisplay,
            'keterangan', tvr.objectketeranganresepfk,
            'namaketerangan', mket.reportdisplay,
            'kodertambahan', tvr.kode_r_tambahan,
            'stok', s.stok,
            'batch', s.batch
        )
        ORDER BY tvr.kode_r ASC, tvr.kode_r_tambahan ASC
    ) AS resep
FROM t_penjualanbebas tpb
    LEFT JOIN m_jenisresep mjr ON mjr.id = tpb.objectjenisresepfk
    LEFT JOIN t_verifresep tvr ON tvr.objectpenjualanbebasfk = tpb.norec
    LEFT JOIN m_pegawai mpeg ON mpeg.id = tpb.objectpegawaifk
    LEFT JOIN m_unit mu ON mu.id = tpb.objectunitfk
    LEFT JOIN m_produk mp ON mp.id = tvr.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msed ON msed.id = mp.objectsediaanfk
    LEFT JOIN m_keteranganresep mket ON mket.id = tvr.objectketeranganresepfk
    LEFT JOIN m_signa msig ON msig.id = tvr.objectsignafk
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
    WHERE tsu.objectprodukfk = tvr.objectprodukfk
        AND tsu.qty > 0
        AND tsu.objectunitfk = tpb.objectunitfk
    ) s
`

const qGetPenjualanBebasAll = qPenjualanObatBebas + `
WHERE ${dateBetweenEmptyString("tpb.tglinput", "$1", "$2")}
GROUP BY
    tpb.norec,
    mpeg.id,
    mpeg.namalengkap,
    mu.id,
    mu.namaunit,
    mjr.reportdisplay
`

const qGetPenjualanBebasFromNorec = qPenjualanObatBebas + `
WHERE tpb.norec = $1
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
    tap.norec AS norecap,
    tor.norec AS norecresep,
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
    qGetPenjualanBebasAll
}