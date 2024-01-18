const getAll =
    "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp, to_char(tgllahir,'yyyy-MM-dd')tgllahir, alamatrmh  from m_pasien";

const addPost =
    "insert into  m_pasien (nocm,namapasien,noidentitas) values ($1,$2,$3)";

const checkNewNumber = "select new_number,extention from running_number where id =1";

const getPasienByNocm = "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp  from m_pasien where nocm = $1";

const updateRunning_number = "update running_number set new_number = $1 where id = 1";

const updatePasienById = "update m_pasien set namapasien=$1,noidentitas=$2 ,nobpjs=$3 ,nohp=$4 where id = $5";

const getPasienById = `select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp, to_char(tgllahir,'yyyy-MM-dd')as tgllahir,
tgldaftar,
case when (current_date - to_date(to_char(tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
when (current_date - to_date(to_char(tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and objectjeniskelaminfk=1 then 'anaklaki'
when (current_date - to_date(to_char(tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and objectjeniskelaminfk=2 then 'anakperempuan'
when (current_date - to_date(to_char(tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and objectjeniskelaminfk=1 then 'dewasalaki'
when (current_date - to_date(to_char(tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and objectjeniskelaminfk=2 then 'dewasaperempuan'
when (current_date - to_date(to_char(tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and objectjeniskelaminfk=1 then 'kakek'
when (current_date - to_date(to_char(tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile
 from m_pasien where id = $1`;

const getPasienByNoregistrasi = `
    select 
    mp.nocm,
    td.noregistrasi,
    mp.namapasien,
    to_char(td.tglregistrasi,'yyyy-MM-dd'),
    mu.namaunit,
    mp2.reportdisplay || '-' ||ta.noantrian as noantrian,
    mp2.namalengkap as namadokter  
    from t_daftarpasien td 
    join m_pasien mp on mp.id=td.nocmfk 
    join t_antreanpemeriksaan ta on (
        ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE
    )
    join m_unit mu on mu.id=ta.objectunitfk 
    left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
    where td.noregistrasi = $1`;

// const getAllByOr = 
//     "select id,nocm ,namapasien ,noidentitas ,nobpjs ,nohp,"+
//     " to_char(tgllahir,'yyyy-MM-dd')tgllahir, alamatrmh  from m_pasien ";
const getAllByOr = `
select 
case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile,
    mp.id,
    mp.nocm ,mp.namapasien ,mp.noidentitas ,mp.nobpjs,
    mp.nohp,to_char(mp.tgllahir,'yyyy-MM-dd') as tgllahir,mp.alamatrmh  || ' / ' || mp.rtktp || ' / '||mp.rwktp || ' - ' || md.namadesakelurahan || ' - ' || 
    mk.namakecamatan || ' - ' || mk2.namakabupaten  as alamatrmh,'#FFFFFF' as color ,
    mj.jeniskelamin,mg.golongandarah,mp.alamatdomisili || ' / ' || mp.rtdomisili || ' / '||mp.rwdomisili  || ' - ' || md2.namadesakelurahan 
    || ' - ' || mk3.namakecamatan || ' - ' || mk4.namakabupaten  as alamatdomisili,mp.notelepon,mp.namaibu,mp2.pendidikan,
    mp3.pekerjaan,ma.agama,ms.statusperkawinan,mp.namasuamiistri,mp.ihs_id, ms.ihs_code, ms.ihs_display,mj.namaexternal as ihs_jeniskelamin,
    mk2.namakabupaten,md.kodepos,md.kodeexternal as kodedesa,mk.kodeexternal as kodekecamatan,mk2.kodeexternal as kodekabupaten,
	mpv.kodeexternal as kodeprovinsi,mp.rtktp,mp.rwktp,mp.objectkebangsaanfk,mp.objectetnisfk,mp.objectdesakelurahanktpfk,
    mk.namakecamatan,mk2.namakabupaten,mpv.namaprovinsi,md.kodepos,mp.objectnegaraktpfk,mp.alamatdomisili,mp.rtdomisili,mp.rwdomisili,
    mp.objectdesakelurahandomisilifk,mk3.namakecamatan as kecamatandomisili, mk4.namakabupaten as kabupatendomisili,
    mpv2.namaprovinsi as provinsidomisili,md2.kodepos as posdomisilis,mp.objectnegaradomisilifk
from m_pasien mp
left join m_jeniskelamin mj on mj.id=mp.objectjeniskelaminfk
left join m_golongandarah mg on mg.id=mp.objectgolongandarahfk
left join m_pendidikan mp2 on mp2.id=mp.objectpendidikanfk
left join m_pekerjaan mp3 on mp3.id=mp.objectpekerjaanfk
left join m_agama ma on ma.id=mp.objectagamafk
left join m_statusperkawinan ms on ms.id=mp.objectstatusperkawinanfk
left join m_desakelurahan md on md.id=mp.objectdesakelurahanktpfk
left join m_kecamatan mk on mk.id=md.objectkecamatanfk
left join m_kabupaten mk2 on mk2.id=md.objectkabupatenfk
left join m_desakelurahan md2 on md2.id=mp.objectdesakelurahandomisilifk 
left join m_kecamatan mk3  on mk3.id=md2.objectkecamatanfk
left join m_kabupaten mk4  on mk4.id=md2.objectkabupatenfk
left join m_provinsi mpv on mpv.id=md.objectprovinsifk 
left join m_provinsi mpv2  on mpv2.id=md2.objectprovinsifk`;

