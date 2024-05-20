import { emptyIlike } from "../../../utils/dbutils";

const values = {
    laboratorium: 1,
    radiologi: 2,
    operasi: 3,
    bankDarah: 4,
    patologiAnatomi: 5
}

const getAll = `
SELECT
    mjo.reportdisplay AS label,
    mjo.id AS value
FROM m_jenisorder mjo
WHERE mjo.statusenabled = TRUE
`

export default {
    getAll,
    values
};