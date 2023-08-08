// eslint-disable-next-line max-lines-per-function
/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
export default (sequelize, Sequelize) => {
    const t_penerimaanbarangdetail = sequelize.define("t_penerimaanbarangdetail", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectpenerimaanbarangfk: {
            type: Sequelize.CHAR(32),
        },
        objectprodukfk: {
            type: Sequelize.INTEGER,
        },
        ed: {
            type: Sequelize.DATE,
        },
        nobatch: {
            type: Sequelize.STRING,
        },
        objectsatuanfk: {
            type: Sequelize.INTEGER,
        },
        jumlah: {
            type: Sequelize.INTEGER,
        },
        hargasatuankecil: {
            type: Sequelize.FLOAT,
        },
        hargasatuanterima: {
            type: Sequelize.FLOAT,
        },
        subtotal: {
            type: Sequelize.FLOAT,
        },
        diskonpersen: {
            type: Sequelize.FLOAT,
        },
        diskon: {
            type: Sequelize.FLOAT,
        },
        ppnpersen: {
            type: Sequelize.FLOAT,
        },
        ppn: {
            type: Sequelize.FLOAT,
        },
        total: {
            type: Sequelize.FLOAT,
        },
        jumlahkonversi: {
            type: Sequelize.FLOAT,
        }
    }, {
        tableName: "t_penerimaanbarangdetail", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_penerimaanbarangdetail;
};