/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
  const m_mapusertounit = sequelize.define("m_mapusertounit", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        objectuserfk:{
            type: Sequelize.INTEGER
        },
        objectunitfk:{
            type: Sequelize.INTEGER
        },
        tglinput:{
            type: Sequelize.DATE
        },
        tglupdate:{
            type: Sequelize.DATE
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
  }, {
      tableName: "m_mapusertounit", // relation "user" does not exist
      createdAt: false,
      updatedAt: false,
  });

  return m_mapusertounit;
};