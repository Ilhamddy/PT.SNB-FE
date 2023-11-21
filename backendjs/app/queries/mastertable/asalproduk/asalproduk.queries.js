const getAll =
    `SELECT id as value, 
    asalproduk as label 
        FROM m_asalproduk 
            WHERE statusenabled = true`;

export default {
    getAll
};