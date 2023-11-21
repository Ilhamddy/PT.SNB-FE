const getAll =
    `
SELECT 
    mdjp.id AS value, 
    mdjp.detailjenisproduk AS label,
    mdjp.objectjenisprodukfk AS valuejenisproduk,
    mjp.jenisproduk AS labeljenisproduk
FROM m_detailjenisproduk mdjp
    LEFT JOIN m_jenisproduk mjp ON mjp.id = mdjp.objectjenisprodukfk
WHERE mdjp.statusenabled = true`;

export default {
    getAll
};