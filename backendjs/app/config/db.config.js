
module.exports = {
    HOST: "103.149.177.11",
    USER: "postgres",
    PASSWORD: "@b3rd1k4r1@",
    DB: "standart_v1",
    dialect: "postgres",
    PORT: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
