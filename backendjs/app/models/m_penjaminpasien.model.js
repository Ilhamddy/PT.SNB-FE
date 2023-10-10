/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_penjaminpasien = sequelize.define("m_penjaminpasien", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile:{
            type:Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        nocmfk: {
            type: Sequelize.INTEGER
        },
        objectrekananfk: {
            type: Sequelize.INTEGER
        },
        nokartu: {
            type: Sequelize.STRING
        },
    }, {
        tableName: "m_penjaminpasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_penjaminpasien;
};