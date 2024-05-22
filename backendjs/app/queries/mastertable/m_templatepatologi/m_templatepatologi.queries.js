
const getAll = `
SELECT
    mtp.pemeriksaan AS label,
    mtp.id AS value,
    mtp.expertise AS expertise
FROM m_templatepatologi mtp
WHERE mtp.statusenabled = TRUE
`

export default {
    getAll
};