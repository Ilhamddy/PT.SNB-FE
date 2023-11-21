const getAll =
`
SELECT 
    id as value, 
    reportdisplay as label 
FROM m_kondisipulangri 
WHERE statusenabled=true`;

export default {
    getAll
};