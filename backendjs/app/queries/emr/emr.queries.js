
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
WHERE tsu.objectunitfk = $1
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

const qGetOrderResepFromDP = `
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
FROM t_daftarpasien tdp
    LEFT JOIN t_antreanpemeriksaan tap ON tdp.norec = tap.objectdaftarpasienfk
    LEFT JOIN t_orderresep tor ON tor.objectantreanpemeriksaanfk = tap.norec
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
WHERE CASE 
    WHEN $1 = 'all' THEN tor.statusenabled = true
    WHEN $1 = 'norecresep' THEN tor.norec = $2
    ELSE tdp.norec = $3
END
GROUP BY
    tor.norec,
    mpeg.id,
    mpeg.namalengkap,
    mu.id,
    mu.namaunit,
    tdp.objectunitlastfk,
    tdp.objectpenjaminfk
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
    tdp.objectpenjaminfk AS penjamin,
    json_agg(
        json_build_object(
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
left join m_apgarscore mr10 on mr10.id=ta.r10 where te.objectantreanpemeriksaanfk=$1
and te.idlabel=4`

const qComboApgar =`select id as value, reportdisplay||' ('||score||')' as label,score from m_apgarscore where namaexternal=$1`
const qComboApgarScore =`select id as value, reportdisplay as label from m_apgarscore where namaexternal=$1`
const qComboSebabKematian =`select id as value, reportdisplay as label from m_statuspulangri where kodeexternal='rl_3.5'`

export {
    qGetObatFromUnit,
    qGetOrderResepFromDP,
    qGetOrderVerifResepFromDP,
    qGetAntreanFromNorec as qGetAntreanFromDP,
    qAsesmenBayiLahirByNorec,
    qComboApgar,
    qComboSebabKematian,
    qComboApgarScore
}