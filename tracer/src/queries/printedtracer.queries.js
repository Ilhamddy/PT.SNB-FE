

const qTracerNotPrinted = `
SELECT 
	td.norec AS norecdp,
	mp.namapasien , 
	mp.nocm , 
	mp.nocmtemp,
	td.noregistrasi , 
	ta.noantrian , 
	mu.reportdisplay AS namaunit, 
	mp2.namalengkap AS namadokter, 
	td.statuspasien,
	td.tglregistrasi, 
	td.statuspasien , 
	td.isprinted ,
	mr.namaexternal AS penjamin,
	mr2.namaexternal AS penjamin2,
	mr3.namaexternal AS penjamin3
FROM t_antreanpemeriksaan ta 
	LEFT JOIN t_daftarpasien td ON ta.objectdaftarpasienfk = td.norec 
	LEFT JOIN m_pasien mp ON td.nocmfk = mp.id 
	LEFT JOIN m_unit mu ON ta.objectunitfk  = mu.id 
	LEFT JOIN m_pegawai mp2 ON td.objectdokterpemeriksafk = mp2.id 
	LEFT JOIN m_rekanan mr ON td.objectpenjaminfk = mr.id
	LEFT JOIN m_rekanan mr2 ON td.objectpenjamin2fk = mr2.id
	LEFT JOIN m_rekanan mr3 ON td.objectpenjamin3fk = mr3.id
WHERE (td.isprinted IS null OR td.isprinted != true) 
	AND td.tglregistrasi BETWEEN $1 AND $2
	AND (td.objectinstalasifk = 1 OR td.objectinstalasifk = 7)
	AND td.noregistrasi IS NOT NULL --- belum terdaftar
ORDER BY td.tglregistrasi ASC

`

module.exports = {
    qTracerNotPrinted
}