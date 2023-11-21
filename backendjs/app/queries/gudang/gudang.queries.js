import { daftarUnit } from "../mastertable/unit/unit.queries"


const qGetJenisDetailProdukLainLain = `
    SELECT
    mdjp.id AS id,
    mdjp.statusenabled AS statusenabled,
    mdjp.detailjenisproduk AS detailjenisproduk,
    mjp.jenisproduk AS jenisproduk,
    mjp.id AS idjenisproduk
    FROM m_detailjenisproduk mdjp
        LEFT JOIN m_jenisproduk mjp ON mjp.id = mdjp.objectjenisprodukfk
`

const qGetSediaanLainLain = `
    SELECT
    id,
    sediaan,
    statusenabled
        FROM m_sediaan
`

const qGetSatuanLainLain = `
    SELECT
    msat.id AS id,
    msat.satuan AS satuan,
    msat.statusenabled AS statusenabled,
    mjs.jenissatuan AS jenissatuan,
    mjs.id AS idjenissatuan
    FROM m_satuan msat
        LEFT JOIN m_jenissatuan mjs ON mjs.id = msat.objectjenissatuanfk
`

const qGetProdukKonversi = `
SELECT
    mp.id AS id,
    mp.statusenabled AS statusenabled,
    mp.kdprofile AS kdprofile,
    mp.namaproduk AS namaproduk,
    ms.satuan AS satuan,
    ms.id AS idsatuan
FROM m_produk mp
    LEFT JOIN m_satuan ms ON mp.objectsatuanstandarfk = ms.id
WHERE mp.statusenabled = true
    AND (
        $1 = ''
        OR mp.namaproduk ILIKE '%' || $1 || '%' 
    )
`

const qGetProdukKonversiFromId = `
    SELECT
    mp.id AS id,
    mp.statusenabled AS statusenabled,
    mp.kdprofile AS kdprofile,
    mp.namaproduk AS namaproduk,
    ms.satuan AS satuan,
    ms.id AS idsatuan
        FROM m_produk mp
        LEFT JOIN m_satuan ms ON mp.objectsatuanstandarfk = ms.id
            WHERE mp.id = $1
`


const qGetKemasan = `
SELECT
    mkp.id AS id,
    mkp.statusenabled AS statusenabled,
    mkp.nilaikonversi AS nilaikonversi,
    ms.satuan AS satuan,
    msb.satuan AS kemasan
FROM m_kemasanproduk mkp
    LEFT JOIN m_produk mp ON mp.id = mkp.objectprodukfk
    LEFT JOIN m_satuan ms ON mkp.objectsatuankecilfk = ms.id
    LEFT JOIN m_satuan msb ON mkp.objectsatuanbesarfk = msb.id
WHERE mkp.objectprodukfk = $1
`

const qGetProdukMaster = `
SELECT
    mp.id AS id,
    mp.statusenabled AS statusenabled,
    mp.namaproduk AS namaproduk,
    ms.satuan AS satuanjual,
    mv.reportdisplay AS variabelbpjs,
    mdjp.detailjenisproduk AS detailjenisproduk,
    mgo.golonganobat AS golonganobat
FROM m_produk mp
    LEFT JOIN m_satuan ms ON mp.objectsatuanstandarfk = ms.id
    LEFT JOIN m_variabelbpjs mv ON mv.id = mp.objectvariabelbpjsfk
    LEFT JOIN m_detailjenisproduk mdjp ON mdjp.id = mp.objectdetailjenisprodukfk
    LEFT JOIN m_golonganobat mgo ON mgo.id = mp.objectgolonganobatfk
WHERE
    mp.isobat = TRUE 
    OR mp.isbmhp = TRUE
    OR mp.isalkes = TRUE
    OR mp.islogistik = TRUE
`

const qGetProdukEdit = `
    SELECT
    *
        FROM m_produk
            WHERE id = $1
`

