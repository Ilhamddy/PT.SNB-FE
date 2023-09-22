const { pool } = require("../config/pool.config")
const { qTracerNotPrinted } = require("./queries/printedtracer.queries")
const db = require("./model")

const getDataNotPrinted = async () => {
    const data = await pool.query(qTracerNotPrinted)
    return data.rows
}


const updateDaftarPasien = async (norecdp) => {
    try{
        const hasil = await db.sequelize.transaction(
            async (transaction) => {
            await db.t_daftarpasien.update({
                isprinted: true
            }, {
                transaction: transaction,
                where: {
                norec: norecdp
                }
            })}
        )
    }catch(error){
        console.error(error)
    }
}

module.exports = {
    getDataNotPrinted,
    updateDaftarPasien
}