module.exports = (sequelize, Sequelize) => {
    const t_kepesertaanasuransi = sequelize.define("t_kepesertaanasuransi", {
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
        objectdaftarpasienfk:{
            type: Sequelize.STRING
        },
        no_urut:{
            type: Sequelize.INTEGER
        },
        objectpenjaminfk:{
            type: Sequelize.INTEGER
        },
        no_kartu: {
            type: Sequelize.INTEGER
        },
        plafon: {
            type: Sequelize.INTEGER
        },
        jenisrujukan: {
            type: Sequelize.STRING
        },
        tglsep: {
            type: 'TIMESTAMP',
        },
        no_rujukan: {
            type: Sequelize.STRING
        },
        no_sep: {
            type: Sequelize.STRING
        },
        tujuankunjungan: {
            type: Sequelize.STRING
        },
        objectdpjpfk: {
            type: Sequelize.INTEGER
        },
        asalrujukan: {
            type: Sequelize.STRING
        },
        tglrujukan: {
            type: 'TIMESTAMP',
        },
        no_skdp: {
            type: Sequelize.STRING
        },
        dpjppemberisurat: {
            type: Sequelize.STRING
        },
        objectdiagnosarujukanfk: {
            type: Sequelize.INTEGER
        },
        iseksekutif: {
            type: Sequelize.BOOLEAN
        },
        jenispeserta: {
            type: Sequelize.STRING
        },
        no_telp: {
            type: Sequelize.STRING
        },
        catatan: {
            type: Sequelize.STRING
        },
        objectstatuskecelakaanfk:{
            type: Sequelize.INTEGER
        },
        ll_objectprovinsifk: {
            type: Sequelize.INTEGER
        },
        ll_objectkabupatenfk: {
            type: Sequelize.INTEGER
        },
        ll_objectkecamatanfk: {
            type: Sequelize.INTEGER
        },
        ll_tgl: {
            type: 'TIMESTAMP',
        },
        ll_suplesi: {
            type: Sequelize.STRING
        },
        ll_keterangan: {
            type: Sequelize.STRING
        },
        lk_tglkejadian: {
            type: 'TIMESTAMP',
        },
        lk_nolaporan: {
            type: Sequelize.STRING
        },
        lk_objectprovinsifk: {
            type: Sequelize.INTEGER
        },
        lk_objectkabupatenfk: {
            type: Sequelize.INTEGER
        },
        lk_objectkecamatanfk: {
            type: Sequelize.INTEGER
        },
        lk_keterangan: {
            type: Sequelize.STRING
        },
        ll_isjasaraharja: {
            type: Sequelize.BOOLEAN
        },
        ll_isjasaraharja:{
            type: Sequelize.BOOLEAN
        },
        ll_isbpjstk:{
            type: Sequelize.BOOLEAN
        },
        ll_istaspen:{
            type: Sequelize.BOOLEAN
        },
        ll_isaskes:{
            type: Sequelize.BOOLEAN
        }
    }, {
        tableName: "t_kepesertaanasuransi", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_kepesertaanasuransi;
};