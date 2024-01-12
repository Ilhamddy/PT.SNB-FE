const getAll =
    `
SELECT 
    id as value, 
    statusperkawinan as label 
FROM m_statusperkawinan
WHERE statusenabled = TRUE`;

export default {
    getAll
};