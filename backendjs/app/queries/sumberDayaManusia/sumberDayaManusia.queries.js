const qDaftarPegawai = `select row_number() OVER (ORDER BY mp.id) AS no,mp.nip,mp.id,mp.namalengkap,mp.reportdisplay as inisial,
case when mp.statusenabled=true then 'AKTIP' else 'NON AKTIP' end as status,ms.reportdisplay as statuspegawai,mu.namaunit,
mp2.reportdisplay as profesi  from m_pegawai mp
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
    "SELECT id as value, pendidikan as label FROM m_pendidikan where statusenabled=true";
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
}