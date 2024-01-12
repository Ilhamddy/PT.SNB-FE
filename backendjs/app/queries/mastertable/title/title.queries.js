const getAll =
    `
SELECT 
    id as value, 
    namatitle  as label 
FROM m_titlepasien
WHERE statusenabled = TRUE`;

export default {
    getAll
};