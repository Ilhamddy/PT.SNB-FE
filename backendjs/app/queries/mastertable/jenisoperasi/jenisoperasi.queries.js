

const getAll = `
SELECT
    mjo.id AS value,
    mjo.reportdisplay AS label
FROM m_jenisoperasi mjo
WHERE
    mjo.statusenabled = TRUE
`

export default {
    getAll
}