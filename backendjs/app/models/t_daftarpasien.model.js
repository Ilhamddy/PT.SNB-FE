export default (sequelize, Sequelize) => {
    const t_daftarpasien = sequelize.define("t_daftarpasien", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
          },
        nocmfk:{
            type: Sequelize.INTEGER
        },
        noregistrasi:{
            type: Sequelize.STRING
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            // defaultValue: true
        },
        tglregistrasi:{
            type: 'TIMESTAMP'
        },
        objectunitlastfk:{
            type: Sequelize.INTEGER
        },
        objectdokterpemeriksafk:{
            type: Sequelize.INTEGER
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
        objectkelasfk:{
          type: Sequelize.INTEGER  
        },
        objectjenispenjaminfk:{
            type: Sequelize.INTEGER
        },
        tglpulang:{
            type: 'TIMESTAMP'
        },
        objectasalrujukanfk:{
            type: Sequelize.INTEGER
        },
        objectpenjaminfk:{
            type: Sequelize.INTEGER
        },
        objectpenjamin2fk:{
            type: Sequelize.INTEGER
        },
        objectpenjamin3fk:{
            type: Sequelize.INTEGER
        },
        objectinstalasifk:{
            type:Sequelize.INTEGER
        },
        objectpjpasienfk:{
            type:Sequelize.INTEGER
        },
        objectstatuspulangfk:{
            type:Sequelize.INTEGER
        }
    }, {
        tableName: "t_daftarpasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_daftarpasien;
};