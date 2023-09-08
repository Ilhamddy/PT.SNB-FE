const getAll =
`
SELECT 
    id as value, 
    kodeexternal || ' - ' || reportdisplay as label 
FROM m_masterrl 
WHERE statusenabled=true`;

export default {
    getAll
};