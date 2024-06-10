/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_notifikasi = sequelize.define("t_notifikasi", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        objectjenisorderfk:{
            type:Sequelize.INTEGER
        },
        link:{
            type:Sequelize.INTEGER
        },
        objectuserfk:{
            type:Sequelize.INTEGER
        },
        isbaca:{
            type:Sequelize.INTEGER
        },
        tglinput:{
            type:Sequelize.DATE
        },
        objectunitfk:{
            type:Sequelize.INTEGER
        }
    }, {
        tableName: "t_notifikasi",
        createdAt: false,
        updatedAt: false,
    });

    return t_notifikasi;
};