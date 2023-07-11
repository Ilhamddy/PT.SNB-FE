

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
	tn.total AS total, 
    tn.norec AS norecnota,
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
            WHERE tn.statusenabled=true
    `       
const qGetPelayananFromVerif =
    `
    SELECT 
    tpp.*,
    peg.namalengkap AS namapegawai,
    peg.id AS idpegawai,
    mp.namaproduk AS namaproduk,
    mp.isobat AS isobat,
    mk.namakelas AS namakelas,
    dp.norec AS norec_dp,
    npp.no_nota AS no_nota,
    tbp.no_bukti AS no_bukti
    FROM t_pelayananpasien tpp
        LEFT JOIN m_pegawai peg ON peg.id = tpp.objectpegawaifk 
        LEFT JOIN m_produk mp ON mp.id = tpp.objectprodukfk 
        LEFT JOIN m_kelas mk ON mk.id = tpp.objectkelasfk
        LEFT JOIN t_notapelayananpasien npp ON npp.norec = tpp.objectnotapelayananpasienfk
        LEFT JOIN t_antreanpemeriksaan ap ON ap.norec = tpp.objectantreanpemeriksaanfk
        LEFT JOIN t_daftarpasien dp ON dp.norec = ap.objectdaftarpasienfk
        LEFT JOIN t_buktibayarpasien tbp ON tbp.objectnotapelayananpasienfk = tpp.objectnotapelayananpasienfk
            WHERE tpp.objectnotapelayananpasienfk=$1
            AND tpp.statusenabled=true
    `

const qGetVerif = `
    SELECT
    tnp.keterangan,
    dp.pembawapulang as pjpasien,
    mp.namapasien as namapasien,
    peg.namalengkap as namapegawai,
    peg.id as idpegawai,
    dp.norec as norecdp
    FROM t_notapelayananpasien tnp
        LEFT JOIN t_daftarpasien dp ON dp.norec = tnp.objectdaftarpasienfk
        LEFT JOIN m_pasien mp ON mp.id = dp.nocmfk
        LEFT JOIN m_pegawai peg ON peg.id = dp.objectpegawaifk
            WHERE tnp.norec=$1
`
export {
    qGetPelayananFromAntrean,
    qGetNorecPenggunaFromAp,
    qDaftarTagihanPasien,
    qGetPelayananFromVerif,
    qGetVerif
}