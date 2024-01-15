import { dateBetweenEmptyString,emptyIlike, emptyInt } from "../../utils/dbutils"
import { qGetOrderResep, qGetVerifResep } from "../farmasi/farmasi.queries"

const qGetObatFromUnit = `
SELECT
    tsu.objectprodukfk AS value,
    mp.namaproduk AS label,
    ms.id AS satuanid,
    ms.satuan AS namasatuan,
    msd.id AS sediaanid,
    msd.sediaan AS namasediaan,
    json_agg(
        json_build_object(
            'norecstokunit', tsu.norec,
            'harga', tsu.harga,
            'qty', tsu.qty,
            'nobatch', tsu.nobatch
        )
    ) AS batchstokunit,
    sum(tsu.qty) AS totalstok
FROM t_stokunit tsu
    LEFT JOIN m_produk mp ON mp.id = tsu.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msd ON msd.id = mp.objectsediaanfk
WHERE ${emptyInt("tsu.objectunitfk", "$1")}
    AND tsu.qty > 0
    AND tsu.statusenabled = true
    AND
    CASE WHEN $2 = true 
        THEN mp.objectgolonganobatfk = 2
        ELSE true
    END
GROUP BY 
    tsu.objectprodukfk, 
    mp.namaproduk,
    ms.id,
    ms.satuan,
    msd.id,
    msd.sediaan
`

const qGetAllObat = `
SELECT
    mp.id AS value,
    mp.namaproduk AS label,
    ms.id AS satuanid,
    ms.satuan AS namasatuan,
    msd.id AS sediaanid,
    msd.sediaan AS namasediaan
FROM m_produk mp
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msd ON msd.id = mp.objectsediaanfk
WHERE mp.statusenabled = TRUE
    AND mp.isobat = TRUE
`

const qGetOrderResepFromDP = qGetOrderResep + `
WHERE CASE 
    -- $1: 'norecresep', 'norecdp', 'all'
    WHEN $1 = 'all' 
        THEN tor.statusenabled = true
    WHEN $1 = 'norecresep' 
        THEN tor.norec = $2
    ELSE 
        tdp.norec = $3 AND tor.statusenabled = true
END
GROUP BY
    tor.norec,
    mpeg.id,
    mpeg.namalengkap,
    mu.id,
    mu.namaunit,
    tdp.objectunitlastfk,
    tdp.objectpenjaminfk
ORDER BY
    tor.tglinput DESC
`

const qGetAllOrderResepFromDate = qGetOrderResep + `
WHERE tor.statusenabled = true AND
    ${dateBetweenEmptyString("tor.tglinput", "$1", "$2")}
GROUP BY
    tor.norec,
    mpeg.id,
    mpeg.namalengkap,
    mu.id,
    mu.namaunit,
    tdp.objectunitlastfk,
    tdp.objectpenjaminfk
ORDER BY
    tor.tglinput DESC
`

const qGetOrderVerifResepFromDP = qGetVerifResep + `
WHERE CASE 
    -- $1: 'norecresep', 'norecdp', 'all'
    WHEN $1 = 'all' THEN tor.statusenabled = true 
    WHEN $1 = 'norecresep' THEN tor.norec = $2
    ELSE tdp.norec = $3
END
    AND tor.no_resep IS NOT NULL
GROUP BY
    tor.norec,
    mpeg.id,
    mpeg.namalengkap,
    mu.id,
    mu.namaunit,
    tdp.objectunitlastfk,
    tdp.objectpenjaminfk
`


