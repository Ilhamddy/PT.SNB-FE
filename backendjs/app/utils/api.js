
// /**
//  * @template T
//  * @template U
//  * @param {(
//  *  logger: ReturnType<typeof createLogger>, 
//  *  req: import("axios").AxiosRequestConfig,
//  *  res: import("axios").AxiosResponse,
//  * 
//  * ) => U} callback 
//  */
// export const wrapperApi = (callback) => {

//     /**
//      * @param {T} rest
//      * @returns {U}
//      */
//     const fnReturn = async (req, res, ...rest) => {
//         const logger = createLogger("SATU SEHAT")
//         try{
//             // logger.info("PARAMS: " + JSON.stringify(rest, null, 2))
            
//             const returned = await callback(logger, ssClient, ...rest)
//             logger.info("Sukses transaksi satu sehat")
//             logger.print()
//             return returned
//         } catch (error) {
//             logger.error(error)
//             logger.print()
//         }
//     }
//     return fnReturn

// }