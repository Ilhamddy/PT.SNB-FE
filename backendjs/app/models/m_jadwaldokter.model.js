/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_jadwaldokter = sequelize.define("m_jadwaldokter", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile: {
            type: Sequelize.SMALLINT,
        },
        statusenabled:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        kodeexternal:{
            type: Sequelize.CHAR(15)
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER,
        },
        objectharifk: {
            type: Sequelize.INTEGER,
        },
        jam_mulai: {
            type: Sequelize.TIME,
        },
        jam_selesai: {
            type: Sequelize.TIME,
        },
        objectunitfk: {
            type: Sequelize.INTEGER,
        },
        objectstatushadirfk: {
            type: Sequelize.INTEGER,
        },
    }, {
        tableName: "m_jadwaldokter", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_jadwaldokter   ;
};