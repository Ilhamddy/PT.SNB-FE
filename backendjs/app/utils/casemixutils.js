import { createLogger } from "./logger"

/**
 * @template T
 * @template U
 * @param {(
 *  logger: ReturnType<typeof createLogger>, 
 * ) => U} callback 
 */
export const wrapperCasemix = (callback) => {

    /**
     * @param {T} rest
     * @returns {U}
     */
    const fnReturn = async (...rest) => {
        const logger = createLogger("CASEMIX")
        try{
            
            const returned = await callback(logger, ...rest)
            logger.info("Sukses transaksi casemix")
            logger.print()
            return returned
        } catch (error) {
            logger.error(error)
            logger.print()
        }
    }
    return fnReturn
}