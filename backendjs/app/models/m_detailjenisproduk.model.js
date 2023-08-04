// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_detailjenisproduk = sequelize.define("m_detailjenisproduk", {
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
        objectinstalasifk: {
            type: Sequelize.INTEGER
        },
        objectjenisprodukfk: {
            type: Sequelize.INTEGER
        },
        detailjenisproduk: {
            type: Sequelize.STRING
        },
        persenhargacito: {
            type: Sequelize.FLOAT
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
        tableName: "m_detailjenisproduk",
        createdAt: false,
        updatedAt: false,
    });

    return m_detailjenisproduk;
};