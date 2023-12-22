import pool from "../../../config/dbcon.query";
import db from "../../../models";
import instalasiQueries from "../../../queries/mastertable/instalasi/instalasi.queries";
import unitQueries from "../../../queries/mastertable/unit/unit.queries";
import profileQueries from "../../../queries/mastertable/profile/profile.queries";
import pegawaiQueries from "../../../queries/mastertable/pegawai/pegawai.queries";
import satuSehatQueries from "../../../queries/satuSehat/satuSehat.queries";
import kamarQueries from "../../../queries/mastertable/kamar/kamar.queries";
import tempattidurQueries from "../../../queries/mastertable/tempattidur/tempattidur.queries";
import axios from "axios";
import { BadRequestError } from "../../../utils/errors";

async function getCurrentDateAsync() {
    const currentDate = new Date();
    const utcDateString = currentDate.toLocaleString('en-US', { timeZone: 'UTC' });
    return new Date(utcDateString);
  }

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
const generateSatuSehat = async () => {
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
            baseURL: base_url,
            timeout: 25000,
            headers: headers,
        });

        return apiClient
        
        // let response;


        // if (method === 'GET') {
        //     response = await apiClient.get('', data);
        // } else if (method === 'POST') {
        //     response = await apiClient.post('',body);
        // } else if (method === 'PUT') {
        //     response = await apiClient.put('',body);
        // } else {
        //     // Handle other HTTP methods if needed
        //     return {
        //         code: 400,
        //         status: 'Invalid HTTP method'
        //     };
        // }

        // return response.data;
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
        const ssClient = await generateSatuSehat();

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
                        ]
                    }]
                }
            ],
            partOf: {
                reference: 'Organization/' + profile.rows[0].ihs_id}
        };
        const response = await ssClient.post("/Organization", organizationData)
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
        const ssClient = await generateSatuSehat();
        const getOrganization = await ssClient.get('/Organization?name=snb')
        
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
        const ssClient = await generateSatuSehat();
        const profile = await pool.query(profileQueries.getAll);
        let code = 'ro'
        let display ='Room'
        if(req.body.objectinstalasifk===2){
            code = 'wa'
            display ='Ward'
        }
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
                        code: code,
                        display: display
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
        
        const response = await ssClient.post("/Location", locationObject)
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
        const ssClient = await generateSatuSehat()
        const response = await ssClient.get(`/Practitioner?identifier=https://fhir.kemkes.go.id/id/nik|${req.body.noidentitas}`)

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
        let ssClient = await generateSatuSehat();
        let response = await ssClient.get('/Patient?identifier=https://fhir.kemkes.go.id/id/nik|'+req.body.noidentitas)
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
                ssClient = await generateSatuSehat()
                response = await ssClient.post("/Patient", patientObject)
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
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
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
        ]
    };
    return patientObject
}

async function tempEncounterTerimaDokumenRJ(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    const encounterData = {
        resourceType: "Encounter",
        id: reqTemp.ihs_dp,
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.rows[0].ihs_id,
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
            reference: "Organization/"+profile.rows[0].ihs_id
        }
    };
    
                return encounterData
}

async function tempEncounterDaftar(reqTemp) {
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
            reference: "Organization/"+profile.rows[0].ihs_id
        }
    };
    
                return encounterData
}

async function tempEncounterDaftarRI(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    let tempBaseOn=''
    // if(reqTemp.ihs_nadi!==null){
    //     tempBaseOn = {basedOn: [
    //         {
    //             reference: "ServiceRequest/1e1a260d-538f-4172-ad68-0aa5f8ccfc4a"
    //         }
    //     ]}
    // }
    const encounterData = {
        resourceType: "Encounter",
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.rows[0].ihs_id,
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
            reference: "Organization/"+profile.rows[0].ihs_id
        },
        ...tempBaseOn
    };
    
                return encounterData
}

async function tempEncounterDaftarRIMutasi(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    let tempBaseOn=''
  
    const encounterData = {
        resourceType: "Encounter",
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/"+profile.rows[0].ihs_id,
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
            reference: "Organization/"+profile.rows[0].ihs_id
        }
        // ,basedOn: [
        //             {
        //                 reference: "ServiceRequest/"+reqTemp.ihs_dp
        //             }
        //         ]
    };
    
                return encounterData
}


