
/**
 * 
 * @param {typeof import("../models/index").default} db 
 * @param {any} res 
 * @param {string} [transactionName] 
 * transaction name is optional
 */
export const createTransaction = async (db, res, transactionName) => {
    let transaction = null;
    let error = null
    try {
        transaction = await db.sequelize.transaction()
    } catch (e) {
        res.status(500).send({
            status: JSON.stringify(e),
            success: false,
            msg: `Error transaction ${transactionName}`,
            code: 500
        });
        error = e
    }
    return [transaction, error]
}
