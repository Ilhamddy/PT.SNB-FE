import pool from "../../config/dbcon.query";
import queries from '../../queries/master/agama/agama.queries.js';
import queriesJk from '../../queries/master/jenisKelamin/jenisKelamin.queries';
import queriesTitle from '../../queries/master/title/title.queries';
import queriesGolonganDarah from '../../queries/master/golonganDarah/golonganDarah.queries';
import queriesKebangsaan from '../../queries/master/kebangsaan/kebangsaan.queries';
import queriesPerkawinan from '../../queries/master/statusperkawinan/statusperkawinan.queries';
import queriespendidikan from '../../queries/master/pendidikan/pendidikan.queries';
import queriesPekerjaan from '../../queries/master/pekerjaan/pekerjaan.queries';
import queriesEtnis from '../../queries/master/etnis/etnis.queries';
import queriesBahasa from '../../queries/master/bahasa/bahasa.queries';
import queriesDesa from '../../queries/master/desa/desa.queries';
import queriesNegara from '../../queries/master/negara/negara.queries';
import quriesInstalasi from '../../queries/master/instalasi/instalasi.queries'
import quriesUnit from '../../queries/master/unit/unit.queries'
import quriesAsalRujukan from '../../queries/master/asalrujukan/asalrujukan.queries'
import quriesJenisPenjamin from '../../queries/master/jenisPenjamin/jenispenjamin.queries'
import queriesRekanan from '../../queries/master/rekanan/rekanan.queries'
import queriesHubunganKeluarga from '../../queries/master/hubunganKeluarga/hubunganKeluarga.queries'
import queriesPegawai from '../../queries/master/pegawai/pegawai.queries'
import queriesKelas from '../../queries/master/kelas/kelas.queries'
import queriesKamar from '../../queries/master/kamar/kamar.queries'
import queriesTempatTidur from '../../queries/master/tempattidur/tempattidur.queires'
import queriesStatusKecelakaan from '../../queries/master/statuskecelakaan/statuskecelakaan.queries'
import queriesStatusPulangRI from '../../queries/master/statuspulangri/statuspulangri.queries'
import queriesKondisiPulangRI from '../../queries/master/kondisipulangri/kondisipulangri.queries'
import queriesCaraPulangRI from '../../queries/master/carapulangri/carapulangri.queries'

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

const comboPulang = async (req, res) => {
    try{
        const statusPulangRI = await pool.query(queriesStatusPulangRI.getAll, []);
        const kondisiPulangRI = await pool.query(queriesKondisiPulangRI.getAll, []);
        const caraPulangRI = await pool.query(queriesCaraPulangRI.getAll, []);
        const hubKeluarga = await pool.query(queriesHubunganKeluarga.getAll, []);
        const pegawai = await pool.query(queriesPegawai.getAll, []);
        const kelas = await pool.query(queriesKelas.getAll, []);
        const kamar = await pool.query(queriesKamar.getAll, []);
        const tempattidur = await pool.query(queriesTempatTidur.getAll, []);

        let tempres = {
            statuspulang: statusPulangRI.rows,
            kondisipulang: kondisiPulangRI.rows,
            carapulang: caraPulangRI.rows,
            hubungankeluarga: hubKeluarga.rows,
            pegawai: pegawai.rows,
            kelas: kelas.rows,
            kamar: kamar.rows,
            tempattidur: tempattidur.rows,
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    }catch(e){
        console.error("get combo pulang error: ")
        console.error(e)
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        });
    }
}

export default {
    selectComboBox,
    desaKelurahan,
    getKecamatan,
    comboRegistrasi,
    comboAsuransi,
    comboPulang
};
