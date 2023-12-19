const getAll =
`
SELECT 
    id AS value, 
    reportdisplay AS label
FROM 
    m_generik mg
WHERE statusenabled = true`;

export default {
    getAll
};