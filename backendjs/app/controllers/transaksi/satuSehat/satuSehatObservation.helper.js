import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import queries from "../../../queries/satuSehat/satuSehat.queries";
import { generateSatuSehat } from "./satuSehat.controller";
import { wrapperSatuSehat } from "../../../utils/satusehatutils";
import { qGetAsesmen, qGetRiwayatObat,qGetRiwayatObatByNorecReferenci } from "../../../queries/satuSehat/satuSehatObservation.queries";

async function getCurrentDateAsync() {
    const currentDate = new Date();
    const utcDateString = currentDate.toLocaleString('en-US', { timeZone: 'UTC' });
    return new Date(utcDateString);
  }
  
const hUpsertTriageIGD = wrapperSatuSehat(
    async (logger, ssClient, norectriage, norecdp) => {
        await db.sequelize.transaction(async (transaction) => {
            const pasienigd = await db.t_pasienigd.findByPk(norectriage, {
                transaction: transaction
            })
            
            if(!pasienigd) throw new NotFoundError(`Tidak ditemukan order: ${norectriage}`)
            const norec = norectriage
            const pasien = (await pool.query(queries.qGetPasienIgd, [norec])).rows[0]
            if(!pasien) NotFoundError(`Triage pemeriksaan tidak ditemukan: ${norec}`)
            const pasienDp = (await pool.query(queries.qGetDataPasienByNorecDp, [norecdp])).rows[0]
            if(!pasien) NotFoundError(`Triage pemeriksaan tidak ditemukan: ${norec}`)
            if(pasien.codetransportasi!==null){
                let medReqOrder = await hCreateSaranaKedatangan({
                    ihs_pasien: pasienDp.ihs_pasien,ihs_encounter: pasienDp.ihs_dp,namapasien: pasienDp.namapasien,ihs_dokter: pasienDp.ihs_dpjp,namadokter: pasienDp.namadokter,codetransportasi: pasien.codetransportasi,displaytransportasi:pasien.displaytransportasi,codesystemtransportasi:pasien.codesystemtransportasi,ihs_transportasikedatangan:pasien.ihs_transportasikedatangan,tglinput:pasien.tglinput})
                let response
                if(pasienigd.ihs_transportasikedatangan){
                    response = await ssClient.put(`/Observation/${pasienigd.ihs_transportasikedatangan}`, medReqOrder)} else {
                    response = await ssClient.post("/Observation", medReqOrder)
                    await pasienigd.update({
                        ihs_transportasikedatangan: response.data.id
                    }, {
                        transaction: transaction})
                }
            }
            if(pasien.codekeluhan!==null){
                let medReqOrder = await hCreateKeluhan({ihs_pasien: pasienDp.ihs_pasien,ihs_encounter: pasienDp.ihs_dp,namapasien: pasienDp.namapasien,ihs_dokter: pasienDp.ihs_dpjp,namadokter: pasienDp.namadokter,code: pasien.codekeluhan,display:pasien.displaykeluhan,system:pasien.codesystemkeluhan,ihs_keluhan:pasien.ihs_keluhan,tglinput:pasien.tglinput})
                let response
                if(pasienigd.ihs_keluhan){
                    response = await ssClient.put(`/Condition/${pasienigd.ihs_keluhan}`, medReqOrder)} else {
                    response = await ssClient.post("/Condition", medReqOrder)
                    await pasienigd.update({
                        ihs_keluhan: response.data.id
                    }, {
                        transaction: transaction
                    })
                }
            }
            if(pasien.codealergimakanan!==null){
                let medReqOrder = await hCreateAlergi({ihs_pasien: pasienDp.ihs_pasien,ihs_encounter: pasienDp.ihs_dp,namapasien: pasienDp.namapasien,ihs_dokter: pasienDp.ihs_dpjp,namadokter: pasienDp.namadokter,code: pasien.codealergimakanan,display:pasien.displayalergimakanan,system:pasien.codesystemalergimakanan,ihs_alergi:pasien.ihs_alergimakanan,tglinput:pasien.tglinput,category:'food'})
                let response
                if(pasienigd.ihs_alergimakanan){
                    response = await ssClient.put(`/AllergyIntolerance/${pasienigd.ihs_alergimakanan}`, medReqOrder)} else {
                    response = await ssClient.post("/AllergyIntolerance", medReqOrder)
                    await pasienigd.update({
                        ihs_alergimakanan: response.data.id
                    }, {
                        transaction: transaction})
                }
            }
            if(pasien.codealergiobat!==null){
                let medReqOrder = await hCreateAlergi({ihs_pasien: pasienDp.ihs_pasien,ihs_encounter: pasienDp.ihs_dp,namapasien: pasienDp.namapasien,ihs_dokter: pasienDp.ihs_dpjp,namadokter: pasienDp.namadokter,code: pasien.codealergiobat,display:pasien.displayalergiobat,system:'http://sys-ids.kemkes.go.id/kfa',ihs_alergi:pasien.ihs_alergiobat,tglinput:pasien.tglinput,category:'medication'})
                let response
                if(pasienigd.ihs_alergiobat){
                    response = await ssClient.put(`/AllergyIntolerance/${pasienigd.ihs_alergiobat}`, medReqOrder)} else {
                    response = await ssClient.post("/AllergyIntolerance", medReqOrder)
                    await pasienigd.update({
                        ihs_alergiobat: response.data.id
                    }, {
                        transaction: transaction})
                }
            }
            if(pasien.codealergilingkungan!==null){
                let medReqOrder = await hCreateAlergi({ihs_pasien: pasienDp.ihs_pasien,ihs_encounter: pasienDp.ihs_dp,namapasien: pasienDp.namapasien,ihs_dokter: pasienDp.ihs_dpjp,namadokter: pasienDp.namadokter,code: pasien.codealergilingkungan,display:pasien.displayalergilingkungan,system:pasien.codesystemalergilingkungan,ihs_alergi:pasien.ihs_alergilingkungan,tglinput:pasien.tglinput,category:'environment'})
                let response
                if(pasienigd.ihs_alergilingkungan){
                    response = await ssClient.put(`/AllergyIntolerance/${pasienigd.ihs_alergilingkungan}`, medReqOrder)} else {
                    response = await ssClient.post("/AllergyIntolerance", medReqOrder)
                    await pasienigd.update({
                        ihs_alergilingkungan: response.data.id
                    }, {
                        transaction: transaction})
                }
            }
            if(pasien.codekondisipasientiba!==null){
                let medReqOrder = await hCreateKondisiTiba({ihs_pasien: pasienDp.ihs_pasien,ihs_encounter: pasienDp.ihs_dp,namapasien: pasienDp.namapasien,ihs_dokter: pasienDp.ihs_dpjp,namadokter: pasienDp.namadokter,code: pasien.codekondisipasientiba,display:pasien.displaykondisipasientiba,system:pasien.systemkondisipasientiba,ihs_kondisidatang:pasien.ihs_kondisidatang,tglinput:pasien.tglinput})
                let response
                if(pasienigd.ihs_kondisidatang){
                    response = await ssClient.put(`/Observation/${pasienigd.ihs_kondisidatang}`, medReqOrder)} else {
                    response = await ssClient.post("/Observation", medReqOrder)
                    await pasienigd.update({
                        ihs_kondisidatang: response.data.id
                    }, {
                        transaction: transaction})
                }
            }
            let medReqOrderSuratRujukan = await hCreateSuratRujukan({ihs_pasien: pasienDp.ihs_pasien,ihs_encounter: pasienDp.ihs_dp,namapasien: pasienDp.namapasien,ihs_dokter: pasienDp.ihs_dpjp,namadokter: pasienDp.namadokter,ihs_status_rujukan:pasien.ihs_status_rujukan,tglinput:pasien.tglinput,statusrujukan:pasien.status_rujukan})
            let responseSuratRujukan
            if(pasienigd.ihs_status_rujukan){
                responseSuratRujukan = await ssClient.put(`/Observation/${pasienigd.ihs_status_rujukan}`, medReqOrderSuratRujukan)} else {
                responseSuratRujukan = await ssClient.post("/Observation", medReqOrderSuratRujukan)
                await pasienigd.update({
                    ihs_status_rujukan: responseSuratRujukan.data.id
                }, {
                    transaction: transaction})
            }
        });
    }
)

