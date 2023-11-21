const getAll =
    `
SELECT 
    id as value, 
    jenisproduk AS label,
    objectinstalasifk AS valueinstalasi
FROM m_jenisproduk
WHERE statusenabled = true`;

export default {
    getAll
};