const upsertEncounter = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm, [req.body.norec]);

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
        } = profilePasien.rows[0];

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
            norecdp: req.body.norec,
            tglditerimapoli:tglditerimapoli,
            ihs_tempattidur:ihs_tempattidur,
            description:description,
            namakelas:namakelas,
            kelas_bpjs:kelas_bpjs,
            ihs_reference:ihs_reference
        };

        let encounter = '';
        const ssClient = generateSatuSehat()
        let response
        let isArrived = ihs_dp === null && req.body.status === 'arrived';
        const isInProgress = ihs_dp !== null && req.body.status === 'in-progress';
        if(objectinstalasifk===2){
            isArrived=true
        }
        if (isArrived) {
            if(objectinstalasifk===7){
                encounter = await tempEncounterIGD(temp);
            }else if(objectinstalasifk===1){
                encounter = await tempEncounterDaftar(temp);
            }else if(objectinstalasifk===2){
                if(req.body.statusMutasi===false){
                    encounter = await tempEncounterDaftarRI(temp);
                }else{
                    encounter = await tempEncounterDaftarRIMutasi(temp);
                    
                }
            }else{
                throw new BadRequestError('Instalasi '+objectinstalasifk+' Belum Terkirim')
            }
            let ssClient = await generateSatuSehat()
            response = await ssClient.post("/Encounter", encounter)
        } else if (isInProgress) {
            encounter = await tempEncounterTerimaDokumenRJ(temp);
            response = await ssClient.put(`/Encounter/${ihs_dp}`, encounter)
        }


        let msg = 'Sukses';

        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasiResult = '';
          
            if (response.resourceType === 'Encounter' && ihs_dp === null) {
              if (req.body.statusMutasi === true) {
                setInstalasiResult = await db.t_daftarpasien.update({ ihs_id: response.id,ihs_reference: ihs_reference}, {
                    where: { norec: req.body.norec },
                    transaction,
                  });
              }else{
                setInstalasiResult = await db.t_daftarpasien.update({ ihs_id: response.id }, {
                    where: { norec: req.body.norec },
                    transaction,
                  });
              }
            }
          
            return { setInstalasi: setInstalasiResult };
          });
          

        const tempres = {
            encounter: response,
            daftarpsien: setInstalasi,
            // dataencounter: encounter,
        };

        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message || 'Gagal',
            code: error.httpcode || 500,
            data: error,
            success: false,
        });
    }
};

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
        const ssClient = await generateSatuSehat();
        let response;
        if(req.body.ihs_diagnosa!==''){
            response = await ssClient.put('/Condition/'+req.body.ihs_diagnosa, condition)
        } else{
            response = await ssClient.post('/Condition', condition)
        }
        
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
    const diagnosa = await pool.query(satuSehatQueries.qListDiagnosa,[reqTemp.norecdp]);
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

const upsertEncounterPulang = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm,[req.body.norec]);
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
            norecdp:req.body.norec,
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
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

async function tempEncounterPulangRI(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const diagnosa = await pool.query(satuSehatQueries.qListDiagnosa,[reqTemp.norecdp]);
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

async function tempEncounterIGD(reqTemp) {
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
            reference: "Organization/"+profile.rows[0].ihs_id
        }
    };
    
                return encounterData
}

async function tempObservationNadi(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    let tempIdNadi=''
    if(reqTemp.ihs_nadi!==null){
        tempIdNadi = {'id':reqTemp.ihs_nadi}
    }
    const observationData = {
        resourceType: "Observation",
        status: "final",
        category: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "vital-signs",
                        display: "Vital Signs"
                    }
                ]
            }
        ],
        code: {
            coding: [
                {
                    system: "http://loinc.org",
                    code: "8867-4",
                    display: "Heart rate"
                }
            ]
        },
        subject: {
            reference: "Patient/"  + reqTemp.ihs_id,
        },
        performer: [
            {
                reference: "Practitioner/"+reqTemp.ihs_dpjp,
            }
        ],
        encounter: {
            reference: "Encounter/"+reqTemp.ihs_dp,
            display: "Pemeriksaan Fisik Nadi "+reqTemp.namapasien
        },
        effectiveDateTime: reqTemp.datenow,
        issued: reqTemp.datenow,
        valueQuantity: {
            value: reqTemp.nilai,
            unit: "beats/minute",
            system: "http://unitsofmeasure.org",
            code: "/min"
        },
        interpretation: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                        code: reqTemp.codenadi,
                        display: reqTemp.displaynadi
                    }
                ],
                text: reqTemp.teksnadi
            }
        ],
        ...tempIdNadi
    };
    return observationData
}

