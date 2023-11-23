/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_totalhargaprodukbykelas = sequelize.define("m_totalhargaprodukbykelas", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile: {
            type: Sequelize.SMALLINT,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        kodeexternal: {
            type: Sequelize.CHAR(15),
        },
        namaexternal: {
            type: Sequelize.CHAR(255),
        },
        reportdisplay: {
            type: Sequelize.CHAR(255)
        },
        objectasalprodukfk: {
            type: Sequelize.INTEGER
        },
        objectprodukfk: {
            type: Sequelize.INTEGER
        },
        objectjenistariffk: {
            type: Sequelize.INTEGER
        },
        objectkelasfk: {
            type: Sequelize.INTEGER
        },
        objectmatauangfk: {
            type: Sequelize.INTEGER
        },
        totalharga: {
            type: Sequelize.DOUBLE
        },
        qtycurrentstok: {
            type: Sequelize.DOUBLE
        },
        tglberlakuakhir: {
            type: Sequelize.DATE
        },
        tglberlakuawal: {
            type: Sequelize.DATE
        },
        tglkadaluarsalast: {
            type: Sequelize.DATE
        },
        objectjenispelayananfk: {
            type: Sequelize.INTEGER
        },
        objectsuratkeputusanfk: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "m_totalhargaprodukbykelas",
        createdAt: false,
        updatedAt: false,
    });

    return m_totalhargaprodukbykelas;
};