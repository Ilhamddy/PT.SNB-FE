module.exports = (sequelize, Sequelize) => {
    const t_antreanpemeriksaan = sequelize.define("t_antreanpemeriksaan", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        objectdaftarpasienfk: {
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            // defaultValue: true
        },
        tglregistrasi: {
            type: 'TIMESTAMP'
        },
        objectasalrujukanfk: {
            type: Sequelize.INTEGER
        },
        objectkamarfk: {
            type: Sequelize.INTEGER
        },
        objectkelasfk: {
            type: Sequelize.INTEGER
        },
        noantrian: {
            type: Sequelize.INTEGER
        },
        nobed: {
            type: Sequelize.INTEGER
        },
        objectdokterpemeriksafk: {
            type: Sequelize.INTEGER
        },
        objectunitfk: {
            type: Sequelize.INTEGER
        },
        statuskunjungan: {
            type: Sequelize.STRING
        },
        statuspanggil: {
            type: Sequelize.INTEGER
        },
        tglmasuk: {
            type: 'TIMESTAMP'
        },
        tglkeluar: {
            type: 'TIMESTAMP'
        },
    }, {
        tableName: "t_antreanpemeriksaan", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_antreanpemeriksaan;
};