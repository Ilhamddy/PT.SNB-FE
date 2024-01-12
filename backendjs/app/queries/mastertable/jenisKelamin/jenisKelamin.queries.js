const getAll =
    `
SELECT 
    id as value, 
    statusenabled, 
    kodeexternal, 
    namaexternal, 
    reportdisplay, 
    jeniskelamin AS label 
FROM m_jeniskelamin mj 
WHERE statusenabled = true`;

export default {
    getAll
};