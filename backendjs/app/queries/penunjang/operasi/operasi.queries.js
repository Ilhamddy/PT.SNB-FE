const qResult =`
select mp.nocm,to2.norec,to_char(to2.tglinput,
    'dd Month YYYY hh:ii') as tglinput,to_char(to2.tglrencana,
        'dd Month YYYY hh:ii') as tglrencana,
mu.namaunit,to2.namaoperasi,mi.kodeexternal,
mp2.namalengkap,ms.reportdisplay as statusoperasi from t_orderoperasi to2 
join t_antreanpemeriksaan ta on ta.norec=to2.objectantreanpemeriksaanfk
join t_daftarpasien td on td.norec=ta.objectdaftarpasienfk
join m_pasien mp on mp.id=td.nocmfk
join m_unit mu on mu.id=to2.objectunitasalfk
join m_icdx mi on mi.id=to2.objecticdxfk
join m_pegawai mp2 on mp2.id=to2.objectdokteroperatorfk
join m_statusoperasi ms on ms.id=to2.objectstatusoperasifk
where td.nocmfk=$1`

const qWidgetOrderOperasi =`select sum(x.menunggu) as menunggu,
sum(x.verifikasi) as verifikasi,
sum(x.tolak) as tolak from (
select case when to2.objectstatusoperasifk=1 then 1 else 0 end as menunggu,
case when to2.objectstatusoperasifk not in (1,5) then 1 else 0 end as verifikasi,
case when to2.objectstatusoperasifk=5 then 1 else 0 end as tolak from t_orderoperasi to2 
join t_antreanpemeriksaan ta on ta.norec=to2.objectantreanpemeriksaanfk
join t_daftarpasien td on td.norec=ta.objectdaftarpasienfk
join m_pasien mp on mp.id=td.nocmfk
join m_unit mu on mu.id=to2.objectunitasalfk
join m_icdx mi on mi.id=to2.objecticdxfk
join m_pegawai mp2 on mp2.id=to2.objectdokteroperatorfk
join m_statusoperasi ms on ms.id=to2.objectstatusoperasifk
where to2.tglinput between $1 and $2
) as x`

const qDaftarOrderOperasi =`
select x.norecdp,x.objectkamarfk,x.catatanverif,x.objectjenisoperasifk,x.objectdokteroperatorfk,x.tglrencanax,x.objectstatusoperasifk,x.iscito,x.jenispenjamin,x.namakelas,x.pengorder,x.catatanorder,x.tglinputx,x.jeniskelamin,x.objectunitasalfk,x.colorjenisoperasi,x.jenisoperasi,x.namapasien,x.noregistrasi,x.umur,x.nocm,x.norec,x.tglinput,x.tglrencana,
x.namaunit,x.namaoperasi,x.kodeexternal,
x.namalengkap,x.statusoperasi,
case when x.days<1825 then 'baby' 
when x.days<6569 and x.objectjeniskelaminfk=1 then 'anaklaki'
when x.days<6569 and x.objectjeniskelaminfk=2 then 'anakperempuan'
when x.days<23724  and x.objectjeniskelaminfk=1 then 'dewasalaki'
when x.days<23724  and x.objectjeniskelaminfk=2 then 'dewasaperempuan'
when x.days>23724  and x.objectjeniskelaminfk=1 then 'kakek'
when x.days>23724  and x.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile,
x.tgllahir,x.objectjeniskelaminfk from(
select td.norec as norecdp,to2.objectkamarfk,to2.catatanverif,to2.objectjenisoperasifk,to2.objectdokteroperatorfk,to2.tglrencana as tglrencanax,to2.iscito,mj3.jenispenjamin,mk.namakelas,mp3.namalengkap as pengorder,to2.catatanorder,mj2.jeniskelamin,to2.objectunitasalfk,case when to2.objectjenisoperasifk=1 then '#FFB2B2' when to2.objectjenisoperasifk=2 then '#FFE0B2'
when to2.objectjenisoperasifk=3 then '#B8FFB2' else '#5AEBFF' end as colorjenisoperasi,mj.reportdisplay as jenisoperasi,mp.namapasien,td.noregistrasi,mp.nocm,to2.norec,to2.tglinput,to_char(to2.tglinput,'dd Month YYYY hh:ii') as tglinputx,to_char(to2.tglrencana,'dd Month YYYY hh:ii') as tglrencana,
mu.namaunit,to2.namaoperasi,mi.kodeexternal,
mp2.namalengkap,ms.reportdisplay as statusoperasi,to2.objectstatusoperasifk,
(current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY')) AS days,
to_char(mp.tgllahir, 'DD-MM-YYYY') as tgllahir,mp.objectjeniskelaminfk,
DATE_PART('year',CURRENT_DATE) - DATE_PART('year', mp.tgllahir::date) || ' Tahun ' ||
DATE_PART('month',CURRENT_DATE) - DATE_PART('month', mp.tgllahir::date) || ' Bulan' as umur from t_orderoperasi to2 
join t_antreanpemeriksaan ta on ta.norec=to2.objectantreanpemeriksaanfk
join t_daftarpasien td on td.norec=ta.objectdaftarpasienfk
join m_pasien mp on mp.id=td.nocmfk
join m_unit mu on mu.id=to2.objectunitasalfk
join m_icdx mi on mi.id=to2.objecticdxfk
join m_pegawai mp2 on mp2.id=to2.objectdokteroperatorfk
join m_statusoperasi ms on ms.id=to2.objectstatusoperasifk
join m_jenisoperasi mj on mj.id=to2.objectjenisoperasifk
join m_jeniskelamin mj2 on mj2.id=mp.objectjeniskelaminfk
join m_pegawai mp3 on mp3.id=to2.objectpegawaiorderfk
join m_kelas mk on mk.id=td.objectkelasfk
join m_jenispenjamin mj3 on mj3.id=td.objectjenispenjaminfk
) as x`

const qStatusVerifikasi = `select ms.id as value, ms.reportdisplay as label from m_statusverif ms `
const qPegawai = `select ms.id as value, ms.namalengkap  as label from m_pegawai ms `
const qJenisOperasi = `select ms.id as value, ms.reportdisplay  as label from m_jenisoperasi ms `
const qKamarOperasi = `select ms.id as value, ms.reportdisplay  as label from m_kamar ms where ms.objectunitfk=11`

export default {
    qResult,
    qWidgetOrderOperasi,
    qDaftarOrderOperasi,
    qStatusVerifikasi,
    qPegawai,
    qJenisOperasi,
    qKamarOperasi
}