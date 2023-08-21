/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_stokopnamedetail = sequelize.define("t_stokopnamedetail", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        objectstokopnamefk: {
            type: Sequelize.CHAR(32),
        },
        objectprodukfk: {
            type: Sequelize.INTEGER,
        },
        stokaplikasi: {
            type: Sequelize.FLOAT,
        },
        stokfisik: {
            type: Sequelize.FLOAT,
        },
        selisih: {
            type: Sequelize.FLOAT,
        },
        keterangan: {
            type: Sequelize.STRING,
        },
        tglupdate: {
            type: Sequelize.DATE,
        },
        objectpegawaiinputfk: {
            type: Sequelize.INTEGER,
        },
        objectpegawaiupdatefk: {
            type: Sequelize.INTEGER,
        }
    }, {
        tableName: "t_stokopnamedetail",
        createdAt: false,
        updatedAt: false,
    });

    return t_stokopnamedetail;
};