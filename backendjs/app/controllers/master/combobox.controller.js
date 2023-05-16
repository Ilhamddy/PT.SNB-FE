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
                                                                                        pool.query(queriesDesa.getAll, (error, resultDesa) => {
                                                                                            if (error) {
                                                                                                throw error;
                                                                                            } else {
                                                                                                let tempres = {
                                                                                                    agama: result.rows, jeniskelamin: resultJk.rows, title: resultTitle.rows,
                                                                                                    golongandarah: resultGD.rows, kebangsaan: resultKeb.rows,
                                                                                                    perkawinan: resultPerkawinan.rows, pendidikan: resultPendidikan.rows,
                                                                                                    pekerjaan: resultPekerjaan.rows, etnis: resultEtnis.rows,
                                                                                                    bahasa: resultBahasa.rows, desa: resultDesa.rows
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
module.exports = {
    selectComboBox,
    desaKelurahan,
    getKecamatan
};
