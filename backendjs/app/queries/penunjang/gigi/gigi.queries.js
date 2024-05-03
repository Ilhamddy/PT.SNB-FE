

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
    mlg.warna AS warna
FROM m_legendgigi mlg
WHERE mlg.statusenabled = TRUE
`

export {
    qGetAllGigi,
    qGetAllKondisiGigi
}