import { dateBetweenEmptyString,emptyIlike, emptyInt } from "../../utils/dbutils"

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

const qGetOrderResep = `
SELECT
    tor.norec AS norecorder,
    mpeg.id AS dokter,
    mpeg.namalengkap AS namadokter,
    mu.id AS unittujuan,
    mu.namaunit AS namaunittujuan,
    tdp.objectunitlastfk AS unitasal,
    tor.no_order AS noorder,
    tor.tglinput AS tanggalorder,
    tor.no_resep AS noresep,
    tor.tglverif AS tglverif,
    tdp.objectpenjaminfk AS penjamin,
    json_agg(
        json_build_object(
            'norecap', tap.norec,
            'norecresep', tord.norec,
            'obat', tord.objectprodukfk,
            'namaobat', mp.namaproduk,
            'satuanobat', ms.id,
            'namasatuan', ms.satuan,
            'koder', tord.kode_r,
            'qty', tord.qty,
            'qtyracikan', tord.qtyracikan,
            'qtypembulatan', tord.qtypembulatan,
            'qtyjumlahracikan', tord.qtyjumlahracikan,
            'sediaan', tord.objectsediaanfk,
            'namasediaan', msed.sediaan,
            'harga', tord.harga,
            'total', tord.total,
            'signa', tord.objectsignafk,
            'namasigna', msig.reportdisplay,
            'keterangan', tord.objectketeranganresepfk,
            'namaketerangan', mket.reportdisplay,
            'kodertambahan', tord.kode_r_tambahan,
            'stok', s.stok,
            'batch', s.batch
        )
        ORDER BY tord.kode_r ASC, tord.kode_r_tambahan ASC
    ) AS resep
FROM t_orderresep tor
    LEFT JOIN t_antreanpemeriksaan tap ON tor.objectantreanpemeriksaanfk = tap.norec
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk    
    LEFT JOIN t_orderresepdetail tord ON tord.objectorderresepfk = tor.norec
    LEFT JOIN m_pegawai mpeg ON mpeg.id = tor.objectpegawaifk
    LEFT JOIN m_unit mu ON mu.id = tor.objectdepotujuanfk
    LEFT JOIN m_produk mp ON mp.id = tord.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msed ON msed.id = mp.objectsediaanfk
    LEFT JOIN m_keteranganresep mket ON mket.id = tord.objectketeranganresepfk
    LEFT JOIN m_signa msig ON msig.id = tord.objectsignafk
CROSS JOIN LATERAL (
    SELECT 
        json_agg(
            json_build_object(
                'norecstokunit', tsu.norec,
                'harga', tsu.harga,
                'qty', tsu.qty,
                'nobatch', tsu.nobatch
            )
        ) AS batch,
        sum(tsu.qty) AS stok
        FROM t_stokunit tsu
    WHERE tsu.objectprodukfk = tord.objectprodukfk
        AND tsu.qty > 0
        AND tsu.objectunitfk = tor.objectdepotujuanfk
    ) s
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

const qGetOrderVerifResepFromDP = `
SELECT
    tor.norec AS norecorder,
    mpeg.id AS dokter,
    mpeg.namalengkap AS namadokter,
    mu.id AS unittujuan,
    mu.namaunit AS namaunittujuan,
    tdp.objectunitlastfk AS unitasal,
    tor.no_order AS noorder,
    tor.no_resep AS noresep,
    tor.tglinput AS tanggalorder,
    tor.no_resep AS noresep,
    tor.tglverif AS tanggalverif,
    COALESCE(tor.tglinput, tor.tglverif) AS tanggalresep,
    tor.objectpegawaifk AS penulisresep,
    tdp.objectpenjaminfk AS penjamin,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'norecap', tap.norec,
            'norecresep', tv.norec,
            'obat', tv.objectprodukfk,
            'namaobat', mp.namaproduk,
            'satuanobat', ms.id,
            'namasatuan', ms.satuan,
            'koder', tv.kode_r,
            'qty', tv.qty,
            'qtyracikan', tv.qtyracikan,
            'qtypembulatan', tv.qtypembulatan,
            'qtyjumlahracikan', tv.qtyjumlahracikan,
            'sediaan', tv.objectsediaanfk,
            'namasediaan', msed.sediaan,
            'harga', tv.harga,
            'total', tv.total,
            'signa', tv.objectsignafk,
            'namasigna', msig.reportdisplay,
            'keterangan', tv.objectketeranganresepfk,
            'namaketerangan', mket.reportdisplay,
            'kodertambahan', tv.kode_r_tambahan,
            'stok', s.stok,
            'batch', s.batch
        )
        ORDER BY tv.kode_r ASC, tv.kode_r_tambahan ASC
    ) AS resep
