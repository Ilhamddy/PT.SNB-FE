const getAll =
    `SELECT 
    id as value, 
    reportdisplay as label 
        FROM 
        m_carapulangri 
            WHERE 
            statusenabled=true`;

export default {
    getAll
};  