const qGetAntreanFromNorec = `
SELECT
    row_number() OVER (ORDER BY tap.tglmasuk) AS no,
    tap.norec AS norecap,
    tap.tglmasuk AS tanggalmasuk,
    tdp.tglregistrasi AS tanggalregistrasi,
    tap.tglkeluar AS tanggalkeluar,
    tdp.objectpenjaminfk AS penjamin,
    mr.namarekanan AS namarekanan,
    mu.namaunit AS namaunit,
    muasal.namaunit AS namaunitasal
FROM t_antreanpemeriksaan tap
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_rekanan mr ON tdp.objectpenjaminfk = mr.id
    LEFT JOIN m_unit mu ON mu.id = tap.objectunitfk
    LEFT JOIN m_unit muasal ON muasal.id = tap.objectunitasalfk
WHERE tap.norec = $1
    AND tap.statusenabled = true
ORDER BY tap.tglmasuk
`
const qAsesmenBayiLahirByNorec =`select ta.norec,ta.responden,
ta.objecthubungankeluargafk,
ta.anamnesa,
ta.gravida,
ta.partus,
ta.abortus,
ta.keadaanibu,
ta.tempatpersalinan,
ta.penolong,
ta.ketubanpecah,
ta.airketuban,
ta.lahir,
ta.lamapersalinan,
ta.macampersalinan,
ta.indikasi,
ta.objectjeniskelaminfk,
ta.keadaan,
ta.berat,
ta.panjang,
ta.lingkardada,
ta.lingkarkepala,
ta.lahirmeninggal,
ta.objectstatuspulangrifk,
ta.a1,
ta.a5,
ta.a10,
ta.p1,
ta.p5,
ta.p10,
ta.g1,
ta.g5,
ta.g10,
ta.c1,
ta.c5,
ta.c10,
ta.r1,
ta.r5,
ta.r10,
ta.total1,
ta.total5,
ta.total10,
case when ta.durasitpiece is null then '0' else ta.durasitpiece end as durasitpiece,
case when ta.durasio2 is null then '0' else ta.durasio2 end as durasio2,
case when ta.durasipompa is null then '0' else ta.durasipompa end as durasipompa,
case when ta.durasiintubatic is null then '0' else ta.durasiintubatic end as durasiintubatic,
ta.kulit,
ta.tht,
ta.mulut,
ta.leher,
ta.dada,
ta.paru,
ta.jantung,
ta.abdomen,
ta.genitalia,
ta.anus,
ta.extremitasatas,
ta.extremitasbawah,
ta.reflexhisap,
ta.pengeluaranairkeruh,
ta.pengeluaranmokeneum,
ta.pemeriksaanlab,
ta.diagnosakerja,
ta.penatalaksanaan,
case when ta.a1 is null then 0 else ma.score end as a1score,
case when ta.a5 is null then 0 else ma5.score end as a5score,
case when ta.a10 is null then 0 else ma10.score end as a10score,
case when ta.p1 is null then 0 else mp.score end as p1score,
case when ta.p5 is null then 0 else mp5.score end as p5score,
case when ta.p10 is null then 0 else mp10.score end as p10score,
case when ta.g1 is null then 0 else mg.score end as g1score,
case when ta.g5 is null then 0 else mg5.score end as g5score,
case when ta.g10 is null then 0 else mg10.score end as g10score,
case when ta.c1 is null then 0 else mc.score end as c1score,
case when ta.c5 is null then 0 else mc5.score end as c5score,
case when ta.c10 is null then 0 else mc10.score end as c10score,
case when ta.r1 is null then 0 else mr.score end as r1score,
case when ta.r5 is null then 0 else mr5.score end as r5score,
case when ta.r10 is null then 0 else mr10.score end as r10score from t_emrpasien te
join t_asesmenbayilahir ta on ta.objectemrfk=te.norec
left join m_apgarscore ma on ma.id=ta.a1
left join m_apgarscore ma5 on ma5.id=ta.a5
left join m_apgarscore ma10 on ma10.id=ta.a10
left join m_apgarscore mp on mp.id=ta.p1
left join m_apgarscore mp5 on mp5.id=ta.p5
left join m_apgarscore mp10 on mp10.id=ta.p10
left join m_apgarscore mg on mg.id=ta.g1
left join m_apgarscore mg5 on mg5.id=ta.g5
left join m_apgarscore mg10 on mg10.id=ta.g10
left join m_apgarscore mc on mc.id=ta.c1
left join m_apgarscore mc5 on mc5.id=ta.c5
left join m_apgarscore mc10 on mc10.id=ta.c10
left join m_apgarscore mr on mr.id=ta.r1
left join m_apgarscore mr5 on mr5.id=ta.r5
left join m_apgarscore mr10 on mr10.id=ta.r10 where te.objectantreanpemeriksaanfk=$1
and te.idlabel=4`

