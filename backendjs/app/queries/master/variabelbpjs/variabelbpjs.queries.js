const getAll =
    `
    SELECT 
    id AS value, 
    reportdisplay AS label
        FROM 
        m_variabelbpjs mvb
            WHERE statusenabled = true`;

export default {
    getAll
};