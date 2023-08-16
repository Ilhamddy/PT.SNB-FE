/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_kemasanproduk = sequelize.define("m_kemasanproduk", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile: {
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN
        },
        barcode: {
            type: Sequelize.STRING
        },
        objectprodukfk: {
            type: Sequelize.INTEGER
        },
        objectsatuanbesarfk: {
            type: Sequelize.INTEGER
        },
        objectsatuankecilfk: {
            type: Sequelize.INTEGER
        },
        nilaikonversi: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "m_kemasanproduk", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });
    return m_kemasanproduk;
}