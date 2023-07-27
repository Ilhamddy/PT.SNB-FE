const getAll =
    `SELECT id as value, 
    jenisproduk as label 
    FROM m_jenisproduk
        WHERE statusenabled = true`;

export default {
    getAll
};