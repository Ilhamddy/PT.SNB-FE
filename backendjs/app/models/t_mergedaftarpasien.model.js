/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_mergedaftarpasien = sequelize.define("t_mergedaftarpasien", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        objectdaftarpasienasalfk: {
            type: Sequelize.CHAR(32)
        },
        objectdaftarpasientujuanfk: {
            type: Sequelize.CHAR(32)
        },
        objectpegawaifk: {
            type: Sequelize.CHAR(32)
        },
        alasan: {
            type: Sequelize.CHAR(50)
        },
        tglinput: {
            type: Sequelize.CHAR(50)
        }

    }, {
        tableName: "t_mergedaftarpasien", 
        createdAt: false,
        updatedAt: false,
    });

    return t_mergedaftarpasien;
};