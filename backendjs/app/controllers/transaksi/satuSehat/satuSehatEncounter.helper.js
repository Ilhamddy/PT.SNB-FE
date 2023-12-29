import pool from "../../../config/dbcon.query";
import db from "../../../models";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import queries from "../../../queries/satuSehat/satuSehat.queries";
import { generateSatuSehat } from "./satuSehat.controller";
import { wrapperSatuSehat } from "../../../utils/satusehatutils";
import profileQueries from "../../../queries/mastertable/profile/profile.queries";
import { hUpsertTriageIGD } from "../satuSehat/satuSehatObservation.helper";

const hUpsertEncounter = wrapperSatuSehat(
    async (logger, norec, status,statusMutasi,norectriage) => {
        await db.sequelize.transaction(async (transaction) => {
            const pasienigd = await db.t_daftarpasien.findByPk(norec, {
                transaction: transaction
            })
            
            const ssClient = await generateSatuSehat()
            if(!pasienigd) throw new NotFoundError(`Tidak ditemukan Pasien: ${norec}`)
            const profilePasien = (await pool.query(queries.qGetDataPasienByNorecDpTrm, [
                norec
            ])).rows[0]
            if(!profilePasien) NotFoundError(`Daftar Pasien tidak ditemukan: ${norec}`)
            const {
                ihs_dp,
                ihs_pasien,
                namapasien,
                noregistrasi,
                tglpulang,
                ihs_unit,
                tglditerimapoli,
                ihs_dpjp,
                namadokter,
                tglregistrasi_ihs,
                objectinstalasifk,
                ihs_tempattidur,
                description,
                namakelas,
                kelas_bpjs,
                ihs_reference
            } = profilePasien;
    
            const temp = {
                ihs_dp,
                ihs_id: ihs_pasien,
                namapasien,
                noregistrasi,
                tglpulang,
                ihs_unit,
                tglditerimapoli,
                ihs_dpjp,
                namadokter,
                tglregistrasi_ihs,
                norecdp: norec,
                tglditerimapoli:tglditerimapoli,
                ihs_tempattidur:ihs_tempattidur,
                description:description,
                namakelas:namakelas,
                kelas_bpjs:kelas_bpjs,
                ihs_reference:ihs_reference
            };
            let encounter = '';
            let response
            let isArrived = ihs_dp === null && status === 'arrived';
            const isInProgress = ihs_dp !== null && status === 'in-progress';
            if(objectinstalasifk===2){
                isArrived=true
            }
            if (isArrived) {
                if(objectinstalasifk===7){
                    encounter = await hCreateEncounterIGD(temp);
                }else if(objectinstalasifk===1){
                    encounter = await tempEncounterRJ(temp);
                }else if(objectinstalasifk===2){
                    if(statusMutasi===false){
                        encounter = await tempEncounterRI(temp);
                    }else{
                        encounter = await tempEncounterRIMutasi(temp);
                        
                    }
                }else{
                    throw new BadRequestError('Instalasi '+objectinstalasifk+' Belum Terkirim')
                }
                response = await ssClient.post("/Encounter", encounter)
            }else if (isInProgress) {
                encounter = await tempEncounterTerimaDokumenRJ(temp);
                response = await ssClient.put(`/Encounter/${ihs_dp}`, encounter)
            }
            if (response.data.resourceType === 'Encounter' && ihs_dp === null) {
                if (statusMutasi === true) {
                    await pasienigd.update({ ihs_id: response.data.id,ihs_reference: ihs_reference}, {
                    //   where: { norec: req.body.norec },
                      transaction,
                    });
                }else{
                    await pasienigd.update({ ihs_id: response.data.id }, {
                    //   where: { norec: req.body.norec },
                      transaction,
                    });
                }
                if (norectriage !== '') {
                    hUpsertTriageIGD(norectriage,norec)
                }
              }
        });
    }
)

