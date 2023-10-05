const qResult =`
select mp.nocm,to2.norec,to2.tglinput,to2.tglrencana,
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

export default {
    qResult
}