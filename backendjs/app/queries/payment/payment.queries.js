import { checkStatusEnabled, dateBetweenEmptyString, dateEmptyString, emptyIlike, emptyInt, notEmptyIlike } from "../../utils/dbutils"
import { statusEnabled } from "../mastertable/globalvariables/globalvariables.queries"


const qGetPelayananFromDp =
    `
SELECT 
    peg.namalengkap AS namapegawai,
    mp.namaproduk AS namaproduk,
    mp.isobat AS isobat,
    mk.namakelas AS namakelas,
    mu.namaunit AS namaunit,
    dp.norec AS norec_dp,
    npp.no_nota AS no_nota,
    tpp.norec AS norec,
    tpp.harga AS harga,
    tpp.qty AS qty,
    tpp.discount AS discount,
    tpp.total AS total,
    tpp.tglinput AS tglinput,
    tpp.iscito AS iscito,
    tpp.jasa AS jasa
FROM t_daftarpasien td
    RIGHT JOIN t_antreanpemeriksaan tap ON (
        tap.objectdaftarpasienfk = td.norec AND tap.statusenabled = TRUE
    )
    RIGHT JOIN t_pelayananpasien tpp ON tpp.objectantreanpemeriksaanfk = tap.norec 
    AND tpp.statusenabled = true
    LEFT JOIN m_unit mu ON tap.objectunitfk = mu.id
    LEFT JOIN t_notapelayananpasien npp ON npp.norec = tpp.objectnotapelayananpasienfk 
    AND npp.statusenabled = true
    LEFT JOIN m_pegawai peg ON peg.id = tpp.objectpegawaifk 
    LEFT JOIN m_produk mp ON mp.id = tpp.objectprodukfk 
    LEFT JOIN m_kelas mk ON mk.id = tpp.objectkelasfk
    LEFT JOIN t_antreanpemeriksaan ap ON ap.norec = tpp.objectantreanpemeriksaanfk
    LEFT JOIN t_daftarpasien dp ON dp.norec = ap.objectdaftarpasienfk
WHERE td.norec=$1
AND td.statusenabled=true
GROUP BY 
    tpp.norec, 
    peg.namalengkap, 
    mp.namaproduk, 
    mp.isobat, 
    mk.namakelas, 
    dp.norec, 
    npp.no_nota,
    mu.namaunit
    `

const qDm = `
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
    FROM t_daftarpasien dp
        LEFT JOIN t_kepesertaanasuransi kpa ON dp.norec = kpa.objectdaftarpasienfk
        JOIN m_rekanan mr ON mr.id = kpa.objectpenjaminfk
            WHERE dp.norec=$1
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
	td.tglpulang AS tglpulang,
    count(tp)::int as jmlpiutangbayar,
    case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile
FROM t_notapelayananpasien tn
    LEFT JOIN t_daftarpasien td ON tn.objectdaftarpasienfk=td.norec
    LEFT JOIN m_pasien mp ON td.nocmfk=mp.id
    LEFT JOIN m_rekanan mr ON td.objectpenjaminfk=mr.id
    LEFT JOIN t_buktibayarpasien bb ON bb.objectnotapelayananpasienfk = tn.norec 
        AND bb.statusenabled = true 
        AND bb.objectpiutangpasienfk IS NULL
    LEFT JOIN t_piutangpasien tp ON tp.objectnotapelayananpasienfk = tn.norec
        AND tp.statusenabled = true 
        AND tp.totalbayar > 0
WHERE tn.statusenabled=true 
    AND (
        ${dateBetweenEmptyString("tn.tglinput", "$1", "$2")}
    )
    AND (
        ${notEmptyIlike("mp.namapasien", "$3")}
        OR 
        ${notEmptyIlike("mp.nocm", "$3")}
    )
GROUP BY 
    tn.total,
    tn.norec,
    td.norec,
    mp.namapasien,
    mr.namaexternal,
    bb.norec,
    mp.tgllahir,
    mp.objectjeniskelaminfk
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
    LEFT JOIN m_pegawai peg ON peg.id = tpp.objectpegawaifk 
    LEFT JOIN m_produk mp ON mp.id = tpp.objectprodukfk 
    LEFT JOIN m_kelas mk ON mk.id = tpp.objectkelasfk
    LEFT JOIN t_notapelayananpasien npp ON npp.norec = tpp.objectnotapelayananpasienfk
    LEFT JOIN t_antreanpemeriksaan ap ON ap.norec = tpp.objectantreanpemeriksaanfk
    LEFT JOIN t_daftarpasien dp ON dp.norec = ap.objectdaftarpasienfk
    LEFT JOIN t_buktibayarpasien tbp ON tbp.objectnotapelayananpasienfk = tpp.objectnotapelayananpasienfk
AND tbp.statusenabled = true
WHERE 
    tpp.objectnotapelayananpasienfk = $1
    AND npp.statusenabled=true


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
    tp.tglupdate AS tglupdate,
    mp.noidentitas AS noidentitas,
    case when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<1825 then 'baby'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=1 then 'anaklaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<6569 and mp.objectjeniskelaminfk=2 then 'anakperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=1 then 'dewasalaki'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))<23724 and mp.objectjeniskelaminfk=2 then 'dewasaperempuan'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=1 then 'kakek'
    when (current_date - to_date(to_char(mp.tgllahir, 'DD-MM-YYYY'), 'DD-MM-YYYY'))>23724 and mp.objectjeniskelaminfk=2 then 'nenek' else 'baby' end as profile
FROM t_piutangpasien tp
    LEFT JOIN t_daftarpasien td ON tp.objectdaftarpasienfk=td.norec
    LEFT JOIN m_pasien mp ON td.nocmfk=mp.id
    LEFT JOIN m_rekanan mr ON tp.objectpenjaminfk=mr.id
    LEFT JOIN t_notapelayananpasien tn ON tn.norec = tp.objectnotapelayananpasienfk
    LEFT JOIN t_buktibayarpasien bb ON bb.objectpiutangpasienfk = tp.norec AND bb.statusenabled = true
WHERE 
    CASE 
        WHEN $1 = 'pasien' THEN 
            CASE 
                WHEN (($2 <> '') IS TRUE) THEN cast($2 AS TIMESTAMP) <= tp.tglupdate 
                ELSE TRUE
            END
            AND
            CASE
                WHEN (($3 <> '') IS TRUE) THEN tp.objectnotapelayananpasienfk = $3
                ELSE TRUE
            END
            AND tp.objectpenjaminfk = 3
        ELSE tp.objectpenjaminfk != 3
    END
    AND
    CASE
        WHEN $4 IS TRUE THEN tp.totalbayar > 0
        ELSE TRUE
    END
    AND tp.statusenabled = true
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
    AND tp.statusenabled = true
GROUP BY tp.norec, tnp.norec, bb.totalbayar, bb.klaim, bb.no_bukti
    `

