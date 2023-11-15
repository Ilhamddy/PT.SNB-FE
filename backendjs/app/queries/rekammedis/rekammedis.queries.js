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

const qLaporanRL3_4 =`SELECT
mm2.reportdisplay,
SUM(CASE WHEN td.objectasalrujukanfk = 2 THEN 1 ELSE 0 END) AS medis_rumahsakit,
SUM(CASE WHEN td.objectasalrujukanfk = 6 THEN 1 ELSE 0 END) AS medis_bidan,
SUM(CASE WHEN td.objectasalrujukanfk = 1 THEN 1 ELSE 0 END) AS medis_puskesmas,
SUM(CASE WHEN td.objectasalrujukanfk IN (3, 4, 7) THEN 1 ELSE 0 END) AS medis_faskeslain,
SUM(CASE WHEN 
    (mu.objectinstalasifk = 1 OR (mu.objectinstalasifk = 2 AND td.objectstatuspulangrifk <> 8))
    AND td.objectasalrujukanfk IN (1, 2, 3, 4, 6, 7)
    AND td.objectstatuspulangfk NOT IN (4, 5)
THEN 1 ELSE 0 END) AS medis_hidup,
    SUM(CASE WHEN 
    (mu.objectinstalasifk = 1 OR (mu.objectinstalasifk = 2 AND td.objectstatuspulangrifk = 8))
    AND td.objectasalrujukanfk IN (1, 2, 3, 4, 6, 7)
    AND td.objectstatuspulangfk IN (4, 5)
THEN 1 ELSE 0 END) AS medis_mati,
    SUM(CASE WHEN 
    (mu.objectinstalasifk = 1 OR (mu.objectinstalasifk = 2 AND td.objectstatuspulangrifk <> 8))
    AND td.objectasalrujukanfk not IN (1, 2, 3, 4, 6, 7)
    AND td.objectstatuspulangfk NOT IN (4, 5)
THEN 1 ELSE 0 END) AS nonrujukan_hidup,
SUM(CASE WHEN 
    (mu.objectinstalasifk = 1 OR (mu.objectinstalasifk = 2 AND td.objectstatuspulangrifk = 8))
    AND td.objectasalrujukanfk not IN (1, 2, 3, 4, 6, 7)
    AND td.objectstatuspulangfk IN (4, 5)
THEN 1 ELSE 0 END) AS nonrujukan_mati,
SUM(CASE WHEN 
    (mu.objectinstalasifk = 1 OR (mu.objectinstalasifk = 2 AND td.objectstatuspulangrifk in (3,4)))
    AND td.objectstatuspulangfk=3
THEN 1 ELSE 0 END) AS rujuk
FROM
m_maprltoproduk mm
JOIN m_masterrl mm2 ON
mm2.id = mm.objectmasterrlfk
JOIN m_masterindukrl mm3 ON
mm3.id = mm2.objectindukrlfk
JOIN t_pelayananpasien tp ON
tp.objectprodukfk = mm.objectprodukfk
JOIN t_antreanpemeriksaan ta ON ta.norec = tp.objectantreanpemeriksaanfk
JOIN t_daftarpasien td ON td.norec = ta.objectdaftarpasienfk
JOIN m_unit mu ON mu.id = td.objectunitlastfk 
WHERE
mm3.id = 9
AND tp.statusenabled = true
AND tp.tglinput BETWEEN $1 AND $2
GROUP BY
mm2.reportdisplay;

`

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

