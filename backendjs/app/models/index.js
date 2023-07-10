import config from "../config/db.config.js";
import  Sequelize from "sequelize";

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
import t_pelayananpasienM from "../models/t_pelayananpasien.js";
import t_pelayananpasiendetailM from "../models/t_pelayananpasiendetail.js";
import t_pelayananpasienpetugasM from "../models/t_pelayananpasienpetugas.js";
import t_rm_lokasidokumenM from "../models/t_rm_lokasidokumen.js";
import t_orderpelayananM from "../models/t_orderpelayanan.model.js";
import t_detailorderpelayananM from "../models/t_detailorderpelayanan.model.js";
import t_kepesertaanasuransiM from "../models/t_kepesertaanasuransi.js";
import t_notapelayananpasien from "./t_notapelayananpasien.js";

console.log("dialect", config.dialect)

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);
// master
db.m_pasien = m_pasienM(sequelize, Sequelize);
db.running_number = running_numberM(sequelize,Sequelize);
db.m_tempattidur = m_tempattidurM(sequelize,Sequelize);
// transaksi
db.t_daftarpasien = t_daftarpasienM(sequelize,Sequelize);
db.t_antreanpemeriksaan = t_antreanpemeriksaanM(sequelize,Sequelize);
db.t_emrpasien = t_emrpasienM(sequelize,Sequelize);
db.t_ttv = t_ttvM(sequelize,Sequelize);
db.t_cppt = t_cpptM(sequelize,Sequelize);
db.t_diagnosapasien = t_diagnosapasienM(sequelize,Sequelize);
db.t_diagnosatindakan = t_diagnosatindakanM(sequelize,Sequelize);
db.t_pelayananpasien = t_pelayananpasienM(sequelize,Sequelize);
db.t_pelayananpasiendetail = t_pelayananpasiendetailM(sequelize,Sequelize);
db.t_pelayananpasienpetugas = t_pelayananpasienpetugasM(sequelize,Sequelize);
db.t_rm_lokasidokumen = t_rm_lokasidokumenM(sequelize,Sequelize);
db.t_orderpelayanan = t_orderpelayananM(sequelize,Sequelize);
db.t_detailorderpelayanan = t_detailorderpelayananM(sequelize,Sequelize);
db.t_kepesertaanasuransi = t_kepesertaanasuransiM(sequelize,Sequelize);
db.t_notapelayananpasien = t_notapelayananpasien(sequelize,Sequelize);
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

db.ROLES = ["user", "admin", "moderator"];

export default db;