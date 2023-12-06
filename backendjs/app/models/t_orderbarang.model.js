/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_orderbarang = sequelize.define("t_orderbarang", {
        norec: {
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        noorder:{
            type: Sequelize.STRING,
        },
        objectunitasalfk: {
            type: Sequelize.INTEGER,
        },
        objectunittujuanfk: {
            type: Sequelize.INTEGER,
        },
        objectjenisorderbarangfk: {
            type: Sequelize.INTEGER,
        },
        keterangan: {
            type: Sequelize.STRING,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER,
        },
        objectstatusveriffk: {
            type: Sequelize.INTEGER,
        },
        islogistik: {
            type: Sequelize.BOOLEAN
        }
    }, {
        tableName: "t_orderbarang", 
        createdAt: false,
        updatedAt: false,
    })
    console.log(t_orderbarang.tableName)
    return t_orderbarang;
}