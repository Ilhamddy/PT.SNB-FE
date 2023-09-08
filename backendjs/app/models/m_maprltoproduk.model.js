/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_maprltoproduk = sequelize.define("m_maprltoproduk", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        objectprodukfk:{
            type: Sequelize.INTEGER
        },
        objectmasterrlfk:{
            type: Sequelize.INTEGER
        },   
    }, {
        tableName: "m_maprltoproduk", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    })
    return m_maprltoproduk
}