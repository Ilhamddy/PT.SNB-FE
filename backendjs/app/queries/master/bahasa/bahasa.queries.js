const getAll =
    "SELECT id as value, bahasa as label FROM m_bahasa where statusenabled=true";

module.exports = {
    getAll
};