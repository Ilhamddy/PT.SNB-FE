const getAll =
`
SELECT 
    id AS value, 
    reportdisplay AS label
FROM 
    m_hari mh
WHERE statusenabled = true`;

export default {
    getAll
};