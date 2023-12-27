import { createLogger } from "./logger"

/**
 * @template T
 * @template U
 * @param {(logger: any, ...t: T) => U} callback 
 */
export const wrapperSatuSehat = (callback) => {

    /**
     * @param {T} rest
     * @returns {U}
     */
    const fnReturn = async (...rest) => {
        const logger = createLogger("SATU SEHAT")
        try{
            const returned = await callback(logger, ...rest)
            return returned
        } catch (error) {
            logger.error(error)
        }
        logger.print()
    }
    return fnReturn

}


// TODO: hapus saja nanti, ini sementara saja
// const optionalObat = {
//     "manufacturer": {
//         "reference": "Organization/900001"
//     },
//     "form": {
//         "coding": [
//             {
//                 "system": "http://terminology.kemkes.go.id/CodeSystem/medication-form",
//                 "code": "BS023",
//                 "display": "Kaplet Salut Selaput"
//             }
//         ]
//     },
// }

// const optionalOrderObat = {
//     "courseOfTherapyType": {
//         "coding": [
//             {
//                 "system": "http://terminology.hl7.org/CodeSystem/medicationrequest-course-of-therapy",
//                 "code": "continuous",
//                 "display": "Continuing long term therapy"
//             }
//         ]
//     },
//     "dispenseRequest": {
//         "dispenseInterval": {
//             "value": 1,
//             "unit": "days",
//             "system": "http://unitsofmeasure.org",
//             "code": "d"
//         },
//         "validityPeriod": {
//             "start": "2022-01-01",
//             "end": "2022-01-30"
//         },
//         "numberOfRepeatsAllowed": 0,
//         "quantity": {
//             "value": 120,
//             "unit": "TAB",
//             "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
//             "code": "TAB"
//         },
//         "expectedSupplyDuration": {
//             "value": 30,
//             "unit": "days",
//             "system": "http://unitsofmeasure.org",
//             "code": "d"
//         },
//         "performer": {
//             "reference": "Organization/10000004"
//         }
//     },

// }
