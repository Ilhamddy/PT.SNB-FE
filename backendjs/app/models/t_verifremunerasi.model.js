/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
  const t_verifremunerasi = sequelize.define("t_verifremunerasi", {
    norec: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.CHAR(32)
    },
    objectpegawaifk: {
      type: Sequelize.INTEGER,
    },
    tglinput: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: "t_verifremunerasi",
    createdAt: false,
    updatedAt: false,
  });

  return t_verifremunerasi;
};