async function tempObservationPernafasan(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    let tempIdNadi=''
    if(reqTemp.ihs_pernafasan!==null){
        tempIdNadi = {'id':reqTemp.ihs_pernafasan}
    }
    const observationData = {
        resourceType: "Observation",
        status: "final",
        category: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "vital-signs",
                        display: "Vital Signs"
                    }
                ]
            }
        ],
        code: {
            coding: [
                {
                    system: "http://loinc.org",
                    code: "9279-1",
                    display: "Respiratory rate"
                }
            ]
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
        },
        performer: [
            {
                reference: "Practitioner/"+reqTemp.ihs_dpjp,
            }
        ],
        encounter: {
            reference: "Encounter/"+reqTemp.ihs_dp,
            display: "Pemeriksaan Fisik Pernafasan "+reqTemp.namapasien
        },
        effectiveDateTime: reqTemp.datenow,
        issued: reqTemp.datenow,
        valueQuantity: {
            value: reqTemp.nilai,
            unit: "beats/minute",
            system: "http://unitsofmeasure.org",
            code: "/min"
        },
        interpretation: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                        code: reqTemp.codepernapasan,
                        display: reqTemp.displaypernapasan
                    }
                ],
                text: reqTemp.tekspernapasan
            }
        ],
        ...tempIdNadi
    };
                return observationData
}

async function tempObservationSuhu(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    let tempIdNadi=''
    if(reqTemp.ihs_suhu!==null){
        tempIdNadi = {'id':reqTemp.ihs_suhu}
    }
    const observationData = {
        resourceType: "Observation",
        status: "final",
        category: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "vital-signs",
                        display: "Vital Signs"
                    }
                ]
            }
        ],
        code: {
            coding: [
                {
                    system: "http://loinc.org",
                    code: "8310-5",
                    display: "Body temperature"
                }
            ]
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
        },
        performer: [
            {
                reference: "Practitioner/"+reqTemp.ihs_dpjp,
            }
        ],
        encounter: {
            reference: "Encounter/"+reqTemp.ihs_dp,
            display: "Pemeriksaan Fisik Suhu "+reqTemp.namapasien
        },
        effectiveDateTime: reqTemp.datenow,
        issued: reqTemp.datenow,
        valueQuantity: {
            value: reqTemp.nilai,
            unit: "C",
            system: "http://unitsofmeasure.org",
            code: "Cel"
        },
        interpretation: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                        code: reqTemp.codesuhu,
                        display: reqTemp.displaysuhu
                    }
                ],
                text: reqTemp.tekssuhu
            }
        ],
        ...tempIdNadi
    };
                return observationData
}

async function tempObservationSistole(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    let tempIdNadi=''
    if(reqTemp.ihs_sistole!==null){
        tempIdNadi = {'id':reqTemp.ihs_sistole}
    }
    const observationData = {
        resourceType: "Observation",
        status: "final",
        category: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "vital-signs",
                        display: "Vital Signs"
                    }
                ]
            }
        ],
        code: {
            coding: [
                {
                    system: "http://loinc.org",
                    code: "8480-6",
                    display: "Systolic blood pressure"
                }
            ]
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
        },
        performer: [
            {
                reference: "Practitioner/"+reqTemp.ihs_dpjp,
            }
        ],
        encounter: {
            reference: "Encounter/"+reqTemp.ihs_dp,
            display: "Pemeriksaan Fisik Sistolik "+reqTemp.namapasien
        },
        effectiveDateTime: reqTemp.datenow,
        issued: reqTemp.datenow,
        bodySite: {
            coding: [
                {
                    system: "http://snomed.info/sct",
                    code: "368209003",
                    display: "Right arm"
                }
            ]
        },
        valueQuantity: {
            value: reqTemp.nilai,
            unit: "mm[Hg]",
            system: "http://unitsofmeasure.org",
            code: "mm[Hg]"
        },
        interpretation: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                        code: reqTemp.codesistol,
                        display: reqTemp.displaysistol
                    }
                ],
                text: reqTemp.tekssistol
            }
        ],
        ...tempIdNadi
    };
                return observationData
}

