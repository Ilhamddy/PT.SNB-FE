const getAll =
    "SELECT id as value, namakelas  as label FROM m_kelas where statusenabled=true";

module.exports = {
    getAll
};