

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
            GROUP BY 
                tpp.norec, 
                peg.namalengkap, 
                mp.namaproduk, 
                mp.isobat, 
                mk.namakelas, 
                dp.norec, 
                npp.no_nota
    `

const qDm =`
    SELECT
    json_agg(json_build_object(
        'no_kartu', 
        kpa.no_kartu,
        'nama_asuransi',
        mr.namaexternal,
        'plafon',
        kpa.plafon
    )) AS list_kpa
        FROM t_cobacoba
            LEFT JOIN t_kepesertaanasuransi kpa ON kpa.objectdaftarpasienfk = dp.norec
            LEFT JOIN m_rekanan mr ON mr.id = kpa.objectpenjaminfk
    `

const qGetKepesertaanFromAntrean = 
    `
    SELECT
    json_agg(json_build_object(
        'no_kartu', 
        kpa.no_kartu,
        'nama_asuransi',
        mr.namaexternal,
        'plafon',
        kpa.plafon,
        'norec',
        kpa.norec,
        'objectpenjaminfk',
        kpa.objectpenjaminfk
    )) AS list_kpa
    FROM t_antreanpemeriksaan ap
        LEFT JOIN t_daftarpasien dp ON dp.norec = ap.objectdaftarpasienfk
        LEFT JOIN t_kepesertaanasuransi kpa ON kpa.objectdaftarpasienfk = dp.norec
        LEFT JOIN m_rekanan mr ON mr.id = kpa.objectpenjaminfk
            WHERE ap.norec=$1
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
    td.norec AS norecdp,
	mp.namapasien AS namapasien,
	mr.namaexternal AS namarekanan,
    bb.no_bukti AS nobukti,
    bb.statusenabled AS statusenabledbukti,
    bb.norec as norecbukti,
    bb.totalbayar as totalbayar,
    bb.totaltagihan as totaltagihan,
	td.tglpulang AS tglpulang
		FROM t_notapelayananpasien tn
		LEFT JOIN t_daftarpasien td ON tn.objectdaftarpasienfk=td.norec
	    LEFT JOIN m_pasien mp ON td.nocmfk=mp.id
		LEFT JOIN m_rekanan mr ON td.objectpenjaminfk=mr.id
        LEFT JOIN t_buktibayarpasien bb 
        ON bb.objectnotapelayananpasienfk = tn.norec 
        AND bb.statusenabled = true 
        AND bb.objectpiutangpasienfk IS NULL
            WHERE tn.statusenabled=true 
            ORDER BY tn.tglinput DESC
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
        JOIN m_pegawai peg ON peg.id = tpp.objectpegawaifk 
        JOIN m_produk mp ON mp.id = tpp.objectprodukfk 
        JOIN m_kelas mk ON mk.id = tpp.objectkelasfk
        JOIN t_notapelayananpasien npp ON npp.norec = tpp.objectnotapelayananpasienfk
        JOIN t_antreanpemeriksaan ap ON ap.norec = tpp.objectantreanpemeriksaanfk
        JOIN t_daftarpasien dp ON dp.norec = ap.objectdaftarpasienfk
        LEFT JOIN t_buktibayarpasien tbp ON tbp.objectnotapelayananpasienfk = tpp.objectnotapelayananpasienfk
        AND tbp.statusenabled = true
            WHERE tpp.objectnotapelayananpasienfk=$1 AND npp.statusenabled=true

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

const qGetKepesertaanFromNota = 
    `
    SELECT
    json_agg(json_build_object(
        'no_kartu', 
        kpa.no_kartu,
        'nama_asuransi',
        mr.namaexternal,
        'plafon',
        kpa.plafon,
        'norec',
        kpa.norec,
        'nominalklaim',
        kpa.nominalklaim,
        'objectpenjaminfk',
        kpa.objectpenjaminfk
    )) AS list_kpa
    FROM t_notapelayananpasien tnp
        LEFT JOIN t_kepesertaanasuransi kpa ON kpa.objectdaftarpasienfk = tnp.objectdaftarpasienfk
        LEFT JOIN m_rekanan mr ON mr.id = kpa.objectpenjaminfk
            WHERE tnp.norec = $1
    `

const qGetPiutangFromDP = 
    `
    SELECT
    *
    FROM t_piutangpasien
        WHERE objectdaftarpasienfk = $1
        AND statusenabled = true
    `


const qGetNotaPelayananPasien = 
    `
    SELECT
    *
    FROM t_notapelayananpasien
        WHERE norec = $1
    `

const qGetBuktiBayar = 
    `
    SELECT
    *
    FROM t_buktibayarpasien
        WHERE norec = $1
    `

const qGetPiutangPasien =
    `
    SELECT 
    tp.totalbayar AS totalbayar, 
    tp.norec AS norecpiutang,
    tp.totalpiutang AS totalpiutang, 
    td.nocmfk AS nocmfk,
    td.tglregistrasi AS tglregistrasi,
    td.noregistrasi AS noregistrasi,
    td.norec AS norecdp,
    mp.namapasien AS namapasien,
    mr.namaexternal AS namarekanan,
    td.tglpulang AS tglpulang,
    tn.norec AS norecnota,
    bb.norec AS norecbukti,
    mp.noidentitas AS noidentitas
        FROM t_piutangpasien tp
        LEFT JOIN t_daftarpasien td ON tp.objectdaftarpasienfk=td.norec
        LEFT JOIN m_pasien mp ON td.nocmfk=mp.id
        LEFT JOIN m_rekanan mr ON tp.objectpenjaminfk=mr.id
        LEFT JOIN t_notapelayananpasien tn ON tn.norec = tp.objectnotapelayananpasienfk
        LEFT JOIN t_buktibayarpasien bb ON bb.objectpiutangpasienfk = tp.norec AND bb.statusenabled = true
            WHERE CASE WHEN $1 = 'pasien' THEN tp.statusenabled = true AND tp.objectpenjaminfk = 3
                ELSE tp.statusenabled = true AND tp.objectpenjaminfk != 3
            END
            ORDER BY tp.tglinput DESC
    `  