const qGetSatuanFromProduk = `
SELECT
    msb.id AS value,
    msb.satuan AS label,
    msk.satuan AS konversi,
    mkp.nilaikonversi AS nilaikonversi
FROM m_kemasanproduk mkp
    LEFT JOIN m_satuan msb ON mkp.objectsatuanbesarfk = msb.id
    LEFT JOIN m_satuan msk ON mkp.objectsatuankecilfk = msk.id
WHERE mkp.objectprodukfk = $1
`

const qGetDetailPenerimaan = `
SELECT
    tpbd.norec AS norecdetailpenerimaan,
    json_build_object(
        'idproduk', mp.id,
        'namaproduk', mp.namaproduk,
        'satuanjual', mp.objectsatuanstandarfk,
        'namasatuanjual', msp.satuan 
    )
    AS produk,
    msk.id AS satuanterima,
    msk.satuan AS namasatuanterima,
    tpbd.jumlah AS jumlahterima,
    tpbd.hargasatuankecil AS hargasatuankecil,
    tpbd.hargasatuanterima AS hargasatuanterima,
    tpbd.diskonpersen AS diskonpersen,
    tpbd.diskon AS diskonrupiah,
    tpbd.ppn AS ppnrupiahproduk,
    tpbd.ppnpersen AS ppnpersenproduk,
    tpbd.ed AS tanggaled,
    tpbd.nobatch AS nobatch,
    tpbd.subtotal AS subtotalproduk,
    tpbd.jumlahkonversi AS jumlahkonversi,
    tpbd.total AS totalproduk
FROM t_penerimaanbarangdetail tpbd
    JOIN m_produk mp ON mp.id = tpbd.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = tpbd.objectsatuanfk
    JOIN m_satuan msp ON msp.id = mp.objectsatuanstandarfk
    JOIN m_satuan msk ON msk.id = tpbd.objectsatuanfk
WHERE tpbd.objectpenerimaanbarangfk = $1
`

const qGetPenerimaanFE = `
SELECT
    tpb.norec AS norecpenerimaan,
    tpb.no_terima AS nomorterima,
    tpb.tglterima AS tanggalterima,
    tpb.objectrekananfk AS namasupplier,
    mr.reportdisplay AS namasupplierstr,
    tpb.no_order AS nomorpo,
    tpb.tglorder AS tanggalpesan,
    tpb.objectunitfk AS unitpesan,
    mu.namaunit AS unitpesanstr,
    tpb.tgljatuhtempo AS tanggaljatuhtempo,
    tpb.objectasalprodukfk AS sumberdana,
    tpb.keterangan AS keterangan,
    tpb.objectpemesananbarangfk AS norecpemesanan,
    '' AS subtotal,
    '' AS ppnrupiah,
    '' AS diskonrupiah,
    '' AS total
FROM t_penerimaanbarang tpb
    JOIN m_rekanan mr ON mr.id = tpb.objectrekananfk
    JOIN m_unit mu ON mu.id = tpb.objectunitfk
`

const qGetPenerimaan = qGetPenerimaanFE + `
            WHERE tpb.norec = $1`

const qGetListPenerimaan = qGetPenerimaanFE + `
WHERE tpb.statusenabled = true
    AND COALESCE(tpb.islogistik, false) = $1
ORDER BY tpb.tglterima DESC

`

const qGetKartuStok = `
SELECT
    tks.norec AS noreckartustok,
    tks.statusenabled AS statusenabled,
    mu.namaunit AS unit,
    mp.namaproduk AS namaproduk,
    tks.saldoawal AS saldoawal,
    tks.masuk AS masuk,
    tks.keluar AS keluar,
    tks.saldoakhir AS saldoakhir,
    tks.keterangan AS keterangan,
    tks.tglinput AS tglinput,
    tks.tglupdate AS tglupdate,
    tks.tabeltransaksi AS tabeltransaksi,
    tks.norectransaksi AS norectransaksi,
    tks.batch AS nobatch
FROM t_kartustok tks
    LEFT JOIN m_produk mp ON mp.id = tks.objectprodukfk
    LEFT JOIN m_unit mu ON mu.id = tks.objectunitfk
WHERE 
        (
            tks.objectunitfk = ANY($1) 
            OR ${daftarUnit.GUDANG_FARMASI} = ANY($1) --- kalau gudang kasih akses ke semua
        ) 
    AND
        (
            NULLIF($2, '')::int IS NULL
            OR NULLIF($2, '')::int = tks.objectunitfk
        )
ORDER BY 
    tks.tglinput DESC
`

