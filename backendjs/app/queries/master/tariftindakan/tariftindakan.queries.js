import { emptyIlike, emptyInt } from "../../../utils/dbutils"


const qGetTotalHargaProduk = `
SELECT
    mthp.id AS idtotalhargaproduk,
    mp.id AS idproduk,
    mp.namaproduk AS namaproduk,
    mdjp.id AS iddetailjenisproduk,
    mdjp.detailjenisproduk AS namadetailjenisproduk,
    mjp.id AS idjenisproduk,
    mjp.jenisproduk AS namajenisproduk,
    mthp.totalharga AS totalharga,
    mthp.statusenabled AS statusenabled,
    mk.namakelas AS namakelas,
    mk.id AS idkelas
FROM m_totalhargaprodukbykelas mthp
    LEFT JOIN m_produk mp ON mp.id = mthp.objectprodukfk
    LEFT JOIN m_detailjenisproduk mdjp ON mdjp.id = mp.objectdetailjenisprodukfk
    LEFT JOIN m_jenisproduk mjp ON mjp.id = mdjp.objectjenisprodukfk
    LEFT JOIN m_kelas mk ON mk.id = mthp.objectkelasfk
WHERE 
    (
        ${emptyIlike("mp.namaproduk", "$1")}
        OR
        ${emptyIlike("mp.kodeexternal", "$1")}
    )
    AND
    ${emptyInt("mthp.objectkelasfk", "$2")}
ORDER BY mthp.id ASC
`

const qGetSuratKeputusan = `
SELECT 
    msk.id AS value,
    msk.nosurat AS label,
    msk.tglberlakuawal AS tglberlakuawal,
    msk.tglberlakuakhir AS tglberlakuakhir
FROM m_suratkeputusan msk
WHERE statusenabled = TRUE
`

export {
    qGetTotalHargaProduk,
    qGetSuratKeputusan
}