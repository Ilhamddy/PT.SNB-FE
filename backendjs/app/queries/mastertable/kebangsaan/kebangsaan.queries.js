const getAll =
    `
SELECT 
    id as value, 
    name  as label 
FROM m_kebangsaan
WHERE statusenabled = TRUE`;

export default {
    getAll
};