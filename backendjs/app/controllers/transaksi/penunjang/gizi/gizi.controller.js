import pool from "../../../../config/dbcon.query";
import giziQueries from "../../../../queries/penunjang/gizi/gizi.queries";
import db from "../../../../models";
import queryTypes from "sequelize/lib/query-types";
import * as uuid from 'uuid'
import { getDateEndNull, getDateStartNull } from "../../../../utils/dateutils";

const getMasterGizi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const resultjenisOrder = ((await pool.query(giziQueries.qGetJenisOrder)).rows)
        const resultdiet = ((await pool.query(giziQueries.qGetDiet)).rows)
        const resultmakanan = ((await pool.query(giziQueries.qGetMakanan)).rows)
        const resultkategori = ((await pool.query(giziQueries.qGetKategoriDiet)).rows)
        const resultkelas = ((await pool.query(giziQueries.qGetKelas)).rows)
        const resultunit = ((await pool.query(giziQueries.qGetUnit)).rows)
        const tempres = {
            resultjenisOrder,
            resultdiet,
            resultkategori,
            resultmakanan,
            resultkelas,
            resultunit
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

const getDaftarPasienRanap = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let filterTglLast = getDateEndNull(req.query.tglorder);
        let filterTglStart = getDateStartNull(req.query.tglorder);
        const result = ((await pool.query(giziQueries.qGetDaftarPasienRanap,[req.query.kelas])).rows)
        const result2 = ((await pool.query(giziQueries.qGetDaftarSudahOrder,[filterTglStart||'',filterTglLast||'',req.query.kelas,req.query.unit])).rows)
        
        let filteredData =[]
        if(req.query.sudahorder==='1'){
            result2.forEach(element => {
                const existingElement = filteredData.find(el => el.norecta === element.norecta);
                if (existingElement) {
                    if (element.norecsarapan !== '') {
                        existingElement.norecsarapan = element.norecsarapan;
                        existingElement.sarapan = element.sarapan;
                    } else if (element.norecsnackpagi !== '') {
                        existingElement.norecsnackpagi = element.norecsnackpagi;
                        existingElement.snackpagi = element.snackpagi;
                    }else if (element.norecmakansiang !== '') {
                        existingElement.norecmakansiang = element.norecmakansiang;
                        existingElement.makansiang = element.makansiang;
                    }else if (element.norecsnacksiang !== '') {
                        existingElement.norecsnacksiang = element.norecsnacksiang;
                        existingElement.snacksiang = element.snacksiang;
                    }else if (element.norecmakanmalam !== '') {
                        existingElement.norecmakanmalam = element.norecmakanmalam;
                        existingElement.makanmalam = element.makanmalam;
                    }
                } else {
                    filteredData.push(element);
                }
            });            
        }else{
            filteredData = result.filter(item1 =>
                !result2.some(item2 => item2.norecta === item1.norecta)
              );
              
        }
        

        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: filteredData,
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

const upsertOrderGizi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {ordergizi,ordergizidetail}=await db.sequelize.transaction(async (transaction) => {
            let ordergizidetail
            let today = new Date(req.body.tglOrder);
            let todayMonth = '' + (today.getMonth() + 1)
            if (todayMonth.length < 2)
                todayMonth = '0' + todayMonth;
            let todayDate = '' + (today.getDate())
            if (todayDate.length < 2)
                    todayDate = '0' + todayDate;
            let todaystart = formatDate(today)
            let todayend = formatDate(today) + ' 23:59'
            const resultcount = (await db.sequelize.query(`select count(norec) from t_ordergizi
            where tglorder between :todaystart and :todayend`, {
                replacements: {
                    todaystart: todaystart,
                    todayend:todayend
                },
                transaction: transaction,
                type: queryTypes.SELECT
            }))[0]
            let noorder = parseFloat(resultcount.count) + 1
            noorder = resultcount.count.toString().padStart(4, '0');

            let norec = uuid.v4().substring(0, 32)
            const ordergizi = await db.t_ordergizi.create({
                norec: norec,
                nomororder: 'GZ' + today.getFullYear() + todayMonth.toString()+todayDate.toString() + noorder,
                objectjenisordergizifk:req.body.jenisOrder,
                objectdiet1fk: req.body.diet1 !== '' ? req.body.diet1 : null,
                objectdiet2fk: req.body.diet2 !== '' ? req.body.diet2 : null,
                objectdiet3fk: req.body.diet3 !== '' ? req.body.diet3 : null,
                objectkategoridietfk:req.body.kategoriDiet!== '' ? req.body.kategoriDiet : null,
                objectmakananfk:req.body.menuMakanan !== '' ? req.body.menuMakanan : null,
                Keterangan:req.body.Keterangan,
                objectpegawaiinputfk: req.idPegawai,
                tglinput: new Date(),
                tglorder: req.body.tglOrder
            }, { transaction });
            await Promise.all(req.body.temppasien
                .filter(element => element.checked === true)
                .map(async (element) => {
                    let norecdop = uuid.v4().substring(0, 32);
                    let norecdetail = ''
                    const jenisOrderMap = {
                        1: 'norecsarapan',
                        2: 'norecsnackpagi',
                        3: 'norecmakansiang',
                        4: 'norecsnacksiang',
                        5: 'norecmakanmalam'
                    };   
                    const norecField = jenisOrderMap[req.body.jenisOrder];
                    norecdetail = (norecField && element[norecField] !== '') ? element[norecField] : '';                    
                    
                    if(norecdetail===''){
                        ordergizidetail = await db.t_ordergizidetail.create({
                            norec: norecdop,
                            objectordergizifk: norec,
                            objectantreanpemeriksaanfk: element.norecta
                        }, { transaction });
                    }else{
                        const orderdetail = await db.t_ordergizidetail.findByPk(norecdetail,{transaction: transaction})
                        ordergizidetail = await orderdetail.update({
                            objectordergizifk: norec
                        }, { transaction });
                    }
                }));
            
            return {ordergizi,ordergizidetail}
        });
        
        const tempres = {
        ordergizi,ordergizidetail
        };
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

const getDaftarOrderGizi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let filterTglStart = getDateStartNull(req.query.tglorder);
        let filterTglLast = getDateEndNull(req.query.tglorder);
        const result = ((await pool.query(giziQueries.qGetDaftarOrderGizi,[filterTglStart,filterTglLast])).rows)
        await Promise.all(result.map(async (element) => {
            const result2 = (await pool.query(giziQueries.qGetDaftarOrderGiziDetail,[element.norec])).rows
            
            if(result2.length!==0){
                element.detail = result2
            }
        }));
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result,
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

const deleteOrderGizi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {detailOrder,ordergizidetail}=await db.sequelize.transaction(async (transaction) => {
            let detailOrder
            let ordergizidetail
            const result2 = (await pool.query(giziQueries.qGetDaftarOrderGiziDetail,[req.body.data.norec])).rows
            if(result2.length===1){
                detailOrder = await db.t_ordergizi.update({
                    statusenabled: false
                }, {
                    where: {
                        norec: req.body.data.norec
                    }
                }, { transaction });
            }
            ordergizidetail = await db.t_ordergizidetail.update({
                statusenabled: false
            }, {
                where: {
                    norec: req.body.data.norecgizidetail
                }
            }, { transaction });
                return{detailOrder,ordergizidetail}
        });
        
        const tempres = {
            detailOrder,ordergizidetail
        };
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

const upsertVerifikasiOrderGizi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const {ordergizi}=await db.sequelize.transaction(async (transaction) => {
            let ordergizi
            ordergizi = await db.t_ordergizi.update({
                isverif:true,
                tglverif: new Date(),
                objectpegawaiveriffk:req.idPegawai
            }, {
                where: {
                    norec: req.body.data.norec
                }
            }, { transaction });
            return{ordergizi}
        });
        
        const tempres = {
            ordergizi
        };
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

const getDaftarKirimGizi = async (req, res) => {
    const logger = res.locals.logger;
    try{
        let filterTglStart = getDateStartNull(req.query.tglorder);
        let filterTglLast = getDateEndNull(req.query.tglorder);
        const result = (await pool.query(giziQueries.qGetDaftarKirimGizi,[filterTglStart,filterTglLast])).rows
        const tempres = {
        
        };
        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: result,
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

export default{
    getMasterGizi,
    getDaftarPasienRanap,
    upsertOrderGizi,
    getDaftarOrderGizi,
    deleteOrderGizi,
    upsertVerifikasiOrderGizi,
    getDaftarKirimGizi
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}