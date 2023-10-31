/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
  const role_permissions = sequelize.define("role_permissions", {
    roleid: {
      type: Sequelize.INTEGER
    },
    permissionid: {
      type: Sequelize.INTEGER
    },
    statusenabled: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
  });
  return role_permissions;
};