const qComboApgar =`select id as value, reportdisplay||' ('||score||')' as label,score from m_apgarscore where namaexternal=$1`
const qComboApgarScore =`select id as value, reportdisplay as label from m_apgarscore where namaexternal=$1`
const qComboSebabKematian =`select id as value, reportdisplay as label from m_statuspulangri where kodeexternal='rl_3.5'`

const qHistoryAsesmenBayiLahir = `select td.noregistrasi,to_char(te.tglisi, 'YYYY-MM-DD HH24:MI')as tglisi,
to_char(td.tglregistrasi, 'YYYY-MM-DD')as tglregistrasi,ta.norec,ta.responden,
ta.objecthubungankeluargafk,
ta.anamnesa,
ta.gravida,
ta.partus,
ta.abortus,
ta.keadaanibu,
ta.tempatpersalinan,
ta.penolong,
ta.ketubanpecah,
ta.airketuban,
ta.lahir,
ta.lamapersalinan,
ta.macampersalinan,
ta.indikasi,
ta.objectjeniskelaminfk,
ta.keadaan,
ta.berat,
ta.panjang,
ta.lingkardada,
ta.lingkarkepala,
ta.lahirmeninggal,
ta.objectstatuspulangrifk,
ta.a1,
ta.a5,
ta.a10,
ta.p1,
ta.p5,
ta.p10,
ta.g1,
ta.g5,
ta.g10,
ta.c1,
ta.c5,
ta.c10,
ta.r1,
ta.r5,
ta.r10,
ta.total1,
ta.total5,
ta.total10,
ta.durasitpiece,
ta.durasio2,
ta.durasipompa,
ta.durasiintubatic,
ta.kulit,
ta.tht,
ta.mulut,
ta.leher,
ta.dada,
ta.paru,
ta.jantung,
ta.abdomen,
ta.genitalia,
ta.anus,
ta.extremitasatas,
ta.extremitasbawah,
ta.reflexhisap,
ta.pengeluaranairkeruh,
ta.pengeluaranmokeneum,
ta.pemeriksaanlab,
ta.diagnosakerja,
ta.penatalaksanaan,
case when ta.a1 is null then 0 else ma.score end as a1score,
case when ta.a5 is null then 0 else ma5.score end as a5score,
case when ta.a10 is null then 0 else ma10.score end as a10score,
case when ta.p1 is null then 0 else mp.score end as p1score,
case when ta.p5 is null then 0 else mp5.score end as p5score,
case when ta.p10 is null then 0 else mp10.score end as p10score,
case when ta.g1 is null then 0 else mg.score end as g1score,
case when ta.g5 is null then 0 else mg5.score end as g5score,
case when ta.g10 is null then 0 else mg10.score end as g10score,
case when ta.c1 is null then 0 else mc.score end as c1score,
case when ta.c5 is null then 0 else mc5.score end as c5score,
case when ta.c10 is null then 0 else mc10.score end as c10score,
case when ta.r1 is null then 0 else mr.score end as r1score,
case when ta.r5 is null then 0 else mr5.score end as r5score,
case when ta.r10 is null then 0 else mr10.score end as r10score from t_emrpasien te
join t_asesmenbayilahir ta on ta.objectemrfk=te.norec
left join m_apgarscore ma on ma.id=ta.a1
left join m_apgarscore ma5 on ma5.id=ta.a5
left join m_apgarscore ma10 on ma10.id=ta.a10
left join m_apgarscore mp on mp.id=ta.p1
left join m_apgarscore mp5 on mp5.id=ta.p5
left join m_apgarscore mp10 on mp10.id=ta.p10
left join m_apgarscore mg on mg.id=ta.g1
left join m_apgarscore mg5 on mg5.id=ta.g5
left join m_apgarscore mg10 on mg10.id=ta.g10
left join m_apgarscore mc on mc.id=ta.c1
left join m_apgarscore mc5 on mc5.id=ta.c5
left join m_apgarscore mc10 on mc10.id=ta.c10
left join m_apgarscore mr on mr.id=ta.r1
left join m_apgarscore mr5 on mr5.id=ta.r5
left join m_apgarscore mr10 on mr10.id=ta.r10
join t_antreanpemeriksaan ta2 on ta2.norec=te.objectantreanpemeriksaanfk
join t_daftarpasien td on td.norec=ta2.objectdaftarpasienfk  where td.nocmfk=$1
and te.idlabel=4`

