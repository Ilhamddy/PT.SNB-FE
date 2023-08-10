const qGetListTarif18 = `select
    sum(((tp.harga - case when tp.discount is null 
    then 0 else tp.discount end) * tp.qty)+ case when 
    tp.jasa is null then 0 else tp.jasa end) as ttl,
    mp.objectvariabelbpjsfk
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
    where
    td.norec = '$1' and tp.statusenabled = true
    group by mp.objectvariabelbpjsfk 
`

export {
    qGetListTarif18
}