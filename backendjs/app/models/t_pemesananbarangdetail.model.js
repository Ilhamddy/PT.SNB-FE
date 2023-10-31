/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_pemesananbarangdetail = sequelize.define("t_pemesananbarangdetail", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectpemesananbarangfk: {
            type: Sequelize.CHAR(32),
        },
        objectprodukfk: {
            type: Sequelize.INTEGER,
        },
        objectsatuanfk: {
            type: Sequelize.INTEGER,
        },
        jumlah: {
            type: Sequelize.INTEGER,
        },
        hargasatuankecil: {
            type: Sequelize.REAL,
        },
        hargasatuanterima: {
            type: Sequelize.REAL,
        },
        subtotal: {
            type: Sequelize.REAL,
        },
        diskonpersen: {
            type: Sequelize.REAL,
        },
        diskon: {
            type: Sequelize.REAL,
        },
        ppnpersen: {
            type: Sequelize.REAL,
        },
        ppn: {
            type: Sequelize.REAL,
        },
        total: {
            type: Sequelize.REAL,
        },
        jumlahkonversi: {
            type: Sequelize.REAL,
        },
        jumlahkonversiterima: {
            type: Sequelize.REAL,
        },
    }, {
        tableName: "t_pemesananbarangdetail",
        createdAt: false,
        updatedAt: false,
    });

    return t_pemesananbarangdetail;
};