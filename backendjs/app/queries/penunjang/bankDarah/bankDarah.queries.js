import { dateBetweenEmptyString, emptyIlike, emptyInt } from "../../../utils/dbutils"

const qGetDarahFromUnit = `
    select mp.namaproduk as label,mp.id as value,mth.objectkelasfk,mm.objectunitfk,mu.reportdisplay,mth.totalharga  from m_mapunittoproduk mm
    join m_produk mp on mp.id=mm.objectprodukfk
    join m_unit mu on mu.id=mm.objectunitfk
    join m_totalhargaprodukbykelas mth on mth.objectprodukfk=mp.id
    where mth.objectkelasfk =8 and mm.objectunitfk =28
    and mp.id=$1
`
const qGetDaftarOrderBankDarah =`select td.noregistrasi,to2.nomororder,to2.norec,
mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
ms.statusverif,to2.objectstatusveriffk  from t_daftarpasien td 
join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
join m_pegawai mp on mp.id=to2.objectpegawaifk 
join m_unit mu ON mu.id=ta.objectunitfk 
join m_statusverif ms on ms.id=to2.objectstatusveriffk
where to2.objectjenisorderfk=4 and ${dateBetweenEmptyString("to2.tglinput", "$1", "$2")}`

const qGetDaftarOrderBankDarahByNorec =`select td.noregistrasi,td.norec as norectd,to2.nomororder,td2.norec,
mp.namalengkap, mu.namaunit,to2.keterangan,to_char(to2.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
mp2.namaproduk,td2.harga ,td2.iscito, td2.qty, td2.qty*td2.harga as total,
to_char(td2.tglperjanjian,'yyyy-MM-dd HH24:MI') as tglperjanjian,
mpeg.namalengkap as pegawaiverif, mkr.namakamar,to2.objectunitasalfk,td2.objectprodukfk from t_daftarpasien td 
join t_antreanpemeriksaan ta on td.norec =ta.objectdaftarpasienfk
join t_orderpelayanan to2 on to2.objectantreanpemeriksaanfk=ta.norec
join m_pegawai mp on mp.id=to2.objectpegawaifk 
join m_unit mu ON mu.id=ta.objectunitfk 
join t_detailorderpelayanan td2 on td2.objectorderpelayananfk=to2.norec 
join m_produk mp2 on mp2.id=td2.objectprodukfk 
left join m_pegawai mpeg on mpeg.id=to2.objectpegawaiveriffk
left join m_kamar mkr on mkr.id=td2.objectkamarfk
where to2.norec=$1 and td2.statusenabled=true`

const qGetDaftarPasienBankDarah = `SELECT 
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
to_char(td.tglregistrasi,'yyyy-MM-dd') as tglregistrasi,
mu.namaunit,
mp2.reportdisplay || '-' ||ta.noantrian as noantrian,
mp2.namalengkap as namadokter,
trm.objectstatuskendalirmfk as objectstatuskendalirmfkap, 
trm.norec as norectrm,to_char(td.tglpulang,'yyyy-MM-dd') as tglpulang,
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
where 
${emptyIlike("td.noregistrasi", "$1")}
AND ${dateBetweenEmptyString("ta.tglmasuk", "$2", "$3")}
AND mu.id =28`

const qGetPenerimaanFE = `
SELECT
    tpb.norec AS norecpenerimaan,
    tpb.no_terima AS nomorterima,
    tpb.tglterima AS tanggalterima,
    tpb.objectrekananfk AS namasupplier,
    mr.reportdisplay AS namasupplierstr,
    tpb.no_order AS nomorpo,
    tpb.tglorder AS tanggalpesan,
    tpb.objectunitfk AS unitpesan,
    mu.namaunit AS unitpesanstr,
    tpb.tgljatuhtempo AS tanggaljatuhtempo,
    tpb.objectasalprodukfk AS sumberdana,
    tpb.keterangan AS keterangan,
    tpb.objectpemesananbarangfk AS norecpemesanan,
    '' AS subtotal,
    '' AS ppnrupiah,
    '' AS diskonrupiah,
    '' AS total
FROM t_penerimaanbarang tpb
    JOIN m_rekanan mr ON mr.id = tpb.objectrekananfk
    JOIN m_unit mu ON mu.id = tpb.objectunitfk
`

