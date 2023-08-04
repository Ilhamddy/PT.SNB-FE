// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_pemeriksaanlab = sequelize.define("m_pemeriksaanlab", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile:{
            type:Sequelize.INTEGER
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
        objectprodukfk:{
            type: Sequelize.INTEGER
        },
        objectsatuanfk:{
            type: Sequelize.INTEGER
        },
        objectindukfk:{
            type: Sequelize.INTEGER
        },
        level:{
            type: Sequelize.INTEGER
        },
        urutan:{
            type: Sequelize.INTEGER
        },
        objectkelompokumurfk:{
            type: Sequelize.INTEGER
        },
        tglinput:{
            type: 'TIMESTAMP'
        },
        tglupdate:{
            type: 'TIMESTAMP'
        },
        objectpegawaiinputfk:{
            type: Sequelize.INTEGER
        },
        objectpegawaiupdatefk:{
            type:Sequelize.INTEGER
        },
        id_temp:{
            type: Sequelize.INTEGER
        },
    }, {
        tableName: "m_pemeriksaanlab", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_pemeriksaanlab;
};