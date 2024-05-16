const getDaftarPasienRegistrasi = (query) => `
SELECT 
    td.norec as norecdp,
    mj.jenispenjamin,
    mi.namainstalasi,
    mp.id AS idpasien,
    mp.nocm,
    td.noregistrasi,
    mp.namapasien,
    to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
    mp2.reportdisplay || '-' ||ta.noantrian as noantrian,
    mp2.namalengkap as namadokter,
    case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile
FROM t_daftarpasien td 
    join m_pasien mp on mp.id=td.nocmfk 
    join t_antreanpemeriksaan ta ON 
        (
            ta.objectdaftarpasienfk =td.norec AND 
            ta.statusenabled = TRUE AND
            td.objectunitlastfk=ta.objectunitfk
        )
    join m_unit mu on mu.id=ta.objectunitfk 
    join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk
    join m_instalasi mi on mi.id=mu.objectinstalasifk
    join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
` + query;

export default {
    getDaftarPasienRegistrasi
}