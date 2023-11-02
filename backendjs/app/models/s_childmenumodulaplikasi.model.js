/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
  const s_childmenumodulaplikasi = sequelize.define("s_childmenumodulaplikasi", {
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
      objekmenumodulaplikasiid:{
        type:Sequelize.INTEGER
      },
      nourut:{
        type:Sequelize.INTEGER
      },
      objectlinkmenufk:{
        type:Sequelize.INTEGER
      }
  }, {
      tableName: "s_childmenumodulaplikasi", // relation "user" does not exist
      createdAt: false,
      updatedAt: false,
  });

  return s_childmenumodulaplikasi;
};