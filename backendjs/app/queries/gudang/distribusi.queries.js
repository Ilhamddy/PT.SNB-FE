

/**
    * @typedef {Array<{
    *  norecstok: string, 
    *  value: number,  //(produk id)
    *  label: string, 
    *  qty: number, 
    *  tglinput: string, 
    *  qtyout: number,
    *  jumlah: number,
    *  satuan: number,
    *  namasatuan: string,
    * }>} ListOrderStokUnit
    */

const qGetStokUnit = `
SELECT
    ts.norec AS norecstok,
    ts.objectprodukfk AS value,
    mp.namaproduk AS label,
    ts.nobatch AS nobatch,
    ts.qty AS qty,
    ts.tglinput AS tglinput,
    0 AS qtyout,
    0 AS jumlah,
    null AS satuan,
    '' AS namasatuan
FROM t_stokunit ts
    INNER JOIN m_produk mp ON mp.id = ts.objectprodukfk
WHERE
    ts.statusenabled = true
    AND ts.objectunitfk = $1
    AND mp.islogistik = $2
`

const qKemasanFromId = `
SELECT 
    mk.id, 
    mk.barcode,
    mp.namaproduk AS namaproduk,
    msk.satuan AS namasatuankecil,
    msb.satuan AS namasatuanbesar,
    msk.id AS satuankecil,
    msb.id AS satuanbesar,
    mk.nilaikonversi AS nilaikonversi
FROM m_kemasanproduk mk
    LEFT JOIN m_produk mp ON mk.objectprodukfk = mp.id
    LEFT JOIN m_satuan msk ON msk.id = mk.objectsatuankecilfk
    LEFT JOIN m_satuan msb ON msb.id = mk.objectsatuanbesarfk
WHERE mk.statusenabled = true AND mk.id = $1
`

const qGetOrder = `
SELECT DISTINCT
    tor.norec AS norecorder,
    tor.tglinput AS tglorder,
    tor.objectjenisorderbarangfk AS jenisorder,
    mjob.reportdisplay AS namajenisorder,
    objectunitasalfk AS unitorder,
    mua.namaunit AS namaunitasal,
    tor.objectunittujuanfk AS unittujuan,
    mut.namaunit AS namaunittujuan,
    tor.noorder AS noorder,
    tor.keterangan,
    COALESCE(tor.istolak, FALSE) AS istolak,
    tor.alasantolak AS alasantolak
FROM t_orderbarang tor
    LEFT JOIN m_unit mua ON mua.id = tor.objectunitasalfk
    LEFT JOIN m_unit mut ON mut.id = tor.objectunittujuanfk
    LEFT JOIN m_jenisorderbarang mjob ON mjob.id = tor.objectjenisorderbarangfk
    LEFT JOIN t_kirimbarang tkb ON tkb.objectorderbarangfk = tor.norec
    LEFT JOIN m_mapusertounit mmap ON mmap.objectunitfk = mua.id
WHERE tkb IS NULL 
    AND (
        NULLIF($1, '')::int IS NULL 
        OR mmap.objectuserfk = NULLIF($1, '')::int
    )
    AND
    $2 = tor.islogistik
ORDER BY tor.tglinput DESC 
`

const qGetKirim = `
SELECT DISTINCT
    tkb.norec AS noreckirim,
    tkb.tglinput AS tglkirim,
    tkb.nopengiriman AS nokirim,
    tkb.keterangan AS keterangankirim,
    tor.norec AS norecorder,
    tor.tglinput AS tglorder,
    tkb.objectjenisorderbarangfk AS jenisorder,
    mjob.reportdisplay AS namajenisorder,
    tkb.objectunitpengirimfk AS unitorder,
    mua.namaunit AS namaunitasal,
    tkb.objectunittujuanfk AS unittujuan,
    mut.namaunit AS namaunittujuan,
    tor.noorder AS noorder,
    tor.keterangan AS keterangan,
    tkb.keterangan AS keterangankirim,
    tkb.isverif AS isverif,
    COALESCE(tkb.istolak, FALSE) AS istolak,
    tkb.alasantolak AS alasantolak
FROM t_kirimbarang tkb
    LEFT JOIN m_unit mua ON mua.id = tkb.objectunitpengirimfk
    LEFT JOIN m_unit mut ON mut.id = tkb.objectunittujuanfk
    LEFT JOIN m_jenisorderbarang mjob ON mjob.id = tkb.objectjenisorderbarangfk
    LEFT JOIN t_orderbarang tor ON tkb.objectorderbarangfk = tor.norec
    LEFT JOIN m_mapusertounit mmap ON mmap.objectunitfk = mut.id
WHERE 
    (
        NULLIF($1, '')::int IS NULL 
        OR mmap.objectuserfk = NULLIF($1, '')::int
    )
    AND
    $2 = tkb.islogistik
ORDER BY
    tkb.tglinput DESC
`

