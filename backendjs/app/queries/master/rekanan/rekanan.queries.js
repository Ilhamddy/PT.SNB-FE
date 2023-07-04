const getAll =
    "SELECT id as value, namarekanan as label, objectjenispenjaminfk FROM m_rekanan  where statusenabled = true";

export default {
    getAll
};