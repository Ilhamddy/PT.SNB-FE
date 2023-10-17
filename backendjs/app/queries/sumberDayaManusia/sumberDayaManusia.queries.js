const qDaftarPegawai = `select row_number() OVER (ORDER BY mp.id) AS no,mp.nip,mp.id,mp.namalengkap,mp.reportdisplay as inisial,
case when mp.statusenabled=true then 'AKTIP' else 'NON AKTIP' end as status,ms.reportdisplay as statuspegawai,mu.namaunit,
mp2.reportdisplay as profesi  from m_pegawai mp
left join m_unit mu on mu.id=mp.objectunitfk 
left join m_statuspegawai ms on ms.id=mp.objectstatuspegawaifk
left join m_profesipegawai mp2 on mp2.id=mp.objectprofesipegawaifk`

const qUnit = `select mu.id as value, mu.namaunit as label from m_unit mu where mu.statusenabled=true`
export default {
    qDaftarPegawai,
    qUnit
}