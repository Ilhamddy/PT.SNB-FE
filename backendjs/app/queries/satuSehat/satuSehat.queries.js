const qGetDataPasienByNorecDp = `SELECT dp.noregistrasi,to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,
mu.namaunit,dp.ihs_id as ihs_dp, mp.namapasien,mp.ihs_id as ihs_pasien
        FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
join m_unit mu on mu.id=ta.objectunitfk
join m_pasien mp on mp.id=dp.nocmfk
where dp.norec=$1
`

export default{
    qGetDataPasienByNorecDp
}