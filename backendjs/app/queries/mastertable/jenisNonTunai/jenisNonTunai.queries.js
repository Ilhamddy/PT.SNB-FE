const getAll =
    `SELECT 
    id AS value, 
    nontunai AS label 
        FROM 
        m_jenisnontunai mj 
            WHERE statusenabled = true`;

export default {
    getAll
};