const hUpsertEncounterPulang = wrapperSatuSehat(
    async (logger, norecdp) => {
        const profilePasien = await pool.query(queries.qGetDataPasienByNorecDpTrm,[norecdp]);
        let temp ={
            ihs_dp:profilePasien.rows[0].ihs_dp,
            ihs_id:profilePasien.rows[0].ihs_pasien,
            namapasien:profilePasien.rows[0].namapasien,
            noregistrasi:profilePasien.rows[0].noregistrasi,
            tglpulang:profilePasien.rows[0].tglpulang,
            ihs_unit:profilePasien.rows[0].ihs_unit,
            tglditerimapoli:profilePasien.rows[0].tglditerimapoli,
            ihs_dpjp:profilePasien.rows[0].ihs_dpjp,
            namadokter:profilePasien.rows[0].namadokter,
            tglregistrasi_ihs:profilePasien.rows[0].tglregistrasi_ihs,
            objectinstalasifk:profilePasien.rows[0].objectinstalasifk,
            ihs_codepulangri:profilePasien.rows[0].ihs_codepulangri,
            ihs_displaypulangri:profilePasien.rows[0].ihs_displaypulangri,
            ihs_definition:profilePasien.rows[0].ihs_displaypulangri,
            ihs_tempattidur:profilePasien.rows[0].ihs_tempattidur,
            description:profilePasien.rows[0].description,
            namakelas:profilePasien.rows[0].namakelas,
            kelas_bpjs:profilePasien.rows[0].kelas_bpjs,
            norecdp: norecdp,
        }
        let encounter=''
        if(temp.objectinstalasifk===2){
            encounter = await tempEncounterPulangRI(temp)
        }else{
            encounter = await tempEncounterPulang(temp)            
        }
        const ssClient = await generateSatuSehat()
        let response = await ssClient.put('/Encounter/'+profilePasien.rows[0].ihs_dp,encounter)
        // await db.sequelize.transaction(async (transaction) => {
            
        // });
        
        const tempres = {
            encounter:encounter,
            response:response.data
        };
    }
)

export {
    hUpsertEncounter,
    hUpsertEncounterPulang
}