const hUpsertRiwayatPengobatan = wrapperSatuSehat(
    async (logger, ssClient, riwayats) => {
        await db.sequelize.transaction(async(transaction) => {
            const listriwayatObat = (await pool.query(qGetRiwayatObatByNorecReferenci, [riwayats]))
            const upsertRiwayatObat = async (riwayat) => {
                try{
                    const norec = riwayat.norec
                    const riwayatObat = (await pool.query(qGetRiwayatObat, [norec])).rows[0]
                    if(!riwayatObat) throw new NotFoundError("Riwayt obat tidak ditemukan")
                    const riwayatSS = hCreateRiwayatObat({
                        ihs_obat: riwayatObat.ihs_obat,
                        ihs_pasien: riwayatObat.ihs_pasien,
                        namapasien: riwayatObat.namapasien,
                        namasigna: riwayatObat.namasigna,
                        frekuensisigna: riwayatObat.frekuensisigna,
                        periodsigna: riwayatObat.periodsigna,
                        satuansigna: riwayatObat.satuansigna,
                        ihs_encounter: riwayatObat.ihs_encounter
                    })
                    const response = await ssClient.post("/MedicationStatement", riwayatSS)
                    const riwayatModel = await db.t_riwayatobatpasien.findByPk(norec, {
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
            await Promise.all(listriwayatObat.rows.map(upsertRiwayatObat))
        })
    }
)

const hUpsertNyeri = wrapperSatuSehat(
    async (logger, ssClient, norecasesmenawaligd) => {

        const asesmen = (await pool.query(qGetAsesmen, [norecasesmenawaligd])).rows[0]
        if(!asesmen) throw new NotFoundError("Asesmen tidak ditemukan")
        if(!asesmen.isnyeri) return

        const updateAsesmen = async (dataName, data) => {
            let response
            if(!asesmen[dataName]){
                response = await ssClient.post("/Observation", data)
            } else{
                response = await ssClient.put(`/Observation/${asesmen[dataName]}`, data)
            }
            await db.sequelize.transaction(async (transaction) => {
                const updatedData = await db.t_asesmenawaligd.findByPk(norecasesmenawaligd, {
                    transaction
                })
                if(!updatedData) throw new NotFoundError("Asesmen tidak ditemukan")
                await updatedData.update({
                    [dataName]: response.data.id,
                }, {
                    transaction: transaction
                })
                return updatedData.toJSON()
            })
    
        }

        const nyeri = hCreateNyeri({
            ihs_dokter: asesmen.ihs_dokter,
            ihs_pasien: asesmen.ihs_pasien,
            ihs_encounter: asesmen.ihs_encounter,
            isNyeri: asesmen.isnyeri
        })
        const nrs = hCreateNRS({
            ihs_dokter: asesmen.ihs_dokter,
            ihs_pasien: asesmen.ihs_pasien,
            namapasien: asesmen.namapasien,
            ihs_encounter: asesmen.ihs_encounter,
            valueInt: asesmen.skalanyeri
        })
        const brs = hCreateBRS({
            ihs_dokter: asesmen.ihs_dokter,
            ihs_pasien: asesmen.ihs_pasien,
            namapasien: asesmen.namapasien,
            ihs_encounter: asesmen.ihs_encounter,
            valueInt: asesmen.skalanyeri
        })
        const lokasi = hCreateLokasi({
            lokasiNyeriIHS: asesmen.lokasinyericode_ihs_id,
            codeSystemLokasi: asesmen.codesystemlokasinyeri,
            namaLokasiNyeri: asesmen.namalokasinyeri,
            namaPasien: asesmen.namapasien,
            ihs_dokter: asesmen.ihs_dokter,
            ihs_encounter: asesmen.ihs_encounter,
            ihs_pasien: asesmen.ihs_pasien,
        })
        const penyebab = hCreatePenyebabNyeri({
            namaPasien: asesmen.namapasien,
            ihs_dokter: asesmen.ihs_dokter,
            ihs_encounter: asesmen.ihs_encounter,
            ihs_pasien: asesmen.ihs_pasien,
            valuePenyebab: asesmen.penyebabnyeri
        })
        const durasi = hCreateDurasiNyeri({
            namaPasien: asesmen.namapasien,
            ihs_dokter: asesmen.ihs_dokter,
            ihs_encounter: asesmen.ihs_encounter,
            ihs_pasien: asesmen.ihs_pasien,
            valueDurasi: asesmen.durasi,
            satuanDurasiIHS: asesmen.satuandurasi_ihs_id,
            codeSatuanIHS: asesmen.codesystemsatuandurasi
        })
        const frekuensi = hCreateFrekuensiNyeri({
            namaPasien: asesmen.namapasien,
            ihs_dokter: asesmen.ihs_dokter,
            ihs_encounter: asesmen.ihs_encounter,
            ihs_pasien: asesmen.ihs_pasien,
            valueFrekuensi: asesmen.frekuensinyeri
        })

        await updateAsesmen("isnyeri_ihs_id", nyeri)
        await updateAsesmen("skalanyeri_ihs_id", nrs)
        await updateAsesmen("skalanyeribrs_ihs_id", brs)
        await updateAsesmen("lokasinyeri_ihs_id", lokasi)
        await updateAsesmen("penyebabnyeri_ihs_id", penyebab)
        await updateAsesmen("durasinyeri_ihs_id", durasi)
        await updateAsesmen("frekuensinyeri_ihs_id", frekuensi)

    }
)


export {
    hUpsertTriageIGD,
    hUpsertRiwayatPengobatan,
    hUpsertNyeri,
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
const hCreateSuratRujukan = async (reqTemp) => {
    let tempIdNadi=''
    if(reqTemp.ihs_status_rujukan!==null){
        tempIdNadi = {'id':reqTemp.ihs_status_rujukan}
    }
    const allergyIntoleranceData = {
        "resourceType": "Observation",
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
                    "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                    "code": "OC000034",
                    "display": "Surat Pengantar Rujukan"
                }
            ]
        },
        "performer": [
            {
                "reference": "Practitioner/"+reqTemp.ihs_dokter
            }
        ],
        "subject": {
            "reference": "Patient/"+reqTemp.ihs_pasien,
            "display": reqTemp.namapasien
        },
        "encounter": {
            "reference": "Encounter/"+reqTemp.ihs_encounter
        },
        "effectiveDateTime": reqTemp.tglinput,
        "issued": reqTemp.tglinput,
        "valueBoolean": reqTemp.statusrujukan,
        ...tempIdNadi
    }
    return allergyIntoleranceData
}
const hCreateKondisiTiba = async (reqTemp) => {
    let tempIdNadi=''
    if(reqTemp.ihs_kondisidatang!==null){
        tempIdNadi = {'id':reqTemp.ihs_kondisidatang}
    }
    const allergyIntoleranceData = {
        "resourceType": "Observation",
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
                    "code": "75910-0",
                    "display": "Canadian triage and acuity scale [CTAS]"
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
                    "system": reqTemp.system,
                    "code": reqTemp.code,
                    "display": reqTemp.display
                }
            ]
        },
        ...tempIdNadi
    }
    return allergyIntoleranceData
}

