const getAll =
    "SELECT id, statusenabled, kodeexternal, namaexternal, reportdisplay, agama, kdagama FROM agama_m where statusenabled = true";

module.exports = {
    getAll
};