const getAll =
    `
SELECT 
    id as value, 
    reportdisplay as label
FROM m_spesialisasi 
WHERE statusenabled=true`;

export default {
    getAll
};