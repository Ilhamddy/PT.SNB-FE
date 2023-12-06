/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_kirimbarang = sequelize.define("t_kirimbarang", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectorderbarangfk: {
            type: Sequelize.CHAR(32),
        },
        nopengiriman: {
            type: Sequelize.STRING,
        },
        objectunitpengirimfk: {
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
        isverif: {
            type: Sequelize.BOOLEAN
        },
        tglverif: {
            type: Sequelize.DATE
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        },
        islogistik: {
            type: Sequelize.BOOLEAN
        },
        istolak: {
            type: Sequelize.BOOLEAN
        },
        alasantolak: {
            type: Sequelize.CHAR(50)
        }
    }, {
        tableName: "t_kirimbarang", 
        createdAt: false,
        updatedAt: false,
    })
    return t_kirimbarang;
}