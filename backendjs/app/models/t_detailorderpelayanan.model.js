module.exports = (sequelize, Sequelize) => {
    const t_detailorderpelayanan = sequelize.define("t_detailorderpelayanan", {
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
        objectorderpelayananfk:{
            type:Sequelize.CHAR(32)
        },
        objectprodukfk:{
            type: Sequelize.INTEGER
        },
        objectkelasfk:{
            type: Sequelize.INTEGER
        },
        harga:{
            type:Sequelize.FLOAT
        },
        objectstatusveriffk:{
            type:Sequelize.INTEGER
        },
        objectpelayananpasienfk:{
            type: Sequelize.CHAR(32)
        },
        qty:{
            type:Sequelize.INTEGER
        }
    }, {
        tableName: "t_detailorderpelayanan", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_detailorderpelayanan;
};