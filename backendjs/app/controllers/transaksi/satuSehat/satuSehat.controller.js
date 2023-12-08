import pool from "../../../config/dbcon.query";
import db from "../../../models";
import instalasiQueries from "../../../queries/mastertable/instalasi/instalasi.queries";
import unitQueries from "../../../queries/mastertable/unit/unit.queries";
import profileQueries from "../../../queries/mastertable/profile/profile.queries";
import pegawaiQueries from "../../../queries/mastertable/pegawai/pegawai.queries";
import satuSehatQueries from "../../../queries/satuSehat/satuSehat.queries";
import axios from "axios";

async function setEnvironmments () {

    const client_id ='quwmeeFAjLOf9PY3sKlobJDgRGjdlW3izk4oOldYElj0gAox';
    const client_secret = 'v33GitfNQucrs2AgAR1m3uwqvgk2mR2Vr8txirLQq2ygH5MAREg0nlUpuHgyWLOa';
    const auth_url = 'https://api-satusehat-dev.dto.kemkes.go.id/oauth2/v1';
    const base_url = 'https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1'
    return [client_id, client_secret,auth_url,base_url];
};

const getListInstalasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const instalasi = await pool.query(instalasiQueries.getAll)
       
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: instalasi.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getListUnit = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const unit = await pool.query(unitQueries.getAllUnitIhs)
       
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: unit.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const postAccessToken = async () => {
    const [client_id, client_secret,auth_url] = await setEnvironmments();
    
    const data = {
        client_id: client_id,
        client_secret: client_secret,
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const postToken = axios.create({
        baseURL: auth_url+`/accesstoken?grant_type=client_credentials`,
        timeout: 25000,
        headers: headers
    });

    try {
        const response = await postToken.post('', (data));
        return response.data;
    } catch (error) {
        throw error;
    }
};
const postGetSatuSehat = async (method, url, body) => {
    try {
        const accessToken = await postAccessToken();
        const [client_id, client_secret, auth_url, base_url] = await setEnvironmments();

        const data = {
            client_id: client_id,
            client_secret: client_secret,
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken.access_token
        };

        const apiClient = axios.create({
            baseURL: base_url+url,
            timeout: 25000,
            headers: headers,
        });
        
        let response;

        if (method === 'GET') {
            response = await apiClient.get('', data);
        } else if (method === 'POST') {
            response = await apiClient.post('',body);
        } else if (method === 'PUT') {
            response = await apiClient.put('',body);
        } else {
            // Handle other HTTP methods if needed
            return {
                code: 400,
                status: 'Invalid HTTP method'
            };
        }

        return response.data;
    } catch (error) {
        // throw error;
        let resp ={
            code:error?.response?.status,
            message:error?.response?.statusText,
            data:error?.response?.data
        }
        throw resp;
    }
};

const updateOrganizationInstalasi = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const profile = await pool.query(profileQueries.getAll);

        const organizationData = {
            resourceType: 'Organization',
            active: true,
            identifier: [{
                    use: 'official',
                    system: 'http://sys-ids.kemkes.go.id/organization/'+profile.rows[0].ihs_id,
                    value: String(req.body.id)
                }
            ],
            type: [{coding: [{
                            system: 'http://terminology.hl7.org/CodeSystem/organization-type',
                            code: 'dept',
                            display: 'Hospital Department'
                        }]}
            ],
            name: req.body.label,
            telecom: [{
                    system: 'phone',
                    value: profile.rows[0].fixedphone,
                    use: 'work'
                },{
                    system: 'email',
                    value: profile.rows[0].alamatemail,
                    use: 'work'
                },{
                    system: 'url',
                    value: profile.rows[0].website,
                    use: 'work'
                }
            ],
            address: [{
                    use: 'work',
                    type: 'both',
                    line: [profile.rows[0].alamatlengkap],
                    city: 'Jakarta',
                    postalCode: profile.rows[0].kodepos,
                    country: 'ID',
                    extension: [{
                            url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode',
                            extension: [{
                                    url: 'province',
                                    valueCode: profile.rows[0].kodeprovinsi},{
                                    url: 'city',
                                    valueCode: profile.rows[0].kodekabupaten},{
                                    url: 'district',
                                    valueCode: profile.rows[0].kodekecamatan},{
                                    url: 'village',
                                    valueCode: profile.rows[0].kodedesa}
                            ]}]}
            ],
            partOf: {
                reference: 'Organization/' + profile.rows[0].ihs_id}
        };
        const response = await postGetSatuSehat('POST', '/Organization', organizationData);
        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = ''
                setInstalasi = await db.m_instalasi.update({
                    ihs_id: response.id,
                    
                }, {
                    where: {
                        id: req.body.id
                    },
                    transaction: transaction
                });
            
            return { setInstalasi }
        });

        const tempres = {
            instalasi:setInstalasi,
            response:response
        };

        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(400).send({
            msg: error.message || 'Gagal',
            code: 400,
            data: error,
            success: false,
        });
    }
};

const getOrganizationInstalasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const getOrganization = await postGetSatuSehat('GET','/Organization?name=snb','');
        
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: getOrganization,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const updateLocationUnit = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const profile = await pool.query(profileQueries.getAll);

        const locationObject = {
            resourceType: "Location",
            identifier: [{
                    system: "http://sys-ids.kemkes.go.id/location/"+profile.rows[0].ihs_id,
                    value: String(req.body.id)
                }
            ],
            status: "active",
            name: req.body.label,
            description: req.body.description,
            mode: "instance",
            telecom: [{
                    system: "phone",
                    value: profile.rows[0].fixedphone,
                    use: "work"
                },{
                    system: "fax",
                    value: "2329",
                    use: "work"
                },{
                    system: "email",
                    value: profile.rows[0].alamatemail
                },{
                    system: "url",
                    value: profile.rows[0].website,
                    use: "work"
                }
            ],
            address: {
                use: "work",
                line: [
                    profile.rows[0].alamatlengkap
                ],
                city: "Jakarta",
                postalCode: profile.rows[0].kodepos,
                country: "ID",
                extension: [
{
                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
                        extension: [
                            {
                                url: 'province',
                                valueCode: profile.rows[0].kodeprovinsi
                            },{
                                url: 'city',
                                valueCode: profile.rows[0].kodekabupaten
                            },{
                                url: 'district',
                                valueCode: profile.rows[0].kodekecamatan
                            },{
                                url: 'village',
                                valueCode: profile.rows[0].kodedesa
                            },{
                                url: "rt",
                                valueCode: profile.rows[0].rt
                            },{
                                url: "rw",
                                valueCode: profile.rows[0].rw
                            }
                        ]
                    }
                ]
            },
            physicalType: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/location-physical-type",
                        code: "ro",
                        display: "Room"
                    }
                ]
            },
            position: {
                longitude: parseFloat(profile.rows[0].longitude),
                latitude: parseFloat(profile.rows[0].latitude),
                altitude: parseFloat(profile.rows[0].altitude)
            },
            managingOrganization: {
                reference: 'Organization/' + req.body.ihs_instalasi
            }
        };
        
        
        const response = await postGetSatuSehat('POST', '/Location', locationObject);
        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = ''
                setInstalasi = await db.m_unit.update({
                    ihs_id: response.id,
                    
                }, {
                    where: {
                        id: req.body.id
                    },
                    transaction: transaction
                });
            
            return { setInstalasi }
        });

        const tempres = {
            unit:setInstalasi,
            response:response
        };

        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(400).send({
            msg: error.message || 'Gagal',
            code: 400,
            data: error,
            success: false,
        });
    }
};

