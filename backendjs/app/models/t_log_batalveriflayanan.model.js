/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_buktibayarpasien = sequelize.define("t_log_batalveriflayanan", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        },
        tglbatal:{
            type: Sequelize.DATE
        },
        alasanbatal:{
            type: Sequelize.STRING
        },
        objectnotapelayananpasienfk: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: "t_log_batalveriflayanan", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_buktibayarpasien;
};