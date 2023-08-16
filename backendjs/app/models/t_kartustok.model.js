/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
export default (sequelize, Sequelize) => {
    const t_stokunit = sequelize.define("t_kartustok", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectunitfk: {
            type: Sequelize.INTEGER,
        },
        objectprodukfk: {
            type: Sequelize.INTEGER,
        },
        saldoawal: {
            type: Sequelize.DOUBLE,
        },
        masuk: {
            type: Sequelize.DOUBLE,
        },
        keluar: {
            type: Sequelize.DOUBLE,
        },
        saldoakhir: {
            type: Sequelize.DOUBLE,
        },
        keterangan: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.BOOLEAN,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        tglupdate: {
            type: Sequelize.DATE,
        },
        tabeltransaksi: {
            type: Sequelize.STRING,
        },
        norectransaksi: {
            type: Sequelize.STRING,
        },
        batch: {
            type: Sequelize.STRING,
        }
    }, {
        tableName: "t_kartustok",
        createdAt: false,
        updatedAt: false,
    });

    return t_stokunit;
};