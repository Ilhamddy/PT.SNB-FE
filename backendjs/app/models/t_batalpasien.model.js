/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_batalpasien = sequelize.define("t_batalpasien", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        objectdaftarpasienfk: {
            type: Sequelize.CHAR(32)
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        },
        alasanbatal: {
            type: Sequelize.STRING
        },
        objectbatalpasienfk: {
            type: Sequelize.INTEGER
        },
        tglbatal: {
            type: Sequelize.DATE
        }   
    }, {
        tableName: "t_batalpasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_batalpasien;
};