// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_piutangpasien = sequelize.define("t_piutangpasien",
    {
        norec: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN
        },
        objectdaftarpasienfk: {
            type: Sequelize.CHAR(32)
        },
        objectpenjaminfk: {
            type: Sequelize.INTEGER
        },
        objectnotapelayananpasienfk: {
            type: Sequelize.CHAR(32)
        },
        totalpiutang: {
            type: Sequelize.FLOAT
        },
        totalbayar: {
            type: Sequelize.FLOAT
        },
        sisapiutang: {
            type: Sequelize.FLOAT
        },
        tglinput: {
            type: Sequelize.DATE
        },
        tglupdate: {
            type: Sequelize.DATE
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        }
    },
    {
        tableName: "t_piutangpasien",
        createdAt: false,
        updatedAt: false,
    })
    return t_piutangpasien
}
