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
select x.namapasien,x.noregistrasi,x.umur,x.nocm,x.norec,x.tglinput,x.tglrencana,
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
select mp.namapasien,td.noregistrasi,mp.nocm,to2.norec,to2.tglinput,to_char(to2.tglrencana,'dd Month YYYY hh:ii') as tglrencana,
mu.namaunit,to2.namaoperasi,mi.kodeexternal,
mp2.namalengkap,ms.reportdisplay as statusoperasi,
(current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY')) AS days,
to_char(mp.tgllahir, 'DD-MM-YYYY') as tgllahir,mp.objectjeniskelaminfk,
DATE_PART('year',CURRENT_DATE) - DATE_PART('year', mp.tgllahir::date) || ' Tahun' as umur from t_orderoperasi to2 
join t_antreanpemeriksaan ta on ta.norec=to2.objectantreanpemeriksaanfk
join t_daftarpasien td on td.norec=ta.objectdaftarpasienfk
join m_pasien mp on mp.id=td.nocmfk
join m_unit mu on mu.id=to2.objectunitasalfk
join m_icdx mi on mi.id=to2.objecticdxfk
join m_pegawai mp2 on mp2.id=to2.objectdokteroperatorfk
join m_statusoperasi ms on ms.id=to2.objectstatusoperasifk
where to2.tglinput between $1 and $2
) as x`

export default {
    qResult,
    qWidgetOrderOperasi,
    qDaftarOrderOperasi
}