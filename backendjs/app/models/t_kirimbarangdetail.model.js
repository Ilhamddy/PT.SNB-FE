/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_kirimbarangdetail = sequelize.define("t_kirimbarangdetail", {
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
        objectdistribusibarangfk: {
            type: Sequelize.CHAR(32),
        },
        objectorderbarangdetailfk: {
            type: Sequelize.CHAR(32),
        },
        objectprodukfk: {
            type: Sequelize.INTEGER,
        },
        nobatch: {
            type: Sequelize.STRING,
        },
        qty: {
            type: Sequelize.INTEGER,
        },
        jumlah: {
            type: Sequelize.DOUBLE,
        },
        objectsatuanfk: {
            type: Sequelize.INTEGER,
        }
    }, {
        tableName: "t_kirimbarangdetail", 
        createdAt: false,
        updatedAt: false,
    })
    return t_kirimbarangdetail;
}