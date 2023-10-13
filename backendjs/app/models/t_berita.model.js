/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_batalpasien = sequelize.define("t_berita", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.INTEGER
        },
        gambar: {
            type: Sequelize.STRING
        },
        judul: {
            type: Sequelize.STRING
        },
        isi: {
            type: Sequelize.STRING
        },
        tglposting: {
            type: Sequelize.DATE
        },
        tglawal: {
            type: Sequelize.DATE
        },
        tglakhir: {
            type: Sequelize.DATE
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        },
    }, {
        tableName: "t_berita", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_batalpasien;
};