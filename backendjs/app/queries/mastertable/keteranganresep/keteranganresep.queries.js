const getAll = `
SELECT
    id as value,
    reportdisplay as label
FROM 
    m_keteranganresep
WHERE
    statusenabled = true
`

export default {
    getAll
}