const hCreateEncounterIGD = async (reqTemp) => {
    const profile = (await pool.query(profileQueries.getAll)).rows[0]
    const encounterData = {
        resourceType: "Encounter",
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.ihs_id,
                value: reqTemp.noregistrasi
            }
        ],
        status: "arrived",
        class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "EMER",
            display: "emergency"
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
            display: reqTemp.namapasien
        },
        participant: [
            {
                type: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: "ATND",
                                display: "attender"
                            }
                        ]
                    }
                ],
                individual: {
                    reference: "Practitioner/"+reqTemp.ihs_dpjp,
                    display: reqTemp.namadokter
                }
            }
        ],
        period: {
            start: reqTemp.tglregistrasi_ihs
        },
        location: [
            {
                location: {
                    reference: "Location/"+reqTemp.ihs_unit,
                    display: reqTemp.namaunit
                },
                extension: [
                    {
                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
                        extension: [
                            {
                                url: "value",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Outpatient",
                                            code: "reguler",
                                            display: "Kelas Reguler"
                                        }
                                    ]
                                }
                            },
                            {
                                url: "upgradeClassIndicator",
                                valueCodeableConcept: {
                                  coding: [
                                    {
                                      system: "http://terminology.kemkes.go.id/CodeSystem/locationUpgradeClass",
                                      code: "kelas-tetap",
                                      display: "Kelas Tetap Perawatan"
                                    }
                                  ]
                                }
                              }
                        ]
                    }
                ]
            }
        ],
        statusHistory: [
            {
                status: "arrived",
                period: {
                    start: reqTemp.tglregistrasi_ihs,
                    end:reqTemp.tglpulang
                }
            },
            {
                status: "in-progress",
                period: {
                    start: reqTemp.tglpulang
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/"+profile.ihs_id
        }
    };
    
                return encounterData
}
const tempEncounterRJ = async (reqTemp) => {
    const profile = (await pool.query(profileQueries.getAll)).rows[0]
    const encounterData = {
        resourceType: "Encounter",
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.ihs_id,
                value: reqTemp.noregistrasi
            }
        ],
        status: "arrived",
        class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "AMB",
            display: "ambulatory"
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
            display: reqTemp.namapasien
        },
        participant: [
            {
                type: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: "ATND",
                                display: "attender"
                            }
                        ]
                    }
                ],
                individual: {
                    reference: "Practitioner/"+reqTemp.ihs_dpjp,
                    display: reqTemp.namadokter
                }
            }
        ],
        period: {
            start: reqTemp.tglregistrasi_ihs
        },
        location: [
            {
                location: {
                    reference: "Location/"+reqTemp.ihs_unit,
                    display: reqTemp.namaunit
                }
            }
        ],
        statusHistory: [
            {
                status: "arrived",
                period: {
                    start: reqTemp.tglregistrasi_ihs,
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/"+profile.ihs_id
        }
    };
    
                return encounterData
}
const tempEncounterRI = async (reqTemp) => {
    const profile = (await pool.query(profileQueries.getAll)).rows[0]
    let tempBaseOn=''
    const encounterData = {
        resourceType: "Encounter",
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.ihs_id,
                value: reqTemp.noregistrasi
            }
        ],
        status: "in-progress",
        class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "IMP",
            display: "inpatient encounter"
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
            display: reqTemp.namapasien
        },
        participant: [
            {
                type: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: "ATND",
                                display: "attender"
                            }
                        ]
                    }
                ],
                individual: {
                    reference: "Practitioner/"+reqTemp.ihs_dpjp,
                    display: reqTemp.namadokter
                }
            }
        ],
        period: {
            start: reqTemp.tglregistrasi_ihs
        },
        location: [
            {
                location: {
                    reference: "Location/"+reqTemp.ihs_tempattidur,
                    display: reqTemp.description
                },
                extension: [
                    {
                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
                        extension: [
                            {
                                url: "value",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Inpatient",
                                            code: reqTemp.kelas_bpjs,
                                            display: reqTemp.namakelas
                                        }
                                    ]
                                }
                            },
                            {
                                url: "upgradeClassIndicator",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://terminology.kemkes.go.id/CodeSystem/locationUpgradeClass",
                                            code: "kelas-tetap",
                                            display: "Kelas Tetap Perawatan"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        statusHistory: [
            {
                status: "in-progress",
                period: {
                    start: reqTemp.tglregistrasi_ihs,
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/"+profile.ihs_id
        },
        ...tempBaseOn
    };
    
                return encounterData
}
const tempEncounterRIMutasi = async (reqTemp) => {
    const profile = (await pool.query(profileQueries.getAll)).rows[0]
    let tempBaseOn=''
    const encounterData = {
        resourceType: "Encounter",
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.ihs_id,
                value: reqTemp.noregistrasi
            }
        ],
        status: "in-progress",
        class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "IMP",
            display: "inpatient encounter"
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
            display: reqTemp.namapasien
        },
        participant: [
            {
                type: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: "ATND",
                                display: "attender"
                            }
                        ]
                    }
                ],
                individual: {
                    reference: "Practitioner/"+reqTemp.ihs_dpjp,
                    display: reqTemp.namadokter
                }
            }
        ],
        period: {
            start: reqTemp.tglregistrasi_ihs
        },
        location: [
            {
                location: {
                    reference: "Location/"+reqTemp.ihs_tempattidur,
                    display: reqTemp.description
                },
                extension: [
                    {
                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
                        extension: [
                            {
                                url: "value",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Inpatient",
                                            code: reqTemp.kelas_bpjs,
                                            display: reqTemp.namakelas
                                        }
                                    ]
                                }
                            },
                            {
                                url: "upgradeClassIndicator",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://terminology.kemkes.go.id/CodeSystem/locationUpgradeClass",
                                            code: "kelas-tetap",
                                            display: "Kelas Tetap Perawatan"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        statusHistory: [
            {
                status: "in-progress",
                period: {
                    start: reqTemp.tglregistrasi_ihs,
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/"+profile.ihs_id
        }
        // ,basedOn: [
        //             {
        //                 reference: "ServiceRequest/"+reqTemp.ihs_dp
        //             }
        //         ]
    };
    
                return encounterData
}
const tempEncounterTerimaDokumenRJ = async (reqTemp) => {
    const profile = (await pool.query(profileQueries.getAll)).rows[0]
    const encounterData = {
        resourceType: "Encounter",
        id: reqTemp.ihs_dp,
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.ihs_id,
                value: reqTemp.noregistrasi
            }
        ],
        status: "in-progress",
        class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "AMB",
            display: "ambulatory"
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
            display: reqTemp.namapasien
        },
        participant: [
            {
                type: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: "ATND",
                                display: "attender"
                            }
                        ]
                    }
                ],
                individual: {
                    reference: "Practitioner/"+reqTemp.ihs_dpjp,
                    display: reqTemp.namadokter
                }
            }
        ],
        period: {
            start: reqTemp.tglregistrasi_ihs,
            end: reqTemp.tglpulang
        },
        location: [
            {
                location: {
                    reference: "Location/"+reqTemp.ihs_unit,
                    display: reqTemp.namaunit
                },
                extension: [
                    {
                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
                        extension: [
                            {
                                url: "value",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Outpatient",
                                            code: "reguler",
                                            display: "Kelas Reguler"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        statusHistory: [
            {
                status: "arrived",
                period: {
                    start: reqTemp.tglregistrasi_ihs,
                    end:reqTemp.tglditerimapoli
                }
            },
            {
                status: "in-progress",
                period: {
                    start: reqTemp.tglditerimapoli,
                    end:reqTemp.tglditerimapoli
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/"+profile.ihs_id
        }
    };
                return encounterData
}

async function tempEncounterPulang(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const diagnosa = await pool.query(queries.qListDiagnosa,[reqTemp.norecdp]);
    let tempDiagnosis = diagnosa.rows.map((element) => {
        if (element.ihs_diagnosa !== null) {
            return {
                condition: {
                    reference: "Condition/" + element.ihs_diagnosa,
                    display: element.label
                },
                use: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                            code: "DD",
                            display: "Discharge diagnosis"
                        }
                    ]
                },
                rank: parseFloat(element.no)
            };
        }
        return null; // or handle the case where ihs_diagnosa is null
    }).filter(Boolean);
    
    const currentDate = new Date();
    const diagnosis = tempDiagnosis;    
    const encounterData = {
        resourceType: "Encounter",
        id: reqTemp.ihs_dp,
        identifier: [{
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.rows[0].ihs_id,
                value: reqTemp.noregistrasi
            }],
        status: "finished",
        class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "AMB",
            display: "ambulatory"},
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
            display: reqTemp.namapasien},
        participant: [{
                type: [{
                        coding: [{
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: "ATND",
                                display: "attender"}
                        ]}
                ],
                individual: {
                    reference: "Practitioner/"+reqTemp.ihs_dpjp,
                    display: reqTemp.namadokter}
            }],
        period: {
            start: reqTemp.tglregistrasi_ihs,
            end: reqTemp.tglpulang},
        location: [{
                location: {
                    reference: "Location/"+reqTemp.ihs_unit,
                    display: reqTemp.namaunit},
                extension: [{
                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
                        extension: [{
                                url: "value",
                                valueCodeableConcept: {
                                    coding: [{
                                            system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Outpatient",
                                            code: "reguler",
                                            display: "Kelas Reguler"}
                                    ]}
                            }]
                    }]}
        ],
        statusHistory: [{
                status: "arrived",
                period: {
                    start: reqTemp.tglregistrasi_ihs,
                    end:reqTemp.tglditerimapoli
                }
            },{
                status: "in-progress",
                period: {
                    start: reqTemp.tglditerimapoli,
                    end: reqTemp.tglpulang
                }
            },{
                status: "finished",
                period: {
                    start: reqTemp.tglpulang,
                    end: reqTemp.tglpulang
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/"+profile.rows[0].ihs_id
        },
        diagnosis
    };
    
                return encounterData
}


async function tempEncounterPulangRI(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const diagnosa = await pool.query(queries.qListDiagnosa,[reqTemp.norecdp]);
    let tempDiagnosis = diagnosa.rows.map((element) => {
        if (element.ihs_diagnosa !== null) {
            return {
                condition: {
                    reference: "Condition/" + element.ihs_diagnosa,
                    display: element.label
                },
                use: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                            code: "DD",
                            display: "Discharge diagnosis"
                        }
                    ]
                },
                rank: parseFloat(element.no)
            };
        }
        return null; // or handle the case where ihs_diagnosa is null
    }).filter(Boolean);
    
    const currentDate = new Date();
    const diagnosis = tempDiagnosis;    
    const encounterData = {
        resourceType: "Encounter",
        id: reqTemp.ihs_dp,
        identifier: [{
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.rows[0].ihs_id,
                value: reqTemp.noregistrasi
            }],
        status: "finished",
        class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "IMP",
            display: "inpatient encounter"},
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
            display: reqTemp.namapasien},
        participant: [{
                type: [{
                        coding: [{
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: "ATND",
                                display: "attender"}
                        ]}
                ],
                individual: {
                    reference: "Practitioner/"+reqTemp.ihs_dpjp,
                    display: reqTemp.namadokter}
            }],
        period: {
            start: reqTemp.tglregistrasi_ihs,
            end: reqTemp.tglpulang},
        location: [{
                location: {
                    reference: "Location/"+reqTemp.ihs_tempattidur,
                    display: reqTemp.description},
                    period: {
                        start: reqTemp.tglregistrasi_ihs,
                        end: reqTemp.tglpulang},
                extension: [{
                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
                        extension: [{
                                url: "value",
                                valueCodeableConcept: {
                                    coding: [{
                                            system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Outpatient",
                                            code: "reguler",
                                            display: "Kelas Reguler"}
                                    ]}
                            },{
                                url: "upgradeClassIndicator",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://terminology.kemkes.go.id/CodeSystem/locationUpgradeClass",
                                            code: "kelas-tetap",
                                            display: "Kelas Tetap Perawatan"
                                        }
                                    ]
                                }
                            }]
                    }]}
        ],
        statusHistory: [{
                status: "in-progress",
                period: {
                    start: reqTemp.tglregistrasi_ihs,
                    end: reqTemp.tglpulang
                }
            },{
                status: "finished",
                period: {
                    start: reqTemp.tglregistrasi_ihs,
                    end: reqTemp.tglpulang
                }
            }
        ],
        hospitalization: {
            dischargeDisposition: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/discharge-disposition",
                        code: reqTemp.ihs_codepulangri,
                        display: reqTemp.ihs_displaypulangri
                    }
                ],
                text: reqTemp.ihs_definition
            }
        },
        serviceProvider: {
            reference: "Organization/"+profile.rows[0].ihs_id
        },
        diagnosis
    };
    
                return encounterData
}