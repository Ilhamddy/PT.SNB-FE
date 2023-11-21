const getAll =  `
SELECT 
    id as value, 
    reportdisplay as label, 
    objectunitfk,objectkelasfk 
FROM m_kamar 
WHERE statusenabled=true`;

const getAllRj =  `
SELECT 
    id as value, 
    reportdisplay as label, 
    objectunitfk,objectkelasfk 
FROM m_kamar 
WHERE statusenabled=true
    AND kodeexternal='rj'`;


export default {
    getAll,
    getAllRj
};