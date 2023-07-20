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
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
 where td.noregistrasi = $1`;

// const getAllByOr = 
//     "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp,"+
//     " to_char(tgllahir,'yyyy-MM-dd')tgllahir, alamatrmh  from m_pasien ";
const getAllByOr = `select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp,to_char(tgllahir,'yyyy-MM-dd')tgllahir, alamatrmh  from m_pasien`;

const getDaftarPasienRawatJalan = `select td.norec as norecdp,ta.norec as norecta,mj.jenispenjamin,ta.taskid,mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter,
trm.objectstatuskendalirmfk as objectstatuskendalirmfkap, 
trm.norec as norectrm  from t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
join m_instalasi mi on mi.id=mu.objectinstalasifk
join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
left join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec`;


const getDaftarPasienRegistrasi = `select mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter  from t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
join m_instalasi mi on mi.id=mu.objectinstalasifk`;

const getHeaderEmr = `select mu2.namaunit as ruanganta,mr.namarekanan,to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY Tahun mm Bulan DD Hari')) AS umur,
mj2.jeniskelamin,td.norec as norecdp,ta.norec as norecta,mj.jenispenjamin,ta.taskid,mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
to_char(mp.tgllahir,'dd Month YYYY') as tgllahir,mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter  from t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
join m_instalasi mi on mi.id=mu.objectinstalasifk
join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
left join m_jeniskelamin mj2 on mj2.id=mp.objectjeniskelaminfk
left join m_rekanan mr on mr.id=td.objectpenjaminfk
left join m_unit mu2 on mu2.id=ta.objectunitfk `;

const widgetgetDaftarPasienRawatInap = `select objectstatusbedfk  from m_tempattidur mt where statusenabled =true`;

const getDaftarPasienRawatInap = `SELECT 
td.norec as norecdp,
ta.norec as norecta,
mj.jenispenjamin,
ta.taskid,mi.namainstalasi,
mp.nocm,
td.noregistrasi,
mp.namapasien,
to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,
mp2.namalengkap as namadokter,
mk.reportdisplay as kamar, 
mt.reportdisplay as nobed from t_daftarpasien td 
    join m_pasien mp on mp.id=td.nocmfk 
    join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec
    join m_unit mu on mu.id=ta.objectunitfk 
    left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
    join m_instalasi mi on mi.id=mu.objectinstalasifk
    join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
    join m_kamar mk on ta.objectkamarfk =mk.id
    join m_tempattidur mt on ta.nobed = mt.id
    where td.tglpulang is null`;

const qGetDepositFromPasien = 
    `
    SELECT 
    dpst.norec AS norec,
    dpst.nominal AS nominal,
    dpst.tglinput AS tglinput,
    bb.no_bukti AS nobukti
    FROM t_depositpasien dpst
        LEFT JOIN t_buktibayarpasien bb ON bb.norec = dpst.objectbuktibayarpasienfk
            WHERE dpst.objectdaftarpasienfk = $1
            AND dpst.statusenabled = true
    `

const getRekapBilling = `select variabelbpjs, sum(totalharga) from (
	select mv.reportdisplay as variabelbpjs,tp.total as totalharga, * 
	from t_pelayananpasien tp 
	join m_produk mp on tp.objectprodukfk = mp.id 
	join m_variabelbpjs mv on mp.objectvariabelbpjsfk = mv.id 
	join t_antreanpemeriksaan ta on tp.objectantreanpemeriksaanfk = ta.norec 
	join t_daftarpasien td on ta.objectdaftarpasienfk = td.norec 
	where td.norec = 'c7142bae-2c17-4af4-b217-136f1092'
) aa
group by aa.variabelbpjs`;


export default {
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
    getDaftarPasienRegistrasi,
    getHeaderEmr,
    widgetgetDaftarPasienRawatInap,
    getDaftarPasienRawatInap,
    getRekapBilling,
    qGetDepositFromPasien
};