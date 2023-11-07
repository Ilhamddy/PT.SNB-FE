/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_penerimaanbarang = sequelize.define("t_penerimaanbarang", {
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
        no_terima: {
            type: Sequelize.STRING,
        },
        no_order: {
            type: Sequelize.STRING,
        },
        tglorder: {
            type: Sequelize.DATE,
        },
        tglterima: {
            type: Sequelize.DATE,
        },
        tgljatuhtempo: {
            type: Sequelize.DATE,
        },
        objectrekananfk: {
            type: Sequelize.INTEGER,
        },
        objectunitfk: {
            type: Sequelize.INTEGER,
        },
        objectasalprodukfk: {
            type: Sequelize.INTEGER,
        },
        keterangan: {
            type: Sequelize.CHAR(100),
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        tglupdate: {
            type: Sequelize.DATE,
        },
        objectpemesananbarangfk: {
            type: Sequelize.CHAR(32),
        },
        islogistik: {
            type: Sequelize.BOOLEAN,
        },
    }, {
        tableName: "t_penerimaanbarang", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_penerimaanbarang;
};