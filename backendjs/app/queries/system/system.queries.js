


const qGetDaftarPasienCBG = `
SELECT
    mp.id AS idpasien,
    mp.namapasien AS namapasien,
    mp.nocm AS norm,
    tdp.noregistrasi AS noregistrasi,
    tdp.cbg_tarif AS estimasiklaim,
    tdp.tglregistrasi AS tglregistrasi,
    mpeg.nohandphone AS nohpdokter,
    mpeg.id AS iddokter,
    mpeg.namalengkap AS namadokter,
    tdgp.keterangan AS keterangandiagnosa,
    (mx.kodeexternal || ' - ' || mx.description) AS diagnosaicdx,
    tdtp.keterangan AS keterangandiagnosatindakan,
    (mix.kodeexternal || ' - ' || mix.reportdisplay) AS diagnosaicdix,
    COALESCE(SUM(tpp.total), 0)::int AS totalbiaya
FROM t_daftarpasien tdp
    LEFT JOIN m_pegawai mpeg ON tdp.objectdokterpemeriksafk = mpeg.id
    LEFT JOIN m_pasien mp ON tdp.nocmfk = mp.id
    LEFT JOIN t_antreanpemeriksaan tap ON (
        tap.objectdaftarpasienfk = tdp.norec
        AND tap.statusenabled = TRUE
    )
    LEFT JOIN t_pelayananpasien tpp ON tpp.objectantreanpemeriksaanfk = tap.norec
    LEFT JOIN t_diagnosapasien tdgp ON tdgp.objectantreanpemeriksaanfk = tap.norec
    LEFT JOIN m_icdx mx ON mx.id = tdgp.objecticdxfk
    LEFT JOIN t_diagnosatindakan tdtp ON tdtp.objectantreanpemeriksaanfk = tap.norec
    LEFT JOIN m_icdix mix ON mix.id = tdtp.objecticdixfk
WHERE
    tdp.cbg_tarif IS NOT NULL
GROUP BY
    mp.id,
    mp.namapasien,
    mp.nocm,
    tdp.noregistrasi,
    tdp.tglregistrasi,
    tdp.cbg_tarif,
    mpeg.nohandphone,
    mpeg.id,
    mpeg.namalengkap,
    tdgp.keterangan,
    mx.kodeexternal,
    mx.description,
    tdtp.keterangan,
    mix.kodeexternal,
    mix.reportdisplay

`


export default {
    qGetDaftarPasienCBG
}