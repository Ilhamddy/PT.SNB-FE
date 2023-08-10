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
import queriesUnit from '../../queries/master/unit/unit.queries'
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
import queriesMetodeBayar from '../../queries/master/metodebayar/metodebayar.queries'
import queriesNonTunai from '../../queries/master/jenisNonTunai/jenisNonTunai.queries'
import queriesRekeningRs from '../../queries/master/rekeningRs/rekeningRs.queries'
import queriesSediaan from '../../queries/master/sediaan/sediaan.queries'
import queriesGolonganObat from '../../queries/master/golonganobat/golonganobat.queries'
import queriesDetailJenisProduk from '../../queries/master/detailjenisproduk/detailjenisproduk.queries'
import queriesVariabelbpjs from '../../queries/master/variabelbpjs/variabelbpjs.queries'
import queriesSatuan from '../../queries/master/satuan/satuan.queries'
import queriesJenisProduk from '../../queries/master/jenisproduk/jenisproduk.queries'
import queriesJenisSatuan from '../../queries/master/jenissatuan/jenissatuan.queries'
import queriesProduk from '../../queries/master/produk/produk.queries'
import queriesAsalProduk from "../../queries/master/asalproduk/asalproduk.queries"

const selectComboBox = (req, res) => {
    try {
        pool.query(queries.getAll, (error, result) => {
            if (error) {
                return
                // throw error;
            } else {
                pool.query(queriesJk.getAll, (error, resultJk) => {
                    if (error) {
                        return
                        // throw error;
                    } else {
                        pool.query(queriesTitle.getAll, (error, resultTitle) => {
                            if (error) {
                                return
                                // throw error;
                            } else {
                                pool.query(queriesGolonganDarah.getAll, (error, resultGD) => {
                                    if (error) {
                                        return
                                        // throw error;
                                    } else {
                                        pool.query(queriesKebangsaan.getAll, (error, resultKeb) => {
                                            if (error) {
                                                return
                                                // throw error;
                                            } else {
                                                pool.query(queriesPerkawinan.getAll, (error, resultPerkawinan) => {
                                                    if (error) {
                                                        return
                                                        // throw error;
                                                    } else {
                                                        pool.query(queriespendidikan.getAll, (error, resultPendidikan) => {
                                                            if (error) {
                                                                return
                                                                // throw error;
                                                            } else {
                                                                pool.query(queriesPekerjaan.getAll, (error, resultPekerjaan) => {
                                                                    if (error) {
                                                                        return
                                                                        // throw error;
                                                                    } else {
                                                                        pool.query(queriesEtnis.getAll, (error, resultEtnis) => {
                                                                            if (error) {
                                                                                return
                                                                                // throw error;
                                                                            } else {
                                                                                pool.query(queriesBahasa.getAll, (error, resultBahasa) => {
                                                                                    if (error) {
                                                                                        return
                                                                                        // throw error;
                                                                                    } else {
                                                                                        pool.query(queriesNegara.getAll, (error, resultNegara) => {
                                                                                            if (error) {
                                                                                                return
                                                                                                // throw error;
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
            if (error) return;
            pool.query(queriesUnit.getAll, (error, result2) => {
                if (error) return;
                pool.query(quriesAsalRujukan.getAll, (error, result3) => {
                    if (error) return;
                    pool.query(quriesJenisPenjamin.getAll, (error, result4) => {
                        if (error) return;
                        pool.query(queriesRekanan.getAll, (error, result5) => {
                            if (error) return;
                            pool.query(queriesHubunganKeluarga.getAll, (error, result6) => {
                                if (error) return;
                                pool.query(queriesPegawai.getAll, (error, result7) => {
                                    if (error) return;
                                    pool.query(queriesKelas.getAll, (error, result8) => {
                                        if (error) return;
                                        pool.query(queriesKamar.getAll, (error, result9) => {
                                            if (error) return;
                                            pool.query(queriesTempatTidur.getAll, (error, result10) => {
                                                if (error) return;
                                                pool.query(`select id as value,reportdisplay as label from m_statuspulang`, (error, result11) => {
                                                    if (error) return;
                                                    pool.query(`select id as value,caramasuk as label from m_caramasuk`, (error, result12) => {
                                                        if (error) return;
                                                        let tempres = {
                                                            instalasi: result.rows, 
                                                            unit: result2.rows, 
                                                            asalrujukan: result3.rows,
                                                            jenispenjamin: result4.rows, 
                                                            rekanan: result5.rows, 
                                                            hubungankeluarga: result6.rows,
                                                            pegawai: result7.rows, 
                                                            kelas: result8.rows, 
                                                            kamar: result9.rows,
                                                            tempattidur: result10.rows,
                                                            statuspulang: result11.rows,
                                                            caramasuk:result12.rows
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

        })
    } catch (error) {
        res.status(200).send({
            data: [],
            status: "error",
            success: true,
        });
    }
}

const comboAsuransi = async (req, res) => {
    try {
        const result = await pool.query(queriesStatusKecelakaan.getAll, []) 
        const kelas = await pool.query(queriesKelas.getAll, [])
        let tempres = {
            statuskecelakaan: result.rows,
            kelas : kelas.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
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
        const unit = await pool.query(queriesUnit.getRawatInap, []);

        let tempres = {
            statuspulang: statusPulangRI.rows,
            kondisipulang: kondisiPulangRI.rows,
            carapulang: caraPulangRI.rows,
            hubungankeluarga: hubKeluarga.rows,
            pegawai: pegawai.rows,
            kelas: kelas.rows,
            kamar: kamar.rows,
            tempattidur: tempattidur.rows,
            unit: unit.rows
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


const comboPayment = async (req, res) => {
    try {
        const metodeBayar = await pool.query(queriesMetodeBayar.getAll, []);
        const nonTunai = await pool.query(queriesNonTunai.getAll, []);
        const rekeningRs = await pool.query(queriesRekeningRs.getAll, []);
        let tempres = {
            metodeBayar: metodeBayar.rows,
            nontunai: nonTunai.rows,
            rekeningRs: rekeningRs.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error) {
        console.error("===get metode bayar error=== ")
        console.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }
}

const comboSettingProduk = async (req, res) => {
    try {
        const sediaan = await pool.query(queriesSediaan.getAll, []);
        const golonganObat = await pool.query(queriesGolonganObat.getAll, []);
        const jenisProduk = await pool.query(queriesJenisProduk.getAll, [])
        const detailJenisProduk = await pool.query(queriesDetailJenisProduk.getAll, []);
        const variabelBpjs = await pool.query(queriesVariabelbpjs.getAll, []);
        const satuan = await pool.query(queriesSatuan.getAll, []);
        const jenisSatuan = await pool.query(queriesJenisSatuan.getAll, []);
        const satuanProduk = await pool.query(queriesSatuan.getSatuanProduk, []);

        let tempres = {
            sediaan: sediaan.rows,
            golonganobat: golonganObat.rows,
            detailjenisproduk: detailJenisProduk.rows,
            variabelbpjs: variabelBpjs.rows,
            satuan: satuan.rows,
            jenisproduk: jenisProduk.rows,
            jenissatuan: jenisSatuan.rows,
            satuanproduk: satuanProduk.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    } catch (error){
        console.error("===get combo setting error=== ")
        console.error(error)
        res.status(500).send({
            data: error,
            status: "error",
            success: false,
        });
    }
}

const comboPenerimaanBarang = async (req, res) => {
    try{
        const supplier = await pool.query(queriesRekanan.getSupplier);
        const produk = await pool.query(queriesProduk.getObatWithSatuan);
        const satuanProduk = await pool.query(queriesSatuan.getSatuanProduk);
        const asalproduk = await pool.query(queriesAsalProduk.getAll)
        const unit = await pool.query(queriesUnit.getAll)
        let tempres = {
            supplier: supplier.rows,
            produk: produk.rows,
            satuanproduk: satuanProduk.rows,
            asalproduk: asalproduk.rows,
            unit: unit.rows 
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    }catch(e){
        console.error("===get combo penerimaan barang error=== ")
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
    comboPulang,
    comboPayment,
    comboSettingProduk,
    comboPenerimaanBarang
};
