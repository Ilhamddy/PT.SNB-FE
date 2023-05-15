const getAll =
    "SELECT id as value, etnis as label FROM m_etnis where statusenabled=true";

module.exports = {
    getAll
};