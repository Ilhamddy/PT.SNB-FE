import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { NotFoundError } from "../../../utils/errors";
import { generateSatuSehat } from "./satuSehat.controller";
import { wrapperSatuSehat } from "../../../utils/satusehatutils";
import { qGetRiwayatPenyakit,qGetRiwayatPenyakitByNorecreferenci } from "../../../queries/satuSehat/satuSehatCondition.queries";
import queries from "../../../queries/satuSehat/satuSehat.queries";

const hupsertConditionRiwayatPenyakit = wrapperSatuSehat(
    async (logger, ssClient,params) => {
        await db.sequelize.transaction(async(transaction) => {
            const listriwayatPenyakit = (await pool.query(qGetRiwayatPenyakitByNorecreferenci, [params]))
            const upsertRiwayatPenyakit = async (riwayat) => {
                try{
                    const norec = riwayat.norec
                    const riwayatPenyakit = (await pool.query(qGetRiwayatPenyakit, [norec])).rows[0]
                    if(!riwayatPenyakit) throw new NotFoundError("Riwayt obat tidak ditemukan")
                    const riwayatSS = await tempRiwayatPenyakit(riwayatPenyakit)
                    let response
                    if(riwayatPenyakit.ihs_riwayatpenyakit){
                        response = await ssClient.put(`/Condition/${riwayatPenyakit.ihs_riwayatpenyakit}`, riwayatSS)
                    }else{
                        response = await ssClient.post("/Condition", riwayatSS)
                        const riwayatModel = await db.t_riwayatpenyakit.findByPk(norec, {
                            transaction: transaction
                        })
                        await riwayatModel.update({
                            ihs_id: response.data.id
                        }, {
                            transaction: transaction
                        })
                    }
                } catch(e){
                    logger.error(e)
                }
            }
            await Promise.all(listriwayatPenyakit.rows.map(upsertRiwayatPenyakit))
        })
    }
)

const hupsertConditionDiagnosa = wrapperSatuSehat(
    async (logger, ssClient, params) => {
        await db.sequelize.transaction(async(transaction) => {
            const profilePasien = (await pool.query(queries.qGetDataPasienByNorecDpTrm, [params.norecdp])).rows[0];
            let temp ={
                codestatus:params.codestatus,
                displaystatus:params.displaystatus,
                ihs_diagnosa:params.ihs_diagnosa,
                codekodediagnosa:params.codekodediagnosa,
                namakodediagnosa:params.namakodediagnosa,
                ihs_encounter:profilePasien.ihs_dp,
                ihs_pasien:profilePasien.ihs_pasien,
                namapasien:profilePasien.namapasien
            }
            try{
                const norec = params.norec
                
                const riwayatSS = await tempConditionPrimary(temp)
                let response
                if(params.ihs_diagnosa){
                    response = await ssClient.put(`/Condition/${params.ihs_diagnosa}`, riwayatSS)} else {
                    response = await ssClient.post("/Condition", riwayatSS)
                    const riwayatModel = await db.t_diagnosapasien.findByPk(norec, {
                        transaction: transaction
                    })
                    await riwayatModel.update({
                        ihs_id: response.data.id
                    }, {
                        transaction: transaction
                    })
                }
            } catch(e){
                logger.error(e)
            }
        })
    }
)

export{
    hupsertConditionRiwayatPenyakit,
    hupsertConditionDiagnosa
}

const tempRiwayatPenyakit = async (reqTemp) => {
    let tempIdNadi=''
    if(reqTemp.ihs_riwayatpenyakit!==null){
        tempIdNadi = {'id':reqTemp.ihs_riwayatpenyakit}
    }
    const encounterData = {
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
                    "system": reqTemp.codesystem,
                    "code": reqTemp.code,
                    "display": reqTemp.display
                }
            ]
        },
        "subject": {
            "reference": "Patient/"+reqTemp.ihs_pasien,
            "display": reqTemp.namapasien
        },
        "encounter": {
            "reference": "Encounter/"+reqTemp.ihs_encounter,
            // "display": "Kunjungan Diana Smith tanggal 4 Juli 2023"
        },
        ...tempIdNadi
    }
    
                return encounterData
}
async function tempConditionPrimary(reqTemp) {
    let conditionData = {
        resourceType: "Condition",
        clinicalStatus: {
            coding: [
                {
                    system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                    code: reqTemp.codestatus,
                    display: reqTemp.displaystatus
                }
            ]
        },
        category: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/condition-category",
                        code: "encounter-diagnosis",
                        display: "Encounter Diagnosis"
                    }
                ]
            }
        ],
        code: {
            coding: [
                {
                    system: "http://hl7.org/fhir/sid/icd-10",
                    code: reqTemp.codekodediagnosa,
                    display: reqTemp.namakodediagnosa
                }
            ]
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_pasien,
            display: reqTemp.namapasien
        },
        encounter: {
            reference: "Encounter/"+reqTemp.ihs_encounter
        },
        // onsetDateTime: currentDate,
        // recordedDate: currentDate
    };
    if(reqTemp.codestatus!=='active'){
        conditionData = {
            resourceType: "Condition",
            id: reqTemp.ihs_diagnosa,
            clinicalStatus: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                        code: reqTemp.codestatus,
                        display: reqTemp.displaystatus
                    }
                ]
            },
            category: [
                {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/condition-category",
                            code: "encounter-diagnosis",
                            display: "Encounter Diagnosis"
                        }
                    ]
                }
            ],
            code: {
                coding: [
                    {
                        system: "http://hl7.org/fhir/sid/icd-10",
                        code: reqTemp.codekodediagnosa,
                        display: reqTemp.namakodediagnosa
                    }
                ]
            },
            subject: {
                reference: "Patient/"+reqTemp.ihs_pasien,
                display: reqTemp.namapasien
            },
            encounter: {
                reference: "Encounter/"+reqTemp.ihs_encounter
            }
        };
    }
                return conditionData
}