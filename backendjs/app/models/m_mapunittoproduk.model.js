/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_mapunittoproduk = sequelize.define("m_mapunittoproduk", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        kodeexternal: {
            type: Sequelize.CHAR(15),
        },
        namaexternal:{
            type: Sequelize.CHAR(50)
        },
        reportdisplay :{
            type: Sequelize.CHAR(50)
        },
        objectprodukfk: {
            type: Sequelize.INTEGER
        },
        objectunitfk: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.CHAR(255)
        }
    }, {
        tableName: "m_mapunittoproduk",
        createdAt: false,
        updatedAt: false,
    })
    return m_mapunittoproduk
}