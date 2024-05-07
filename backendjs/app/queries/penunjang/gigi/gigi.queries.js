import { emptyInt } from "../../../utils/dbutils"


const qGetAllGigi = `
SELECT
    mg.reportdisplay AS label,
    mg.id AS value,
    mg.isseri AS isseri
FROM m_gigi mg
WHERE mg.statusenabled = TRUE
`

const qGetAllKondisiGigi = `
SELECT
    mlg.keterangan AS label,
    mlg.id AS value,
    mlg.isfull AS isfull,
    mlg.kdsvg AS kdsvg,
    mlg.warna AS warna,
    mlg.istumpuk AS istumpuk,
    mlg.isjembatan AS isjembatan,
    mlg.teks AS tekskondisi
FROM m_legendgigi mlg
WHERE mlg.statusenabled = TRUE
ORDER BY mlg.id
`

/**
 * @typedef {{
*  gigi: number,
*  gigiTujuan: number | null,
*  indexGigi: number | null,
*  indexGigiTujuan: number | null,
*  line: LeaderLine | null,
*  isJembatan: boolean,
*  lokasi: 'atas' | 'bawah' | 'kiri' | 'kanan' | 'tengah' | 'gigiutuh' | null,
*  lokasitemp: 'atas' | 'bawah' | 'kiri' | 'kanan' | 'tengah' | null,
*  isFull: boolean,
*  tglTambah: Date | null
*  kondisi: any,
*  svgKondisi: string | null,
*  warnaKondisi: string | null,
*  isTumpuk: boolean
* }} IKondisiGigi
*/

const qGetAllOdontogramDetail = `
SELECT
    tod.objectgigifk AS gigi,
    tod.objectgigitujuanfk AS "gigiTujuan",
    0 AS "indexGigi",
    null AS "indexGigiTujuan",
    null AS line,
    mlg.isjembatan AS "isJembatan",
    tod.lokasi AS lokasi,
    null AS lokasitemp,
    mlg.isfull AS "isFull",
    tog.tglinput AS "tglTambah",
    mlg.id AS kondisi,
    mlg.kdsvg AS "svgKondisi",
    mlg.warna AS "warnaKondisi",
    mlg.istumpuk AS "isTumpuk"
FROM t_odontologidetail tod
    LEFT JOIN t_odontogram tog ON tog.norec = tod.objectodontogramfk
    LEFT JOIN m_legendgigi mlg ON mlg.id = tod.objectlegendgigifk
WHERE 
    ${emptyInt("tog.norec", ":norecodontogram")}
    OR
    ${emptyInt("tog.objectantreanpemeriksaanfk", ":norecap")}
`


export {
    qGetAllGigi,
    qGetAllKondisiGigi,
    qGetAllOdontogramDetail,
}