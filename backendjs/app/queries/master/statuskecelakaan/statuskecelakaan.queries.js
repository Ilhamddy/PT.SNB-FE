const getAll =
    "SELECT id as value, reportdisplay as label FROM m_statuskecelakaan where statusenabled=true";

module.exports = {
    getAll
};