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
            if(pasien.codetransportasi!==null){
                let medReqOrder = await hCreateSaranaKedatangan({
                    ihs_pasien: pasienDp.ihs_pasien,
                    ihs_encounter: pasienDp.ihs_dp,
                    namapasien: pasienDp.namapasien,
                    ihs_dokter: pasienDp.ihs_dpjp,
                    namadokter: pasienDp.namadokter,
                    codetransportasi: pasien.codetransportasi,
                    displaytransportasi:pasien.displaytransportasi,
                    codesystemtransportasi:pasien.codesystemtransportasi,
                    ihs_transportasikedatangan:pasien.ihs_transportasikedatangan,
                    tglinput:pasien.tglinput
                })
                let response
                if(pasienigd.ihs_transportasikedatangan){
                    response = await ssClient.put(`/Observation/${pasienigd.ihs_transportasikedatangan}`, medReqOrder)
                } else {
                    response = await ssClient.post("/Observation", medReqOrder)
                    await pasienigd.update({
                        ihs_transportasikedatangan: response.data.id
                    }, {
                        transaction: transaction
                    })
                }
            }
            if(pasien.codekeluhan!==null){
                let medReqOrder = await hCreateKeluhan({
                    ihs_pasien: pasienDp.ihs_pasien,
                    ihs_encounter: pasienDp.ihs_dp,
                    namapasien: pasienDp.namapasien,
                    ihs_dokter: pasienDp.ihs_dpjp,
                    namadokter: pasienDp.namadokter,
                    code: pasien.codekeluhan,
                    display:pasien.displaykeluhan,
                    system:pasien.codesystemkeluhan,
                    ihs_keluhan:pasien.ihs_keluhan,
                    tglinput:pasien.tglinput
                })
                let response
                if(pasienigd.ihs_keluhan){
                    response = await ssClient.put(`/Condition/${pasienigd.ihs_keluhan}`, medReqOrder)
                } else {
                    response = await ssClient.post("/Condition", medReqOrder)
                    await pasienigd.update({
                        ihs_keluhan: response.data.id
                    }, {
                        transaction: transaction
                    })
                }
            }
            if(pasien.codealergimakanan!==null){
                let medReqOrder = await hCreateAlergi({
                    ihs_pasien: pasienDp.ihs_pasien,
                    ihs_encounter: pasienDp.ihs_dp,
                    namapasien: pasienDp.namapasien,
                    ihs_dokter: pasienDp.ihs_dpjp,
                    namadokter: pasienDp.namadokter,
                    code: pasien.codealergimakanan,
                    display:pasien.displayalergimakanan,
                    system:pasien.codesystemalergimakanan,
                    ihs_alergi:pasien.ihs_alergimakanan,
                    tglinput:pasien.tglinput,
                    category:'food'
                })
                let response
                if(pasienigd.ihs_alergimakanan){
                    response = await ssClient.put(`/AllergyIntolerance/${pasienigd.ihs_alergimakanan}`, medReqOrder)
                } else {
                    response = await ssClient.post("/AllergyIntolerance", medReqOrder)
                    await pasienigd.update({
                        ihs_alergimakanan: response.data.id
                    }, {
                        transaction: transaction
                    })
                }
            }
            if(pasien.codealergiobat!==null){
                let medReqOrder = await hCreateAlergi({
                    ihs_pasien: pasienDp.ihs_pasien,
                    ihs_encounter: pasienDp.ihs_dp,
                    namapasien: pasienDp.namapasien,
                    ihs_dokter: pasienDp.ihs_dpjp,
                    namadokter: pasienDp.namadokter,
                    code: pasien.codealergiobat,
                    display:pasien.displayalergiobat,
                    system:'http://sys-ids.kemkes.go.id/kfa',
                    ihs_alergi:pasien.ihs_alergiobat,
                    tglinput:pasien.tglinput,
                    category:'medication'
                })
                let response
                if(pasienigd.ihs_alergiobat){
                    response = await ssClient.put(`/AllergyIntolerance/${pasienigd.ihs_alergiobat}`, medReqOrder)
                } else {
                    response = await ssClient.post("/AllergyIntolerance", medReqOrder)
                    await pasienigd.update({
                        ihs_alergiobat: response.data.id
                    }, {
                        transaction: transaction
                    })
                }
            }
        });
    }
)

