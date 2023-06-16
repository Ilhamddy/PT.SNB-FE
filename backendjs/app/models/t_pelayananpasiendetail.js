module.exports = (sequelize, Sequelize) => {
    const t_pelayananpasiendetail = sequelize.define("t_pelayananpasiendetail", {
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
        objectpelayananpasienfk:{
            type: Sequelize.CHAR(32)
        },
        objectkomponenprodukfk:{
            type:Sequelize.CHAR(32)
        },
        harga:{
            type: Sequelize.FLOAT
        }
    }, {
        tableName: "t_pelayananpasiendetail", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_pelayananpasiendetail;
};