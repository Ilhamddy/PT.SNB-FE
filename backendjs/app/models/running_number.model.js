// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const running_Number = sequelize.define("running_number", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        kegunaan:{
            type: Sequelize.STRING
        },
        new_number: {
            type: Sequelize.STRING
        },
        reset: {
            type: Sequelize.STRING
        },
        extention: {
            type: Sequelize.STRING
        },
    }, {
        tableName: "running_number", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return running_Number;
};