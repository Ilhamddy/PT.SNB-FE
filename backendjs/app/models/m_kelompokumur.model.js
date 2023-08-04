// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_kelompokumur = sequelize.define("m_kelompokumur", {
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
        namaexternal:{
            type: Sequelize.STRING
        },
        reportdisplay:{
            type: Sequelize.STRING
        },
        kelompokumur:{
            type: Sequelize.STRING
        },
    }, {
        tableName: "m_kelompokumur", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_kelompokumur;
};