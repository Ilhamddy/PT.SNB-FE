/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */

// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
  const user_roles = sequelize.define("user_roles", {
    roleid: {
      type: Sequelize.INTEGER,
    },
    userid: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
    statusenabled: {
      type: Sequelize.BOOLEAN,
    },
  }, {
    tableName: "user_roles", // relation "user" does not exist
    createdAt: true,
    updatedAt: true,
  });

  return user_roles;
};