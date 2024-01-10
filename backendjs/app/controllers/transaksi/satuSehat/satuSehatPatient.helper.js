import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import queries from "../../../queries/satuSehat/satuSehat.queries";
import { generateSatuSehat } from "./satuSehat.controller";
import { wrapperSatuSehat } from "../../../utils/satusehatutils";
import profileQueries from "../../../queries/mastertable/profile/profile.queries";

const hupsertPatientNewBorn = wrapperSatuSehat(
    async (logger, ssClient,params) => {
        await db.sequelize.transaction(async (transaction) => {
        const pasien = await db.m_pasien.findByPk(params.id, {
            transaction: transaction
        })
        if(!pasien) throw new NotFoundError(`Tidak ditemukan order: ${params.id}`)
        
        let patient = '';
        patient = await tempPatientNewBorn(params);
            let response
            if(pasien.ihs_id){
                response = await ssClient.put(`/Patient/${pasien.ihs_id}`, patient)
            } else {
                response = await ssClient.post("/Patient", patient)
                await pasien.update({
                    ihs_id: response.data.id
                }, {
                    transaction: transaction})
            }
        })
    }
)

export{
    hupsertPatientNewBorn
}

const tempPatientNewBorn = async (reqTemp) => {
    const profile = (await pool.query(profileQueries.getAll)).rows[0]
    let tempBaseOn=''
    const encounterData = {
        "resourceType": "Patient",
        "meta": {
            "profile": [
                "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
            ]
        },
        "identifier": [{
                "use": "official",
                "system": "https://fhir.kemkes.go.id/id/nik-ibu",
                "value": reqTemp.nikIbu
            }
        ],
        "active": true,
        "name": [{
                "use": "official",
                "text": reqTemp.namaPasien
            }
        ],
        "telecom": [{
                "system": "phone",
                "value": reqTemp.nohp,
                "use": "mobile"
            }
        ],
        "gender": reqTemp.ihs_jeniskelamin,
        "birthDate":reqTemp.tglLahirPasien,
        "deceasedBoolean": false,
        "address": [
            {
                "use": "home",
                "line": [
                    reqTemp.alamatPasien
                ],
                "city":reqTemp.kota,"postalCode": reqTemp.pos,"country": "ID",
                "extension": [
                    {
                        "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
                        "extension": [{
                                "url": "province",
                                "valueCode":reqTemp.kodeprovinsi},{
                                "url": "city",
                                "valueCode": reqTemp.kodekabupaten},{
                                "url": "district",
                                "valueCode": reqTemp.kodekecamatan},{
                                "url": "village",
                                "valueCode": reqTemp.kodedesa},{
                                "url": "rt",
                                "valueCode": reqTemp.rt},{
                                "url": "rw",
                                "valueCode":reqTemp.rw}
                        ]
                    }
                ]
            }
        ],
        "maritalStatus": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                    "code": 'U',
                    "display": 'unmarried'
                }
            ],
            "text": 'unmarried'
        },
        "multipleBirthInteger": 0,
        "contact": [{
                "relationship": [{
                        "coding": [{
                                "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
                                "code": "C"
                            }
                        ]
                    }
                ],
                "name": {
                    "use": "official",
                    "text": reqTemp.namaIbu
                },
                "telecom": [{
                        "system": "phone",
                        "value": reqTemp.nohp,
                        "use": "mobile"
                    }
                ]
            }
        ],
        "communication": [{
                "language": {
                    "coding": [
                        {
                            "system": "urn:ietf:bcp:47",
                            "code": "id-ID",
                            "display": "Indonesian"
                        }
                    ],
                    "text": "Indonesian"
                },
                "preferred": true
            }
        ],
        "extension": [{
                "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/birthPlace",
                "valueAddress": {
                    "city": reqTemp.kota,
                    "country": "ID"
                }
            },{
                "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus",
                "valueCode": "WNI"
            }
        ]
    };
    
                return encounterData
}