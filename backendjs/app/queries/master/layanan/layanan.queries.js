import { checkStatusEnabled, emptyIlike, emptyInt, getStatusEnabled } from "../../../utils/dbutils"


const qGetLayanan = `
SELECT
    mp.id AS idproduk,
    mp.namaproduk AS namalayanan,
    mdjp.objectjenisprodukfk AS jenisproduk,
    mp.deskripsiproduk AS deskripsilayanan,
    mp.objectdetailjenisprodukfk AS detailjenisproduk,
    COALESCE(mp.kodeexternal, '') AS kodelayanan,
    mp.objectvariabelbpjsfk AS variabelbpjs,
    mp.objectinstalasifk AS instalasi,
    ${getStatusEnabled("mp.statusenabled")} AS statusenabled,
    FALSE AS istindakanoperasi,
    '' AS jenisoperasi
FROM m_produk mp
    LEFT JOIN m_detailjenisproduk mdjp ON mp.objectdetailjenisprodukfk = mdjp.id
WHERE mp.id = $1
`

const qGetMapUnitToProduk = `
SELECT
    mmutp.id AS idmapping,
    mp.id AS idproduk,
    mp.namaproduk AS namalayanan,
    mdjp.id AS detailjenisproduk,
    mdjp.detailjenisproduk AS namadetailjenisproduk, 
    mjp.id AS jenisproduk,
    mjp.jenisproduk AS namajenisproduk
FROM m_mapunittoproduk mmutp
    LEFT JOIN m_produk mp ON mp.id = mmutp.objectprodukfk
    LEFT JOIN m_detailjenisproduk mdjp ON mdjp.id = mp.objectdetailjenisprodukfk
    LEFT JOIN m_jenisproduk mjp ON mjp.id = mdjp.objectjenisprodukfk
WHERE 
    mmutp.objectunitfk = $1
ORDER BY
    mp.id ASC   
`

const qGetLayananMapping = `
SELECT
    mp.id AS idproduk,
    mp.namaproduk AS namalayanan,
    mdjp.objectjenisprodukfk AS jenisproduk,
    mp.deskripsiproduk AS deskripsilayanan,
    mp.objectdetailjenisprodukfk AS detailjenisproduk,
    mdjp.detailjenisproduk AS namadetailjenisproduk, 
    COALESCE(mp.kodeexternal, '') AS kodelayanan,
    mjp.jenisproduk AS namajenisproduk,
    mp.objectvariabelbpjsfk AS variabelbpjs,
    mp.objectinstalasifk AS instalasi
FROM m_produk mp
    LEFT JOIN m_detailjenisproduk mdjp ON mp.objectdetailjenisprodukfk = mdjp.id
    LEFT JOIN m_jenisproduk mjp ON mjp.id = mdjp.objectjenisprodukfk
WHERE mp.statusenabled = TRUE
    AND
        ${emptyInt("mp.objectinstalasifk", "$1")}
    AND
        ${emptyInt("mdjp.objectjenisprodukfk", "$2")}
    AND
        ${emptyInt("mdjp.id", "$3")}
    AND
        ${emptyIlike("mp.namaproduk", "$4")}
ORDER BY mp.id ASC
`

const qGetJenisProduk = `
SELECT
    mjp.id AS idjenisproduk,
    mjp.jenisproduk AS namajenisproduk,
    mjp.objectinstalasifk AS instalasi,
    ${getStatusEnabled("mjp.statusenabled")} AS statusenabledval,
    mjp.statusenabled AS statusenabled
FROM m_jenisproduk mjp
ORDER BY mjp.id ASC
`


const qGetDetailJenisProduk = `
SELECT
    mjp.id AS idjenisproduk,
    mjp.jenisproduk AS namajenisproduk,
    mjp.objectinstalasifk AS instalasi,
    mdjp.id AS iddetailjenisproduk,
    mdjp.detailjenisproduk AS namadetailjenisproduk,
    ${getStatusEnabled("mdjp.statusenabled")} AS statusenabledval,
    mdjp.statusenabled AS statusenabled
FROM m_detailjenisproduk mdjp
    LEFT JOIN m_jenisproduk mjp ON mdjp.objectjenisprodukfk = mjp.id
ORDER BY mdjp.id ASC
`

const qGetMasterLayanan = `
SELECT
    mp.id AS idproduk,
    COALESCE(mp.kodeexternal, '') AS kodeexternal,
    mp.statusenabled AS statusenabled,
    mp.namaproduk AS namaproduk,
    mdjp.id AS detailjenisproduk,
    mdjp.detailjenisproduk AS namadetailjenisproduk,
    mjp.id AS jenisproduk,
    mjp.jenisproduk AS namajenisproduk,
    mi.id AS instalasi,
    mi.namainstalasi AS namainstalasi,
    mvb.id AS variabelbpjs,
    mvb.reportdisplay AS namavariabelbpjs
FROM m_produk mp
    LEFT JOIN m_detailjenisproduk mdjp ON mp.objectdetailjenisprodukfk = mdjp.id
    LEFT JOIN m_jenisproduk mjp ON mdjp.objectjenisprodukfk = mjp.id
    LEFT JOIN m_instalasi mi ON mp.objectinstalasifk = mi.id
    LEFT JOIN m_variabelbpjs mvb ON mp.objectvariabelbpjsfk = mvb.id
WHERE
    ${checkStatusEnabled("mp.statusenabled", "$1")}
    AND 
        ${emptyIlike("mp.namaproduk", "$2")}
    AND
        mp.isobat != TRUE
    AND
        mp.isalkes != TRUE
    AND
        mp.isbmhp != TRUE
    AND
        mp.islogistik != TRUE
ORDER BY mp.id
`

export {
    qGetLayanan,
    qGetMapUnitToProduk,
    qGetLayananMapping,
    qGetJenisProduk,
    qGetDetailJenisProduk,
    qGetMasterLayanan
}