/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_setorankasirdetail = sequelize.define("t_setorankasirdetail", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        objectsetorankasirfk: {
            type: Sequelize.CHAR(32)
        },
        objectjenisnontunaifk: {
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.REAL
        },
        objectmetodebayarfk: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "t_setorankasirdetail",
        createdAt: false,
        updatedAt: false,
    });

    return t_setorankasirdetail;
};