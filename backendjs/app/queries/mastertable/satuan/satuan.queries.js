const getAll =
    `
    SELECT 
    id AS value, 
    satuan AS label
        FROM 
        m_satuan ms
            WHERE statusenabled = true`;

const getSatuanProduk =
    `
    SELECT
    id AS value,
    satuan AS label
        FROM
        m_satuan ms
            WHERE statusenabled = true
            AND objectjenissatuanfk = 2`;


export default {
    getAll,
    getSatuanProduk
};