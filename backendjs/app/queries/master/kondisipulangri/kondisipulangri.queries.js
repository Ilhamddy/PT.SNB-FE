const getAll =
    `SELECT id as value, 
    reportdisplay as label 
        FROM 
        m_kondisipulangri 
            where 
            statusenabled=true`;

export default {
    getAll
};