const getDaftarPasienRawatJalan = `
SELECT td.norec as norecdp,
    ta.norec as norecta,
    mj.jenispenjamin,
    ta.taskid,mi.namainstalasi,
    mp.nocm,
    td.noregistrasi,
    mp.namapasien,
    to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
    mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter,
    trm.objectstatuskendalirmfk as objectstatuskendalirmfkap, 
    trm.norec as norectrm,
    mp.noidentitas as noidentitas,
    case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile,
    mp.ihs_id,td.ihs_id as ihs_id_daftarpasien,mp2.ihs_id as ihs_dpjp,td.tglregistrasi as tglregistrasi_ihs,td.tglpulang as tglpulang_ihs,
    mu.ihs_id as ihs_unit
FROM t_daftarpasien td 
    join m_pasien mp on mp.id=td.nocmfk 
    join t_antreanpemeriksaan ta on (
        ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE
    )
    join m_unit mu on mu.id=ta.objectunitfk 
    left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
    join m_instalasi mi on mi.id=mu.objectinstalasifk
    join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
    left join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec `;

const getDaftarPasienIGD = `select td.norec as norecdp,
    ta.norec as norecta,
    mj.jenispenjamin,
    ta.taskid,mi.namainstalasi,
    mp.nocm,
    td.noregistrasi,
    mp.namapasien,
    to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,mu.namaunit,
    mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter,
    trm.objectstatuskendalirmfk as objectstatuskendalirmfkap, 
    trm.norec as norectrm,
    mp.noidentitas as noidentitas,
    case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile
    FROM t_daftarpasien td 
    join m_pasien mp on mp.id=td.nocmfk 
    join t_antreanpemeriksaan ta on (
        ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE
    )
    join m_unit mu on mu.id=ta.objectunitfk 
    left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
    join m_instalasi mi on mi.id=mu.objectinstalasifk
    join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
    left join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec `;


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

const getHeaderEmr = `select mu2.namaunit as ruanganta,mr.namarekanan,to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY Tahun mm Bulan DD Hari')) AS umur,
mj2.jeniskelamin,td.norec as norecdp,ta.norec as norecta,mj.jenispenjamin,ta.taskid,mi.namainstalasi,mp.nocm,td.noregistrasi,mp.namapasien,
to_char(mp.tgllahir,'dd Month YYYY') as tgllahir,mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,mp2.namalengkap as namadokter  from t_daftarpasien td 
join m_pasien mp on mp.id=td.nocmfk 
join t_antreanpemeriksaan ta on (
    ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE
)
join m_unit mu on mu.id=ta.objectunitfk 
left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
join m_instalasi mi on mi.id=mu.objectinstalasifk
join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
left join m_jeniskelamin mj2 on mj2.id=mp.objectjeniskelaminfk
left join m_rekanan mr on mr.id=td.objectpenjaminfk
left join m_unit mu2 on mu2.id=ta.objectunitfk `;

