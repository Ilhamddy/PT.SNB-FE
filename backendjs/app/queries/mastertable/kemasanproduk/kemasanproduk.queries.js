const getAll =
`
SELECT 
    id AS value, 
    barcode AS label
FROM m_kemasanproduk 
WHERE statusenabled=true`;



export default {
    getAll
};