const qGetAntreanPemeriksaanObat = `
SELECT
    tap.objectunitfk AS unitantrean,
    tap.tglregistrasi AS tglregistrasi,
    tap.tglmasuk AS tglmasuk
FROM t_antreanpemeriksaan tap
WHERE tap.norec = $1
`
const qGetNilaiNormalTtv = `SELECT id, jenisttv, umurmin, umurmax, nilaimin, nilaimax, nilaikritisbawah, nilaikritisatas
FROM public.m_nilainormalttv
`
const qGetTtvByNorec=`SELECT norec, objectemrfk, tinggibadan, beratbadan, suhu, e, e AS gcse, m, m AS gcsm, v, v AS gcsv, nadi, alergi, tekanandarah, spo2, pernapasan, keadaanumum, objectpegawaifk, isedit, objectttvfk, tglisi, statusenabled, objectgcsfk, sistole, diastole, ihs_suhu, ihs_nadi, ihs_sistole, ihs_diastole, ihs_pernapasan, status_ihs_nadi, status_ihs_pernapasan, status_ihs_suhu, status_ihs_sistole, status_ihs_diastole
FROM public.t_ttv where norec=$1`

const qGetSumberData=`SELECT id as value,nama as label,case when id=1 then true else false end as cheked FROM m_sumberdata`

const qGetListKeluhanUtama =`select mt.namalain ||', '||mt.display as label,mt.id as value,
mt.code,mt.display from m_terminologi mt where objecttipeterminologifk=2`

const qGetStatusPsikologis =`select mt.id as value,
mt.nama as label from m_statuspsikologis mt`

const qGetListAlergi = `select mt.display as label,mt.id as value,
mt.code,mt.display from m_terminologi mt where objecttipeterminologifk=1`
const qGetListPengkajianAwalKeperawatan=`
SELECT 
    tp.keluhanutama,
    tp.norec,dp.noregistrasi,
    mt.display as displaykeluhan,mt.code as codekeluhan,
    mt2.display as displayalergi,
    mt2.code as codealergi,
    mu.namaunit,to_char(tp.tglinput,'dd Month YYYY HH24:MI') as tglinput,
    tp.tglinput as tglinput_ihs,
    case when tp.status_ihs_keluhan=true 
        then 'btn-soft-info' 
        else 'btn-soft-danger'
    end as status_keluhan,
    case when tp.status_ihs_alergi=true 
        then 'btn-soft-info' 
        else 'btn-soft-danger'
    end as status_alergi,
    tp.ihs_keluhan,
    tp.ihs_alergi,
    tp.objectsumberdatafk,
    tp.keluhanutama,
    tp.objectterminologikeluhanfk,
    tp.objectstatuspsikologisfk,
    tp.objectterminologialergifk,
    tp.objectalergiobatfk,
    mk.code as codekfa,
    mk.display as displaykfa,
    case when tp.status_ihs_alergi_obat=true 
        then 'btn-soft-info' 
        else 'btn-soft-danger' 
    end as status_alergi_obat
FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
join t_pengkajianawalkeperawatan tp on tp.objectemrfk=te.norec 
join m_unit mu on mu.id=ta.objectunitfk
LEFT JOIN m_statuspsikologis ms1 ON ms1.id = (tp.objectstatuspsikologisfk->>'tegang')::integer
LEFT JOIN m_statuspsikologis ms2 ON ms2.id = (tp.objectstatuspsikologisfk->>'cemas')::integer
LEFT JOIN m_statuspsikologis ms3 ON ms3.id = (tp.objectstatuspsikologisfk->>'takut')::integer
LEFT JOIN m_statuspsikologis ms4 ON ms4.id = (tp.objectstatuspsikologisfk->>'marah')::integer
LEFT JOIN m_statuspsikologis ms5 ON ms5.id = (tp.objectstatuspsikologisfk->>'sedih')::integer
LEFT JOIN m_statuspsikologis ms6 ON ms6.id = (tp.objectstatuspsikologisfk->>'depresi')::integer
LEFT JOIN m_statuspsikologis ms7 ON ms7.id = (tp.objectstatuspsikologisfk->>'agresif')::integer
LEFT JOIN m_statuspsikologis ms8 ON ms8.id = (tp.objectstatuspsikologisfk->>'melukaids')::integer
LEFT JOIN m_statuspsikologis ms9 ON ms9.id = (tp.objectstatuspsikologisfk->>'melukaiol')::integer
LEFT JOIN m_statuspsikologis ms10 ON ms10.id = (tp.objectstatuspsikologisfk->>'tenang')::integer
left join m_terminologi mt on mt.id=tp.objectterminologikeluhanfk 
left join m_terminologi mt2 on mt2.id=tp.objectterminologialergifk
left join m_kfa mk on mk.id=tp.objectalergiobatfk
where dp.nocmfk=$1`
const qListKfa = `select mk.id as value,mk.code,mk.display as label  from m_kfa mk where 
${emptyIlike("mk.display", "$1")}`

