const getSesions =
    "select r.name,r.permission  from user_roles as ur " +
    "join roles as r on r.id=ur.roleid where ur.userid =$1 and ur.statusenabled =true ";

const getSesionsNew =`select p."name" as premissions,r."name"   from role_permissions rp
left join permissions p on p.id=rp.permissionid
left join roles r on r.id=rp.roleid
join user_roles ur on  r.id=ur.roleid where ur.userid =$1 and ur.statusenabled =true and rp.statusenabled =true`;

const qMenuModulAplikasi=`select sm.id,sm.reportdisplay,sm.icon from s_menumodulaplikasi sm 
where sm.objekmodulaplikasiid=$1 order by sm.nourut`

const qChlidMenuModulAplikasi=`select sc.id,sm.reportdisplay as menu,sm.id as idmenu,sc.reportdisplay as label, sm.nourut,sc.nourut,sc.link  from s_menumodulaplikasi sm
join s_childmenumodulaplikasi sc on sc.objekmenumodulaplikasiid=sm.id
where sm.objekmodulaplikasiid=$1
order by sm.nourut,sc.nourut`

export default {
    getSesions,
    getSesionsNew,
    qMenuModulAplikasi,
    qChlidMenuModulAplikasi
};