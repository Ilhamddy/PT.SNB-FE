const getAll =
    `
    SELECT 
    id AS value, 
    no_rekening AS label,
    objectbankfk
        FROM 
        m_rekeningrs mr
            WHERE statusenabled = true`;

export default {
    getAll
};