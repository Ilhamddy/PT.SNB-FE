/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_returobatpasien = sequelize.define("t_returobatpasien",
    {
        norec: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        kdprofile: {
            type: Sequelize.SMALLINT
        },
        statusenabled: {
            type: Sequelize.BOOLEAN
        },
        objectverifresepfk: {
            type: Sequelize.STRING
        },
        qtyretur: {
            type: Sequelize.INTEGER
        },
        objectalasanreturfk: {
            type: Sequelize.INTEGER
        },
        tglinput: {
            type: Sequelize.DATE
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        }
    },
    {
        tableName: "t_returobatpasien",
        createdAt: false,
        updatedAt: false,
    })
    return t_returobatpasien
}