const hCreateRiwayatObat = ({
    ihs_obat,
    ihs_pasien,
    namapasien,
    namasigna,
    frekuensisigna,
    periodsigna,
    satuansigna,
    ihs_encounter
}) => {
    const riwayatObatSatuSehat = {
        "resourceType": "MedicationStatement",
        "status": "completed",
        "category": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/medication-statement-category",
                    "code": "inpatient",
                    "display": "Inpatient"
                }
            ]
        },
        "medicationReference": {
            "reference": `Medication/${ihs_obat}`
        },
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namapasien
        },
        "dosage": [
            {
                "text": namasigna,
                "timing": {
                    "repeat": {
                        "frequency": frekuensisigna,
                        "period": periodsigna,
                        "periodUnit": satuansigna
                    }
                }
            }
        ],
        "effectiveDateTime": "2023-01-22T10:00:00+00:00",
        "dateAsserted": "2023-01-22T10:00:00+00:00",
        "informationSource": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namapasien
        },
        "context": {
            "reference": `Encounter/${ihs_encounter}`
        }
    }
    return riwayatObatSatuSehat
}

const hCreateNyeri = ({
    ihs_dokter,
    ihs_pasien,
    ihs_encounter,
    isNyeri
}) => {
    if(!ihs_dokter) throw new BadRequestError("IHS Dokter tidak ada")
    if(!ihs_pasien) throw new BadRequestError("IHS Pasien tidak ada")
    if(!ihs_encounter) throw new BadRequestError("IHS Encounter tidak ada")

    const nyeri = {
        "resourceType": "Observation",
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
                    "system": "http://snomed.info/sct",
                    "code": `22253000`,
                    "display": "Pain"
                }
            ]
        },
        "performer": [
            {
                "reference": `Practitioner/${ihs_dokter}`
            }
        ],
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": "Diana Smith"
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "effectiveDateTime": new Date().toISOString(),
        "issued": new Date().toISOString(),
        "valueBoolean": isNyeri
    }
    return nyeri
}

