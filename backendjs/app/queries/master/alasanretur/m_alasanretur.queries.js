const getAll = `
SELECT 
    id as value, 
    reportdisplay as label 
FROM m_alasanretur 
    WHERE statusenabled=true`;

export default {
    getAll
};