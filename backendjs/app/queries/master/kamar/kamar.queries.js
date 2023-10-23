const getAll =  `
SELECT 
    id as value, 
    reportdisplay as label, 
    objectunitfk,objectkelasfk 
FROM m_kamar 
WHERE statusenabled=true`;


export default {
    getAll
};