FROM t_daftarpasien tdp
    LEFT JOIN t_antreanpemeriksaan tap ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN t_orderresep tor ON tor.objectantreanpemeriksaanfk = tap.norec
    LEFT JOIN t_verifresep tv ON tv.objectorderresepfk = tor.norec
    LEFT JOIN m_pegawai mpeg ON mpeg.id = tor.objectpegawaifk
    LEFT JOIN m_unit mu ON mu.id = tor.objectdepotujuanfk
    LEFT JOIN m_produk mp ON mp.id = tv.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msed ON msed.id = mp.objectsediaanfk
    LEFT JOIN m_keteranganresep mket ON mket.id = tv.objectketeranganresepfk
    LEFT JOIN m_signa msig ON msig.id = tv.objectsignafk
CROSS JOIN LATERAL (
    SELECT 
        json_agg(
            json_build_object(
                'norecstokunit', tsu.norec,
                'harga', tsu.harga,
                'qty', tsu.qty,
                'nobatch', tsu.nobatch
            )
        ) AS batch,
        sum(tsu.qty) AS stok
        FROM t_stokunit tsu
    WHERE tsu.objectprodukfk = tv.objectprodukfk
        AND tsu.qty > 0
        AND tsu.objectunitfk = tor.objectdepotujuanfk
    ) s
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
const qGetTtvByNorec=`SELECT norec, objectemrfk, tinggibadan, beratbadan, suhu, e, m, v, nadi, alergi, tekanandarah, spo2, pernapasan, keadaanumum, objectpegawaifk, isedit, objectttvfk, tglisi, statusenabled, objectgcsfk, sistole, diastole, ihs_suhu, ihs_nadi, ihs_sistole, ihs_diastole, ihs_pernapasan, status_ihs_nadi, status_ihs_pernapasan, status_ihs_suhu, status_ihs_sistole, status_ihs_diastole
FROM public.t_ttv where norec=$1`

const qGetSumberData=`SELECT id as value,nama as label,case when id=1 then true else false end as cheked FROM m_sumberdata`

const qGetListKeluhanUtama =`select mt.namalain ||', '||mt.display as label,mt.id as value,
mt.code,mt.display from m_terminologi mt where objecttipeterminologifk=2`

const qGetStatusPsikologis =`select mt.id as value,
mt.nama as label from m_statuspsikologis mt`

const qGetListAlergi = `select mt.display as label,mt.id as value,
mt.code,mt.display from m_terminologi mt where objecttipeterminologifk=1`
const qGetListPengkajianAwalKeperawatan=`SELECT tp.keluhanutama,tp.norec,dp.noregistrasi,mt.display as displaykeluhan,mt.code as codekeluhan,
mt2.display as displayalergi,mt2.code as codealergi,mu.namaunit,to_char(tp.tglinput,
            'dd Month YYYY HH24:MI') as tglinput,tp.tglinput as tglinput_ihs,
            case when tp.status_ihs_keluhan=true then 'btn-soft-info' else 'btn-soft-danger'
        end as status_keluhan,
        case when tp.status_ihs_alergi=true then 'btn-soft-info' else 'btn-soft-danger'
        end as status_alergi,tp.ihs_keluhan,tp.ihs_alergi,tp.objectsumberdatafk,tp.keluhanutama,
        tp.objectterminologikeluhanfk,tp.objectstatuspsikologisfk,tp.objectterminologialergifk,
        tp.objectalergiobatfk,mk.code as codekfa,mk.display as displaykfa,
        case when tp.status_ihs_alergi_obat=true then 'btn-soft-info' else 'btn-soft-danger' end as status_alergi_obat
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

const qGetRiwayatPenyakitPribadi =`select mt.display as label,mt.id as value,
mt.code,mt.display,mt.codesystem from m_terminologi mt where mt.objecttipeterminologifk=4 and ${emptyIlike("mt.display", "$1")}`

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
    qGetRiwayatPenyakitPribadi
}