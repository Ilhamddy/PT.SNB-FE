const getAll =
`
SELECT 
    id AS value, 
    reportdisplay AS label
FROM m_jenisorderbarang 
WHERE statusenabled=true
`;



export default {
    getAll
};