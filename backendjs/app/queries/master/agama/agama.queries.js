const getAll =
    "SELECT id as value, statusenabled, kodeexternal, namaexternal, reportdisplay, agama as label, kdagama FROM m_agama where statusenabled = true";

module.exports = {
    getAll
};