async function tempObservationDiastole(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    let tempIdNadi=''
    if(reqTemp.ihs_diastole!==null){
        tempIdNadi = {'id':reqTemp.ihs_diastole}
    }
    const observationData = {
        resourceType: "Observation",
        status: "final",
        category: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "vital-signs",
                        display: "Vital Signs"
                    }
                ]
            }
        ],
        code: {
            coding: [
                {
                    system: "http://loinc.org",
                    code: "8462-4",
                    display: "Diastolic blood pressure"
                }
            ]
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
        },
        performer: [
            {
                reference: "Practitioner/"+reqTemp.ihs_dpjp,
            }
        ],
        encounter: {
            reference: "Encounter/"+reqTemp.ihs_dp,
            display: "Pemeriksaan Fisik Diastolik "+reqTemp.namapasien
        },
        effectiveDateTime: reqTemp.datenow,
        issued: reqTemp.datenow,
        bodySite: {
            coding: [
                {
                    system: "http://snomed.info/sct",
                    code: "368209003",
                    display: "Right arm"
                }
            ]
        },
        valueQuantity: {
            value: reqTemp.nilai,
            unit: "mm[Hg]",
            system: "http://unitsofmeasure.org",
            code: "mm[Hg]"
        },
        interpretation: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                        code: reqTemp.codediastol,
                        display: reqTemp.displaydiastol
                    }
                ],
                text: reqTemp.teksdiastol
            }
        ],
        ...tempIdNadi
    };
                return observationData
}

async function tempObservationKesadaran(reqTemp) {
    const profile = await pool.query(profileQueries.getAll);
    const currentDate = new Date();
    let tempIdNadi=''
    if(reqTemp.ihs_kesadaran!==null){
        tempIdNadi = {'id':reqTemp.ihs_kesadaran}
    }
    const observationData = {
        resourceType: "Observation",
        status: "final",
        category: [
            {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "exam",
                        display: "Exam"
                    }
                ]
            }
        ],
        code: {
            coding: [
                {
                    system: "http://loinc.org",
                    code: "67775-7",
                    display: "Level of responsiveness"
                }
            ]
        },
        subject: {
            reference: "Patient/"+reqTemp.ihs_id,
        },
        performer: [
            {
                reference: "Practitioner/"+reqTemp.ihs_dpjp,
            }
        ],
        encounter: {
            reference: "Encounter/"+reqTemp.ihs_dp,
            display: "Pemeriksaan Kesadaran "+reqTemp.namapasien
        },
        effectiveDateTime: reqTemp.datenow,
        issued: reqTemp.datenow,
        bodySite: {
            coding: [
                {
                    system: "http://snomed.info/sct",
                    code: reqTemp.ihs_observationcodecoding,
                    display: reqTemp.ihs_observationcodecodingdisplay
                }
            ]
        },
        ...tempIdNadi
    };
                return observationData
}