const qDaftarTagihanPasienFromNota =
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
	td.tglpulang AS tglpulang,
    JSON_AGG(
        JSON_BUILD_OBJECT
        (
            'metodebayar', tcb.objectmetodebayarfk,
            'nontunai', tcb.objectjenisnontunaifk,
            'pjpasien', tcb.pjpasien,
            'approvalcode', tcb.approvalcode,
            'nominalbayar', tcb.totalbayar,
            'rekeningrs', tcb.objectrekeningrsfk
        )
    ) AS carabayar
FROM t_notapelayananpasien tn
    LEFT JOIN t_daftarpasien td ON tn.objectdaftarpasienfk=td.norec
    LEFT JOIN m_pasien mp ON td.nocmfk=mp.id
    LEFT JOIN m_rekanan mr ON td.objectpenjaminfk=mr.id
    LEFT JOIN t_buktibayarpasien bb ON (
        bb.objectnotapelayananpasienfk = tn.norec 
        AND 
        bb.statusenabled = true 
    )
    LEFT JOIN t_carabayar tcb ON tcb.objectbuktibayarpasienfk = bb.norec
WHERE tn.statusenabled=true 
    AND 
        tn.norec = $1
    AND
        ${dateEmptyString("bb.tglinput", "<", "$2")}
GROUP BY
    tn.total, 
    tn.norec,
    tn.no_nota, 
    td.nocmfk,
    td.tglregistrasi,
    td.noregistrasi,
    td.norec,
    mp.namapasien,
    mr.namaexternal,
    bb.no_bukti,
    bb.statusenabled,
    bb.norec,
    bb.totalbayar,
    bb.totaltagihan,
    td.tglpulang
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


const qGetBuktiBayarFromNorec =
    `
SELECT
    tbb.norec,
    tbb.kdprofile,
    tbb.statusenabled,
    tbb.objectdaftarpasienfk,
    tbb.totaltagihan,
    tbb.deposit,
    tbb.totalbayar,
    tbb.no_bukti,
    tbb.objectpegawaifk,
    tbb.objectnotapelayananpasienfk,
    tbb.objectmetodebayarfk,
    tbb.objectjenisnontunaifk,
    tbb.objectrekeningrsfk,
    tbb.pjpasien,
    tbb.diskon,
    tbb.klaim,
    tbb.objectpiutangpasienfk,
    tbb.keterangan,
    tbb.tglinput,
    tbb.tglbatal,
    tbb.objectjenispembayaranfk,
    tbb.objectsetorankasirfk,
    tbb.objectdepositpasienfk,
    tdp.noregistrasi AS noregistrasi,
    tdp.nocmfk AS nocmfk,
    tdp.tglregistrasi AS tglregistrasi,
    mp.namapasien AS namapasien,
    JSON_AGG(
        JSON_BUILD_OBJECT
        (
            'metodebayar', tcb.objectmetodebayarfk,
            'nontunai', tcb.objectjenisnontunaifk,
            'pjpasien', tcb.pjpasien,
            'approvalcode', tcb.approvalcode,
            'nominalbayar', tcb.totalbayar,
            'rekeningrs', tcb.objectrekeningrsfk
        )
    ) AS carabayar
FROM t_buktibayarpasien tbb
    LEFT JOIN t_daftarpasien tdp ON tdp.norec = tbb.objectdaftarpasienfk
    LEFT JOIN m_pasien mp ON mp.id = tdp.nocmfk
    LEFT JOIN t_carabayar tcb ON tcb.objectbuktibayarpasienfk = tbb.norec
WHERE tbb.norec = $1
    AND tbb.statusenabled = true
GROUP BY
    tbb.norec,
    tbb.kdprofile,
    tbb.statusenabled,
    tbb.objectdaftarpasienfk,
    tbb.totaltagihan,
    tbb.deposit,
    tbb.totalbayar,
    tbb.no_bukti,
    tbb.objectpegawaifk,
    tbb.objectnotapelayananpasienfk,
    tbb.objectmetodebayarfk,
    tbb.objectjenisnontunaifk,
    tbb.objectrekeningrsfk,
    tbb.pjpasien,
    tbb.diskon,
    tbb.klaim,
    tbb.objectpiutangpasienfk,
    tbb.keterangan,
    tbb.tglinput,
    tbb.tglbatal,
    tbb.objectjenispembayaranfk,
    tbb.objectsetorankasirfk,
    tbb.objectdepositpasienfk,
    tdp.noregistrasi,
    tdp.nocmfk,
    tdp.tglregistrasi,
    mp.namapasien
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
const qGetLaporanPendapatanKasir =
    `
