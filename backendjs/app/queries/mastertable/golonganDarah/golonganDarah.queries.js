const getAll =
    `
SELECT 
    id as value, 
    golongandarah as label 
FROM m_golongandarah
WHERE statusenabled = TRUE`;

export default {
    getAll
};