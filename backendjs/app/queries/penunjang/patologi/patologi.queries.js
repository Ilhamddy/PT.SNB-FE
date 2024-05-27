import { dateBetweenEmptyString, emptyIlike, emptyInt } from "../../../utils/dbutils"
import m_jenisorder from "../../mastertable/m_jenisorder/m_jenisorder"
import unitQueries, { daftarUnit } from "../../mastertable/unit/unit.queries"

const qGetOrderFromDP = `
SELECT 
    td.noregistrasi,
    to2.nomororder,
    to2.norec,
    mp.namalengkap, 
    mu.namaunit,
    to2.keterangan,
    to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput 
FROM t_daftarpasien td 
    join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
    join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
    join m_pegawai mp on mp.id=to2.objectpegawaifk 
    join m_unit mu ON mu.id=ta.objectunitfk 
WHERE td.norec=$1 and to2.objectjenisorderfk=2
`

const qGetListOrderFromNorec = `
SELECT 
    mp.namaproduk 
FROM t_detailorderpelayanan td  
    LEFT JOIN m_produk mp on mp.id=td.objectprodukfk 
WHERE td.objectorderpelayananfk =$1`

const qGetListOrderPatologi = `
select 
    td.noregistrasi,to2.nomororder,to2.norec,
    mp.namalengkap, mu.namaunit,to2.keterangan,
    to2.tglinput as tglinput,
    ms.statusverif,
    to2.objectstatusveriffk,
    mps.namapasien,
    case when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mps.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mps.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mps.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mps.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mps.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mps.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mps.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile from t_daftarpasien td 
    join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
    join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
    join m_pegawai mp on mp.id=to2.objectpegawaifk 
    join m_unit mu ON mu.id=ta.objectunitfk 
    join m_statusverif ms on ms.id=to2.objectstatusveriffk
    join m_pasien mps on mps.id=td.nocmfk
WHERE 
    ${emptyIlike("td.noregistrasi", "$1")} 
    AND 
    to2.objectjenisorderfk=${m_jenisorder.values.patologiAnatomi}
    AND
    ${dateBetweenEmptyString("to2.tglinput", "$2", "$3")}
    AND 
    ${emptyInt("to2.objectstatusveriffk", "$4")}
`

const qGetIsiOrderByNorec = `
SELECT 
    td.noregistrasi,
    to2.nomororder,
    td2.norec,
    mp.namalengkap, 
    mu.namaunit,
    to2.keterangan,
    to2.tglinput AS tglinput,
    mp2.namaproduk,
    mp2.namaproduk AS namatindakan,
    td2.harga,
    td2.iscito, 
    td2.qty, 
    td2.qty*td2.harga as total,
    td2.tglperjanjian AS tglperjanjian,
    mpeg.namalengkap as pegawaiverif, 
    mkr.namakamar,
    mkr.namakamar AS nokamar
FROM t_daftarpasien td 
    join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
    join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
    join m_pegawai mp on mp.id=to2.objectpegawaifk 
    join m_unit mu ON mu.id=ta.objectunitfk 
    join t_detailorderpelayanan td2 on td2.objectorderpelayananfk=to2.norec 
    join m_produk mp2 on mp2.id=td2.objectprodukfk 
    left join m_pegawai mpeg on mpeg.id=to2.objectpegawaiveriffk
    left join m_kamar mkr on mkr.id=td2.objectkamarfk
WHERE 
    to2.norec=$1 
    AND 
    td2.statusenabled=true
`

const qGetWidgetOrderPatologi = `
SELECT 
    td.noregistrasi,
    to2.nomororder,
    to2.norec,
    mp.namalengkap, 
    mu.namaunit,
    to2.keterangan,
    to2.tglinput as tglinput,
    ms.statusverif,to2.objectstatusveriffk  
FROM t_daftarpasien td 
    join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
    join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
    join m_pegawai mp on mp.id=to2.objectpegawaifk 
    join m_unit mu ON mu.id=ta.objectunitfk 
    join m_statusverif ms on ms.id=to2.objectstatusveriffk
WHERE to2.objectjenisorderfk=${m_jenisorder.values.patologiAnatomi}
    AND ${dateBetweenEmptyString("to2.tglinput", "$1", "$2")}
    AND ${emptyInt("to2.objectstatusveriffk", "$3")}
`

