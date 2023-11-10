export const daftarInstalasi = {
    INSTALASI_RAWAT_JALAN: 1,
    INSTALASI_RAWAT_INAP: 2,
    INSTALASI_GAWAT_DARURAT: 7,
}

const getAll =
    `
SELECT 
    id as value, 
    namainstalasi as label 
FROM m_instalasi 
WHERE statusenabled = true`;

export default {
    getAll
};