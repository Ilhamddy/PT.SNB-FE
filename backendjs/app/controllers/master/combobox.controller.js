const pool = require("../../config/dbcon.query");
const queries = require('../../queries/master/agama/agama.queries.js');
const queriesJk = require('../../queries/master/jenisKelamin/jenisKelamin.queries');
const queriesTitle = require('../../queries/master/title/title.queries');
const queriesGolonganDarah = require('../../queries/master/golonganDarah/golonganDarah.queries');
const queriesKebangsaan = require('../../queries/master/kebangsaan/kebangsaan.queries');
const queriesPerkawinan = require('../../queries/master/statusperkawinan/statusperkawinan.queries');
const queriespendidikan = require('../../queries/master/pendidikan/pendidikan.queries');
const queriesPekerjaan = require('../../queries/master/pekerjaan/pekerjaan.queries');
const queriesEtnis = require('../../queries/master/etnis/etnis.queries');
const queriesBahasa = require('../../queries/master/bahasa/bahasa.queries');
const queriesDesa = require('../../queries/master/desa/desa.queries');
const queriesNegara = require('../../queries/master/negara/negara.queries');
const quriesInstalasi = require('../../queries/master/instalasi/instalasi.queries')
const quriesUnit = require('../../queries/master/unit/unit.queries')
const quriesAsalRujukan = require('../../queries/master/asalrujukan/asalrujukan.queries')
const quriesJenisPenjamin = require('../../queries/master/jenisPenjamin/jenispenjamin.queries')
const queriesRekanan = require('../../queries/master/rekanan/rekanan.queries')
const queriesHubunganKeluarga = require('../../queries/master/hubunganKeluarga/hubunganKeluarga.queries')
const queriesPegawai = require('../../queries/master/pegawai/pegawai.queries')
const queriesKelas = require('../../queries/master/kelas/kelas.queries')
const queriesKamar = require('../../queries/master/kamar/kamar.queries')
const queriesTempatTidur = require('../../queries/master/tempattidur/tempattidur.queires')
const queriesStatusKecelakaan = require('../../queries/master/statuskecelakaan/statuskecelakaan.queries')

