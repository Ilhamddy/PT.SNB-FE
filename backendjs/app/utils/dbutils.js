
/**
 * 
 * @param {typeof import("../models/index").default} db 
 * @param {import("express").Response} res
 * @param {string} [transactionName] 
 * transaction name is optional
 * @returns {Promise<[import("sequelize").Transaction, Error]>}
 */
export const createTransaction = async (db, res) => {
    let transaction = null;
    let error = null
    const logger = res.locals.logger
    try {
        transaction = await db.sequelize.transaction()
    } catch (e) {
        error = e
        res.status(500).send({
            data: error,
            success: false,
            msg: error.message,
            code: 500
        });
        logger.error(error)
    }

    return [transaction, error]
}
