/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_orderresep = sequelize.define("t_orderresep", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        kodeexternal: {
            type: Sequelize.STRING,
        },
        namaexternal: {
            type: Sequelize.STRING,
        },
        reportdisplay: {
            type: Sequelize.STRING,
        },
        objectantreanpemeriksaanfk: {
            type: Sequelize.CHAR(32),
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        objectunitasalfk: {
            type: Sequelize.INTEGER,
        },
        no_order: {
            type: Sequelize.STRING,
        },
        objectdepotujuanfk: {
            type: Sequelize.INTEGER,
        },
        no_resep: {
            type: Sequelize.STRING,
        },
        tglverif: {
            type: Sequelize.DATE,
        },
        ihs_id: {
            type: Sequelize.STRING(50),
        }
    }, {
        tableName: "t_orderresep",
        createdAt: false,
        updatedAt: false,
    });

    return t_orderresep;
};