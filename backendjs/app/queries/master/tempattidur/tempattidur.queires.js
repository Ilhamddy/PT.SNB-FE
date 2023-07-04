const getAll =
    "SELECT id as value, reportdisplay as label, objectkamarfk,objectstatusbedfk FROM m_tempattidur where statusenabled=true";

export default {
    getAll
};