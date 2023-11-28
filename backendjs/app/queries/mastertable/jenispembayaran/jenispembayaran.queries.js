const getAll =
`
SELECT 
    id AS value, 
    reportdisplay AS label
FROM m_jenispembayaran 
WHERE statusenabled=true
`;



export default {
    getAll
};