const hCreateNRS = ({
    ihs_dokter,
    ihs_pasien,
    namapasien,
    ihs_encounter,
    valueInt
}) => {
    const nrs = {
        "resourceType": "Observation",
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
                    "code": "38221-8",
                    "display": "Pain severity Wong-Baker FACES pain rating scale"
                }
            ]
        },
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namapasien
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "effectiveDateTime": new Date().toISOString(),
        "issued": new Date().toISOString(),
        "performer": [
            {
                "reference": `Practitioner/${ihs_dokter}`
            }
        ],
        "valueInteger": valueInt
    }
    return nrs
}

const hCreateBRS = ({
    ihs_dokter,
    ihs_pasien,
    namapasien,
    ihs_encounter,
    valueInt
}) => {
    const brs = {
        "resourceType": "Observation",
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
                    "code": "38221-8",
                    "display": "Pain severity Wong-Baker FACES pain rating scale"
                }
            ]
        },
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namapasien
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "effectiveDateTime": new Date().toISOString(),
        "issued": new Date().toISOString(),
        "performer": [
            {
                "reference": `Practitioner/${ihs_dokter}`
            }
        ],
        "valueInteger": valueInt
    }
    return brs
}

const hCreateLokasi = ({
    codeSystemLokasi,
    namaLokasiNyeri,
    namaPasien,
    lokasiNyeriIHS,
    ihs_dokter,
    ihs_pasien,
    ihs_encounter,
}) => {
    const lokasi = {
        "resourceType": "Observation",
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
                    "code": "38204-4",
                    "display": "Pain primary location"
                }
            ]
        },
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namaPasien
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "effectiveDateTime": new Date().toISOString(),
        "issued": new Date().toISOString(),
        "performer": [
            {
                "reference": `Practitioner/${ihs_dokter}`
            }
        ],
        "bodySite": {
            "coding": [
                {
                    "system": codeSystemLokasi,
                    "code": lokasiNyeriIHS,
                    "display": namaLokasiNyeri
                }
            ]
        }
    }
    return lokasi
}

