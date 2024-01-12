import config from "../config/db.config.js";
import sequelizeInstance from "sequelize"
import {Sequelize} from "sequelize";

import userModel from "../models/user.model.js"
import roleModel from "../models/role.model.js"
import user_rolesModel from "./user_roles.model.js";
// master
import m_pasienM from "../models/m_pasien.model.js";
import running_numberM from "../models/running_number.model.js";
import m_tempattidurM from "../models/m_tempattidur.js";
// transaksi
import t_daftarpasienM from "../models/t_daftarpasien.model.js";
import t_antreanpemeriksaanM from "../models/t_antreanpemeriksaan.model.js";
import t_emrpasienM from "../models/t_emrpasien.js";
import t_ttvM from "../models/t_ttv.js";
import t_cpptM from "../models/t_cppt.js";
import t_diagnosapasienM from "../models/t_diagnosapasien.js";
import t_diagnosatindakanM from "../models/t_diagnosatindakan.js";
import t_pelayananpasienM from "./t_pelayananpasien.model.js";
import t_pelayananpasiendetailM from "../models/t_pelayananpasiendetail.js";
import t_pelayananpasienpetugasM from "../models/t_pelayananpasienpetugas.js";
import t_rm_lokasidokumenM from "../models/t_rm_lokasidokumen.js";
import t_orderpelayananM from "../models/t_orderpelayanan.model.js";
import t_detailorderpelayananM from "../models/t_detailorderpelayanan.model.js";
import t_kepesertaanasuransiM from "../models/t_kepesertaanasuransi.js";
import t_notapelayananpasien from "./t_notapelayananpasien.js";
import t_buktibayarpasienM from "./t_buktibayarpasien.model.js";
import t_log_batalveriflayananM from "./t_log_batalveriflayanan.model.js";
import t_log_pasienbatalbayarModel from "./t_log_pasienbatalbayar.model.js";
import t_piutangpasienModel from "./t_piutangpasien.model.js";
import t_detailpiutangpasienModel from "./t_detailpiutangpasien.model.js";
import t_carabayarModel from "./t_carabayar.model.js";
import t_depositpasienModel from "./t_depositpasien.model.js";
import t_special_cmg_option from "./t_special_cmg_option.js";
import m_produkM from "./m_produk.model.js";
import m_detailjenisprodukM from "./m_detailjenisproduk.model.js";
import m_pemeriksaanlab from "./m_pemeriksaanlab.js";
import m_sediaanM from "./m_sediaan.model.js";
import m_satuanM from "./m_satuan.model.js";
import m_kemasanprodukM from "./m_kemasanproduk.model.js";
import m_kelompokumurM from "./m_kelompokumur.model.js";
import m_detailkelompokumurM from "./m_detailkelompokumur.model.js";
import t_penerimaanbarangModel from "./t_penerimaanbarang.model.js";
import t_penerimaanbarangdetailModel from "./t_penerimaanbarangdetail.model.js";
import m_nilainormallabM from "./m_nilainormallab.model.js";
import t_stokunitModel from "./t_stokunit.model.js";
import t_kartustokModel from "./t_kartustok.model.js";
import t_hasilpemeriksaanModel from "./t_hasilpemeriksaan.model.js";
import t_hasilpemeriksaandetailModel from "./t_hasilpemeriksaandetail.model.js";
import t_orderbarangModel from "./t_orderbarang.model.js";
import t_orderbarangdetailModel from "./t_orderbarangdetail.model.js";
import t_kirimbarangModel from "./t_kirimbarang.model.js";
import t_kirimbarangdetailModel from "./t_kirimbarangdetail.model.js";
import t_stokopnameModel from "./t_stokopname.model.js";
import t_stokopnamedetailModel from "./t_stokopnamedetail.model.js";
import t_batalpasienModel from "./t_batalpasien.model.js";
import t_orderresepModel from "./t_orderresep.model.js";
import t_orderresepdetailModel from "./t_orderresepdetail.model.js";
import t_verifresepModel from "./t_verifresep.model.js";
import t_sensusharianModel from "./t_sensusharian.js";
import t_penjualanbebasModel from "./t_penjualanbebas.model.js";
import t_penjualanbebasdetailModel from "./t_penjualanbebasdetail.model.js";
import t_returobatpasienModel from "./t_returobatpasien.model.js";
import m_maprltoprodukModel from "./m_maprltoproduk.model.js";
import t_antreanloketModel from "../models/t_antreanloket.model.js";
import users_pasienModel from "./user_pasien.model.js";
import t_pasienigdModel from "./t_pasienigd.model.js";
import m_jadwaldokterModel from "./m_jadwaldokter.model.js";
import t_orderoperasiModel from "./t_orderoperasi.model.js";
import t_registrasionlineModel from "./t_registrasionline.model.js";
import m_penjaminpasienModel from "./m_penjaminpasien.model.js";
import t_pelayananpasientempModel from "./t_pelayananpasientemp.model.js";
import t_beritaModel from "./t_berita.model.js";
import m_pegawaiModel from "./m_pegawai.model.js";
import m_unitModel from "./m_unit.model.js";
import m_kamarModel from "./m_kamar.model.js"
import t_pemesananbarangModel from "./t_pemesananbarang.model.js";
import t_pemesananbarangdetailModel from "./t_pemesananbarangdetail.model.js";
import role_permissionsModel from "./role_permissions.model.js";
import t_verifremunerasiModel from "./t_verifremunerasi.model.js";
import s_modulaplikasiModel from "./s_modulaplikasi.model.js";
import s_menumodulaplikasiModel from "./s_menumodulaplikasi.model.js";
import s_childmenumodulaplikasiModel from "./s_childmenumodulaplikasi.model.js";
import m_mapusertounitModel from "./m_mapusertounit.model.js";
import t_returbarangModel from "./t_returbarang.model.js";
import t_returbarangdetailModel from "./t_returbarangdetail.model.js";
import t_bedharianModel from "./t_bedharian.model.js";
import t_liburpegawaiModel from "./t_liburpegawai.model.js";
import m_mapunittoprodukModel from "./m_mapunittoproduk.model.js"
import t_asesmenbayilahirModel from "./t_asesmenbayilahir.model.js";
import m_jenisprodukModel from "./m_jenisproduk.model.js";
import m_totalhargaprodukbykelasModel from "./m_totalhargaprodukbykelas.model.js";
import m_hargaprodukperkomponenModel from "./m_hargaprodukperkomponen.model.js";
import t_setorankasirModel from "./t_setorankasir.model.js";
import t_setorankasirdetailModel from "./t_setorankasirdetail.model.js";
import m_instalasiModel from "./m_instalasi.model.js";
import t_mergedaftarpasienModel from "./t_mergedaftarpasien.model.js";
import t_pengkajianawalkeperawatanModel from "./t_pengkajianawalkeperawatan.model.js";
import t_riwayatobatpasien from "./t_riwayatobatpasien.js";
import t_riwayatpenyakit from "./t_riwayatpenyakit.js";
import t_riwayatalergiModel from "./t_riwayatalergi.model.js";
import t_asesmenawaligdModel from "./t_asesmenawaligd.model.js";
import t_skriningigdModel from "./t_skriningigd.model.js";
import t_asesmenawaligd_fisikModel from "./t_asesmenawaligd_fisik.model.js";


