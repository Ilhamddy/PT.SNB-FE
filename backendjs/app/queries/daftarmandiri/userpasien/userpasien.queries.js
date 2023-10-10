



const qGetRiwayatRegistrasi = `
SELECT
    tro.norec AS norec,
    tro.nocmfk AS nocmfk,
    tro.objectunitfk AS unit,
    tro.objectdokterfk AS dokter,
    tro.tglrencana AS tglrencana,
    tro.noreservasi AS noreservasi,
    mp.namalengkap AS namadokter,
    mu.namaunit AS namaunit,
    tro.tglinput AS tglinput
FROM users_pasien up
    LEFT JOIN m_pasien mpas ON (up.norm = mpas.nocm OR up.norm = mpas.nocmtemp)
    LEFT JOIN t_registrasionline tro ON tro.nocmfk = mpas.id
    LEFT JOIN m_unit mu ON tro.objectunitfk = mu.id
    LEFT JOIN m_pegawai mp ON tro.objectdokterfk = mp.id
WHERE up.id = $1 AND (tro.tglrencana >= $2 AND tro.tglrencana < $3)
    AND tro.statusenabled = true
ORDER BY tro.tglrencana DESC
`

const qGetPasienEdit = `
SELECT
    mp.namapasien AS namalengkap,
    mp.noidentitas,
    mp.tempatlahir,
    mp.tempatlahir,
    mp.tgllahir AS tanggallahir,
    mp.objectjeniskelaminfk AS jeniskelamin,
    mp.objectgolongandarahfk AS golongandarah,
    mp.objectagamafk AS agama,
    mp.objectkebangsaanfk AS kewarganegaraan,
    mp.objectetnisfk AS suku,
    mp.objectbahasafk AS bahasayangdikuasai,
    mp.objectpendidikanfk AS pendidikanterakhir,
    mp.objectpekerjaanfk AS pekerjaan,
    mp.objectstatusperkawinanfk AS statusperkawinan,
    mp.namasuamiistri AS namapasangan,
    mp.alamatrmh AS alamatktp,
    mp.objectdesakelurahanktpfk AS kelurahanktp,
    mdkktp.namadesakelurahan AS kelurahannamektp,
    mdkktp.kodepos AS kodeposktp,
    mp.rtktp AS rtktp,
    mp.rwktp AS rwktp,
    mdkktp.objectkecamatanfk AS kecamatanktp,
    mkecktp.namakecamatan AS kecamatannamektp,
    mdkktp.objectkabupatenfk AS kabupatenktp,
    mkbktp.namakabupaten AS kabupatennamektp,
    mkbktp.objectprovinsifk AS provinsiktp,
    mpvktp.namaprovinsi AS provinsinamektp,
    mp.objectnegaraktpfk AS negaraktp,
    mp.alamatdomisili AS alamatdomisili,
    mp.objectdesakelurahandomisilifk AS kelurahandomisili,
    mdkdomis.namadesakelurahan AS kelurahannamedomisili,
    mdkdomis.kodepos AS kodeposdomisili,
    mp.rtdomisili AS rtdomisili,
    mp.rwdomisili AS rwdomisili,
    mdkdomis.objectkecamatanfk AS kecamatandomisili,
    mkecdomis.namakecamatan AS kecamatannamedomisili,
    mdkdomis.objectkabupatenfk AS kabupatendomisili,
    mkbdomis.namakabupaten AS kabupatennamedomisili,
    mkbdomis.objectprovinsifk AS provinsidomisili,
    mpvdomis.namaprovinsi AS provinsinamedomisili,
    mp.objectnegaradomisilifk AS negaradomisili,
	mp.nohp AS nomorhppasien,
    mp.namaibu AS namaibu,
    mp.namaayah AS namaayah,
    mp.nobpjs AS nobpjs
FROM users_pasien up
    LEFT JOIN m_pasien mp ON (up.norm = mp.nocm OR up.norm = mp.nocmtemp)
    LEFT JOIN m_desakelurahan mdkktp ON mp.objectdesakelurahanktpfk = mdkktp.id
    LEFT JOIN m_kecamatan mkecktp ON mdkktp.objectkecamatanfk = mkecktp.id
    LEFT JOIN m_kabupaten mkbktp ON mkecktp.objectkabupatenfk = mkbktp.id
    LEFT JOIN m_provinsi mpvktp ON mkbktp.objectprovinsifk = mpvktp.id
    LEFT JOIN m_desakelurahan mdkdomis ON mp.objectdesakelurahandomisilifk = mdkdomis.id
    LEFT JOIN m_kecamatan mkecdomis ON mdkdomis.objectkecamatanfk = mkecdomis.id
    LEFT JOIN m_kabupaten mkbdomis ON mkecdomis.objectkabupatenfk = mkbdomis.id
    LEFT JOIN m_provinsi mpvdomis ON mkbdomis.objectprovinsifk = mpvdomis.id
WHERE up.id = $1
`

export default {
    qGetRiwayatRegistrasi,
    qGetPasienEdit
}