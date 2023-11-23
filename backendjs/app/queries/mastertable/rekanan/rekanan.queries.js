export const daftarRekanan = {
    BPJSKESEHATAN: 1,
    UMUMPRIBADI: 3,
    
}

const getAll =
    `SELECT id as value, 
    namarekanan as label, 
    objectjenispenjaminfk 
        FROM m_rekanan 
            WHERE statusenabled = true`;

const getSupplier = `
SELECT id as value,
    namarekanan as label,
    objectjenisrekananfk
FROM m_rekanan
WHERE statusenabled = true
    AND objectjenisrekananfk = 1`;

const getPenjamin = `
SELECT id as value,
    namarekanan as label,
    objectjenisrekananfk,
    objectjenispenjaminfk
FROM m_rekanan
WHERE statusenabled = true
    AND objectjenisrekananfk = 2
    `;

export default {
    getAll,
    getSupplier,
    getPenjamin
};