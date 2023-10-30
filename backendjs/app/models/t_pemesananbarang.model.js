/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_pemesananbarang = sequelize.define("t_pemesananbarang", {
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
        no_order: {
            type: Sequelize.STRING,
        },
        tglorder: {
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
        }
    }, {
        tableName: "t_pemesananbarang",
        createdAt: false,
        updatedAt: false,
    });

    return t_pemesananbarang;
};