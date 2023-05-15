const getAll =
    "SELECT id as value, statusenabled, kodeexternal, namaexternal, reportdisplay, jeniskelamin  as label FROM m_jeniskelamin mj  where statusenabled = true";

module.exports = {
    getAll
};