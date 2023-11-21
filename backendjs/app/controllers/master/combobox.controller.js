import pool from "../../config/dbcon.query";
import queries from '../../queries/mastertable/agama/agama.queries.js';
import queriesJk from '../../queries/mastertable/jenisKelamin/jenisKelamin.queries.js';
import queriesTitle from '../../queries/mastertable/title/title.queries.js';
import queriesGolonganDarah from '../../queries/mastertable/golonganDarah/golonganDarah.queries.js';
import queriesKebangsaan from '../../queries/mastertable/kebangsaan/kebangsaan.queries.js';
import queriesPerkawinan from '../../queries/mastertable/statusperkawinan/statusperkawinan.queries.js';
import queriespendidikan from '../../queries/mastertable/pendidikan/pendidikan.queries.js';
import queriesPekerjaan from '../../queries/mastertable/pekerjaan/pekerjaan.queries.js';
import queriesEtnis from '../../queries/mastertable/etnis/etnis.queries.js';
import queriesBahasa from '../../queries/mastertable/bahasa/bahasa.queries.js';
import queriesDesa from '../../queries/mastertable/desa/desa.queries.js';
import queriesNegara from '../../queries/mastertable/negara/negara.queries.js';
import quriesInstalasi from '../../queries/mastertable/instalasi/instalasi.queries.js'
import queriesUnit from '../../queries/mastertable/unit/unit.queries.js'
import quriesAsalRujukan from '../../queries/mastertable/asalrujukan/asalrujukan.queries.js'
import quriesJenisPenjamin from '../../queries/mastertable/jenisPenjamin/jenispenjamin.queries.js'
import queriesRekanan from '../../queries/mastertable/rekanan/rekanan.queries.js'
import queriesHubunganKeluarga from '../../queries/mastertable/hubunganKeluarga/hubunganKeluarga.queries.js'
import queriesPegawai from '../../queries/mastertable/pegawai/pegawai.queries.js'
import queriesKelas from '../../queries/mastertable/kelas/kelas.queries.js'
import queriesKamar from '../../queries/mastertable/kamar/kamar.queries.js'
import queriesTempatTidur from '../../queries/mastertable/tempattidur/tempattidur.queries.js'
import queriesStatusKecelakaan from '../../queries/mastertable/statuskecelakaan/statuskecelakaan.queries.js'
import queriesStatusPulangRI from '../../queries/mastertable/statuspulangri/statuspulangri.queries.js'
import queriesKondisiPulangRI from '../../queries/mastertable/kondisipulangri/kondisipulangri.queries.js'
import queriesCaraPulangRI from '../../queries/mastertable/carapulangri/carapulangri.queries.js'
import queriesMetodeBayar from '../../queries/mastertable/metodebayar/metodebayar.queries.js'
import queriesNonTunai from '../../queries/mastertable/jenisNonTunai/jenisNonTunai.queries.js'
import queriesRekeningRs from '../../queries/mastertable/rekeningRs/rekeningRs.queries.js'
import queriesSediaan from '../../queries/mastertable/sediaan/sediaan.queries.js'
import queriesGolonganObat from '../../queries/mastertable/golonganobat/golonganobat.queries.js'
import queriesDetailJenisProduk from '../../queries/mastertable/detailjenisproduk/detailjenisproduk.queries.js'
import queriesVariabelbpjs from '../../queries/mastertable/variabelbpjs/variabelbpjs.queries.js'
import queriesSatuan from '../../queries/mastertable/satuan/satuan.queries.js'
import queriesJenisProduk from '../../queries/mastertable/jenisproduk/jenisproduk.queries.js'
import queriesJenisSatuan from '../../queries/mastertable/jenissatuan/jenissatuan.queries.js'
import queriesProduk from '../../queries/mastertable/produk/produk.queries.js'
import queriesAsalProduk from "../../queries/mastertable/asalproduk/asalproduk.queries.js"
import jenisorderbarangQueries from "../../queries/mastertable/jenisorderbarang/jenisorderbarang.queries.js";
import queriesSigna from "../../queries/mastertable/signa/signa.queries.js";
import queriesKeteranganResep from "../../queries/mastertable/keteranganresep/keteranganresep.queries.js";
import queriesJenisResep from "../../queries/mastertable/jenisresep/jenisresep.queries.js";
import queriesAlasanRetur from "../../queries/mastertable/alasanretur/m_alasanretur.queries.js";
import queriesMasterIndukRL from "../../queries/mastertable/masterindukrl/masterindukrl.queries.js";
import queriesMasterRL from "../../queries/mastertable/masterrl/masterrl.queries.js";
import queriesLoket from "../../queries/mastertable/loket/loket.queries.js";
import queriesJenisAntrean from "../../queries/mastertable/jenisloket/m_jenisantrean.queries.js";

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
                                                        pool.query(`select mu.namaunit,mk2.namakelas,count(mt.id) from m_unit mu 
                                                        join m_kamar mk on mk.objectunitfk=mu.id 
                                                        join m_kelas mk2 on mk2.id=mk.objectkelasfk
                                                        join m_tempattidur mt on mt.objectkamarfk=mk.id
                                                        where mt.objectstatusbedfk =2 and mt.statusenabled =true
                                                        group  by mu.namaunit,mk2.namakelas`, (error, result13) => {
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
                                                                caramasuk:result12.rows,
                                                                gridtempattidur:result13.rows
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
        let produk 
        const isLogistik = req.query.isLogistik === "true"
        if(!isLogistik){
            produk = await pool.query(queriesProduk.getObatWithSatuan);
        } else{
            produk = await pool.query(queriesProduk.qGetLogistikWithSatuan);
        }
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

const comboDistribusiOrder = async (req, res) => {
    try{
        const unit = await pool.query(queriesUnit.getAll, [])
        const unitUser = await pool.query(queriesUnit.qGetUnitUser, [req.userId])
        const jenisOrderBarang = await pool.query(jenisorderbarangQueries.getAll)
        let tempres = {
            unit: unit.rows,
            jenisorderbarang: jenisOrderBarang.rows,
            unitUser: unitUser.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    }catch(e){
        console.error("===get combo distribusi order error=== ")
        console.error(e)
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        });
    }
}

const comboStokOpname = async (req, res) => {
    try{
        const unit = await pool.query(queriesUnit.getAll)
        let tempres = {
            unit: unit.rows,
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    }catch(e){
        console.error("===get combo stok opname error=== ")
        console.error(e)
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        });
    }
}

