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



const qGetDetailFromJenisProduk = `
SELECT 
    mdjp.namaexternal AS label,
    mdjp.id AS value
FROM m_detailjenisproduk mdjp
WHERE objectjenisprodukfk = $1
AND statusenabled = true
`

const qLayananJenis = `
SELECT
    CAST(row_number() OVER (ORDER BY mpr.id) AS INT)  AS no,
    mpr.id AS idproduk,
    mpr.namaproduk AS namaproduk,
    mdp.detailjenisproduk AS detailjenisproduk,
    mjp.jenisproduk AS jenisproduk,
    mi.namainstalasi AS instalasi
FROM m_produk mpr
    LEFT JOIN m_detailjenisproduk mdp ON mdp.id = mpr.objectdetailjenisprodukfk
    LEFT JOIN m_jenisproduk mjp ON mjp.id = mdp.objectjenisprodukfk
    LEFT JOIN m_instalasi mi ON mi.id = mpr.objectinstalasifk
WHERE mpr.objectdetailjenisprodukfk = $1
AND mpr.statusenabled = true
ORDER BY mpr.id
`

const qLayananFromMasterRL = `
SELECT
    CAST(row_number() OVER (ORDER BY mpr.id) AS INT)  AS no,
    mpr.id AS idproduk,
    mpr.namaproduk AS namaproduk,
    mdp.detailjenisproduk AS detailjenisproduk,
    mjp.jenisproduk AS jenisproduk,
    mi.namainstalasi AS instalasi,
    mprl.id AS idmaprl
FROM m_maprltoproduk mprl
    LEFT JOIN m_produk mpr ON mpr.id = mprl.objectprodukfk
    LEFT JOIN m_detailjenisproduk mdp ON mdp.id = mpr.objectdetailjenisprodukfk
    LEFT JOIN m_jenisproduk mjp ON mjp.id = mdp.objectjenisprodukfk
    LEFT JOIN m_instalasi mi ON mi.id = mpr.objectinstalasifk
WHERE mprl.objectmasterrlfk = $1
AND mpr.statusenabled = true
ORDER BY mpr.id
`


const qGetMasterRLFromInduk = `
SELECT
    id AS value,
    kodeexternal || ' - ' || reportdisplay as label 
FROM m_masterrl
WHERE objectindukrlfk = $1
AND statusenabled = true
`

const qLaporanRL3_3 =`select row_number() OVER (ORDER BY x.reportdisplay) AS no,x.reportdisplay,count(x.reportdisplay) as jml from (
    SELECT mm2.reportdisplay  from m_maprltoproduk mm
    join m_masterrl mm2 on mm2.id=mm.objectmasterrlfk
    join m_masterindukrl mm3 on mm3.id=mm2.objectindukrlfk
    join t_pelayananpasien tp on tp.objectprodukfk=mm.objectprodukfk 
    where mm3.id=8 and tp.statusenabled=true and tp.tglinput between $1 and $2
    ) as x group by x.reportdisplay`

const qLaporanRL3_6 =`SELECT row_number() OVER (ORDER BY ms.reportdisplay) AS no,ms.reportdisplay AS spesialis,
SUM(CASE WHEN mp2.kodeexternal = '1' THEN 1 ELSE 0 END) AS besar_count,
SUM(CASE WHEN mp2.kodeexternal = '2' THEN 1 ELSE 0 END) AS sedang_count,
SUM(CASE WHEN mp2.kodeexternal = '3' THEN 1 ELSE 0 END) AS kecil_count,
SUM(CASE WHEN mp2.kodeexternal = '4' THEN 1 ELSE 0 END) AS khusus_count,
(SUM(CASE WHEN mp2.kodeexternal = '1' THEN 1 ELSE 0 END) +
 SUM(CASE WHEN mp2.kodeexternal = '2' THEN 1 ELSE 0 END) +
 SUM(CASE WHEN mp2.kodeexternal = '3' THEN 1 ELSE 0 END) +
 SUM(CASE WHEN mp2.kodeexternal = '4' THEN 1 ELSE 0 END)) AS total
FROM t_pelayananpasien tp
JOIN t_pelayananpasienpetugas tp2 ON tp2.objectpelayananpasienfk = tp.norec
JOIN m_pegawai mp ON mp.id = tp2.objectpegawaifk
JOIN m_spesialisasi ms ON ms.id = mp.objectspesialisasifk
JOIN m_produk mp2 ON mp2.id = tp.objectprodukfk
JOIN t_antreanpemeriksaan ta ON ta.norec = tp.objectantreanpemeriksaanfk
JOIN m_unit mu ON mu.id = ta.objectunitfk
WHERE mu.objectinstalasifk = 6 and tp.tglinput between $1 and $2
AND mp2.kodeexternal IN ('1', '2', '3', '4')
AND tp.statusenabled = true
GROUP BY ms.reportdisplay`

