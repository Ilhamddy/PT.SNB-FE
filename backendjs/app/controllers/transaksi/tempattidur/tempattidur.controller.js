import pool from "../../../config/dbcon.query";
import { 
    qGetTempatTidur, 
    qGetUnitTempatTidur, 
    statusBed 
} from "../../../queries/tempattidur/tempattidur.queries";
import db from "../../../models";
import { getDateStartEnd } from "../../../utils/dateutils";
import { groupBy } from "../../../utils/arutils";
import unitQueries from "../../../queries/master/unit/unit.queries";
import kelasQueries from "../../../queries/master/kelas/kelas.queries";
import kamarQueries from "../../../queries/master/kamar/kamar.queries";
import statusbedQueries from "../../../queries/master/statusbed/statusbed.queries";



const getTempatTidur = async (req, res) => {
    const logger = res.locals.logger;
    try{
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
    try{
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
    try{
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
    try{
        const bodyReq = req.body
        const {ttData} = await db.sequelize.transaction(async (transaction) => {
            let ttData = null
            const ttModel = await db.m_tempattidur.findOne({
                where: {
                    id: bodyReq.id
                }
            })
            if(!ttModel){
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

export default {
    getTempatTidur,
    getUnitTempatTidur,
    getComboTempatTidur,
    upsertTempatTidur
}