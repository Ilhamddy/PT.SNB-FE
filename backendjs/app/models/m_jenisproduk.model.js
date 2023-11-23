/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_jenisproduk = sequelize.define("m_jenisproduk", {
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
        kodeexternal: {
            type: Sequelize.STRING
        },
        namaexternal: {
            type: Sequelize.STRING
        },
        reportdisplay: {
            type: Sequelize.STRING
        },
        objectinstalasifk: {
            type: Sequelize.INTEGER
        },
        objectjenisprodukheadfk: {
            type: Sequelize.INTEGER
        },
        objectkelompokprodukfk: {
            type: Sequelize.INTEGER
        },
        jenisproduk: {
            type: Sequelize.CHAR(255)
        },
        umurasset: {
            type: Sequelize.INTEGER
        },
        objectpenerimaankasirfk: {
            type: Sequelize.INTEGER
        },
    }, {
        tableName: "m_jenisproduk",
        createdAt: false,
        updatedAt: false,
    });

    return m_jenisproduk;
};