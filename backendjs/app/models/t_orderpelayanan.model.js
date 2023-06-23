module.exports = (sequelize, Sequelize) => {
    const t_orderpelayanan = sequelize.define("t_orderpelayanan", {
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
        objectjenisorderfk:{
            type: Sequelize.INTEGER
        },
        nomororder:{
            type:Sequelize.STRING
        },
        objectantreanpemeriksaanfk:{
            type:Sequelize.CHAR(32)
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
        tglinput:{
            type: 'TIMESTAMP'
        },
        objectunitasalfk:{
            type: Sequelize.INTEGER
        },
        objectstatusveriffk:{
            type:Sequelize.INTEGER
        },
        keterangan:{
            type:Sequelize.STRING
        }
    }, {
        tableName: "t_orderpelayanan", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_orderpelayanan;
};