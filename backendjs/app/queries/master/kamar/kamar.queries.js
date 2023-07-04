const getAll =
    "SELECT id as value, reportdisplay as label, objectunitfk,objectkelasfk FROM m_kamar where statusenabled=true";

export default {
    getAll
};