const qGetDaftarPasienPatologi = `
SELECT 
    mu2.namaunit as unitasal,
    ta.tglmasuk,
    td.norec as norecdp,
    ta.norec as norecta,
    mj.jenispenjamin,
    ta.taskid,
    mi.namainstalasi,
    mp.nocm,
    td.noregistrasi,
    mp.namapasien,
    td.tglregistrasi AS tglregistrasi,
    mu.namaunit,
    mp2.reportdisplay || '-' ||ta.noantrian as noantrian,
    mp2.namalengkap as namadokter,
    trm.objectstatuskendalirmfk as objectstatuskendalirmfkap, 
    trm.norec as norectrm,
    td.tglpulang as tglpulang,
    case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile 
FROM t_daftarpasien td 
    join m_pasien mp on mp.id=td.nocmfk 
    join t_antreanpemeriksaan ta on ta.objectdaftarpasienfk =td.norec
    join m_unit mu on mu.id=ta.objectunitfk 
    left join m_pegawai mp2 on mp2.id=ta.objectdokterpemeriksafk 
    join m_instalasi mi on mi.id=mu.objectinstalasifk
    join m_jenispenjamin mj on mj.id=td.objectjenispenjaminfk
    left join t_rm_lokasidokumen trm on trm.objectantreanpemeriksaanfk=ta.norec
    left join m_unit mu2 on mu2.id=ta.objectunitasalfk 
WHERE 
    ${emptyIlike("td.noregistrasi", "$1")}
    AND ${dateBetweenEmptyString("ta.tglmasuk", "$2", "$3")}
    AND mu.id = ${unitQueries.daftarUnit.LABORATORIUM_ANATOMI}
`

const qGetAntreanProduk = `
SELECT 
    mh.harga,
    mh.objectkomponenprodukfk,
    mk.reportdisplay 
FROM m_hargaprodukperkomponen mh
    JOIN m_totalhargaprodukbykelas mt ON mt.id=mh.objecttotalhargaprodukbykelasfk
    JOIN m_komponenproduk mk ON mk.id=mh.objectkomponenprodukfk 
WHERE ${emptyInt("mt.objectprodukfk", "$1")} 
    AND mt.objectkelasfk=8
`

const qGetTransaksiPelayananPatologiByNorecDp = `
SELECT 
    row_number() OVER (ORDER BY tp.norec) AS no,
    mu.namaunit,
    tp.tglinput as tglinput,
    mp.namaproduk,
    tp.norec,
    tp.harga,
    tp.qty,
    tp.discount,
    tp.jasa,
    '' as petugas,
    case when tp.iscito=true then '✓' else '-' end as statuscito,
    tp.total,
    mp2.id as idpegawaipengirim,
    mp2.namalengkap as pegawaipengirim,
    mu2.id as idunitpengirim,
    mu2.namaunit as unitpengirim,
    td2.tglperjanjian,
    to2.nomororder,
    th.expertise, 
    th.nofoto,
    th.norec as norecexpertise, 
    th.objecttemplateradiologifk,
    mpeg_i.id AS idpegawaikirim2,
    mpeg_u.id AS idpegawaiupdate2
FROM t_daftarpasien td
    join t_antreanpemeriksaan ta on
    td.norec = ta.objectdaftarpasienfk
    join m_unit mu on
    mu.id = ta.objectunitfk
    join t_pelayananpasien tp on
    tp.objectantreanpemeriksaanfk = ta.norec
    join m_produk mp on
    mp.id = tp.objectprodukfk
    left join t_detailorderpelayanan td2 
    on td2.objectpelayananpasienfk=tp.norec
    left join t_orderpelayanan to2 on to2.norec=td2.objectorderpelayananfk
    left join m_pegawai mp2 on mp2.id=to2.objectpegawaifk 
    left join m_unit mu2 on mu2.id=ta.objectunitasalfk
    left join t_hasilpemeriksaan th on th.objectpelayananpasienfk=tp.norec
    LEFT JOIN m_pegawai mpeg_i ON mpeg_i.id = th.objectpegawaiinputfk
    LEFT JOIN m_pegawai mpeg_u ON mpeg_u.id = th.objectpegawaiupdatefk
WHERE td.norec=$1 AND mu.id = ${unitQueries.daftarUnit.LABORATORIUM_ANATOMI} 
ORDER BY td2.tglperjanjian DESC
`

export default {
    qGetOrderFromDP,
    qGetListOrderFromNorec,
    qGetListOrderPatologi,
    qGetIsiOrderByNorec,
    qGetWidgetOrderPatologi,
    qGetDaftarPasienPatologi,
    qGetAntreanProduk,
    qGetTransaksiPelayananPatologiByNorecDp
}