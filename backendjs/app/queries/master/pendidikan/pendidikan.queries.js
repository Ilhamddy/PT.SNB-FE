const getAll =
    "SELECT id as value, pendidikan as label FROM m_pendidikan where statusenabled=true";

module.exports = {
    getAll
};