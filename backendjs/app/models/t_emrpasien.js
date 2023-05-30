module.exports = (sequelize, Sequelize) => {
    const t_emrpasien = sequelize.define("t_emrpasien", {
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
        label:{
            type: Sequelize.STRING
        },
        idlabel:{
            type: Sequelize.INTEGER
        },
        objectdaftarpasienfk:{
            type: Sequelize.INTEGER
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
        isedit:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        objectemrfk:{
            type: Sequelize.INTEGER
        },
        tglisi:{
            type: 'TIMESTAMP'
        },
    }, {
        tableName: "t_emrpasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_emrpasien;
};