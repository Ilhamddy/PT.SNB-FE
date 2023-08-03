export default (sequelize, Sequelize) => {
    const m_nilainormallab = sequelize.define("m_nilainormallab", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        kodeexternal:{
            type: Sequelize.STRING
        },
        namaexternal:{
            type: Sequelize.STRING
        },
        reportdisplay:{
            type: Sequelize.STRING
        },
        objectpemeriksaanlabfk:{
            type: Sequelize.INTEGER
        },
        objectjeniskelaminfk:{
            type: Sequelize.INTEGER
        },
        objectdetailkelompokumurfk:{
            type:Sequelize.INTEGER
        },
        metodepemeriksaan:{
            type:Sequelize.STRING
        },
        nilaimin:{
            type:Sequelize.STRING
        },
        nilaimax:{
            type:Sequelize.STRING
        },
        nilaitext:{
            type:Sequelize.STRING
        },
        nilaikritis:{
            type:Sequelize.STRING
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
        },
        tipedata:{
            type:Sequelize.INTEGER
        }
    }, {
        tableName: "m_nilainormallab", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_nilainormallab;
};