const qGetListPenerimaan = qGetPenerimaanFE + `
WHERE tpb.statusenabled = true and tpb.isdarah=true
ORDER BY tpb.tglterima DESC
`
const qGetDetailPenerimaan = `
SELECT
    tpbd.norec AS norecdetailpenerimaan,
    json_build_object(
        'idproduk', mp.id,
        'namaproduk', mp.namaproduk,
        'satuanjual', mp.objectsatuanstandarfk,
        'namasatuanjual', msp.satuan 
    )
    AS produk,
    msk.id AS satuanterima,
    msk.satuan AS namasatuanterima,
    tpbd.jumlah AS jumlahterima,
    tpbd.hargasatuankecil AS hargasatuankecil,
    tpbd.hargasatuanterima AS hargasatuanterima,
    tpbd.diskonpersen AS diskonpersen,
    tpbd.diskon AS diskonrupiah,
    tpbd.ppn AS ppnrupiahproduk,
    tpbd.ppnpersen AS ppnpersenproduk,
    tpbd.ed AS tanggaled,
    tpbd.nobatch AS nobatch,
    tpbd.subtotal AS subtotalproduk,
    tpbd.jumlahkonversi AS jumlahkonversi,
    tpbd.total AS totalproduk
FROM t_penerimaanbarangdetail tpbd
    JOIN m_produk mp ON mp.id = tpbd.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = tpbd.objectsatuanfk
    JOIN m_satuan msp ON msp.id = mp.objectsatuanstandarfk
    JOIN m_satuan msk ON msk.id = tpbd.objectsatuanfk
WHERE tpbd.objectpenerimaanbarangfk = $1
`
const qGetPemesananObject = `
SELECT
    tpb.norec AS norecpemesanan,
    tpb.objectrekananfk AS namasupplier,
    mr.reportdisplay AS namasupplierstr,
    tpb.no_order AS nomorpo,
    tpb.tglorder AS tanggalpesan,
    tpb.objectunitfk AS unitpesan,
    mu.namaunit AS unitpesanstr,
    tpb.objectasalprodukfk AS sumberdana,
    tpb.keterangan AS keterangan,
    '' AS subtotal,
    '' AS ppnrupiah,
    '' AS diskonrupiah,
    '' AS total
FROM t_pemesananbarang tpb
    JOIN m_rekanan mr ON mr.id = tpb.objectrekananfk
    JOIN m_unit mu ON mu.id = tpb.objectunitfk
`

const qGetListPemesanan = qGetPemesananObject + `
WHERE tpb.statusenabled = true and tpb.isdarah=true
ORDER BY tpb.tglorder DESC
`

const qGetDetailPemesanan = `
SELECT
    tpbd.norec AS norecdetailpemesanan,
    json_build_object(
        'idproduk', mp.id,
        'namaproduk', mp.namaproduk,
        'satuanjual', mp.objectsatuanstandarfk,
        'namasatuanjual', msp.satuan 
    )
    AS produk,
    msk.id AS satuanterima,
    msk.satuan AS namasatuanterima,
    tpbd.jumlah AS jumlahterima,
    tpbd.hargasatuankecil AS hargasatuankecil,
    tpbd.hargasatuanterima AS hargasatuanterima,
    tpbd.diskonpersen AS diskonpersen,
    tpbd.diskon AS diskonrupiah,
    tpbd.ppn AS ppnrupiahproduk,
    tpbd.ppnpersen AS ppnpersenproduk,
    tpbd.subtotal AS subtotalproduk,
    tpbd.total AS totalproduk
FROM t_pemesananbarangdetail tpbd
    JOIN m_produk mp ON mp.id = tpbd.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = tpbd.objectsatuanfk
    JOIN m_satuan msp ON msp.id = mp.objectsatuanstandarfk
    JOIN m_satuan msk ON msk.id = tpbd.objectsatuanfk
WHERE tpbd.objectpemesananbarangfk = $1
`


const qGetReturBarangObj = `
SELECT
    trb.norec AS norecretur,
    trb.noretur AS nomorretur,
    trb.tglretur AS tanggalretur,
    tpb.objectrekananfk AS namasupplier,
    mr.reportdisplay AS namasupplierstr,
    tpb.norec AS norecpenerimaan,
    tpb.no_terima AS nomorterima,
    tpb.no_order AS nomorpo,
    tpb.tglterima AS tanggalterima,
    tpb.tglorder AS tanggalpesan,
    tpb.objectunitfk AS unitpesan,
    mu.namaunit AS unitpesanstr
FROM t_returbarang trb
    LEFT JOIN t_penerimaanbarang tpb ON trb.objectpenerimaanbarangfk = tpb.norec
    LEFT JOIN m_rekanan mr ON mr.id = tpb.objectrekananfk
    LEFT JOIN m_unit mu ON mu.id = tpb.objectunitfk
`

const qGetListRetur = qGetReturBarangObj + `
WHERE trb.statusenabled = true and tpb.isdarah=true
ORDER BY trb.tglretur DESC
`
const qGetDetailReturObj = `
SELECT
    trbd.objectreturbarangfk AS norecretur,
    trbd.norec AS norecdetailretur,
    tpbd.norec AS norecdetailpenerimaan,
    json_build_object(
        'idproduk', mp.id,
        'namaproduk', mp.namaproduk,
        'satuanjual', mp.objectsatuanstandarfk,
        'namasatuanjual', msp.satuan 
    )
    AS produk,
    msk.id AS satuanterima,
    msk.satuan AS namasatuanterima,
    tpbd.jumlah AS jumlahterima,
    trbd.jumlah AS jumlahretur,
    tpbd.hargasatuankecil AS hargasatuankecil,
    tpbd.hargasatuanterima AS hargasatuanterima,
    tpbd.nobatch AS nobatch,
    tpbd.ed AS ed,
    trbd.diskonpersen AS diskonpersen,
    trbd.diskon AS diskonrupiah,
    trbd.ppn AS ppnrupiahproduk,
    trbd.ppnpersen AS ppnpersenproduk,
    trbd.subtotal AS subtotalproduk,
    trbd.total AS totalproduk,
    trbd.alasanretur AS alasanretur
FROM t_returbarangdetail trbd
    LEFT JOIN t_penerimaanbarangdetail tpbd ON tpbd.norec = trbd.objectpenerimaanbarangdetailfk
    JOIN m_produk mp ON mp.id = tpbd.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = tpbd.objectsatuanfk
    JOIN m_satuan msp ON msp.id = mp.objectsatuanstandarfk
    JOIN m_satuan msk ON msk.id = tpbd.objectsatuanfk
`

