const qResult = `select
*
from
(
select
    td.noregistrasi ,
    mp2.namapasien,
    extract(epoch
from
    age(cast(mp2.tgllahir as date))/(3600 * 24) ) as umur,
    mp3.id,
    mp3.namaproduk ,
    mp.id,
    row_number() over (partition by mp.id
order by
    mp.id asc,
    md3.umurharimax asc),
    md3.id,
    md3.umurharimin,
    md3.umurharimax,
    mp.reportdisplay ,
    case
        when md3.id is not null then nilaitext
        when md3.id is null then null
    end as nilaitext,
    ms.satuan,
    mn.nilaikritis
from
    m_pemeriksaanlab mp
join t_pelayananpasien tp on
    mp.objectprodukfk = tp.objectprodukfk
join t_antreanpemeriksaan ta on
    tp.objectantreanpemeriksaanfk = ta.norec
join t_daftarpasien td on
    ta.objectdaftarpasienfk = td.norec
join m_pasien mp2 on
    td.nocmfk = mp2.id
join m_produk mp3 on
    mp.objectprodukfk = mp3.id
left join m_satuan ms on
    mp.objectsatuanfk = ms.id
left join m_nilainormallab mn on
    mp.id = mn.objectpemeriksaanlabfk
    and mn.objectjeniskelaminfk = mp2.objectjeniskelaminfk
left join (
    select
        id,
        objectkelompokumurfk,
        statusumur,
        umurmin,
        umurmax,
        case
            when statusumur = 'T' then umurmin * 365
            when statusumur = 'B' then umurmin * 30
            when statusumur = 'H' then umurmin
        end as umurharimin,
        case
            when statusumur = 'T' then umurmax * 365
            when statusumur = 'B' then umurmax * 30
            when statusumur = 'H' then umurmax
        end as umurharimax
    from
        m_detailkelompokumur
) as md3 on
    mn.objectdetailkelompokumurfk = md3.id
    and extract(epoch
from
    age(cast(mp2.tgllahir as date))/(3600 * 24) ) < md3.umurharimax
    and extract(epoch
from
    age(cast(mp2.tgllahir as date))/(3600 * 24) ) > md3.umurharimin
where
    mp.statusenabled = true
    and tp.norec = $1
order by
    mp3.id asc,
    mp.kodeexternal asc,
    md3.umurharimax asc
) temp1
where
row_number = 1
`

export default {
    qResult
}