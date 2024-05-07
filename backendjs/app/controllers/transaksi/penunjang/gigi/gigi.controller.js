import gigiAPI from "sharedjs/src/gigi/gigiAPI";
import db from "../../../../models";
import {qGetAllGigi, qGetAllKondisiGigi, qGetAllOdontogramDetail} from "../../../../queries/penunjang/gigi/gigi.queries";
import queryTypes from "sequelize/lib/query-types";
import * as uuid from "uuid";


const getAllGigi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const allGigi = await db.sequelize.query(qGetAllGigi, {
            type: queryTypes.SELECT,
        })
        const tempres = {
            allGigi: allGigi
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}

const getAllLegendGigi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let allLegendGigi = await db.sequelize.query(qGetAllKondisiGigi, {
            type: queryTypes.SELECT
        })

        const tempres = {...gigiAPI.rGetAllLegendGigi};
        tempres.allLegendGigi = allLegendGigi
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}

const upsertOdontogram = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let body = gigiAPI.bUpsertOdontogramDetail
        body = req.body
        let tempres = gigiAPI.rUpsertOdontogramDetail
        await db.sequelize.transaction(async (transaction) => {
            let norecodontogram = body.norecodontogram
            let modelOdontogram = null
            if(norecodontogram){
                modelOdontogram = await db.t_odontogram.findByPk(norecodontogram, {
                    transaction: transaction
                })
            }else{
                norecodontogram = uuid.v4().substring(0, 32);
                modelOdontogram = await db.t_odontogram.create({
                    norec: norecodontogram,
                    statusenabled: true,
                    objectantreanpemeriksaanfk: body.norecap,
                    tglinput: new Date(),
                    objectpegawaifk: req.idPegawai,
                }, {
                    transaction: transaction
                })
            }
            const allPrevDetail = await db.t_odontogramdetail.findAll({
                where: {
                    objectodontogramfk: norecodontogram
                },
                transaction: transaction
            })
            await Promise.all(
                allPrevDetail.map(async (model) => {
                    await model.destroy({transaction: transaction})
                })
            )
            const allDetail = await Promise.all(
                body.kondisiGigi.map(async (kondisi) => {
                    const norec = uuid.v4().substring(0, 32);
                    const createdData = await db.t_odontogramdetail.create({
                        norec: norec,
                        objectodontogramfk: norecodontogram,
                        objectgigifk: kondisi.gigi,
                        lokasi: kondisi.lokasi,
                        objectlegendgigifk: kondisi.kondisi,
                        objectgigitujuanfk: kondisi.gigiTujuan
                    }, {
                        transaction: transaction
                    })
                    return createdData.toJSON()
                })
            )

            tempres.allDetail = allDetail
            tempres.odontogram = modelOdontogram.toJSON()
        });

        res.status(200).send({
            msg: 'Sukses',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message || 'Gagal',
            code: 500,
            data: error,
            success: false
        });
    }
}

const getOdontogram = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { norecap, norecodontogram } = req.query
        let tempres = {...gigiAPI.rGetOdontogram}
        const kondisiData = await db.sequelize.query(qGetAllOdontogramDetail, {
            replacements: {
                norecap: norecap,
                norecodontogram: norecodontogram
            },
            type: queryTypes.SELECT
        })
        tempres.kondisiGigi = kondisiData // perlu diproses di frontend untuk index gigi
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(error.httpcode || 500).send({
            msg: error.message,
            code: error.httpcode || 500,
            data: error,
            success: false
        });
    }
}



export default {
    getAllGigi,
    getAllLegendGigi,
    upsertOdontogram,
    getOdontogram
}