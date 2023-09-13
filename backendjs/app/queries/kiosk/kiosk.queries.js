const qUnit = `select id as value, reportdisplay as label from m_unit mu where objectinstalasifk=1
and mu.statusenabled=true
`

const qDokter = `select id as value,namalengkap as label from m_pegawai where statusenabled=true
`

export default {
    qUnit,
    qDokter
}