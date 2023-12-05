import pool from "../../../config/dbcon.query";
import db from "../../../models";
import instalasiQueries from "../../../queries/mastertable/instalasi/instalasi.queries";
import unitQueries from "../../../queries/mastertable/unit/unit.queries";
import profileQueries from "../../../queries/mastertable/profile/profile.queries";
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
            code:error.response.status,
            message:error.response.statusText,
            data:error.response.data
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
            identifier: [
                {
                    use: 'official',
                    system: 'http://sys-ids.kemkes.go.id/organization/753587cb-d598-4923-8843-29c7ed4ab797',
                    value: String(req.body.id)
                }
            ],
            type: [
                {
                    coding: [
                        {
                            system: 'http://terminology.hl7.org/CodeSystem/organization-type',
                            code: 'dept',
                            display: 'Hospital Department'
                        }
                    ]
                }
            ],
            name: req.body.label,
            telecom: [
                {
                    system: 'phone',
                    value: profile.rows[0].fixedphone,
                    use: 'work'
                },
                {
                    system: 'email',
                    value: profile.rows[0].alamatemail,
                    use: 'work'
                },
                {
                    system: 'url',
                    value: profile.rows[0].website,
                    use: 'work'
                }
            ],
            address: [
                {
                    use: 'work',
                    type: 'both',
                    line: [profile.rows[0].alamatlengkap],
                    city: 'Jakarta',
                    postalCode: profile.rows[0].kodepos,
                    country: 'ID',
                    extension: [
                        {
                            url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode',
                            extension: [
                                {
                                    url: 'province',
                                    valueCode: profile.rows[0].kodeprovinsi
                                },
                                {
                                    url: 'city',
                                    valueCode: profile.rows[0].kodekabupaten
                                },
                                {
                                    url: 'district',
                                    valueCode: profile.rows[0].kodekecamatan
                                },
                                {
                                    url: 'village',
                                    valueCode: profile.rows[0].kodedesa
                                }
                            ]
                        }
                    ]
                }
            ],
            partOf: {
                reference: 'Organization/' + profile.rows[0].ihs_id
            }
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

export default {
    getListInstalasi,
    updateOrganizationInstalasi,
    getOrganizationInstalasi,
    getListUnit,
    updateLocationUnit
}