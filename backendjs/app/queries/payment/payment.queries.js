

const qGetPelayananFromAntrean =
    `
    SELECT 
    tpp.*,
    peg.namalengkap AS namapegawai,
    mp.namaproduk AS namaproduk,
    mp.isobat AS isobat,
    mk.namakelas AS namakelas,
    dp.norec AS norec_dp,
    npp.no_nota AS no_nota
    FROM t_pelayananpasien tpp
        LEFT JOIN m_pegawai peg ON peg.id = tpp.objectpegawaifk 
        LEFT JOIN m_produk mp ON mp.id = tpp.objectprodukfk 
        LEFT JOIN m_kelas mk ON mk.id = tpp.objectkelasfk
        LEFT JOIN t_notapelayananpasien npp ON npp.norec = tpp.objectnotapelayananpasienfk
        LEFT JOIN t_antreanpemeriksaan ap ON ap.norec = tpp.objectantreanpemeriksaanfk
        LEFT JOIN t_daftarpasien dp ON dp.norec = ap.objectdaftarpasienfk
            WHERE tpp.objectantreanpemeriksaanfk=$1
            AND tpp.statusenabled=true
    `

const qGetNorecPenggunaFromAp = 
    `
    SELECT objectdaftarpasienfk
    FROM t_antreanpemeriksaan 
        WHERE norec=$1
        LIMIT 1;
    `



const qDaftarTagihanPasien =
    `
    SELECT 
	SUM(tn.total) AS total, 
	tn.no_nota AS nonota, 
	td.nocmfk AS nocmfk,
	td.tglregistrasi AS tglregistrasi,
	td.noregistrasi AS noregistrasi,
	mp.namapasien AS namapasien,
	mr.namaexternal AS namarekanan,
	td.tglpulang AS tglpulang
		FROM t_notapelayananpasien tn
		LEFT JOIN t_daftarpasien td ON tn.objectdaftarpasienfk=td.norec
		LEFT JOIN m_pasien mp ON td.nocmfk=mp.id
		LEFT JOIN m_rekanan mr ON td.objectpenjaminfk=mr.id
			GROUP BY 
			tn.no_nota,
			tn.objectdaftarpasienfk,
			td.nocmfk,
			td.tglregistrasi,
			td.noregistrasi,
			mp.namapasien,
			mr.namaexternal,
			td.tglpulang
    `

export {
    qGetPelayananFromAntrean,
    qGetNorecPenggunaFromAp,
    qDaftarTagihanPasien
}