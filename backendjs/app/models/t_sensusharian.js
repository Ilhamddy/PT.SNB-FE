/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_sensusharian = sequelize.define("t_sensusharian", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        code:{
            type: Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        type:{
            type: Sequelize.STRING
        },
        objectdaftarpasienfk:{
            type:Sequelize.CHAR(32)
        },
        tarif:{
            type:Sequelize.FLOAT
        }
    }, {
        tableName: "t_sensusharian", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_sensusharian;
};