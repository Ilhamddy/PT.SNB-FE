/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_produk = sequelize.define("m_produk", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile: {
            type: Sequelize.INTEGER,
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
        },
        kodeexternal: {
            type: Sequelize.STRING,
        },
        namaexternal: {
            type: Sequelize.STRING,
        },
        reportdisplay: {
            type: Sequelize.STRING,
        },
        objectbentukprodukfk: {
            type: Sequelize.INTEGER,
        },
        objectinstalasifk: {
            type: Sequelize.INTEGER,
        },
        objectdetailjenisprodukfk: {
            type: Sequelize.INTEGER,
        },
        objectkategoriprodukfk: {
            type: Sequelize.INTEGER,
        },
        objectsatuanbesarfk: {
            type: Sequelize.INTEGER,
        },
        objectsatuankecilfk: {
            type: Sequelize.INTEGER,
        },

        objectsatuanstandarfk: {
            type: Sequelize.INTEGER,
        },
        objectstatusprodukfk: {
            type: Sequelize.INTEGER,
        },
        deskripsiproduk: {
            type: Sequelize.STRING,
        },
        kekuatan: {
            type: Sequelize.FLOAT,
        },
        namaproduk: {
            type: Sequelize.STRING,
        },
        nilainormal: {
            type: Sequelize.INTEGER,
        },
        qtyjualterkecil: {
            type: Sequelize.INTEGER,
        },
        objectjenisperiksapenunjangfk: {
            type: Sequelize.INTEGER,
        },
        objectgenerikfk: {
            type: Sequelize.INTEGER,
        },
        objectsediaanfk: {
            type: Sequelize.INTEGER,
        },
        keterangan: {
            type: Sequelize.STRING,
        },
        objectvariabelbpjsfk: {
            type: Sequelize.INTEGER,
        },
        isobat: {
            type: Sequelize.BOOLEAN,
        },
        isfornas: {
            type: Sequelize.BOOLEAN,
        },
        isforrs: {
            type: Sequelize.BOOLEAN,
        },
        isobatkronis: {
            type: Sequelize.BOOLEAN,
        },
        isbmhp: {
            type: Sequelize.BOOLEAN,
        },
        objectgolonganobatfk: {
            type: Sequelize.INTEGER,
        },
        isalkes: {
            type: Sequelize.BOOLEAN,
        },
        tglinput: {
            type: Sequelize.DATE,
        },
        tglupdate: {
            type: Sequelize.DATE,
        },
        objectpegawaiinputfk: {
            type: Sequelize.INTEGER,
        },
        objectpegawaiupdatefk: {
            type: Sequelize.INTEGER,
        },
        barcode: {
            type: Sequelize.CHAR(40)
        },
        islogistik: {
            type: Sequelize.BOOLEAN,
        },
        kfa_id: {
            type: Sequelize.CHAR(15)
        },
        ihs_id: {
            type: Sequelize.CHAR(15)
        }
    }, {
        tableName: "m_produk", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });
    return m_produk;
}