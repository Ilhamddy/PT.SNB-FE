/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_stokunit = sequelize.define("t_stokunit", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
            defaultValue: true
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectunitfk: {
            type: Sequelize.INTEGER,
        },
        objectasalprodukfk: {
            type: Sequelize.INTEGER,
        },
        objectprodukfk: {
            type: Sequelize.INTEGER,
        },
        nobatch: {
            type: Sequelize.STRING,
        },
        ed: {
            type: Sequelize.DATE,
        },
        persendiskon: {
            type: Sequelize.FLOAT,
        },
        hargadiskon: {
            type: Sequelize.FLOAT,
        },
        harga: {
            type: Sequelize.DOUBLE,
        },
        qty: {
            type: Sequelize.DOUBLE,
        },
        objectpenerimaanbarangdetailfk: {
            type: Sequelize.STRING,
        },
        tglterima: {
            type: Sequelize.DATE,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        tglupdate: {
            type: Sequelize.DATE,
        }
    }, {
        tableName: "t_stokunit",
        createdAt: false,
        updatedAt: false,
    });

    return t_stokunit;
};