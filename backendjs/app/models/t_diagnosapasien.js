/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_diagnosapasien = sequelize.define("t_diagnosapasien", {
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
        objectantreanpemeriksaanfk:{
            type: Sequelize.CHAR(32)
        },
        objecttipediagnosafk:{
            type: Sequelize.INTEGER
        },
        objecticdxfk:{
            type: Sequelize.INTEGER
        },
        objectjeniskasusfk:{
            type: Sequelize.INTEGER
        },
        keterangan:{
            type: Sequelize.STRING
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
        tglinput:{
            type: 'TIMESTAMP'
        },
    }, {
        tableName: "t_diagnosapasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_diagnosapasien;
};