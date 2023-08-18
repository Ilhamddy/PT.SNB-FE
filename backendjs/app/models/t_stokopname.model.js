/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_stokopname = sequelize.define("t_stokopname", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
            defaultValue: true
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectunitfk: {
            type: Sequelize.INTEGER,
        },
        tglawal: {
            type: Sequelize.DATE,
        },
        tglakhir: {
            type: Sequelize.DATE,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        tglselesai: {
            type: Sequelize.DATE,
        },
        statusselesai: {
            type: Sequelize.BOOLEAN,
        },
        objectpegawaiinputfk: {
            type: Sequelize.INTEGER,
        },
        objectpegawaiupdatefk: {
            type: Sequelize.INTEGER,
        }
    }, {
        tableName: "t_stokopname",
        createdAt: false,
        updatedAt: false,
    });

    return t_stokopname;
};