const qTagihanGetFromDP = 
    `
    SELECT
    tn.*,
    bb.totaltagihan AS totaltagihan,
    bb.totalbayar AS totalbayar,
    bb.klaim AS klaim
    FROM t_notapelayananpasien tn
        LEFT JOIN t_buktibayarpasien bb ON bb.objectnotapelayananpasienfk = tn.norec AND bb.statusenabled = true
            WHERE tn.objectdaftarpasienfk = $1
            AND tn.statusenabled = true
    `

const qGetPaymentForPiutang = 
    `
    SELECT
    tp.totalpiutang AS totalpiutang,
    tnp.norec AS norecnota,
    tnp.total AS totalnota,
    bb.totalbayar AS totalbayar,
    bb.klaim AS klaim
        FROM t_piutangpasien tp
        LEFT JOIN t_notapelayananpasien tnp ON tnp.norec = tp.objectnotapelayananpasienfk
        LEFT JOIN t_buktibayarpasien bb ON bb.objectnotapelayananpasienfk = tnp.norec AND bb.statusenabled = true
            WHERE tp.norec = $1
            AND tp.totalbayar = 0
            AND tp.statusenabled = true
                GROUP BY tp.norec, tnp.norec, bb.totalbayar, bb.klaim, bb.no_bukti
    `

const qDaftarTagihanPasienFronNota =
    `
    SELECT 
	tn.total AS total, 
    tn.norec AS norecnota,
	tn.no_nota AS nonota, 
	td.nocmfk AS nocmfk,
	td.tglregistrasi AS tglregistrasi,
	td.noregistrasi AS noregistrasi,
    td.norec AS norecdp,
	mp.namapasien AS namapasien,
	mr.namaexternal AS namarekanan,
    bb.no_bukti AS nobukti,
    bb.statusenabled AS statusenabledbukti,
    bb.norec as norecbukti,
    bb.totalbayar as totalbayar,
    bb.totaltagihan as totaltagihan,
	td.tglpulang AS tglpulang
		FROM t_notapelayananpasien tn
		LEFT JOIN t_daftarpasien td ON tn.objectdaftarpasienfk=td.norec
	    LEFT JOIN m_pasien mp ON td.nocmfk=mp.id
		LEFT JOIN m_rekanan mr ON td.objectpenjaminfk=mr.id
        LEFT JOIN t_buktibayarpasien bb 
        ON bb.objectnotapelayananpasienfk = tn.norec 
        AND bb.statusenabled = true 
            WHERE tn.statusenabled=true 
            AND tn.norec = $1
    `     

const qGetDepositFromNota = 
    `
    SELECT 
    dpst.norec AS norec,
    dpst.nominal AS nominal,
    dpst.tglinput AS tglinput,
    bb.no_bukti AS nobukti
    FROM t_notapelayananpasien tnp
        LEFT JOIN t_depositpasien dpst ON dpst.objectdaftarpasienfk = tnp.objectdaftarpasienfk
        LEFT JOIN t_buktibayarpasien bb ON bb.norec = dpst.objectbuktibayarpasienfk
            WHERE tnp.norec = $1
            AND tnp.statusenabled = true
            ORDER BY dpst.tglinput DESC
    `

const qGetBuktiBayarFromNota = 
    `
    SELECT
    tbb.*,
    td.noregistrasi AS noregistrasi,
    td.nocmfk AS nocmfk,
    td.tglregistrasi AS tglregistrasi,
    mp.namapasien AS namapasien
    FROM t_buktibayarpasien tbb
        LEFT JOIN t_daftarpasien td ON td.norec = tbb.objectdaftarpasienfk
        LEFT JOIN m_pasien mp ON mp.id = td.nocmfk
        WHERE objectnotapelayananpasienfk = $1
    `

const qGetCaraBayarFromBB = 
    `
    SELECT
    tc.*,
    mm.metodebayar AS metodebayar,
    mj.nontunai AS nontunai
    FROM t_carabayar tc
        LEFT JOIN m_metodebayar mm ON mm.id = tc.objectmetodebayarfk
        LEFT JOIN m_jenisnontunai mj ON mj.id = tc.objectjenisnontunaifk
        WHERE objectbuktibayarpasienfk = $1
    `

const qGetBuktiBayarNorec = 
    `
    SELECT
    tbb.*,
    td.noregistrasi AS noregistrasi,
    td.nocmfk AS nocmfk,
    td.tglregistrasi AS tglregistrasi,
    mp.namapasien AS namapasien
    FROM t_buktibayarpasien tbb
        LEFT JOIN t_daftarpasien td ON td.norec = tbb.objectdaftarpasienfk
        LEFT JOIN m_pasien mp ON mp.id = td.nocmfk
        WHERE tbb.norec = $1
    `

export {
    qGetPelayananFromAntrean,
    qGetNorecPenggunaFromAp,
    qDaftarTagihanPasien,
    qGetPelayananFromVerif,
    qGetVerif,
    qGetKepesertaanFromAntrean,
    qGetKepesertaanFromNota,
    qGetPiutangFromDP,
    qGetNotaPelayananPasien,
    qGetBuktiBayar,
    qGetPiutangPasien,
    qTagihanGetFromDP,
    qGetPaymentForPiutang,
    qDaftarTagihanPasienFronNota,
    qGetDepositFromNota,
    qGetBuktiBayarFromNota,
    qGetCaraBayarFromBB,
    qGetBuktiBayarNorec,
}