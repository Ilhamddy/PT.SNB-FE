const getAll =
`SELECT id as value, 
reportdisplay as label 
FROM m_jenisresep
    WHERE statusenabled = true`;

export default {
    getAll
};