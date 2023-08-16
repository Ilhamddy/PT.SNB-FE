/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_tempattidur = sequelize.define("m_tempattidur", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        reportdisplay:{
            type: Sequelize.STRING
        },
        objectkamarfk:{
            type: Sequelize.INTEGER
        },
        objectstatusbedfk:{
            type: Sequelize.INTEGER
        },
    }, {
        tableName: "m_tempattidur", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_tempattidur;
};