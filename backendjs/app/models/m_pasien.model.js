module.exports = (sequelize, Sequelize) => {
    const M_pasien = sequelize.define("m_pasien", {
        // id: {
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: Sequelize.INTEGER
        //   },
        nocm:{
            type: Sequelize.STRING
        },
        namapasien: {
            type: Sequelize.STRING
        },
        noidentitas: {
            type: Sequelize.STRING
        },
        objectjeniskelaminfk: {
            type: Sequelize.INTEGER
        },
        objecttitlefk: {
            type: Sequelize.INTEGER
        },
        objectagamafk: {
            type: Sequelize.INTEGER
        },
        objectgolongandarahfk: {
            type: Sequelize.INTEGER
        },
        objectkebangsaanfk: {
            type: Sequelize.INTEGER
        },
        objectstatusperkawinanfk: {
            type: Sequelize.INTEGER
        },
        objectpendidikanfk: {
            type: Sequelize.INTEGER
        },
        objectpekerjaanfk: {
            type: Sequelize.INTEGER
        },
        objectetnisfk: {
            type: Sequelize.INTEGER
        },
        alamatrmh: {
            type: Sequelize.STRING
        },
        rtktp: {
            type: Sequelize.STRING
        },
        rwktp: {
            type: Sequelize.STRING
        },
        objectdesakelurahanktpfk: {
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
    }, {
        tableName: "m_pasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return M_pasien;
};