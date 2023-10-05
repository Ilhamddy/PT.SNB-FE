

const qTracerNotPrinted = `
SELECT 
	td.norec AS norecdp,
	mp.namapasien , 
	mp.nocm , 
	td.noregistrasi , 
	ta.noantrian , 
	mu.reportdisplay AS namaunit, 
	mp2.namalengkap AS namadokter, 
	td.tglregistrasi , 
	td.statuspasien , 
	td.isprinted 
FROM t_antreanpemeriksaan ta 
	JOIN t_daftarpasien td ON ta.objectdaftarpasienfk = td.norec 
	JOIN m_pasien mp ON td.nocmfk = mp.id 
	JOIN m_unit mu ON ta.objectunitfk  = mu.id 
	JOIN m_pegawai mp2 ON td.objectdokterpemeriksafk = mp2.id 
WHERE (td.isprinted IS null OR td.isprinted != true) 
	AND td.tglregistrasi BETWEEN $1 AND $2
ORDER BY td.tglregistrasi ASC

`

module.exports = {
    qTracerNotPrinted
}