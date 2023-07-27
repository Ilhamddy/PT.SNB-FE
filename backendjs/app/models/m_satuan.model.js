export default (sequelize, Sequelize) => {
    const m_satuan = sequelize.define("m_satuan", {
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
        satuan: {
            type: Sequelize.INTEGER
        },
        objectjenissatuanfk: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "m_satuan",
        createdAt: false,
        updatedAt: false,
    });

    return m_satuan;
};