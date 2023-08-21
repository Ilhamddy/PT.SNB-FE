import config from "../config/db.config.js";
import sequelizeInstance from "sequelize"
import {Sequelize} from "sequelize";

import userModel from "../models/user.model.js"
import roleModel from "../models/role.model.js"
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
db.role = roleModel(sequelize, sequelizeInstance);
// master
db.m_pasien = m_pasienM(sequelize, sequelizeInstance);
db.running_number = running_numberM(sequelize,sequelizeInstance);
db.m_tempattidur = m_tempattidurM(sequelize,sequelizeInstance);
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
