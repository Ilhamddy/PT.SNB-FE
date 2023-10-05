/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_orderoperasi = sequelize.define("t_orderoperasi", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        kodeexternal: {
            type: Sequelize.STRING,
        },
        objectantreanpemeriksaanfk: {
            type: Sequelize.CHAR(32),
        },
        nomororder: {
            type: Sequelize.STRING,
        },
        namaoperasi: {
            type: Sequelize.STRING,
        },
        objectdokteroperatorfk: {
            type: Sequelize.INTEGER,
        },
        tglrencana: {
            type: Sequelize.DATE,
        },
        objecticdxfk: {
            type: Sequelize.INTEGER,
        },
        iscito: {
            type: Sequelize.BOOLEAN,
        },
        catatanorder: {
            type: Sequelize.STRING,
        },
        objectpegawaiorderfk: {
            type: Sequelize.INTEGER,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        objectunitasalfk:{
            type: Sequelize.INTEGER
        },
        objectkamarfk:{
            type: Sequelize.INTEGER
        },
        objectstatusoperasifk:{
            type: Sequelize.INTEGER
        },
        catatanverif:{
            type: Sequelize.STRING
        },
        tglverif:{
            type: Sequelize.DATE
        },
        objectpegawaiveriffk:{
            type: Sequelize.INTEGER
        },
        objectjenisoperasifk:{
            type: Sequelize.INTEGER
        },
    }, {
        tableName: "t_orderoperasi",
        createdAt: false,
        updatedAt: false,
    });

    return t_orderoperasi;
};
