const getAll =
    `
    SELECT 
    id AS value, 
    satuan AS label
        FROM 
        m_satuan ms
            WHERE statusenabled = true`;

export default {
    getAll
};