const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorAliases: false,
    timezone: '+07:00',
    logging: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
  }
);


const db = {};

db.Sequelize = sequelizeInstance;
db.sequelize = sequelize;

db.user = userModel(sequelize, sequelizeInstance);
db.users_pasien = users_pasienModel(sequelize, sequelizeInstance);
db.role = roleModel(sequelize, sequelizeInstance);
db.user_roles = user_rolesModel(sequelize, sequelizeInstance);
db.role_permissions = role_permissionsModel(sequelize,sequelizeInstance)
db.s_modulaplikasi = s_modulaplikasiModel(sequelize,sequelizeInstance)
db.s_menumodulaplikasi = s_menumodulaplikasiModel(sequelize,sequelizeInstance)
db.s_childmenumodulaplikasi = s_childmenumodulaplikasiModel(sequelize,sequelizeInstance)
// master
db.m_pasien = m_pasienM(sequelize, sequelizeInstance);
db.running_number = running_numberM(sequelize,sequelizeInstance);
db.m_tempattidur = m_tempattidurM(sequelize,sequelizeInstance);
db.m_unit = m_unitModel(sequelize,sequelizeInstance);
// transaksi
db.t_daftarpasien = t_daftarpasienM(sequelize,sequelizeInstance);
db.t_antreanpemeriksaan = t_antreanpemeriksaanM(sequelize,sequelizeInstance);
db.t_emrpasien = t_emrpasienM(sequelize,sequelizeInstance);
db.t_ttv = t_ttvM(sequelize,sequelizeInstance);
db.t_cppt = t_cpptM(sequelize,sequelizeInstance);
db.t_diagnosapasien = t_diagnosapasienM(sequelize,sequelizeInstance);
db.t_diagnosatindakan = t_diagnosatindakanM(sequelize,sequelizeInstance);
db.t_pelayananpasien = t_pelayananpasienM(sequelize,sequelizeInstance);
db.t_pelayananpasiendetail = t_pelayananpasiendetailM(sequelize,sequelizeInstance);
db.t_pelayananpasienpetugas = t_pelayananpasienpetugasM(sequelize,sequelizeInstance);
db.t_rm_lokasidokumen = t_rm_lokasidokumenM(sequelize,sequelizeInstance);
db.t_orderpelayanan = t_orderpelayananM(sequelize,sequelizeInstance);
db.t_detailorderpelayanan = t_detailorderpelayananM(sequelize,sequelizeInstance);
db.t_kepesertaanasuransi = t_kepesertaanasuransiM(sequelize,sequelizeInstance);
db.t_notapelayananpasien = t_notapelayananpasien(sequelize,sequelizeInstance);
db.t_buktibayarpasien = t_buktibayarpasienM(sequelize,sequelizeInstance);
db.t_log_batalveriflayanan = t_log_batalveriflayananM(sequelize,sequelizeInstance);
db.t_log_pasienbatalbayar = t_log_pasienbatalbayarModel(sequelize,sequelizeInstance);
db.t_piutangpasien = t_piutangpasienModel(sequelize,sequelizeInstance);
db.t_detailpiutangpasien = t_detailpiutangpasienModel(sequelize,sequelizeInstance);
db.t_carabayar = t_carabayarModel(sequelize,sequelizeInstance);
db.t_depositpasien = t_depositpasienModel(sequelize,sequelizeInstance);
db.t_special_cmg_option = t_special_cmg_option(sequelize,sequelizeInstance);
db.m_produk = m_produkM(sequelize,sequelizeInstance);
db.m_detailjenisproduk = m_detailjenisprodukM(sequelize,sequelizeInstance);
db.m_pemeriksaanlab = m_pemeriksaanlab(sequelize,sequelizeInstance);
db.m_sediaan = m_sediaanM(sequelize,sequelizeInstance);
db.m_satuan = m_satuanM(sequelize,sequelizeInstance);
db.m_kemasanproduk = m_kemasanprodukM(sequelize,sequelizeInstance);
db.m_kelompokumur = m_kelompokumurM(sequelize,sequelizeInstance);
db.m_detailkelompokumur = m_detailkelompokumurM(sequelize, sequelizeInstance)
db.t_penerimaanbarang = t_penerimaanbarangModel(sequelize, sequelizeInstance)
db.t_penerimaanbarangdetail = t_penerimaanbarangdetailModel(sequelize, sequelizeInstance)
db.m_detailkelompokumur = m_detailkelompokumurM(sequelize, sequelizeInstance);
db.m_nilainormallab = m_nilainormallabM(sequelize, sequelizeInstance);
db.t_stokunit = t_stokunitModel(sequelize, sequelizeInstance);
db.t_kartustok = t_kartustokModel(sequelize, sequelizeInstance);
db.t_hasilpemeriksaan = t_hasilpemeriksaanModel(sequelize, sequelizeInstance);
db.t_hasilpemeriksaandetail = t_hasilpemeriksaandetailModel(sequelize, sequelizeInstance);
db.t_orderbarang = t_orderbarangModel(sequelize, sequelizeInstance);
db.t_orderbarangdetail = t_orderbarangdetailModel(sequelize, sequelizeInstance);
db.t_kirimbarang = t_kirimbarangModel(sequelize, sequelizeInstance);
db.t_kirimbarangdetail = t_kirimbarangdetailModel(sequelize, sequelizeInstance);
db.t_stokopname = t_stokopnameModel(sequelize, sequelizeInstance);
db.t_stokopnamedetail = t_stokopnamedetailModel(sequelize, sequelizeInstance);
db.t_batalpasien = t_batalpasienModel(sequelize, sequelizeInstance);
db.t_orderresep = t_orderresepModel(sequelize, sequelizeInstance);
db.t_orderresepdetail = t_orderresepdetailModel(sequelize, sequelizeInstance);
db.t_verifresep = t_verifresepModel(sequelize, sequelizeInstance);
db.t_sensusharian =t_sensusharianModel(sequelize, sequelizeInstance);
db.t_penjualanbebas = t_penjualanbebasModel(sequelize, sequelizeInstance);
db.t_penjualanbebasdetail = t_penjualanbebasdetailModel(sequelize, sequelizeInstance);
db.t_returobatpasien = t_returobatpasienModel(sequelize, sequelizeInstance);
db.m_maprltoproduk = m_maprltoprodukModel(sequelize, sequelizeInstance);
db.t_antreanloket = t_antreanloketModel(sequelize, sequelizeInstance);
db.t_pasienigd = t_pasienigdModel(sequelize, sequelizeInstance);
db.m_jadwaldokter = m_jadwaldokterModel(sequelize, sequelizeInstance);
db.t_orderoperasi = t_orderoperasiModel(sequelize, sequelizeInstance);
db.t_registrasionline = t_registrasionlineModel(sequelize, sequelizeInstance)
db.m_penjaminpasien = m_penjaminpasienModel(sequelize, sequelizeInstance);
db.t_pelayananpasientemp = t_pelayananpasientempModel(sequelize, sequelizeInstance);
db.t_berita = t_beritaModel(sequelize, sequelizeInstance);
db.m_pegawai = m_pegawaiModel(sequelize, sequelizeInstance);
db.m_kamar = m_kamarModel(sequelize, sequelizeInstance);
db.t_pemesananbarang = t_pemesananbarangModel(sequelize, sequelizeInstance);
db.t_pemesananbarangdetail = t_pemesananbarangdetailModel(sequelize, sequelizeInstance)
db.t_verifremunerasi = t_verifremunerasiModel(sequelize, sequelizeInstance)
db.m_mapusertounit = m_mapusertounitModel(sequelize,sequelizeInstance)
db.t_returbarang = t_returbarangModel(sequelize, sequelizeInstance)
db.t_returbarangdetail = t_returbarangdetailModel(sequelize, sequelizeInstance)
db.t_bedharian = t_bedharianModel(sequelize, sequelizeInstance)
db.t_liburpegawai = t_liburpegawaiModel(sequelize, sequelizeInstance)
db.m_mapunittoproduk = m_mapunittoprodukModel(sequelize, sequelizeInstance)
db.t_asesmenbayilahir = t_asesmenbayilahirModel(sequelize, sequelizeInstance)
db.m_jenisproduk = m_jenisprodukModel(sequelize, sequelizeInstance)
db.m_totalhargaprodukbykelas = m_totalhargaprodukbykelasModel(sequelize, sequelizeInstance)
db.m_hargaprodukperkomponen = m_hargaprodukperkomponenModel.init(sequelize, sequelizeInstance)
db.t_setorankasir = t_setorankasirModel(sequelize, sequelizeInstance)
db.t_setorankasirdetail = t_setorankasirdetailModel(sequelize, sequelizeInstance)
db.m_instalasi = m_instalasiModel(sequelize, sequelizeInstance)
db.t_mergedaftarpasien = t_mergedaftarpasienModel(sequelize, sequelizeInstance)
db.t_pengkajianawalkeperawatan = t_pengkajianawalkeperawatanModel(sequelize, sequelizeInstance)
db.t_riwayatobatpasien = t_riwayatobatpasien.init(sequelize, sequelizeInstance)
db.t_riwayatpenyakit = t_riwayatpenyakit.init(sequelize, sequelizeInstance)
db.t_riwayatalergi = t_riwayatalergiModel.init(sequelize, sequelizeInstance)
db.t_asesmenawaligd = t_asesmenawaligdModel.init(sequelize, sequelizeInstance)
db.t_skriningigd = t_skriningigdModel.init(sequelize, sequelizeInstance)
db.t_asesmenawaligd_fisik = t_asesmenawaligd_fisikModel.init(sequelize, sequelizeInstance)

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleid",
  otherKey: "userid"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userid",
  otherKey: "roleid"
});

db.t_notapelayananpasien.hasMany(db.t_pelayananpasien, { 
  foreignKey: "objectnotapelayananpasienfk" 
});

db.t_pelayananpasien.belongsTo(db.t_notapelayananpasien, {
  foreignKey: "objectnotapelayananpasienfk"
});

db.ROLES = ["user", "admin", "moderator"];

export default db;

/**
 * @typedef {typeof sequelizeInstance} SequelizeInstance
 */
