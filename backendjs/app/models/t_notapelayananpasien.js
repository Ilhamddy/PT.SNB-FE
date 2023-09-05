import t_pelayananpasienModel from "./t_pelayananpasien.model";

/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_notapelayananpasien = sequelize.define("t_notapelayananpasien", {
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
        kdprofile: {
            type: Sequelize.INTEGER,
            defaultValue: true
        },
        objectdaftarpasienfk:{
            type: Sequelize.CHAR(32),
        },
        total:{
            type:Sequelize.FLOAT
        },
        no_nota:{
            type:Sequelize.CHAR(15)
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
        tglinput:{
            type: 'TIMESTAMP'
        },
        keterangan:{
            type: Sequelize.STRING
        },
        objectbuktibayarfk: {
            type: Sequelize.CHAR(32),
        }
    }, {
        tableName: "t_notapelayananpasien", 
        createdAt: false,
        updatedAt: false,
    });
    return t_notapelayananpasien;
};