const qGetStokUnit = `
SELECT
    tsu.norec AS norecstokunit,
    tsu.qty AS qty,
    mp.id AS idproduk,
    mp.namaproduk AS namaproduk,
    mu.namaunit AS namaunit,
    tsu.nobatch AS nobatch,
    ms.satuan AS namasatuan,
    mas.asalproduk AS asalproduk,
    tsu.harga AS harga
FROM t_stokunit tsu
    LEFT JOIN m_produk mp ON mp.id = tsu.objectprodukfk
    LEFT JOIN m_unit mu ON mu.id = tsu.objectunitfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_asalproduk mas ON mas.id = tsu.objectasalprodukfk
WHERE
    (
        tsu.objectunitfk = ANY($1) 
        OR ${daftarUnit.GUDANG_FARMASI} = ANY($1) --- kalau gudang kasih akses ke semua
    ) 
    AND
    (
        NULLIF($2, '')::int IS NULL
        OR NULLIF($2, '')::int = tsu.objectunitfk
    )
`

const qGetStokOpname = `
SELECT
    row_number() over() AS no,
    tso.norec AS norecstokopname,
    tso.tglawal AS tanggalawal,
    tso.tglakhir AS tanggalakhir,
    tso.objectunitfk AS unitso,
    mu.id AS idunit,
    mu.namaunit AS namaunit,
    tso.tglinput AS tglinput,
    tso.tglselesai AS tglselesai,
    count(tsod.norec) AS jumlahproduk,
    tso.statusselesai AS statusselesai,
    json_agg(
        json_build_object(
            'norecstokopnamedetail', tsod.norec,
            'namaproduk', mp.namaproduk,
            'objectsatuanstandarfk', ms.id,
            'namasatuan', ms.satuan,
            'stokaplikasi', tsod.stokaplikasi,
            'stokfisik', tsod.stokfisik,
            'selisih', tsod.selisih,
            'keterangan', tsod.keterangan
        )
    ) AS detailstokopname
FROM t_stokopname tso
    LEFT JOIN m_unit mu ON mu.id = tso.objectunitfk
    LEFT JOIN t_stokopnamedetail tsod ON tsod.objectstokopnamefk = tso.norec
    LEFT JOIN m_produk mp ON mp.id = tsod.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
GROUP BY tso.norec, tso.tglawal, tso.tglakhir, tso.objectunitfk, mu.namaunit, tso.tglinput, tso.tglselesai, mu.id
`

const qGetStokOpnameStokUnit = `
SELECT
    row_number() over() AS no,
    tso.norec AS objectstokopnamefk,
    mp.namaproduk AS namaproduk,
    tsu.objectprodukfk AS objectprodukfk,
    ms.id AS objectsatuanstandarfk,
    ms.satuan AS namasatuan,
    mu.id AS objectunitfk,
    mu.namaunit AS namaunit,
    json_agg(
        json_build_object(
            'stok', tsu.qty,
            'batch', tsu.nobatch
        )
    ) AS stokaplikasibatch,
    sum(tsu.qty) AS stokaplikasi,
    sum(tsu.qty) AS stokfisik,
    0 AS selisih,
    '' AS keterangan
FROM t_stokopname tso
    LEFT JOIN t_stokunit tsu ON tsu.objectunitfk = tso.objectunitfk
    LEFT JOIN m_produk mp ON mp.id = tsu.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_unit mu ON mu.id = tso.objectunitfk
WHERE tso.norec = $1
GROUP BY tso.norec, tsu.objectprodukfk, mp.namaproduk, ms.id, ms.satuan, mu.id, mu.namaunit
`

