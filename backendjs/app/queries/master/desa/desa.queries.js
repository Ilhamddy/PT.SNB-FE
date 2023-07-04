const getAll =
    `select
	md.id as value,
	md.namadesakelurahan||', ' || mk.namakecamatan || ', ' ||mk2.namakabupaten
	|| ', ' || mp.namaprovinsi as label,
	mk.id as valuekecamatan,
	mk.namakecamatan,
	mk2.id as valuekabupaten,
	mk2.namakabupaten,
	mp.id as valuepropinsi,
	mp.namaprovinsi,
	md.kodepos
from
	m_desakelurahan md
	join m_kecamatan mk on mk.id=md.objectkecamatanfk 
	join m_kabupaten mk2 on mk2 .id=md.objectkabupatenfk 
	join m_provinsi mp on mp.id=md.objectprovinsifk `;

const getKecamatan=`
select id as value, namakecamatan as label  from m_kecamatan`

export default {
    getAll,
    getKecamatan
};