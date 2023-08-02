const getAll =
    `SELECT id as value, 
    namarekanan as label, 
    objectjenispenjaminfk 
        FROM m_rekanan 
            WHERE statusenabled = true`;

const getSupplier = 
    `SELECT id as value,
    namarekanan as label,
    objectjenisrekananfk
        FROM m_rekanan
            WHERE statusenabled = true
            AND objectjenisrekananfk = 1`;

export default {
    getAll,
    getSupplier
};