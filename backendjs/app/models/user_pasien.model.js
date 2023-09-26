/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */

// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const users_pasien = sequelize.define("users_pasien", {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        norm: {
            type: Sequelize.INTEGER,
        },
        password: {
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
        },
        lastAccessed: {
            type: Sequelize.DATE,
        },
        clientsecret: {
            type: Sequelize.CHAR(32)
        }
    }, {
        tableName: "users_pasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return users_pasien;
};