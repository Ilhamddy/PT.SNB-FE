/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
  const s_modulaplikasi = sequelize.define("s_modulaplikasi", {
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
      namaexternal:{
          type: Sequelize.STRING
      },
      reportdisplay:{
          type: Sequelize.STRING
      },
  }, {
      tableName: "s_modulaplikasi", // relation "user" does not exist
      createdAt: false,
      updatedAt: false,
  });

  return s_modulaplikasi;
};