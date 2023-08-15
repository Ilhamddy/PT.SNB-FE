


const qGetStokUnit = `
SELECT
    ts.norec AS norecstok,
    ts.objectprodukfk AS produkid,
    mp.namaproduk AS label,
    ts.nobatch AS nobatch,
    ts.qty AS qty,
    ts.tglinput AS tglinput,
    0 AS qtyout
FROM
    t_stokunit ts
    INNER JOIN m_produk mp ON mp.id = ts.objectprodukfk
WHERE
    ts.statusenabled = true
`

export {
    qGetStokUnit
}