const getAll =
    `
SELECT 
    id as value, 
    pendidikan as label 
FROM m_pendidikan 
WHERE statusenabled = TRUE`;

export default {
    getAll
};