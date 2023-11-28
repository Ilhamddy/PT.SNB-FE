/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_setorankasir = sequelize.define("t_setorankasir", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.SMALLINT,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER,
        },
        objectshiftfk: {
            type: Sequelize.INTEGER,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        jumlahsetor: {
            type: Sequelize.REAL,
        },
        tglsetor: {
            type: Sequelize.DATE
        },
    }, {
        tableName: "t_setorankasir",
        createdAt: false,
        updatedAt: false,
    });

    return t_setorankasir;
};