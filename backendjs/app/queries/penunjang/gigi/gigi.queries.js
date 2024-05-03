

const qGetAllGigi = `
SELECT
    mg.reportdisplay AS reportdisplay,
    mg.id AS idgigi,
    mg.isseri AS isseri
FROM m_gigi mg
WHERE mg.statusenabled = TRUE
`

export {
    qGetAllGigi
}