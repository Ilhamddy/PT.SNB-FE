import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import queries from "../../../queries/satuSehat/satuSehat.queries";
import { generateSatuSehat } from "./satuSehat.controller";
import { wrapperSatuSehat } from "../../../utils/satusehatutils";

async function getCurrentDateAsync() {
    const currentDate = new Date();
    const utcDateString = currentDate.toLocaleString('en-US', { timeZone: 'UTC' });
    return new Date(utcDateString);
  }
  
const hUpsertTriageIGD = wrapperSatuSehat(
    async (logger, norectriage, norecdp) => {
        await db.sequelize.transaction(async (transaction) => {
            const pasienigd = await db.t_pasienigd.findByPk(norectriage, {
                transaction: transaction
            })
            
            const ssClient = await generateSatuSehat()

            if(!pasienigd) throw new NotFoundError(`Tidak ditemukan order: ${norectriage}`)
            const norec = norectriage
            const pasien = (await pool.query(queries.qGetPasienIgd, [
                norec
            ])).rows[0]
            if(!pasien) NotFoundError(`Triage pemeriksaan tidak ditemukan: ${norec}`)
            const pasienDp = (await pool.query(queries.qGetDataPasienByNorecDp, [
                norecdp
            ])).rows[0]
            if(!pasien) NotFoundError(`Triage pemeriksaan tidak ditemukan: ${norec}`)
            let medReqOrder = hCreateSaranaKedatangan({
                ihs_pasien: pasienDp.ihs_pasien,
                ihs_encounter: pasienDp.ihs_dp,
                namapasien: pasienDp.namapasien,
                ihs_dokter: pasienDp.ihs_dpjp,
                namadokter: pasienDp.namadokter,
                codetransportasi: pasien.codetransportasi,
                displaytransportasi:pasien.displaytransportasi,
                ihs_transportasikedatangan:pasienigd.ihs_transportasikedatangan,
                tglinput:pasien.tglinput
            })
            let response
            if(pasienigd.ihs_transportasikedatangan){
                response = ssClient.put(`/Observation/${pasienigd.ihs_transportasikedatangan}`, medReqOrder)
            } else {
                response = ssClient.post("/Observation", medReqOrder)
                await pasienigd.update({
                    ihs_transportasikedatangan: response.data.id
                }, {
                    transaction: transaction
                })
            }
        });
    }
)

const hCreateSaranaKedatangan = async (ihs_pasien,
    ihs_encounter,
    namapasien,
    ihs_dokter,
    namadokter,
    codetransportasi,
    displaytransportasi,
    ihs_transportasikedatangan,
    tglinput) => {
   
    const medication = {
        "resourceType": "Observation",
        "id": ihs_transportasikedatangan || undefined,
        "status": "final",
        "category": [
            {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                        "code": "survey",
                        "display": "Survey"
                    }
                ]
            }
        ],
        "code": {
            "coding": [
                {
                    "system": "http://loinc.org",
                    "code": "74286-6",
                    "display": "Transport mode to hospital"
                }
            ]
        },
        "subject": {
            "reference": "Patient/"+ihs_pasien,
            "display": namapasien
        },
        "encounter": {
            "reference": "Encounter/"+ihs_encounter
        },
        "effectiveDateTime": tglinput,
        "issued": tglinput,
        "performer": [
            {
                "reference": "Practitioner/"+ihs_dokter
            }
        ],
        "valueCodeableConcept": {
            "coding": [
                {
                    "system": "http://snomed.info/sct",
                    "code": codetransportasi,
                    "display": displaytransportasi
                }
            ]
        }
    }

    return {
        medication
    }
}

export {
    hUpsertTriageIGD
}