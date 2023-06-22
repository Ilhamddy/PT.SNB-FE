const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
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

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
// master
db.m_pasien = require("../models/m_pasien.model.js")(sequelize, Sequelize);
db.running_number = require("../models/running_number.model.js")(sequelize,Sequelize);
db.m_tempattidur = require("../models/m_tempattidur.js")(sequelize,Sequelize);
// transaksi
db.t_daftarpasien = require("../models/t_daftarpasien.model.js")(sequelize,Sequelize);
db.t_antreanpemeriksaan = require("../models/t_antreanpemeriksaan.model.js")(sequelize,Sequelize);
db.t_emrpasien = require("../models/t_emrpasien.js")(sequelize,Sequelize);
db.t_ttv = require("../models/t_ttv.js")(sequelize,Sequelize);
db.t_cppt = require("../models/t_cppt.js")(sequelize,Sequelize);
db.t_diagnosapasien = require("../models/t_diagnosapasien.js")(sequelize,Sequelize);
db.t_diagnosatindakan = require("../models/t_diagnosatindakan.js")(sequelize,Sequelize);
db.t_pelayananpasien = require("../models/t_pelayananpasien.js")(sequelize,Sequelize);
db.t_pelayananpasiendetail = require("../models/t_pelayananpasiendetail.js")(sequelize,Sequelize);
db.t_pelayananpasienpetugas = require("../models/t_pelayananpasienpetugas.js")(sequelize,Sequelize);
db.t_rm_lokasidokumen = require("../models/t_rm_lokasidokumen.js")(sequelize,Sequelize);
db.t_orderpelayanan = require("../models/t_orderpelayanan.model.js")(sequelize,Sequelize);
db.t_detailorderpelayanan = require("../models/t_detailorderpelayanan.model.js")(sequelize,Sequelize);

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

module.exports = db;