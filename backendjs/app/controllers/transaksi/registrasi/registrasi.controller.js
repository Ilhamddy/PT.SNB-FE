const pool = require("../../../config/dbcon.query");
const uuid = require('uuid')
const queries = require('../../../queries/transaksi/registrasi.queries');
const db = require("../../../models");
const M_pasien = db.m_pasien
const running_Number = db.running_number
const t_daftarpasien = db.t_daftarpasien
const t_antreanpemeriksaan = db.t_antreanpemeriksaan

const allSelect = (req, res) => {
    pool.query(queries.getAll, (error, result) => {
        if (error) throw error;
        res.status(200).send({
            data: result.rows,
            status: "success",
            success: true,
        });
    });
};

const addPost = (req, res) => {
    const { namapasien, noidentitas } = req.body;
    // check if username exist
    // pool.query(queries.checkUserNameExist, [username], (error, result) => {
    //     if (result.rows.length) {
    //         res.send("user already exist.");
    //     } else {
    // add tabel
    pool.query(queries.checkNewNumber, (error, result) => {
        if (error) {
            throw error
        } else {
            let nocm = result.rows[0].new_number + 1
            let new_number = result.rows[0].new_number + 1
            for (let x = result.rows[0].new_number.toString().length; x < result.rows[0].extention; x++) {
                nocm = '0' + nocm;
            }
            // res.status(200).send({
            //     data: nocm,
            //     status: "success",
            //     success: true,
            // });

            pool.query(
                queries.addPost, [nocm, namapasien, noidentitas],
                (error, result) => {
                    if (error) {
                        throw error
                    } else {
                        pool.query(queries.getPasienByNocm, [nocm], (error, result) => {
                            if (error) {
                                throw error
                            } else {
                                pool.query(queries.updateRunning_number, [new_number], (error, resultUpdate) => {
                                    if (error) {
                                        throw error
                                    } else {
                                        res.status(200).send({
                                            data: result.rows,
                                            status: "success",
                                            success: true,
                                        });
                                    }

                                })

                            }

                            // res.status(200).json(result.rows);

                        });
                    }
                }
            )
        }
    });
}

const updatePasienById = (req, res) => {
    const { namapasien, noidentitas, nobpjs, nohp, id } = req.body;
    try {

        pool.query(queries.updatePasienById, [namapasien, noidentitas, nobpjs, nohp, id], (error, result) => {
            if (error) {
                throw error
            } else {
                pool.query(queries.getPasienById, [id], (error, resultx) => {
                    if (error) {
                        throw error
                    } else {
                        res.status(200).send({
                            data: resultx.rows,
                            status: "success",
                            success: true,
                        });
                    }

                })

            }

        })


    } catch (e) {
        res.status(500).send({ message: e, status: "errors" });
    }
}

const getPasienById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPasienById, [id], (error, result) => {
        if (error) {
            throw error
        } else {
            if (result.rows.length == 0) {
                res.status(201).send({
                    data: "",
                    status: "Data Tidak Ada",
                    success: true,
                });
            } else {
                let tempres = ""
                for (var i = 0; i < result.rows.length; ++i) {
                    if (result.rows[i] !== undefined) {
                        tempres = {
                            id: result.rows[i].id, nocm: result.rows[i].nocm, namapasien: result.rows[i].namapasien,
                            noidentitas: result.rows[i].noidentitas, nobpjs: result.rows[i].nobpjs, nohp: result.rows[i].nohp,
                            tgllahir: result.rows[i].tgllahir
                        }

                    }
                }

                res.status(200).send({
                    data: tempres,
                    status: "success",
                    success: true,
                });
            }
        }

    })
}

const getAllByOr = (req, res) => {
    const nocm = req.query.nocm;
    // let query = queries.getAllByOr + ` where nocm ilike '%` + nocm + `%'` + ` or namapasien ilike '%` + nocm + `%' limit 200`
    let query = queries.getAllByOr + ` where nocm ilike '%${nocm}%'  or namapasien ilike '%${nocm}%'`
    // res.status(200).send({
    //     data: query,
    //     status: "success",
    //     success: true,
    // });
    pool.query(query, (error, result) => {
        if (error) {
            error
        } else {
            res.status(200).send({
                data: result.rows,
                status: "success",
                success: true,
            });
        }
    })
    // res.status(200).send({
    //     data: queries.getAllByOr,
    //     status: "success",
    //     success: true,
    // });

    // pool.query(queries.getAllByOr,[nocm], (error, result) => {
    //     if (error){
    //         error
    //     } else{
    //         res.status(200).send({
    //             data: result.rows,
    //             status: "success",
    //             success: true,
    //         });
    //     }

    // });
};

