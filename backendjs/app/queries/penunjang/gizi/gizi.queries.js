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

const qGetDaftarOrderGizi =`select row_number() OVER (ORDER BY to2.norec) AS no,
to2.norec,
to2.nomororder,
to2.tglorder,
mp.namalengkap as pegawai,'' as detail,to2.isverif,mp2.namalengkap as pegawaiverif
from
t_ordergizi to2
join m_pegawai mp on
mp.id = to2.objectpegawaiinputfk
left join m_pegawai mp2 on mp2.id=to2.objectpegawaiveriffk
where to2.statusenabled=true and ${dateBetweenEmptyString("to2.tglorder", "$1", "$2")}`

const qGetDaftarOrderGiziDetail =`select
false as checked,
td.noregistrasi,
mp.namapasien,
mp.nocm,
to2.nomororder,
mj.reportdisplay as jenisorder,
md.reportdisplay as diet1,
md2.reportdisplay as diet2,
md3.reportdisplay as diet3,
mk.reportdisplay as kategoridiet,
to2.keterangan,to2.norec,to3.norec as norecgizidetail
from
t_ordergizi to2
join t_ordergizidetail to3 on
to3.objectordergizifk = to2.norec
join m_jenisordergizi mj on
mj.id = to2.objectjenisordergizifk
left join m_diet md on
md.id = to2.objectdiet1fk
left join m_diet md2 on
md2.id = to2.objectdiet2fk
left join m_diet md3 on
md3.id = to2.objectdiet3fk
left join m_kategoridiet mk on
mk.id = to2.objectkategoridietfk
join t_antreanpemeriksaan ta on
ta.norec = to3.objectantreanpemeriksaanfk
join t_daftarpasien td on
td.norec = ta.objectdaftarpasienfk
join m_pasien mp on
mp.id = td.nocmfk
where to2.norec=$1 and to3.statusenabled=true`

const qGetDaftarKirimGizi =`select
false as checked,
td.noregistrasi,
mp.namapasien,
mp.nocm,
to2.nomororder,
to2.tglorder,
mj.reportdisplay as jenisorder,
md.reportdisplay as diet1,
md2.reportdisplay as diet2,
md3.reportdisplay as diet3,
mk.reportdisplay as kategoridiet,
to2.keterangan,to2.norec,to3.norec as norecgizidetail,mp2.namalengkap as pegawaiverif,
mp3.namalengkap as pegawaiorder,
to3.iscetaklabel,mp4.namalengkap as pegawailabel,to3.tglcetak,
to3.iskirim,mp5.namalengkap as pegawaikirim,to3.tglkirim
from
t_ordergizi to2
join t_ordergizidetail to3 on
to3.objectordergizifk = to2.norec
join m_jenisordergizi mj on
mj.id = to2.objectjenisordergizifk
left join m_diet md on
md.id = to2.objectdiet1fk
left join m_diet md2 on
md2.id = to2.objectdiet2fk
left join m_diet md3 on
md3.id = to2.objectdiet3fk
left join m_kategoridiet mk on
mk.id = to2.objectkategoridietfk
join t_antreanpemeriksaan ta on
ta.norec = to3.objectantreanpemeriksaanfk
join t_daftarpasien td on
td.norec = ta.objectdaftarpasienfk
join m_pasien mp on
mp.id = td.nocmfk
join m_pegawai mp2 on mp2.id=to2.objectpegawaiveriffk
join m_pegawai mp3 on
mp3.id = to2.objectpegawaiinputfk
left join m_pegawai mp4 on
mp4.id = to3.objectpegawaicetakfk
left join m_pegawai mp5 on
mp5.id = to3.objectpegawaikirimfk
where ${dateBetweenEmptyString("to2.tglorder", "$1", "$2")} and to2.statusenabled=true and to2.isverif=true and to3.statusenabled=true`

export default{
    qGetJenisOrder,
    qGetDiet,
    qGetKategoriDiet,
    qGetMakanan,
    qGetDaftarPasienRanap,
    qGetDaftarSudahOrder,
    qGetKelas,
    qGetUnit,
    qGetDaftarOrderGizi,
    qGetDaftarOrderGiziDetail,
    qGetDaftarKirimGizi
}