const upsertObservation = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const currentDate = await getCurrentDateAsync();
        const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm, [req.body.norecdp]);
        const dataTTV = await pool.query(satuSehatQueries.qDataTTVByNorec, [req.body.norec]);
        const resdataTTV = await dataTTV.rows[0];
        const patientData =await profilePasien.rows[0];
        const temp = {
            ihs_dp: patientData.ihs_dp,
            ihs_id: patientData.ihs_pasien,
            namapasien: patientData.namapasien,
            noregistrasi: patientData.noregistrasi,
            tglpulang: patientData.tglpulang,
            ihs_unit: patientData.ihs_unit,
            tglditerimapoli: patientData.tglditerimapoli,
            ihs_dpjp: patientData.ihs_dpjp,
            namadokter: patientData.namadokter,
            tglregistrasi_ihs: patientData.tglregistrasi_ihs,
            norecdp: req.body.norecdp,
            tglditerimapoli: patientData.tglditerimapoli,
            datenow: currentDate,//patientData.datenow,
            nilai: parseFloat(req.body.nilai),
            ihs_nadi: req.body.ihs_nadi,
            ihs_pernafasan: req.body.ihs_pernafasan,
            ihs_suhu: req.body.ihs_suhu,
            ihs_sistole:req.body.ihs_sistole,
            ihs_diastole:req.body.ihs_diastole,
            codenadi:resdataTTV.codenadi,
            displaynadi:resdataTTV.displaynadi,
            teksnadi:resdataTTV.teksnadi,
            codepernapasan:resdataTTV.codepernapasan,
            displaypernapasan:resdataTTV.displaypernapasan,
            tekspernapasan:resdataTTV.tekspernapasan,
            codesuhu:resdataTTV.codesuhu,
            displaysuhu:resdataTTV.displaysuhu,
            tekssuhu:resdataTTV.tekssuhu,
            codesistol:resdataTTV.codesistol,
            displaysistol:resdataTTV.displaysistol,
            tekssistol:resdataTTV.tekssistol,
            codediastol:resdataTTV.codediastol,
            displaydiastol:resdataTTV.displaydiastol,
            teksdiastol:resdataTTV.teksdiastol,
            ihs_observationcodecoding:resdataTTV.ihs_observationcodecoding,
            ihs_observationcodecodingdisplay:resdataTTV.ihs_observationcodecodingdisplay,
            ihs_kesadaran:resdataTTV.ihs_kesadaran
        };

        let url = '/Observation';
        let method = 'POST';
        let observation = '';
        let ssClient = await generateSatuSehat()
        let response

        if (req.body.status === 'nadi') {
            observation = await tempObservationNadi(temp);
            if(req.body.ihs_nadi !== null){
                response = await ssClient.put(`/Observation/${req.body.ihs_nadi}`, observation)
            }
        } else if (req.body.status === 'pernafasan') {
            observation = await tempObservationPernafasan(temp);
            if(req.body.ihs_pernafasan !== null){
                response = await ssClient.put(`/Observation/${req.body.ihs_pernafasan}`, observation)
            }
        } else if (req.body.status === 'suhu') {
            observation = await tempObservationSuhu(temp);
            if(req.body.ihs_suhu !== null){
                response = await ssClient.put( `/Observation/${req.body.ihs_suhu}`, observation)
            }
        } else if (req.body.status === 'sistole') {
            observation = await tempObservationSistole(temp);
            if(req.body.ihs_sistole !== null){
                response = await ssClient.put(`/Observation/${req.body.ihs_sistole}`, observation)
            }
        } else if (req.body.status === 'diastole') {
            observation = await tempObservationDiastole(temp);
            if(req.body.ihs_diastole !== null){
                response = await ssClient.put(`/Observation/${req.body.ihs_diastole}`, observation)
            }
        } else if (req.body.status === 'kesadaran') {
            observation = await tempObservationKesadaran(temp);
            if(req.body.ihs_kesadaran !== null){
                response = await ssClient.put(`/Observation/${req.body.ihs_kesadaran}`, observation)
            }
        } else {
            response = await ssClient.post("/Observation", observation)
        }
        
        const setInstalasi = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = '';
            if (response && response.resourceType === 'Observation') {
                if (req.body.status === 'nadi') {
                    setInstalasi = await db.t_ttv.update({ ihs_nadi: response.id,status_ihs_nadi:true }, { where: { norec: req.body.norec }, transaction });
                } else if (req.body.status === 'pernafasan') {
                    setInstalasi = await db.t_ttv.update({ ihs_pernapasan: response.id,status_ihs_pernapasan:true }, { where: { norec: req.body.norec }, transaction });
                } else if (req.body.status === 'suhu') {
                    setInstalasi = await db.t_ttv.update({ ihs_suhu: response.id,status_ihs_suhu:true }, { where: { norec: req.body.norec }, transaction });
                } else if (req.body.status === 'sistole') {
                    setInstalasi = await db.t_ttv.update({ ihs_sistole: response.id,status_ihs_sistole:true }, { where: { norec: req.body.norec }, transaction });
                } else if (req.body.status === 'diastole') {
                    setInstalasi = await db.t_ttv.update({ ihs_diastole: response.id,status_ihs_diastole:true }, { where: { norec: req.body.norec }, transaction });
                } else if (req.body.status === 'kesadaran') {
                    setInstalasi = await db.t_ttv.update({ ihs_kesadaran: response.id,status_ihs_kesadaran:true }, { where: { norec: req.body.norec }, transaction });
                }
            }
            return setInstalasi;
        });

        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: { observation, instalasi: setInstalasi },
            success: true,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false,
        });
    }
};

