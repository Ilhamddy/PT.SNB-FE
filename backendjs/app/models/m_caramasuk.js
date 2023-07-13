export default (sequelize, Sequelize) => {
    const m_caramasuk = sequelize.define("m_caramasuk", {
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
        kodeexternal:{
            type: Sequelize.STRING
        },
        caramasuk:{
            type: Sequelize.INTEGER
        },
    }, {
        tableName: "m_caramasuk", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_caramasuk;
};