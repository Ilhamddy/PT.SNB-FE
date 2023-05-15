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
                                                                                        let tempres = {
                                                                                            agama: result.rows, jeniskelamin: resultJk.rows, title: resultTitle.rows,
                                                                                            golongandarah: resultGD.rows, kebangsaan: resultKeb.rows,
                                                                                            perkawinan:resultPerkawinan.rows, pendidikan: resultPendidikan.rows,
                                                                                            pekerjaan: resultPekerjaan.rows, etnis: resultEtnis.rows,
                                                                                            bahasa: resultBahasa.rows
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
    } catch (error) {

    }

};
module.exports = {
    selectComboBox,

};