const qGetStokOpnameDetail = `
SELECT
    row_number() over() as no,
    tsod.norec AS norecstokopnamedetail,
    mp.id AS objectprodukfk,
    mp.namaproduk AS namaproduk,
    ms.id AS objectsatuanstandarfk,
    ms.satuan AS namasatuan,
    tsod.stokaplikasi AS stokaplikasi,
    tsod.stokfisik AS stokfisik,
    tsod.selisih AS selisih,
    tsod.keterangan AS keterangan,
    mu.id AS objectunitfk,
    mu.namaunit AS namaunit,
    tso.statusselesai AS statusselesai
FROM t_stokopnamedetail tsod
    LEFT JOIN t_stokopname tso ON tso.norec = tsod.objectstokopnamefk
    LEFT JOIN m_produk mp ON mp.id = tsod.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_unit mu ON mu.id = tso.objectunitfk
WHERE tsod.objectstokopnamefk = $1
`

const qGetPemesananObject = `
SELECT
    tpb.norec AS norecpemesanan,
    tpb.objectrekananfk AS namasupplier,
    mr.reportdisplay AS namasupplierstr,
    tpb.no_order AS nomorpo,
    tpb.tglorder AS tanggalpesan,
    tpb.objectunitfk AS unitpesan,
    mu.namaunit AS unitpesanstr,
    tpb.objectasalprodukfk AS sumberdana,
    tpb.keterangan AS keterangan,
    '' AS subtotal,
    '' AS ppnrupiah,
    '' AS diskonrupiah,
    '' AS total
FROM t_pemesananbarang tpb
    JOIN m_rekanan mr ON mr.id = tpb.objectrekananfk
    JOIN m_unit mu ON mu.id = tpb.objectunitfk
`

const qGetPemesanan = qGetPemesananObject + `
WHERE tpb.norec = $1
`

const qGetListPemesanan = qGetPemesananObject + `
WHERE tpb.statusenabled = true
    AND COALESCE(tpb.islogistik, false) = $1
ORDER BY tpb.tglorder DESC
`

const qGetDetailPemesanan = `
SELECT
    tpbd.norec AS norecdetailpemesanan,
    json_build_object(
        'idproduk', mp.id,
        'namaproduk', mp.namaproduk,
        'satuanjual', mp.objectsatuanstandarfk,
        'namasatuanjual', msp.satuan 
    )
    AS produk,
    msk.id AS satuanterima,
    msk.satuan AS namasatuanterima,
    tpbd.jumlah AS jumlahterima,
    tpbd.hargasatuankecil AS hargasatuankecil,
    tpbd.hargasatuanterima AS hargasatuanterima,
    tpbd.diskonpersen AS diskonpersen,
    tpbd.diskon AS diskonrupiah,
    tpbd.ppn AS ppnrupiahproduk,
    tpbd.ppnpersen AS ppnpersenproduk,
    tpbd.subtotal AS subtotalproduk,
    tpbd.total AS totalproduk
FROM t_pemesananbarangdetail tpbd
    JOIN m_produk mp ON mp.id = tpbd.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = tpbd.objectsatuanfk
    JOIN m_satuan msp ON msp.id = mp.objectsatuanstandarfk
    JOIN m_satuan msk ON msk.id = tpbd.objectsatuanfk
WHERE tpbd.objectpemesananbarangfk = $1
`

