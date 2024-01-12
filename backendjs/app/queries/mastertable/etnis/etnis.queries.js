const getAll =
    `
SELECT 
    id as value, 
    etnis as label 
FROM m_etnis 
WHERE statusenabled = TRUE`;

export default {
    getAll
};