const getListDokter = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const unit = await pool.query(pegawaiQueries.getDokterNip)
       
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: unit.rows,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const updatePractitionerPegawai = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let msg ='Data Dokter Tidak Ada'
        const response = await postGetSatuSehat('GET', '/Practitioner?identifier=https://fhir.kemkes.go.id/id/nik|'+req.body.noidentitas,'');
        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = ''
            if(response.total>0){
                msg ='Sukses'
                setInstalasi = await db.m_pegawai.update({
                    ihs_id: response.entry[0].resource.id,
                    
                }, {
                    where: {
                        id: req.body.id
                    },
                    transaction: transaction
                });
            }
            return { setInstalasi }
        });

        const tempres = {
            pegawai:setInstalasi,
            response:response
        };

        res.status(200).send({
            msg: msg,
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(400).send({
            msg: error.message || 'Gagal',
            code: 400,
            data: error,
            success: false,
        });
    }
};
const updateIhsPatient = async (req, res) => {
    const logger = res.locals.logger;
    try {
        let msg ='Data Pasien Tidak Ada'
        let response = await postGetSatuSehat('GET', '/Patient?identifier=https://fhir.kemkes.go.id/id/nik|'+req.body.noidentitas,'');
        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = ''
            if(response.total>0){
                msg ='Sukses'
                setInstalasi = await db.m_pasien.update({
                    ihs_id: response.entry[0].resource.id,
                }, {
                    where: {
                        id: req.body.id
                    },
                    transaction: transaction
                });
            }else{
                const patientObject = await temppatientObject(req.body)
                response = await postGetSatuSehat('POST', '/Patient',patientObject);
                msg ='Sukses'
                if(response.success===true){
                    setInstalasi = await db.m_pasien.update({
                        ihs_id: response.data.PatientID,
                    }, {
                        where: {
                            id: req.body.id
                        },
                        transaction: transaction
                    });
                }
              
            }
            return { setInstalasi }
        });

        const tempres = {
            pasien:setInstalasi,
            response:response
        };

        res.status(200).send({
            msg: msg,
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(400).send({
            msg: error.message || 'Gagal',
            code: 400,
            data: error,
            success: false,
        });
    }
};

async function temppatientObject(reqTemp) {
    const patientObject = {
        resourceType: "Patient",
        meta: {
            profile: [
                "https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"
            ]
        },
        identifier: [{
                use: "official",
                system: "https://fhir.kemkes.go.id/id/nik",
                value: reqTemp.noidentitas
            }
        ],
        active: true,
        name: [{
                use: "official",
                text: reqTemp.namapasien
            }
        ],
        telecom: [{
                system: "phone",
                value: reqTemp.nohppasien,
                use: "mobile"
            },{
                system: "phone",
                value: reqTemp.nohppasien,
                use: "home"
            }
        ],
        gender: reqTemp.ihs_jeniskelamin,
        birthDate: reqTemp.tgllahir,
        deceasedBoolean: false,
        address: [{
                use: "home",
                line: [
                    reqTemp.alamat
                ],
                city: reqTemp.namakabupaten,
                postalCode: reqTemp.kodepos,
                country: "ID",
                extension: [{
                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
                        extension: [{
                                url: "province",
                                valueCode: reqTemp.kodeprovinsi
                            },{
                                url: "city",
                                valueCode: reqTemp.kodekabupaten
                            },{
                                url: "district",
                                valueCode: reqTemp.kodekecamatan
                            },{
                                url: "village",
                                valueCode: reqTemp.kodedesa
                            },{
                                url: "rt",
                                valueCode: reqTemp.rtktp
                            },{
                                url: "rw",
                                valueCode: reqTemp.rwktp
                            }
                        ]
                    }
                ]
            }
        ],
        maritalStatus: {
            coding: [{
                    system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                    code: reqTemp.ihs_code,
                    display: reqTemp.ihs_display}
            ],
            text: reqTemp.ihs_display
        },
        multipleBirthInteger: 0,
        // contact: [{
        //         relationship: [{
        //                 coding: [{
        //                         system: "http://terminology.hl7.org/CodeSystem/v2-0131",
        //                         code: "C"
        //                     }
        //                 ]
        //             }
        //         ],
        //         name: {
        //             use: "official",
        //             text: reqTemp.namapasien
        //         },
        //         telecom: [{
        //                 system: "phone",
        //                 value: reqTemp.nohppasien,
        //                 use: "mobile"
        //             }]
        //     }],
        communication: [{
                language: {
                    coding: [{
                            system: "urn:ietf:bcp:47",
                            code: "id-ID",
                            display: "Indonesian"
                        }
                    ],
                    text: "Indonesian"},
                preferred: true}],
        extension: [{
                url: "https://fhir.kemkes.go.id/r4/StructureDefinition/birthPlace",
                valueAddress: {
                    city: reqTemp.namakabupaten,
                    country: "ID"
                }
            },{
                url: "https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus",
                valueCode: "WNI"
            }
        ]};
                return patientObject
}