const hCreatePenyebabNyeri = ({
    namaPasien,
    ihs_dokter,
    ihs_pasien,
    ihs_encounter,
    valuePenyebab
}) => {
    const penyebab = {
        "resourceType": "Observation",
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
                    "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                    "code": "OC000023",
                    "display": "Penyebab nyeri"
                }
            ]
        },
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namaPasien
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "effectiveDateTime": new Date().toISOString(),
        "issued": new Date().toISOString(),
        "performer": [
            {
                "reference": `Practitioner/${ihs_dokter}`
            }
        ],
        "valueString": valuePenyebab || ""
    }
    return penyebab
}

const hCreateDurasiNyeri = ({
    namaPasien,
    ihs_dokter,
    ihs_pasien,
    ihs_encounter,
    valueDurasi,
    satuanDurasiIHS,
    codeSatuanIHS,
}) => {
    const durasi = {
        "resourceType": "Observation",
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
                    "code": "38207-7",
                    "display": "Pain duration"
                }
            ]
        },
        "performer": [
            {
                "reference": `Practitioner/${ihs_dokter}`
            }
        ],
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namaPasien
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "effectiveDateTime": new Date().toISOString(),
        "issued": new Date().toISOString(),
        "valueQuantity": {
            "value": valueDurasi,
            "unit": satuanDurasiIHS,
            "system": codeSatuanIHS,
            "code": satuanDurasiIHS
        }
    }
    return durasi
}

