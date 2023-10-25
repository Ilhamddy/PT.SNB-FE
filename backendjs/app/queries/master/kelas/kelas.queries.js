const getAll =
    `
SELECT 
    id as value, 
    namakelas as label, 
    kelas_bpjs 
FROM m_kelas 
WHERE statusenabled=true`;

export default {
    getAll
};