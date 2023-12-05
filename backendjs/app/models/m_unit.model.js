/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_unit = sequelize.define("m_unit", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile: {
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        kodeexternal: {
            type: Sequelize.STRING
        },
        namaexternal: {
            type: Sequelize.STRING
        },
        reportdisplay:{
            type: Sequelize.STRING
        },
        objectinstalasifk:{
            type: Sequelize.INTEGER
        },
        namaunit:{
            type: Sequelize.INTEGER
        },
        ihs_id:{
            type: Sequelize.STRING
        }
    }, {
        tableName: "m_unit",
        createdAt: false,
        updatedAt: false,
    });

    return m_unit;
};