const qLaporanRL3_14 =`select row_number() OVER (ORDER BY ms.reportdisplay) AS no,ms.reportdisplay as spesialis,
SUM(CASE WHEN td.objectasalrujukanfk  = 1 THEN 1 ELSE 0 END) AS diterima_puskesmas,
SUM(CASE WHEN td.objectasalrujukanfk  = 2 THEN 1 ELSE 0 END) AS diterima_rs,
SUM(CASE WHEN td.objectasalrujukanfk in (3,4,5,6,7) THEN 1 ELSE 0 END) AS diterima_faskeslain,
0 as dikembalikan_kepuskesmas,0 as dikembalikan_kefaskeslain, 0 as dikembalikan_kersasal,
(SUM(case when td.objectstatuspulangfk=3 and td.objectasalrujukanfk in (1,2,3,6) THEN 1 ELSE 0 end)+
SUM(case when td.objectstatuspulangrifk in (3,4) and td.objectasalrujukanfk in (1,2,3,6) THEN 1 ELSE 0 end)) as dirujuk_pasienrujukan,
(SUM(case when td.objectstatuspulangfk=5 and td.objectasalrujukanfk in (1,2,3,6) THEN 1 ELSE 0 end)+
SUM(case when td.objectstatuspulangrifk=5 and td.objectasalrujukanfk in (1,2,3,6) THEN 1 ELSE 0 end)) as dirujuk_datangsendiri,
(SUM(case when td.objectstatuspulangfk=2 and td.objectasalrujukanfk in (1,2,3,6) THEN 1 ELSE 0 end)+
SUM(case when td.objectstatuspulangrifk=2 and td.objectasalrujukanfk in (1,2,3,6) THEN 1 ELSE 0 end)) as dirujuk_diterimakembali
from t_daftarpasien td 
join m_pegawai mp on mp.id=td.objectdokterpemeriksafk
join m_spesialisasi ms on ms.id=mp.objectspesialisasifk
where td.statusenabled=true and td.tglpulang between $1 and $2
GROUP BY ms.reportdisplay
order by ms.reportdisplay`

const qLaporanRL3_15 =`SELECT row_number() OVER (ORDER BY mr.namarekanan) AS no,mr.namarekanan as cara_bayar,sum(case when mu.objectinstalasifk=2 then 1 else 0 end) as jumlah_pasien_Keluar,
sum(case when mu.objectinstalasifk=4 then 1 else 0 end) as Laboratorium,
sum(case when mu.objectinstalasifk=3 then 1 else 0 end) as Radiologi,
sum(case when mu.objectinstalasifk not in (2,3,4) then 1 else 0 end) as Lain_lain,
(sum(case when mu.objectinstalasifk=4 then 1 else 0 end)+
sum(case when mu.objectinstalasifk=3 then 1 else 0 end)+
sum(case when mu.objectinstalasifk not in (2,3,4) then 1 else 0 end)) as jumlah_pasien_rj,
0 as jumlah_lama_dirawat
FROM t_daftarpasien td
JOIN m_rekanan mr ON td.objectpenjaminfk = mr.id
join m_unit mu on mu.id=td.objectunitlastfk
WHERE td.statusenabled = true AND td.tglpulang between  $1 and $2
GROUP BY mr.namarekanan;`

