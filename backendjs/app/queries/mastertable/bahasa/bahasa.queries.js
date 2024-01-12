const getAll =
    `
SELECT 
    id as value, 
    bahasa as label 
FROM m_bahasa 
WHERE statusenabled = TRUE`;

export default {
    getAll
};