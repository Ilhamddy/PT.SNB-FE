import { dateBetweenEmptyString, emptyInt } from "../../../utils/dbutils"

const qGetDarahFromUnit = `
    select mp.namaproduk as label,mp.id as value,mth.objectkelasfk,mm.objectunitfk,mu.reportdisplay,mth.totalharga  from m_mapunittoproduk mm
    join m_produk mp on mp.id=mm.objectprodukfk
    join m_unit mu on mu.id=mm.objectunitfk
    join m_totalhargaprodukbykelas mth on mth.objectprodukfk=mp.id
    where mth.objectkelasfk =8 and mm.objectunitfk =28
    and mp.id=$1
`
const qGetDaftarOrderBankDarah =`select td.noregistrasi,to2.nomororder,to2.norec,
mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
ms.statusverif,to2.objectstatusveriffk  from t_daftarpasien td 
join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
join m_pegawai mp on mp.id=to2.objectpegawaifk 
join m_unit mu ON mu.id=ta.objectunitfk 
join m_statusverif ms on ms.id=to2.objectstatusveriffk
where to2.objectjenisorderfk=4 and ${dateBetweenEmptyString("to2.tglinput", "$1", "$2")}`

export default{
    qGetDarahFromUnit,
    qGetDaftarOrderBankDarah
}