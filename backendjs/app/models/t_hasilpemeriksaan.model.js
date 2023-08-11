// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_hasilpemeriksaan = sequelize.define("t_hasilpemeriksaan", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        kodeexternal:{
            type: Sequelize.STRING
        },
        objectpelayananpasienfk:{
            type:Sequelize.CHAR(32)
        },
        objectdokterpelayananfk:{
            type: Sequelize.INTEGER
        },
        reportdisplay:{
            type:Sequelize.STRING
        },
        hasilpemeriksaan:{
            type:Sequelize.STRING
        },
        nofoto:{
            type:Sequelize.STRING
        },
        noorderpacs:{
            type:Sequelize.STRING
        },
        expertise:{
            type:Sequelize.STRING
        },
        tglpelayanan:{
            type:Sequelize.DATE
        },
        tglsampel: {
            type: Sequelize.DATE,
        },
        tglhasil: {
            type: Sequelize.DATE,
        },
        tglcetak: {
            type: Sequelize.DATE,
        },
        objectpegawaiinputfk: {
            type: Sequelize.INTEGER,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        objectpegawaiupdatefk: {
            type: Sequelize.INTEGER,
        },
        tglupdate: {
            type: Sequelize.DATE,
        },
    }, {
        tableName: "t_hasilpemeriksaan", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_hasilpemeriksaan;
};