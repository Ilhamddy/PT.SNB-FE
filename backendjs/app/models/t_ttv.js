export default (sequelize, Sequelize) => {
    const t_ttv = sequelize.define("t_ttv", {
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
        tinggibadan:{
            type: Sequelize.STRING
        },
        beratbadan:{
            type: Sequelize.STRING
        },
        suhu:{
            type: Sequelize.STRING
        },
        e:{
            type: Sequelize.INTEGER
        },
        m:{
            type: Sequelize.INTEGER
        },
        v:{
            type: Sequelize.INTEGER
        },
        nadi:{
            type: Sequelize.INTEGER
        },
        alergi:{
            type: Sequelize.STRING
        },
        tekanandarah:{
            type: Sequelize.STRING
        },
        spo2:{
            type: Sequelize.STRING
        },
        pernapasan:{
            type: Sequelize.STRING
        },
        keadaanumum:{
            type: Sequelize.STRING
        },
        objectpegawaifk:{
            type: Sequelize.INTEGER
        },
        isedit:{
            type: Sequelize.BOOLEAN
        },
        objectttvfk:{
            type: Sequelize.INTEGER
        },
        objectgcsfk:{
            type: Sequelize.INTEGER
        },
        tglisi:{
            type: 'TIMESTAMP'
        },
    }, {
        tableName: "t_ttv", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_ttv;
};