const selectComboBox = (req, res) => {
    try {
        pool.query(queries.getAll, (error, result) => {
            if (error) {
                throw error;
            } else {
                pool.query(queriesJk.getAll, (error, resultJk) => {
                    if (error) {
                        throw error;
                    } else {
                        pool.query(queriesTitle.getAll, (error, resultTitle) => {
                            if (error) {
                                throw error;
                            } else {
                                pool.query(queriesGolonganDarah.getAll, (error, resultGD) => {
                                    if (error) {
                                        throw error;
                                    } else {
                                        pool.query(queriesKebangsaan.getAll, (error, resultKeb) => {
                                            if (error) {
                                                throw error;
                                            } else {
                                                pool.query(queriesPerkawinan.getAll, (error, resultPerkawinan) => {
                                                    if (error) {
                                                        throw error;
                                                    } else {
                                                        pool.query(queriespendidikan.getAll, (error, resultPendidikan) => {
                                                            if (error) {
                                                                throw error;
                                                            } else {
                                                                pool.query(queriesPekerjaan.getAll, (error, resultPekerjaan) => {
                                                                    if (error) {
                                                                        throw error;
                                                                    } else {
                                                                        pool.query(queriesEtnis.getAll, (error, resultEtnis) => {
                                                                            if (error) {
                                                                                throw error;
                                                                            } else {
                                                                                pool.query(queriesBahasa.getAll, (error, resultBahasa) => {
                                                                                    if (error) {
                                                                                        throw error;
                                                                                    } else {
                                                                                        pool.query(queriesNegara.getAll, (error, resultNegara) => {
                                                                                            if (error) {
                                                                                                throw error;
                                                                                            } else {
                                                                                                let tempres = {
                                                                                                    agama: result.rows, jeniskelamin: resultJk.rows, title: resultTitle.rows,
                                                                                                    golongandarah: resultGD.rows, kebangsaan: resultKeb.rows,
                                                                                                    perkawinan: resultPerkawinan.rows, pendidikan: resultPendidikan.rows,
                                                                                                    pekerjaan: resultPekerjaan.rows, etnis: resultEtnis.rows,
                                                                                                    bahasa: resultBahasa.rows, negara: resultNegara.rows
                                                                                                }
                                                                                                res.status(201).send({
                                                                                                    data: tempres,
                                                                                                    status: "success",
                                                                                                    success: true,
                                                                                                });

                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

            }
        });
    } catch (error) {

    }

};

const desaKelurahan = (req, res) => {
    try {
        var strArray = req.query.param.split(",");
        let desa = req.query.param
        let kecamatan = ''
        if (strArray.length > 1) {
            desa = strArray[0];
            kecamatan = strArray[1];
        }
        let query = queriesDesa.getAll + ` where md.namadesakelurahan ilike '%${desa}%' and mk.namakecamatan ilike '%${kecamatan}%' order by md.namadesakelurahan limit 20`
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
    } catch (error) {
        res.status(200).send({
            data: [],
            status: "error",
            success: true,
        });
    }
}
const getKecamatan = (req, res) => {
    try {
        pool.query(queriesDesa.getKecamatan, (error, result) => {
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
    } catch (error) {
        res.status(200).send({
            data: [],
            status: "error",
            success: true,
        });
    }
}
const comboRegistrasi = (req, res) => {
    try {
        pool.query(quriesInstalasi.getAll, (error, result) => {
            if (error) throw error;
            pool.query(quriesUnit.getAll, (error, result2) => {
                if (error) throw error;
                pool.query(quriesAsalRujukan.getAll, (error, result3) => {
                    if (error) throw error;
                    pool.query(quriesJenisPenjamin.getAll, (error, result4) => {
                        if (error) throw error;
                        pool.query(queriesRekanan.getAll, (error, result5) => {
                            if (error) throw error;
                            pool.query(queriesHubunganKeluarga.getAll, (error, result6) => {
                                if (error) throw error;
                                pool.query(queriesPegawai.getAll, (error, result7) => {
                                    if (error) throw error;
                                    pool.query(queriesKelas.getAll, (error, result8) => {
                                        if (error) throw error;
                                        pool.query(queriesKamar.getAll, (error, result9) => {
                                            if (error) throw error;
                                            pool.query(queriesTempatTidur.getAll, (error, result10) => {
                                                if (error) throw error;
                                                pool.query(`select id as value,reportdisplay as label from m_statuspulang`, (error, result11) => {
                                                    if (error) throw error;
                                                    let tempres = {
                                                        instalasi: result.rows, unit: result2.rows, asalrujukan: result3.rows,
                                                        jenispenjamin: result4.rows, rekanan: result5.rows, hubungankeluarga: result6.rows,
                                                        pegawai: result7.rows, kelas: result8.rows, kamar: result9.rows,
                                                        tempattidur: result10.rows,statuspulang: result11.rows
                                                    }
                                                    res.status(200).send({
                                                        data: tempres,
                                                        status: "success",
                                                        success: true,
                                                    });
        
                                                })
    
                                            })

                                        })

                                    })

                                })

                            })

                        })

                    })

                })

            })

        })
    } catch (error) {
        res.status(200).send({
            data: [],
            status: "error",
            success: true,
        });
    }
}

const comboAsuransi = (req, res) => {
    try {
        pool.query(queriesStatusKecelakaan.getAll, (error, result) => {
            if (error){ 
                throw error;
            } else  {
                let tempres = {
                    statuskecelakaan: result.rows
                }
                res.status(200).send({
                    data: tempres,
                    status: "success",
                    success: true,
                });
            }
        }) 
    } catch (error) {
        console.error(error.message)
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        });
    }
}
module.exports = {
    selectComboBox,
    desaKelurahan,
    getKecamatan,
    comboRegistrasi,
    comboAsuransi
};