const qGetDetailRetur = qGetDetailReturObj + `
WHERE trbd.objectreturbarangfk = $1
`

const qGetTransaksiPelayananByNorecDp =`select row_number() OVER (ORDER BY tp.norec) AS no,
mu.namaunit,
to_char(tp.tglinput,'yyyy-MM-dd HH24:MI') as tglinput,
case when mp.objectdetailjenisprodukfk=99 then mp.namaproduk 
when mg.golongandarah is null then mp.namaproduk else mp.namaproduk || ' ( '||mg.golongandarah||' ) ' end as namaproduk,
tp.norec,
tp.harga,
tp.qty,
tp.discount,
tp.jasa,
'' as petugas,
case when tp.iscito=true then '✓' else '✕' end as statuscito,
tp.total,
mp2.id as idpegawaipengirim,
mp2.namalengkap as pegawaipengirim,
mu2.id as idunitpengirim,
mu2.namaunit as unitpengirim,
td2.tglperjanjian,to2.nomororder,
mp.objectdetailjenisprodukfk,mp3.objectgolongandarahfk,mp.isdarah
from
t_daftarpasien td
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
join m_pasien mp3 on mp3.id=td.nocmfk
left join m_golongandarah mg on mg.id=mp3.objectgolongandarahfk
where td.norec=$1 and mu.objectinstalasifk =9`

const qGetStokDarahFromUnit = `
SELECT
    tsu.objectprodukfk AS value,
    mp.namaproduk AS label,
    ms.id AS satuanid,
    ms.satuan AS namasatuan,
    msd.id AS sediaanid,
    msd.sediaan AS namasediaan,
    json_agg(
        json_build_object(
            'norecstokunit', tsu.norec,
            'harga', tsu.harga,
            'qty', tsu.qty,
            'nobatch', tsu.nobatch
        )
    ) AS batchstokunit,
    sum(tsu.qty) AS totalstok,
    mp.objectgolongandarahfk,
    mp.id as idproduk
FROM t_stokunit tsu
    LEFT JOIN m_produk mp ON mp.id = tsu.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msd ON msd.id = mp.objectsediaanfk
WHERE ${emptyInt("tsu.objectunitfk", "$1")}
    AND tsu.qty > 0
    AND tsu.statusenabled = true
    AND mp.isdarah=true and mp.objectgolongandarahfk=$2
GROUP BY 
    tsu.objectprodukfk, 
    mp.namaproduk,
    ms.id,
    ms.satuan,
    msd.id,
    msd.sediaan,
    mp.objectgolongandarahfk,
    mp.id
`

const qGetDarahFromProduct = `
SELECT
    tsu.objectprodukfk AS value,
    mp.namaproduk AS label,
    ms.id AS satuanid,
    ms.satuan AS namasatuan,
    msd.id AS sediaanid,
    msd.sediaan AS namasediaan,
    json_agg(
        json_build_object(
            'norecstokunit', tsu.norec,
            'harga', tsu.harga,
            'qty', tsu.qty,
            'nobatch', tsu.nobatch
        )
        ORDER BY tsu.tglinput
    ) AS batchstokunit,
    COALESCE(sum(tsu.qty), 0) AS totalstok
FROM t_stokunit tsu
    LEFT JOIN m_produk mp ON mp.id = tsu.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = mp.objectsatuanstandarfk
    LEFT JOIN m_sediaan msd ON msd.id = mp.objectsediaanfk
WHERE tsu.objectprodukfk = $1
    AND tsu.objectunitfk = $2
    AND tsu.qty > 0
    AND tsu.statusenabled = true
GROUP BY 
    tsu.objectprodukfk, 
    mp.namaproduk,
    ms.id,
    ms.satuan,
    msd.id,
    msd.sediaan 
`

export default{
    qGetDarahFromUnit,
    qGetDaftarOrderBankDarah,
    qGetDaftarOrderBankDarahByNorec,
    qGetDaftarPasienBankDarah,
    qGetListPenerimaan,
    qGetDetailPenerimaan,
    qGetListPemesanan,
    qGetDetailPemesanan,
    qGetListRetur,
    qGetDetailRetur,
    qGetTransaksiPelayananByNorecDp,
    qGetStokDarahFromUnit,
    qGetDarahFromProduct
}