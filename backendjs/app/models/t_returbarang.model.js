/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_returbarang = sequelize.define("t_returbarang", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectpenerimaanbarangfk: {
            type: Sequelize.CHAR(32),
        },
        tglretur: {
            type: Sequelize.DATE,
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER,
        },
        tglinput: {
            type: Sequelize.DATE
        },
        tglupdate: {
            type: Sequelize.DATE
        },
        islogistik: {
            type: Sequelize.BOOLEAN
        },
        noretur: {
            type: Sequelize.CHAR(40)
        }
    }, {
        tableName: "t_returbarang", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_returbarang;
};