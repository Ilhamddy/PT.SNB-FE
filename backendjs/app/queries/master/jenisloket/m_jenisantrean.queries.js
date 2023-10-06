const getAll =
`
SELECT 
    id as value, 
    prefix || ' (' || reportdisplay ||')' as label 
FROM m_jenisantrean 
WHERE statusenabled=true`;

export default {
    getAll
};