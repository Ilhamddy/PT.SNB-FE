
/**
 * 
 * @param {typeof import("../models/index").default} db 
 * @param {string} [transactionName] 
 * transaction name is optional
 */
export const createTransaction = async (db, transactionName) => {
    let transaction = null;
    let error = null
    try {
        transaction = await db.sequelize.transaction()
    } catch (e) {
        console.error(`Error transaction ${transactionName}`, e)
        error = e
    }
    return [transaction, error]
}
