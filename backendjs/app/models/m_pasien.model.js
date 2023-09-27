/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const M_pasien = sequelize.define("m_pasien", {
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
            type: Sequelize.STRING
        },
        namaexternal: {
            type: Sequelize.STRING
        },
        reportdisplay: {
            type: Sequelize.STRING
        },
        objectagamafk: {
            type: Sequelize.INTEGER,
        },
        objectgolongandarahfk: {
            type: Sequelize.INTEGER,
        },
        objectjeniskelaminfk: {
            type: Sequelize.INTEGER,
        },
        namapasien: {
            type: Sequelize.STRING,
        },
        nikibu: {
            type: Sequelize.STRING,
        },
        objectpekerjaanfk: {
            type: Sequelize.INTEGER,
        },
        objectpendidikanfk: {
            type: Sequelize.INTEGER,
        },
        objectstatusperkawinanfk: {
            type: Sequelize.INTEGER,
        },
        tgldaftar: {
            type: Sequelize.DATE,
        },
        tgllahir: {
            type: Sequelize.DATE,
        },
        objecttitlefk: {
            type: Sequelize.INTEGER,
        },
        namaibu: {
            type: Sequelize.STRING,
        },
        notelepon: {
            type: Sequelize.STRING,
        },
        noidentitas: {
            type: Sequelize.STRING,
        },
        tglmeninggal: {
            type: Sequelize.DATE,
        },
        objectkebangsaanfk: {
            type: Sequelize.INTEGER,
        },
        objectnegaraktpfk: {
            type: Sequelize.INTEGER,
        },
        namaayah: {
            type: Sequelize.STRING,
        },
        namasuamiistri: {
            type: Sequelize.STRING,
        },
        nobpjs: {
            type: Sequelize.STRING,
        },
        nohp: {
            type: Sequelize.STRING,
        },
        tempatlahir: {
            type: Sequelize.STRING,
        },
        jamlahir: {
            type: Sequelize.DATE,
        },
        namakeluarga: {
            type: Sequelize.STRING,
        },
        alamatrmh: {
            type: Sequelize.STRING,
        },
        nocmibu: {
            type: Sequelize.STRING,
        },
        objectkaryawanrsfk: {
            type: Sequelize.INTEGER,
        },
        objectetnisfk: {
            type: Sequelize.INTEGER,
        },
        objectbahasafk: {
            type: Sequelize.INTEGER,
        },
        alamatdomisili: {
            type: Sequelize.STRING,
        },
        rtktp: {
            type: Sequelize.STRING,
        },
        rwktp: {
            type: Sequelize.STRING,
        },
        objectdesakelurahanktpfk: {
            type: Sequelize.INTEGER,
        },
        rtdomisili: {
            type: Sequelize.STRING,
        },
        rwdomisili: {
            type: Sequelize.STRING,
        },
        objectdesakelurahandomisilifk: {
            type: Sequelize.INTEGER,
        },
        objectnegaradomisilifk: {
            type: Sequelize.INTEGER,
        },
        nocm: {
            type: Sequelize.STRING,
        },
        objectstatuskendalirmfk: {
            type: Sequelize.INTEGER,
        }
    }, {
        tableName: "m_pasien", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return M_pasien;
};