/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_sediaan = sequelize.define("m_sediaan", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile: {
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN
        },
        kodeexternal: {
            type: Sequelize.STRING
        },
        namaexternal: {
            type: Sequelize.STRING
        },
        reportdisplay: {
            type: Sequelize.STRING
        },
        sediaan: {
            type: Sequelize.INTEGER
        },
        tglinput: {
            type: Sequelize.DATE
        },
        tglupdate: {
            type: Sequelize.DATE
        },
        objectpegawaiinputfk: {
            type: Sequelize.INTEGER
        },
        objectpegawaiupdatefk: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "m_sediaan",
        createdAt: false,
        updatedAt: false,
    });

    return m_sediaan;
};