import { statusEnabled } from "../queries/mastertable/globalvariables/globalvariables.queries";

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

/**
 * 
 * @param {string} queryTgl contoh: 'mp.statusenabled'
 * @param {string} q1 contoh: '$1'
 * @returns 
 */
export const checkStatusEnabled = (queryStatusEnabled, q1) => {
    return `
(
        ${q1} = '${statusEnabled.ALL}'
    OR
        ${q1} = ''
    OR 
    (
        ${q1} = '${statusEnabled.TRUE}'
        AND ${queryStatusEnabled} = true
    )
    OR 
    (
        ${q1} = '${statusEnabled.FALSE}'
        AND ${queryStatusEnabled} = false
    )
)`
}

/**
 * 
 * @param {string} queryTgl contoh: 'tdp.tglinput'
 * @param {string} q1 contoh: '$1'
 * @param {string} q2 contoh: '$2'
 * @returns 
 */
export const dateBetweenEmptyString = (queryTgl, q1, q2) => {
    return ` 
        CASE WHEN NULLIF(${q1}, '') IS NULL
            THEN TRUE
            ELSE ${queryTgl} >= ${q1}::TIMESTAMP 
        END
    AND
        CASE WHEN NULLIF(${q2}, '') IS NULL
            THEN TRUE
            ELSE ${queryTgl} <= ${q2}::TIMESTAMP
        END
    `
}

/**
 * 
 * @param {string} queryTgl contoh: 'tdp.tglinput'
 * @param {string} operator contoh: '>='
 * @param {string} q1 contoh: '$1'
 * @returns 
 */
export const dateEmptyString = (queryTgl, operator, q1) => {
    return ` 
        CASE WHEN NULLIF(${q1}, '') IS NULL
            THEN TRUE
            ELSE ${queryTgl} ${operator} ${q1}::TIMESTAMP 
        END
    `
}


/**
 * 
 * @param {string} queryStatusEnabled contoh: 'mp.statusenabled'
 * @returns 
 */
export const getStatusEnabled = (queryStatusEnabled) => {
    return `
(
    CASE WHEN ${queryStatusEnabled} = TRUE
        THEN '${statusEnabled.TRUE}'
        ELSE '${statusEnabled.FALSE}'
    END
)`
}

/**
 * 
 * @param {string} queryInt contoh: 'mu.objectinstalasifk'
 * @param {string} q1 contoh: '$1'
 * @returns 
 */
export const emptyInt = (queryInt, q1) => {
    return ` 
        CASE WHEN NULLIF(${q1}, '')::INT IS NULL
            THEN TRUE
            ELSE ${queryInt} = NULLIF(${q1}, '')::INT 
        END
    `
}

/**
 * 
 * @param {string} querySearch contoh: 'mp.namaproduk'
 * @param {string} q1 contoh: '$1'
 * @returns 
 */
export const emptyIlike = (querySearch, q1) => {
    return ` 
    (
        ${q1} = '' 
        OR 
        ${querySearch} ILIKE '%' || ${q1} || '%'
    )
    `
}

