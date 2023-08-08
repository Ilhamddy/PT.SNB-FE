// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_depositpasien = sequelize.define("t_depositpasien", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.SMALLINT,
        },
        objectdaftarpasienfk: {
            type: Sequelize.CHAR(32),
        },
        nominal: {
            type: Sequelize.FLOAT,
        },
        objectpegawaifk: {
            type: Sequelize.CHAR(32),
        },
        objectbuktibayarpasienfk: {
            type: Sequelize.CHAR(32),
        },
        tglinput: {
            type: Sequelize.DATEONLY,
        },
    }, {
        tableName: "t_depositpasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_depositpasien;
};