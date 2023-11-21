import { emptyIlike, emptyInt, getStatusEnabled } from "../../../utils/dbutils"


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

export {
    qGetLayanan,
    qGetMapUnitToProduk,
    qGetLayananMapping
}