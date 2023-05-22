const getAll =
    "SELECT id as value, namaunit as label, objectinstalasifk FROM m_unit  where statusenabled = true";

module.exports = {
    getAll
};