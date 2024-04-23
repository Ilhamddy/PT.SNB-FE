import { emptyInt } from "../../../utils/dbutils"

const qGetDarahFromUnit = `
    select mp.namaproduk as label,mp.id as value,mth.objectkelasfk,mm.objectunitfk,mu.reportdisplay,mth.totalharga  from m_mapunittoproduk mm
    join m_produk mp on mp.id=mm.objectprodukfk
    join m_unit mu on mu.id=mm.objectunitfk
    join m_totalhargaprodukbykelas mth on mth.objectprodukfk=mp.id
    where mth.objectkelasfk =8 and mm.objectunitfk =28
    and mp.id=$1
`

export default{
    qGetDarahFromUnit
}