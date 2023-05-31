const getAll =
    "SELECT id as value, namakamar as label, objectunitfk,objectkelasfk  as label FROM m_kamar where statusenabled=true";

module.exports = {
    getAll
};