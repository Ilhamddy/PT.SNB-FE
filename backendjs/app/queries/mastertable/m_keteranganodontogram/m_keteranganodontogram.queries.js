import { emptyIlike } from "../../../utils/dbutils";

const qGetComboOdontogram = `
SELECT
    mko.reportdisplay AS label,
    mko.id AS value
FROM m_keteranganodontogram mko
WHERE ${emptyIlike("mko.keterangan", ":keterangan")}
    AND mko.statusenabled = TRUE
`

export default {
    qGetComboOdontogram
};