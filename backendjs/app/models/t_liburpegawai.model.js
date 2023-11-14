/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_liburpegawai = sequelize.define("t_liburpegawai", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER,
        },
        tgllibur: {
            type: Sequelize.DATE,
        },
        objectunitfk: {
            type: Sequelize.INTEGER,
        },
        objectcutifk: {
            type: Sequelize.INTEGER,
        },
        alasan: {
            type: Sequelize.TEXT,
        },
        objectpegawaiinputfk: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "t_liburpegawai", 
        createdAt: false,
        updatedAt: false,
    })
    return t_liburpegawai;
}