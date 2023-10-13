

const qGetBerita = `
SELECT 
    norec,
    gambar,
    judul,
    isi,
    tglawal,
    tglakhir
FROM t_berita
`

const qGetBeritaAll = qGetBerita + `
WHERE statusenabled = true
`

const qGetBeritaNorec = qGetBerita + `
WHERE norec = $1
`

export default {
    qGetBeritaAll,
    qGetBeritaNorec
}