const getSesions =
    "select sm2.reportdisplay as head,sm2.id as idhead, sc.reportdisplay,sc.link,sc.nourut "+
    "from s_modulaplikasi sm join s_menumodulaplikasi sm2 on sm.id=sm2.objekmodulaplikasiid "+
    "join s_childmenumodulaplikasi sc on sc.objekmenumodulaplikasiid =sm2.id "+
    "where sm.id= $1 order by sm2.nourut,sc.nourut ";

module.exports = {
    getSesions
};