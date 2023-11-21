const getAll =
    `SELECT id as value, 
    reportdisplay as label 
        FROM 
        m_statuspulangri 
            where 
            statusenabled=true`;

export default {
    getAll
};