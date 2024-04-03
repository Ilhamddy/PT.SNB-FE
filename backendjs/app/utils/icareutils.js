import { createBpjsIcareInstance, decryptBPJS } from "../controllers/transaksi/bridging/bpjs.controller"
import { createLogger } from "./logger"

/**
 * contoh: 
 * const uploadBPJS = wrapperBpjsIcare(async (logger, bpjsClient, decrypt) => {
 *   const dataEnc = await bpjsClient.post("/api/data")
 *   const data = decrypt(dataEnc)
 *   return data
 * })
 * @template T
 * @template U
 * @param {(
 *  logger: ReturnType<typeof createLogger>, 
 *  bpjsClient: Awaited<import("axios").AxiosInstance>, 
 *  decrypt: (data: any) => any
 *  ...t: T
 * ) => U} callback 
 * @param {boolean} isErrorHandling
 */
export const wrapperBPJSIcare = (callback, isHandleError = false) => {

    /**
     * @param {T} rest
     * @returns {U}
     */
    const fnReturn = async (...rest) => {
        const logger = createLogger("BPJS")
        try{
            const [bpjsClient, key] = await createBpjsIcareInstance(logger)
            if(!bpjsClient) return null
            const decrypt = (data) => decryptBPJS(data, key)

            logger.info("PARAMS: ")
            rest.forEach(a => {
                try{
                    logger.info(JSON.stringify(a || {}, null, 2))
                }catch(error){
                    logger.error("Error stringify: ")
                    logger.error(a)
                }
            })
            
            const returned = await callback(logger, bpjsClient, decrypt, ...rest)
            logger.info("Sukses transaksi BPJS")
            logger.print()
            return returned
        } catch (error) {
            logger.error(error)
            logger.error("Data error")
            logger.error(error?.response?.data || "Tambahkan log data")
            logger.error(error.response?.data?.response)
            let errorResponse = ""
            try{
                errorResponse = "\nDetail: " + JSON.stringify(error.response?.data?.response || "")
            }catch(e){
                errorResponse = ""
            }
            let messageError = error.response?.data?.response?.message 
            ? ("Error BPJS: " + error.response?.data?.response?.message) 
            : error.response?.data?.metaData?.message 
            ? ("Error BPJS: " + error.response?.data?.metaData?.message + errorResponse) 
            : ("" + error.message)
            error.message = messageError
            logger.print()
            if(!isHandleError){
                throw error
            }
        } 
    }
    return fnReturn
}

export const statusBPJS = {
    NOTFOUND: "NOTFOUND",
    FOUNDINACTIVE: "FOUNDINACTIVE",
    ACTIVE: "ACTIVE"
}



export default wrapperBPJSIcare