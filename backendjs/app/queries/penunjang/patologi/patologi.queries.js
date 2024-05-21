import { dateBetweenEmptyString, emptyIlike, emptyInt } from "../../../utils/dbutils"
import m_jenisorder from "../../mastertable/m_jenisorder/m_jenisorder"

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
    mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
    ms.statusverif,to2.objectstatusveriffk,mps.namapasien,
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
    to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
    mp2.namaproduk,
    mp2.namaproduk AS namatindakan,
    td2.harga,
    td2.iscito, 
    td2.qty, 
    td2.qty*td2.harga as total,
    to_char(td2.tglperjanjian,'yyyy-MM-dd HH24:MI') as tglperjanjian,

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
    to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
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

export default {
    qGetOrderFromDP,
    qGetListOrderFromNorec,
    qGetListOrderPatologi,
    qGetIsiOrderByNorec,
    qGetWidgetOrderPatologi
}