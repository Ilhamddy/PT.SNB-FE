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

const qGetKamarIhs = `select mk.namakamar,mk.ihs_id,mk.id,mu.namaunit,mu.ihs_id as ihs_unit,mk2.namakelas,mk2.kelas_bpjs,
'Kamar '||mk.namakamar ||', '||mi.namainstalasi ||', '||mk2.namakelas as description,mi.ihs_id as ihs_instalasi  from m_kamar mk 
join m_unit mu ON mu.id=mk.objectunitfk
join m_kelas mk2 on mk2.id=mk.objectkelasfk
join m_instalasi mi on mi.id=mu.objectinstalasifk
and mk.statusenabled=true order by mk.id`

export default {
    getAll,
    getAllRj,
    qGetKamarIhs
};