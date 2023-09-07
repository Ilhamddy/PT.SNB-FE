const qResult = `select td.noregistrasi,td.norec,td.nocmfk,
to_char(td.tglregistrasi,'dd Month YYYY') as tglregistrasi,to_char(td.tglpulang,'dd Month YYYY') as tglpulang,mp.namapasien,
mi.namainstalasi,mu.namaunit,mp.nocm,mr.namarekanan,mp2.namalengkap  from t_daftarpasien td 
left join m_pasien mp on mp.id=td.nocmfk
left join m_instalasi mi on mi.id=td.objectinstalasifk
left join m_unit mu on mu.id=td.objectunitlastfk
left join m_rekanan mr on td.objectpenjaminfk=mr.id
left join m_pegawai mp2 on mp2.id=td.objectpegawaifk
where td.tglregistrasi between $1 and $2 and td.noregistrasi ilike $3 
`

export default {
    qResult,
}