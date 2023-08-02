const getAll =
    `SELECT id as value, 
    namaproduk as label 
        FROM m_produk 
            WHERE statusenabled = true`;

const getObatWithSatuan =
    `SELECT id as value, 
    namaproduk as label,
    objectsatuanstandarfk as valuesatuanstandar
        FROM m_produk 
            WHERE statusenabled = true
            AND (
                isobat = true
                OR isbmhp = true
                OR isalkes = true
            )`;

export default {
    getAll,
    getObatWithSatuan
};