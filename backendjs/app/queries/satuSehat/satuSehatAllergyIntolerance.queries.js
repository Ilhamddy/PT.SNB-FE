const qGetRiwayatAlergi =`SELECT
mp.ihs_id AS ihs_pasien,
mp.namapasien AS namapasien,
tdp.ihs_id AS ihs_encounter,
mt.code,mt.display,mt.codesystem as system,
trop.ihs_id as ihs_riwayatalergi,
mpeg.ihs_id AS ihs_iddokter,
mpeg.namalengkap AS namadokter,
mj.kodeexternal as category,
tpi.tglinput
FROM t_riwayatalergi trop
LEFT JOIN t_pasienigd tpi ON tpi.norec = trop.norecreferenci 
LEFT JOIN t_daftarpasien tdp ON tdp.norec = tpi.objectdaftarpasienfk
LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
left join m_terminologi mt on mt.id=trop.objectterminologikfafk
LEFT JOIN m_pegawai mpeg ON tdp.objectdokterpemeriksafk = mpeg.id
left join m_jenisalergi mj on mj.id=trop.objectjenisalergifk
WHERE trop.norec = $1`

const qGetRiwayatAlergiObat = `SELECT
mp.ihs_id AS ihs_pasien,
mp.namapasien AS namapasien,
tdp.ihs_id AS ihs_encounter,
mt.code,mt.display,'http://sys-ids.kemkes.go.id/kfa' as system,
trop.ihs_id as ihs_riwayatalergi,
mpeg.ihs_id AS ihs_iddokter,
mpeg.namalengkap AS namadokter,
mj.kodeexternal as category,
tpi.tglinput
FROM t_riwayatalergi trop
LEFT JOIN t_pasienigd tpi ON tpi.norec = trop.norecreferenci 
LEFT JOIN t_daftarpasien tdp ON tdp.norec = tpi.objectdaftarpasienfk
LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
left join m_kfa mt on mt.id=trop.objectterminologikfafk
LEFT JOIN m_pegawai mpeg ON tdp.objectdokterpemeriksafk = mpeg.id
left join m_jenisalergi mj on mj.id=trop.objectjenisalergifk
WHERE trop.norec =$1`

const qGetRiwayatAlergiByNorecreferenci=`SELECT
mp.ihs_id AS ihs_pasien,
mp.namapasien AS namapasien,
tdp.ihs_id AS ihs_encounter,
mt.code,mt.display,mt.codesystem,
trop.ihs_id as ihs_riwayatalergi,
trop.norec,mpeg.ihs_id AS ihs_iddokter,
mpeg.namalengkap AS namadokter,trop.objectjenisalergifk,
tpi.tglinput
FROM t_riwayatalergi trop
LEFT JOIN t_pasienigd tpi ON tpi.norec = trop.norecreferenci 
JOIN t_daftarpasien tdp ON tdp.norec = tpi.objectdaftarpasienfk
LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
left join m_terminologi mt on mt.id=trop.objectterminologikfafk
LEFT JOIN m_pegawai mpeg ON tdp.objectdokterpemeriksafk = mpeg.id
WHERE tpi.norec =$1`

export {
    qGetRiwayatAlergi,qGetRiwayatAlergiByNorecreferenci,qGetRiwayatAlergiObat
}