module.exports = (sequelize, Sequelize) => {
    const t_pelayananpasien = sequelize.define("t_pelayananpasien", {
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
        reportdisplay:{
            type:Sequelize.STRING
        },
        objectantreanpemeriksaanfk:{
            type: Sequelize.CHAR(32)
        },
        harga:{
            type: Sequelize.FLOAT
        },
        qty:{
            type: Sequelize.INTEGER
        },
        discount:{
            type:Sequelize.FLOAT
        },
        total:{
            type:Sequelize.FLOAT
        },
        tglinput:{
            type: 'TIMESTAMP'
        },
        objectstrukpelayananfk:{
            type:Sequelize.CHAR(32)
        },
        objectprodukfk:{
            type: Sequelize.INTEGER
        },
        objectpegawaifk:{
            type:Sequelize.INTEGER
        },
        objectkelasfk:{
            type:Sequelize.INTEGER
        }
    }, {
        tableName: "t_pelayananpasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_pelayananpasien;
};