const qTransportasiKedatangan =`
select mt.id as value, mt.namalain  as label,mt.display  from m_terminologi mt  where mt.objecttipeterminologifk = 7`

const qGetBadan = `
SELECT
    mt.namalain AS label,
    mt.code AS ihs_id,
    mt.id AS value
FROM m_terminologi mt
WHERE mt.objecttipeterminologifk = 9
`

const qGetRiwayatPenyakitPribadi =`select mt.display as label,mt.id as value,
mt.code,mt.display,mt.codesystem from m_terminologi mt where mt.objecttipeterminologifk=4 and ${emptyIlike("mt.display", "$1")}`

const qGetRiwayatAlergi = `
select tr.norec,mt.id as value,mt.display as label
        	from t_riwayatalergi tr
        	left join m_terminologi mt on mt.id=tr.objectterminologikfafk
        	where tr.objectjenisalergifk=$1 and tr.norecreferenci=$2
`
const qGetRiwayatAlergiObat = `
select tr.norec,mt.id as value,mt.display as label
        	from t_riwayatalergi tr
        	left join m_kfa mt on mt.id=tr.objectterminologikfafk
        	where tr.objectjenisalergifk=$1 and tr.norecreferenci=$2
`

const qGetAsesmenAwalIGD = `
SELECT
    taaigd.norec AS norecasesmenawaligd,
    tap.norec AS norecap,
    tap.objectdaftarpasienfk AS norecdp,
    tt.norec AS norecttv,
    taaigd.tglinput AS datepengkajian,
    taaigd.isnyeri AS statusnyeri,
    COALESCE(taaigd.skalanyeri, 0) AS skalanyeri,
    taaigd.objectterminologilokasinyerifk AS lokasi,
    taaigd.lokasinyeri_ihs_id AS ihs_idlokasi,
    taaigd.penyebabnyeri AS penyebab,
    taaigd.durasi AS durasi,
    taaigd.objectsatuannyerifk AS satuandurasi,
    taaigd.frekuensinyeri AS frekuensinyeri,
    mp.tgllahir AS tgllahir, 
    JSON_BUILD_OBJECT(
        'riwayatjatuh', taaigd.mfs_skorjatuh,
        'diagnosissekunder', taaigd.mfs_penyakit,
        'alatbantuberjalan', taaigd.mfs_alatbantujalan,
        'infus', taaigd.mfs_infus,
        'kondisi', taaigd.mfs_carajalan,
        'statusmental', taaigd.mfs_statusmental,
        'skor', taaigd.mfs_totalskor        
    ) as resikojatuh,
    JSON_BUILD_OBJECT(
        'umur', taaigd.hds_usia,
        'jeniskelamin', taaigd.hds_jeniskelamin,
        'diagnosa', taaigd.hds_diagnosa,
        'gangguankognitif', taaigd.hds_gangguankognitif,
        'faktorlingkungan', taaigd.hds_lingkungan,
        'pembedahan', taaigd.hds_pembedahan,
        'medikamentosa', taaigd.hds_medikamentosa,
        'skor', taaigd.hds_totalskor        
    ) as resikojatuhhds
FROM t_antreanpemeriksaan tap
    LEFT JOIN t_emrpasien tep ON tap.norec = tep.objectantreanpemeriksaanfk
    LEFT JOIN t_asesmenawaligd taaigd ON tep.norec = taaigd.objectemrpasienfk
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN t_ttv tt ON tt.objectemrfk = tep.norec
WHERE
    tap.norec = $1
`
const qHistorySkriningIGD = `
SELECT
    tp.norec,dp.noregistrasi,
    mu.namaunit,to_char(tp.tglinput,'dd Month YYYY HH24:MI') as tglinput,
    tp.tglinput as tglinput_ihs,tp.risikodecubitus,
	case when tp.batuk_demam=true then 0 else 1 end as batuk_demam,
	case when tp.batuk_keringat=true then 0 else 1 end as batuk_keringat,
	case when tp.batuk_daerahwabah=true then 0 else 1 end as batuk_daerahwabah,
	case when tp.batuk_obatjangkapanjang=true then 0 else 1 end as batuk_obatjangkapanjang,
	case when tp.batuk_bbturun=true then 0 else 1 end as batuk_bbturun,
	case when tp.gizi_bbturun=true then 0 else 1 end as gizi_bbturun,
	case when tp.gizi_nafsumakan=true then 0 else 1 end as gizi_nafsumakan,
	case when tp.gizi_gejala=true then 0 else 1 end as gizi_gejala,
	case when tp.gizi_komorbid=true then 0 else 1 end as gizi_komorbid,
	case when tp.gizi_fungsional=true then 0 else 1 end as gizi_fungsional
FROM t_daftarpasien dp 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk=dp.norec
join t_emrpasien te on te.objectantreanpemeriksaanfk=ta.norec 
join t_skriningigd tp on tp.objectemrpasienfk=te.norec 
join m_unit mu on mu.id=ta.objectunitfk
where dp.nocmfk=$1`

