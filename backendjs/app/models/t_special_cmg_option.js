// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_special_cmg_option = sequelize.define("t_special_cmg_option", {
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
        code:{
            type: Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        type:{
            type: Sequelize.STRING
        },
        objectdaftarpasienfk:{
            type:Sequelize.CHAR(32)
        },
        tarif:{
            type:Sequelize.FLOAT
        }
    }, {
        tableName: "t_special_cmg_option", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_special_cmg_option;
};