SELECT 
    row_number() OVER (ORDER BY tb.norec) AS no,tb.totalbayar,
    tb.objectpegawaifk,
    mp.namalengkap,
    to_char(tb.tglinput,'dd Month YYYY') as tglbayar, 
    mj.reportdisplay as jenispembayaran,
    td.noregistrasi,
    tb.no_bukti 
from t_buktibayarpasien tb 
    join m_pegawai mp on mp.id=tb.objectpegawaifk 
    join m_jenispembayaran mj on mj.id=tb.objectjenispembayaranfk
    join t_daftarpasien td on td.norec=tb.objectdaftarpasienfk 
where 
    tb.statusenabled=true and tb.tglinput between $1 and $2 and mp.namalengkap ilike $3
    `

const qGetPembayaran = `
SELECT
    tcb.norec AS noreccarabayar,
    tbb.norec AS norecbuktibayar,
    tdp.noregistrasi AS noregistrasi,
    tdp.tglregistrasi AS tglregistrasi,
    tbb.no_bukti AS no_bukti,
    mp.nocm AS nocm,
    mp.namapasien AS namapasien,
    mu.namaunit AS namaunit,
    mi.namainstalasi AS namainstalasi,
    COALESCE(mr.namarekanan, 'Umum/Pribadi') AS namarekanan,
    tdp.tglpulang AS tglpulang,
    tcb.totalbayar AS totalbayar,
    COALESCE(mjnt.nontunai, mmb.metodebayar) AS metodebayar
FROM t_buktibayarpasien tbb
    LEFT JOIN t_daftarpasien tdp ON tbb.objectdaftarpasienfk = tdp.norec
    LEFT JOIN t_carabayar tcb ON tcb.objectbuktibayarpasienfk = tbb.norec
    LEFT JOIN t_piutangpasien tpp ON tbb.objectpiutangpasienfk = tpp.norec
    LEFT JOIN m_rekanan mr ON tpp.objectpenjaminfk = mr.id
    LEFT JOIN m_unit mu ON tdp.objectunitlastfk = mu.id
    LEFT JOIN m_instalasi mi ON mu.objectinstalasifk = mi.id
    LEFT JOIN m_metodebayar mmb ON tcb.objectmetodebayarfk = mmb.id
    LEFT JOIN m_jenisnontunai mjnt ON tcb.objectjenisnontunaifk = mjnt.id
    LEFT JOIN m_pasien mp ON tdp.nocmfk = mp.id
WHERE
    ${dateBetweenEmptyString("tbb.tglinput", "$1", "$2")}
    AND
    tbb.objectpegawaifk = $3
`

const  qGetSetor = `
SELECT
    tsk.norec AS norecsetoran,
    tsk.tglsetor AS tanggalshift,
    tsk.objectpegawaifk AS kasir,
    tsk.objectshiftfk AS jadwalshift,
    msk.reportdisplay AS jadwalshiftname,
    tsk.jumlahsetor AS totalsetor
FROM t_setorankasir tsk
    LEFT JOIN m_shiftkasir msk ON msk.id = tsk.objectshiftfk
WHERE
    ${dateBetweenEmptyString("tsk.tglsetor", "$1", "$2")}
    AND
    tsk.objectpegawaifk = $3
`


export {
    qGetPelayananFromDp,
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
    qDaftarTagihanPasienFromNota,
    qGetDepositFromNota,
    qGetBuktiBayarFromNorec,
    qGetCaraBayarFromBB,
    qGetBuktiBayarNorec,
    qGetLaporanPendapatanKasir,
    qGetPembayaran,
    qGetSetor
}