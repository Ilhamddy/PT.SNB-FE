/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_orderresepdetail = sequelize.define("t_orderresepdetail", {
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
        kodeexternal: {
            type: Sequelize.STRING,
        },
        namaexternal: {
            type: Sequelize.STRING,
        },
        reportdisplay: {
            type: Sequelize.STRING,
        },
        objectorderresepfk: {
            type: Sequelize.CHAR(32),
        },
        kode_r: {
            type: Sequelize.INTEGER,
        },
        objectprodukfk: {
            type: Sequelize.INTEGER,
        },
        qty: {
            type: Sequelize.INTEGER,
        },
        objectsediaanfk: {
            type: Sequelize.INTEGER,
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
        objectketeranganresepfk: {
            type: Sequelize.INTEGER,
        },
        qtyracikan: {
            type: Sequelize.FLOAT,
        },
        qtypembulatan: {
            type: Sequelize.FLOAT,
        },
        kode_r_tambahan: {
            type: Sequelize.INTEGER,
        },
        qtyjumlahracikan: {
            type: Sequelize.INTEGER,
        },
        nobatch: {
            type: Sequelize.STRING,
        }
    }, {
        tableName: "t_orderresepdetail",
        createdAt: false,
        updatedAt: false,
    });

    return t_orderresepdetail;
};
