const qResult = `select 
td.norec as norectd,
td2.objectprodukfk,
to2.objectunitasalfk,
td.noregistrasi,
to2.nomororder,
td2.norec,
mp.namalengkap, 
mu.namaunit,
to2.keterangan,
to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
mp2.namaproduk,
td2.harga ,
td2.iscito, 
td2.qty, 
td2.qty*td2.harga as total,
to_char(td2.tglperjanjian,'yyyy-MM-dd HH24:MI') as tglperjanjian,
mpeg.namalengkap as pegawaiverif, mkr.namakamar from t_daftarpasien td 
join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
join m_pegawai mp on mp.id=to2.objectpegawaifk 
join m_unit mu ON mu.id=ta.objectunitfk 
join t_detailorderpelayanan td2 on td2.objectorderpelayananfk=to2.norec 
join m_produk mp2 on mp2.id=td2.objectprodukfk 
left join m_pegawai mpeg on mpeg.id=to2.objectpegawaiveriffk
left join m_kamar mkr on mkr.id=td2.objectkamarfk
where to2.norec=$1 and td2.statusenabled=true
`

export default {
    qResult
}