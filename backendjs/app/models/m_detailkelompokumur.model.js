export default (sequelize, Sequelize) => {
    const m_detailkelompokumur = sequelize.define("m_detailkelompokumur", {
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
        objectkelompokumurfk:{
            type: Sequelize.INTEGER
        },
        reportdisplay:{
            type: Sequelize.STRING
        },
        detailkelompokumur:{
            type: Sequelize.STRING
        },
        statusumur:{
            type: Sequelize.STRING
        },
        umurmin:{
            type: Sequelize.FLOAT
        },
        umurmax:{
            type: Sequelize.FLOAT
        },
    }, {
        tableName: "m_detailkelompokumur", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_detailkelompokumur;
};