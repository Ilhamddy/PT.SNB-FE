/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_kamar = sequelize.define("m_kamar", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile: {
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        kodeexternal: {
            type: Sequelize.STRING
        },
        namaexternal: {
            type: Sequelize.STRING
        },
        reportdisplay:{
            type: Sequelize.STRING
        },
        objectkelasfk:{
            type: Sequelize.INTEGER
        },
        objectunitfk:{
            type: Sequelize.INTEGER
        },
        namakamar: {
            type: Sequelize.STRING
        },
        qtybed: {
            type: Sequelize.INTEGER
        },
        jumlahbedisi: {
            type: Sequelize.INTEGER
        },
        jumlahbedkosong: {
            type: Sequelize.INTEGER
        },
        keterangan: {
            type: Sequelize.STRING
        },
        objectprodukfk: {
            type: Sequelize.INTEGER
        },
        objectruangperawatankemenkesfk: {
            type: Sequelize.INTEGER
        },
        tglupdate: {
            type: Sequelize.DATE
        },
        produkfk: {
            type: Sequelize.INTEGER
        },
        objectspesialisfk: {
            type: Sequelize.INTEGER
        },
    }, {
        tableName: "m_kamar",
        createdAt: false,
        updatedAt: false,
    });

    return m_kamar;
};