const comboResep = async (req, res) => {
    try{
        const pegawai = await pool.query(queriesPegawai.getAll)
        const unit = await pool.query(queriesUnit.getAll)
        const signa = await pool.query(queriesSigna.getAll)
        const keteranganResep = await pool.query(queriesKeteranganResep.getAll)
        const sediaan = await pool.query(queriesSediaan.getAll)
        let tempres = {
            pegawai: pegawai.rows,
            unit: unit.rows,
            signa: signa.rows,
            keteranganresep: keteranganResep.rows,
            sediaan: sediaan.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    }catch(error){
        console.error("===get combo stok resep error=== ")
        console.error(error)
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        });
    }
}

const comboVerifResep = async (req, res) => {
    try{
        const pegawai = await pool.query(queriesPegawai.getAll)
        const unit = await pool.query(queriesUnit.getAll)
        const signa = await pool.query(queriesSigna.getAll)
        const keteranganResep = await pool.query(queriesKeteranganResep.getAll)
        const sediaan = await pool.query(queriesSediaan.getAll)
        const penjamin = await pool.query(queriesRekanan.getPenjamin)
        let tempres = {
            pegawai: pegawai.rows,
            unit: unit.rows,
            signa: signa.rows,
            keteranganresep: keteranganResep.rows,
            sediaan: sediaan.rows,
            penjamin: penjamin.rows
        }
        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    }catch(error){
        console.error("===get combo stok resep error=== ")
        console.error(error)
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        });
    }
}

const comboPenjualanBebas = async (req, res) => {
    try{
        const pegawai = await pool.query(queriesPegawai.getAll)
        const jenisResep = await pool.query(queriesJenisResep.getAll)
        const unit = await pool.query(queriesUnit.getAll)
        const signa = await pool.query(queriesSigna.getAll)
        const keteranganResep = await pool.query(queriesKeteranganResep.getAll)
        const sediaan = await pool.query(queriesSediaan.getAll)
        
        let tempres = {
            pegawai: pegawai.rows,
            unit: unit.rows,
            jenisresep: jenisResep.rows,
            signa: signa.rows,
            keteranganresep: keteranganResep.rows,
            sediaan: sediaan.rows,
        }

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    }catch(error){
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        });
    }
}

const comboReturObat = async (req, res) => {
    try{
        const alasan = await pool.query(queriesAlasanRetur.getAll)
        
        let tempres = {
            alasan: alasan.rows,
        }

        res.status(200).send({
            data: tempres,
            status: "success",
            success: true,
        });
    }catch(error){
        res.status(500).send({
            data: [],
            status: "error",
            success: false,
        });
    }
}

const comboMappingProduk = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const jenisProduk = await pool.query(queriesJenisProduk.getAll)
        const instalasi = await pool.query(quriesInstalasi.getAll)
        const masterIndukRL = await pool.query(queriesMasterIndukRL.getAll)
        const masterRL = await pool.query(queriesMasterRL.getAll)
        const tempres = {
            jenisproduk: jenisProduk.rows,
            instalasi: instalasi.rows,
            masterindukrl: masterIndukRL.rows,
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

const comboViewer = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const loket = await pool.query(queriesLoket.getAll)
        const jenisLoket = await pool.query(queriesJenisAntrean.getAll)
        const tempres = {
            loket: loket.rows,
            jenisloket: jenisLoket.rows
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

export default {
    selectComboBox,
    desaKelurahan,
    getKecamatan,
    comboRegistrasi,
    comboAsuransi,
    comboPulang,
    comboPayment,
    comboSettingProduk,
    comboPenerimaanBarang,
    comboDistribusiOrder,
    comboStokOpname,
    comboResep,
    comboVerifResep,
    comboPenjualanBebas,
    comboReturObat,
    comboMappingProduk,
    comboViewer
};
