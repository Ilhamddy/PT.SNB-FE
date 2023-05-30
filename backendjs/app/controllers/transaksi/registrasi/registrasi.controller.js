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
        let todayDate = '' + (today.getDate() + 1)
        if (todayDate.length < 2)
            todayDate = '0' + todayDate;
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
            noregistrasi: today.getFullYear() + todayMonth.toString() + todayDate.toString() + noregistrasi,
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
            objectunitfk: req.body.unittujuan,
            noantrian: noantrian,
            statusenabled: true
        }, { transaction });
        // console.log(resultCountNoantrianDokter);
        await transaction.commit();
        let tempres = { daftarPasien: daftarPasien, antreanPemeriksaan: antreanPemeriksaan }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error) {
        // console.log(error);
        if (transaction) {
            await transaction.rollback();
            res.status(500).send({ message: error });
        }
    }
}

const getPasienNoregistrasi = (req, res) => {
    const id = parseInt(req.params.noregistrasi);
    console.log(id);
    pool.query(queries.getPasienByNoregistrasi, [id], (error, result) => {
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
                            noregistrasi: result.rows[i].noregistrasi,
                            namapasien: result.rows[i].namapasien,
                            tglregistrasi: result.rows[i].tglregistrasi,
                            nocm: result.rows[i].nocm,
                            namaunit: result.rows[i].namaunit,
                            noantrian: result.rows[i].noantrian,
                            namadokter: result.rows[i].namadokter
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
const getDaftarPasienRegistrasi = (req, res) => {
    const noregistrasi = req.query.noregistrasi;
    // console.log(req.query.tglregistrasi)
    // return
    let tglregistrasi = ""
    if (req.query.tglregistrasi !== undefined) {
        console.log("masukkk")
        tglregistrasi = ` and td.tglregistrasi between '${req.query.tglregistrasi}' and '${req.query.tglregistrasi} + ' 23:59'' `;

    }
    let query = queries.getDaftarPasienRegistrasi + `  where mi.id = 1 and td.noregistrasi ilike '%${noregistrasi}%'
    ${tglregistrasi}`
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
}

async function getDaftarPasienRawatJalan(req, res) {
    const noregistrasi = req.query.noregistrasi;
    let tglregistrasi = ""
    if (req.query.tglregistrasi !== undefined) {
        console.log("masukkk")
        tglregistrasi = ` and td.tglregistrasi between '${req.query.tglregistrasi}'
         and '${req.query.tglregistrasi} + ' 23:59'' `;

    }
    // let query = queries.getAllByOr + ` where nocm ilike '%` + nocm + `%'` + ` or namapasien ilike '%` + nocm + `%' limit 200`
    let query = queries.getDaftarPasienRawatJalan + `  where td.noregistrasi ilike '%${noregistrasi}%'
    ${tglregistrasi}`


    try {
        pool.query(query, (error, resultCountNoantrianDokter) => {
            if (error) {
                res.status(522).send({
                    status: "Connection Time Out",
                    success: true,
                });
            } else {
                res.status(200).send({
                    data: resultCountNoantrianDokter.rows,
                    status: "success",
                    success: true,
                });
            }
        })

    } catch (error) {
        throw error;
    }

}

async function getWidgetDaftarPasienRJ(req, res) {
    const noregistrasi = req.query.noregistrasi;
    let tglregistrasi = ""
    if (req.query.tglregistrasi !== undefined) {
        console.log("masukkk")
        tglregistrasi = ` and td.tglregistrasi between '${req.query.tglregistrasi}'
         and '${req.query.tglregistrasi} + ' 23:59'' `;

    }
    // let query = queries.getAllByOr + ` where nocm ilike '%` + nocm + `%'` + ` or namapasien ilike '%` + nocm + `%' limit 200`
    let query = queries.getDaftarPasienRawatJalan + `  where td.noregistrasi ilike '%${noregistrasi}%'
    ${tglregistrasi}`


    pool.query(query, (error, resultCountNoantrianDokter) => {
        if (error) {
            res.status(522).send({
                data: error,
                status: "Connection Time Out",
                success: true,
            });
        } else {
            let totalBP = 0
            let totalSP = 0
            let totalSSP = 0
            for (let x = 0; x < resultCountNoantrianDokter.rowCount; x++) {
                if (resultCountNoantrianDokter.rows[x].tasikid == 3 || resultCountNoantrianDokter.rows[x].tasikid == null) {
                    totalBP = totalBP + 1
                } else if (resultCountNoantrianDokter.rows[x].tasikid == 4) {
                    totalSP = totalSP + 1
                } else {
                    totalSSP = totalSSP + 1
                }
            }
            const taskWidgets = [
                {
                    id: 1,
                    label: "Total Pasien Belum Diperiksa",
                    counter: totalBP,
                    badge: "ri-arrow-up-line",
                    badgeClass: "success",
                    percentage: "17.32 %",
                    icon: "data:image/png;base64,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",
                    iconClass: "info",
                    decimals: 1,
                    prefix: "",
                    suffix: "k",
                },
                {
                    id: 2,
                    label: "Total Pasien Sedang Diperiksa",
                    counter: totalSP,
                    badge: "ri-arrow-down-line",
                    badgeClass: "danger",
                    percentage: "0.87 %",
                    icon: "data:image/png;base64,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",
                    iconClass: "warning",
                    decimals: 1,
                    prefix: "",
                    suffix: "k",
                },
                {
                    id: 3,
                    label: "Total Pasien Selesai Diperiksa",
                    counter: totalSSP,
                    badge: "ri-arrow-down-line",
                    badgeClass: "danger",
                    percentage: "2.52 %",
                    icon: "data:image/png;base64,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",
                    iconClass: "success",
                    decimals: 2,
                    prefix: "",
                    suffix: "K",
                },

            ];

            res.status(200).send({
                data: taskWidgets,
                status: "success",
                success: true,
            });
        }
    })


}

async function getHeaderEmr(req, res) {
    const norecta = req.query.norecta;
    let query = queries.getHeaderEmr + `  where ta.norec ilike '%${norecta}%'`


    try {
        pool.query(query, (error, resultCountNoantrianDokter) => {
            if (error) {
                res.status(522).send({
                    data: error,
                    status: "Connection Time Out",
                    success: true,
                });
            } else {
                let tempres = ""
                for (var i = 0; i < resultCountNoantrianDokter.rows.length; ++i) {
                    if (resultCountNoantrianDokter.rows[i] !== undefined) {
                        tempres = {
                            nocm: resultCountNoantrianDokter.rows[i].nocm,
                            namapasien: resultCountNoantrianDokter.rows[i].namapasien,
                            tgllahir: resultCountNoantrianDokter.rows[i].tgllahir,
                            jeniskelamin: resultCountNoantrianDokter.rows[i].jeniskelamin,
                            umur: resultCountNoantrianDokter.rows[i].umur.substring(1),
                            namarekanan: resultCountNoantrianDokter.rows[i].namarekanan,
                            ruanganta: resultCountNoantrianDokter.rows[i].ruanganta,
                            noregistrasi: resultCountNoantrianDokter.rows[i].noregistrasi
                        }

                    }
                }
                res.status(200).send({
                    data: tempres,
                    status: "success",
                    success: true,
                });
            }
        })

    } catch (error) {
        throw error;
    }

}
module.exports = {
    allSelect,
    addPost,
    updatePasienById,
    getPasienById,
    getAllByOr,
    savePasien,
    saveRegistrasiPasien,
    getPasienNoregistrasi,
    getDaftarPasienRawatJalan,
    getDaftarPasienRegistrasi,
    getWidgetDaftarPasienRJ,
    getHeaderEmr
};
