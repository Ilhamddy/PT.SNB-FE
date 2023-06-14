const pool = require("../../../config/dbcon.query");
const uuid = require('uuid')
const queries = require('../../../queries/transaksi/registrasi.queries');
const db = require("../../../models");
const M_pasien = db.m_pasien
const running_Number = db.running_number
const t_daftarpasien = db.t_daftarpasien
const t_antreanpemeriksaan = db.t_antreanpemeriksaan
const m_tempattidur = db.m_tempattidur

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
                statusenabled: true,
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
                    msg: 'Simpan Berhasil',
                    code: 200
                });
            }).catch(err => {
                res.status(201).send({
                    status: err,
                    success: false,
                    msg: 'Simpan Gagal',
                    code: 201
                });
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
        transaction = await db.sequelize.transaction();
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
        if (req.body.kelas === "")
            req.body.kelas = 6
        if (req.body.kamar === "")
            req.body.kamar = null
        if (req.body.tempattidur === "")
            req.body.tempattidur = null

        let tglpulang = req.body.tglregistrasi
        if (req.body.tujkunjungan === 2) {
            
            let queryCekBed = `select id from m_tempattidur
            where objectstatusbedfk =1 and id=${req.body.tempattidur}`
            
            let resqueryCekBed = await pool.query(queryCekBed);
          
            if (resqueryCekBed.rowCount === 1) {
                await transaction.rollback();
                res.status(201).send({
                    status: 'Bed yang dipilih sudah terisi',
                    success: false,
                    msg: 'Simpan Gagal',
                    code: 201
                });
                return
            }
            tglpulang = null
            const ttp = await db.m_tempattidur.update({
                objectstatusbedfk: 1
            }, {
                where: {
                    id: req.body.tempattidur
                }
            }, { transaction });
        }

        
        const daftarPasien = await db.t_daftarpasien.create({
            norec: norecDP,
            nocmfk: req.body.id,
            noregistrasi: today.getFullYear() + todayMonth.toString() + todayDate.toString() + noregistrasi,
            tglregistrasi: req.body.tglregistrasi,
            objectunitlastfk: req.body.unittujuan,
            objectdokterpemeriksafk: req.body.dokter,
            objectpegawaifk: req.idPegawai,
            objectkelasfk: req.body.kelas,
            objectjenispenjaminfk: req.body.jenispenjamin,
            tglpulang: tglpulang,
            objectasalrujukanfk: req.body.rujukanasal,
            objectinstalasifk: req.body.tujkunjungan,
            objectpenjaminfk: objectpenjaminfk,
            objectpenjamin2fk: objectpenjamin2fk,
            objectpenjamin3fk: objectpenjamin3fk,
            objectpjpasienfk: req.body.penanggungjawab,
            statusenabled: true,
        }, { transaction });

        let norecAP = uuid.v4().substring(0, 32)
        const antreanPemeriksaan = await db.t_antreanpemeriksaan.create({
            norec: norecAP,
            objectdaftarpasienfk: norecDP,
            tglmasuk: req.body.tglregistrasi,
            tglkeluar: req.body.tglregistrasi,
            objectdokterpemeriksafk: req.body.dokter,
            objectunitfk: req.body.unittujuan,
            noantrian: noantrian,
            objectkamarfk: req.body.kamar,
            objectkelasfk: req.body.kelas,
            nobed: req.body.tempattidur,
            statusenabled: true
        }, { transaction });
        // console.log(antreanPemeriksaan);
        if (req.body.tujkunjungan === 2) {
            const ttp = await db.m_tempattidur.update({
                objectstatusbedfk: 1
            }, {
                where: {
                    id: req.body.tempattidur
                }
            }, { transaction });
        }
        await transaction.commit();
        let tempres = { daftarPasien: daftarPasien, antreanPemeriksaan: antreanPemeriksaan }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
            msg: 'Simpan Berhasil',
            code: 200
        });
    } catch (error) {
        // console.log(error);
        if (transaction) {
            await transaction.rollback();
            res.status(201).send({
                status: error,
                success: false,
                msg: 'Simpan Gagal',
                code: 201
            });
        }
    }
}

