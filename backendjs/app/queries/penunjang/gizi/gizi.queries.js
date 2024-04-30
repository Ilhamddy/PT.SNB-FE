import { dateBetweenEmptyString, emptyIlike, emptyInt } from "../../../utils/dbutils"

const qGetJenisOrder =`select
mj.id as value,
mj.reportdisplay as label
from
m_jenisordergizi mj
where
mj.statusenabled = true`

const qGetDiet = `select
md.id as value,
md.reportdisplay as label
from
m_diet md
where
md.statusenabled = true`

const qGetKategoriDiet =`
select
	md.id as value,
	md.reportdisplay as label
from
	m_kategoridiet md
where
	md.statusenabled = true`

const qGetMakanan =`select
md.id as value,
md.reportdisplay as label
from
m_makanan md
where
md.statusenabled = true`

export default{
    qGetJenisOrder,
    qGetDiet,
    qGetKategoriDiet,
    qGetMakanan
}