const qGetDetailReturObj = `
SELECT
    trbd.objectreturbarangfk AS norecretur,
    trbd.norec AS norecdetailretur,
    tpbd.norec AS norecdetailpenerimaan,
    json_build_object(
        'idproduk', mp.id,
        'namaproduk', mp.namaproduk,
        'satuanjual', mp.objectsatuanstandarfk,
        'namasatuanjual', msp.satuan 
    )
    AS produk,
    msk.id AS satuanterima,
    msk.satuan AS namasatuanterima,
    tpbd.jumlah AS jumlahterima,
    trbd.jumlah AS jumlahretur,
    tpbd.hargasatuankecil AS hargasatuankecil,
    tpbd.hargasatuanterima AS hargasatuanterima,
    tpbd.nobatch AS nobatch,
    tpbd.ed AS ed,
    trbd.diskonpersen AS diskonpersen,
    trbd.diskon AS diskonrupiah,
    trbd.ppn AS ppnrupiahproduk,
    trbd.ppnpersen AS ppnpersenproduk,
    trbd.subtotal AS subtotalproduk,
    trbd.total AS totalproduk,
    trbd.alasanretur AS alasanretur
FROM t_returbarangdetail trbd
    LEFT JOIN t_penerimaanbarangdetail tpbd ON tpbd.norec = trbd.objectpenerimaanbarangdetailfk
    JOIN m_produk mp ON mp.id = tpbd.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = tpbd.objectsatuanfk
    JOIN m_satuan msp ON msp.id = mp.objectsatuanstandarfk
    JOIN m_satuan msk ON msk.id = tpbd.objectsatuanfk
`

const qGetDetailReturFromDetailPenerimaan = qGetDetailReturObj + `
WHERE $1 = trbd.objectpenerimaanbarangdetailfk
`

const qGetDetailRetur = qGetDetailReturObj + `
WHERE trbd.objectreturbarangfk = $1
`

const qGetReturBarangObj = `
SELECT
    trb.norec AS norecretur,
    trb.noretur AS nomorretur,
    trb.tglretur AS tanggalretur,
    tpb.objectrekananfk AS namasupplier,
    mr.reportdisplay AS namasupplierstr,
    tpb.norec AS norecpenerimaan,
    tpb.no_terima AS nomorterima,
    tpb.no_order AS nomorpo,
    tpb.tglterima AS tanggalterima,
    tpb.tglorder AS tanggalpesan,
    tpb.objectunitfk AS unitpesan,
    mu.namaunit AS unitpesanstr
FROM t_returbarang trb
    LEFT JOIN t_penerimaanbarang tpb ON trb.objectpenerimaanbarangfk = tpb.norec
    LEFT JOIN m_rekanan mr ON mr.id = tpb.objectrekananfk
    LEFT JOIN m_unit mu ON mu.id = tpb.objectunitfk
`


const qGetReturBarang = qGetReturBarangObj +  `
WHERE trb.norec = $1
`

const qGetListRetur = qGetReturBarangObj + `
WHERE trb.statusenabled = true
ORDER BY trb.tglretur DESC
`

const qGetUnitUser = `
SELECT
    mu.namaunit AS namaunit,
    mu.id AS idunit
FROM m_mapusertounit mmap
    LEFT JOIN m_unit mu ON mu.id = mmap.objectunitfk
WHERE mmap.objectuserfk = $1
`


export {
    qGetJenisDetailProdukLainLain,
    qGetSediaanLainLain,
    qGetSatuanLainLain,
    qGetProdukKonversi,
    qGetProdukKonversiFromId,
    qGetKemasan,
    qGetProdukMaster,
    qGetProdukEdit,
    qGetSatuanFromProduk,
    qGetDetailPenerimaan,
    qGetPenerimaan,
    qGetListPenerimaan,
    qGetKartuStok,
    qGetStokUnit,
    qGetStokOpname,
    qGetStokOpnameStokUnit,
    qGetStokOpnameDetail,
    qGetPemesanan,
    qGetDetailPemesanan,
    qGetListPemesanan,
    qGetUnitUser,
    qGetDetailRetur,
    qGetReturBarang,
    qGetListRetur,
    qGetDetailReturFromDetailPenerimaan
}