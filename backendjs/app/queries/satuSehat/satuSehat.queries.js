const qGetDataPasienByNorecDp = `SELECT dp.noregistrasi,to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,
mu.namaunit,dp.ihs_id as ihs_dp, mp.namapasien,mp.ihs_id as ihs_pasien
        FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
join m_unit mu on mu.id=ta.objectunitfk
join m_pasien mp on mp.id=dp.nocmfk
where dp.norec=$1
`
const qGetDataPasienByNorecDpTrm =`
SELECT current_timestamp as datenow,dp.noregistrasi,to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,
mu.namaunit,dp.ihs_id as ihs_dp, mp.namapasien,mp.ihs_id as ihs_pasien,
dp.tglregistrasi as tglregistrasi_ihs,trm.tgldikirim,case when trm.tglditerimapoli is null then current_timestamp else 
trm.tglditerimapoli end as tglditerimapoli,
mu.ihs_id as ihs_unit,dp.tglpulang,mp2.ihs_id as ihs_dpjp,mp2.namalengkap as namadokter,mu.objectinstalasifk,
to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY')) AS tahun,
to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'mm')) AS bulan,
to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'DD')) AS hari,
'Bed '||mt.reportdisplay  ||' Kamar '||mk.namakamar ||', '||mi.namainstalasi ||', '||mk2.namakelas as description,
mt.ihs_id as ihs_tempattidur,mk2.namakelas,mk2.kelas_bpjs,dp.ihs_reference
        FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec and ta.objectunitfk=dp.objectunitlastfk
join m_unit mu on mu.id=ta.objectunitfk
join m_pasien mp on mp.id=dp.nocmfk
left join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk
left join m_kamar mk on mk.id=ta.objectkamarfk
left join m_tempattidur mt on mt.id=ta.nobed 
join m_instalasi mi on mi.id=mu.objectinstalasifk
left join m_kelas mk2 on mk2.id=mk.objectkelasfk
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

const qDataTTVByNorec = `SELECT row_number() OVER (ORDER BY tt.norec) AS no,dp.noregistrasi,
to_char(dp.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,tt.norec, tt.objectemrfk, tt.tinggibadan,
tt.beratbadan, tt.suhu,tt.e, tt.m, tt.v, tt.nadi, tt.alergi, tt.tekanandarah, tt.spo2, 
tt.pernapasan,tt.keadaanumum, tt.objectpegawaifk, tt.isedit, tt.objectttvfk, tt.tglisi,
mu.namaunit,mr.reportdisplay as namagcs,tt.ihs_nadi,tt.ihs_pernapasan,case when tt.status_ihs_nadi=true then 'btn-soft-info' else 'btn-soft-danger'
end as status_nadi,case when tt.status_ihs_pernapasan=true then 'btn-soft-info' else 'btn-soft-danger'
end as status_pernafasan,case when tt.status_ihs_suhu=true then 'btn-soft-info' else 'btn-soft-danger'
end as status_suhu,tt.ihs_suhu,tt.sistole || '/'||tt.diastole as sistolediastole,tt.sistole,tt.diastole,
case when tt.status_ihs_sistole=true then 'btn-soft-info' else 'btn-soft-danger'
end as status_sistole,
case when tt.status_ihs_diastole=true then 'btn-soft-info' else 'btn-soft-danger'
end as status_diastole,tt.ihs_sistole,tt.ihs_diastole,mh.code as codenadi,mh.display as displaynadi,mh.teks as teksnadi,
mh2.code as codepernapasan,mh2.display as displaypernapasan,mh2.teks as tekspernapasan,
mh3.code as codesuhu,mh3.display as displaysuhu,mh3.teks as tekssuhu,
mh4.code as codesistol,mh4.display as displaysistol,mh4.teks as tekssistol,
mh5.code as codediastol,mh5.display as displaydiastol,mh5.teks as teksdiastol
        FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
join t_ttv tt on tt.objectemrfk =te.norec
join m_unit mu on mu.id=ta.objectunitfk
join m_hasilnilaittv mh on mh.id=tt.objecthasilnadifk
join m_hasilnilaittv mh2 on mh2.id=tt.objecthasilpernapasanfk
join m_hasilnilaittv mh3 on mh3.id=tt.objecthasilsuhufk
join m_hasilnilaittv mh4 on mh4.id=tt.objecthasilsistolfk
join m_hasilnilaittv mh5 on mh5.id=tt.objecthasildiastolfk
left join m_range mr on mr.id=tt.objectgcsfk where tt.norec=$1 and tt.statusenabled=true`

export default{
    qGetDataPasienByNorecDp,
    qGetDataPasienByNorecDpTrm,
    qListDiagnosa,
    qDataTTVByNorec
}