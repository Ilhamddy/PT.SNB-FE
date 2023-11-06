const qDaftarVerifikasi=`select row_number() OVER (ORDER BY x.noregistrasi) AS no,x.norecdp,x.noregistrasi,to_char(x.tglregistrasi,
  'dd-MM-YYYY') as tglregistrasi,to_char(x.tglpulang,
  'dd-MM-YYYY') as tglpulang,x.nocm,x.namapasien,
x.namarekanan,x.dpjp,sum(x.total)as total from (
select td.norec as norecdp,td.noregistrasi,td.tglregistrasi,td.tglpulang,mp.nocm,mp.namapasien,
mp2.namarekanan,mp3.namalengkap as dpjp,tp.total,tp.norec from t_daftarpasien td
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=td.norec 
join m_pasien mp on mp.id=td.nocmfk 
join m_rekanan mp2 on mp2.id=td.objectpenjaminfk
left join m_pegawai mp3 on mp3.id=td.objectdokterpemeriksafk 
left join t_pelayananpasien tp on tp.objectantreanpemeriksaanfk=ta.norec 
join m_unit mu on mu.id=ta.objectunitfk
where td.statusenabled=true and tp.statusenabled=true
and ta.statusenabled=true `

const qListTagihan =`select row_number() OVER (ORDER BY tp.norec) AS no,
mu.namaunit,
to_char(tp.tglinput,'yyyy-MM-dd HH:mm') as tglinput,
mp.namaproduk,
tp.norec,
tp.harga,
tp.qty,
tp.discount,
tp.jasa,
'' as petugas,
case when tp.iscito=true then '✓' else '✕' end as statuscito,
tp.total,
'' as listpetugas
from
t_daftarpasien td
join t_antreanpemeriksaan ta on
td.norec = ta.objectdaftarpasienfk
join m_unit mu on
mu.id = ta.objectunitfk
join t_pelayananpasien tp on
tp.objectantreanpemeriksaanfk = ta.norec
join m_produk mp on
mp.id = tp.objectprodukfk
where
td.norec = $1 and tp.objectverifremunerasifk is null
and tp.statusenabled = true order by tp.tglinput asc`

const qListSudahVerifikasi= `select row_number() OVER (ORDER BY tp.norec) AS no,
mu.namaunit,
to_char(tp.tglinput,'yyyy-MM-dd HH:mm') as tglinput,
mp.namaproduk,
tp.norec,
tp.harga,
tp.qty,
tp.discount,
tp.jasa,
'' as petugas,
'' as jenispelaksana,
case when tp.iscito=true then '✓' else '✕' end as statuscito,
tp.total,
'' as listpetugas,
td.noregistrasi,
mp2.nocm,mp2.namapasien,
mp3.namalengkap  as dpjp,
0 as komperawat,0 as komjasars,0 as komdokanastesi,0 as komdokdpjp
from
t_daftarpasien td
join t_antreanpemeriksaan ta on
td.norec = ta.objectdaftarpasienfk
join m_unit mu on
mu.id = ta.objectunitfk
join t_pelayananpasien tp on
tp.objectantreanpemeriksaanfk = ta.norec
join m_produk mp on
mp.id = tp.objectprodukfk
join m_pasien mp2 on mp2.id=td.nocmfk
join m_pegawai mp3 on mp3.id=td.objectdokterpemeriksafk
where `

const qCariPetugas =`select
tp.norec,mp.namalengkap,mj.reportdisplay
from
t_pelayananpasienpetugas tp
join m_pegawai mp on mp.id=tp.objectpegawaifk
join m_jenispelaksana mj on mj.id=tp.objectjenispelaksanafk
where tp.statusenabled = true and tp.objectpelayananpasienfk=$1`

const qListKomponenTarif=`select tp.harga * tp.qty as totalkomponen,mk.reportdisplay as namakomponen,mk.id from t_pelayananpasiendetail tp 
join m_komponenproduk mk on mk.id=tp.objectkomponenprodukfk 
where objectpelayananpasienfk=$1`

export {
	qDaftarVerifikasi,
  qListTagihan,
  qListSudahVerifikasi,
  qCariPetugas,
  qListKomponenTarif
}