const hCreateFrekuensiNyeri = ({
    namaPasien,
    ihs_dokter,
    ihs_pasien,
    ihs_encounter,
    valueFrekuensi,
}) => {
    const frekuensi = {
        "resourceType": "Observation",
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
                    "system": "http://snomed.info/sct",
                    "code": "700469003",
                    "display": "Frequency of pain symptom"
                }
            ]
        },
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namaPasien
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "effectiveDateTime": new Date().toISOString(),
        "issued": new Date().toISOString(),
        "performer": [
            {
                "reference": `Practitioner/${ihs_dokter}`
            }
        ],
        "valueString": valueFrekuensi
    }
    return frekuensi
}

const hCreateMFS = ({
    namaPasien,
    ihs_dokter,
    ihs_pasien,
    ihs_encounter,
    skorMFS,
    sistemSkorMFS,
    codeInterpretationMFS,
    ihs_mfs,
    displayInterpretationMFS
}) => {
    const mfs = {
        "resourceType": "Observation",
        "status": "final",
        "category": [
            {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                        "code": "exam",
                        "display": "Exam"
                    }
                ]
            }
        ],
        "code": {
            "coding": [
                {
                    "system": "http://loinc.org",
                    "code": "59461-4",
                    "display": "Fall risk level [Morse Fall Scale]"
                }
            ]
        },
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namaPasien
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "effectiveDateTime": new Date().toISOString(),
        "issued": new Date().toISOString(),
        "performer": [
            {
                "reference": `Practitioner/${ihs_dokter}`
            }
        ],
        "valueQuantity": {
            "value": skorMFS,
            "unit": "{score}",
            "system": sistemSkorMFS,
            "code": "{score}"
        },
        "interpretation": [
            {
            "coding": [
                {
                    "system": codeInterpretationMFS,
                    "code": ihs_mfs,
                    "display": displayInterpretationMFS
                }
             ],
                "text": displayInterpretationMFS
            }
        ]
    }
    return mfs
}

const hCreateHDS = ({
    namaPasien,
    ihs_dokter,
    ihs_pasien,
    ihs_encounter,
    skorHDS,
    sistemSkorHDS,
    codeInterpretationHDS,
    ihs_hds,
    displayInterpretationHDS
}) => {
    const hds = {
        "resourceType": "Observation",
        "status": "final",
        "category": [
            {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                        "code": "exam",
                        "display": "Exam"
                    }
                ]
            }
        ],
        "code": {
            "coding": [
                {
                    "system": "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                    "code": "OC000035",
                    "display": "Humpty Dumpty Scale"
                }
            ]
        },
        "subject": {
            "reference": `Patient/${ihs_pasien}`,
            "display": namaPasien
        },
        "encounter": {
            "reference": `Encounter/${ihs_encounter}`
        },
        "effectiveDateTime": new Date().toISOString(),
        "issued": new Date().toISOString(),
        "performer": [
            {
                "reference": `Practitioner/${ihs_dokter}`
            }
        ],
        "valueQuantity": {
            "value": skorHDS,
            "unit": "{score}",
            "system": sistemSkorHDS,
            "code": "{score}"
        },
        "interpretation": [
            {
            "coding": [
                {
                    "system": codeInterpretationHDS,
                    "code": ihs_hds,
                    "display": displayInterpretationHDS
                }
             ],
                "text": displayInterpretationHDS
            }
        ]
    }
    return hds
}