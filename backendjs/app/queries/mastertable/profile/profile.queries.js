const getAll =
    `select
	sp.id,
	sp.kdprofile,
	sp.statusenabled,
	sp.kodeexternal,
	sp.namaexternal,
	sp.reportdisplay,
	sp.alamatemail,
	sp.alamatlengkap,
	sp.faksimile,
	sp.fixedphone,
	sp.kodepos,
	sp.mobilephone,
	sp.mottosemboyan,
	sp.namalengkap,
	sp.website,
	sp.gambarlogo,
	sp.objectdesakelurahanfk,
	sp.ihs_id,
	sp.rt,
	sp.rw,
	sp.longitude,
	sp.latitude,
	sp.altitude,
	md.kodeexternal as kodedesa,
	mk.kodeexternal as kodekecamatan,
	mk2.kodeexternal as kodekabupaten,
	mp.kodeexternal as kodeprovinsi
from
	s_profil sp
left join m_desakelurahan md on md.id=sp.objectdesakelurahanfk
left join m_kecamatan mk on mk.id=md.objectkecamatanfk
left join m_kabupaten mk2 on mk2.id=md.objectkabupatenfk
left join m_provinsi mp on mp.id=md.objectprovinsifk `;

export default {
    getAll
};