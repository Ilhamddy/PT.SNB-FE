module.exports = (sequelize, Sequelize) => {
    const t_cppt = sequelize.define("t_cppt", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        objectemrfk:{
            type: Sequelize.CHAR(32)
        },
        subjective:{
            type: Sequelize.STRING
        },
        objective:{
            type: Sequelize.STRING
        },
        assesment:{
            type: Sequelize.STRING
        },
        plan:{
            type: Sequelize.INTEGER
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
        isedit:{
            type: Sequelize.BOOLEAN
        },
       objectcpptfk:{
        type:Sequelize.CHAR(32)
       },
        tglisi:{
            type: 'TIMESTAMP'
        },
    }, {
        tableName: "t_cppt", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_cppt;
};