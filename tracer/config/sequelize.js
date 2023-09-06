
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '103.149.177.11', // Your PostgreSQL server host
  port: 5432, // PostgreSQL port (default is 5432)
  username: 'postgres',
  password: '@b3rd1k4r1@',
  database: 'standart_v1',
});

module.exports = sequelize;