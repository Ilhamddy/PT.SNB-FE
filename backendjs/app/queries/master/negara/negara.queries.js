const getAll =
    "SELECT id as value, namanegara  as label FROM m_negara where statusenabled=true";

module.exports = {
    getAll
};