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
case when mj2.id=1 then true else false end as sarapan,
case when mj2.id=2 then true else false end as snackpagi,
case when mj2.id=3 then true else false end as makansiang,
case when mj2.id=4 then true else false end as snacksiang,
case when mj2.id=5 then true else false end as makanmalam
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
where td.tglpulang is null AND td.objectinstalasifk = 2 `

export default{
    qGetJenisOrder,
    qGetDiet,
    qGetKategoriDiet,
    qGetMakanan,
    qGetDaftarPasienRanap
}