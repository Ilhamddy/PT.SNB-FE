/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_buktibayarpasien = sequelize.define("t_buktibayarpasien", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        objectdaftarpasienfk: {
            type: Sequelize.INTEGER
        },
        totaltagihan: {
            type: Sequelize.FLOAT
        },
        deposit: {
            type: Sequelize.FLOAT
        },
        totalbayar: {
            type: Sequelize.FLOAT
        },
        no_bukti: {
            type: Sequelize.CHAR(15)
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        },
        objectnotapelayananpasienfk:{
            type: Sequelize.CHAR(32)
        },
        objectmetodebayarfk: {
            type: Sequelize.INTEGER
        },
        objectjenisnontunaifk: {
            type: Sequelize.INTEGER
        },
        objectrekeningrsfk: {
            type: Sequelize.INTEGER
        },
        pjpasien: {
            type: Sequelize.CHAR(40)
        },
        diskon: {
            type: Sequelize.FLOAT
        },
        klaim: {
            type: Sequelize.FLOAT
        },
        objectpiutangpasienfk: {
            type: Sequelize.CHAR(32)
        },
        keterangan: {
            type: Sequelize.STRING
        },
        tglinput: {
            type: Sequelize.DATE
        },
        objectpiutangpasienfk: {
            type: Sequelize.CHAR(32)
        }
    }, {
        tableName: "t_buktibayarpasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_buktibayarpasien;
};