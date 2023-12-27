import { createLogger } from "../../../utils/logger"

const optionalObat = {
    "manufacturer": {
        "reference": "Organization/900001"
    },
    "form": {
        "coding": [
            {
                "system": "http://terminology.kemkes.go.id/CodeSystem/medication-form",
                "code": "BS023",
                "display": "Kaplet Salut Selaput"
            }
        ]
    },
}

const optionalOrderObat = {
    "courseOfTherapyType": {
        "coding": [
            {
                "system": "http://terminology.hl7.org/CodeSystem/medicationrequest-course-of-therapy",
                "code": "continuous",
                "display": "Continuing long term therapy"
            }
        ]
    },
    "dispenseRequest": {
        "dispenseInterval": {
            "value": 1,
            "unit": "days",
            "system": "http://unitsofmeasure.org",
            "code": "d"
        },
        "validityPeriod": {
            "start": "2022-01-01",
            "end": "2022-01-30"
        },
        "numberOfRepeatsAllowed": 0,
        "quantity": {
            "value": 120,
            "unit": "TAB",
            "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
            "code": "TAB"
        },
        "expectedSupplyDuration": {
            "value": 30,
            "unit": "days",
            "system": "http://unitsofmeasure.org",
            "code": "d"
        },
        "performer": {
            "reference": "Organization/10000004"
        }
    },

}

export const wrapperSatuSehat = (callback) => async (...rest) => {
    const logger = createLogger("SATU SEHAT")
    try{
        await callback(logger, ...rest)
        logger.print()
    } catch (error) {
        logger.error(error)
    }

}

