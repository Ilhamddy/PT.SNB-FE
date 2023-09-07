const qResult = `select td.noregistrasi,td.norec,td.nocmfk,
to_char(td.tglregistrasi,'dd Month YYYY') as tglregistrasi,to_char(td.tglpulang,'dd Month YYYY') as tglpulang,mp.namapasien,
mi.namainstalasi,mu.namaunit,mp.nocm,mr.namarekanan,mp2.namalengkap  from t_daftarpasien td 
left join m_pasien mp on mp.id=td.nocmfk
left join m_instalasi mi on mi.id=td.objectinstalasifk
left join m_unit mu on mu.id=td.objectunitlastfk
left join m_rekanan mr on td.objectpenjaminfk=mr.id
left join m_pegawai mp2 on mp2.id=td.objectpegawaifk
where td.tglregistrasi between $1 and $2 and td.noregistrasi ilike $3 
`



const qGetDetailFromJenisProduk = `
SELECT 
    mdjp.namaexternal AS label,
    mdjp.id AS value
FROM m_detailjenisproduk mdjp
WHERE objectjenisprodukfk = $1
AND statusenabled = true
`

const qLayananJenis = `
SELECT
    CAST(row_number() OVER (ORDER BY mpr.id) AS INT)  AS no,
    mpr.id AS idproduk,
    mpr.namaproduk AS namaproduk,
    mdp.detailjenisproduk AS detailjenisproduk,
    mjp.jenisproduk AS jenisproduk,
    mi.namainstalasi AS instalasi
FROM m_produk mpr
    LEFT JOIN m_detailjenisproduk mdp ON mdp.id = mpr.objectdetailjenisprodukfk
    LEFT JOIN m_jenisproduk mjp ON mjp.id = mdp.objectjenisprodukfk
    LEFT JOIN m_instalasi mi ON mi.id = mpr.objectinstalasifk
WHERE mpr.objectdetailjenisprodukfk = $1
AND mpr.statusenabled = true
ORDER BY mpr.id
`

export default {
    qResult,
    qGetDetailFromJenisProduk,
    qLayananJenis
}