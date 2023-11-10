/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_returbarangdetail = sequelize.define("t_returbarangdetail", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectreturbarangfk: {
            type: Sequelize.CHAR(32),
        },
        objectpenerimaanbarangdetailfk: {
            type: Sequelize.CHAR(32)
        },
        jumlah: {
            type: Sequelize.INTEGER,
        },
        subtotal: {
            type: Sequelize.REAL,
        },
        diskonpersen: {
            type: Sequelize.REAL
        },
        diskon: {
            type: Sequelize.REAL
        },
        ppnpersen: {
            type: Sequelize.REAL
        },
        ppn: {
            type: Sequelize.REAL
        },
        total: {
            type: Sequelize.REAL
        },
        alasanretur: {
            type: Sequelize.TEXT
        }
       
    }, {
        tableName: "t_returbarangdetail", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_returbarangdetail;
};