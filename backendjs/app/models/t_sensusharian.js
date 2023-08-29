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
        objectantreanpemeriksaanfk:{
            type: Sequelize.CHAR(32)
        },
        objectunitfk:{
            type:Sequelize.INTEGER
        },
        objectdaftarpasienfk:{
            type: Sequelize.CHAR(32)
        },
        noregistrasi:{
            type:Sequelize.STRING
        },
        objectpasienfk:{
            type:Sequelize.INTEGER
        },
        objectdokterpemeriksafk:{
            type:Sequelize.CHAR(32)
        },
        tglinput:{
            type: Sequelize.DATE
        },
        objectkelasfk:{
            type:Sequelize.INTEGER
        }
    }, {
        tableName: "t_sensusharian", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_sensusharian;
};