const widgetgetDaftarPasienRawatInap = `
select 
    objectstatusbedfk 
from 
    m_tempattidur mt 
where statusenabled =true`;

const qGetPasienFormById = `
    SELECT
    mp.id AS id,
    mp.namapasien AS namapasien,
    mp.noidentitas AS noidentitas,
    mp.objectjeniskelaminfk AS jeniskelamin,
    mp.objecttitlefk AS titlepasien,
    mp.tgllahir AS tgllahir,
    mp.tempatlahir AS tempatlahir,
    mp.objectagamafk AS agama,
    mp.objectgolongandarahfk AS goldarah,
    mp.objectkebangsaanfk AS kebangsaan,
    mp.objectstatusperkawinanfk AS statusperkawinan,
    mp.objectpendidikanfk AS pendidikan,
    mp.objectpekerjaanfk AS pekerjaan,
    mp.objectetnisfk AS suku,
    mp.objectbahasafk AS bahasa,
    mp.alamatrmh AS alamatktp,
    mp.rtktp AS rt,
    mp.rwktp AS rw,
    mp.objectdesakelurahanktpfk AS desa,
    mdk.namadesakelurahan AS labelDesa,
    mkck.namakecamatan AS kecamatan,
    mkbk.namakabupaten AS kota,
    mpk.namaprovinsi AS provinsi,
    mdk.kodepos AS pos,
    mp.objectnegaradomisilifk AS negara,
    mnk.namanegara AS labelNegara,
    mp.rtdomisili AS rtdomisili,
    mp.rwdomisili AS rwdomisili,
    mp.alamatdomisili AS alamatDomisili,
    mp.objectdesakelurahanktpfk AS desaDomisili, 
    mdd.namadesakelurahan AS labelDesaDomisili,
    mkcd.namakecamatan AS kecamatanDomisili,
    mkbd.namakabupaten AS kotaDomisili,
    mpd.namaprovinsi AS provinsiDomisili,
    mdd.kodepos AS posDomisili,
    mnd.id AS negaraDomisili,
    mnd.namanegara AS labelNegaraDomisili,
    mp.nobpjs AS nobpjs,
    mp.namaibu AS namaibu,
    mp.namaayah AS namaayah,
    mp.namasuamiistri AS namasuamiistri,
    mp.namakeluarga AS namakeluargalain,
    mp.nohp AS nohp,
    mp.notelepon AS notelepon,
    mp.nocm AS nocm,
    mp.nocmtemp AS nocmtemp
FROM m_pasien mp
    LEFT JOIN m_negara mnk ON mnk.id = mp.objectnegaraktpfk
    LEFT JOIN m_desakelurahan mdk ON mdk.id = mp.objectdesakelurahanktpfk
    LEFT JOIN m_provinsi mpk ON mpk.id = mdk.objectprovinsifk
    LEFT JOIN m_kabupaten mkbk ON mkbk.id = mdk.objectkabupatenfk
    LEFT JOIN m_kecamatan mkck ON mkck.id = mdk.objectkecamatanfk
    LEFT JOIN m_negara mnd ON mnk.id = mp.objectnegaradomisilifk
    LEFT JOIN m_desakelurahan mdd ON mdd.id = mp.objectdesakelurahandomisilifk
    LEFT JOIN m_provinsi mpd ON mpd.id = mdd.objectprovinsifk
    LEFT JOIN m_kabupaten mkbd ON mkbd.id = mdd.objectkabupatenfk
    LEFT JOIN m_kecamatan mkcd ON mkcd.id = mdd.objectkecamatanfk
WHERE mp.id = $1
`

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
    mp.noidentitas as noidentitas,
    mt.reportdisplay as nobed,
    case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile
