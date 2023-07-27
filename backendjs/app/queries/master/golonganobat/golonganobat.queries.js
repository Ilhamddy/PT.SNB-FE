const getAll =
    `
    SELECT 
    id AS value, 
    golonganobat AS label
        FROM 
        m_golonganobat mg
            WHERE statusenabled = true`;

export default {
    getAll
};