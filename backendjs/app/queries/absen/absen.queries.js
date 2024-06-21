
const qGetFotoPengguna = `
SELECT
    tfp.urifoto AS urifoto,
    tfp.tglinput AS tglinput
FROM m_pegawai mp
    LEFT JOIN t_fotopegawai tfp ON tfp.objectpegawaifk = mp.id
WHERE
    mp.id = :iduser
`

export default {
    qGetFotoPengguna
}