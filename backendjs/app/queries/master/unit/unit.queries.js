const getAll =
    "SELECT id as value, namaunit as label, objectinstalasifk FROM m_unit  where statusenabled = true";

const getRawatInap =
    `SELECT 
    id as value, 
    namaunit as label, 
    objectinstalasifk 
        FROM 
        m_unit  
            WHERE 
            statusenabled = true
            and objectinstalasifk = 2`
            ;


export default {
    getAll,
    getRawatInap
};