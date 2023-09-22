/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_antreanloket = sequelize.define("t_antreanloket",
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
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        reportdisplay: {
            type: Sequelize.STRING
        },
        nocmfk: {
            type: Sequelize.INTEGER
        },
        norujukan: {
            type: Sequelize.STRING
        },
        objectunitfk: {
            type: Sequelize.INTEGER
        },
        objectdpjpfk: {
            type: Sequelize.INTEGER
        },
        objectjenisantreanfk: {
            type: Sequelize.INTEGER
        },
        noantrean: {
            type: Sequelize.SMALLINT
        },
        noantreantext: {
            type: Sequelize.STRING
        },
        tglinput: {
            type: Sequelize.DATE
        },
        ispanggil: {
            type: Sequelize.SMALLINT
        },
        tglpanggil: {
            type: Sequelize.DATE
        },
        objectloketfk: {
            type: Sequelize.INTEGER
        }
    },
    {
        tableName: "t_antreanloket",
        createdAt: false,
        updatedAt: false,
    })
    return t_antreanloket
}
