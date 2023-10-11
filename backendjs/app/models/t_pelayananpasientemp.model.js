/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_pelayananpasientemp = sequelize.define("t_pelayananpasientemp", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectdaftarpasienfk: {
            type: Sequelize.CHAR(32),
        },
        objectprodukfk: {
            type: Sequelize.INTEGER,
        },
        harga: {
            type: Sequelize.FLOAT,
        },
        qty: {
            type: Sequelize.INTEGER,
        },
        total: {
            type: Sequelize.FLOAT,
        },
        objectkelasfk: {
            type: Sequelize.INTEGER,
        },
        objectunitfk: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "t_pelayananpasientemp",
        createdAt: false,
        updatedAt: false,
    });

    return t_pelayananpasientemp;
};
