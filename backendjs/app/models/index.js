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
db.m_pasien = require("../models/m_pasien.model.js")(sequelize, Sequelize);
db.running_number = require("../models/running_number.model.js")(sequelize,Sequelize);
db.t_daftarpasien = require("../models/t_daftarpasien.model.js")(sequelize,Sequelize);
db.t_antreanpemeriksaan = require("../models/t_antreanpemeriksaan.model.js")(sequelize,Sequelize);

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