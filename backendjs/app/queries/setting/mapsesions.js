const getSesions =
    "select r.name,r.permission  from user_roles as ur " +
    "join roles as r on r.id=ur.roleid where ur.userid =$1 and ur.statusenabled =true ";

const getSesionsNew =`select p."name" as premissions,r."name"   from role_permissions rp
left join permissions p on p.id=rp.permissionid
left join roles r on r.id=rp.roleid
join user_roles ur on  r.id=ur.roleid where ur.userid =$1 and ur.statusenabled =true and rp.statusenabled =true`;

export default {
    getSesions,
    getSesionsNew
};