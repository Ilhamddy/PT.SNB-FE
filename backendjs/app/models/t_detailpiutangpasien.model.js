export default (sequelize, Sequelize) => {
    const t_detailpiutangpasien = sequelize.define("t_detailpiutangpasien",
    {
        norec: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN
        },
        objectpiutangpasienfk: {
            type: Sequelize.CHAR(32)
        },
        objectpenjaminfk: {
            type: Sequelize.INTEGER
        },
        nominalpiutang: {
            type: Sequelize.DOUBLE
        },
        tglinput: {
            type: Sequelize.DATE
        },
        tglupdate: {
            type: Sequelize.DATE
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        },
    },
    {
        tableName: "t_detailpiutangpasien",
        createdAt: false,
        updatedAt: false,
    })
    return t_detailpiutangpasien
}