/**
    * @typedef {Array<{
    *  norecstok: string, 
    *  value: number,  //(produk id)
    *  norecorderdetail: string,
    *  produkid: number, 
    *  label: string, 
    *  nobatch: string, 
    *  qty: number, 
    *  tglinput: string, 
    *  qtyout: number,
    *  qtykirim: number,
    *  jumlah: number,
    *  satuan: number,
    *  namasatuan: string,
    * }>} ListStokUnit
    */
const qGetOrderStok = `
SELECT
    tkb.norec AS noreckirim,
    tkb.tglinput AS tglkirim,
    tkb.nopengiriman AS nokirim,
    tkb.keterangan AS keterangankirim,
    tor.norec AS norecorder,
    tor.objectjenisorderbarangfk AS jenisorder,
    mjb.reportdisplay AS namajenisorder,
    tor.objectunittujuanfk AS unittujuan,
    tor.objectunitasalfk AS unitasal,
    tor.tglinput AS tglorder,
    tor.noorder AS noorder,
    tor.keterangan AS keterangan,
    tod.norec AS norecorderdetail,
    tod.objectprodukfk AS produkid,
    ts.norec AS norecstok,
    ts.objectprodukfk AS value,
    mp.namaproduk AS label,
    ts.nobatch AS nobatch,
    ts.qty AS qty,
    ts.tglinput AS tglinput,
    tod.qty AS qtyout,
    0 AS qtykirim,
    tod.jumlah AS jumlah,
    tod.objectsatuanfk AS satuan,
    ms.satuan AS namasatuan
FROM
    t_orderbarang tor
    LEFT JOIN t_orderbarangdetail tod ON tod.objectorderbarangfk = tor.norec
    LEFT JOIN t_stokunit ts ON ts.objectprodukfk = tod.objectprodukfk AND ts.objectunitfk = tor.objectunittujuanfk
    INNER JOIN m_produk mp ON mp.id = ts.objectprodukfk
    LEFT JOIN m_satuan ms ON ms.id = tod.objectsatuanfk
    LEFT JOIN m_jenisorderbarang mjb ON mjb.id = tor.objectjenisorderbarangfk
    LEFT JOIN t_kirimbarang tkb ON tkb.objectorderbarangfk = tor.norec
WHERE
    tor.statusenabled = true
    AND tor.norec = $1
`

const qGetKirimStok = `
SELECT
    tkb.norec AS noreckirim,
    tkb.tglinput AS tglkirim,
    tkb.nopengiriman AS nokirim,
    tkb.keterangan AS keterangankirim,
    tkb.objectjenisorderbarangfk AS jenisorder,
    tkb.objectunitpengirimfk AS unittujuan,
    tkb.objectunittujuanfk AS unitasal,
    tkbd.objectprodukfk AS value,
    tkbd.objectorderbarangdetailfk AS norecorderdetail,
    tkbd.objectprodukfk AS produkid,
    mp.namaproduk AS label,
    tkbd.nobatch AS nobatch,
    ts.qty AS qty,
    tod.qty AS qtyout,
    tkbd.qty AS qtykirim,
    tkbd.jumlah AS jumlah,
    tkbd.objectsatuanfk AS satuan,
    ms.satuan AS namasatuan,
    tkb.isverif AS isverif
FROM t_kirimbarang tkb
    LEFT JOIN t_orderbarang tor ON tkb.objectorderbarangfk = tor.norec
    LEFT JOIN t_kirimbarangdetail tkbd ON tkbd.objectdistribusibarangfk = tkb.norec
    LEFT JOIN m_produk mp ON mp.id = tkbd.objectprodukfk
    LEFT JOIN t_orderbarangdetail tod ON tod.norec = tkbd.objectorderbarangdetailfk
    LEFT JOIN t_stokunit ts ON (
        ts.objectprodukfk = tkbd.objectprodukfk 
        AND ts.objectunitfk = tkb.objectunitpengirimfk
        AND ts.nobatch = tkbd.nobatch
    )
    LEFT JOIN m_satuan ms ON ms.id = tkbd.objectsatuanfk
WHERE (tkb.objectorderbarangfk IS NOT NULL AND tkb.objectorderbarangfk = $1) OR ($1 = '' AND tkb.norec = $2)
`

export {
    qGetStokUnit,
    qKemasanFromId,
    qGetOrder,
    qGetOrderStok,
    qGetKirimStok,
    qGetKirim
}