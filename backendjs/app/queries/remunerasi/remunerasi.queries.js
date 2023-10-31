const qDaftarVerifikasi=`select row_number() OVER (ORDER BY x.noregistrasi) AS no,x.noregistrasi,to_char(x.tglregistrasi,
  'dd-MM-YYYY') as tglregistrasi,to_char(x.tglpulang,
  'dd-MM-YYYY') as tglpulang,x.nocm,x.namapasien,
x.namarekanan,x.dpjp,sum(x.total)as total from (
select td.noregistrasi,td.tglregistrasi,td.tglpulang,mp.nocm,mp.namapasien,
mp2.namarekanan,mp3.namalengkap as dpjp,tp.total,tp.norec from t_daftarpasien td
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=td.norec and ta.objectunitfk=td.objectunitlastfk
join m_pasien mp on mp.id=td.nocmfk 
join m_rekanan mp2 on mp2.id=td.objectpenjaminfk
left join m_pegawai mp3 on mp3.id=td.objectdokterpemeriksafk 
left join t_pelayananpasien tp on tp.objectantreanpemeriksaanfk=ta.norec 
where td.statusenabled=true and tp.statusenabled=true
and ta.statusenabled=true and td.tglpulang between $1 and $2
group by td.noregistrasi,td.tglregistrasi,td.tglpulang,mp.nocm,mp.namapasien,
mp2.namarekanan,mp3.namalengkap,tp.total,tp.norec
) as x
group by x.noregistrasi,x.tglregistrasi,x.tglpulang,x.nocm,x.namapasien,
x.namarekanan,x.dpjp`

export {
	qDaftarVerifikasi
}