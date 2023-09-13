const t_daftarpasienModel = require('./t_daftarpasien.model');
const { Sequelize } = require('sequelize');
const { dbConfig } = require('../../config/pool.config');
const sequelizeInstance = require("sequelize")

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    timezone: '+07:00',
    logging: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
  }
);

const db = {};

db.Sequelize = sequelizeInstance;
db.sequelize = sequelize;

db.t_daftarpasien = t_daftarpasienModel(sequelize, sequelizeInstance)

module.exports = db;

/**
 * @typedef {typeof sequelizeInstance} SequelizeInstance
 */
