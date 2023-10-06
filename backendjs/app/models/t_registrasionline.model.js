/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_registrasionline = sequelize.define("t_registrasionline",
    {
        norec: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN
        },
        nocmfk: {
            type: Sequelize.INTEGER
        },
        noreservasi: {
            type: Sequelize.CHAR
        },
        objectunitfk: {
            type: Sequelize.INTEGER
        },
        objectdokterfk: {
            type: Sequelize.INTEGER
        },
        tglrencana: {
            type: Sequelize.DATE
        },
        objectjadwaldokterfk: {
            type: Sequelize.INTEGER
        },
        tglinput: {
            type: Sequelize.DATE
        },
        objectdaftarpasienfk: {
            type: Sequelize.CHAR
        }
    },
    {
        tableName: "t_registrasionline",
        createdAt: false,
        updatedAt: false,
    })
    return t_registrasionline
}
