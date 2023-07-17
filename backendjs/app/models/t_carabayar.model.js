export default (sequelize, Sequelize) => {
    const t_carabayar = sequelize.define("t_carabayar", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        objectbuktibayarpasienfk: {
            type: Sequelize.CHAR(32)
        },
        objectmetodebayarfk: {
            type: Sequelize.INTEGER
        },
        objectjenisnontunaifk: {
            type: Sequelize.INTEGER
        },
        objectrekeningrsfk: {
            type: Sequelize.INTEGER
        },
        totalbayar: {
            type: Sequelize.FLOAT
        },
        objectpiutangpasienfk: {
            type: Sequelize.CHAR(32)
        },
        pjpasien: {
            type: Sequelize.STRING
        },
        approvalcode: {
            type: Sequelize.STRING
        }        
    }, {
        tableName: "t_carabayar", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_carabayar;
};