const qGetOrderFromDP = `
SELECT 
    td.noregistrasi,
    to2.nomororder,
    to2.norec,
    mp.namalengkap, 
    mu.namaunit,
    to2.keterangan,
    to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput 
FROM t_daftarpasien td 
    join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
    join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
    join m_pegawai mp on mp.id=to2.objectpegawaifk 
    join m_unit mu ON mu.id=ta.objectunitfk 
WHERE td.norec=$1 and to2.objectjenisorderfk=2
`

const qGetListOrderFromNorec = `
SELECT 
    mp.namaproduk 
FROM t_detailorderpelayanan td  
    LEFT JOIN m_produk mp on mp.id=td.objectprodukfk 
WHERE td.objectorderpelayananfk =$1`

export default {
    qGetOrderFromDP,
    qGetListOrderFromNorec
}