const qDetailLaporanRL3_15 =`SELECT mr.namarekanan, td.tglregistrasi ,td.tglpulang,
to_char( td.tglregistrasi, TO_CHAR(age( td.tglregistrasi,  td.tglpulang), 'DD')) AS los
FROM t_daftarpasien td
JOIN m_rekanan mr ON td.objectpenjaminfk = mr.id
WHERE td.statusenabled = true AND td.tglpulang between  $1 and $2
order by mr.namarekanan `

const qLaporanRL3_11 =`select row_number() OVER (ORDER BY x.reportdisplay) AS no,x.reportdisplay,count(x.reportdisplay) as jml from (
    SELECT mm2.reportdisplay  from m_maprltoproduk mm
    join m_masterrl mm2 on mm2.id=mm.objectmasterrlfk
    join m_masterindukrl mm3 on mm3.id=mm2.objectindukrlfk
    join t_pelayananpasien tp on tp.objectprodukfk=mm.objectprodukfk 
    where mm3.id=16 and tp.statusenabled=true and tp.tglinput between $1 and $2
    ) as x group by x.reportdisplay`

const qLaporanRL3_10 =`select row_number() OVER (ORDER BY x.reportdisplay) AS no,x.reportdisplay,count(x.reportdisplay) as jml from (
    SELECT mm2.reportdisplay  from m_maprltoproduk mm
    join m_masterrl mm2 on mm2.id=mm.objectmasterrlfk
    join m_masterindukrl mm3 on mm3.id=mm2.objectindukrlfk
    join t_pelayananpasien tp on tp.objectprodukfk=mm.objectprodukfk 
    where mm3.id=15 and tp.statusenabled=true and tp.tglinput between $1 and $2
    ) as x group by x.reportdisplay`

const qLaporanRL5_1 =`select row_number() OVER (ORDER BY x.statuspasien) AS no,x.statuspasien,count(*) as jml from(
    select case when td.statuspasien is null or td.statuspasien='LAMA' then 'LAMA' else td.statuspasien end as statuspasien
    from t_daftarpasien td
    where td.statusenabled=true and td.tglpulang between $1 and $2
    )as x group by x.statuspasien`

const qLaporanRL5_2=`select row_number() OVER (ORDER BY ms.reportdisplay) AS no,ms.reportdisplay as spesialis,count(*) as jml
    from t_daftarpasien td
    join m_unit mu on mu.id=td.objectunitlastfk
    join m_pegawai mp on mp.id=td.objectdokterpemeriksafk
    join m_spesialisasi ms on ms.id=mp.objectspesialisasifk
    where td.statusenabled=true and mu.objectinstalasifk=1 and td.tglpulang between $1 and $2
    group by  ms.reportdisplay
    order by ms.reportdisplay`

