/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_pasienigd = sequelize.define("t_pasienigd", {
        norec: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        namapasien: {
            type: Sequelize.STRING,
        },
        umur: {
            type: Sequelize.STRING,
        },
        keluhan: {
            type: Sequelize.STRING,
        },
        namapj: {
            type: Sequelize.STRING,
        },
        nohp: {
            type: Sequelize.STRING,
        },
        objectpegawaiinputfk: {
            type: Sequelize.INTEGER,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        objectdaftarpasienfk: {
            type: Sequelize.CHAR(32),
        },
        objectpegawaiupdatefk: {
            type: Sequelize.CHAR(32),
        },
        tglupdate: {
            type: Sequelize.DATE,
        },
        objecthubunganpjfk: {
            type: Sequelize.INTEGER,
        },
        riwayatpenyakit:{
            type: Sequelize.STRING
        },
        riwayatobat:{
            type: Sequelize.STRING
        },
        skalanyeri:{
            type: Sequelize.INTEGER
        },
        airway:{
            type: Sequelize.INTEGER
        },
        breathing:{
            type: Sequelize.INTEGER
        },
        circulation:{
            type: Sequelize.INTEGER
        },
        disability:{
            type: Sequelize.INTEGER
        },
        kondisimental:{
            type: Sequelize.INTEGER
        },
        objectdaruratigdfk:{
            type:Sequelize.INTEGER
        },
        rencanaterapi:{
            type:Sequelize.STRING
        },
        objectterminologikeluhanfk:{
            type:Sequelize.INTEGER
        },
        objecttransportasikedatanganfk:{
            type:Sequelize.INTEGER
        },
        objectterminologialergimakananfk:{
            type:Sequelize.INTEGER
        },
        objectterminologialergiobatfk:{
            type:Sequelize.INTEGER
        },
        objectterminologialergilingkunganfk:{
            type:Sequelize.INTEGER
        },
        ihs_keluhan:{
            type:Sequelize.STRING
        },
        ihs_transportasikedatangan:{
            type:Sequelize.STRING
        },
        ihs_alergimakanan:{
            type:Sequelize.STRING
        },
        ihs_alergiobat:{
            type:Sequelize.STRING
        },
        ihs_alergilingkungan:{
            type:Sequelize.STRING
        }
    }, {
        tableName: "t_pasienigd",
        createdAt: false,
        updatedAt: false,
    });

    return t_pasienigd;
};
