import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import queries from "../../../queries/satuSehat/satuSehatMedication.queries";
import { generateSatuSehat } from "./satuSehat.controller";
import { createLogger } from "../../../utils/logger";
import { wrapperSatuSehat } from "./satuSehat.helper";

const hUpsertObatSatuSehat = wrapperSatuSehat(
    async (logger, idkfa) => {
        const dataResp = await db.sequelize.transaction(async (transaction) => {
            const {medication, obat} = await hCreateMedication(idkfa)
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
        console.log(dataResp)
    }
)

const hUpsertOrderObatSatuSehat = wrapperSatuSehat(
    async (logger, createdResep, createdDetailOrder) => {
        await db.sequelize.transaction(async (transaction) => {
            
        });
        
        const tempres = {
        
        };
    }
)

export {
    hUpsertObatSatuSehat,
    hUpsertOrderObatSatuSehat
}

const hCreateMedication = async (idkfa) => {
    if(!idkfa) throw new BadRequestError("Id ihs kosong")
    const obat = (await pool.query(queries.qGetKFA, [idkfa])).rows[0]
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

const hCreateMedicationRequest = ({
    norecorder,
    norecdetailorder,
    ihs_obat,
    namaobat,
    ihs_pasien,
    ihs_encounter,
    namapasien,
    ihs_dokter,
    namadokter,
    kodeicdx,
    namaicdx,
    nameSigna, 
    frekuensiSigna, 
    period,
    periodUnit, 

}) => {
    if(!norecorder) throw new BadRequestError("norecorder error")
    let identifier = [
        {
            "system": "http://sys-ids.kemkes.go.id/prescription/753587cb-d598-4923-8843-29c7ed4ab797",
            "use": "official",
            "value": norecorder
        },
        {
            "system": "http://sys-ids.kemkes.go.id/prescription-item/753587cb-d598-4923-8843-29c7ed4ab797",
            "use": "official",
            "value": norecdetailorder
        }
    ]
    if(!norecdetailorder) {
        identifier.splice(1, 1)
    }

    const medicationReference = ihs_obat && namaobat && norecdetailorder ? {
        "reference": `Medication/${ihs_obat}`,
        "display": namaobat
    } : undefined

    const medicationRequest = {
        "resourceType": "MedicationRequest",
        "identifier": identifier,
        "status": "completed",
        "intent": "order",
        "category": [
            {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/medicationrequest-category",
                        "code": "outpatient",
                        "display": "Outpatient"
                    }
                ]
            }
        ],
        "priority": "routine",
        "medicationReference": medicationReference,
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namapasien
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "authoredOn": new Date().toISOString(),
        "requester": {
            "reference": `Practitioner/${ihs_dokter}`,
            "display": namadokter
        },
        "reasonCode": [
            {
                "coding": [
                    {
                        "system": "http://hl7.org/fhir/sid/icd-10",
                        "code": kodeicdx,
                        "display": namaicdx
                    }
                ]
            }
        ],
        "dosageInstruction": [
            {
                "sequence": 1,
                "text": nameSigna,
                "additionalInstruction": [
                    {
                        "text": "Diminum setiap hari"
                    }
                ],
                "patientInstruction": "4 tablet perhari, diminum setiap hari tanpa jeda sampai prose pengobatan berakhir",
                "timing": {
                    "repeat": {
                        "frequency": frekuensiSigna,
                        "period": period,
                        "periodUnit": periodUnit
                    }
                },
                "doseAndRate": [
                    {
                        "type": {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                                    "code": "ordered",
                                    "display": "Ordered"
                                }
                            ]
                        },
                        "doseQuantity": {
                            "value": 4,
                            "unit": "TAB",
                            "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                            "code": "TAB"
                        }
                    }
                ]
            }
        ],
    }
    return medicationRequest
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

