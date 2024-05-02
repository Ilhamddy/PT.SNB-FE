

const qGetAllGigi = `
SELECT
    mg.reportdisplay AS reportdisplay,
    mg.id AS idgigi
FROM m_gigi mg
WHERE mg.statusenabled = TRUE
`

export {
    qGetAllGigi
}