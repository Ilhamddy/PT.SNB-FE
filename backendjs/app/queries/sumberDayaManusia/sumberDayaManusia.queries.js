import { dateBetweenEmptyString } from "../../utils/dbutils";

const qDaftarPegawai = `select row_number() OVER (ORDER BY mp.id) AS no,mp.nip,mp.id,mp.namalengkap,mp.reportdisplay as inisial,
case when mp.statusenabled=true then 'AKTIF' else 'NON AKTIF' end as status,ms.reportdisplay as statuspegawai,mu.namaunit,
mp2.reportdisplay as profesi,
case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile
from m_pegawai mp
left join m_unit mu on mu.id=mp.objectunitfk 
left join m_statuspegawai ms on ms.id=mp.objectstatuspegawaifk
left join m_profesipegawai mp2 on mp2.id=mp.objectprofesipegawaifk`

const qUnit = `select mu.id as value, mu.namaunit as label from m_unit mu where mu.statusenabled=true`
const qJenisKelamin = `SELECT id as value, statusenabled, kodeexternal, namaexternal, reportdisplay, jeniskelamin  as label FROM m_jeniskelamin mj  where statusenabled = true`
const qGolonganDarah =
    `SELECT id as value, golongandarah  as label FROM m_golongandarah`;
const qEtnis =
    "SELECT id as value, etnis as label FROM m_etnis where statusenabled=true";
const qPendidikan =
    "SELECT id as value, reportdisplay as label FROM m_pendidikanpegawai mp where statusenabled=true";
const qPerkawinan =
    "SELECT id as value, statusperkawinan as label FROM m_statusperkawinan";
const qAgama =
    "SELECT id as value, statusenabled, kodeexternal, namaexternal, reportdisplay, agama as label, kdagama FROM m_agama where statusenabled = true";
const qPegawaiById =
    `SELECT id, kdprofile, statusenabled, kodeexternal, namaexternal, reportdisplay,
     objectagamafk, objectgolonganfk, objectgolongandarahfk, objectjabatanfk, 
     objectjeniskelaminfk, objectprofesipegawaifk, objectnegarafk, objectpendidikanterakhirfk, 
     objectunitfk, objectstatuspegawaifk, objectetnisfk, namalengkap, npwp, qtyanak, qtytanggungan, 
     tempatlahir, tgldaftarfingerprint, tglkeluar, tgllahir, tglmasuk, noidentitas, nip, 
     objectstatusperkawinanpegawaifk, email, nohandphone, notlp, nocmfk, tanggalmeninggal, 
     objectkodebankfk, nama, namarekening, nomorrekening, idfinger, tglpensiun, gelarbelakang, 
     gelardepan, nosip, nostr, tglberakhirsip, tglberakhirstr, tglterbitsip, tglterbitstr, nrp, 
     photo, salary, idhafis, namahafis, objectdesakelurahanktpfk, objectspesialisasifk, namaibu, 
     alamatktp, rtktp, rwktp, kodeposktp, alamatdom, rtdom, rwdom, objectdesakelurahandomfk, kodeposdom, 
     nosk, objectgolonganptkpfk, objectunitkerjafk
    FROM public.m_pegawai where id=$1`;
const qGolonganPegawai = `select id as value, namaexternal as label from m_golonganpegawai mg `  
const qStatusPegawai =`select id as value,reportdisplay as label from m_statuspegawai ms` 
const qProfesiPegawai =`select id as value,reportdisplay as label from m_profesipegawai ms` 
const qJabatan =`select id as value,reportdisplay as label from m_jabatan ms` 
const qGolonganPtkp =`select id as value,reportdisplay as label from m_golonganptkp ms`
const qUnitKerja =`select id as value,reportdisplay as label from m_unitkerja ms`
const qUserRoleById=`select row_number() OVER (ORDER BY u.id) AS no,u.id,u.username,sm.reportdisplay,sm.id as idmodule,
case when u.statusenabled=true then 'AKTIF'
else 'NON AKTIF' end as status,'' as listunit from users u 
join s_modulaplikasi sm on sm.id=u.objectaccesmodulfk where u.objectpegawaifk=$1`
const qRole = `select sm.id as value,sm.reportdisplay as label from s_modulaplikasi sm
`
const qJadwalDokter = `
SELECT
    mj.id AS id,
    mj.kdprofile AS kdprofile,
    mj.statusenabled AS statusenabled,
    mj.kodeexternal AS kodeexternal,
    mj.objectpegawaifk AS objectpegawaifk,
    mp.namalengkap AS namalengkap,
    mp.nip AS nip,
    mj.objectharifk AS objectharifk,
    mh.reportdisplay AS namahari,
    mj.jam_mulai AS jam_mulai,
    mj.jam_selesai AS jam_selesai,
    mj.objectunitfk AS objectunitfk,
    mu.namaunit AS namaunit,
    mj.objectstatushadirfk AS objectstatushadirfk,
    mj.objectkamarfk AS objectkamarfk
FROM m_jadwaldokter mj
    LEFT JOIN m_pegawai mp ON mp.id = mj.objectpegawaifk
    LEFT JOIN m_hari mh ON mh.id = mj.objectharifk
    LEFT JOIN m_unit mu ON mu.id = mj.objectunitfk`

const qAccesUnit =`select mm.objectunitfk as value,mu.namaunit as label from m_mapusertounit mm
join m_unit mu on mu.id=mm.objectunitfk where mm.objectuserfk=$1 and mm.statusenabled=true`

const qGetLiburPegawai = `
SELECT
    (ROW_NUMBER() OVER (ORDER BY tl.tgllibur DESC))::INT AS no,
    tl.norec AS norec,
    tl.objectpegawaifk AS idpegawai,
    mp.namalengkap AS namapegawai,
    tl.tgllibur AS tgllibur,
    tl.objectunitfk AS idunitlibur,
    mu.namaunit AS namaunitlibur,
    tl.alasan AS alasan,
    tl.objectpegawaiinputfk AS idpegawaiinput,
    mpi.namalengkap AS namapegawaiinput
FROM t_liburpegawai tl
    LEFT JOIN m_pegawai mp ON mp.id = tl.objectpegawaifk
    LEFT JOIN m_unit mu ON mu.id = tl.objectunitfk
    LEFT JOIN m_pegawai mpi ON mpi.id = tl.objectpegawaiinputfk
WHERE tl.statusenabled = true
    AND
        ${dateBetweenEmptyString("tl.tgllibur", "$1", "$2")}
    AND ( 
        mp.namalengkap ILIKE '%' || $3 || '%'
        OR $3 = ''
    )
ORDER BY tl.tgllibur DESC`

const qGetPegawai = `
SELECT
    mpeg.namaexternal AS namapegawai,
    usr.username AS username
FROM users usr
    LEFT JOIN m_pegawai mpeg ON usr.objectpegawaifk = mpeg.id
WHERE
    usr.id = $1
`

export default {
    qDaftarPegawai,
    qUnit,
    qJenisKelamin,
    qGolonganDarah,
    qEtnis,
    qPendidikan,
    qPerkawinan,
    qAgama,
    qPegawaiById,
    qGolonganPegawai,
    qStatusPegawai,
    qProfesiPegawai,
    qJabatan,
    qGolonganPtkp,
    qUnitKerja,
    qUserRoleById,qRole,
    qJadwalDokter,
    qAccesUnit,
    qGetLiburPegawai,
    qGetPegawai
   
}