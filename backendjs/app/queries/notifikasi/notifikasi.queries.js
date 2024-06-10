const qGetChekPegawai = `select
mm.objectuserfk,mm.objectunitfk
from
m_mapusertounit mm where objectunitfk=$1`

const qGetListNotification = `SELECT 'Order '||mj.reportdisplay as label,tn.link,tn.tglinput,tn.norec,tn.isbaca,
case when tn.isbaca=true then 'gainsboro' else 'white' end as color from t_notifikasi tn
join m_jenisorder mj on mj.id=tn.objectjenisorderfk
where tn.objectuserfk=$1 ORDER BY tn.isbaca ASC, tn.tglinput limit 10`

export default{
    qGetChekPegawai,
    qGetListNotification
}