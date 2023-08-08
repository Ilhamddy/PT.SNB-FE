

export const createTransaction = async (db, res) => {
    let transaction = null;
    let error = null
    try {
        transaction = await db.sequelize.transaction();
    } catch (e) {
        res.status(500).send({
            status: JSON.stringify(e),
            success: false,
            msg: 'Error transaction',
            code: 500
        });
        error = e
    }
    return [transaction, error]
}
