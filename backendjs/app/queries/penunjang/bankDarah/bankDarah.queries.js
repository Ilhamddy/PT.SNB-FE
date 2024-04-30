import { dateBetweenEmptyString, emptyIlike, emptyInt } from "../../../utils/dbutils"

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

const qGetDaftarOrderBankDarahByNorec =`select td.noregistrasi,td.norec as norectd,to2.nomororder,td2.norec,
mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
mp2.namaproduk,td2.harga ,td2.iscito, td2.qty, td2.qty*td2.harga as total,
to_char(td2.tglperjanjian,'yyyy-MM-dd HH24:MI') as tglperjanjian,
mpeg.namalengkap as pegawaiverif, mkr.namakamar,to2.objectunitasalfk,td2.objectprodukfk from t_daftarpasien td 
join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
join m_pegawai mp on mp.id=to2.objectpegawaifk 
join m_unit mu ON mu.id=ta.objectunitfk 
join t_detailorderpelayanan td2 on td2.objectorderpelayananfk=to2.norec 
join m_produk mp2 on mp2.id=td2.objectprodukfk 
left join m_pegawai mpeg on mpeg.id=to2.objectpegawaiveriffk
left join m_kamar mkr on mkr.id=td2.objectkamarfk
where to2.norec=$1 and td2.statusenabled=true`

const qGetDaftarPasienBankDarah = `SELECT 
mu2.namaunit as unitasal,
ta.tglmasuk,
td.norec as norecdp,
ta.norec as norecta,
mj.jenispenjamin,
ta.taskid,
mi.namainstalasi,
mp.nocm,
td.noregistrasi,
mp.namapasien,
to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,
mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,
mp2.namalengkap as namadokter,
trm.objectstatuskendalirmfk as objectstatuskendalirmfkap, 
trm.norec as norectrm,to_char(td.tglpulang,'yyyy-MM-dd') as tglpulang,
case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile 
FROM t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
join m_instalasi mi on mi.id=mu.objectinstalasifk
join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
left join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec
left join m_unit mu2 on mu2.id=ta.objectunitasalfk 
where 
${emptyIlike("td.noregistrasi", "$1")}
AND ${dateBetweenEmptyString("ta.tglmasuk", "$2", "$3")}
AND mu.id =28`

export default{
    qGetDarahFromUnit,
    qGetDaftarOrderBankDarah,
    qGetDaftarOrderBankDarahByNorec,
    qGetDaftarPasienBankDarah
}