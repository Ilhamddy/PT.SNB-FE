export default (sequelize, Sequelize) => {
    const t_rm_lokasidokumen = sequelize.define("t_rm_lokasidokumen", {
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
        objectunitfk:{
            type: Sequelize.INTEGER
        },
        objectantreanpemeriksaanfk:{
            type:Sequelize.CHAR(32)
        },
        objectstatuskendalirmfk:{
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "t_rm_lokasidokumen", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_rm_lokasidokumen;
};