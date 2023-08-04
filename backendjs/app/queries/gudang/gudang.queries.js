

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
`

const qGetProdukEdit = `
    SELECT
    *
        FROM m_produk
            WHERE id = $1
`

const qGetSatuanFromProduk = `
    SELECT
    mkp.id AS value,
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
        'satuanjual', msk.id,
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
    tpbd.total AS totalproduk
        FROM t_penerimaanbarangdetail tpbd
        JOIN m_produk mp ON mp.id = tpbd.objectprodukfk
        LEFT JOIN m_satuan ms ON ms.id = tpbd.objectsatuanfk
        JOIN m_satuan msp ON msp.id = mp.objectsatuanstandarfk
        JOIN m_satuan msk ON msk.id = tpbd.objectsatuanfk
            WHERE tpbd.objectpenerimaanbarangfk = $1
`


const qGetPenerimaan = `
    SELECT
    tpb.norec AS norecpenerimaan,
    tpb.no_terima AS nomorterima,
    tpb.tglterima AS tanggalterima,
    tpb.objectrekananfk AS namasupplier,
    tpb.no_order AS nomorpo,
    tpb.tglorder AS tanggalpesan,
    tpb.objectunitfk AS unitpesan,
    tpb.tgljatuhtempo AS tanggaljatuhtempo,
    tpb.objectasalprodukfk AS sumberdana,
    tpb.keterangan AS keterangan,
    '' as subtotal,
    '' as ppnrupiah,
    '' as diskonrupiah,
    '' as total
        FROM t_penerimaanbarang tpb
            WHERE tpb.norec = $1
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
    qGetPenerimaan
}