from t_daftarpasien td 
    join m_pasien mp on mp.id=td.nocmfk 
    join t_antreanpemeriksaan ta on (
        ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE  and td.objectunitlastfk=ta.objectunitfk 
    )
    join m_unit mu on mu.id=ta.objectunitfk 
    left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
    join m_instalasi mi on mi.id=mu.objectinstalasifk
    join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
    join m_kamar mk on ta.objectkamarfk =mk.id
    join m_tempattidur mt on ta.nobed = mt.id
    where td.tglpulang is null AND td.objectinstalasifk = 2`;

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
	join t_daftarpasien td on (
        ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE
    )
	where td.norec = 'c7142bae-2c17-4af4-b217-136f1092'
) aa
group by aa.variabelbpjs`;

const qNoAntrian = `
select 
    count(noantrian) 
from t_antreanpemeriksaan ta
    join m_pegawai mp 
    on mp.id=ta.objectdokterpemeriksafk 
WHERE ta.objectdokterpemeriksafk=$1
    AND ta.tglmasuk between $2 and $3
`

const qDaftarPasienTriage = `
select
	tp.norec,
	tp.namapasien,
	tp.umur,
	tp.keluhan,
	tp.namapj,
	tp.nohp,
	to_char(tp.tglinput,'yyyy-MM-dd HH24:MI') tglinput,
	tp.tglupdate,
	td.noregistrasi,
	mp.nocm,
	to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY Tahun mm Bulan DD Hari')) AS umur,
    to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY Tahun mm Bulan DD Hari')) AS umur,
	case when tp.objectdaruratigdfk = 1 then '#B7DBFD' when tp.objectdaruratigdfk =2 then '#FDB7B7'
	when tp.objectdaruratigdfk =3 then '#FCFDB7' when tp.objectdaruratigdfk =4 then '#B8FDB7'
	else '#E1E1E1' end as statusdarurat, '#FFFFFF' as color,
    case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile
from
	t_pasienigd tp
left join t_daftarpasien td on
	td.norec = tp.objectdaftarpasienfk
left join m_pasien mp on mp.id=td.nocmfk 

`

const qWidgetDaftarPasienTriage = `
SELECT
    COUNT(CASE WHEN tp.objectdaruratigdfk = 1 THEN tp.objectdaruratigdfk END) AS satu,
    COUNT(CASE WHEN tp.objectdaruratigdfk = 2 THEN tp.objectdaruratigdfk END) AS dua,
    COUNT(CASE WHEN tp.objectdaruratigdfk = 3 THEN tp.objectdaruratigdfk END) AS tiga,
    COUNT(CASE WHEN tp.objectdaruratigdfk = 4 THEN tp.objectdaruratigdfk END) AS empat,
    COUNT(CASE WHEN tp.objectdaruratigdfk = 5 THEN tp.objectdaruratigdfk END) AS lima
FROM
    t_pasienigd tp
LEFT JOIN t_daftarpasien td ON td.norec = tp.objectdaftarpasienfk
LEFT JOIN m_pasien mp ON mp.id = td.nocmfk where td.objectstatuspulangfk is null
`

const qM_DaruratIgd = `
select
	md.id as value,
    md.reportdisplay as label
from m_daruratigd md order by md.id asc
`

const qM_HubunganKeluarga = `
select
	md.id as value,
    md.reportdisplay as label
from m_hubungankeluarga md 
where md.statusenabled=true
`

