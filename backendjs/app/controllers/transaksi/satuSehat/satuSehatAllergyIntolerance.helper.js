import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { NotFoundError } from "../../../utils/errors";
import { generateSatuSehat } from "./satuSehat.controller";
import { wrapperSatuSehat } from "../../../utils/satusehatutils";
import { qGetRiwayatAlergiByNorecreferenci,qGetRiwayatAlergi,qGetRiwayatAlergiObat } from "../../../queries/satuSehat/satuSehatAllergyIntolerance.queries";

const hupsertAllergyRiwayatAlergi = wrapperSatuSehat(
    async (logger, ssClient ,params) => {
        await db.sequelize.transaction(async(transaction) => {
            const listriwayatPenyakit = (await pool.query(qGetRiwayatAlergiByNorecreferenci, [params]))
            const upsertRiwayatPenyakit = async (riwayat) => {
                try{
                    const norec = riwayat.norec
                    let riwayatPenyakit 
                    if(riwayat.objectjenisalergifk===2){
                        riwayatPenyakit = (await pool.query(qGetRiwayatAlergiObat, [norec])).rows[0]
                    }else{
                        riwayatPenyakit = (await pool.query(qGetRiwayatAlergi, [norec])).rows[0]
                    }
                    if(!riwayatPenyakit) throw new NotFoundError("Riwayat alergi tidak ditemukan")
                    const riwayatSS = await tempRiwayatPenyakit(riwayatPenyakit)
                    const response = await ssClient.post("/AllergyIntolerance", riwayatSS)
                    const riwayatModel = await db.t_riwayatalergi.findByPk(norec, {
                        transaction: transaction
                    })
                    await riwayatModel.update({
                        ihs_id: response.data.id
                    }, {
                        transaction: transaction
                    })
                } catch(e){
                    logger.error(e)
                }
            }
            await Promise.all(listriwayatPenyakit.rows.map(upsertRiwayatPenyakit))
        })
    }
)

export{
    hupsertAllergyRiwayatAlergi
}

const tempRiwayatPenyakit = async (reqTemp) => {
    let tempIdNadi=''
    if(reqTemp.ihs_riwayatalergi!==null){
        tempIdNadi = {'id':reqTemp.ihs_riwayatalergi}
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
            reference: "Practitioner/"+reqTemp.ihs_iddokter
        },
        ...tempIdNadi
    };
    return allergyIntoleranceData
}