// eslint-disable-next-line max-lines-per-function
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
            type: Sequelize.DOUBLE,
        },
        hargasatuanterima: {
            type: Sequelize.DOUBLE,
        },
        subtotal: {
            type: Sequelize.DOUBLE,
        },
        diskonpersen: {
            type: Sequelize.DOUBLE,
        },
        diskon: {
            type: Sequelize.DOUBLE,
        },
        ppnpersen: {
            type: Sequelize.DOUBLE,
        },
        ppn: {
            type: Sequelize.DOUBLE,
        },
        total: {
            type: Sequelize.DOUBLE,
        },
        jumlahkonversi: {
            type: Sequelize.DOUBLE,
        }
    }, {
        tableName: "t_penerimaanbarangdetail", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_penerimaanbarangdetail;
};