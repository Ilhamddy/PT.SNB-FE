

const qGetNoRMLast = `
SELECT
    MAX(nocm) as max
FROM m_pasien mp
WHERE mp.statusenabled = TRUE
`

export {
    qGetNoRMLast
}