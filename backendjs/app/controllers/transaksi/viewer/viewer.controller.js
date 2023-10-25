import pool from "../../../config/dbcon.query";
import { qGetLoket, qGetLoketSisa, qGetLastPemanggilan, qGetAllLoket, qGetLastPemanggilanLoket, qGetLastPemanggilanAll, qGetAllTerpanggil, panggilStatus, qGetLastPemanggilanViewer, qGetJadwalDokter, qGetLastAntrean, qGetJadwalDokterNorec } from "../../../queries/viewer/viewer.queries";
import db from "../../../models";
import { getDateStartEnd } from "../../../utils/dateutils";
import { groupBy } from "../../../utils/arutils";
import unitQueries from "../../../queries/master/unit/unit.queries";
import kelasQueries from "../../../queries/master/kelas/kelas.queries";
import kamarQueries from "../../../queries/master/kamar/kamar.queries";
import statusbedQueries from "../../../queries/master/statusbed/statusbed.queries";

const t_antreanloket = db.t_antreanloket
const Op = db.Sequelize.Op;

const pollingAntrean = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const loket = pool.query(qGetLoket)
        const tempres = {
            loket
        };
        res.status(200).send({
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
        loketSisaReq = loketSisaReq.sort((a, b) => b.ispanggil - a.ispanggil)
        loketSisaReq.forEach((sisa) => {
            const foundLoketSisa = loketSisa.find((loket) => loket.id === sisa.id)
                if(sisa.ispanggil === panggilStatus.sedangPanggil 
                || sisa.ispanggil === panggilStatus.selesaiPanggil){
                const foundLoketSisa = loketSisa.find((loket) => loket.id === sisa.id)
                if(foundLoketSisa){
                    // kalau sudah ada langsung saja jumlahkan semuanya
                    foundLoketSisa.jumlahantrean += (sisa.jumlahantrean || 0)
                    foundLoketSisa.sisaantrean += (sisa.sisaantrean || 0)
                    foundLoketSisa.antreanterakhir = foundLoketSisa.jumlahantrean - foundLoketSisa.sisaantrean
                    return
                }
                sisa.sisaantrean = 0
                loketSisa.push(sisa)
            } else {
                if(foundLoketSisa){
                    // kalau sudah ada langsung saja jumlahkan semuanya
                    foundLoketSisa.sisaantrean += (sisa.jumlahantrean || 0)
                    return
                }
                sisa.sisaantrean = sisa.jumlahantrean || 0
                sisa.antreanterakhir = 0
                loketSisa.push(sisa)
            }
        })
        const tempres = {
            loketsisa: loketSisa,
            lastpemanggilan: lastAntrean,
            lastloket: lastPemanggilan?.loket || ""
        };
        res.status(200).send({
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
                    ispanggil: panggilStatus.belumPanggil,
                    tglinput: {
                        [Op.between]: [dateStart, dateEnd]
                    }
                },
                order: [['tglinput', 'ASC']], 
                transaction: transaction
            })
            if(lastAntrean === null) throw new Error("Tidak ada antrean tersedia")
            await lastAntrean.update({
                ispanggil: panggilStatus.sedangPanggil,
                objectloketfk: loket,
                tglpanggil: new Date(),
            }, {
                transaction: transaction
            })

            return {}
        });
        
        const tempres = {
        
        };
        res.status(200).send({
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

const getAllLoket = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const dateNow = new Date();
        const dateStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0);
        const dateEnd = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 23, 59, 59);
        let lastPemanggilanAll = (await pool.query(qGetLastPemanggilanAll, [
            dateStart,
            dateEnd,
            2
        ]))?.rows
        lastPemanggilanAll = lastPemanggilanAll?.[0] || null
        if(lastPemanggilanAll){
            await t_antreanloket.update({
                ispanggil: panggilStatus.selesaiPanggil,
                tglpanggilviewer: new Date(),
            }, {
                where: {
                    norec: lastPemanggilanAll.norec
                }
            })
        }
        let lokets = (await pool.query(qGetAllLoket)).rows;
        lokets = await Promise.all(
            lokets.map(
                async (loket) => {
                    let lastPemanggilan = (await pool.query(qGetLastPemanggilanLoket, [
                        loket.value,
                        dateStart,
                        dateEnd
                    ]))?.rows
                    lastPemanggilan = lastPemanggilan?.[0] || null
                    const prefix =  lastPemanggilan?.prefix
                    let lastAntrean = ("00" + lastPemanggilan?.noantrean).slice(-2)
                    lastAntrean = lastPemanggilan ? prefix + lastAntrean : ""
                    return {
                        ...loket,
                        lastAntrean: lastAntrean,
                    }
                }
            )
        )
        let lastPemanggilanViewer = (await pool.query(qGetLastPemanggilanViewer, [
            dateStart,
            dateEnd
        ]))?.rows
        lastPemanggilanViewer = lastPemanggilanViewer?.[0] || null
        const prefix =  lastPemanggilanViewer?.prefix
        let lastAntrean = ("00" + (
            lastPemanggilanAll?.noantrean ||
            lastPemanggilanViewer?.noantrean)).slice(-2)
        lastAntrean = lastPemanggilanViewer || lastPemanggilanViewer ? prefix + lastAntrean : ""
        const tempres = {
            loket: lokets,
            lastantrean: lastAntrean,
            lastloket: lastPemanggilanAll?.loket ||  lastPemanggilanViewer?.loket || "",
            status: lastPemanggilanAll?.ispanggil || lastPemanggilanViewer?.ispanggil || 3
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: tempres,
            success: true
        });
    } catch (error) {
        console.error(error)
        logger.error(error);
        res.status(500).json({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

const getAllTerpanggil = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const dateNow = new Date();
        const {loketid} = req.query
        const dateStart = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0);
        const dateEnd = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 23, 59, 59);
        let terpanggils = (await pool.query(qGetAllTerpanggil, [dateStart, dateEnd, loketid])).rows;
        terpanggils = terpanggils.map((terpanggil) => {
            const newTerpanggil = {...terpanggil}
            const prefix =  terpanggil?.prefix
            let lastAntrean = ("00" + terpanggil?.noantrean).slice(-2)
            lastAntrean = terpanggil ? prefix + lastAntrean : ""
            newTerpanggil.label = lastAntrean
            return newTerpanggil
        })
        const tempres = {
            terpanggil: terpanggils
        };
        res.status(200).send({
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

const panggilUlangAntrean = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const norecantrean = req.body.norecantrean
        const {updatedAntrean } = await db.sequelize.transaction(async (transaction) => {
            const antrean = await t_antreanloket.findOne({
                where: {
                    norec: norecantrean
                },
            })
            if(!antrean) throw new Error("Antrean tidak ditemukan")
            const updatedAntrean  = await antrean.update({
                ispanggil: panggilStatus.sedangPanggil,
                tglpanggil: new Date(),
            }, {
                transaction: transaction,
                returning: true
            })
            return {
                updatedAntrean
            }
        });
        
        const tempres = {
            updatedantrean: updatedAntrean
        };
        res.status(200).send({
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

const getJadwalDokter = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const { jadwal, unit, lastTerpanggil, terpanggil, terpanggilKedua } = await
            db.sequelize.transaction(async (transaction) => {
                const unitFilter = JSON.parse(decodeURIComponent(req.query.unit)) || []
                const isPanggil = req.query.ispanggil === "true"
                const day = (new Date()).getDay();
                let jadwal = (await pool.query(qGetJadwalDokter, [day])).rows
                let unit = (await pool.query(unitQueries.getPoliklinik)).rows
                jadwal = groupBy(
                    jadwal, 
                    'idjadwal',
                    'objectpegawaifk', 
                    'jam_mulai', 
                    'jam_selesai', 
                    'objectunitfk', 
                    'objectkamarfk', 
                    'namakamar', 
                    'objectpegawaifk', 
                    'namadokter', 
                    'namaunit'
                )

                jadwal = jadwal.filter((jadwal) => {
                    return !!unitFilter.find((filter) => filter.value === jadwal.objectunitfk)
                })
                jadwal = await hProcessJadwal(req, res, transaction, {jadwal})
                let lastTerpanggil = [...jadwal].filter(item => 
                    item?.antrean.objectstatuspanggilfk === 3
                )
                const terpanggilSort = lastTerpanggil.sort((a, b) => {
                    return b.antrean.tgldipanggildokter - a.antrean.tgldipanggildokter
                })
                lastTerpanggil = terpanggilSort[0] || null
                let terpanggil = [...jadwal].filter(item => 
                    item?.antrean.objectstatuspanggilfk === 2  
                )
                terpanggil = terpanggil.sort((a, b) => {
                    return a.antrean.tgldipanggildokter - b.antrean.tgldipanggildokter
                })[0] || null
                let antreanData = null
                if(isPanggil && terpanggil?.antrean) {
                    let antreanUpdate 
                    antreanUpdate = (await db.t_antreanpemeriksaan.findOne({
                        where: {
                            norec: terpanggil.antrean.norecap
                        },
                        transaction: transaction
                    })) 
                    antreanData = antreanUpdate.toJSON();

                    await antreanUpdate.update({
                        objectstatuspanggilfk: 3,
                    }, {
                        transaction: transaction
                    })
                }

                
                let terpanggilKedua = null

                const {todayStart, todayEnd} = getDateStartEnd()
                let allTerpanggil = terpanggil || lastTerpanggil
                if(allTerpanggil){
                    let antreanKedua = (await pool.query(qGetLastAntrean, [
                        '', 
                        todayStart, 
                        new Date(allTerpanggil.antrean.tgldipanggildokter), 
                        3
                    ])).rows
                    antreanKedua = antreanKedua?.[0] || null
                    terpanggilKedua = await pool.query(qGetJadwalDokterNorec, [antreanKedua?.objectdokterpemeriksafk])
                    terpanggilKedua = terpanggilKedua.rows[0] || null
                    if(terpanggilKedua){
                        terpanggilKedua.antrean = {
                            norecap: antreanKedua?.norecap,
                            lastAntrean: antreanKedua?.reportdisplay + antreanKedua?.noantrian,
                            objectstatuspanggilfk:  antreanKedua?.objectstatuspanggilfk,
                            tgldipanggildokter: antreanKedua?.tgldipanggildokter,
                            objectdokterpemeriksafk: antreanKedua?.objectdokterpemeriksafk,
                        }
                    }
                }

                return {
                    jadwal,
                    unit,
                    lastTerpanggil,
                    terpanggil,
                    terpanggilKedua
                }
            })

        const tempres = {
            jadwal: jadwal,
            unit: unit,
            lastTerpanggil: lastTerpanggil,
            terpanggil: terpanggil,
            terpanggilKedua: terpanggilKedua
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

const getJadwalOperasi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        
        const tempres = {
        
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
    pollingAntrean,
    getLoketSisa,
    panggilLoket,
    getAllLoket,
    getAllTerpanggil,
    panggilUlangAntrean,
    getJadwalDokter,
    getJadwalOperasi,
}

const hProcessJadwal = async (req, res, transaction, {jadwal}) => {
    const {todayStart, todayEnd} = getDateStartEnd()
    const newJadwal = await Promise.all(
        jadwal.map(async (item) => {
            const antrean = (await pool.query(qGetLastAntrean, [
                item.objectpegawaifk, 
                todayStart, 
                todayEnd, 
                2
            ])).rows
            let itemAntreanPanggil = antrean?.[0]
            if(!itemAntreanPanggil){
                const antreanSelesai = (await pool.query(qGetLastAntrean, [
                    item.objectpegawaifk, 
                    todayStart, 
                    todayEnd, 
                    3
                ])).rows
                itemAntreanPanggil = antreanSelesai?.[0]
            }
            itemAntreanPanggil = itemAntreanPanggil || null
            item.antrean = {
                norecap: itemAntreanPanggil?.norecap,
                lastAntrean: itemAntreanPanggil?.reportdisplay + itemAntreanPanggil?.noantrian,
                objectstatuspanggilfk:  itemAntreanPanggil?.objectstatuspanggilfk,
                tgldipanggildokter: itemAntreanPanggil?.tgldipanggildokter,
                objectdokterpemeriksafk: itemAntreanPanggil?.objectdokterpemeriksafk,
            }
            return item
        })
    )
    return newJadwal
}