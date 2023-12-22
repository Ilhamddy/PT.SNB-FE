import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import queries from "../../../queries/satuSehat/satuSehatMedication.queries";
import { generateSatuSehat } from "./satuSehat.controller";

export const hUpsertObatSatuSehat = async (req, res) => {
    const logger = res.locals.logger
    try{
        const dataResp = await db.sequelize.transaction(async (transaction) => {
            const {medication, obat} = await hCreateMedication(req, res)
            const ssClient = await generateSatuSehat()
            let response
            if(obat.idihs){
                const dataBefore = await ssClient.get(`/Medication/${obat.idihs}`)
                response = await ssClient.put(`/Medication/${obat.idihs}`, medication)
            } else {
                response = await ssClient.post("/Medication", medication)
            }
            const obatUpdate = await db.m_produk.findByPk(obat.idproduk, {
                transaction: transaction
            })
            await obatUpdate.update({
                ihs_id: response.data.id
            }, {
                transaction: transaction
            })
            return response.data
        })
        return dataResp
    } catch(error) {
        logger.error("Error satu sehat")
        logger.error(error)
        return null
    }

}

const hCreateMedication = async (req, res) => {
    const reqBody = req.body
    if(!reqBody.idkfa) throw new BadRequestError("Id ihs kosong")
    const obat = (await pool.query(queries.qGetKFA, [reqBody.idkfa])).rows[0]
    if(!obat) throw new NotFoundError("Obat tidak ditemukan")
    const mappedIngredient = obat.isibahan.map((kfa) => hCreateIngredient({
        bahanCode: kfa.bahancode,
        bahanDisplay: kfa.bahandisplay,
        numerator: kfa.kekuatan,
        numeratorCode:  kfa.satuan,
        denominator: kfa.denominator,
        denomCode: kfa.bahansatuandisesuaikan,
        satuanCodeSystem: kfa.satuancodesystem,
        bahanCodeSystem: kfa.bahancodesystem,
    }))
    const medication = {
        "resourceType": "Medication",
        "id": obat.idihs || undefined,
        "meta": {
            "profile": [
                "https://fhir.kemkes.go.id/r4/StructureDefinition/Medication"
            ]
        },
        "identifier": [
            {
                "system": "http://sys-ids.kemkes.go.id/medication/753587cb-d598-4923-8843-29c7ed4ab797",
                "use": "official",
                "value": obat.idproduk.toString()
            }
        ],
        "code": {
            "coding": [
                {
                    "system": "http://sys-ids.kemkes.go.id/kfa",
                    "code": obat.idkfaobat.toString(),
                    "display": obat.display
                }
            ]
        },
        "status": "active",
        // TODO: tambahkan manufakturer
        "manufacturer": {
            "reference": "Organization/900001"
        },
        // "form": {
        //     "coding": [
        //         {
        //             "system": "http://terminology.kemkes.go.id/CodeSystem/medication-form",
        //             "code": "BS023",
        //             "display": "Kaplet Salut Selaput"
        //         }
        //     ]
        // },
        "ingredient": mappedIngredient,
        "extension": [
            {
                "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType",
                "valueCodeableConcept": {
                    "coding": [
                        {
                            "system": "http://terminology.kemkes.go.id/CodeSystem/medication-type",
                            "code": "NC",
                            "display": "Non-compound"
                        }
                    ]
                }
            }
        ]
    }

    return {
        obat, 
        medication
    }
}


const hCreateIngredient = ({
    bahanCode, 
    bahanDisplay, 
    numerator, 
    numeratorCode, 
    denominator, 
    denomCode,
    satuanCodeSystem,
    bahanCodeSystem
}) => ({
    "itemCodeableConcept": {
        "coding": [
            {
                "system": "http://sys-ids.kemkes.go.id/kfa",
                "code": bahanCode,
                "display": bahanDisplay
            }
        ]
    },
    "isActive": denominator !== 0 && denominator !== null,
    "strength": {
        "numerator": {
            "value": numerator,
            "system": satuanCodeSystem,
            "code": numeratorCode
        },
        "denominator": {
            "value": denominator,
            "system": bahanCodeSystem,
            "code": denomCode
        }
    }
})
