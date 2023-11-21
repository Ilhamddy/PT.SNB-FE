

const getAll = `
SELECT
    id AS value,
    reportdisplay AS label
FROM m_cuti
WHERE statusenabled = true
`

export default {
    getAll
}