const getAll =
    `SELECT id as value, 
    namaproduk as label 
        FROM m_produk 
            WHERE statusenabled = true`;

const getProdukWithSatuan =
`
SELECT 
    id as value, 
    namaproduk as label,
    objectsatuanstandarfk as valuesatuanstandar
FROM m_produk 
`;

const getObatWithSatuan = getProdukWithSatuan + `
WHERE statusenabled = true
    AND (
        isobat = true
        OR isbmhp = true
        OR isalkes = true
    )
`

const qGetLogistikWithSatuan = getProdukWithSatuan + `
WHERE statusenabled = true
    AND islogistik = true   
`


export default {
    getAll,
    getProdukWithSatuan,
    getObatWithSatuan,
    qGetLogistikWithSatuan
};