const savePasien = (req, res) => {
    try {
        running_Number.findAll({
            where: {
                id: 1
            }
        }).then(getNocm => {
            let nocm = getNocm[0].new_number + 1
            let new_number = getNocm[0].new_number + 1
            for (let x = getNocm[0].new_number.toString().length; x < getNocm[0].extention; x++) {
                nocm = '0' + nocm;
            }
            M_pasien.create({
                nocm: nocm,
                namapasien: req.body.namapasien,
                noidentitas: req.body.noidentitas,
                objectjeniskelaminfk: req.body.jeniskelamin,
                objecttitlefk: req.body.titlepasien,
                objectagamafk: req.body.agama,
                objectgolongandarahfk: req.body.goldarah,
                objectkebangsaanfk: req.body.kebangsaan,
                objectstatusperkawinanfk: req.body.statusperkawinan,
                objectpendidikanfk: req.body.pendidikan,
                objectpekerjaanfk: req.body.pekerjaan,
                objectetnisfk: req.body.suku,
                objectbahasafk: req.body.bahasa,
                alamatrmh: req.body.alamatktp,
                rtktp: req.body.rt,
                rwktp: req.body.rw,
                objectdesakelurahanktpfk: req.body.desa,
                objectnegaraktpfk: req.body.negara,
                statusenabled: true
            }).then(result => {
                running_Number.update({ new_number: new_number }, {
                    where: {
                        id: 1
                    }
                });
                res.status(200).send({
                    data: result,
                    status: "success",
                    success: true,
                });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        });
    } catch (error) {
        res.status(500).send({ message: error });
    }
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
const saveRegistrasiPasien2 = (req, res) => {
    try {
        let norec = uuid.v4().substring(0, 32)
        let objectpenjaminfk = null
        let objectpenjamin2fk = null
        let objectpenjamin3fk = null
        for (let x = 0; x < req.body.penjamin.length; x++) {
            if (x == 0)
                objectpenjaminfk = req.body.penjamin[x].value
        }
        let today = new Date();
        let todayMonth = '' + (today.getMonth() + 1)
        if (todayMonth.length < 2)
            todayMonth = '0' + todayMonth;
        let todaystart = formatDate(today)
        let todayend = formatDate(today) + ' 23:59'

        let queryNoAntrian = `select count(noantrian)  from t_antreanpemeriksaan ta
        join m_pegawai mp on mp.id=ta.objectdokterpemeriksafk where ta.objectdokterpemeriksafk='${req.body.dokter}' 
        and ta.tglmasuk between '${todaystart}' and '${todayend}'`
        pool.query(queryNoAntrian, (error, resultCountNoantrianDokter) => {
            if (error) throw error;
            let noantrian = parseFloat(resultCountNoantrianDokter.rows[0].count) + 1
            let query = `select count(norec) from t_daftarpasien
            where tglregistrasi between '${todaystart}' and '${todayend}'`
            pool.query(query, (error, resultCount) => {
                if (error) throw error;
                let noregistrasi = parseFloat(resultCount.rows[0].count) + 1
                for (let x = resultCount.rows[0].count.toString().length; x < 4; x++) {
                    noregistrasi = '0' + noregistrasi;
                }

                t_daftarpasien.create({
                    norec: norec,
                    nocmfk: req.body.id,
                    noregistrasi: today.getFullYear() + todayMonth.toString() + noregistrasi,
                    tglregistrasi: req.body.tglregistrasi,
                    objectunitlastfk: req.body.unittujuan,
                    objectdokterpemeriksafk: req.body.dokter,
                    objectpegawaifk: req.body.pegawaifk,
                    objectkelasfk: req.body.kelasfk,
                    objectjenispenjaminfk: req.body.jenispenjamin,
                    tglpulang: req.body.tglregistrasi,
                    objectasalrujukanfk: req.body.rujukanasal,
                    objectinstalasifk: req.body.tujkunjungan,
                    objectpenjaminfk: objectpenjaminfk,
                    objectpenjamin2fk: objectpenjamin2fk,
                    objectpenjamin3fk: objectpenjamin3fk,
                    objectpjpasienfk: req.body.penanggungjawab,
                    statusenabled: true
                }).then(result => {
                    let norec = uuid.v4().substring(0, 32)
                    t_antreanpemeriksaan.create({
                        norec: norec,
                        noregistrasif: result.norec,
                        tglmasuk: req.body.tglregistrasi,
                        tglpulang: req.body.tglregistrasi,
                        objectdokterpemeriksafk: req.body.dokter,
                        noantrian: noantrian,
                        statusenabled: true
                    }).then(result2 => {
                        let tempres = { instalasi: result, unit: result2 }
                        res.status(200).send({
                            data: tempres,
                            status: "success",
                            success: true,
                        });
                    }).catch(err => {
                        res.status(500).send({ message: err.message });
                    });
                }).catch(err => {
                    res.status(500).send({ message: err.message });
                });
            })
        })

    } catch (error) {
        res.status(500).send({ message: error });
    }
}
async function saveRegistrasiPasien(req, res) {

    try {
        let norecDP = uuid.v4().substring(0, 32)
        let objectpenjaminfk = null
        let objectpenjamin2fk = null
        let objectpenjamin3fk = null
        for (let x = 0; x < req.body.penjamin.length; x++) {
            if (x == 0)
                objectpenjaminfk = req.body.penjamin[x].value
        }
        let today = new Date();
        let todayMonth = '' + (today.getMonth() + 1)
        if (todayMonth.length < 2)
            todayMonth = '0' + todayMonth;
        let todaystart = formatDate(today)
        let todayend = formatDate(today) + ' 23:59'
        let queryNoAntrian = `select count(noantrian)  from t_antreanpemeriksaan ta
        join m_pegawai mp on mp.id=ta.objectdokterpemeriksafk where ta.objectdokterpemeriksafk='${req.body.dokter}' 
        and ta.tglmasuk between '${todaystart}' and '${todayend}'`

        var resultCountNoantrianDokter = await pool.query(queryNoAntrian);
        let noantrian = parseFloat(resultCountNoantrianDokter.rows[0].count) + 1
        let query = `select count(norec) from t_daftarpasien
            where tglregistrasi between '${todaystart}' and '${todayend}'`
        var resultCount = await pool.query(query);
        let noregistrasi = parseFloat(resultCount.rows[0].count) + 1
        for (let x = resultCount.rows[0].count.toString().length; x < 4; x++) {
            noregistrasi = '0' + noregistrasi;
        }

        transaction = await db.sequelize.transaction();
        const daftarPasien = await db.t_daftarpasien.create({
            norec: norecDP,
            nocmfk: req.body.id,
            noregistrasi: today.getFullYear() + todayMonth.toString() + noregistrasi,
            tglregistrasi: req.body.tglregistrasi,
            objectunitlastfk: req.body.unittujuan,
            objectdokterpemeriksafk: req.body.dokter,
            objectpegawaifk: req.body.pegawaifk,
            objectkelasfk: req.body.kelasfk,
            objectjenispenjaminfk: req.body.jenispenjamin,
            tglpulang: req.body.tglregistrasi,
            objectasalrujukanfk: req.body.rujukanasal,
            objectinstalasifk: req.body.tujkunjungan,
            objectpenjaminfk: objectpenjaminfk,
            objectpenjamin2fk: objectpenjamin2fk,
            objectpenjamin3fk: objectpenjamin3fk,
            objectpjpasienfk: req.body.penanggungjawab,
            statusenabled: true
        }, { transaction });

        let norecAP = uuid.v4().substring(0, 32)
        const antreanPemeriksaan = await db.t_antreanpemeriksaan.create({
            norec: norecAP,
            noregistrasifk: norecDP,
            tglmasuk: req.body.tglregistrasi,
            tglpulang: req.body.tglregistrasi,
            objectdokterpemeriksafk: req.body.dokter,
            noantrian: noantrian,
            statusenabled: true
        }, { transaction });
        // console.log(resultCountNoantrianDokter);
        await transaction.commit();
        let tempres = { daftarPasien: daftarPasien, antreanPemeriksaan:antreanPemeriksaan }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error) {
        // console.log(error);
        if(transaction) {
            await transaction.rollback();
            res.status(500).send({ message: error });
         }
    }
}
module.exports = {
    allSelect,
    addPost,
    updatePasienById,
    getPasienById,
    getAllByOr,
    savePasien,
    saveRegistrasiPasien
};
