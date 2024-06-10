import { dateBetweenEmptyString } from "../../../utils/dbutils";

const values = {
    MENUNGGU: 1,
    DISIAPKAN: 2,
    SELESAI: 3,
    DISERAHKAN: 5,
}

const getAll = `
SELECT 
    id AS value, 
    reportdisplay AS label
FROM m_statusfarmasi 
WHERE statusenabled = TRUE
`



export default {
    getAll,
    values
};