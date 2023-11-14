/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_bedharian = sequelize.define("t_bedharian", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        objectunitfk:{
            type:Sequelize.INTEGER
        },
        jumlahbed:{
            type: Sequelize.INTEGER
        },
        jumlahbedrusak:{
            type:Sequelize.INTEGER
        },
        tglinput:{
            type: Sequelize.DATE
        }
    }, {
        tableName: "t_bedharian", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_bedharian;
};