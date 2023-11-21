const getAll =
`
SELECT 
    id AS value, 
    sediaan AS label
FROM 
    m_sediaan ms
WHERE statusenabled = true`;

export default {
    getAll
};