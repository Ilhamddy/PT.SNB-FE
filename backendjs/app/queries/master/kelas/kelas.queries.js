const getAll =
    "SELECT id as value, namakelas as label, kelas_bpjs FROM m_kelas where statusenabled=true";

export default {
    getAll
};