import { dateBetweenEmptyString, emptyIlike, emptyInt } from "../../../utils/dbutils"

const qGetJenisOrder =`select
mj.id as value,
mj.reportdisplay as label
from
m_jenisordergizi mj
where
mj.statusenabled = true`

const qGetDiet = `select
md.id as value,
md.reportdisplay as label
from
m_diet md
where
md.statusenabled = true`

const qGetKategoriDiet =`
select
	md.id as value,
	md.reportdisplay as label
from
	m_kategoridiet md
where
	md.statusenabled = true`

const qGetMakanan =`select
md.id as value,
md.reportdisplay as label
from
m_makanan md
where
md.statusenabled = true`

const qGetKelas =`select
md.id as value,
md.reportdisplay as label
from
m_kelas md
where
md.statusenabled = true`

const qGetUnit =`select
md.id as value,
md.reportdisplay as label
from
m_unit md
where
md.statusenabled = true
and objectinstalasifk =2`

const qGetDaftarPasienRanap =`SELECT 
td.norec as norecdp,
ta.norec as norecta,
mj.jenispenjamin,
ta.taskid,mi.namainstalasi,
mp.nocm,
td.noregistrasi,
mp.namapasien,
to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,
mp2.namalengkap as namadokter,
mk.reportdisplay as kamar, 
mp.noidentitas as noidentitas,
mt.reportdisplay as nobed,
case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile,
false as sarapan,
false as snackpagi,
false as makansiang,
false as snacksiang,
false as makanmalam,
'' as norecsarapan,
'' as norecsnackpagi,
'' as norecmakansiang,
'' as norecsnacksiang,
'' as norecmakanmalam,
td.objectkelasfk
from t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on (
    ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE  and td.objectunitlastfk=ta.objectunitfk 
)
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
join m_instalasi mi on mi.id=mu.objectinstalasifk
join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
join m_kamar mk on ta.objectkamarfk =mk.id
join m_tempattidur mt on ta.nobed = mt.id
where td.tglpulang is null AND td.objectinstalasifk = 2 and ${emptyInt("td.objectkelasfk", "$1")}`

const qGetDaftarSudahOrder =`SELECT 
td.norec as norecdp,
ta.norec as norecta,
mj.jenispenjamin,
ta.taskid,mi.namainstalasi,
mp.nocm,
td.noregistrasi,
mp.namapasien,
to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,
mp2.namalengkap as namadokter,
mk.reportdisplay as kamar, 
mp.noidentitas as noidentitas,
mt.reportdisplay as nobed,
case when mj2.id=1 then true else false end as sarapan,
case when mj2.id=2 then true else false end as snackpagi,
case when mj2.id=3 then true else false end as makansiang,
case when mj2.id=4 then true else false end as snacksiang,
case when mj2.id=5 then true else false end as makanmalam,
to3.tglorder,td.objectkelasfk,
case when mj2.id=1 then to2.norec else '' end as norecsarapan,
case when mj2.id=2 then to2.norec else '' end as norecsnackpagi,
case when mj2.id=3 then to2.norec else '' end as norecmakansiang,
case when mj2.id=4 then to2.norec else '' end as norecsnacksiang,
case when mj2.id=5 then to2.norec else '' end as norecmakanmalam
from t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on (
    ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE  and td.objectunitlastfk=ta.objectunitfk 
)
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
join m_instalasi mi on mi.id=mu.objectinstalasifk
join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
join m_kamar mk on ta.objectkamarfk =mk.id
join m_tempattidur mt on ta.nobed = mt.id
left join t_ordergizidetail to2 on to2.objectantreanpemeriksaanfk=ta.norec 
left join t_ordergizi to3 on to3.norec=to2.objectordergizifk
left join m_jenisordergizi mj2 on mj2.id=to3.objectjenisordergizifk 
where td.tglpulang is null AND td.objectinstalasifk = 2 and ${dateBetweenEmptyString("to3.tglorder", "$1", "$2")}
and ${emptyInt("td.objectkelasfk", "$3")} and ${emptyInt("ta.objectunitfk", "$4")} and to3.statusenabled=true`

export default{
    qGetJenisOrder,
    qGetDiet,
    qGetKategoriDiet,
    qGetMakanan,
    qGetDaftarPasienRanap,
    qGetDaftarSudahOrder,
    qGetKelas,
    qGetUnit
}