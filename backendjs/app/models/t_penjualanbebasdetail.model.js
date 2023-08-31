/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_penjualanbebasdetail = sequelize.define("t_penjualanbebasdetail", {
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
        reportdisplay: {
            type: Sequelize.STRING,
        },
        objectpenjualanbebasfk: {
            type: Sequelize.CHAR(32),
        },
        kode_r: {
            type: Sequelize.INTEGER,
        },
        kode_r_tambahan: {
            type: Sequelize.INTEGER,
        },
        objectprodukfk: {
            type: Sequelize.INTEGER,
        },
        qtyracikan: {
            type: Sequelize.FLOAT,
        },
        qtyjumlahracikan: {
            type: Sequelize.INTEGER,
        },
        qty: {
            type: Sequelize.INTEGER,
        },
        qtypembulatan: {
            type: Sequelize.FLOAT,
        },
        harga: {
            type: Sequelize.FLOAT,
        },
        total: {
            type: Sequelize.FLOAT,
        },
        objectsignafk: {
            type: Sequelize.INTEGER,
        },
        objectsediaanfk: {
            type: Sequelize.INTEGER,
        },
        objectketeranganresepfk: {
            type: Sequelize.INTEGER,
        },
        nobatch: {
            type: Sequelize.STRING,
        }
    }, {
        tableName: "t_penjualanbebasdetail",
        createdAt: false,
        updatedAt: false,
    });

    return t_penjualanbebasdetail;
};
