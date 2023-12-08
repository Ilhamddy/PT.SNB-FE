const qGetDataPasienByNorecDp = `SELECT dp.noregistrasi,to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,
mu.namaunit,dp.ihs_id as ihs_dp, mp.namapasien,mp.ihs_id as ihs_pasien
        FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
join m_unit mu on mu.id=ta.objectunitfk
join m_pasien mp on mp.id=dp.nocmfk
where dp.norec=$1
`
const qGetDataPasienByNorecDpTrm =`
SELECT dp.noregistrasi,to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,
mu.namaunit,dp.ihs_id as ihs_dp, mp.namapasien,mp.ihs_id as ihs_pasien,
dp.tglregistrasi as tglregistrasi_ihs,trm.tgldikirim,trm.tglditerimapoli,
mu.ihs_id as ihs_unit,dp.tglpulang,mp2.ihs_id as ihs_dpjp,mp2.namalengkap as namadokter
        FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
join m_unit mu on mu.id=ta.objectunitfk
join m_pasien mp on mp.id=dp.nocmfk
join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk
where dp.norec=$1`

const qListDiagnosa = `SELECT row_number() OVER (ORDER BY td.norec) AS no,dp.noregistrasi,
to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,td.norec, mi.kodeexternal ||' - '|| mi.reportdisplay as label,
mi.id as value, td.keterangan,td.objecttipediagnosafk,mt.reportdisplay as tipediagnosa,
td.objectjeniskasusfk, jk.reportdisplay as jeniskasus, mu.namaunit, mi.kodeexternal as kodediagnosa,
dp.ihs_id as ihs_dp,td.ihs_id as ihs_diagnosa, mp.namapasien,mp.ihs_id as ihs_pasien,dp.norec as norecdp
FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
join t_diagnosapasien td  on td.objectantreanpemeriksaanfk =ta.norec
join m_unit mu on mu.id=ta.objectunitfk
join m_tipediagnosa mt on mt.id=td.objecttipediagnosafk
join m_jeniskasus jk on jk.id=td.objectjeniskasusfk
join m_icdx mi on mi.id=td.objecticdxfk
join m_pasien mp on mp.id=dp.nocmfk where dp.norec=$1 and td.statusenabled=true
order by td.objecttipediagnosafk asc`

export default{
    qGetDataPasienByNorecDp,
    qGetDataPasienByNorecDpTrm,
    qListDiagnosa
}