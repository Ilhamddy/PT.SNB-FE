

const qGetJenisDetailProdukLainLain = `
    SELECT
    mdjp.id AS id,
    mdjp.statusenabled AS statusenabled,
    mdjp.detailjenisproduk AS detailjenisproduk,
    mjp.jenisproduk AS jenisproduk
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
    mjs.jenissatuan AS jenissatuan
    FROM m_satuan msat
        LEFT JOIN m_jenissatuan mjs ON mjs.id = msat.objectjenissatuanfk
`

const qGetProduk = `
    SELECT
    mp.id AS id,
    mp.statusenabled AS statusenabled,
    mp.kdprofile AS kdprofile,
    mp.namaproduk AS namaproduk
        FROM m_produk mp
`

export {
    qGetJenisDetailProdukLainLain,
    qGetSediaanLainLain,
    qGetSatuanLainLain,
    qGetProduk
}