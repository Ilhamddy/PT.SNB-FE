const getAll =
    `
SELECT 
    id as value, 
    namanegara  as label
FROM m_negara 
WHERE statusenabled = TRUE`;

export default {
    getAll
};