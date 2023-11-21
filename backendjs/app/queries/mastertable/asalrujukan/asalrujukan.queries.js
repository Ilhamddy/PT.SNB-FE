const getAll =
    `SELECT id as value, 
    asalrujukan as label 
        FROM m_asalrujukan 
            WHERE statusenabled = true`;

export default {
    getAll
};