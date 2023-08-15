/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_orderbarangdetail = sequelize.define("t_orderbarangdetail", {
        norec: {
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectorderbarangfk:{
            type: Sequelize.CHAR(32),
        },
        objectprodukfk:{
            type: Sequelize.INTEGER,
        },
        qty:{
            type: Sequelize.FLOAT,
        },
        jumlah:{
            type: Sequelize.DOUBLE,
        },
        objectsatuanfk: {
            type: Sequelize.INTEGER,
        }
    }, {
        tableName: "t_orderbarangdetail", 
        createdAt: false,
        updatedAt: false,
    })
    return t_orderbarangdetail;
}