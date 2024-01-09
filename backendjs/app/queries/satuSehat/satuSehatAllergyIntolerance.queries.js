const qGetRiwayatAlergi =`SELECT
mp.ihs_id AS ihs_pasien,
mp.namapasien AS namapasien,
tdp.ihs_id AS ihs_encounter,
mt.code,mt.display,mt.codesystem,
trop.ihs_id as ihs_riwayatpenyakit
FROM t_riwayatpenyakit trop
LEFT JOIN t_pasienigd tpi ON tpi.norec = trop.norecreferenci 
LEFT JOIN t_daftarpasien tdp ON tdp.norec = tpi.objectdaftarpasienfk
LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
left join m_terminologi mt on mt.id=trop.objectterminologifk
WHERE trop.norec = $1`

const qGetRiwayatAlergiByNorecreferenci=`SELECT
mp.ihs_id AS ihs_pasien,
mp.namapasien AS namapasien,
tdp.ihs_id AS ihs_encounter,
mt.code,mt.display,mt.codesystem,
trop.ihs_id as ihs_riwayatalergi,
trop.norec
FROM t_riwayatalergi trop
LEFT JOIN t_pasienigd tpi ON tpi.norec = trop.norecreferenci 
LEFT JOIN t_daftarpasien tdp ON tdp.norec = tpi.objectdaftarpasienfk
LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
left join m_terminologi mt on mt.id=trop.objectterminologikfafk
WHERE tpi.norec =$1 and trop.objectjenisalergifk=$2`

export {
    qGetRiwayatAlergi,qGetRiwayatAlergiByNorecreferenci
}