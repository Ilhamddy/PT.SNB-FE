
/**
    * @typedef {Array<{
    *  norecstok: string, 
    *  produkid: number, 
    *  label: string, 
    *  nobatch: string, qty: 
    *  number, 
    *  tglinput: string, 
    *  qtyout: number,
    *  jumlah: number,
    *  satuankirim: number,
    *  namasatuan: string
    * }>} ListStokUnit
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
    null AS satuankirim,
    '' AS namasatuan
FROM
    t_stokunit ts
    INNER JOIN m_produk mp ON mp.id = ts.objectprodukfk
WHERE
    ts.statusenabled = true
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

// nama variable disamakan dengan variable input frontens
const qGetOrder = `
SELECT
    norec AS norecorder,
    tglinput AS tglorder,
    objectjenisorderbarangfk AS jenisorder,
    mjob.reportdisplay AS namajenisorder,
    objectunitasalfk AS unitorder,
    mua.namaunit AS namaunitasal,
    objectunittujuanfk AS unittujuan,
    mut.namaunit AS namaunittujuan,
    noorder AS noorder,
    keterangan
FROM t_orderbarang tor
    LEFT JOIN m_unit mua ON mua.id = tor.objectunitasalfk
    LEFT JOIN m_unit mut ON mut.id = tor.objectunittujuanfk
    LEFT JOIN m_jenisorderbarang mjob ON mjob.id = tor.objectjenisorderbarangfk
`

export {
    qGetStokUnit,
    qKemasanFromId,
    qGetOrder
}