import pool from "../../../config/dbcon.query";
import { qGetLoket, qGetLoketSisa, qGetLastPemanggilan } from "../../../queries/viewer/viewer.queries";
import db from "../../../models";

const t_antreanloket = db.t_antreanloket
const Op = db.Sequelize.Op;

const pollingAntrean = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const loket = pool.query(qGetLoket)
        const tempres = {
            loket
        };
        res.status(200).json({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getLoketSisa = async (req, res) => {
    const logger = res.locals.logger;
    res.locals.showBodyRes();
    try{
        const dateNow = new Date();
        const dateStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0);
        const dateEnd = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 23, 59, 59);
        let loketSisaReq = (await pool.query(qGetLoketSisa, [dateStart, dateEnd])).rows

        let lastPemanggilan = (await pool.query(qGetLastPemanggilan, [dateStart, dateEnd]))?.rows
        lastPemanggilan = lastPemanggilan?.[0] || null
        const prefix =  lastPemanggilan?.prefix
        let lastAntrean = ("00" + lastPemanggilan?.noantrean).slice(-2)
        lastAntrean = lastPemanggilan ? prefix + lastAntrean : ""
        let loketSisa = []
        // kelompokkan berdasarkan id
        loketSisaReq = loketSisaReq.sort((a, b) => a.ispanggil ? -1 : 1)
        loketSisaReq.forEach((sisa) => {
            if(sisa.ispanggil){
                const foundIsPanggil = loketSisaReq.find(
                    (loket) => (loket.id === sisa.id) && (!loket.ispanggil)
                )
                if(!foundIsPanggil) {
                    sisa.jumlahantrean = 0
                    sisa.sisaantrean = 0
                    loketSisa.push(sisa)
                    return
                }
                sisa.jumlahantrean = foundIsPanggil.antreanterakhir
                sisa.sisaantrean = foundIsPanggil.jumlahantrean
                loketSisa.push(sisa)
            }
        })
        const tempres = {
            loketsisa: loketSisa,
            lastpemanggilan: lastAntrean,
            lastloket: lastPemanggilan?.loket || ""
        };
        res.status(200).json({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const panggilLoket = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { jenis, loket } = req.body
        await db.sequelize.transaction(async (transaction) => {
            const dateNow = new Date();
            const dateStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0);
            const dateEnd = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 23, 59, 59);
            const lastAntrean = await t_antreanloket.findOne({
                where: {
                    objectjenisantreanfk: jenis,
                    ispanggil: false,
                    tglinput: {
                        [Op.between]: [dateStart, dateEnd]
                    }
                },
                transaction: transaction
            })
            if(lastAntrean === null) throw new Error("Tidak ada antrean tersedia")
            await lastAntrean.update({
                ispanggil: true,
                objectloketfk: loket,
                tglpanggil: new Date(),
            }, {
                transaction: transaction
            })

            return {}
        });
        
        const tempres = {
        
        };
        res.status(200).json({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const qGetAllLoket = `

`

export default {
    pollingAntrean,
    getLoketSisa,
    panggilLoket,
}