const getPasienNoregistrasi = (req, res) => {
    const id = parseInt(req.params.noregistrasi);
    // console.log(id);
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
        // console.log("masukkk")
        tglregistrasi = ` and td.tglregistrasi between '${req.query.tglregistrasi}' and '${req.query.tglregistrasi} + ' 23:59'' `;

    }
    let query = queries.getDaftarPasienRegistrasi + `  where td.noregistrasi ilike '%${noregistrasi}%'
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
    if (req.query.start !== undefined) {

        tglregistrasi = ` and td.tglregistrasi between '${req.query.start}'
         and '${req.query.end} 23:59' `;
    } else {
        // console.log('massuukk')
        let today = new Date();
        let todayMonth = '' + (today.getMonth() + 1)
        if (todayMonth.length < 2)
            todayMonth = '0' + todayMonth;
        let todaystart = formatDate(today)
        let todayend = formatDate(today) + ' 23:59'
        tglregistrasi = ` and td.tglregistrasi between '${todaystart}'
        and '${todayend}' `;
    }
    let taskid = ""

    if (req.query.taskid !== undefined) {
        if (req.query.taskid === '2') {
            // console.log(req.query.taskid)
            taskid = ` and ta.taskid=4`;
        } else if (req.query.taskid === '3') {
            taskid = ` and ta.taskid in (5,6,7,8,9)`;
        }
    }
    // let query = queries.getAllByOr + ` where nocm ilike '%` + nocm + `%'` + ` or namapasien ilike '%` + nocm + `%' limit 200`
    let query = queries.getDaftarPasienRawatJalan + `  where td.noregistrasi ilike '%${noregistrasi}%'
    ${tglregistrasi} ${taskid} and td.objectinstalasifk =1`
   

    try {
        pool.query(query, (error, resultCountNoantrianDokter) => {
            if (error) {
                res.status(522).send({
                    status: error,
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
    const noregistrasi = ""//req.query.noregistrasi;
    let tglregistrasi = ""
    if (req.query.start !== undefined) {
        // console.log("masukkk")
        tglregistrasi = ` and td.tglregistrasi between '${req.query.start}'
         and '${req.query.end} 23:59'`;

    } else {
        let today = new Date();
        let todayMonth = '' + (today.getMonth() + 1)
        if (todayMonth.length < 2)
            todayMonth = '0' + todayMonth;
        let todaystart = formatDate(today)
        let todayend = formatDate(today) + ' 23:59'
        tglregistrasi = ` and td.tglregistrasi between '${todaystart}'
        and '${todayend}' `;
    }

    // let query = queries.getAllByOr + ` where nocm ilike '%` + nocm + `%'` + ` or namapasien ilike '%` + nocm + `%' limit 200`
    let query = queries.getDaftarPasienRawatJalan + `  where td.noregistrasi ilike '%${noregistrasi}%'
    ${tglregistrasi} and td.objectinstalasifk =1`
    // console.log(query)
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
                if (resultCountNoantrianDokter.rows[x].taskid == 3 || resultCountNoantrianDokter.rows[x].taskid == null) {
                    totalBP = totalBP + 1
                } else if (resultCountNoantrianDokter.rows[x].taskid == 4) {
                    totalSP = totalSP + 1
                    
                } else {
                    totalSSP = totalSSP + 1
                }
            }
            const taskWidgets = [
                {
                    id: 1,
                    label: "Belum Diperiksa",
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
                    label: "Sedang Diperiksa",
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
                    label: "Selesai Diperiksa",
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
    let query = queries.getHeaderEmr + ` where ta.norec ilike '%${norecta}%'`


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

async function getWidgetDaftarPasienRI(req, res) {

    let query = queries.widgetgetDaftarPasienRawatInap

    pool.query(query, (error, resultCountNoantrianDokter) => {
        if (error) {
            res.status(522).send({
                data: error,
                status: "Connection Time Out",
                success: true,
            });
        } else {
            let totalTKosong = 0
            let totalTTerisi = 0
            let totalTRusak = 0
            for (let x = 0; x < resultCountNoantrianDokter.rowCount; x++) {
                if (resultCountNoantrianDokter.rows[x].objectstatusbedfk == 2) {
                    totalTKosong = totalTKosong + 1
                } else if (resultCountNoantrianDokter.rows[x].objectstatusbedfk == 1) {
                    totalTTerisi = totalTTerisi + 1
                } else if (resultCountNoantrianDokter.rows[x].objectstatusbedfk == 6) {
                    totalTRusak = totalTRusak + 1
                }
            }
            const taskWidgets = [
                {
                    id: 1,
                    label: "Siap Pakai",
                    counter: totalTKosong,
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
                    label: "Terpakai",
                    counter: totalTTerisi,
                    badge: "ri-arrow-down-line",
                    badgeClass: "danger",
                    percentage: "0.87 %",
                    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAIABJREFUeJzt3Xm8HGWd7/HvU72c7rPknKwQlsiiEEDjKGgiwxZUBsE7BpRccWETca7jXEfRq86ijDN3RkZx9M4d74DIEhEYIiYhQECWGEAImwORJYACCoEkZ1/69Fr13D8OZ4yY5Zzurn6quz7v1wt54StPPb+zpH7ffqrqKQkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgD0zrgsAMHWbNm2yrmsI06JFizgnAQ3iuS4AAAA0HgEAAIAYIgAAABBDBAAAAGKIAAAAQAwRAAAAiCECAAAAMZR0XQCA+on6c/Stvo8B0ExYAQAAIIYIAAAAxBABAACAGCIAAAAQQwQAAABiiAAAAEAMEQAAAIghAgAAADFEAAAAIIYIAAAAxBABAACAGCIAAAAQQwQAAABiiAAAAEAMEQAAAIghAgAAADFEAAAAIIYIAAAAxBABAACAGCIAAAAQQwQAAABiiAAAAEAMEQAAAIgh47oAoJn96qS321rGL1iwoF6lOJG+fPW0ziGbNm3a7fdr0aJFDT0n7amePWn2n1/c9fT0xLoHsgIAAEAMEQAAAIghAgAAADFEAAAAIIYIAAAAxBABAACAGCIAAAAQQwQAAABiiAAAAEAMEQAAAIghAgAAADFEAAAAIIYIAAAAxBABAACAGCIAAAAQQ0nXBQBAs/rCZtcVxNu3FrquoLmxAgAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAAKADen/tugQ0GAEAAGJuQd+L+sy6b7suAw1GAACAGFvQ96L+563fVHsp57oUNBgBAABiiuYfbwQAAIghmj8IAAAQMzR/SAQAAIgVmj8mEQAAICZo/tgRAQAAYoDmj9cjAABAi6P5Y2eSrgtANPXf+rbDK7ncedbPL/Er4wfaSmGm9ctpP/A93w+MrJW1E3/WmIn/SSQ8m/ASgUmkSolUZ2+mc6+HMp3zf2o149b2d6/c4vQLComRkZWtery1VsaYOlbUUEXXBWDPaP7YFQIAJEn9N719SaUw+JVyfvCYSmls5uCL/znlrmSt5BmrdMo3mYyfaEuXsslUboEx2xYov+lDkqfibfuM+97ezwRmxu0dmZlXmmNXPRvm19MwnqwCVd3BmzwAjLouALtH88fuEABirO/GQ95RKeW+Uxzvf8fgy79ITXd8wpPaO6Rsu9SWfm0lYKcCmcor7Um98jZJbyuXzJeLty0Y8b3970qkZv1V29K1m2v6QhxKmIRfUaXqv0c2sM18IY4AEGE0f+wJASBm7PoTkn29L19dGHvlg0Pbnm2r5hjZrNTZIWXaVd1HX2tlKr+dkdRvT7Ol5Gn52w7ZqvT+38ssPfZ/G3NRUM0hXTGeKcmv/u+RH1SUUKKeJTVSn+sCsHM0f0wFASAmtq7Yq8MmUit/86t7T66U/Wn3baOJT/vd3VKyjr81RhUlKs/urcqzXy/d9uRf5e88bkWmp/tz5qi14/WbJTyJZKK3XC6/odrxlYqvdLqeFTXUM64LwB+i+WOqCAAt7pVLj2z3urdtGB9+5ajAr+7DdWfnRONPhPxB1fhbMwl/6wXl7TPPy9957H9kBvY+zyxfWQp31tokjPeCpKoDQLlSrmM1jWUMASBqaP6Yjua9+og92nbDgZeUvcdHxwZerqr5Z7PS/PnSrFnhN//fEwwmE4V7P1rqvG8od+dJn27gzNPmJbxHahlfKjZvAAhkn3RdA36H5o/pIgC0oKG1b3v3lhUzRkf7Xvh8uVyZ9s84kZDmzJHmzpVS0741sH5M8Go2Vbjj3/K3H/Hr0vpT/shdJbuW9OyVtYwvlZr2SbogbYJ7XReBCTR/VIMA0GK2XX/AqoEtj92ZHxvprGZ8e7u0994T/44Gq0T5yYNsfsMvRu848e9dV/N6s1fe+1QqlSpUO973fZXLTbkK8Li5bC03AUYAzR/VIgC0iO03HLH3y1f39I8OvLgsCKa/MY0x0uzZE5/8G7rcP0UmyJm24vq/Gb/9jx6zt75vhut6dpRKJmtaCs/n8/UqpWGs0R2ua4B0QO+v9dlbL55S88+nsw2oCM2EANACtv34rR/LDz+zpZAbmlXN+ERS2msvqaOj3pXVm1Wy/NhbS97jr47eeepS19VMSieS361lfD7fFA88/B7jm2td1xB3C/pe1GfWfVvZ0p4DZD6d1b++7wsNqArNhADQ5Lb/+NB/yPVt+mE11/olKZOZWPJvpkfRTOWV9nTxZ3fl7/qTT7quRZLm/GTDD1PJZNWXAYrFUpNdBjBPpq9Y9bjrKuJsOsv+k83/xbkHN6AyNBMeA2xiW1ce9IPR3mfOs1VuRZ/NTiz5N+NOtMbmjJf/2WX5u9+9d/bEu5zfG5Bua7uzXKm8v9rxY2NjmjlzZj1LCo8NfuC6hKj43uXnuC5ht8Jo/lG652D8W1e5LqGpsQLQpLb+x4E35/qer7r5t3c0b/OfZFRUYnz91/N3HHuF61oS3V2fNMar+q1AuVxOfpX7NDRYf8ray10XgT1r9eaP2hEAmtC2Gw746Vj/C6dW2/w7OqQ5s5u7+f9OoCAx+5zhB6/8iMsq5l1169ZsNnNPteODINDYaPS31jdG3zFX3BT9QmOO5o+pIAA0md6Vb/r3sf4X31vt+Gx2YmOfVlFuX6Zy+zJjrblq+P4rT3ZZS3uXd24i4VX9MX50dER+4NezpHrbljSpf3VdBHaP5o+pIgA0kd4bD//aaP9zn6r2k39b28Sjfq3xyf+/mv/kf6asZ24cefDqd7mqp+eH97yQzWSvrnZ8YK0GB4fqWVJdWekL5rKVw67rwK7R/DEdBIAm0feTRWeN9j59UVDl58tkcmJnP69FfuKva/6T2gPZNUM/v8rZ7c57rbr3/FQ6NVLt+PFcToVC1Q8UhGlD+vLVP3JdBHaN5o/papF20NpGb3jb3PGBp6+sZoMfaeIT/5w5Ld/8J1jNVUI32Fv/T1WvOq6VkYJ0e2aZ55mqbwjsH+iP2g2BQ778c41U9deEcNH8UY0WaQmtbbT82ydLpXLVP6uZM5vrOf/d2W3z/523j8ya8Y1G1LMz82/YsD6bbf+Xasf7FV8DA/2KSL+11tjzspevfcF1Idg5mj+qxT4AEbf9+oOvGxn49dxqx7d3TLzOtxVMsflLkqz02cGNV/9s5pKz14Rc1k7NX3Xvha8sO+a48fHxo6oZn8/nNTQ0rJ6ennqXNi1W9uK2769Z5bSICPv0+Ve5LqHummmToW85mbV1sAIQYf0/+aP3jg09/+Fqxye8iU//rWA6zf81xsj+YOyhK/cOq6Y9mZ+6b0lbW+b5asePjIxobGysniVNk/1R+vI1f+WwADRYMzV/1I4AEGH50ed/Uu11f0maOWsiBDS7Kpr/pNl+YC6udz1TZVbKT2j2W9ra0turPcbAwKByucaHACOtTXl7cd0/ZqbzYiGaf/NrgfbQmnp/fOg3C7nqXukrTTzvH51X+lavhuYvSbLSxwcevPLYOpY0LfusXTuujDmgLdP26+qOYNXfP6jRxm4SdE3Sm/dBc9llzfSCAtTBdF4sRPNvfgSACLK3vrFtfPD5z9dyDMeXjuui1ub/GuPJfNfecIOzlxzvv/KB/H43PXBIe3v7Q9UdwWpwcFCDg4P1LWwnE1nZb6QuX30WzR87Q/NvLQSACOobLd5TLld/139Hh5RK1bOixqtT859g9bbhBeOfqM/BqmOkYJ/V9y3u6uq82DPVPSI4Ojqq7du2ya+EsFug0Yi15r+3Xb7mKyz7Y2do/q2HABAxA3cc2T02tOWd1Y43RururmdFjVfX5v87f2MfudR5LNrrxnu+nG2fsTSVSle1o16hWNTWra9qfHy8nmVt8BN6a9sPVq2s50HROmj+rYkAEDGVgb5VtWwC09Exsetfswqp+UvS/iN++owwDjxd81et37Dglo0zOzo6/62adwf4QaC+vj5t375dlUql6jqs7FbJnp26fPXS7L+vfrHqA6Gl0fxbFwEgQqyVyY9sOb6WY3Q18TP/ITZ/SZK15kvW2ki8CcFIdv6qez7T3dlzYEdHx92mip0DC4WCXn31VfX39083CPQbo79Ne+mF6cvXrGDJH7tC829tTfxZsfX03fjGFeXyr6oOZZmMlGrSHf/Cbv6vWTSyccXJktaFPdFUzVp5528lvXvbme/ey88XLi2VyidXKpUpb2NsrVUul9P4eE6ZbFadHZ3KZjOSdppznpC1V6Ta0t8331vpcoMBNAGaf+sjAERIaezVD9UyvqurXpU0VoOavyTJyn5SEQoAk/a67q5tkpZJ0tZlx59ZUeVzlXLlzZVyJTuVD+jWSvnxvPLjeSWSCWUzWXV2dATptrZNVvYOY8y16e+vfizsrwOtgeYfDwSAiBj48ZsXDW5/IlPt+IQ3sQLQbBrZ/CVJRqcO33/5rO6jzx9o3KTTs/fqDddJuk6Sek979yFBovSJoGKP9AP/4EoidYDKJfl+RfKtrKyMl1AimZDXllHCrzyXTCSeTKcTG5Qw16cvX73V8ZeDJkPzjw8CQESUKsOX1nIhNts+8QRAM2l485+QDrzEMklXNHriasxdddezkr40+d+bNm3a7a/JokWLDgm9KLQsmn+8cBNgRJRzvVW9NGZSNluvShrDUfOXJBmZM51MDEQYzT9+CAAR0PfjRYuLxULVqzGeJ2WaKAC4bP6vWTp8/+WzXBYARAnNP54IABHgB7kv1zK+rW0X93xHUASavyQlApM8xnURQBTQ/OOLABABfmno6FrGt035oTG3ItL8JUnG6DjXNQCu0fzjjQAQAZXCyJxaxjdDAIhS839NTRsuAc2O5g8CgGN9a49cWCpV/+IfY6R0xANABJu/JL2tf+M1M1wXAbhA84dEAHAuKObOrmV8Mhnt6/8Rbf6SlEja4DDXRQCNRvPHJAKAa35+cS3Do/za3wg3/wnGvsl1CUAj0fyxIwKAY5XK+BtrGR/VABD55i8psEFN33ug2dD8sSMCgGO2nJ9dy/hkol6V1E8zNH9JMvJYAUCs0PyxIwKAY75fqukWPi9iAaBZmr8kydgDXZcAAK4QABwLAr+mn4EXoZ9gUzV/SbJq0vcnAkDtItQ+4slaW9NN/ImI/ASbrvlLkjEEAACxFZH2EV82qOUdgJKJwE+wKZu/JMl2uq4AAFyJQPuIN2trCwCuNW/zlyQuAQCIr6rfQAc0efOXjJynr2XLlk2rhq9+9at1Pd7q1aujvI9U5H1roesKgOqxAuCYMTWefx21sKZv/pJkNea6BABwhQDgWK0BwEX/b4nmL0kyBAAAsUUAcMx4pqYeXvHrVcnUtE7zl2TtqOsSAMAVAoBjiUQiqGV80MAA0FLNX5L1zIjrGgDAFQKAY16irVDLeL9BAaDVmv8E+4LrCgDAFQKAYyaZ7a9lvF+pVyW71prNX1Jgf+W6BABwhQDgWCKZrakJlcv1qmQXx2/V5i/Jk3nOdQ0A4AoBwLFEKruxlvGlEANAKzd/SZIlAACILwKAY7Y04+paxvu+5Nd0G+HOtXzzlyqloPK06yIAwBUCgGNzP/zQs+l0qqYWXirWq5oJMWj+ktV/zj3mEzwGCCC2CAARkMzM6KtlfLGOASAWzV+SjDa4LgEAXCIAREAiM/PeWsYXanqQ8Hdi0/wlecYQAADEGgEgArxE9p9qGV8q1X4fQJyav6RKUEr+3HURAOASASAC5p72y0fT2UxN9/MX8tWPjVnzl2Tv6jn2o4OuqwAAlwgAEZHKzHuwlvG5XHXj4tf8JWu861zXAACuJV0XgAmp1L6fNOa3T9sqXw1UKEw8EphITH1MHJu/pIJNFFa7LmLS6tWrp/U6yE2bNu32N2TRokU1vl86Xlr9+7Wn35c9afXvT9yxAhARcz70wOZ0trOmjX1z41P/szFt/pJ0y6yjPjXsuggAcI0AECFt7fvfWMv4sSk+1R7j5i9Jl7kuAACigAAQIfOWP/3hVDpV9ZJdpSLl93AzYLybv3m8e/HZd7iuAgCigAAQManOgx6tZfzIbt5wH+/mL8nqn4wxNV0TBYBWQQCImuHO4xPJ6n8sxeLOdwaMffOXXuguLKjpEgsAtBICQMTs86lHx9tmHPBELccYGvr9/6b5S1b2H8zSpTXdZAkArYQAEEHzveyRqbZ01UvVxaI0/toTATR/SdKjPYt/c5XrIgAgSggAEWSWP1lKd7/5e7UcY2hIKmU/QPOXrJH9jDEXhfDSZABoXgSAiJr/oV98pq2jp1TteJM9UIPBe+pZUrO6qnvJuRtdFwEAUUMAiLC27Js+4HnT34gr1XWghtvO1dDQkMrlGF/2NupNqvwV12UAQBQRACJs3vKHb8vOOuKW6YyZbP6SZK1Vf3+fqt1euMnZILCf6FzyyW2uCwGAKCIARNz85U+8v61rrym96mfH5j+pVCppZCSWO99eMutd5651XQQARBUBoAmY+W9+Q3oPTwXsrPlPGhkeUbG0k80BWtcj3V3tf+26CACIMgJAE9jvPXf1e11H/fmu7gfYXfOXJCurvt4++b4fVolRsk3GW26OWF71DZQAEAcEgCax3/L7/196zh9/13vdT2xPzX+S7/vq6+2Tbe0bAkZlg1N6Fp/1gutCACDqkq4LwNTt96H7/vLlG95xSLH/4fdZO/XmP6lYKqqvr09z5s6RUcu95rss6UM97zrvF64LCRPvZwdQL6wANJn9lj98SlvPYZtSMw6aVvOflM/nNdA3ILXWQkBgZM/qWXLOT10XAgDNggDQhPY78+m3lmZ++l9MlZ8Fc+M59Q/0t8rjgSVj9LHuJede77oQAGgmBIAm9aZTv/D5jo7Ov646BORy6u3dLmubeofcMRPYD3QvPuc614UAQLMhADSxg075/D9m2rvO8jyvqi5eKBS0fdt2+UFThoBtssHx3Uefe5vrQgCgGREAmtybTv3cD7u6u45PppLj1YwvlkrauvVVFUtN9NSc1cMy3rta/YY/AAgTAaAFvOG9n73P8/baO5PJPFrNeL/ia/vWrRobG6t3afVmrfR/ume0H8OjfgBQGx4DbBELP/CJUUlHPX/zJV8fz+f/OrDBtMKdlTQwMKB8Ia9ZM2cpkUiEU2j1+ozROT2Lz5nWuxEAADvHCkCLOej9F361q6t9USabeb6a8fnxvF599VXlclVdUQhDIOnKhO8d0U3zB4C6YQWgBb3h5M8/Keng52+55M8LpeI/V8qV9umMD4JA/f19GstlNHNmj9KpdEiV7tEvvCD4ixlHn3e/qwIAoFWxAtDCDjr1wn8b3392T2d7+9VeIlGZ7vhioaCtW7eqv79ffqWB7xEw+rWVzute/OI7aP4AEA5WAFrcUUd9qizpnBfWX/Rn/ljXxaVy8YJKpZKZ8gHsxJ4B4+M5tbd3aEZXl1LpsFYEzOPW2G/3jL/hWrN06bQDCwBg6ggAMXHg0osKkj5rrf3LF2/7ly8VS+W/KBeL+0x1M0D7WhDI5XLKZjLq6OxUtr29Hm8UKEi6WbKX9Sw5547aDwcAmAoCQMwYY6ykb0j6xi9XX7J/NmG/6vuV08ql0uyphoF8oaB8oSDP89TR3qFse7va2tIyU9+W0LfSRiOt8JW8fvaSj41U9cUAAKpGAIixtyy78CVJn5T0yWfWfntfzwQXBL5/ih8Eh/rlcteeAkEQBBodG9Xo2KiMMcpkM8pksmprSyuVTGuHPOBLesxKPzfG3md8/66eo88fCPFLAwDsAQEAkqRD/9vnt0j62mv/aOvtK+YV1P/+wPcXB4E93A/s/jYIZgZB0GYDm7SyXhAERsbIM8YaKSiXKpWgMlrM57yhRDL560w2fVtnZ+f6Yq7j6XlLl0d+lyEAiJOmebf4GWtf2jdIlr9SKVfeUw4q+9mKzQY28GyDXmlnPKNstl2ZTJvSybSSqYSM8WSMKctoSIFetEaPeTJ3+5XSLVccM3e0IYU5suj2FfMC6328UqkcFwTB4X4QzLG+3xFYm7TWmmp+Lp4xMp4XGGN8z0vkvKR5pS2ZfjzT0b4imahseODo5fkQvhQ00KZNm3b7i7Fo0aKmOSc1gz19v/eEn0dri/wP94zbXji5VK58t1AoHNKoZr+jZCql7q4Zyna0y5v6Ne5xWV2XMObiS5d0PxdmfY10xJ3XvMMWK39bLFWOLVdKPQrpx5FKp9SebVc2m1UqnZ74JTUqWqsHJa0NAnvdA0f/ty3hzI4wEQAaiwCA3YnsD/fM9c/MGc8l1hXG80fZsDrNbhhj1NPTo86uTpnqv01lSd+p5Lu/etVSU6hjeY2z/qLkwvyBf+eXKn9WLBdnhfajMFJ7e4e6urrUtufHDANZrbfS936+5JHVMhc15esM44gA0FgEAOxOJH+4Z9z+/HtzueJNlUp56s+r11EqmdKcOXOUSqfqdciNXjJ1+mVHdbxarwOGzlrvsFtXfLtULP2PcqUc2laAxhjN6Jqhzq7Oat8/8LQ1unif34xfs3L58gbuVoRqEAAaiwCA3YncToDL1v36zLHR/G2umn86ldZee8+rZ/OXpCVBpfzQ+RsHFtXzoGFZtO6HZ75x9eUjuVzus2E2/2x7VvvsM1/dPd21vHzoMGN11asL2h86+sG176pnfQDQyiIVAM64/fn3FnOFa/zAd1JXKpnSvL3myvNCeRPefpJ3ywWP5OaHcfB6WHT77R0Lb75y4/Do6LWlcrkjrHmSyaTmzpuruXPmKpGo24Mob/es+fkxG2++9KTHbw+tdgBoFZEJAMtWDfaMjxfXuGr+xhjNmTMnrOY/ab+gUl77uftfyoY5STXe8tMVx4+P/3bb+Hh+cZh3XGQyGe29997KZkL5FhhJF4znyw8fd/8tbwljAgBoFZEJADbVf0e5XHbWGHt6euq97L8rR455nV9uxERT9ZZ1135qdGT87jA/9UtSZ2en5s2dK88L/dfusMCzDx7z4M1nhD0RADSrSASAM2574eTCeP4oV/MnUyl1dnU2bD4rc+E5D43t3bAJd+OwW6/6h5HR4X8PgiDU34VZs2Zp1qxZ0tQfpaxVVlbXH7Pxlj9v1IQA0EwiEQBK5cp3XTzqN6m7a0Ytj/pVoyNpK19t5IQ7c8QtV/9zLjf+12F/72fOmqnOzsYFrB14kv2/x2682fn3GgCixnkAOGPtS/sWCoVDXM1vPKP2jvbGT2x11nn39XY1fuIJh69b8T/HcuNfDDt39fT0qKvT2ZcpSbLS3x3z4M3fcFoEAESM8wAQJMtfcbHD36Rstn06b7Grpw4vkTrFxcRH3PajpeO5/HfC/uQ/o6tLM2bMCHWOKbP60jEPrL3IdRkAEBXOA0ClXHmPy/kzmTZ3kxud2OgpD1h/ZaZQyK8JAj/U1NOWTqunZ2aYU0yfMV9jJQAAJjgPAOWgsp/L+dPJ0Pa5mYqGbwyUGTPry6VSqGvynudp9pw50dxn0upLhAAAiEAAsBXr9Jn4RDLU5/735KBGTnbEbSv+13hhfEnY88yaNUvJZITfNM3lAABwHwB8G+7jZ3uSCP+Z9F0z6m7UVCdceWUmnyv8fdg3/bVlMmpvd3BT5XRxOQBAzDkPAHJ4A6CkRj6X/oesGnYDwtZ53hUVvxLq9Q4jaebMiF333x0uBwCIMfcBAKE7ZO2lcwr5wvKw5+no7FQ61ZDdFOuHEAAgpggAMeCZ9DVB4Id7s4NRdB75my7uCQAQQwSAVrf+omSxWAr9UctsJhvtG//2hHsCAMQMAaDFHT5+0Bd9P+RP/1JD36UQGi4HAIgRAkCL8/3KBWHPkUwmlW2L3BuOq0MIABATBIAW9ubbr9i/UCweEPY82Uw2mpv+VIt7AgDEAAGghdlK8tONeM9Ctj0T+hwNxz0BAFocAaCFVWwQ+rsGjDFqa2vBACBxOQBASyMAtDC/UlkY9hxtbW2u3qbYGIQAAC2KANCiDr3vB13lcin0B/OTqSZ+9G+qCAEAWhABoEWlcm2nNGKXZcdvU2wcbgwE0GIIAC3KWv9tjZgnFisAk7gxEEALIQC0qCAwDXnVcFPv/lcNVgIAtAgCQKvyg1mNmKalbwDcFVYCALQAAkCLslJHQyaKYf+XxEoAgKZHAGhZDbgDUJIX2wQgVgIANDUCQIuyUrkh88TxEsCOWAkA0KQIAC0qkfAGGzFP4PuNmCbaWAkA0IQIAC3KmMRLjZinQgCYwGZBAJoMAaBFmSB4ohHzsAKwAy4HAGgiBIAWZdoqP23EPJVKpRHTNA8uBwBoEgSAFvXL95z3fCKRCP3jebFYDHuK5sNKAIAmQABoYclUakvYcxSLxUY9cdhcWAkAEHEEgBaWSCR+HvYcQRCoXG7IE4fNh5UAABFGAGhhXlrfbMQ8hWKhEdM0J1YCAEQUAaCFPfXes/8zlU6Phj1PbiwX9hTNjZUAABFEAGhx6VR6ddhzlMollUqlsKdpbqwEAIgYAkCLS/V0fsF4Xui36Y2NjYU9RfNjJQBAhBAAWtymPz59e7Yt82DY8+RyOQVBEPY0zY+VAAARQQCIA8+c7YW8CmCt1eho6LcbtAa2DQYQAQSAGNh86tnPZjKZDWHPMzI6qiBga+ApIQQAcCzpugA0RiJZ+WAymdhWqfih/cxtEGhwcEizZ88Oa4rWMhECdN/i93/ZdSmNsmjRopi/P7qx+H5jd1gBiIknTz5/IJPJfC3seXK5nAoF9gWYMm4MBOAIASBGnjrl7H/MZDOPhz1Pf38/NwROBzcGAnCAABAzbaZtaTqdDnXnHt/31d/fzzsCpoOVAAANRgCImV++/6ODbe3ZY8J+U2A+n9fw8HCYU7QeVgIANBABIIaePOmjj3W0Zz9lTLj3Bw2PDCuXY5vgaWElAECDEABi6on3nfWDzo7tZgueAAASAUlEQVSOr4d9i3D/wAA3BU4XKwEAGoAAEGNPnnLW17IdHdeGOom16u3rU4lXBk8P+wQACBkBIOY2n3r2R9vb2x8Ncw4bBOrdvl2VCpsETQshAECICADQ5vH2xW2ZzG/DnMP3ffX2befxwOkiBAAICQEA0vLlfoc/863pdHokzGnKpbL6+/pleT5weggBAEJAAIAk6bHTThtKtSeOSiaTpTDnyRfyGhgYDHOK1kQIAFBnBIAm19/fv3+9jvX0Sec+19GZOcnzvFDX6XNjYxoZYY+AaSMEAKgjAkCTSyQSK6216Xod75cnnbWho73j3LD3CBgaGlZujD0Cpo0QAKBOCADNb/Hw8PA/1vOAT57y8RUN2SNgkD0CqkIIAFAHBIDW8PnBwcHT6nlA9giIOEIAgBo5f1f0STdscnpL+IIFC1xOr8uX9NT0MxgaGpr8/uU9z3v3jBkzHqhDWf/l0LVXPprP599ez2O+XiKR0F5776VkIhnmNC3pvsWPJGQuqvqejR1+fwAXSpJykgZf+3dO0kuSnjXGbJb0jO/7z86aNYubhkLAGbd1ZIMguGl4ePjo7u7u5+p10GfyHe98U1vwQrFYrNvNhq/n+776tvdp3l7z5HksSgExkn7tn5k7/H9LJMnaiWzqeZ6Ghoael3Tn5D89PT08SlQHnG1byxxr7brR0dG5dTvi8uV+JpF5ayqVGq3bMXeiVC6xRwCAXTlI0gWSbpDUOzw8fM/Q0NAFg4ODPY7ramoEgNZzcBAEP7HWZup1wF++/6OD6Y7kkalkij0CALiWsNYeK+lSY8yrQ0NDNwwPD59qraWfTRPfsBZkrT1meHh4RT3/Qjx90rnPtXe2NWSPgGH2CAAwNRlJZ1hrbx4aGvrl4ODgWdZaLm1PEQGgdZ0xPDxc17vEG7VHwPDQsHI59ggAMHXGmMONMVcPDw9vHhoaOp8gsGcEgNb2xeHh4b+o5wEn9gjo/PvQ9wgYYI8AAFU5WNL3h4eHHx0ZGflj18VEGQGgxVlrv1P/PQI+/lX2CAAQcYuCILh3cHBwxejo6DzXxUQRAaD1ecaYH42MjLyrngfdfOrZH81ms7+o5zFfzwaBerdvV8WvhDkNgNZljDEf933/qcHBwQ+4LiZqCADxMLlHwJvqedBn8h3vbGtre6mex3y9yT0CgiDUew8BtLbZxpjVQ0NDl9bz3SnNjgAQH+wRACDuLhgeHr53aGjoQNeFRAEBIF7YIwBA3L1T0iP1vizajAgAMcMeAQCgWUEQ3DE8PHyy60JcIgDEE3sEAIi7DmvtmuHh4TNdF+IKASC+2CMAQNylrbXXxDUEEABijD0CAECetfbqOF4OIADEG3sEAICUstbeGLcbAwkAYI8AAJDagyBYMzg4eIDrQhqFAACJPQIAQJLmGmNuiMtmQQQATGKPAACQ3jEyMvJProtoBAIA/gt7BACAZK39XL1vkI4iAgBejz0CAMSdMcZ8f2RkZI7rQsJEAMDOsEcAgLibHQRBXT8MRQ0BADvFHgEAoPNa+dFAAgB2hT0CAMSdCYLgUmtt0nUhYSAAYHfYIwBA3L1laGjoLNdFhIEAgD1hjwAAsWaM+atWXAUgAGAqDvZ9f+0rr7zSXq8DskcAgCZy8MjIyBmui6g3AgCmanF7e/tV7BEAII6CIPibep7/oqClvhiEjj0CAMSSMebwkZGRlnpjIAEA08UeAQBiyVrbUjcDEgAwbewRACCmPjA4ONjjuoh6IQCgGuwRACCOMsaYD7ouol4IAKgWewQAiKOPuy6gXggAqAV7BACImz/u7++f4bqIeiAAoFbsEQAgTpLJZPJY10XUAwEA9cAeAQBiw1q71HUN9UAAQL2wRwCAuDjRdQH1QABAPbFHAIA4eGtvb2+X6yJqRQBAXbFHAIAY8FKp1CGui6gVAQD1xh4BAFqeMeZQ1zXUigCAMLBHAICWFgQBAQDYBfYIANCyWAEAdo89AgC0JGvt/q5rqBUBAGFjjwAALccY0+m6hloRANAI7BEAoNXwGCAwRewRAKCVEACAqQprj4BMe8fKeh7zD7BHAIA/1PQBIOm6ANSmp6cn7A/AkffM+89e3oh5ftOISRqM3x8gvlgBAAAghggAAADEEAEAAIAYIgAAABBDBAAAAGKIAAAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAAIAYIgAAABBDBAAAAGKIAAAAQAwRAAAAiKGk6wLi7vyNQ9Z1DQCAqpRlNKRAL1qjxzyZu/1K6ZYrjpk76rqwqTCuCzjphk1OG+CCBQtcTg8AaC3jsrouYczFly7pfs51MbvDJQAAAOqnXUaf8GWfPH/j0D+fs95mXBe0KwQAAADqLyXpi8ns8PoLHsnNd13MzhAAAAAIz5KgUn7o/I0Di1wX8noEAAAAwrWflFj3Z/f37eu6kB0RAAAACJ3dp+Il13zu/peyriuZRAAAAKAxjhzzOr/suohJBAAAABrEylwYlZsCCQAAADROR+CX/9Z1ERIBAACAxrI667z7ertcl0EAAACgsTq8ROoU10UQAAAAaDSjE12XQAAAAKDxnG8MRAAAAKDxDnJdAAEAAIBGM+p2XQIBAACARrNqc10CAQAAgBgiAAAAEEMEAAAAYogAAABADBEAAACIIQIAAAAxRAAAACCGCAAAAMQQAQAAgBgiAAAAEEMEAAAAYogAAABADBEAAACIIQIAAAAxRAAAACCGCAAAAMQQAQAAgBgiAAAAEEMEAAAAYogAAABADBEAAACIIQIAAAAxRAAAACCGCAAAAMQQAQAAgBgiAAAAEEMEAAAAYogAAABADBEAAACIIQIAAAAxRAAAACCGCAAAADSaUdF1CQQAAAAazWrYdQkEAAAAGu951wUQAAAAaDAjPe66BgIAAAANFhjd5boGAgAAAI2VaxsvrXNdBAEAAIAGstK131s6b8x1HQQAAAAap2QT+obrIiQCAAAAjfTtK97R4/wJAIkAAABAozyQHei+yHURkwgAAACEzrySDCpn/OspxvkOgJMIAAAAhOslL/BP/vej52xxXciOkq4LAACghT1Q8ZKnX7Wkc6vrQl6PFQAAAOqvZKR/yg50L73qndFr/hIrAAAA1FNO0o+ChC6Oyt3+u0IAAACgOiVJQ1Z6wVj9p5HWpwqlW6Owyc9UGNcFwK1jjjnGupx/zpw5LqcHYm316tX0gBjjHgAAAGKIAAAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAAIAYIgAAABBDBAAAAGKIAAAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAAIAYIgAAABBDBAAAAGKIAAAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAAIAYIgAAABBDBAAAAGKIAAAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAAIAYMq4LcO2kGzZZl/MvWLDA5fQAEFuXL+mJdQ9kBQAAgBgiAAAAEEMEAAAAYogAAABADBEAAACIIQIAAAAxRAAAACCGCAAAAMQQAQAAgBgiAAAAEEMEAAAAYogAAABADBEAAACIIQIAAAAxRAAAACCGkq4LQO2CsSGVf/O0Kq88r8rAqwqGemXzYwpKBUmSl87IZDvl9cxVYtZ8pfY5SKk3HCavs8dx5QBc4/wRXwSAJmXzoyo88YCKT/xclW2/2e2fDQo5qZCTP7hN5ReeUOHRif8/Of9AtR1xtDJHLJHJdjWgagBRwPkDkmRcF+DaSTdssi7nX7BgwbT+vD/cr/xD61R8fINspVyXGkwypcxbT1B28fvkzZhVl2MCiB7OH7/v8iU9se6Bsf7ipSYKAIGv/C/u1viGH8uWi6HUYpIpZZecqvZ3nSolUqHMAcABzh87FfcAwCWAJlDp3aKxm76nSu+WUOexlbLG71ut4jMPa8YHPq3EnH1DnQ9A+Dh/YFd4CiDiik9t1PCKvwv9L++O/N4tGlrxdRU3P9SwOQHUH+cP7A4BIMIKj96p0bWXypZLDZ/blooaXfP/lH/otobPDaB2nD+wJ1wCiKj8L+5S7o5r3BZhrXJ3Xy/JKPvOP3FbC4Ap4/yBqWAFIIKKT210/5d3B7n117OcBzQJzh+YKgJAxFR6t2hs3RWSdfpwwu+zVmO3/kB+X+OuIwKYPs4fmA4CQIRYv6yxm77n5Jrdnkxe05NfcV0KgJ3g/IHpIgBESH7jrQ29W3e6Kr0vc1MPEFGcPzBdBICI8If7lX/gZtdl7NH4/TcpGB10XQaAHXD+QDUIABGRf/DWum3NGSZbLml8462uywCwA84fqAYBIAJsflTFTfe4LmPKio//TDY/6roMAOL8geoRACKg8Mv7myK9T7KVsgpPbXRdBgBx/kD1Yv0ihKhYtmzZo5LeXo9j7b///jruuON0+OGHa86cOZKkvr4+PfXUU9qwYYNefvnlekwjSQ+vXr36nfU6GIDqcP5AtQgAjp1++unzgyB4pdbjpFIpfeQjH9EJJ5wgY3b+Y7XWav369bruuutULtf8icGmUql9Vq5cubXWAwGoDucP1IJLAI5Za0+s9RipVEpf+MIXtHTp0l3+5ZUkY4xOPPFEXXjhhUqlan5dp6lUKifUehAA1eP8gVoQAByz1i6u9Rgf+chHdOihh075zy9cuFAf/vCHa51W1tolNR8EQNU4f6AWBAD3FtYyeP/999cJJ5ww7XFLly7VvvvW9r5ua+3UzxoAwsD5A1UjALh3cC2DjzvuuN0u2+2K53k6/vjja5laxpg31nQAALXi/IGqEQDc66ll8OGHH1712COOOKKWqSVpZq0HAFATzh+oGgHAvc5aBk8+qlON2bNn1zK1JHXVegAANeH8gaoRAGLM1v7K0Ai9cxRAI3H+aH4EAPfGahnc19dX9diBgYFappYk9vME3OL8gaoRANwbqmXwU089VfXYJ554opappRprB1Azzh+oGgHAvV/VMnjDhg1VLcUFQaB77qn5BSLP1XoAADXh/IGqEQAcs9ZurmX8yy+/rPXr10973N13360tW7bUMrUkPVvrAQBUj/MHakEAcO/BWg9w3XXXafPmqZ8Hnn76aV1//fW1Titr7QM1HwRALTh/oGoEAMcSicR61Xg3bLlc1iWXXKK77rpLQRDs8s8FQaA777xTl1xyiSqVSi1TSpK11v6s1oMAqB7nD9SCtwFGwLJlyx6RdGQ9jrXvvvvq+OOP1xFHHPF7r/N84okndM8999Rj2W7SQ6tXr655H3IAteH8gWolXRcASdIPVae/wFu2bNG1115bj0PtyQ8bMQmAPeL8gapwCSACUqnUtZLyruuYhnHf92u/CAigZpw/UC0CQASsXLmyV9IPXNcxDZetXbu2+h1EANQN5w9UiwAQEdbaf5Y07rqOKchVKpVvuS4CwO9w/kA1Eq4LwIRnnnlmZOHChZ6kE13XsjvGmK/ddNNN61zXAeB3OH+gGqwAREixWPympJr31wyLMWZTMpn8tus6APwhzh+YLgJAhKxbt65ojPmgovmSjJykD69cubLkuhAAf4jzB6aLABAxq1atelbS+ZJ2vSNH4wXW2nNWrVr1tOtCAOwa5w9MB/cARNDmzZufXLhwYa+kU13X8prPrVmz5krXRQDYM84fmCoCQERt3rz5kcMOO6xP0slyt2OjlfTF1atX/4uj+QFUgfMHpoIAEGGbN29+eOHChZslnSIp3eDpx6y1H1uzZk0zPV8M4DWcP7AnvAugCZx22mmHWWv/Q9JbGjGfMWaT53n//cYbb6zpVaMA3OP8gV3hJsAmsGrVqqfnzZt3pKS/lDQW4lTjkv6uUCi8k7+8QGvg/IFdYQWgyZx++un7+b7/RWPMJyVl63TYcUnfr1Qq37z55pvr9rovANHC+QM7IgA0qTPOOGNupVI501r7MUnvqOIQVtLDkq7xff869uYG4oPzByQCQEv40z/9070SicRSa+0Sa+2hxpiDJM2V1PHaHxmT1GutfcEYs9lau9HzvPWrVq3a7q5qAFHA+QMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOzO/wdCZnwPlEoyLwAAAABJRU5ErkJggg==",
                    iconClass: "warning",
                    decimals: 1,
                    prefix: "",
                    suffix: "k",
                },
                {
                    id: 3,
                    label: "Rusak",
                    counter: totalTRusak,
                    badge: "ri-arrow-down-line",
                    badgeClass: "danger",
                    percentage: "2.52 %",
                    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAO3RFWHRDb21tZW50AHhyOmQ6REFGbGx4My1RN2s6NCxqOjE5ODY0ODA2MTQzNDQyMzQ0NjIsdDoyMzA2MTIwOLIuZSQAAAUAaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAABodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgogICAgICAgIDxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogICAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgICAgICAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICAgICAgICA8ZGM6dGl0bGU+CiAgICAgICAgPHJkZjpBbHQ+CiAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5VbnRpdGxlZCBkZXNpZ24gLSAxPC9yZGY6bGk+CiAgICAgICAgPC9yZGY6QWx0PgogICAgICAgIDwvZGM6dGl0bGU+CiAgICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CgogICAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgICAgICAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICAgICAgICA8QXR0cmliOkFkcz4KICAgICAgICA8cmRmOlNlcT4KICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMy0wNi0xMjwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgICAgPEF0dHJpYjpFeHRJZD5jMzcwYmVkNy02MjQwLTRlYTYtOTYxMC1hYjJiYTI5NGNhM2Q8L0F0dHJpYjpFeHRJZD4KICAgICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgICAgIDwvcmRmOmxpPgogICAgICAgIDwvcmRmOlNlcT4KICAgICAgICA8L0F0dHJpYjpBZHM+CiAgICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CgogICAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgICAgICAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICAgICAgICA8cGRmOkF1dGhvcj5wYXR1cm9obWFuIHNuYjwvcGRmOkF1dGhvcj4KICAgICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KCiAgICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICAgICAgICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+Q2FudmE8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgICA8L3JkZjpSREY+CiAgICAgICAgPC94OnhtcG1ldGE+WCQTrgAAdBRJREFUeJzs3XtsFVd+B/DvzH3ZBozBgCGACcR5E1YJzea5Sbq0m6zybLPaldJqV5W2/a9ardS/qmZX6kuVulW62a6iNs/llbB1yAaShrCACSGBLBjCyxhjbAw2xvjt68d9zJzTP66TgOPHfczMmbnn+5GsxJeZc37jO3fmO69zDSmlBBEREWnFVF0AEREReY8BgIiISEMMAERERBpiACAiItIQAwAREZGGGACIiIg0xABARESkIQYAIiIiDTEAEBERaYgBgIiISEMMAERERBpiACAiItIQAwAREZGGGACIiIg0xABARESkIQYAIiIiDTEAEBERaYgBgIiISEMMAERERBpiACAiItIQAwAREZGGGACIiIg0xABARESkIQYAIiIiDTEAEBERaYgBgIiISEMMAERERBpiACAiItIQAwAREZGGGACIiIg0xABARESkIQYAIiIiDTEAEBERaYgBgIiISEMMAERERBpiACAiItJQWHUBROQx24JMJSFTSQCAEY3BiMaAEDcHRDrhJ56oiMj4IER/N0Tf+E9/N0S8Hxjf4ctUChD25DObIRjRaCYMRGMw58yDOW8hzPnjP/MWwpgz19sFIiLXGFJKqboIIsqdTCdht7fCvtAM+2ILRG8XZDrlap9GJAqzsgqh5asQqq5BaNlKGJGYq30SkTsYAIiCQgjYHa2w2pozO/3LFwAh1NZkmggtrkaougbhFTUILV0JmLy1iCgIGACIfM7u6oDVUI/06aOQo8Oqy5mWUTYbkVvvRPi2tQhVLVVdDhFNgwGAyIdkfBDp00eQbqiH6OlSXU5ezAVViNy2FpFb7+K9A0Q+xABA5CN2VztSB3fDaj4FFMtH0zAQrrkd0XvXIVS1THU1RDSOAYDIB+yO1syOv/WM6lJcFV55cyYILF2puhQi7TEAEClktTUhdWA37PYW1aV4KrRsFaL3rUN4xU2qSyHSFgMAkQJioBfJ3b+D1dqouhSlwitvQWzdMzArKlWXQqQdBgAiL9kWUp/VIfmHPYBlqa7GH8JhxL75bUTv+WOORkjkIQYAIo9YrWeQ3P07iIEe1aX4klmxALF1zyC88mbVpRBpgQGAyGUylUTy928jffqo6lICIXLrnYj96bOZIYmJyDUMAEQuElc6MLZtI4/6c2RWLEDpU38JcxEHEyJyCwMAkUvSRz9FYu92wOa1/ryEwih55ElE7rxfdSVERYkBgMhhMplA4sPfwmo6obqUohC+6Q6UPPp9GLES1aUQFRUGACIHicF+jNW+DNHfrbqUomLOW4jS7/01zLnzVJdCVDQYAIgcIro7MVr7CuTIkOpSipIxqxxl3/sxzIVLVJdCVBQYAIgcYLe3YOyd1yGTCdWlFDUjVoLSP/srhJatUl0KUeAxABAVyGo+ibH3NnFgH6+Ewyh94i8QrlmtuhKiQGMAICpAuuEIEh9sAaRQXYpeDBMl3/0BIrfdpboSosAyVRdAFFRWSyMSO7jzV0IKJHZsgdWi93cpEBWCAYAoD/alNiS2rwcEd/7KCIHE9vWwL7WproQokBgAiHIkeq9gbOtrkOm06lK0J9NpjG19DaL3iupSiAKHAYAoBzI+iNHalyETo6pLoXEyMZp5T+KDqkshChQGAKJsWRZGt74GGR9QXQlNIOMDGN36Gp/EIMoBAwBRlhJ170J0X1JdBk1BdF9Cou5d1WUQBUZYdQFEQWA1HkP62EHVZczImDUHoaplgNNfpZtKwu5qhxyJO9uuw9LHDiK8vAbhW76huhQi32MAIJqBGOhBYmet6jJmFL37EcS+9RhghtzpQNhIfrwDqUN73WnfIYmdtShbvBRmxQLVpRD5Gi8BEE3HtpDYvhEy5e8hfkPLVyH28OPu7fwBwAwh9vDjCC339zC8MpVAYvtGfg0z0QwYAIimkdy/A3ZXh+oyZhSuub0o+8qX3dWB5P4dqssg8jUGAKIpiJ7LSNV/rLqMrJizyouyr0Kk6j+G6Lmsugwi32IAIJpCYtc7ARrpzyjSvgogROY9JKJJMQAQTSLdUA+7vUV1GVQgu70F6YZ61WUQ+RIDANEEMplAcu/7qssghyT3vg+Z9PdNnEQqMAAQTZD6ZAfkqL+fd6fsydE4Up/whkCiiRgAiK4ihvqR+tz/A/5QblKfH4QY6lddBpGvMAAQXSX1hzpA2KrLIKcJO/PeEtGXGACIxsnhIaRPHFJdBrkkfeIQ5PCQ6jKIfIMBgGhc6tBejh5XzGzL98MYE3mJAYAIgBwdRvo4r/0Xu/Txg5Cjw6rLIPIFBgAiAKn6fZDptOoyyGUynUaqfp/qMoh8gQGASAikTxxWXQV5JH3icIBGeCRyDwMAac8638Tn/jUiR+OwzjepLoNIOQYA0l66gUf/uuF7TsQAQJqTyQSs5lOqyyCPWc2nODwwaY8BgLRmNR0DLD76px3Lyrz3RBpjACCtpU/xm+J0xfeedMcAQNqSyQTsjjbVZZAidkcbLwOQ1hgASFt2ewsg+TiYtqTIrANEmmIAIG3ZF86pLoEU4zpAOmMAIG1ZF5tVl+AYo2x2UfbltmJaB4hyxQBAWpKJUYgrnarLcIRZUYlQ9SrP+gtVr4JZUelZf24SVzohE6OqyyBSggGAtGRfbAEgVZdRGMNEuGY1Sh5/DoDhZccoefw5hGtWA0bQNyFyfF0g0k9YdQFEKtiXvLv7P3LLnYj80UMwK6tgmA7uqA0DMEPOtZeD0JJqlD7zI0DYgHQuSEkhIXq7kD68D+nGo461Ox37UhvCN672pC8iP2EAIC2Jviue9BNZfTdKHvu+J30p4XAAMUJAaPEyhJ54DgiHkT55yNH2J+PVukDkN0E/f0eUF682+tH71nnSTzHy6m/HAEC6YgCgCSQgJaQQma9MlfLan2Jg2xADfa53Y0SiMOcWx81yKphzK2FEoq73Iwb6ANt2vR8iv+ElAJ0ND0FeaIU83wzZ1gLZcwWw0pNOaly9769cCPPWO4D5C4Cq62BUzAdmzVJ2PTpXYqDXmwGAAvL38DUv/oZSQAz0wqxc5H5fRD7CAKCbkTjEwX0QBz8C0qmsboQ3Jk7T2w2xf8/XJ6xcCHPNWuDm22EsqAKi7h+95YOnfGki0XeFAYC0wwCgi5E47K2bIc+d/uq1fHb+0+nthqjbAdTtyPxeWgZz7T3A6rt8FQhEX7fqEshnuE6QjhgAip2UkJ/Wwf79tgmve9D32CjE/jpgf13m94r5MB/8Nowbbs5cPjC8fHb9K3IkrqRf8i9t1wnbBgYHIUeGgbbzQF8fICSQSgK9vcCqG4CSGFBWBlQugDF/PlA+FzB5+1gxYAAoYrKzHfb6l4Cxkbzmz+nof8ZiAPT3QWyv/fIl8657gPsfhrFoiadhQKaTnvVFwaDNOhGPQ7a3A8eOAI1ngOEZgs+5a4dK/nKTsHgJjPsfANasAWbPcaVUch8DQDFKJWFvewvy5BQDqTh96n8mU7QljnwGHPkMAGDe9xCMex4C5le6HgZkSpONPWWtaNeJVAroaIc8chg4ehRIOPT1x5c7IbfWAltrgarFMP782czZAkVn9Sg/DABFRp48Crv2N9NMMHMbXuz8JxIH9gEH9gGRKMwHHoHxzQeAOXMdLOQqxbqxp/wV0zohJeSFNmD3LqDhlPv9dV2GfOnXQCwG4wfPZc4KUCAwABSLdAr2W69fe5PfREF4jD+dgti7E9i7EyivgPndZ2DcfBvg4PPgRXu0R3krinViaBBy/z5gzyRP6HghmYRc/zqw4noYP/4boLRUTR2UNQaAIiBbzmSu9TtAxdH/lIYGILa8AQAwb7kDeGgdjGUrCj7NWBQbe3JUYNcJKSFbW4AP3gdaW1VXk9F2HvL5v4fx078Dli5VXQ1NgwEgyCwLYvsWiGNZjJfu01P/2RKNJ4DGEwAA89GngLvvhxErya8xXW74ouwFbZ0QAvj8KOTmjaormZJ84Rcw/vYnwIrrVZdCU2AACCjZ0wX75f8EkmNZTDzzJH7e+U8kPtwGfLgNxq1rYDz6FIzKBbk1EOJqTxMEZZ2wbeBIPeSWN1VXkhX5q1/C+MlPgeXVqkuhSQRkraeryRP1sN/ekOXE7taikjx9HLLhOLBkKczHn4WxYmVWlweMaMyD6ihIfL9OpFJA/WHId2ozz+kHiPyvF2E8/3M+LuhDDAABI977X4jDnzjaZpCO/ifV2QHxyotArATmd56AsfZeIDzNqu33jT15z6/rRCIBuWcXsGe36kryZ9uQv/h3GP/ws+k/l+Q5vhtBIWyIza9ANE9zl/9ERXbqf8b+konMQEPba2F+50kY9z446Ybd90d75DnfrRNjY5C7dgIf7VVdiTOG45CbN8H44Y9UV0JXYQAIglQS9ssvQHZfzn4e3Xb+E4id24Gd22HcfR/MP3ki822F44yIzzb2pJxv1onBAcgP3gcOH1ZdifOOfw50rAOWLlNdCY1jAPC74TisX/1rdjf7fSFYlwhzl8PyyUMHYB86AOO2NTAeexrG/Er/nu4ldRSvE7KvNzOqXmOj0jrcJl99FcbzP+OIgT7BAOBn8UFY//FzV5oO9NF/HmTDVTcMVvMIhK5lxBQNWtPTnbmj/3xrID5HBZEABgcyoxPevlp1NQQGAP8aHID1y3/KfT7NT/3PqLMDZtMphEcGYK9YBsnRygiAOa/S2w472iHfrgUutmV+12Hn/8X/bnkLxj/+s7pa6EsMAD4k+3thv/gvgBQ5zjjzJFrv/L8QicEcGYPZcBairBT29cshS/McVIiKgjl/kfudSAnZeg7Y8hbQ1+t+f341MgL09AALchy/gxzHAOAzcqAPtktH/oHm4PIZV32vgDk6BrOhCaJ8Fuzq5ZAx575zgILDnL/QvcalBJrPQr65CYgPTfLv7nXtC5MsnzzwKYwnn/K+FroGA4CPyP7e/Hb+WQr00b9TJAAzBCMUgrTtL182h0ZgnmyEnDML1opqyFik8K5SCchU0n+PmAWETCUhUw59fe00jLJZMErKnG9YSsimJmDL5sl3/EBwP0fZmmr56g8DDADKMQD4RSqV/86fp/5zF4kB9ujXXjbiI4ieOA27ojxzj0CkgI+IlLDOnkTk9rUFFKov6+zJzNGzyxw//S8l0HQGcssmID48zXTOdus70y1fPA6k00Ck8KBN+WMA8APbgvXrf8tvXu7882rLiEQhE5MEgPFpQgNDCA00wF6yCNaSRYBp5tVlsm4bzPIKhJbfkNf8urIvnkOybpsnfZnzHAoAUgJNTZDTHfHTV8ZGgchc1VVojQHAB+xN/wMM9uU+o85HEAW2ZcRKgPiE1ybpL9R5BaHOK7BWLIW9YH7Ozy/LxChGt/w3QlVLYVZWAaaDzz+bYYRvWo3w9TcB8Pq5agnrfBOsppOAsJxrVkiI3i7YXR3wagUPLbqusAa+uLlv4/rMkW1W8xTWpe9ls3zDI0A5A4BKDACKid3vQbY0udZ+oI/+nTJJ3UZpbtd8w20dCF+8hPTKFRDzynMuwO5qh93VnuN8M0sfP4jwjXeg9OkfOt72dMbe3QDr7AlP+3RLqDrPszNSQjaeBjZvABI53KsQ1M9RtrJdPpHjU07kOAYAhWTLGYiPd+U588yTBHrn73Z/kdg1NwJm9bcSEpFz5yFjUVg3rIAo88cYAlbzSYihfpjl8zzpTwz1w2o+6UlfbjPKZmfOzORIdlwENm0AurtznDHnroIll+ULhVwrg7LDAKDK6Ajs9S/lNy93/o60ZZTOghweyvlvZSRTiDSchagoR3pVdd73BzhGSohLF7wLAJcueHJznhdyPfqXnZ3AmxuBzksuVaSR2bNVV6A9BgBFrJdfyG/G4tjuTs3D4GKUlMEo4GYtc2AIsSMnYC1bArtqIcc3D6Dw8pqsppM93cCbm4ALbfl3xs/utTgKp3IMAArIAx8B/T2utR/oo3+nZHOWpHTWzBPN3ArC7ZcR6ryCdM1KyDlOtElemfHpjJERyI1vAM3NhXUU1M9RtnJdvrIyIMzdj2p8Bzwm+/tgf/hOnjPPPEmgd/4e92dEopmNkFX4XeyGJRBtPAcxqxTWjSsLGz+APGHMmTv1CICJBOT/vQcc+KTwjrjz/xrjwW85XwfljFspL0kJewOv+7veXzZ/q/H/mrPnQgwUOC77Vf2ZI2OIft4Aa8lC2NctdvaxP3JU5JY7v/5iKgW560Ogbo/3BelkzTdUV0BgAPCU/OxjoC/Hu4YBHkE43NbVu2RjzlygkAAwRX/hzm6Eu3qQvnElRDlvdvKja0ZoFAI49Bnk27/1fH0MtHyXb/FiR8ug/DAAeCUxBnvHVteaD/TRv1PyORUZjcGIlUAmXRhzXkhEzrRAzC6FVcPLAn5iLloKc8HizNMMp09BvvFq5h/4Ocpevsv31NO8YdYn/h8AAP//7J15nBxHled/kZl1dFff6luyJdmWZFmSwbcxso0NtjE+sGEWmGEXYzPsAAbDgC8Ms2Z2+cwyn9mBnd1lBjA7LIfN4UsYc9gGbNnyJUuWZeu+Wq1Wq++7q+vMjP2juuVWq7oqj8jMyOz3/Xz0kVqd+eJlZlX+XsSLeEFvJI8wHvmJvRNp6F8oxV47rKrWXgBg0ndlcjot0N4MvU1wNUDCFpE154F3HgYe/AkwOiK+ARL/eWEXXSzOD8IRFAB4AB/sg3Fgt40Tyx9C4m/e1nyyq1TXwhjus+aPDd+1Y/1Q+weRX3kajIQLu88RpmDZHLQ/bwIG+k/8RdhFWwYuuBCIx/32gpiGAgAPMH71/6yfFPaXkSTiDwBQVbCKKvCpEju3WWxvXj/yBiK7DkCvrUb+jKX+FxFaQLC8Du1gF7QMB2ud84kIciDtNU4+/zfdLM4PwjH09nEZfvQweH+PK7YD3fsXhSC/lbpFYgyZRB2bQGzrDij9DlcgEOUxDKhdvYi9thPq8DiU2jnPmr5H5nFyfTfeSL1/yaARAJcxfvVj6yfR0L9QzGTcWUUlWLyy6BbBJyDY90hnN3jfIHKrTwenwihi4Rzq4BgiB7uOly5m8UrLG0GZb88ds9Lg5PricbDL3iPKE0IQNALgIvzQPvBxixOMSPyF2rIy3U6pb3Tcnh1YOoPotl1Qj/WXP5gwhTKRROz1vYgcOHHfAjb3GYddtCWBff4OmvkvIdTlcBH917+wdkLYX0YSiz8AsMoEWLwCPJ2y1Z5TtO5eqIPDyK06DTwWdb/BEMIyWUT2dEKZOvkZsngFlMpZNRmCHEh7jZPru+wyoK1NmCuEOGgEwCX48CAwNizcbqB7/6Jw0W+lrswogMuwTBbRN/dAPdobmh33PEE3ENl3BLHX9xQVfwBgdbPK/tL3yDxOrq+5GeyGDwpzhRALjQC4BP/jbyyeUP6QQIu/hHn/ouclqk4uDOTDC17r6Yc6NILcquXgNHFqfjiH1jcMraO75GEsVgEl4UJFRhL/+WEM7HOfp5UuEkNPxgV4Ngtj13YLJ5Q/hMTfvC2nmUalcVaZUh9f8CybQ/StfdA6u2k0oAjK6ARim3eWFX+ASfNMFxLs1tuA6mq/3SBKQCMAbiBY/ANNwMQfmM4VV9fBGB8VYM05av8QlNEJ5M6kuQHAdJ5/92EoKXPVG1lNLVh8eu/5IAfSXuNkvf/6S4E1a8X5QrgCjQC4gP7kw0LtBbr3LwqP/VYWNQOq6m2jJWDZ6bkBfYN+u+IfugGto7uQ5zcp/lBVKA0thX/T98g8Tq5v8WKACv4EAhoBEAwfGgDyWZMHlz8k0OIfkLx/URQVSkMTjIFekVadwQGt8xiU/iHkzzx94WwuxDnU3iFEOo9Z/kwpDc1gogM5Ev/5qasHu+NLtOQvINAIgGCMTX8ydyCJv1BbQl830+0pNfVgskzAm3UPlNR03YCht2tMcLNBpwhXPGxLmZhCbNuegvhbpJDKqS/8EHbRlgHGwL74JYAKWgUGCgBEwjn4tldMHOe+K74SAvGfQWlq93/3vnnugXawC9reDsAwoPcd9cwdL9piuo7I3k5Edx4Ay+YK/2nlc6UohWfHLJ5XDvruzgu79z6gpkacL4TrUKgmEH70sDBbge79i0ICv1k0BqWxFYZL+zk4RR2bgLplB3KpDPS1F0JtWexqe3pfN3JvbnavAc6h9Q5C65xzv60O/S9qBYvGSPyt4ET8v3AH0OhvDQ3COoxzWl8kivyPvwt07C99EA39C7XlZu9/Nkb/MRgTYyJbM4eF+6m3NkH58F9BXbK8IH4i3chmoB/rRHbr80A+J9T2DGxiCtH9R8Cyc1IMFj9TrLoOanO7rXPnJexvSSfif+ttwNp14nwhPINGAESRz5H4h1T8gUJtAJ5Jgc8VJzexeD/V3gHwH/4b0kFbLqjriO7vhDJqcjvmUkyP2AAIv2jLwPU3kPgHGJoDIAh+cG+ZA7zxwzdCLP4ACjnlliXezQeweT9ZJovo9j1Q+gKwzTDn0HqHEH9t5/zibzHvr7YsAVMUGvq3gt3ru+hisCuuFOoK4S0UAAjC9Oz/EgS69y8Kif1m0RjUpna/3TBFpLMbkV0HAMPw25WiKFMpxLbthXa4RBU/S58FBqWpnfL+VrF7fevOBvvIR4W6QngPBQAC4LkseFdHiQPK2wi0+Ad5vb/V/HJVDZTGFpEenIyg+6lMTiH22g6wiaQYgyLQdUQOHEH0zf0n5/pnY3XSX2MLlCrBM9BJ/IuzZh3YLZ8U6QnhEzQHQAQdB+b/HYm/UFt+iv8MSm0DoOswRlyoyufC/YzuOgi9dRHyp7b7WqBFGRpDdH+neLv1jYVnAoRftH2GrVsH3HIrFfoJCRQACMB4cZ7h/7C/jBag+M+gNDQBel7sfgEu3k+1dwjK6CRya04H97hQC8vlEdl5EEo6Y+4EC/eB1dRBaWi2fJ5IHwKJnetbS+IfNigAcAjPZcE7D9o+P9C9f1EE1G+lqQ08nwefEjB73QNYOoPo67uQX7kMep0HBVs4h9o7iMjcNf0lzzF/KEtUQ21ss3yeSB8CiZ3ru+xysBs/SOIfMigAcErX4eL/T0P/QpGp9z/bjtqyBHp/N3hywrEtYZSyxQFt72EozQ3ILVvs2gtdmUojsqfj7Sp+ZrAk/jWFokei/SfxPwl2/fXAFe8V7wvhOxQAOIS//mqR/yx/Hom/eVtSiv8MjEFtWQJjsMd+OsCHz4LSP4zoeBK5NWeAawI3y+EcWkc3tP5hcTbnwGrqCz3/mQ9G2EXbTz78YeCS9X57QbgEBQBO4BzGjq1z/s8fVzyDxL+oLaWxDVA0GKMWJwb6GAiydAbRrTuRW30ajJoqx82ziSSiuzvA7Cw9NBu41DcV5l9YPE+kD4HF6ufjM58DVqxwxxdCCigAcMLYSPljihDo3r8oguo3MK/vSkMToGowhiTaQtgEkd2HoLcsQn6ZzX0EdAORA0egjozbO9/UZ4EVlvrNzPY3fZ5IHwKMVfG/516g2eXlroTvUADgAH54zuQ/GvoXipS9/3Ilg2vrwTQNev8xgJfpCUv0WVD7hqCMJZFdewagmi8PooyMI7qvE7C7pYipKowqlKY28ev8rfgQZCxWU2T33gcsWuSaO4Q8UCEgBxj7d739A4m/UFtSir9JWKK6sCFPLD7/QRJ+Flg6jfiWHWDJVPlj8zqiOw8iuvewffE341OsAuqS5SeLf9hF2w/icbBv/FcS/wUE7QbogPw3vlT4h8k7GNgAgMTfni3OYQz3wZibKpL0czD7vudbGqG3NYHHIicepBtQB0YQKVXC1yxlR1MaoCxqOXmmv6T3T0rMXl91daHnHy8RtBKhg1IAdkmnLR0eWPEXSVD9Buz5zlhhX/p4AvrAMWnr8gMnB11a3yC0vkFwTYNeXw3GFChDY2D5vJgGS91PRYXS3A4lUW3tPJE+hAHT4l8D9tX7gJjYLaQJ+aEAwCZ8dHq3NRr6F4qUvX+HdliiGmrsNBiDveBJgUWDPHg2LJ+HNjAitr0SdliiGkpjK5gWOfmXQf4eeY3Z62ttBfvbrwAeV4ck5ICeul0G+0n8BduSUvwFwbQI1NZTwJOThUAgb6FATjFcGvr3or2iRKJQGluhVDpfjkiY5IwzCkv9qLrfgoUCAJvw+SoAhgUSf/G2ALBEFdSK02GMDsIYHbI3gS7I4j/XFlOg1C2CUr8IYCXmJEv8TKXDzPWtWgn26c+Q+C9wKACwCR8tXwMg0L1/UQTVb8A93xUGpaEJrKoWxnC/8zLCNvH81X/C/WSF4f5FzWCRqIXzRPoQQsxc3wUXgH30L0n8CQoA7MI79pX8faDFn/L+3uTXo1GorUvAsxnwkSEYk2NS+OVKe8ftMLCqGij1jWBRE5POgvw98hoz1/f+a8Guutp1V4hgQAGAXTLzrwIg8TdvS0rx9xgWjYG1tIM1NL4dCBRLDQR56J8xsOo6KHWLyvf4CXe46WawSy/z2wtCIigAIN6GxF+8LQuwSBSsuQ1KQxOM8RHwibG3JwsGVfy1KJSqWrCauuIz+73wQbQtGSl3fR/7GNgFF3niChEcTAcAeV3HVCrrpi/H0TQVlfFg9hIC3fsXRVD9BuTwXdMK+wo0NIGnpsAnx2BMjAupI+BJ1ldRC8P8VbVg8Up7Nuh7ZJ5y1/c3nwFbucoTV4hgMW8A0NkziFffOoRdh7qxp7MHHd2DyOu6Z461NNRg1bI2rF7ejrVnLMElZ5/hWdt2CbT4U95fSqFgFZVg8Uooi1rBkxMwkhPgqSTg5nfRzn1QtYKviRooldXOJpgF+XvkNWWuj911N9Da5o0vROA4qRSwrhv44YaN+Pdfv+Cp4JfjvNXL8PefuRltjXV+uwIAyN//pRN+JvE3b0tK8RdtSxTz+MSzGfBUcvrPlKnRAaFD/4oKFq8Eq0wU/o4KLCEb9mcqklJFle69D2hqmv8AYsFzQgCw/0gf7v/eY9jbKed2pomKGP7249fg5ivO89sV5H/wbaD7yPGfAxsAkPiLtyUKsz5xgGfS4LkMkM0W/s5lwXPZ45MJbYs/U4BItDA/IRoFIrHCpMVozKxVa4T9mYqklPjf9zVgUaN3vhCB5HgK4FD3AG65/wFksg4rlLlIMpXBN3/4BEbGkrjtJn9nsyptS2BMBwCBFX+RBNVvIBS+s1i86O6DPJ8Dy+fBDaMwSsCn/zYMgE+P8DEVUJSC2CuFP4wpgBaxPnFPwLVIZ0tGSon/1/8LUF/vnS9EYNEAwDAM3P+9x6QW/9n84PHncOm5q7Di1BbffGBnrgO2vBRs8ae8v7xCYcYvMyMuWgRMi5a/937fhyB/j7xmvuurTIDdeSdQK0ealJAfBQB+9MQL2HXomN++mCaX13H/9x+H4efuai3tJP4WbEkp/rIiSPwBgJm582G/nwuBRBXY175O4k9YQjk2MIoHHt/otx+W2Xu4Bw/94RXf2mc1tUCswrf2HUHiL96WKISu9w+I+If9mYqk2PVVTYt/XOBETGJBoLy+5zByeXlm+1vh1R0HfW1fufoGMYaC+tIKqt9A6H03Jf4yQOJvnmLXV10D9rW/A2ImyioTxByUIA39z8Xv1QrsnAudGwny0L8JpOz9yyoUAof+hbXnJmG6Frcpdn319YXZ/tFgFk0j/EfZ3RHcAGBodBL9I+P+OaBpUD74MfvnB1n8gzz0LyOU9yesUN8Ads9XSfwJRygHuvr89sERu30ewWDnXQwsOdVXH0xB4i/eligo7y+PLRmZe33NzWD3fhWIeLhEkwglylTam/r+bjE5lfHbBai3fQGoa7B2UlBfWkH1Gwi975T3DyFzro+1t4PdeTeg0T5uhHMUvx0IBVoE6ufvNR8EBHno3wRS9v5lFQrK+8thS0bmXl9bO/ClLwOq6os7RPigAEAU0SjUO+4DW76i9HFBFv8gD/3LCOX9CbOsXg32lTtJ/AmhUAAgEk2DcuvtUK77kN+eFCDxF29LFJT3l8eWjMy+vjVrwT71aWc7LBJEESiR5ALsosugnn0++HNPwXh5VpGloL60guo3IKfvFjb5KQfl/UPIXPG/9TYSf8IVKABwi4pKsGtvhvq+68C3b4Gx6VlgaMC79invH2yhCJNghula3Gb29Z39DrBP3ELiT7gGBQBuE4mCnX8J1PMvAUaHwV/dBGPTn91tk4b+5YXy/oQZSPwJD6AAwEvqGsCuuRHq+64DjnZCf/JhoLdHbBsk/uJtiYLy/vLYkpGZ61t3Nok/4QkUAPiBqgJLT4N6+z1AchJ822YYG58B0im/PXubIL9sZfSd8v7y2JKRmetbsw7slk+S+BOeQAGA3ySqwNZfCXX9leDHusCffRp8z1v2bFHeP9hCESbBDNO1uM1s8b/1VhJ/wjMoAJAI1n4K2Mc/BWSzhVGBZ34LZEyOCtDQv7xQ3p8oA1uzBiDxJzyGAgAZiUbBLloP9aL14MODwAt/hrHlpfmPJ/EXb0sUlPeXx5aMcABnrQFu/RSJP+E5FABIDmtoBD74Eag3/gfwQ/tg/OEJoLfbncaC/LKV0XfK+8tjS0amxZ/dRuJP+AMFAEGBMbDTV0G9/S7wsVFg8yYYz/+R8v4i7fhBmAQzTNfiNhyF8r4k/oSPUAAQQFhtHXDV9VCvvBb84PSoQL/D5YRBHvqXEcr7E6WgCn+EBFAAEGRUFWzlaqgrVwOjIzCefRp868vW7QRZ/GUUPsr7y2NLRs6i2f6EHNBmQGGhrh7KzR+F8o1/gnLtTUC8wtx5QX7Zyug75f3lsSUjZ60l8SekgUYAQgbTIsC73wP1ksvBD+yFseGXwNiIM5uCfANAeX8gXIIZpmtxG+r5E5JBAUBYYQxsxZlQ77offGQY/HePge/eceIxQR76lxHK+xPzcdYaEn9COigAWACw+gawj/81MJUEf/G5QtnhIIu/jMJHeX95bMnGWWvAaJ0/ISEUACwkKhNgV10H5Yqrge2vw/j9E0Aq6bdX1pBRKCjvL48tyWDLlwO3UM+fkBMKABYgTIsA510E9dwLwQ/th/G7DUDvsROPEdkg5f3DJZhhuhY3WbkK+PTfkPgT0kKrABYyjIGdvhLqF+6G8vm7gZa2wn+LbCPML3iA8v5EcZpbwEj8CcmhAIAAALC2dqh33APl83cBzW1ijIa9p0h5f3lsyURjE9iX7yTxJ6SHAgDiBFjbYihfnA4EWgQFAk6RUSgo7y+PLZloWAR2592ARtlVQn7oU0oUp20xlDvuAfp7YTz6EHD0iLXzKe8fLsEM07W4RX092N33kvgTgYE+qS6QzRvoGEphYCKL4ckshpI5DCWzSOcMW/biiWpokZhgL023Dpx9GxLLhvDOlx9Fw0Bn+VOcvOAZEFEYoipDRGWIKEBcU6DJNFZFeX9iLnX1YHd/lcSfCBT0aRVI33gGG/eNYHPHCFJZXYxRxlCl1ALpvBh7tv2oxYFLbkPtxAAu3fwIGkbn2XxIgFil5xhhAKpiCuorVCQiPg+XU95fHluyUFNb6PlHIn57QhCWoABAALuOTeLpXYM40Dcp/P2mRWNSTSYaq27Ck+/9LOpHe3Dp5kdQNzHgepscwETGwETGQFRlqK8oBAOe3xXK+8PgQN7gyOkcOePEf+d0DoNzcC9EXlAbTp9CqqIGv736s9A3TQrxZy6MARURhsqIgkSUIRFRUB1TsKRWw6l1GqqiMg2NEUGDAgAH5A2ODdv68NyeQdc6NpFYpUuWnTFS14Ynrv4CWvsP4T2v/ALRXNqT3l1W5+ib1DGR4Wiv0RCR7f0Xpt7ydPucA5NZA2MZA5MZw55bYbov0+hqBI984HZkDRXI2kvvmWEiAwDFRxTrK1QsrdOwojGCs1tjiKoBCSwJKaAAwCZDkzn83xe70Dk45VobTFGhRqKu2RdBb/Np+MWN92Fxzz5cuvmRQiDgAVM5Ax0jObRXq970ghZY3p+jcI/H0wbGMwYMSUTX7/syg65q+MWH70Ze8/f7OZLSMZLS8UZPBr/elcTZrTGcvySG5fWUjiDKQwGADfb2JfHAC0eQygjK88+DFpVb/GfT3bYSv7zhXpx+ZDvO3/57TwIB3eDoGsujqVJFY0J1r6EFlPc3ODA0pWM0pSMvqlMbwhUhj99wh+/iP5eszrGlO40t3Wk0JVRcs7IS61r8mjxMBAEKACwyMJn1RPwBgCnBejxcUXBg2TnoOGUtzt69Eev2PO9JuwNTOiIqQ23chZGABZT3n8wa6J3QkdMFKq1Eoi2KP13+V0hW1vrtRkkGkjp+tm0Cy+rTuG5VAqfWBetdQniDbBlUqcnmDXx/ozfiDwCqFsxhPF2NYNva9+HnN30dB5ad40mbPRN5pPM+qU3A89t5g6N7PI+u0by84i9JIDHQeAqOLl7ltxumOTySw3dfGcXPt09gKifJTSSkgQIAC/z45W70jHqT4wYAJeBrinNaFC+dfzMe/cBX0N26wtW2OICjY3noIudiLYC8/2hax6HhHMbT7k1ic4xEurXp4pv9dsEWb/Rk8C8vjqBz1OflxIRUUABgkmf3DuONI2OetccUBYyF4/EkK2vxp/X/Cb+56nOYqFrkWjs5vdCTFULI8/66AXSO5tAzrosNmmYIYd4/E6vEeI17n1+3GU0b+N6ro3i+IyXTbSV8JBwK4zLj6TyefLPP0zYVNdi9/2KM1Lbi8fd/EU9dfhuykbgrbSSzhvPebMjz/joHjozlMJV1SQZCqi77Tz/PbxccY3Dgt3uTeHDbBERme4hgQgGACR57vRdpUZX9TMIkKv4jmr6mZfjlDffipfNuEmd01susf1J3f9laQPPbOge6RnNIu5UPDuh9MUN362l+uyCMt/oyePCNcQoCFjgUAJThQP8UtnSMet9wiAMAYHrFwPJz8eDNf4eDS9/p0NiJP+YMjsGkzYAtxHl/Y1r8U0GYDCahi3nf9uNwh519WTz0xrg8NR4Iz6EAoAScA7/c0iPjuyg06GoEL17wITx8/V3oabLRw5rn4QyndGStrgoIcd7fE/EPYd5/NobiYq0Jn9jRl8VD2ye8Kd9MSAcFACV44cAwjo2kfGk7zCmAYqTi1Xjm8k/iN1fdjlSs2rE9zoG+SQujACHO+xsc6BrLubsMLOwCwgEtn/XbC1d4qzeDZw+5V9GUkBcKAOaBA/jznkEfPZBLRLxipLYFD19/J56/8C/KH1xGdCazBjIiawMENL89kNTdm/AHBPa+mGbap4bRXn/9cJFnDkyhYyTntxuEx1AAMA+7jk1iYDycEb/0MIbDp56Nn33ofry+9qrix5gUiuGUiRUBIc77p/McwylvJ7DaRkbxn8XSzh1+u+AaBgcVC1qAhG+tmSCe2zvkswf0RTQUFTvOvBT7l5+Hy1/+OVoHOwu/sHBrxtM6mhMq1PlC3RCLPwfQO5F3rc3KCEOFpiCiAhGFIaIy+L0Z3b7eCeg2p7Y3VsfQVDNnot8sUyv0Y7hgfTUQ8a5CJwcwkjIwmNQxmNQxMKVjIKmjbyIv/LGOpQ08smMCnzinRrBlQlYoAChCTjewp8ed/b3NYugB6bV5QCZWiaff8yk0jPbgvS/8FBVp88/G4IXaADXF9gnwetKfx4yldOGT/io0hpq4gpqYAk3CeSqVERXjeXtD2alsHpoyqz4Fx0mZuKo3XwO7ZL19B21QE1OwdE4t/75JHRs7pvDGsYzQpXw7+7I4NJzDaQ3BLENOWINSAEUYnMzB8HlarKFTyc65DNe14bEPfBkjNc2Wzss6eUMGNL+dNzj67S6FLEJEYTilVsOy+ggaKlQpxR8AEjH7fZpUVn/7Gc33rB59FMj5nxpsqVLxkXXVuOfyBly6rAJRgUMvv9ubFGaLkBsKAIrQN57x2wVwwwDnEtdn9wld1fD79/5nS5UEiwYAIR76BwrFkESV+G2oUHFaQwRVUflfF4mY/aV6usGRypkImn74gO02RFMbV3D9mQncdVk92mvEDOh2jeXxVp//70DCfSgFUITBSTlmw3JdB9Pkf+l6TV6LYtOFH8aVLz5o6viT3ukhF/90nmNMwOY+DMAptRoSc4Vf4ukpFVENCmO2R/CSmTwqIqWDCH7gANgTG4AbBVaydEhNTMFnL6rFz96YwN4B5yMUT+2bwprmGBQ5B3qkZ2RiCns6+47/OdQ9iLwrm26cTHVlDKuWtuDMpS1YvbQVK05pQkQr/pmmAKAIfk9kmsEwdCigXFwxuttWmj72hNHqkOf9AQjZ2Y8BWBIw8QcKz7oiqiKZsZdCm8rkgaryFf/4xo1gzS3Axe+y1Y4bRFWGT55bgw27JvFql7NdSweSOt7qzeAdbeGqfug2ubyO72/YhJ8/vdW3NHLvELC/awBPbiqsWmmsTeDeT1yNd599cqE16l4W4aSZwD5h2JzMtBDgjKGrfbWpYyNWI7qA5v1nGM84DwAW12gnD/lLLv4zVDpIA0xlzM+b4A//Ctjxlu223EBhwIfWVOE9p1U4tvXCYX+KoAWVPZ19uOW//RQPPrXF9zlksxkcS+LO//04vvmjP2AydWJqhwKAIrTURP12AQCQz1IerhRj1Y2mjjuuYyEf+gcKw/85h9PCmxMqqmPBfTUkovYHNrO6YWmolv/o34H+ftvtucU1KxJoq3Y2wNs1lsdhKg5kiude34+//oeH0HHM7+Xj8/Pbl3biP37jJxidfDuwC+633EUWJaKIzLtw3DsMPU+jAKUwORM9qrEFIf6A8+H/uMbQUFmkBy1Ph6YsibjmKDkzaTF9wP/xvwPjYw5aFI/CgL9YW+U4h0+jAOUZHp/Ct376DHRD/knbfcPj+Kef/fH4z/6rnIQoDDhnaa3fbgAA8llnubww09p/sOwxqsJQFRH3MZc17z+D0+H/1uoi4hkg8QcKzzzq4JknLaQBZuD/+C0gL9fS3SW1Gi5Z6iwVsLM/i+EpqklSim/95GmMTQYnUPrz1n14ZvMeABQAzMsVqxr8dgEAkMtQAFAMxdDRONxd9rj6uGJuoCDgeX8ASOWcDf/XxxVUaHNuVsDEf4ZKB2mAVNaGkKfT4N/5Z0CyAl7XrKhEfYX91zznwKZOegfNxzOb9+CF7eU7IrLxPx76E8YmUxQAzMepDRVY3lTptxvghg49pLuQOeH0w2+UPYYBqK8wMSEsBEP/QGHzIyfUmblXAcFpQSBudRIXB9DTC/zrd2236wZRleG9pzt7j712NO3uNtIBZuO2A367YIvxZBpv7D9KAUAp3r+myW8XAAB5GgU4gWgujYu3PlH2uLq4irJlFEIi/gAc9f6jKkM8JL1/wFlBIA5rqwFOOLejA/zhh2237QbntMccFXHK6hybj9I7qBh7Ovv8dsE2ezr7KAAoxdrF1Viz2Pne9E7JZVJUGngaxdBx/dP/ClZGnVQGNCXE9Ghlz/vPkHcQAJw06z/A4g8AsYgKzcEMuKSVNMDce/XyS+CbNtluWzSawvCuU81XzizGi50pGAH/TIhmciqD7oFRv92wDQUAJvjI+e3W15GLhnNkkuP++iABM+JfNVX+S9ec0ObfAXCGEOT9Z7efd5ABOCEA8PtaBFHhYBTAdCGh+e7VY48Cu3fZbl807zo17iggGksbeLOXliXPZs+R4Pb+AQoATNFYFcGVq/1PBei57IJeEaAYOm586v+gbmKg7LFxjaGu3MSnEA39z5B30EUTuZmMLDipB5DKmkgBlLnd/IEHgOFh2z6IJBFVcG67swJnz3cEZ6a7F4xMTPntgiNGJ2gSoCmuXduIhoT/JXkzyYnCtNwFxoz410yaKLLBgdaqMi/+sIk/L7hhNwPAMKv8tQzXIwgnEwHzBkfGzMZAZeDf+gcgKcfueuuXVThKZnWP59ExTHVJwgQFACaIqAo+duFis3VnXIMbOrKpSX+d8BhVz1sS/4ZKFRUR5w8qKHn/GcF20vs/PjQcIvEHCiWBnXxnS9YDMHuv8jr4t/9ZihoBLVUqVjY6q3L6PBUGChUUAJhkTXsVPrCuxW83kE1PQZdgP3IvUAwdN5gVfwCVEQXNVWXyviHL+8/gJP+vKfD/WlyAMVZ2Z79SzDsPwOq9GhkB/863pRi9u3S5s8JAuweyGKTCQKGBAgALXLuuCWuX+LwqgHOkJkZCHwQoho4bnvk31CTN5VA1xrC4tkwJ2LAN/c/CyXiFw60DpKbCQRpgqthKALv3qqcH/OcP2fZFFCsWRdBaLkguAefAJhoFCA0UAFiAAbjt3aeg2e/dAkMeBChcxwf++H3UjpvbZGVm69qSa/7DJv5zfHAyiS+X51JckhskovbFLps3oItc+7ZlC/jzz4uzZxOnowBbujOYosJAoYACAIvENAW3X7EMixucrat1TEiDAGYYuPZPP0DDWK+p41UGLKnRFmTefzYKmzWRz6ItDmdzCGSmysEIAMecNICIW7ThceDwYQGG7PPONmeFgXI6x6tdC3dFUpigAMAGjVUR3HX1aVi/wuf9AkIYBFzz3I+waKTH1LHxCMPy+giqym1dG9K8/1ws16uYZcvpFsJSwgFNVRB1sLPn8QBA4O3h/+tfgDH/dg/UFIZLljrrwLzUmQp16mihQAGATSKqgr+8sB2ffPcpiDsYZnQM50iNDxdWB0gwycgJl77yCJqHOk0d21ChYlltpLzohW3ovwROClal8pJfnFVmXU6lg4JAUxndlefOv+Xv7oEXn+KsMNB4xsD2HioMFHQoAHDIBctq8fXrzsBVa5pQHbc/3OiU7NQkpsaHYeSDuU73Xa9twPKuN0sewxhQG1ewrD6ClioTS7zCJv5lfLA0D2COramsDBfoDo52Bszp7jz6TBr8f37HDcumSEQVnLfY2VymF2gyYOChAEAA9ZUR3PTOFnzz5lW45d1LcHpzwpdsspHPYWpsCOnJ0UAFAhdv/Q1WHH593t9HVIbmhIoVi6Jor9FO3rLWAUHO+88lYvbbXMTWVM6QIsYRwpwLcVIQyDC4ve2BzXDsGPivfuWObROsX+qsMNCx8TwOUmGgQONfl1UQQ8NDePOtHX67cZw4gPe1AvlmYCLHMJ4BxrMcEzkFOc8mWmUAZBCJxqBpzgp/uM2qzU/hlM4twPQoLWOAyjhUcGgKRzyqQVMUADryOR2mX8Uy9v5dfvzMjP15jjE4MJHKwtJouaDrcTsEUwAojMGws8UvgLGpDDQ422p53nu1cSNSdfXInnOOM/s2WVYDdDjYZuSPe8dQfYY4f5wyMDAAXfemTsHgoH/zOEQR+ACAc1jfu9sDVAbURTnqjuuvH8UzUtN/5KTulRdQ27EVKFFl+SQ9EviowzL0P4ODVDcAIJ23YEPkpDgPDFVEFCTN1PcvYiuVNcAr7btV7gLjv96AfFsb9BbvC42d1wJ0jNsPwQ6NAcMpjnqfF0XNwDn3TA8klB3LUAqA8IW6zS+hdvvW8gfOTvQHWfzt2rJwnoIyAl7GVsqsPgbwxRcvWSSiNOmcg96/yXtV9YPvg6W8D9ZPrQaanJUFwOsDAUmjESdBAQDhOYl9u1G7bbO1k7wWf5F4IP4zVMw3pmfCVtr/cvX2KXN9FVbWvc+xlTc4crqNIMDK8zMMVD3wA8Cj4evZnNvs7Mu1Z9hZKWrCPygAIDylsuMAGp99ym83yuN33t/mefFiIwAmbRkcKLX/jRVbnmLCp4qIYi7sm8dWKuu+wikjI0j88heutzOXMxsAJ5udZnRg/6g4fwjvoACA8IyKrsNoevpJS+cwxoI99O8xTleilhwFkPG+mPRJYQzRcmmAEramrKYBbN4rbf9+xF560d7JNlEZ8M4mZw93xxClAYIIBQCEJ8SPdaH5dxusnxhk8fe49w8UmQdg0VZ6vhEAGcXfIhWm10mejKV5AA7vVfyZZ6AdOuTMiEXe0YjSe2mUoWsCGKW6QIGDAgDCdbTREbT85lHrJ1Le3xYVMwGADVupIM0DsHh9JQOAMrayeQOGmWW8gj6ziZ/+GMq4g/V5FolrwFkOK5vvpFGAwPH/AQAA///snXmQHMWV/79Zfc/0HJp7RhpJ6EICoQNdHAIZMAYMGMR9GAsM2LAsPggMa/jtL3678Vuzu8Rvw2FvePHaHAZzGjCHwYhLYLQ2l0DGEiDQiS6QZqS5e2a6q+r3x8yImZ4+qiqzKrOq3yeCCDTd9fJ1dnW+V++9fEkOAOEq4Z5uTHz0N7LVsIZP8/7ZxMPOZRkmMG63nIpP/04KJPM5ABbteopnN4BtGJK//pWn7YJ5iwE/bFfzViHyQw4A4Rqhvj60PHyvs4uHVxIRe3qDnvfPhrcOYEwUQMV5cahTJKSN739vQ1ZRB0DwXLHubpQ/9KBYoQWoiQOTks6v704D270LWhACIAeAcIVQKoWJD90DZvBun+JbVUsh759N0X4ARThUB6Ci8eckzlEHUNABcGmuwtu2IbZmjTvCczC3ju+DbGyjNICfIAeAEA7TM2h+4kEw3UH4Mmv94QkAlFLePxueKIDSdQCcczUmDWC3QDKfA+CyoxT/0+sI7d7t7iDDzKoGeA433dKp+P1DjIEcAEIoTNfR/Oj9CPX2CJFnur26BiTvn02CYxHPWQegAgLmqmykIZADWYZpYsDTOoAvSd5zN1h/v+vjhDVg9gTn1+sm8NEBcfoQ7kIOACEMZuhofvy3iHQ7TATmWpQdLvqllvfPhqsOwFSwK6CwAkmNa9HrS2d5Rl7dQ4aB5D2/Bpyk1Gwyt5Z6ApQK5AAQYjBNNDz7BCIdBx1en0+s/cWoFPP+2WjMYR3AsE7BDeMyxLjOBRj1pXnsQGr725D44/Ouj9NUDtRxnA/Qlhr6j1AfcgAIIdS9/Dzin+9xdnHBhdTeKlvKef9scrYFtkjehkAyEDxXiYjziUmNRAAkRY+i776LyMaNro/DGwXYQbsBfAE5AAQ3ta+9iPKtn7oi2/YZ7lYIaN4/m7wHA+VjlF66AXjQ/r44LswVT0fAtG4io8vNHZU9/hi0LnfPop9TM9Qi2Ck7uikN4AfIASC4qPzru0hu+tC5gCJrqWmYlo1Aqef9s7FVB5BjXqTXAbhVIGnnZMAcpKRXSDIk77rL1ZMDE2FgerXz63f1DBUEEmpDDgDhmLKtn2LCm2udC7CyQJiAaRZ/FKW8/3g0ZnFLV74T8GQ7AC4R0hiiTh9vTa87AuaGpVIof+B+V8fgSQNkDGC3mI1AhIuQA0A4IvbFXtS/9JxzATbWlmI92Cnvnx+e7YBS6wBcnquEk83uIwWSCjgAABDesQPRdetckz+5gq8nwGeUBlAecgAI24R7utH01KPuDzS84BoWIgBWZUmTIykcWjQNUEAv3QCk2DoP5oqnDmAgYwhpUS2CxLPPQmtvd0W2xvhaA1MhoPqQA0DYIpRKoeWR+/iEWAz9H/rfAhEAyvsXpqADYGFePE8DeFUgadcBGH0/KpIGGNGp4q67wNJpV4aYUun8C9nXp0AdCVEQcgAIyzBdR8sj94LxFB/ZNP7AUC+AXE9clPcvTihfHYBFnYK6gEfDGkLZBwPlI8dcKeEAjJBOo/y++1wRPaXC+bUmgM+6halCuAA5AIQlmGGg+Xe/hTY46FwIhyHMjgJQ3t86PHUAKS/rADyeK0sHA+UrkJTtAGTpFdq9G7HXXxc+TE0cqIg4v562A6oNOQBEcUwTjb9/BJFOh13+bI2V+8+O6gBKNO+fzbg0gA29PKsDkFEgyVEHkPdgIC/IM1fxNWsQ+nyv8OEmVzq/9jOqA1AacgCIotS++gJibfv4hDgI/Y/GGNUDnfL+9hjjADiYF9frACR9V2XFHICCBZImBjMSnIAic5W8+x7h9QBTKpx/QZ2DQMeAQGUIoZADQBSk5o1Xkdy8iU8Ip/EHhlIApmFQ3t8Bh+oAHOqkVFtggcQjGli+28nCXPXJTgPkIp1G2SOPCBU5maMOABhqCkSoCTkARF4qPngfFR9+wCdEoCE0dI8X3AAY/xG4zgVwMwIgca4Yy3MwkEWdUl73SraoV3jLFqH9AcoiQD3H4UDtKaoDUBVyAIicJHZsRc1fxBcV5cTiwqZbOQqV8v454SkEzLhVB6DAXHHVAWQ8DI3YnKvEs89COyiuZoenDuBAvzA1CMGQA0CMI9LZgYYXnuEXJCD0PwIDANOEUWgLogIGRUlMm+cC5EB4FECR72rcyYA29BrMmNCLdKkUgsMhkr/8pbDzAlqTzj9nOzkAykIOADGGUF8vf6MfQLzxHyZvFIDy/rkZ1inEAI5TcL3dDughYwoBnRRIqlgHMAzr70fi2WeFyKrjSAF0DQ5FkQj1IAeAOATTdTQ//hC/IIGGMDt7aBgut2ENkvHPgutcAJERAIXmKhRiiISYY51SaZc9I865iq5fj8jHH3OrURkFcpVLWIXSAGpCDgAxhGmi+YkHEUr1ejSe0+vMMVsCuWSNk+3xdW6TpRdPGiBjCHqKU3CuxqUBbOBqIaCguSp79BGwvj5uOTVx59eSA6Am5AAQAIC6V19A5OABfkEuhf5Ho4/OaypoUJQgx7wkZNcBKPpdxTkebQcyxtDhAKIRGUUzgYq77+bWk8sBGKCdACpCDgCBqnf+jHLevf6AJ8YfAEzDGIoCUN4/N3l0ojqAHJhAWdT5MmiYQErhBPfI70hrb0filVe4ZNXGnd/sB1JcQxMuQQ5AiVO2Yxuq33ubX5CLef9cZDICk9JBMv5FkFYHoOJcDesUC2vQ8nYEKo7wQkCX5iq2di1Cu3Y5vp4nAkA7AdSEHIASJnLwAOpfeNq7AQUubKZhjE0FOBbk8XVuU0QvnjqAtNM6AFXnahQ8/QCE1gG47EhX3HMPmMMDvXgcgI4BdzIlBB/kAJQooVQKzY//Vowwj0L/2QhxAIKEhTn2vA5A1UU/u0CSIw0g7GAgL6JohoHyh5zt9KmOIX/r5CLoJtDBcZAo4Q7kAJQgTNfR9ORDYFY66xVDkvEHANPkjAIE6enfok5UB4DcBZIcEYCMYSLtdZvqAhT7HYW3b0d0/fu25YYYUB11phMAHKQ0gHKQA1BqGAYan3oE4Z5uflke5/1zkdEzMJ0oEiTjbxPPzgVQca7y6FRW6GAgC/TxpgE8nquyp552tDWQJw3Q5/apkoRtyAEoMWpffwmxtv3eDej2wmaa9qMAQTP+dvvEc9YBWHrYVXWu8sAYQzTEUQfAkwaQ5EhX3HOP7cR8dcyePqMZDEL0KGCQA1BCVGxYj+QnH4kRJjH0n42e0d3tDqgyDj4277kARdMAqn4VRfRKyKgDkBhF09raEH/jDVvXRDmiR+QAqAfnUkD4hfiuz1DzP6+JEaaQ8R8ZTNd1hMMWbucgPf071CnMgIhm7YS//bWTsGnWErTVtGAgVg6TMcytzOCU+BcIb9+O2J/XOlPCa6wUSEY0dDgUP5gxYBgmNE1Owxuno8ZffRWDc+fCqKmx9P6oZjoebdBgUPOHVLqQA1AChHp70Pjck2KEKZD3z4WuZ6BpGjStwFNckIw/J/EwkC5Qlb2naRreOO4C9MfLx722BcCK6RXITJ+B/q+chOi6d5FY/cehF1WcK4s68RQCmhhKA5THbDwiKzJXyQceQNeNNwKFfjvD8BSQUgRAPSgFEHCYrqPl0fu9HVTSwpbOpPOnAoJm/Dn1KlQH8OoJl+Clk1flNP7A0J7unvTwP0IhDC5dhq5bfgy9tZVPKclEQtrQwUAOsVUHoJAjrR08iMTqFy29lysFoM5GCWIYcgCCjGGg6cmHoBV61LODcqH/7LFNZDLp4u/zOwKMR746gKfOuhE7W+cUvX5n1iYSMxZDz6pvY2DZMn7lRGJzrnjOBbDsAChk/EeIvfUmQnv2FH0fR5kERQAUhByAAFO7ZjWiB9rFCFPd+A9jGAYyetZ+oyA9/QvSaaQOYDRPn3kDOivrLF2/qyfHt8gY+k87A30XXSxAQwE4mCsphYAOEf07St53H1BkRw1PBMDj6SEsQA5AQKnYuB5JEQf8AEo+sRRCz+hfHhkcJOMvmNFpgL8sPQsdVQ2Wr91VoI1EevYcdP/99wBJBXEAHH9/PHUAhmkWdwIUvq/Y4CDKnn++4Ht4IgADFAFQDnIAAkhi+xbUrH3N20GVWtjMwvUAxS9XE8F6jaQBtk2ei09mLLF17cHRdQA5MGpqhuoCmps5NPSeeFjj8ltS6QJWzgeOdHTdOoR3fpb/dZ4IADkAykEOQMAId3WiYfWz4gT6JPQ/DtNEJh2gegAXnJJEGOgtr8La485zdP2unsKvm9Eoeq75DtJHHulIvmN45ooxxHkOBkoLLkLNgdu/o+T9D4DlOW2TqwaAUgDKQQ5AgGB6Bk1PPSJOoF+NPwCYeeoBLFynHC7pFNKA18+5Dobm7LFuV7eFb5Ux9J1/IfrP+LqjMWwjokCSY69bv8uPuZ78jtJpJJ7N/RDBEwGgFIB6kAMQIBr/8ARCqZQYYT56YhnHKN31jA7D9L462w/0XXwZGmvLHF+/s0gEYDQDS5ai5+pr4OokCxLNUweQ1k1kjCxFfHhfRf/6V4S3bRv3d45NEs6OkiZchRyAgFCz9lXEPt/r7aAqLmzjdDKRTqeLOwEqfhbANb0Glh2D9MxZmFThfICD/UCvjSyLPnESum+6GWZFheMxvaCMwwEAgL7R+9187Egnf/MbsCCl0YhxkAMQAMq2fYqKjR+IE+jn0H8uTItOgGq4ZPyNhgb0f+10AEBrkk9WsTqAcWMnK9B14/ehTxbcNEjgXGkaQ0xEPwAfG/8Ryp54QtLIhBeQA+BzQr09qH/xOXEC/Wz8C+lVyAlQ8enfLZ00DT1XXXPonxVRoJLjjPedVuoAsgmHh5oGLRXUNMiFueIpBOwfNAJh/AEg8vHHOVMBRDAgB8DHMF1Hs9dFfxZRyvgfek8OJ0BF4+8iPVddDTM61uK3ckTk7UYADsEY+k8/A33nrHQ+OODa98dTBzCgG4E6nTL54INFGwQR/oQcAB/T8NwTCPU4XYEdouK6Zken0U6Aip8FcC/vf+IK6C0Tx/19UtL5gAf6gT6bGy1Gk54/X37ToBxwHQxk2jwXoABKzEomg7I//EG2FoQLkAPgUya8tRbxvcV7d1vGz6F/u6hcE+CS8c9MmYz+FSflfI0nAgAU7gpoBaOmBl0/uhVGdbW9C1104KJhDSEOp0SEA6DS7yj6/vsFGwQR/oQcAB8S27MLlevfFSfQz8bfqREwFHQCXDRofZdekfe1yuhQLYBTduY6F8AmZiyO7htuRGb6dIsXcA9ZFJ4oAK8DoJLxH6H8Nw9QKiBgkAPgM0KpFJr+8Lg4gUHP+xe6TuVIgEB6vns9zEik4Ht4dgPwRgAOEQqh9/IrihcHepS64SoEDODJNyydRuKF1bLVIATiewdg9/5O2Sp4BjN0ND71sPe5axVz5aIO+RlxAgzJTzYuzXHq9K9Db2gs+r5Wjn4A7f1AiqMOIJuh4sBzxQl0SBlH31vdNDHosPONik//I/dn7O23MeHAF3J1UYS9B0R5vvLwvQOwZVebbBU8o3bNi4h0dYkT6OfQv0iGnYBMJg1ThrfjVt5/2nQMLllq6b2TPO4HUIz0/AXovWIVxk2Oh19PPKyBcdzYfQ6iAEr+jrLm/PSX7gUL0C4Hp2zdfUC2Ctz43gHYune/bBU8oXzzxygXdbwv4G/j79IRv7quI51Ow/QyJeDSOmrGYui9+FLL76+KcdYBOOkHUITMYYeh+3s/BELDDeg9tjmMCWoIZHU8xyO5SI45jw2kMP+D1zxXRTU27yUHQDpdvQN4+6OdstVwlXBPN+pefUGcwFLO+xd7m2FgMJ2GLjslwEnP1dcC4bCta3iiAKIjACMY1dXo+tGtMCsq3RmgCDyFgG4fDCSTBX99DYk+/4fAnfL+li/Q1TsgWw1ufO8AAMCDL70fiC8jF0zX0fzY/ZT3B1w3/l++f+go4bTbKQGXRPefehqM2jrb1/HUAbSlgH6BdQCjMaNRdN34PWSmTXNngAIkOE4GHNRN6NkHA+XBL0//ozlj9b3e6KEYPak0HlrzkWw1hBAIB6A7NYj7V68LVPetEepeeR6ayAM5/Bz69xhD15EedCkl4NKtqjc1Y+CYYx1dq1odwBjCYfR+8wpkjjzSxUHGw1MICFirA1Dyd2Th/qzsbsecj950XxeFME0TD7/2IbpTg7JVEUIgHAAAeO/TPfjJb9fg8wBUZo5QsWE9yrZtESfQz8bfq6f/7MvN4ZSAyP3PrvX5Z+hddZXjy6tjQLLwbsGCiOgHUBDG0HvBhej/6qnujjOKkMYQDXE0BBosfN/41fiPsOydPyLe3+ueLgqxv7MP/+/Jd7Buc3B2QYSaj1rxf2QrIYqD3Sms/dt2mCZDLBxCRXkcGk8Zr0SiB9rQsPoZcQIp78+FYQz1d9c0DUzRe6r38lUw6uyH/kfzRYqhLeXsWt0A5tdzDW9tnMmTYdTXIfLhh+4PBqA/bWLA6ZY+BlQl8tdiqHknFeZgVra1fv9ObJ5xtKVrj212QaFR9PX1CY0E64aJ3W09eGvTXty9+gPs73T441AUdvRl/zt4cfNhwuEQpjbVoDJZJlsVW4QMHddseBFhw+NmIpbvBAvLlqi7yqYcLRQSv6gq+AvJ/owfN0zFn2Yt5pbbNWhiX4/zaMe0CWHP2vpP6O3EBe++xLVVzwpp3cSA0yN+GZCM5akjUPC+sqJTX3r8m+47fDm2VxT3/mbU2CtMtYtI49/V24+tew4gE+Duh4F2APzKld2fYt5Ah7eDirwLJN5RjGlgWkiaA+KVrNE2ryMcwx0Tl8JQNDLhJpX6IH608x3EfbZrg6m46nLqdOv05dBZYLLKJQF9W4qxZKCNjD/X+KZ8HXLhYgrmP5sWlKTxB4CuUBT/PPkYtIfjslWxTBCNPwCc1r6DXwjhKeQAKESlkcalPdtkq+FrTNMERFXtK7hQZ5v5R+pmoTMck6KLKqS1EO5sXYK/ldfKVqWkObljJ6oz/bLVIGxADoAiaKaJH3Ru9Pd+f9kGc3h8IXlABecl2/hvTNRgXbJJjHCfozOG+xuPxFsVas9HUJ/+R7hmzwZxwgjXIQdAEVb27kC1LnC/vxUUNHIiME1jKBXgWIA4XVw75EcL4YGGI9wR7mMer5+Fx+tmylYjJ0E3/gDQNNiH2b3+b5FbKpADoACzBrtwfL/HZxr4wMjZIvvMGBWO+HUx7/+z5qOp4CoPb1U2495GbxsGFaMUjP8I1+zd4P0OJsIRtIJIJmHquK5b4CE/pUiOhcxxFEDBhTrb+D9TMw1tkYQUXfzCh+W1+I9Ji2SrUbKc3S6wgRnhGuQASOY7XZso7+/S+KbdrWEKzku28d8TLcfayklihAecvdFy/GvrEhiSN0iU0tP/CMd37qWCQB+gVZbTk4QsFg20YUra4zaaCho5tzBhY0eAD+bFBPDLxnmqT7tStEcS+L+tx6An5G4DmnyUovEfgQoC1aYqmYBWW815AgjhiHIjjcu7Pd7y5wMjZwsLOpjKdlMsTvaD68P1h6MvxNGsv0TpDkdxR+sydISjno5bysYfGC4I7KOCQFWpqyqHVkcOgOcwAD/s3ChbDX9jcSEzYRZ3AhRcqLON/9Z4Jd4vb5SiSxAY1EL490lLsCdaLluVkuKa3VQQqCp11Ulo9dUVsvUoOZb3f4Ea2vLn3fimnv8iBecl2/hnGMOvG48SI7yESWsh/HTi0diUmOD6WKX+9D96vHPaNns8MGGF+uoktPoJlbL1KCmSRhorez7zdlAFjZyXmADMXAd6+GRe/rtxHtIsz4EyhC1MxnB381HY4GLXQDL+Y8c7tvNzKghUkGEHgCIAXsEAXN/p8ZY/nxg5yzjUwVZBoH3hwsh++l9X3oBt8SpxAxAwAdzfeCRWT5giXDYZ/9xcuYdSnqpRV52EtnC2+B8BkZtl/fvQrAfrPGlP4VzIhmoBRvoFc2sjnGzjn9JCeKxulhRdgo4J4OUJU/BMzTTZqgSPHL+tSQO9mJLq8l4XIi/zZrRAmz21GU219IThNuVGGhf1eHxaVpCe/oW09zeHUgEKzkuureo/b14Ig7r9ucob1ZPwUMNsIbLo6b/weNfu+RuYiHM6CG5a6qowY1L9UCOgFUcfLlufwHN116feDqigkVMB0zTtNwjKK0yMmFy8XDUZ+yNl7g1AHOL9ZAN+OnEhlwwy/sXHixs6TujY7Y0uREFOXDgDwHAnwK8smSNVmaBz+GAHpmY8bPgTNOMvWIehNsGc9QAu5v27QlG8WE2pOS/ZHavAnZMWOTpJkoy/dc5u24KICud0lDgrFoxyABbPmYrKJHUEdIOQaeBar5/+g4RLzoxh6O4VBdogV+j/Z80LYTLJ/WtLkH3Rcvzr5KXo0+R0DfQ1Fn+nDAzn7qP1UCbVyQTmzZgIYNgB0DQNKxZSGsANzund6e2BC0F6+nf5s4wpCuSU5YRcJv656sPQGY6JGYCwzYFIAj+ZvBTdFjsu0tO//fGWdX2BukEqhpbFioUzoWlDq88h23T1yhUIh2ivsUiSRhrL+/d5N2CQjL9I8vYAGi4KtPNhXZyXrlAUr1e3ujcAYYkBLYw7WpeiI1TYESPj73y8VZ/TtkAZRMIhfOvrSw/9+5AD0NpYg3O+wlcIQ4zlmq5PvBssaMbfIx1sOQEu5v0B4OfNC5SYemKoa+C/tS7B/nDu1CgZfz6aB/ows++gbDVKjnNPnIeWui93/Y2JTn/3/JOQiHl7YEZQmTXYhcmZPtlq+BOPnRlHkQAOchn/Z2qmoSMc92R8whoZTcOdk5dge4y6peaE8+dy1d6NtC3QQxKxCK4665gxfxvjANRWJXHZ6WPfQNiHAfhmt4f9r4P09C/psxR1AlzM+38eLcPaykliBiCEYgL4xcQF+KC87tDf6OlfzHhRw8BxnXv4BRGWuPy0JZhQMXZr8bj6tCu/sRwTKunELB6OT32BpClor3kxgmT8ReKotm+kR4CZ/YKr/KrxqEBNfdAwATzQeATeTTaQ8Rc83sr9WxAT1ZeDyEtNZRku+9ricX8f5wCUxWO448YLqSDQISHTxHm9Hh32EzTjr4AOppkVCXA57/9EzQx0FSk2I9Tg0YbZ+J/KZtlqjEWB3wwvK/fTtkA3iYRD+JfrzkYiNn5nS84dakuOOAy3rvq664oFkeO8rPoPEgo5M0PpgIzQPgG5jP/OWBJvVrYIG4Nwn9/Xz8QbpfydueBwLO7ah5o0nRboFrd886tYMDN3ijHvFvXzTlmMS0+jegA7hEwT5/Z61O9fIYOp1PiCZJkADF2HKSCVk8v4mzBxb/1cbtmE9zxdPwNP1U2XrYavQ//ZXPL5x+4JL2Eu+9pinHV8/nWmYI+am644HcccpcCN7hOO7d8HlnO5F4yCBlMJXJgX0zDEnR0wit/XzER3mHbc+JW1VRPlOgEBMv4AMK2/Cy0DPe4OUmIcP28abrjgxILvKegAaIzh379/MRbNmSpSr0DiWe4/aMZfBR2yya4BNA2YRmb8CxbI5Q62h+MU+g8Aa6sm4sm6Gd4PrOJvRgDf2vuhbBUCw5I5U/DP154JrUhL8aJdassTMdx12yqcf8r4CkLiS5YN7Jetgv/wkTNzqDjQRl1Avp/eL5rmB3UNLzn+XNWC39XPkq2Gu3h0s9al+3FYqtObwQLMhScvxE9/cD7K4sUjjJba1Guahtu+fTZuXXUm7Q7IAQNwZt9O9wfykcH0dHyPZJkwYRh67q2CWeQz/s/UTEMX9foPFG9VNuExr5yAgIX+s7l6zwZqDuSQcEjDrVecipsuPflQr/9i2Dqn5qKvLcXPb/kmnRyYRXOmDwnD5ZPlVDWYspEwL6Zp2I4GAEB3KIK1FRMdKEaoztuVTbin6Uh3Bwm48QeAuKHjqJ427wf2OdXJBH5204U498R5tq5jpoMDsNs7e3DX717FM39aj4xOTRyu7dyEOeku9wYImvFX8fM4lMOYBqZpGP3Mn8/3vnPiYuyLlOV5lQgCh/cdwLV7N4gXLON3K2mtSGsabpt2PB2JbYFwSMO5J87Dt88+dlyXPys4cgBG2L6nDT97+EW8/t4mpyJ8T8g0cWf7u+4OoqLBVGF8RWQxxgCmDTkDed7zZkUznqid6XwQwjdMGujGD3a9L1ZoCTz9j+ahxtl4r7JBrhKKc/KiWbjuvOVobZjgWAaXAzDC+k2f4T8ffRnrP/kMAsT5isPS3bix08U9rIoYOeXGV1AWY2zICWBjM2tppuEfJx8HndnKuBE+pmWgBzftek+MsBIz/gCQYcBt00+AQVGAMTAGLDp8Mr67cjnmTuPvSinEARhh38EurHn7I7y27mO89/GOkkgPXNy9DcsGXMpZKWjkuJAcrndb1qGlijEwTQMbLrH5r6b52BqvynsdEUyaBntx8851fEJK0PiP8FjjLLxd2SRbDelEwiEsmt2KExfMwAkLZqCuStxZPUIdgNH09PXjT+9twtsbtmLfwS60dfSgraMHXb2pQEUJ/qPtHXcEK2rkHKPi53G5zz9jGv5WXo8HGqnjX6nSMNiLW5w6ASWU98+FzoAfT18Oo0QiZ4wBVckE6quTqKtKomFCBRbPmYxj5x6G8oQ7TcNccwDyMZjOoK2jG20dPTAMeXfb+t292LiHr/NURE/jspf/u+j76pIRxMPDN7HVj2zpfR6Hx5x+XQotKmNw8YhfADBDIey4/iaEyqjwr5SJtLeh5Ve/sH+hqr8bD+hPG2jrSWPtklOxZcpsV8ea25LEgklJV8coREhjqKksQ01lOSJhb7fZhz0dDUA0EkZL/QS01DsvXBDB1u5d6NjGV7lfNjiAjIWdYIlYDBWJ4am28qO28B7LLYdlLyIqPvl7BLvqGlQfSa20S55pzcCUfwJ+cof1a3x2rwunP4105wAWv/US3qk9zNUdAWVlCSH5dD9SGrEVl7B9Nrgg4y90PL/gt88y63DgSJf3hRP+oaEBuO3H1t7rt3vdRUKmgel7t8pWI7CQA8CBrQpVgcbf0tO/CouICjpIgn3rStkqEKphxQko4d9MPk75YI1sFQILOQAcpKIJdMW8zR15ctqgCEo4ksEuugSIx2WrQaiInUgAAQCIZtJoOviFbDUCCTkAnKw9/AQxgijv774sL6iqBpYsla0FoTL5nAC/3esecvIHr8tWIZCQA8DJtropGCh0rjvl/Z3jw8/Crr9haD8PQRSioQG4/bYv/+3De91LarvbUdnXLVuNwEEOADcMrxxxSu6XKO9fUrATVgB1dbLVIPxCff1QJKCEfzN2OP7Dv8hWIXCQAyCAbXVT0B3PqgUQ2mTGJ0+UpRzJiESAM8+SrQXhN7IjAUReZny+BWE9I1uNQEEOgBAY3pjloBaA8v7uy/II9q0rgbDnbTWIINBQP+QEUOqoKDP3bJatQqAgB0AQ2+qm4mBiuN875f2d48fP0toKzDlCthaEn2moB/4XRQKK8ZUNa2WrECjIARDIH+efQXn/EoRd/R3ZKhBBoK4O+MfbZWuhNGE9jdqudtlqBAZyAARysGwCNjfOECKL8v4+4YwzgaS8PuJEwKirA26nPgGFOGrHRtkqBAZyAATzypyTCp9eRXl/92V5RTwOdnKeHSAE4ZSGBuC2f5CthbLM3bERLEAnysqEHADBZEJhvDSXY1ugVYJ0//v0s7DraM8/4RKNjcAtN8vWQkkYgIbOfbLVCATkALjA5oYZ2FeRtR+c8v7BYu5RwKRJsrUggszEicDNN8nWQkkWbv1AtgqBgBwAl3j66G/YvqYkjb8Kn8cB7JLLZKtAlAKtrcAPvy9bC+WYuWczpQEEQA6ASwyGY3hq4bATIDLvLxsy/kPGnw77Ibxi6lTg6qtka6Ec1b0dslXwPeQAuMjumon4qHm2OIE+NZg58etnqawCFi2WrQVRasybB1x4vmwtlGL63q2yVfA95AC4zGtzVkCvrCr4npIM/fsU9nd/T4V/hByWLwfOWylbC2VYuI3qAHghB8BlDKZh3xXX5X29JI2/Cp/HCccdT4f9EHJZcSJwrv36oiASH+xHJJOWrYavIQfAA/TySmjX3jDu75T39xGRCNg3zpWtBUEAJ50EnHWmbC2UgOoA+CAHwCtmzARbvsL+dX41mLnw8WdhF1xMh/0Q6nDqV4HTT5OthXQm798lWwVfU8IOAANjmkf/DT3ps7NXgs2dNzJ6cRVVMJgq6CCbmlpg0SLZWhDEWM44HZg/X7YWLsEs/Tdn1yfc6zP8Eol1gZJ9pKmonoAJLTFPxorHE4f+n12+Cvi3fwE6Dha+SAXDS6F/AAD7Tv4aDoKQylWrgF/dDWwMVn/8kKYhEi8r+r6GzAAmtBzGNVZFdfFxgkoJRwAkoYXAbv6Hoe1kKkPGf4hlx1LhH6EujAHXXg0cPku2JtKIDPbLVsG3kAMgg0gU7Ee3ARWVuV/3s8HMxs+fJRQCW3mebC0IojCMAddfB0yfLlsTKZT3dclWwbeQAyCLaBTsltvHOwEqGEwVdFAAdtElVPhH+APGgOu/C1RXy9bEc5K0E8Ax5ADIJBoF+96owz5UMLwU+h+itpY6/hH+IhIBbv9xybWpTnaTA+CU/w8AAP//7d15eFTlvQfw75klmUkmyWSSyQYhAWkMmLCFLIjX636FiqJilVaptbZ0b7VyrVqvrbUWn7b2qrdaehF78VqliBdSVPS60JaAEMJuCEvCKgayb5NtZk7/mFoBWSaTd+Y9y/fzPDw8D5x5359xeN/vec8572EAkC05BcpPHtfGPQGc/P9Jmf8t2SUQDV1cHPDTR4AE89zYFsd7ACLGAKAFTmfockBamuxKxND55I+KiwGPR3YVRJFxOIAHH4BZHm9zd5yQXYJuMQBohd0O5Yc/AnJy5PSv90lbFLsdyvU3yK6CaHiSXMDDD8quIiYSfF2yS9AtBgAtsdmgfO+HwMTJse2XS///pMy5NbSMSqR36enAww/JriLqLMGg7BJ0iwFAaywWKF+aB0y7ODb9cfL/lDsVmDJFdhVE4qSnA/++QHYVURWwWGWXoFt8xikGunz9aLEODO1DV8yEPTUD8ZUrwjte9uSr0SAxlKugvjlzEej0ieucSAtcKbDPvgmO5ctlVxI2fyD8QSDAR3Ujxp9cDPzo2VVob2qM6LNZg2m4t3GL4Ir+QYuTtqTJf4/TjcW/rhTXOZHGTG+34cametllhMUWH49kjzesYztSwjuOPouXADSu0e7CozkV6LAKvi7Nyf+kblW8lD5eXOdEGlTlHoHXvGNllyGcz5kkuwTdYgDQgW5rHBZml2G7U9Ce9Fqc/AUa6sNPb7vz0WvlYhgZ33p3Dv4vw1ghoDspVXYJusUAoBMBxYKX0sdjaZqGzlQNECT6LRa8nzJKTudEElSl5OA1A4WA9hS+rCtSDAA6syshHT8ZMQ0nbM7zH3wmGjxjl7X0DwAvpY9DQDHHhilEn1ifkmOYywG9vAQQMQYAHfJZ7Ph1dinWpOQP7YNaPGOXOPkfik/C7gSD7L5INETr3TlYnvE52WUMi99mx0Ccud59IBIDgE6pAN5LHoUnskrRag3jH4AWJ3+BIjmH/2P6OOF1EOnJxpRsvJx5oewyItYwplh2CbrGAKBzLXYnnsguxbtJubHp0CBBoiopB612njkQ1SRn4uncGO8+KkhD/gTZJegaA4ABqIqCt9yjsTC7DG2W+DMcEPuazkvi0v+gYsFqzxhxBRDp3GFHEp7I09/rr5u8I2WXoGsMAAbSanNg4YhyLPMUfPqHWjxjlzj5A8Cf0grgV/jVJzpZU1wCHh1dgV6rPrbWPZQ3DgGbXXYZusZR0GBUADWJWXho5HSsTxT4ZkENriJEMvk32Z3Y5soQXguREXTa4vBofgVabWdYSdSYLZOukF2C7jEAGNSgYsVKz1g8NqIcex3u4TWmxVWECC3OKJJbAJHGDVqseCK/FLWJHtmlnFWLJxsdbgb54WIAMLhOazwWZ0zAU1lT0BTp3gGiSF76r3ZlotUu+WdApAMBxYIXcorwZlqe7FLO6IPyz8suwRAYAEziozgXfplTiiXeIgwM5fq3Qa77A8BKjzE2PiGKBRXAu548PDdCW3faH8/IQ1NGjJ56MjhugB4DKYlOWPoTZJcBADiRnIDfZIzARZ2NuOnjXec+WIPX/SNVmT0eLjd3DCMaqrbkBPxnuhdfrq9GRn9PTPq0Wc9+krL2si/EpAYzYACIgce/OQtjPBq8WzUYhLpzB7B8GdDfd+rfGWjyhzcD5fc/ILsKIn1TVWD5q0DV+qh35RsI4lC7/zN/vrnkavQ6XVHv3ywYAMzMYoEycRIwcRLUhnpg5WvAx8dkVyWc8tW7ZZdApH+KAnzhFqC0FPjdIqCv7/yfEajFk41dF02PaZ9Gx3sACACgjLkAyr0LoCx4ACieKLscccoqgHSv7CqIjGN0PvDznwFTS2LWZX+cE69//muhEELCcAWATpWRAWXenUBfH9SqdcCbr8uuKHIOB5SbbpZdBZHx2GzAHbcD11wNPLcIaGuLWlcDcfFYcfP3EbToY4MiPWEAoDNzOKBceRVwxZVQ6+qAVSuA5hbZVQ2Jcvf80EBFRNGRmQk88jCwbTvwyjLhlwVaUzPx5oy7MWiPE9ouhXB0pHNTFCjjxgHjfgx0tEPdvg1Y8wYwMCi7snMrmQrk58uugsj4FAWYPAmYOCEUBCr/LGRFYOuky7Gj+FKoFl6pjhYGAApfihvKpZcBl14GNDVB3VAF/PUvsqv6LFcSlFtulV0FkblYLMCUyaFfBw8Cb78DfPjh0NspKsKJq2/A9jrhFdJpGAAoMl4vlOtnA7NugHriOLC+CqhaJ7sqAIDy3e9x6Z9Ipvx84Ot3A34/0NQEbN0GbKo+88pAQgKQOxIonQqMGw+4EhFsHQTQEeuqTYejJA2PokDJzAJuvBmYfRPU48eBTR9IWxlQbp8HpKVL6ZuITmOzAdnZoV8zZ4T+rLc39LuiAHFxoZUDkoIBgMRRFChZWcD1s0O/ujqh7tsHbKkB6uoQ1d2FPGlQvvEtwKPdF5gQEQAn38ehFQwAFD1JyVCmlABTSkK7iLW3Qz14ANi6BaiN4NrgmTgcwK1zoRRra79yIiKtYwCg2FAUIDUVSmoqMHlKKBB0d0M99hGwbx+wfh0wMBBeW3Y7lIJC4PLLgbx8bg5CRBQBBgCSQ1GApCQoFxYCFxYC180CgsFQCOjqPPUxQ6sVsNsAuz10w5BNg+9VICLSGQYA0g6LJbSk73DIroSIyPB4+yUREZEJMQAQERGZEAMAERGRCfEegLNQg0H4fR0Y7Ok46fdOKFYrbAkpsCemfPq70wWAd6ITEcWGCn9v92njcwfUQAC2hORTx+eEFCjcbOiMGABOEuj3oevQh+g8tBNdR3YjONgf1udsCclIzi9Gcn4xXDkFUKz8sRIRiaQG/Og+thedB3ei8+BO+H2dYX3OYo9HUu44JOcVIynvIljjE6JcqX5wplJVtO+vQWvdBvga66EGg0Nuwu/rRGttFVprq/7xZRuP9AmXISFzdBQKJiIyD9/xA2jesRZdR2rDPik7WXCwHx0N29DRsA2KxYKErAvgKZwG99gS0+8hYuoA0HVkNxo3VqKv5SNhbYa+bFvR0bAVyfnFyCq7HkCKsPaJiMygv+04GjdVovPgTmFtqsEgeo7tQ8+xfWja/i6yyq8HxpYIa19vFFVVo7hBuzbtrz+AXz63FEfq90S9L0WxoOKSS/Dtr9wGT6o76v0REelZa1s7fvvCK/hg3Tqo6tBXZIcq94ILseCb8zD2AvOt2JouALzx1rv43X//Af5AIKb9ut0pePj+ezCusCCm/RIR6cXuur342RO/QXt7bF8FbLNa8Y2v3YmZ/3ZlTPuVzTQBIBAIYNHzL2L1m29Lq8Fut+O73/wqrrr8Umk1EBFp0Tvv/xXPPPc8BgcHz39wlFw34xrM/+odsFqt0mqIJVMEgO7uHvziV09h6/ZdsksBANw8+zrcNW8uFJPfgEJEpKoqlix9GStWrpZdCgBg8sQiPHDf9+FyJcouJeoMHwAGBgdx/0OPYs++etmlnOKGz1+L+XfPk10GEZFUixYvxarX18gu4xQXfu4CPPHz/0Cc3dgvHjP87ghPP7tYc5M/AKx6fQ3eemet7DKIiKR56521mpv8AWDPvno8/exi2WVEnaEDwKsrV+O9tX+TXcZZ/XbREtTW7ZVdBhFRzNXW7cVvFy2RXcZZvbf2b3hVI5closWwAWDzlm14YenLsss4J7/fj8cWPomm5hbZpRARxUxTcwseW/gk/H6/7FLO6YWlL2Pzlm2yy4gaQwaAgcFBPPPc89DD7Q3tHZ34/ZIXZZdBRBQzv1/yIto7wtvKVyZVVfHMc89jQOKTCdFkyABQuXqNrs6qqzZswu49+2SXQUQUdbv37EPVhk2yywhbU3MLKldr7z4FEQwXALq7e7BsxSrZZQzZ4j+8JLsEIqKo0+NYt2zFKnR398guQzjDBYBXXl2Jnh6f7DKGbHfdXlR9UC27DCKiqKn6oBq7dXjjc0+PD6+8ulJ2GcIZKgD09vZh9RvydvobrmUG/IIREX1Cz2Pc6jfeRm9vn+wyhDJUAKiu2arrmzX21x/Q1b0LREThampuwf76A7LLiNjA4CCqa7bKLkMoQwWADRs3R7V9e6Ib1viEqPaxsbomqu0TEckQ7bHNGp8Ae2J037ga7Tkm1myyCxDF7/ejOgrPaybnFyPton+BIz0XNkdob+jBrlb0Nh/B8Zo30ddyTGh/GzbW4LoZ1whtk4hItg0bxQcAR1oOMktmwJmeC3uSBwDg7+tBX/MRtHz4N3Qe3Cm0v+ot2+D3+2GzGWPqNMZ/BYDtOz+Ez9crrD1rnBM50+fAXVD6mb+zJ3lgT/IgKa8Ix6vfQPP2d4W9t3rnrlr0+HxITIjuSgMRUaz0+HzYuatWWHuKYkH6xCuRWToTiuXUN/fZHIlwjSyEa2Qh2vdW41jVqwgMiJkbfL5ebN/5IUomTxTSnmyGuQSwu07gc/SKgrwZ8884+Z9ymMWKrPJZyCidKaxrfyCg6+tkRESn219/AP5AQFh7GaUzkVU+6zOT/+ncBaXImzEfEPjmVaFzjWSGCQCtbe3C2kovvgyJWWPCPt476So4vaOE9d/S2iasLSIi2USOaU7vKHgnXRX28YlZY5BefJmw/kXONbIZKACI+YJZ45zILL1uSJ9RFAtypt8spH8AaGUAICIDETmm5Uy/GYoytKkrs/Q6WOOcQvoXNddogWECQFt7h5B2nN5cWGxDfwe00zsKilXMLRVcASAiIxE1pilWW0SrrRabHU5vrpAaRM01WmCYACBqWcaZHtmXRLFY4fDkCKmBKwBEZCSixjSHJ+e81/3PJtKx/XS8BKBBfYJ2aLK7In+OdDifPZmvV9zTDEREsoka07QwPouaa7TAMAEgJSVZSDu9zR9F/Nm+YXz2ZKnu6G5mQUQUS6LGtOGMscMZ208maq7RAsMEAE+qmC9Yb9PhiD4X6PdhoEvMNr4eT6qQdoiItEDUmDbQ1YJAf2Qve4t0bD+dqLlGCwwTAFIF/U/pb2uMaHe/9v3idrlKYwAgIgMROaZFMtb2tRxDf1ujkP5FzTVaYJgAICqVqWoQR9f+L9Rg+JtWDHS1onFjpZD+Aa4AEJGxiBzTGjdWYqCrNezj1WAgNKYL2q2VKwAalOFNF9ZWb/PR0ISuquc9NjjQh6Pvv4jgYL+w/rMyvMLaIiKSTeSYFhzsD425A2HcjKeqaNxYid7mo8L6FznXyGaYAFBaMlloe8073kdD5VMY6Gw+6zE9x/Zh7/JfoOfjemH9prrdGDM6T1h7RESyjRmdJ/Tm5p6P60Nj77Gzb8s70NmMhsqn0LzjfWH9AuLnGpkM8zKgkSOykTsiB0c+Evd2vp7GBuxbvhBJo8bD6R0FpzcXwcF+9DYdhu/EYXQf3QPg/KsEQ1FeOgWKwH2riYhkUxQF5aVTsOb/3xPW5mB3Gxr+/F9wjbwQCRmj4PSOgsUej96mI+htOoyuw7UI+geE9QcAuSNyMHJEttA2ZTJMAACAaRWlOLJildA2g/4BdDRsQ0eD+FcNn0lFeUlM+iEiiqWK8hKhASBERffROnQfrRPc7plNqzj3C+L0xjCXAABgWvlU2SUMi8MRj0kTimSXQUQk3KQJRXA44mWXMSx6n2NOZ6gAUDB2DEbk6Hd55uKKMsTZh/4eAiIirYuz23FxRZnsMiI2IicbBWPDf0usHhgqACiKgjtvv1V2GRGx2+24Y+4c2WUQEUXNHXPnwK7Tk5w7b7/VcPdnGSoAAMD0aWUoLBgru4whmzXzGmTy8T8iMrDMDC9mzbxGdhlDVlgwFtOn6Xf14mwMFwAA4K4vf1F2CUPiciXitjmzZZdBRBR1t82ZDZcrUXYZQ6K3OSVchgwAReMLUVGmn7vp595yo+7+QRARRcLlSsTcW26UXUbYKspKUDS+UHYZUWHIAAAAP/jOfGRlan9JvaKsBLNnzZBdBhFRzMyeNUMXJ2lZmV784DvzZZcRNYYNAMlJLjzy4H1wOhyySzmrvFG5WHDPtw13YwkR0bkoioIF93wbeaNyZZdyVk6HA488eB+Sk1yyS4kawwYAQNsTrB4CChFRtGh5gtVDQBHB0AEACC2x3zVvruwyTuFwxOOh++/RxSUKIqJoycr04qH779HcBkF3zZuri0sUw6WoahivvDOAv6zbgN88swgDA2L3hh6qDG86HnnwPozOHyW1DiIirThw8DB++vivcKLp7C9fi4W4uDjc8935+NdLpkmtI1ZMEwAAYO/+evzsF0+ipbVNSv/jCwvw4x/dC3dKspT+iYi0qr2jE48tfBK1dXul9J/mScXDD9yLgrEXSOlfBlMFAABoaW3D4798Crtj/CW79uor8K2v3wmbzVDvXyIiEsbv9+PZ3/8hCi8NOrdxhQV4cMH3keZJjWm/spkuAACAqqpYt34j/uelZTj28fGo9jWheDzumjfXVKmSiGg49u6vx5KlL2PHztqo9pOTnYkvf+lWXHJxuSZvFo82UwaAT/gDAax5+z388U+vob29Q2jbY/Lz8JV5t6Fk8kSh7RIRmUXN1u14YekraDh4SGi7bncKvviFm3DtNVfAZrUKbVtPTB0APtHX14/qmq3YsKkG1TVb0dPji6idDG86ppVNRUV5CSYUjTdloiQiEklVVezYVYsPNtZgw6bNEd8omJiYgNKSyZhWVoLSksmae/JABgaA0/gDAezctRubNm/BsY8b0dLShpbWNnR2deGTH5XVakWqOwVpnlR4PKkYMzoP08qmYszoPMnVExEZW8OBQ9iwaTMaDhxCa2tofG5r70AgEAAQeoY/OSkJaZ5UpKWlIic7C2VTp6C4aJypz/bPhAEgTP5AAG1t7bDbbEhJSebZPRGRRqiqio6OTgz6/UhNdXOiDxMDABERkQkZfidAIiIi+iwGACIiIhNiACAiIjIhBgAiIiITYgAgIiIyIQYAIiIiE2IAICIiMiEGACIiIhNiACAiIjIhBgAiIiITYgAgIiIyIQYAIiIiE2IAICIiMiEGACIiIhNiACAiIjIhBgAiIiITYgAgIiIyIQYAIiIiE2IAICIiMiEGACIiIhNiACAiIjIhBgAiIiITYgAgIiIyIQYAIiIiE2IAICIiMiEGACIiIhNiACAiIjIhBgAiIiITYgAgIiIyIQYAIiIiE2IAICIiMiEGACIiIhNiACAiIjIhBgAiIiITYgAgIiIyIQYAIiIiE/o7PZSVfL8tJ+wAAAAASUVORK5CYII=",
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

async function getDaftarPasienRawatInap(req, res) {
    const noregistrasi = req.query.noregistrasi;

    // let query = queries.getAllByOr + ` where nocm ilike '%` + nocm + `%'` + ` or namapasien ilike '%` + nocm + `%' limit 200`
    let query = queries.getDaftarPasienRawatInap + ` and td.noregistrasi ilike '%${noregistrasi}%'`
    try {
        pool.query(query, (error, resultCountNoantrianDokter) => {
            if (error) {
                res.status(522).send({
                    status: error,
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
    getHeaderEmr,
    getWidgetDaftarPasienRI,
    getDaftarPasienRawatInap
};
