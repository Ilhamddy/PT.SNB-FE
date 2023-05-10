const getSesions =
    "select r.name,r.permission  from user_roles as ur "+
    "join roles as r on r.id=ur.roleid where ur.userid =$1 and ur.statusenabled =true ";

module.exports = {
    getSesions
};