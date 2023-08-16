/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_diagnosatindakan = sequelize.define("t_diagnosatindakan", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        objectantreanpemeriksaanfk:{
            type: Sequelize.CHAR(32)
        },
        objecticdixfk:{
            type: Sequelize.INTEGER
        },
        keterangan:{
            type: Sequelize.STRING
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
        tglinput:{
            type: 'TIMESTAMP'
        },
        qty:{
            type: Sequelize.INTEGER
        },
    }, {
        tableName: "t_diagnosatindakan", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_diagnosatindakan;
};