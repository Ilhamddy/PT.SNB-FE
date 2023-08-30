/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_penjualanbebas = sequelize.define("t_penjualanbebas", {
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
            type: Sequelize.BOOLEAN
        },
        reportdisplay: {
            type: Sequelize.STRING
        },
        objectpasienfk: {
            type: Sequelize.INTEGER
        },
        namapasien: {
            type: Sequelize.STRING
        },
        tgllahir: {
            type: Sequelize.DATE
        },
        notelepon: {
            type: Sequelize.STRING
        },
        alamat: {
            type: Sequelize.STRING
        },
        tglresep: {
            type: Sequelize.DATE
        },
        objectjenisresepfk: {
            type: Sequelize.INTEGER
        },
        objectunitfk: {
            type: Sequelize.INTEGER
        },
        no_resep: {
            type: Sequelize.STRING
        },
        namapenulis: {
            type: Sequelize.STRING
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        },
        catatan: {
            type: Sequelize.STRING
        },
        tglinput: {
            type: Sequelize.DATE
        }
    }, {
        tableName: "t_penjualanbebas", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_penjualanbebas;
};