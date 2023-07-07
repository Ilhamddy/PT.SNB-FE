export default (sequelize, Sequelize) => {
    const t_orderpelayanan = sequelize.define("t_notapelayananpasien", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
            defaultValue: true
        },
        objectdaftarpasienfk:{
            type: Sequelize.CHAR(32),
        },
        total:{
            type:Sequelize.FLOAT
        },
        no_nota:{
            type:Sequelize.CHAR(15)
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
        tglinput:{
            type: 'TIMESTAMP'
        }
    }, {
        tableName: "t_notapelayananpasien", 
        createdAt: false,
        updatedAt: false,
    });

    return t_orderpelayanan;
};