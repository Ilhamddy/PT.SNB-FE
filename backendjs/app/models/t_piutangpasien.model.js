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
        totaltagihan: {
            type: Sequelize.FLOAT
        },
        totalklaim: {
            type: Sequelize.FLOAT
        },
        totalbayar: {
            type: Sequelize.FLOAT
        },
        sisatagihan: {
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
