const qResult = `select td.noregistrasi,td.norec,td.nocmfk,
td.tglregistrasi,td.tglpulang,mp.namapasien,
mi.namainstalasi,mu.namaunit  from t_daftarpasien td 
left join m_pasien mp on mp.id=td.nocmfk
left join m_instalasi mi on mi.id=td.objectinstalasifk
left join m_unit mu on mu.id=td.objectunitlastfk 
`
export default {
    qResult
}