const getAll =
    "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp, to_char(tgllahir,'yyyy-MM-dd')tgllahir, alamatrmh  from m_pasien";

const addPost =
    "insert into  m_pasien (nocm,namapasien,noidentitas) values ($1,$2,$3)";

const checkNewNumber = "select new_number,extention from running_number where id =1";

const getPasienByNocm = "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp  from m_pasien where nocm = $1";

const updateRunning_number = "update running_number set new_number = $1 where id = 1";

const updatePasienById = "update m_pasien set namapasien=$1,noidentitas=$2 ,nobpjs=$3 ,nohp=$4 where id = $5";

const getPasienById = "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp, tgllahir  from m_pasien where id = $1";

const getPasienByNoregistrasi = `select mp.nocm,td.noregistrasi,mp.namapasien,
to_char(td.tglregistrasi,'yyyy-MM-dd'),mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter  from t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on ta.noregistrasifk =td.norec
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
 where td.noregistrasi = $1`;

// const getAllByOr = 
//     "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp,"+
//     " to_char(tgllahir,'yyyy-MM-dd')tgllahir, alamatrmh  from m_pasien ";
const getAllByOr = `select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp,to_char(tgllahir,'yyyy-MM-dd')tgllahir, alamatrmh  from m_pasien`;

const getDaftarPasienRawatJalan = `select mj.jenispenjamin,ta.taskid,mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter  from t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on ta.noregistrasifk =td.norec
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
join m_instalasi mi on mi.id=mu.objectinstalasifk
join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk`;

const getDaftarPasienRegistrasi = `select mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter  from t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on ta.noregistrasifk =td.norec
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
join m_instalasi mi on mi.id=mu.objectinstalasifk`;

module.exports = {
    getAll,
    addPost,
    checkNewNumber,
    getPasienByNocm,
    updateRunning_number,
    updatePasienById,
    getPasienById,
    getAllByOr,
    getPasienByNoregistrasi,
    getDaftarPasienRawatJalan,
    getDaftarPasienRegistrasi
};