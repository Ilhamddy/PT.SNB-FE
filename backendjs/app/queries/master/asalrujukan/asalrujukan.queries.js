const getAll =
    "SELECT id as value, asalrujukan as label FROM m_asalrujukan  where statusenabled = true";

module.exports = {
    getAll
};