import pool from "../../../config/dbcon.query";
import {
    qGetAllKamar,
    qGetAllUnit,
    qGetTempatTidur,
    qGetUnitTempatTidur,
    qRoles,
    statusBed
} from "../../../queries/sysadmin/sysadmin.queries";
import db from "../../../models";
import { getDateStartEnd } from "../../../utils/dateutils";
import { groupBy } from "../../../utils/arutils";
import unitQueries from "../../../queries/master/unit/unit.queries";
import kelasQueries from "../../../queries/master/kelas/kelas.queries";
import kamarQueries from "../../../queries/master/kamar/kamar.queries";
import instalasiQueries from "../../../queries/master/instalasi/instalasi.queries";
import statusbedQueries from "../../../queries/master/statusbed/statusbed.queries";



const getTempatTidur = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const statusRusak = (await pool.query(qGetTempatTidur, [statusBed.RUSAK]))
            .rows[0]
            ?.total || 0;
        const statusIsi = (await pool.query(qGetTempatTidur, [statusBed.ISI]))
            .rows[0]
            ?.total || 0;
        const statusKosong = (await pool.query(qGetTempatTidur, [statusBed.KOSONG]))
            .rows[0]
            ?.total || 0;
        const tempres = {
            statusRusak: Number(statusRusak),
            statusIsi: Number(statusIsi),
            statusKosong: Number(statusKosong),
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const getUnitTempatTidur = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const {
            unit,
            kelas
        } = req.query;
        const kamars = (await pool.query(qGetUnitTempatTidur, [unit, kelas]))
        const tempres = {
            kamars: kamars.rows,
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const getComboTempatTidur = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const unit = (await pool.query(unitQueries.getRawatInap)).rows;
        const kelas = (await pool.query(kelasQueries.getAll)).rows;
        const kamar = (await pool.query(kamarQueries.getAll)).rows;
        const statusBed = (await pool.query(statusbedQueries.getAll)).rows;
        const tempres = {
            unit: unit,
            kelas: kelas,
            kamar: kamar,
            statusBed: statusBed
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const upsertTempatTidur = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const bodyReq = req.body
        const { ttData } = await db.sequelize.transaction(async (transaction) => {
            let ttData = null
            const ttModel = await db.m_tempattidur.findOne({
                where: {
                    id: bodyReq.id
                }
            })
            if (!ttModel) {
                const created = await db.m_tempattidur.create({
                    statusenabled: true,
                    reportdisplay: bodyReq.kamar + ' - ' + bodyReq.nobed,
                    objectkamarfk: bodyReq.kamar,
                    objectstatusbedfk: bodyReq.status,
                    nomorbed: bodyReq.nobed,
                    objectruangperawatankemenkesfk: null,
                    idttsirs: null,
                    idkelassirs: null,
                }, {
                    transaction
                })
                ttData = created.toJSON()
            } else {
                await ttModel.update({
                    statusenabled: true,
                    reportdisplay: bodyReq.kamar + ' - ' + bodyReq.nobed,
                    objectkamarfk: bodyReq.kamar,
                    objectstatusbedfk: bodyReq.status,
                    nomorbed: bodyReq.nobed,
                    objectruangperawatankemenkesfk: null,
                    idttsirs: null,
                    idkelassirs: null,
                }, {
                    transaction
                })
                ttData = ttModel.toJSON()
            }
            return {
                ttData
            }
        });

        const tempres = {
            ttData: ttData
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const getAllUnit = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { instalasi } = req.query;
        const unit = (await pool.query(qGetAllUnit, [instalasi || ''])).rows;

        const tempres = {
            unit: unit
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const getComboDaftarUnit = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const instalasi = await pool.query(instalasiQueries.getAll)
        const tempres = {
            instalasi: instalasi.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const upsertUnit = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const reqBody = req.body
        const { unit } =
            await db.sequelize.transaction(async (transaction) => {
                let unitData = null
                if (!reqBody.idunit) {
                    const created = await db.m_unit.create({
                        kdprofile: 0,
                        statusenabled: true,
                        kodeexternal: null,
                        namaexternal: reqBody.namaunit,
                        reportdisplay: reqBody.namaunit,
                        objectinstalasifk: reqBody.instalasi,
                        namaunit: reqBody.namaunit,
                    }, {
                        transaction: transaction
                    })
                    await created.update({
                        kodeexternal: `${created.toJSON().id}`
                    }, {
                        transaction: transaction
                    })
                    unitData = created.toJSON()
                } else {
                    const unit = await db.m_unit.findOne({
                        where: {
                            id: reqBody.idunit
                        },
                        transaction: transaction
                    })
                    await unit.update({
                        kdprofile: 0,
                        statusenabled: reqBody.statusenabled,
                        namaexternal: reqBody.namaunit,
                        reportdisplay: reqBody.namaunit,
                        objectinstalasifk: reqBody.instalasi,
                        namaunit: reqBody.namaunit,
                    }, {
                        transaction: transaction
                    })
                    unitData = unit.toJSON()
                }
                return {
                    unit: unitData
                }
            });

        const tempres = {
            unit
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const getComboDaftarKamar = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const unit = (await pool.query(unitQueries.getRawatInap)).rows;
        const kelas = (await pool.query(kelasQueries.getAll)).rows;
        const instalasi = (await pool.query(instalasiQueries.getAll)).rows;
        const tempres = {
            unit,
            kelas,
            instalasi
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const getAllKamar = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { kelas, unit, kamar: qKamar } = req.query;
        const kamar = (await pool.query(qGetAllKamar, [
            unit || '',
            kelas || '',
            qKamar || ''
        ])).rows
        const tempres = {
            kamar: kamar
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const upsertKamar = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const reqBody = req.body
        const {dataKamar} = await db.sequelize.transaction(async (transaction) => {
            let dataKamar = null
            if(reqBody.idkamar){
                const kamarModel = await db.m_kamar.findOne({
                    where: {
                        id: reqBody.idkamar
                    }
                })
                if(!kamarModel){
                    throw new Error("Kamar tidak ditemukan")
                }
                await kamarModel.update({
                    statusenabled: reqBody.statusenabled,
                    namaexternal: reqBody.namakamar,
                    reportdisplay: reqBody.namakamar,
                    objectkelasfk: reqBody.kelas,
                    objectunitfk: reqBody.unit,
                    namakamar: reqBody.namakamar,
                    tglupdate: new Date()
                }, {
                    transaction: transaction
                })
                dataKamar = kamarModel.toJSON()
            }else{
                const created = await db.m_kamar.create({
                    kdprofile: 0,
                    statusenabled: reqBody.statusenabled,
                    namaexternal: reqBody.namakamar,
                    reportdisplay: reqBody.namakamar,
                    objectkelasfk: reqBody.kelas,
                    objectunitfk: reqBody.unit,
                    namakamar: reqBody.namakamar,
                    qtybed: 0,
                    jumlahbedisi: 0,
                    jumlahbedkosong: 0,
                    keterangan: null,
                    objectprodukfk: null,
                    objectruangperawatankemenkesfk: null,
                    tglupdate: new Date(),
                    produkfk: null,
                }, {
                    transaction: transaction
                })
                dataKamar = created.toJSON()
            }
            return {
                dataKamar: dataKamar
            }
        });
        
        const tempres = {
            dataKamar: dataKamar
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const getComboSysadmin = async (req, res) => {
    const logger = res.locals.logger;
    try {

        const result1 = await pool.query(qRoles, [req.query.cari || ''])

        const tempres = {
            role: result1.rows
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
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

const saveRoles = async (req, res) => {
    const logger = res.locals.logger;
    try {
        const { setRole } = await db.sequelize.transaction(async (transaction) => {
            let setRole = ''
            setRole = await db.role.create({
                name: req.query.nameRole,
            }, { transaction });

            return { setRole }
        });

        // const tempres = {

        // };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: setRole,
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
export default {
    getTempatTidur,
    getUnitTempatTidur,
    getComboTempatTidur,
    upsertTempatTidur,
    getAllUnit,
    getComboDaftarUnit,
    upsertUnit,
    getAllKamar,
    getComboDaftarKamar,
    getComboSysadmin,
    saveRoles,
    upsertKamar
}