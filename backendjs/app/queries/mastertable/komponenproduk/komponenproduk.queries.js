const getAll = `
SELECT
    id as value,
    reportdisplay as label
FROM 
    m_komponenproduk
WHERE
    statusenabled = true
`

export default {
    getAll
}