const qJumlahBedHarian =`select sum(jumlahbed) as jml from t_bedharian tb  where tglinput between $1 and $2`
const qJumlahSensusHarian = `select count(norec) as jml from t_sensusharian ts where tglinput between $1 and $2`
const qJumlahLamaRawat =`select sum(x.hari)as jml from (select tglregistrasi ,tglpulang,noregistrasi,
case when to_char(tglpulang, 'YYYY-MM-DD')=to_char(tglregistrasi, 'YYYY-MM-DD') then 1 else date_part('DAY', to_char(tglpulang, 'YYYY-MM-DD')::TIMESTAMP- to_char(tglregistrasi, 'YYYY-MM-DD')::TIMESTAMP) end as hari
from t_daftarpasien td
join m_unit mu on mu.id=td.objectunitlastfk 
where tglpulang between $1 and $2 and mu.objectinstalasifk=2 )as x`
const qJumlahPasienKeluarHidupMati =`select count(norec)as jml
from t_daftarpasien td
join m_unit mu on mu.id=td.objectunitlastfk 
where tglpulang between $1 and $2 and mu.objectinstalasifk=2`
const qJumlahPasienKeluarMatiLebih48 =`select count(norec)as jml
from t_daftarpasien td
join m_unit mu on mu.id=td.objectunitlastfk 
where tglpulang between $1 and $2 and mu.objectinstalasifk=2 and objectkondisipulangrifk=5`
const qJumlahPasienKeluarMati =`select count(norec)as jml
from t_daftarpasien td
join m_unit mu on mu.id=td.objectunitlastfk 
where tglpulang between $1 and $2 and mu.objectinstalasifk=2 and objectkondisipulangrifk in (4,5)`

const qLaporanRL1_3 =`select row_number() OVER (ORDER BY ms.reportdisplay) AS id,ms.reportdisplay,sum(case when mk.objectkelasfk=1 then 1 else 0 end)as vvip,
sum(case when mk.objectkelasfk=2 then 1 else 0 end)as vip,
sum(case when mk.objectkelasfk=3 then 1 else 0 end)as kl1,
sum(case when mk.objectkelasfk=4 then 1 else 0 end)as kl2,
sum(case when mk.objectkelasfk=5 then 1 else 0 end)as kl3,
sum(case when mk.objectkelasfk not in (1,2,3,4,5) then 1 else 0 end)as khusus,
sum(case when mk.objectkelasfk=1 then 1 else 0 end)+
sum(case when mk.objectkelasfk=2 then 1 else 0 end)+
sum(case when mk.objectkelasfk=3 then 1 else 0 end)+
sum(case when mk.objectkelasfk=4 then 1 else 0 end)+
sum(case when mk.objectkelasfk=5 then 1 else 0 end)+
sum(case when mk.objectkelasfk not in (1,2,3,4,5) then 1 else 0 end)as total from m_spesialisasi ms
join m_kamar mk on mk.objectspesialisfk=ms.id
group by ms.reportdisplay`

const qListRL2=`SELECT id,reportdisplay,0 as keadaan_lk,0 as keadaan_pm,0 as kebutuhan_lk,0 as kebutuhan_pm,
0 as kekurangan_lk,0 as kekurangan_pm,kodeexternal FROM m_pendidikanpegawai mp where statusenabled=true
order by id`

const qIsiListRL2=`select mp2.reportdisplay,sum(case when mp.objectjeniskelaminfk=1 then 1 else 0 end)as keadaan_lk,
sum(case when mp.objectjeniskelaminfk=2 then 1 else 0 end)as keadaan_pm from m_pegawai mp
join m_pendidikanpegawai mp2 on mp2.id=mp.objectpendidikanterakhirfk 
group by mp2.reportdisplay`

export default {
    qResult,
    qGetDetailFromJenisProduk,
    qLayananJenis,
    qGetMasterRLFromInduk,
    qLayananFromNoRL: qLayananFromMasterRL,
    qLaporanRL3_3,
    qLaporanRL3_4,
    qLaporanRL3_6,
    qLaporanRL3_14,
    qLaporanRL3_15,
    qDetailLaporanRL3_15,
    qLaporanRL3_11,
    qLaporanRL3_10,
    qLaporanRL5_1,
    qLaporanRL5_2,
    qLaporanRL5_3,
    qLaporanRL5_4,
    qJumlahBedHarian,
    qJumlahSensusHarian,
    qJumlahLamaRawat,
    qJumlahPasienKeluarHidupMati,
    qJumlahPasienKeluarMatiLebih48,
    qJumlahPasienKeluarMati,
    qLaporanRL1_3,
    qListRL2,
    qIsiListRL2
}