async function tempEncounterTerimaDokumenRJ(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    const encounterData = {
        resourceType: "Encounter",
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.rows[0].ihs_id,
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
                    end:currentDate
                }
            },
            {
                status: "in-progress",
                period: {
                    start: currentDate
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/"+profile.rows[0].ihs_id
        }
    };
    
                return encounterData
}

const upsertEncounter = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const encounter = await tempEncounterTerimaDokumenRJ(req.body)
        let response = await postGetSatuSehat('POST', '/Encounter',encounter);
        let msg ='Sukses'
        
        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = ''
            if(response.resourceType==='Encounter'){
                setInstalasi = await db.t_daftarpasien.update({
                    ihs_id: response.id,
                }, {
                    where: {
                        noregistrasi: req.body.noregistrasi
                    },
                    transaction: transaction
                });
            }
            return { setInstalasi }
        });
        
        const tempres = {
            encounter:response,
            daftarpsien:setInstalasi,
            dataencounter:encounter
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

async function tempConditionPrimary(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
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
            reference: "Encounter/"+reqTemp.ihs_dp
        },
        onsetDateTime: currentDate,
        recordedDate: currentDate
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
                reference: "Encounter/"+reqTemp.ihs_dp
            }
        };
    }
                return conditionData
}

const upsertCondition = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDp,[req.body.norecdp]);
        
        let temp ={
            codestatus:req.body.codestatus,
            displaystatus:req.body.displaystatus,
            ihs_diagnosa:req.body.ihs_diagnosa,
            codekodediagnosa:req.body.codekodediagnosa,
            namakodediagnosa:req.body.namakodediagnosa,
            ihs_dp:profilePasien.rows[0].ihs_dp,
            ihs_pasien:profilePasien.rows[0].ihs_pasien,
            namapasien:profilePasien.rows[0].namapasien
        }
        const condition = await tempConditionPrimary(temp)
        let url ='/Condition'
        let method = 'POST'
        if(req.body.ihs_diagnosa!==''){
            url ='/Condition/'+req.body.ihs_diagnosa
            method='PUT'
        }
        let response = await postGetSatuSehat(method, url,condition);
        
        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = ''
            if(req.body.codestatus==='active'){
                if(response.resourceType==='Condition'){
                    setInstalasi = await db.t_diagnosapasien.update({
                        ihs_id: response.id,
                    }, {
                        where: {
                            norec: req.body.norec
                        },
                        transaction: transaction
                    });
                }
            }
            return { setInstalasi }
        });
        
        const tempres = {
            condition:response,
            diagnosapasien:setInstalasi,
            // profilePasien:profilePasien.rows,
            datacondition:condition,
            // url:url,
            // method:method
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

async function tempEncounterPulang(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    const encounterData = {
        resourceType: "Encounter",
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.rows[0].ihs_id,
                value: reqTemp.noregistrasi
            }
        ],
        status: "finished",
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
            end: reqTemp.tglregistrasi_ihs
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
                    end:currentDate
                }
            },
            {
                status: "in-progress",
                period: {
                    start: currentDate
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/"+profile.rows[0].ihs_id
        }
    };
    
                return encounterData
}

const upsertEncounterPulang = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDp,[req.body.norec]);
        const encounter = await tempEncounterPulang(req.body)
        // await db.sequelize.transaction(async (transaction) => {
            
        // });
        
        const tempres = {
            body:req.body
        };
        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

export default {
    getListInstalasi,
    updateOrganizationInstalasi,
    getOrganizationInstalasi,
    getListUnit,
    updateLocationUnit,
    getListDokter,
    updatePractitionerPegawai,
    updateIhsPatient,
    upsertEncounter,
    upsertCondition,
    upsertEncounterPulang
}