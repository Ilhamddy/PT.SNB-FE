const getAll =
    "SELECT id as value, reportdisplay as label, objectkamarfk,objectstatusbedfk FROM m_tempattidur where statusenabled=true";

const qGetTempatTidurIHS =`select mt.reportdisplay,mt.ihs_id,mk.ihs_id as ihs_kamar,mt.id,mu.namaunit,mu.ihs_id as ihs_unit,mk2.namakelas,mk2.kelas_bpjs ,
'Bed '|| mt.reportdisplay  ||' Kamar '||mk.namakamar ||', '||mi.namainstalasi ||', '||mk2.namakelas as description,
mi.ihs_id as ihs_instalasi
from m_kamar mk 
join m_unit mu ON mu.id=mk.objectunitfk
join m_kelas mk2 on mk2.id=mk.objectkelasfk
join m_instalasi mi on mi.id=mu.objectinstalasifk
join m_tempattidur mt on mt.objectkamarfk=mk.id
and mk.statusenabled=true`
export default {
    getAll,
    qGetTempatTidurIHS
};