const qGetPasienOnline = `
SELECT
    mp.id AS nocmfk,
    mp.nocm,
    mp.nocmtemp,
    tro.noreservasi,
    tro.tglinput,
    tro.tglrencana,
    mp.namapasien,
    mp.tgllahir,
    td.tglregistrasi,
    mu.namaunit,
    mr.namarekanan,
    mp.nohp,
    td.objectpenjaminfk,
    td.noregistrasi AS noregistrasi,
    td.norec AS norecdp,
    case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile,
    mj.jeniskelamin,mg.golongandarah,mp.alamatdomisili,mp.notelepon,mp.namaibu,mp2.pendidikan,
    mp3.pekerjaan,ma.agama,ms.statusperkawinan,mp.namasuamiistri
FROM t_registrasionline tro
    LEFT JOIN t_daftarpasien td ON td.norec = tro.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = td.nocmfk
    LEFT JOIN m_unit mu ON mu.id = td.objectunitlastfk
    LEFT JOIN m_rekanan mr ON mr.id = td.objectpenjaminfk
    left join m_jeniskelamin mj on mj.id=mp.objectjeniskelaminfk
    left join m_golongandarah mg on mg.id=mp.objectgolongandarahfk
    left join m_pendidikan mp2 on mp2.id=mp.objectpendidikanfk
    left join m_pekerjaan mp3 on mp3.id=mp.objectpekerjaanfk
    left join m_agama ma on ma.id=mp.objectagamafk
    left join m_statusperkawinan ms on ms.id=mp.objectstatusperkawinanfk
WHERE 
    tro.statusenabled = true
    --- find by nocmtemp or namapasien, if empty string, find all
    AND (
        ($1 = '') 
        OR mp.nocmtemp ILIKE '%' || $1 || '%' 
        OR mp.namapasien ILIKE '%' || $1 || '%' 
        OR tro.noreservasi ILIKE '%' || $1 || '%'
    )
    --- find by TGLRENCANA, if both empty, find all
    AND 
        CASE 
            WHEN (($2 = '') OR ($3 = '')) 
            THEN TRUE
            ELSE (
                tro.tglrencana >= cast($2 AS TIMESTAMP) 
                AND tro.tglrencana < cast($3 AS TIMESTAMP)
            )
        END
    --- find by unit, if empty, find all
    AND 
        CASE 
            WHEN (NULLIF($4, '')::int IS NULL)
            THEN TRUE
            ELSE mu.id = NULLIF($4, '')::int
        END
    --- find by jenispasien
    AND 
        CASE 
            WHEN (NULLIF($5, '')::int IS NULL)
                THEN TRUE
            WHEN (NULLIF($5, '')::int = 1)
                THEN mp.nocm IS NULL
            ELSE mp.nocm IS NOT NULL
        END
ORDER BY tro.tglinput DESC
`

const qListPelayananPasienTemp =`select tp.norec,tp.harga,tp.total,tp.qty,
mp.namaproduk, mk.namakelas,mu.namaunit from t_pelayananpasientemp tp 
join t_daftarpasien td on td.norec=tp.objectdaftarpasienfk
join m_produk mp on mp.id=tp.objectprodukfk
join m_kelas mk on mk.id=tp.objectkelasfk
left join m_unit mu on mu.id=tp.objectunitfk
where td.norec=$1`

const qListTotalKlaim = `select sum(tp.total) as total,td.nominalklaim  from t_daftarpasien td 
join t_antreanpemeriksaan ta on (
    ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE
)
join t_pelayananpasien tp on tp.objectantreanpemeriksaanfk=ta.norec
where td.norec=$1
group by tp.total,td.nominalklaim`
const qBiayaTambahan = `select sum(total) as total from t_pelayananpasientemp tp 
where objectdaftarpasienfk=$1`

