const getAll =  `
SELECT 
    id as value, 
    statusbed as label
FROM m_statusbed 
WHERE statusenabled=true`;


export default {
    getAll,
};