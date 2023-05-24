const getAll =
    "SELECT id as value, namalengkap  as label FROM m_pegawai where objectprofesipegawaifk=1";

module.exports = {
    getAll
};