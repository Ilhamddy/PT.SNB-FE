const qUnit = `select id as value, reportdisplay as label from m_unit mu where objectinstalasifk=1
and mu.statusenabled=true
`

const qDokter = `select id as value,namalengkap as label, objectunitfk from m_pegawai where statusenabled=true
`

const qCariPasien = `select mp.nocm,mp.id,mp.namapasien,to_char(mp.tgllahir,
    'dd Month YYYY') as tgllahir  from m_pasien mp where mp.nocm = $1 or noidentitas = $1
and mp.statusenabled=true
`

export default {
    qUnit,
    qDokter,
    qCariPasien
}