const getListKamar = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const unit = await pool.query(kamarQueries.qGetKamarIhs)
       
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

const updateLocationKamar = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const profile = await pool.query(profileQueries.getAll);
        let code = 'ro'
        let display ='Room'
      
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
            type: [
                {
                    coding: [
                        {
                            system: "http://terminology.kemkes.go.id/CodeSystem/location-type",
                            code: "RT0016",
                            display: "Ruang Rawat Inap"
                        }
                    ]
                }
            ],
            physicalType: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/location-physical-type",
                        code: code,
                        display: display
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
            },
            extension: [
                {
                    url: "https://fhir.kemkes.go.id/r4/StructureDefinition/LocationServiceClass",
                    valueCodeableConcept: {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Inpatient",
                                code: req.body.codekelas,
                                display: req.body.displaykelas
                            }
                        ]
                    }
                }
            ],
            partOf: {
                reference: "Location/"+req.body.ihs_unit,
                display: req.body.namaunit
             }
        };
        
        const ssClient = await generateSatuSehat();
        const response = await ssClient.post('/Location', locationObject)
        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = ''
                setInstalasi = await db.m_kamar.update({
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

const getListTempatTidur = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const unit = await pool.query(tempattidurQueries.qGetTempatTidurIHS)
       
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

const upsertLocationTempatTidur = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const profile = await pool.query(profileQueries.getAll);
        let code = 'ro'
        let display ='Room'
      
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
            type: [
                {
                    coding: [
                        {
                            system: "http://terminology.kemkes.go.id/CodeSystem/location-type",
                            code: "RT0004",
                            display: "Tempat Tidur"
                        }
                    ]
                }
            ],
            physicalType: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/location-physical-type",
                        code: code,
                        display: display
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
            },
            extension: [
                {
                    url: "https://fhir.kemkes.go.id/r4/StructureDefinition/LocationServiceClass",
                    valueCodeableConcept: {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Inpatient",
                                code: req.body.codekelas,
                                display: req.body.displaykelas
                            }
                        ]
                    }
                }
            ],
            partOf: {
                reference: "Location/"+req.body.ihs_unit,
                display: req.body.namaunit
             }
        };
        
        const ssClient = await generateSatuSehat('POST', '/Location', locationObject);
        const response = await ssClient.post("/Location", locationObject)
        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = ''
                setInstalasi = await db.m_tempattidur.update({
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
            tempattidur:setInstalasi,
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
        res.status(500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

async function tempProcedure(reqTemp) {
    let procedureData = {
        resourceType: "Procedure",
        status: "completed",
        category: {
            coding: [
                {
                    system: "http://snomed.info/sct",
                    code: "103693007",
                    display: "Diagnostic procedure"
                }
            ],
            text: "Diagnostic procedure"
        },
        code: {
            coding: [{
                    system: "http://hl7.org/fhir/sid/icd-9-cm",
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
            reference: "Encounter/"+reqTemp.ihs_dp,
            display: "Tindakan Pasien "+reqTemp.namapasien
        },
        performedPeriod: {
            start: reqTemp.datenow,
            end: reqTemp.datenow
        },
        performer: [{
                actor: {
                    reference: "Practitioner/"+reqTemp.ihs_dokter
                }
            }
        ],
        reasonCode: [{
                coding: [
                    {
                        system: "http://hl7.org/fhir/sid/icd-10",
                        code: reqTemp.diagnosa10,
                        display: reqTemp.labeldiagnosa10
                    }
                ]
            }
        ],
        // bodySite: [
        //     {
        //         coding: [
        //             {
        //                 system: "http://snomed.info/sct",
        //                 code: "302551006",
        //                 display: "Entire Thorax"
        //             }
        //         ]
        //     }
        // ],
        note: [
            {
                text: reqTemp.keteranganicd9
            }
        ]
    };    
    if(reqTemp.codestatus!=='active'){
        procedureData = {
            resourceType: "Procedure",
            id: reqTemp.ihs_diagnosa,
            status: "inactive",
            category: {
                coding: [
                    {
                        system: "http://snomed.info/sct",
                        code: "103693007",
                        display: "Diagnostic procedure"
                    }
                ],
                text: "Diagnostic procedure"
            },
            code: {
                coding: [
                    {
                        system: "http://hl7.org/fhir/sid/icd-9-cm",
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
                reference: "Encounter/"+reqTemp.ihs_dp,
                display: "Tindakan Pasien "+reqTemp.namapasien
            },
            performedPeriod: {
                start: reqTemp.datenow,
                end: reqTemp.datenow
            },
            performer: [
                {
                    actor: {
                        reference: "Practitioner/"+reqTemp.ihs_dokter
                    }
                }
            ],
            reasonCode: [
                {
                    coding: [
                        {
                            system: "http://hl7.org/fhir/sid/icd-10",
                            code: reqTemp.diagnosa10,
                            display: reqTemp.labeldiagnosa10
                        }
                    ]
                }
            ],
            note: [
                {
                    text: reqTemp.keteranganicd9
                }
            ]
        }; 
    }
                return procedureData
}

const upsertProcedure = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const currentDate = await getCurrentDateAsync();
        const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDp,[req.body.norecdp]);
        const diagnosa10 = await pool.query(satuSehatQueries.qDiagnosaPrimary,[req.body.norecdp]);

        let temp ={
            codestatus:req.body.codestatus,
            displaystatus:req.body.displaystatus,
            ihs_diagnosa:req.body.ihs_diagnosa,
            codekodediagnosa:req.body.codekodediagnosa,
            namakodediagnosa:req.body.namakodediagnosa,
            ihs_dokter:req.body.ihs_dokter,
            keteranganicd9:req.body.keteranganicd9,
            ihs_dp:profilePasien.rows[0].ihs_dp,
            ihs_pasien:profilePasien.rows[0].ihs_pasien,
            namapasien:profilePasien.rows[0].namapasien,
            diagnosa10:diagnosa10.rows[0].kodediagnosa,
            labeldiagnosa10:diagnosa10.rows[0].label,
            datenow: currentDate,
        }
        const condition = await tempProcedure(temp)
        const ssClient = await generateSatuSehat()

        let response

        if(req.body.ihs_diagnosa!==''){
            response = await ssClient.put('/Procedure/'+req.body.ihs_diagnosa, condition)
        } else {
            response = await ssClient.post("/Procedure", condition)
        }
        
        const { setInstalasi } = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = ''
            if(req.body.codestatus==='active'){
                if(response.resourceType==='Procedure'){
                    setInstalasi = await db.t_diagnosatindakan.update({
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
            datacondition:condition
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

async function tempKeluhanUtama(reqTemp) {
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
                    "system": "http://snomed.info/sct",
                    "code": reqTemp.code,
                    "display": reqTemp.display
                }
            ]
        },
        "recordedDate": reqTemp.tglinput_ihs,
        "subject": {
            "reference": "Patient/"+reqTemp.ihs_id,
            // "display": "Budi Santoso"
        },
        "encounter": {
            "reference": "Encounter/"+reqTemp.ihs_dp,
            // "display": "Kunjungan Budi Santoso di tanggakl 14 Juli 2023"
        },
        ...tempIdNadi
    };
        
    return conditionData
}

const upsertConditionV2 = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const currentDate = await getCurrentDateAsync();
        const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm, [req.body.norecdp]);
        const patientData =await profilePasien.rows[0];
        const temp = {
            ihs_dp: patientData.ihs_dp,
            ihs_id: patientData.ihs_pasien,
            namapasien: patientData.namapasien,
            noregistrasi: patientData.noregistrasi,
            tglpulang: patientData.tglpulang,
            ihs_unit: patientData.ihs_unit,
            tglditerimapoli: patientData.tglditerimapoli,
            ihs_dpjp: patientData.ihs_dpjp,
            namadokter: patientData.namadokter,
            tglregistrasi_ihs: patientData.tglregistrasi_ihs,
            norecdp: req.body.norecdp,
            tglditerimapoli: patientData.tglditerimapoli,
            datenow: currentDate,//patientData.datenow,
            code: req.body.code,
            display: req.body.display,
            ihs_keluhan: req.body.ihs_keluhan,
            tglinput_ihs:req.body.tglinput_ihs
        };
        let response
        let observation = '';
        const ssClient = await generateSatuSehat()
        if (req.body.status === 'keluhanutama' && req.body.ihs_keluhan) {
            observation = await tempKeluhanUtama(temp);
            response = await ssClient.put(`/Condition/${req.body.ihs_keluhan}`, observation)
        } else {
            response = await ssClient.post(`/Condition`, observation)
        }

        const setInstalasi = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = '';
            if (response.resourceType === 'Condition') {
                if (req.body.status === 'keluhanutama') {
                    setInstalasi = await db.t_pengkajianawalkeperawatan.update({ ihs_keluhan: response.id,status_ihs_keluhan:true }, { where: { norec: req.body.norec }, transaction });
                }
            }
            return setInstalasi;
        });
        
        const tempres = {
            observation:response,
            pengkajian:setInstalasi
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

async function tempAlergi(reqTemp) {
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
            "food"
        ],
        code: {
            coding: [
                {
                    system: "http://snomed.info/sct",
                    code: reqTemp.code,
                    display: reqTemp.display
                }
            ],
            text: reqTemp.displayalergi
        },
        patient: {
            reference: "Patient/"+reqTemp.ihs_id,
            // display: "Diana Smith"
        },
        encounter: {
            reference: "Encounter/"+reqTemp.ihs_dp,
            // display: "Kunjungan Diana Smith tanggal 4 Juli 2023"
        },
        recordedDate:reqTemp.tglinput_ihs,
        recorder: {
            reference: "Practitioner/"+reqTemp.ihs_dpjp
        },
        ...tempIdNadi
    };
    return allergyIntoleranceData
}

const upsertAllergyIntolerance = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const currentDate = await getCurrentDateAsync();
        const profilePasien = await pool.query(satuSehatQueries.qGetDataPasienByNorecDpTrm, [req.body.norecdp]);
        const patientData =await profilePasien.rows[0];
        const temp = {
            ihs_dp: patientData.ihs_dp,
            ihs_id: patientData.ihs_pasien,
            namapasien: patientData.namapasien,
            noregistrasi: patientData.noregistrasi,
            tglpulang: patientData.tglpulang,
            ihs_unit: patientData.ihs_unit,
            tglditerimapoli: patientData.tglditerimapoli,
            ihs_dpjp: patientData.ihs_dpjp,
            namadokter: patientData.namadokter,
            tglregistrasi_ihs: patientData.tglregistrasi_ihs,
            norecdp: req.body.norecdp,
            tglditerimapoli: patientData.tglditerimapoli,
            datenow: currentDate,//patientData.datenow,
            code: req.body.code,
            display: req.body.display,
            ihs_alergi: req.body.ihs_alergi,
            tglinput_ihs:req.body.tglinput_ihs
        };
        const ssClient = await generateSatuSehat()
        let observation = await tempAlergi(temp);
        let response
        if(req.body.ihs_alergi !== null){
            response = await ssClient.put(`/AllergyIntolerance/${req.body.ihs_alergi}`, observation )
        } else {
            response = await ssClient.post('/AllergyIntolerance', observation)
        }

        const setInstalasi = await db.sequelize.transaction(async (transaction) => {
            let setInstalasi = '';
            if (response.resourceType === 'AllergyIntolerance') {
                setInstalasi = await db.t_pengkajianawalkeperawatan.update({ ihs_alergi: response.id,status_ihs_alergi:true }, { where: { norec: req.body.norec }, transaction });
            }
            return setInstalasi;
        });
        
        const tempres = {
            alergi:response,
            pengkajian:setInstalasi
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
    upsertEncounterPulang,
    upsertObservation,
    getListKamar,
    updateLocationKamar,
    getListTempatTidur,
    upsertLocationTempatTidur,
    upsertProcedure,
    upsertConditionV2,
    upsertAllergyIntolerance
}