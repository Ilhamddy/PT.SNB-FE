const getAll =
    `
SELECT 
    id as value, 
    pekerjaan as label 
FROM m_pekerjaan 
WHERE statusenabled = TRUE`;

export default {
    getAll
};