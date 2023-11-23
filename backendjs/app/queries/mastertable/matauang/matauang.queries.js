export const daftarMataUang = {
    RUPIAH: 1
}

const getAll = `
SELECT
    id as value,
    reportdisplay as label
FROM 
    m_matauang
WHERE
    statusenabled = true
`

export default {
    getAll
}