const getAll =
    `SELECT id as value, 
    jenissatuan as label 
    FROM m_jenissatuan
        WHERE statusenabled = true`;

export default {
    getAll
};