const getAll =
    "SELECT id, statusenabled, kodeexternal, namaexternal, reportdisplay, agama, kdagama FROM m_agama where statusenabled = true";

module.exports = {
    getAll
};