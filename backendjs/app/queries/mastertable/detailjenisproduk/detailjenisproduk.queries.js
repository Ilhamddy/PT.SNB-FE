const getAll =
    `
    SELECT 
    id AS value, 
    detailjenisproduk AS label
        FROM 
        m_detailjenisproduk mdjp
            WHERE statusenabled = true`;

export default {
    getAll
};