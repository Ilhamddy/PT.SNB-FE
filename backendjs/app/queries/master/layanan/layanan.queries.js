import { getStatusEnabled } from "../../../utils/dbutils"


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

export {
    qGetLayanan
}