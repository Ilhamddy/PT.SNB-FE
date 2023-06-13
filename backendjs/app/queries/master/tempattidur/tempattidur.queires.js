const getAll =
    "SELECT id as value, reportdisplay as label, objectkamarfk,objectstatusbedfk FROM m_tempattidur where statusenabled=true";

module.exports = {
    getAll
};