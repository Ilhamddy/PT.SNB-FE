

const qGetRiwayatObat = `
SELECT
    mprod.ihs_id AS ihs_obat,
    mp.ihs_id AS ihs_pasien,
    mp.namapasien AS namapasien,
    ms.reportdisplay AS namasigna,
    ms.frekuensi AS frekuensisigna,
    ms.period AS periodsigna,
    msat.ihs_code AS satuansigna,
    tdp.ihs_id AS ihs_encounter
FROM t_riwayatobatpasien trop
    LEFT JOIN t_pasienigd tpi ON tpi.norec = trop.objectpasienigdfk
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tpi.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_signa ms ON ms.id = trop.objectsignafk
    LEFT JOIN m_satuan msat ON msat.id = ms.objectsatuanfk
    LEFT JOIN m_produk mprod ON mprod.id = trop.objectprodukfk
WHERE trop.norec = $1
`

const qGetRiwayatObatByNorecReferenci = `
select
trop.norec,
    mprod.ihs_id AS ihs_obat,
    mp.ihs_id AS ihs_pasien,
    mp.namapasien AS namapasien,
    ms.reportdisplay AS namasigna,
    ms.frekuensi AS frekuensisigna,
    ms.period AS periodsigna,
    msat.ihs_code AS satuansigna,
    tdp.ihs_id AS ihs_encounter
FROM t_riwayatobatpasien trop
    LEFT JOIN t_pasienigd tpi ON tpi.norec = trop.objectpasienigdfk
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tpi.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN m_signa ms ON ms.id = trop.objectsignafk
    LEFT JOIN m_satuan msat ON msat.id = ms.objectsatuanfk
    LEFT JOIN m_produk mprod ON mprod.id = trop.objectprodukfk
WHERE tpi.norec = $1`


const qGetAsesmen = `
SELECT
    taaigd.isnyeri AS isnyeri,
    mpeg.ihs_id AS ihs_dokter,
    mp.ihs_id AS ihs_pasien,
    tdp.ihs_id AS ihs_encounter
FROM t_asesmenawaligd taaigd
    t_emrpasien tep ON tep.norec = taaigd.objectemrpasienfk 
    t_antreanpemeriksaan tap ON tap.norec = tep.objectantreanpemeriksaanfk
    t_daftarpasien tdp ON tdp.norec = tap.objectdaftarpasienfk
    m_pasien mp ON mp.id = tdp.nocmfk
    m_pegawai mpeg ON mpeg.id = tap.objectdokterpemeriksafk
WHERE taaigd.norec = $1
`
const qSkriningIGDByNorecDp = `
SELECT
    tp.norec,dp.noregistrasi,
    mu.namaunit,to_char(tp.tglinput,'dd Month YYYY HH24:MI') as tglinput,
    tp.tglinput as tglinput_ihs,tp.risikodecubitus,tp.ihs_decubitus,tp.ihs_batuk,tp.ihs_gizi,
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
where tp.norec=$1`

export {
    qGetRiwayatObat,
    qGetRiwayatObatByNorecReferenci,
    qGetAsesmen,qSkriningIGDByNorecDp
}