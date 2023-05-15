const getAll =
    "SELECT id as value, pekerjaan as label FROM m_pekerjaan where statusenabled=true";

module.exports = {
    getAll
};