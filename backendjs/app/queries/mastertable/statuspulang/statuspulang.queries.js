export const daftarStatusPulang = {
    PULANG: 1,
    RAWAT: 2,
    RUJUK: 3,
}

const getAll =
`SELECT 
    id as value, 
    reportdisplay as label 
FROM m_statuspulangri 
WHERE statusenabled=true`;

export default {
    getAll,
};