const qLaporanRL5_3 =`SELECT row_number() OVER (ORDER BY mi.kdicdx) AS id,mi.kdicdx, mi.namaicdx,
SUM(CASE WHEN td2.objectcarapulangrifk <> 4 AND mp.objectjeniskelaminfk = 1 THEN 1 ELSE 0 END) AS ph_lk,
SUM(CASE WHEN td2.objectcarapulangrifk <>4 AND mp.objectjeniskelaminfk = 2 THEN 1 ELSE 0 END) AS ph_pl,
SUM(CASE WHEN td2.objectcarapulangrifk = 4 AND mp.objectjeniskelaminfk = 1 THEN 1 ELSE 0 END) AS pm_lk,
SUM(CASE WHEN td2.objectcarapulangrifk = 4 AND mp.objectjeniskelaminfk = 2 THEN 1 ELSE 0 END) AS pm_pl,
SUM(CASE WHEN td2.objectcarapulangrifk <> 4 AND mp.objectjeniskelaminfk = 1 THEN 1 ELSE 0 END) +
SUM(CASE WHEN td2.objectcarapulangrifk <>4 AND mp.objectjeniskelaminfk = 2 THEN 1 ELSE 0 END) +
SUM(CASE WHEN td2.objectcarapulangrifk = 4 AND mp.objectjeniskelaminfk = 1 THEN 1 ELSE 0 END) +
SUM(CASE WHEN td2.objectcarapulangrifk = 4 AND mp.objectjeniskelaminfk = 2 THEN 1 ELSE 0 END) AS total
FROM t_antreanpemeriksaan ta
JOIN t_diagnosapasien td ON td.objectantreanpemeriksaanfk = ta.norec
JOIN m_icdx mi ON mi.id = td.objecticdxfk
JOIN t_daftarpasien td2 ON td2.norec = ta.objectdaftarpasienfk AND td2.objectunitlastfk = ta.objectunitfk
JOIN m_unit mu ON ta.objectunitfk = mu.id
JOIN m_pasien mp ON mp.id = td2.nocmfk
WHERE mu.objectinstalasifk = 2 AND td2.statusenabled =true AND td2.tglpulang between $1 and $2
GROUP BY mi.kdicdx, mi.namaicdx
order by total desc`

const qLaporanRL5_4 =`SELECT row_number() OVER (ORDER BY mi.kdicdx) AS id,mi.kdicdx, mi.namaicdx,
SUM(CASE WHEN td2.objectcarapulangrifk <> 4 AND mp.objectjeniskelaminfk = 1 THEN 1 ELSE 0 END) AS ph_lk,
SUM(CASE WHEN td2.objectcarapulangrifk <>4 AND mp.objectjeniskelaminfk = 2 THEN 1 ELSE 0 END) AS ph_pl,
SUM(CASE WHEN td2.objectcarapulangrifk = 4 AND mp.objectjeniskelaminfk = 1 THEN 1 ELSE 0 END) AS pm_lk,
SUM(CASE WHEN td2.objectcarapulangrifk = 4 AND mp.objectjeniskelaminfk = 2 THEN 1 ELSE 0 END) AS pm_pl,
SUM(CASE WHEN td2.objectcarapulangrifk <> 4 AND mp.objectjeniskelaminfk = 1 THEN 1 ELSE 0 END) +
SUM(CASE WHEN td2.objectcarapulangrifk <>4 AND mp.objectjeniskelaminfk = 2 THEN 1 ELSE 0 END) +
SUM(CASE WHEN td2.objectcarapulangrifk = 4 AND mp.objectjeniskelaminfk = 1 THEN 1 ELSE 0 END) +
SUM(CASE WHEN td2.objectcarapulangrifk = 4 AND mp.objectjeniskelaminfk = 2 THEN 1 ELSE 0 END) AS total
FROM t_antreanpemeriksaan ta
JOIN t_diagnosapasien td ON td.objectantreanpemeriksaanfk = ta.norec
JOIN m_icdx mi ON mi.id = td.objecticdxfk
JOIN t_daftarpasien td2 ON td2.norec = ta.objectdaftarpasienfk AND td2.objectunitlastfk = ta.objectunitfk
JOIN m_unit mu ON ta.objectunitfk = mu.id
JOIN m_pasien mp ON mp.id = td2.nocmfk
WHERE mu.objectinstalasifk = 1 AND td2.statusenabled =true AND td2.tglpulang between $1 and $2
GROUP BY mi.kdicdx, mi.namaicdx
order by total desc`

export default {
    qResult,
    qGetDetailFromJenisProduk,
    qLayananJenis,
    qGetMasterRLFromInduk,
    qLayananFromNoRL: qLayananFromMasterRL,
    qLaporanRL3_3,
    qLaporanRL3_6,
    qLaporanRL3_14,
    qLaporanRL3_15,
    qDetailLaporanRL3_15,
    qLaporanRL3_11,
    qLaporanRL3_10,
    qLaporanRL5_1,
    qLaporanRL5_2,
    qLaporanRL5_3,
    qLaporanRL5_4
}