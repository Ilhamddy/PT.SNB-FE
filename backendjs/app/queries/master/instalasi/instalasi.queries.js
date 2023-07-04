const getAll =
    "SELECT id as value, namainstalasi as label FROM m_instalasi  where statusenabled = true";

export default {
    getAll
};