export {
    hUpsertTriageIGD
}

const hCreateSaranaKedatangan = async (reqTemp) => {
    let tempIdNadi=''
    if(reqTemp.ihs_transportasikedatangan!==null){
        tempIdNadi = {'id':reqTemp.ihs_transportasikedatangan}
    }
    const medication = {
        "resourceType": "Observation",
        // "id": ihs_transportasikedatangan || undefined,
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
            "reference": "Patient/"+reqTemp.ihs_pasien,
            "display": reqTemp.namapasien
        },
        "encounter": {
            "reference": "Encounter/"+reqTemp.ihs_encounter
        },
        "effectiveDateTime": reqTemp.tglinput,
        "issued": reqTemp.tglinput,
        "performer": [
            {
                "reference": "Practitioner/"+reqTemp.ihs_dokter
            }
        ],
        "valueCodeableConcept": {
            "coding": [
                {
                    "system": reqTemp.codesystemtransportasi,
                    "code": reqTemp.codetransportasi,
                    "display": reqTemp.displaytransportasi
                }
            ]
        },
        ...tempIdNadi
    }

    return medication
}
const hCreateKeluhan = async (reqTemp) => {
    let tempIdNadi=''
    if(reqTemp.ihs_keluhan!==null){
        tempIdNadi = {'id':reqTemp.ihs_keluhan}
    }
    const conditionData = {
        "resourceType": "Condition",
        "clinicalStatus": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                    "code": "active",
                    "display": "Active"
                }
            ]
        },
        "category": [
            {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                        "code": "problem-list-item",
                        "display": "Problem List Item"
                    }
                ]
            }
        ],
        "code": {
            "coding": [
                {
                    "system": reqTemp.system,
                    "code": reqTemp.code,
                    "display": reqTemp.display
                }
            ]
        },
        "recordedDate": reqTemp.tglinput,
        "subject": {
            "reference": "Patient/"+reqTemp.ihs_pasien,
            // "display": "Budi Santoso"
        },
        "encounter": {
            "reference": "Encounter/"+reqTemp.ihs_encounter,
            // "display": "Kunjungan Budi Santoso di tanggakl 14 Juli 2023"
        },
        ...tempIdNadi
    };
        
    return conditionData
}
const hCreateAlergi = async (reqTemp) => {
    let tempIdNadi=''
    if(reqTemp.ihs_alergi!==null){
        tempIdNadi = {'id':reqTemp.ihs_alergi}
    }
    const allergyIntoleranceData = {
        resourceType: "AllergyIntolerance",
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/allergy/10085103",
                use: "official",
                value: "P20240001"
            }
        ],
        clinicalStatus: {
            coding: [
                {
                    system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                    code: "active",
                    display: "Active"
                }
            ]
        },
        verificationStatus: {
            coding: [
                {
                    system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                    code: "confirmed",
                    display: "Confirmed"
                }
            ]
        },
        category: [
            reqTemp.category
        ],
        code: {
            coding: [
                {
                    system: reqTemp.system,
                    code: reqTemp.code,
                    display: reqTemp.display
                }
            ],
            text: reqTemp.display
        },
        patient: {
            reference: "Patient/"+reqTemp.ihs_pasien,
            display: reqTemp.namapasien
        },
        encounter: {
            reference: "Encounter/"+reqTemp.ihs_encounter,
            // display: "Kunjungan Diana Smith tanggal 4 Juli 2023"
        },
        recordedDate:reqTemp.tglinput,
        recorder: {
            reference: "Practitioner/"+reqTemp.ihs_dokter
        },
        ...tempIdNadi
    };
    return allergyIntoleranceData
}