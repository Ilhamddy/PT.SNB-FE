import { emptyIlike, emptyInt, emptyStr } from "../../../utils/dbutils"


const qGetAllGigi = `
SELECT
    mg.reportdisplay AS label,
    mg.id AS value,
    mg.isseri AS isseri,
    ms.reportdisplay AS sisigigi
FROM m_gigi mg
    LEFT JOIN m_sisi ms ON mg.objectsisifk = ms.id
WHERE mg.statusenabled = TRUE
ORDER BY mg.id ASC
`

const qGetAllKondisiGigi = `
SELECT
    mlg.keterangan AS label,
    mlg.id AS value,
    mlg.isfull AS isfull,
    mlg.reportdisplay AS reportdisplay,
    mlg.kdsvg AS kdsvg,
    mlg.warna AS warna,
    mlg.istumpuk AS istumpuk,
    mlg.isjembatan AS isjembatan,
    mlg.teks AS tekskondisi
FROM m_legendgigi mlg
WHERE mlg.statusenabled = TRUE
ORDER BY mlg.id
`

const qGetAllOdontogramDetail = `
SELECT
    tod.objectgigifk AS gigi,
    tod.objectgigitujuanfk AS "gigiTujuan",
    0 AS "indexGigi",
    null AS "indexGigiTujuan",
    null AS line,
    COALESCE(mlg.isjembatan, FALSE) AS "isJembatan",
    mlg.reportdisplay AS "reportDisplay",
    tod.lokasi AS lokasi,
    null AS lokasitemp,
    mlg.isfull AS "isFull",
    tog.tglinput AS "tglTambah",
    mlg.id AS kondisi,
    mlg.kdsvg AS "svgKondisi",
    mlg.warna AS "warnaKondisi",
    mlg.istumpuk AS "isTumpuk"
FROM t_odontogram tog
    LEFT JOIN t_odontogramdetail tod ON tog.norec = tod.objectodontogramfk 
    LEFT JOIN m_legendgigi mlg ON mlg.id = tod.objectlegendgigifk
WHERE ${emptyIlike("tog.norec", ":norecodontogram")}
`

const qGetOdontogram = `
SELECT
    tog.norec AS norecodontogram,
    tog.objectantreanpemeriksaanfk AS norecap,
    tog.tglinput AS tglinput,
    tog.objectocclusifk AS occlusi,
    tog.objecttoruspalatinusfk AS toruspalatinus,
    tog.diastema AS diastema,
    tog.gigianomali AS gigianomali,
    tog.lainlain AS lainlain,
    tog.d AS decay,
    tog.m AS missing,
    tog.f AS filling,
    tog.objectjenisfotofk AS jenisfoto,
    tog.jumlahfoto AS jumlahfoto,
    tog.objectjenisfotofk AS jenisfotorontgent,
    tog.jumlahrontgenfoto AS jumlahfotorontgent    
FROM t_antreanpemeriksaan tap
    LEFT JOIN t_odontogram tog ON tap.norec = tog.objectantreanpemeriksaanfk
WHERE ${emptyIlike("tap.objectdaftarpasienfk", ":norecdp")}
ORDER BY tog.tglinput DESC
`


const qGetComboOdontogram = `
SELECT
    mko.reportdisplay AS label,
    mko.id AS value
FROM m_keteranganodontogram mko
WHERE ${emptyIlike("mko.keterangan", ":keterangan")}
    AND mko.statusenabled = TRUE
`


export {
    qGetAllGigi,
    qGetAllKondisiGigi,
    qGetAllOdontogramDetail,
    qGetOdontogram,
    qGetComboOdontogram
}