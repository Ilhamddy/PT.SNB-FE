/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_daftarpasien = sequelize.define("t_daftarpasien", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        nocmfk: {
            type: Sequelize.INTEGER
        },
        noregistrasi: {
            type: Sequelize.STRING
        },
        tglregistrasi: {
            type: 'TIMESTAMP'
        },
        objectdokterpemeriksafk: {
            type: Sequelize.INTEGER
        },
        objectpegawaifk: {
            type: Sequelize.INTEGER
        },
        objectkelasfk: {
            type: Sequelize.INTEGER
        },
        objectkelompokpasienlastfk: {
            type: Sequelize.INTEGER
        },
        objectkondisipasienfk: {
            type: Sequelize.INTEGER
        },
        pembawapasien: {
            type: Sequelize.STRING
        },
        objecthubunganpembawapasienfk: {
            type: Sequelize.INTEGER
        },
        objectpenyebabkematianfk: {
            type: Sequelize.INTEGER
        },
        objectpenjaminfk: {
            type: Sequelize.INTEGER
        },
        objectpenjamin2fk: {
            type: Sequelize.INTEGER
        },
        objectpenjamin3fk: {
            type: Sequelize.INTEGER
        },
        objectunitlastfk: {
            type: Sequelize.INTEGER
        },
        statuspasien: {
            type: Sequelize.STRING
        },
        objectstatuspulangfk: {
            type: Sequelize.INTEGER
        },
        tglpulang: {
            type: Sequelize.DATE
        },
        tglregistrasi: {
            type: Sequelize.DATE
        },
        objectunitasalfk: {
            type: Sequelize.INTEGER
        },
        keteranganpenyebabkematian: {
            type: Sequelize.STRING
        },
        isclosing: {
            type: Sequelize.BOOLEAN
        },
        tglclosing: {
            type: Sequelize.DATE
        },
        catatan: {
            type: Sequelize.STRING
        },
        statuskirimdokumen: {
            type: Sequelize.INTEGER
        },
        tgltutuplayananpasien: {
            type: Sequelize.DATE
        },
        sensus: {
            type: Sequelize.BOOLEAN
        },
        tanggalrawat: {
            type: Sequelize.DATE
        },
        keterangan: {
            type: Sequelize.STRING
        },
        objectpjpasienfk: {
            type: Sequelize.INTEGER
        },
        namapjpasien: {
            type: Sequelize.STRING
        },
        objectasalrujukanfk: {
            type: Sequelize.INTEGER
        },
        objectinstalasifk: {
            type: Sequelize.INTEGER
        },
        nohppj: {
            type: Sequelize.STRING
        },
        objectjenispenjaminfk: {
            type: Sequelize.INTEGER
        },
        objectcarapulangrifk: {
            type: Sequelize.INTEGER
        },
        objectkondisipulangrifk: {
            type: Sequelize.INTEGER
        },
        objectstatuspulangrifk: {
            type: Sequelize.INTEGER
        },
        pembawapulang: {
            type: Sequelize.STRING
        },
        objecthubungankeluargapembawafk: {
            type: Sequelize.INTEGER
        },
        tglmeninggal: {
            type: Sequelize.DATE
        },
        tglkeluar: {
            type: Sequelize.DATE
        },
        objectdokterperujukfk: {
            type: Sequelize.INTEGER
        },
        faskestujuan: {
            type: Sequelize.STRING
        },
        namafaskes: {
            type: Sequelize.STRING
        },
        tglrujuk: {
            type: Sequelize.DATE
        },
        alasanrujuk: {
            type: Sequelize.STRING
        },
        objectcaramasukfk: {
            type: Sequelize.INTEGER
        },
        cbg_code: {
            type: Sequelize.STRING
        },
        cbg_description: {
            type: Sequelize.STRING
        },
        cbg_tarif: {
            type: Sequelize.FLOAT
        },
        cbg_mdc_number: {
            type: Sequelize.STRING
        },
        cbg_mdc_description: {
            type: Sequelize.STRING
        },
        cbg_drg_code: {
            type: Sequelize.STRING
        },
        cbg_drg_description: {
            type: Sequelize.STRING
        },
        add_payment_amt: {
            type: Sequelize.FLOAT
        },
        status_grouping: {
            type: Sequelize.STRING
        },
        objectjenispelayananfk: {
            type: Sequelize.INTEGER
        },
        isprinted: {
            type: Sequelize.BOOLEAN
        },
        nominalklaim: {
            type: Sequelize.FLOAT
        },
        caradaftar: {
            type: Sequelize.STRING
        },
        ihs_id:{
            type: Sequelize.STRING
        }
    }, {
        tableName: "t_daftarpasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_daftarpasien;
};