const qHistoryRegistrasi = `select
ta.norec as norecta,
td.norec,
td.noregistrasi,
to_char(td.tglregistrasi,
'dd Month YYYY HH24:MI') as tglregistrasi,
to_char(td.tglregistrasi,
    'YYYY-MM-DD') as tglregistrasi2,
to_char(td.tglregistrasi,
        'YYYY-MM-DD HH24:MI') as tglregistrasi3,
to_char(td.tglpulang,
'dd Month YYYY HH24:MI') as tglpulang,
to_char(td.tglpulang,
    'YYYY-MM-DD') as tglpulang2,
to_char(td.tglpulang,
        'YYYY-MM-DD HH24:MI') as tglpulang3,
to_char(td.tglregistrasi,
'YYYY-MM-DD HH24:MI') || ' - ' || to_char(td.tglpulang,
        'YYYY-MM-DD HH24:MI') as displaytgl,
mp.nocm,
mp.namapasien,
case when mu.objectinstalasifk=2 then 'RI' else 'RJ' end as tipe,
case when td.objectpenjaminfk=1 then 'JKN' else mr.namarekanan  end as jaminan1,
case when td.objectpenjamin2fk=1 then 'JKN' when td.objectpenjamin2fk is null then '' else 'LAIN-LAIN' end as jaminan2,
tk.no_sep,tk.no_kartu,to_char( mp.tgllahir, TO_CHAR(age( mp.tgllahir,  now( )), 'YY Tahun mm Bulan DD Hari')) AS umur,
mp.tgllahir,mc.caramasuk,to_char( td.tglregistrasi, TO_CHAR(age( td.tglregistrasi,  td.tglpulang), 'DD')) AS los,
case when td.objectcarapulangrifk is null then '1' else mcp.kodeexternal end as kodecarapulang,
case when td.objectcarapulangrifk is null then 'Atas persetujuan dokter' else mcp.reportdisplay end as labelcarapulang,
mpeg.namalengkap as dpjp, mj.kodeexternal as gender,mc.caramasuk as kodecaramasuk,
case when mu.objectinstalasifk=2 then '1' when mu.objectinstalasifk=7 then '3' else '2' end as jenis_rawat,
mk.kelas_bpjs,td.status_grouping,td.cbg_code,td.cbg_description,td.cbg_tarif,td.cbg_mdc_number,
td.cbg_mdc_description,td.cbg_drg_code,td.cbg_drg_description,td.add_payment_amt,mu.namaunit
from
t_daftarpasien td
join m_pasien mp on mp.id=td.nocmfk
join m_unit mu on mu.id=td.objectunitlastfk
left join m_rekanan mr on mr.id=td.objectpenjaminfk
left join m_rekanan mr2 on mr2.id=td.objectpenjamin2fk
left join t_kepesertaanasuransi tk on  tk.objectdaftarpasienfk=td.norec
left join m_caramasuk mc on mc.id=td.objectcaramasukfk
left join m_carapulangri mcp on mcp.id=td.objectcarapulangrifk
left join m_pegawai mpeg on mpeg.id=td.objectdokterpemeriksafk
left join m_jeniskelamin mj on mj.id=mp.objectjeniskelaminfk
join t_antreanpemeriksaan ta on (
    ta.objectdaftarpasienfk =td.norec AND ta.statusenabled = TRUE
)
and td.objectunitlastfk=ta.objectunitfk 
left join m_kelas mk on mk.id=tk.objectkelasfk
where mp.id =$1 and mp.statusenabled=true
order by td.tglregistrasi desc
limit 5`

const qGetNoregistrasi = `
SELECT
    tdp.noregistrasi AS label,
    tdp.norec AS value
FROM t_daftarpasien tdp
WHERE 
    tdp.nocmfk = $1
    AND
    tdp.norec != $2
    AND
    tdp.statusenabled = TRUE
ORDER BY
    tdp.tglregistrasi DESC
`

const qGetPasienRegistrasi = `
SELECT
    tdp.nocmfk AS nocmfk
FROM t_daftarpasien tdp
WHERE tdp.norec = $1
LIMIT 1
`

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
    qGetDepositFromPasien,
    qNoAntrian,
    qGetPasienFormById,
    getDaftarPasienIGD,
    qDaftarPasienTriage,
    qM_DaruratIgd,
    qM_HubunganKeluarga,
    qWidgetDaftarPasienTriage,
    qGetPasienOnline,
    qListPelayananPasienTemp,
    qListTotalKlaim,
    qBiayaTambahan,
    qHistoryRegistrasi,
    qGetNoregistrasi,
    qGetPasienRegistrasi,
};