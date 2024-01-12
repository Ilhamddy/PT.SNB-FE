import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { NotFoundError } from "../../../utils/errors";
import { generateSatuSehat } from "./satuSehat.controller";
import { wrapperSatuSehat } from "../../../utils/satusehatutils";
import queries from "../../../queries/satuSehat/satuSehat.queries";
import { qSkriningIGDByNorecDp } from "../../../queries/satuSehat/satuSehatObservation.queries";

const hUpsertSkriningBatuk = wrapperSatuSehat(
    async (logger, ssClient, params,norec) => {
        await db.sequelize.transaction(async(transaction) => {
            const profilePasien = (await pool.query(queries.qGetDataPasienByNorecDpTrm, [params])).rows[0];
            const dataSkrining = (await pool.query(qSkriningIGDByNorecDp, [norec])).rows[0];
            const temp = {
                ihs_encounter: profilePasien.ihs_dp,
                ihs_pasien: profilePasien.ihs_pasien,
                namapasien: profilePasien.namapasien,
                noregistrasi: profilePasien.noregistrasi,
                tglpulang: profilePasien.tglpulang,
                ihs_unit: profilePasien.ihs_unit,
                tglditerimapoli: profilePasien.tglditerimapoli,
                ihs_dokter: profilePasien.ihs_dpjp,
                namadokter: profilePasien.namadokter,
                tglregistrasi_ihs: profilePasien.tglregistrasi_ihs,
                tglinput: dataSkrining.tglinput_ihs,
                batuk_demam: dataSkrining.batuk_demam,
                batuk_keringat: dataSkrining.batuk_keringat,
                batuk_daerahwabah: dataSkrining.batuk_daerahwabah,
                batuk_obatjangkapanjang: dataSkrining.batuk_obatjangkapanjang,
                batuk_bbturun: dataSkrining.batuk_bbturun,
                ihs_id: dataSkrining.ihs_batuk
            };
                try{
                    const norec = dataSkrining.norec
                    
                    if(!dataSkrining) throw new NotFoundError("Skrining tidak ditemukan")
                    const riwayatSS = await hCreateSkriningBatuk(temp)
                    let response
                    if(dataSkrining.ihs_batuk){
                        response = await ssClient.put(`/QuestionnaireResponse/${dataSkrining.ihs_batuk}`, riwayatSS)} else {
                        response = await ssClient.post("/QuestionnaireResponse", riwayatSS)
                        const riwayatModel = await db.t_skriningigd.findByPk(norec, {
                            transaction: transaction
                        })
                        await riwayatModel.update({
                            ihs_batuk: response.data.id
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
const hUpsertSkriningGizi = wrapperSatuSehat(
    async (logger, ssClient, params,norec) => {
        await db.sequelize.transaction(async(transaction) => {
            const profilePasien = (await pool.query(queries.qGetDataPasienByNorecDpTrm, [params])).rows[0];
            const dataSkrining = (await pool.query(qSkriningIGDByNorecDp, [norec])).rows[0];
            const temp = {
                ihs_encounter: profilePasien.ihs_dp,
                ihs_pasien: profilePasien.ihs_pasien,
                namapasien: profilePasien.namapasien,
                noregistrasi: profilePasien.noregistrasi,
                tglpulang: profilePasien.tglpulang,
                ihs_unit: profilePasien.ihs_unit,
                tglditerimapoli: profilePasien.tglditerimapoli,
                ihs_dokter: profilePasien.ihs_dpjp,
                namadokter: profilePasien.namadokter,
                tglregistrasi_ihs: profilePasien.tglregistrasi_ihs,
                tglinput: dataSkrining.tglinput_ihs,
                gizi_bbturun: dataSkrining.gizi_bbturun,
                gizi_nafsumakan: dataSkrining.gizi_nafsumakan,
                gizi_gejala: dataSkrining.gizi_gejala,
                gizi_komorbid: dataSkrining.gizi_komorbid,
                gizi_fungsional: dataSkrining.gizi_fungsional,
                ihs_id: dataSkrining.ihs_gizi
            };
                try{
                    const norec = dataSkrining.norec
                    
                    if(!dataSkrining) throw new NotFoundError("Skrining tidak ditemukan")
                    const riwayatSS = await hCreateSkriningGizi(temp)
                    let response
                    if(dataSkrining.ihs_gizi){
                        response = await ssClient.put(`/QuestionnaireResponse/${dataSkrining.ihs_gizi}`, riwayatSS)} else {
                        response = await ssClient.post("/QuestionnaireResponse", riwayatSS)
                        const riwayatModel = await db.t_skriningigd.findByPk(norec, {
                            transaction: transaction
                        })
                        await riwayatModel.update({
                            ihs_gizi: response.data.id
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

export {
    hUpsertSkriningBatuk,hUpsertSkriningGizi
}

const hCreateSkriningBatuk = async (reqTemp) => {
    let tempIdNadi=''
    if(reqTemp.ihs_id!==null){
        tempIdNadi = {'id':reqTemp.ihs_id}
    }
    const allergyIntoleranceData = {
        "resourceType": "QuestionnaireResponse",
        "questionnaire": "https://fhir.kemkes.go.id/Questionnaire/Q0008",
        "status": "completed",
        "subject": {
            "reference": "Patient/"+reqTemp.ihs_pasien,
            "display": reqTemp.namapasien
        },
        "encounter": {
            "reference": "Encounter/"+reqTemp.ihs_encounter
        },
        "authored": reqTemp.tglinput,
        "author": {
            "reference": "Practitioner/"+reqTemp.ihs_dokter
        },
        "source": {
            "reference": "Patient/"+reqTemp.ihs_pasien,
            "display": reqTemp.namapasien
        },
        "item": [
            {
                "linkId": "1",
                "text": "Batuk",
                "item": [
                    {
                        "linkId": "1.1",
                        "text": "Apakah memiliki riwayat demam?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.batuk_demam
                            }
                        ]
                    },
                    {
                        "linkId": "1.2",
                        "text": "Apakah berkeringat pada malam hari walaupun tanpa aktivitas?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.batuk_keringat
                            }
                        ]
                    },
                    {
                        "linkId": "1.3",
                        "text": "Apakah memiliki riwayat berpergian dari daerah wabah?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.batuk_daerahwabah
                            }
                        ]
                    },
                    {
                        "linkId": "1.4",
                        "text": "Apakah memiliki riwayat pemakaian obat jangka panjang?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.batuk_obatjangkapanjang
                            }
                        ]
                    },
                    {
                        "linkId": "1.5",
                        "text": "Apakah memiliki riwayat BB turun tanpa sebab yang diketahui?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.batuk_bbturun
                            }
                        ]
                    }
                ]
            }
        ],
        ...tempIdNadi
    }
    return allergyIntoleranceData
}
const hCreateSkriningGizi = async (reqTemp) => {
    let tempIdNadi=''
    if(reqTemp.ihs_id!==null){
        tempIdNadi = {'id':reqTemp.ihs_id}
    }
    const allergyIntoleranceData = {
        "resourceType": "QuestionnaireResponse",
        "questionnaire": "https://fhir.kemkes.go.id/Questionnaire/Q0008",
        "status": "completed",
        "subject": {
            "reference": "Patient/"+reqTemp.ihs_pasien,
            "display": reqTemp.namapasien
        },
        "encounter": {
            "reference": "Encounter/"+reqTemp.ihs_encounter
        },
        "authored": reqTemp.tglinput,
        "author": {
            "reference": "Practitioner/"+reqTemp.ihs_dokter
        },
        "source": {
            "reference": "Patient/"+reqTemp.ihs_pasien,
            "display": reqTemp.namapasien
        },
        "item": [
            {
                "linkId": "2",
                "text": "Gizi",
                "item": [
                    {
                        "linkId": "2.1",
                        "text": "Apakah memiliki riwayat demam?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.gizi_bbturun
                            }
                        ]
                    },
                    {
                        "linkId": "2.2",
                        "text": "Apakah berkeringat pada malam hari walaupun tanpa aktivitas?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.gizi_nafsumakan
                            }
                        ]
                    },
                    {
                        "linkId": "2.3",
                        "text": "Apakah memiliki riwayat berpergian dari daerah wabah?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.gizi_gejala
                            }
                        ]
                    },
                    {
                        "linkId": "2.4",
                        "text": "Apakah memiliki riwayat pemakaian obat jangka panjang?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.gizi_komorbid
                            }
                        ]
                    },
                    {
                        "linkId": "2.5",
                        "text": "Apakah memiliki riwayat BB turun tanpa sebab yang diketahui?",
                        "answer": [
                            {
                                "valueBoolean": reqTemp.gizi_fungsional
                            }
                        ]
                    }
                ]
            }
        ],
        ...tempIdNadi
    }
    return allergyIntoleranceData
}