const qInterpretasiResiko = `
SELECT
    mi.id AS value,
    mi.nilaimin AS nilaimin,
    mi.nilaimax AS nilaimax,
    mi.jenis AS jenis,
    mi.display AS display,
    mi.code AS code,
    mi.codesystem AS codesystem
FROM m_interpretasi mi
where mi.jenis=$1 AND mi.statusenabled = TRUE`


export {
    qGetObatFromUnit,
    qGetAllObat,
    qGetOrderResepFromDP,
    qGetOrderVerifResepFromDP,
    qGetAntreanFromNorec as qGetAntreanFromDP,
    qAsesmenBayiLahirByNorec,
    qComboApgar,
    qComboSebabKematian,
    qComboApgarScore,
    qHistoryAsesmenBayiLahir,
    qGetAntreanPemeriksaanObat,
    qGetAllOrderResepFromDate,
    qGetNilaiNormalTtv,
    qGetTtvByNorec,
    qGetSumberData,
    qGetListKeluhanUtama,
    qGetStatusPsikologis,
    qGetListAlergi,
    qGetListPengkajianAwalKeperawatan,
    qListKfa,
    qTransportasiKedatangan,
    qGetBadan,
    qGetRiwayatPenyakitPribadi,
    qGetRiwayatAlergi,
    qGetRiwayatAlergiObat,
    qGetAsesmenAwalIGD,
    qHistorySkriningIGD,
    qInterpretasiResiko
}