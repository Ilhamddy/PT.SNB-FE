const getAll =
`
SELECT 
    id as value, 
    reportdisplay as label 
FROM m_loket 
WHERE statusenabled=true`;

export default {
    getAll
};