import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { NotFoundError } from "../../../utils/errors";
import { generateSatuSehat } from "./satuSehat.controller";
import { wrapperSatuSehat } from "../../../utils/satusehatutils";
import { qGetRiwayatPenyakit,qGetRiwayatPenyakitByNorecreferenci } from "../../../queries/satuSehat/satuSehatCondition.queries";

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

export{
    hupsertConditionRiwayatPenyakit
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