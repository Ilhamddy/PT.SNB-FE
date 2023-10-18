/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_pegawai = sequelize.define("m_pegawai", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        kdprofile:{
            type:Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        kodeexternal:{
            type: Sequelize.STRING
        },
        namaexternal:{
            type: Sequelize.STRING
        },
        reportdisplay:{
            type: Sequelize.STRING
        },
        objectagamafk:{
            type: Sequelize.INTEGER
        },
        objectgolonganfk:{
            type: Sequelize.INTEGER
        },
        objectgolongandarahfk:{
            type:Sequelize.INTEGER
        },
        objectjabatanfk:{
            type:Sequelize.INTEGER
        },
        objectjeniskelaminfk:{
            type:Sequelize.INTEGER
        },
        objectprofesipegawaifk:{
            type:Sequelize.INTEGER
        },
        objectnegarafk:{
            type:Sequelize.INTEGER
        },
        objectpendidikanterakhirfk:{
            type:Sequelize.INTEGER
        },
        objectunitfk:{
            type:Sequelize.INTEGER
        },
        objectstatuspegawaifk:{
            type:Sequelize.INTEGER
        },
        objectetnisfk:{
            type:Sequelize.INTEGER
        },
        namalengkap:{
            type:Sequelize.STRING
        },
        npwp:{
            type:Sequelize.STRING
        },
        qtyanak:{
            type:Sequelize.INTEGER
        },
        qtytanggungan:{
            type:Sequelize.INTEGER
        },
        tempatlahir:{
            type:Sequelize.STRING
        },
        tgldaftarfingerprint:{
            type:Sequelize.DATE
        },
        tglkeluar:{
            type:Sequelize.DATE
        },
        tgllahir:{
            type:Sequelize.DATE
        },
        tglmasuk:{
            type:Sequelize.DATE
        },
        noidentitas:{
            type:Sequelize.STRING
        },
        nip:{
            type:Sequelize.STRING
        },
        objectstatusperkawinanpegawaifk:{
            type:Sequelize.INTEGER
        },
        email:{
            type:Sequelize.STRING
        },
        nohandphone:{
            type:Sequelize.STRING
        },
        notlp:{
            type:Sequelize.STRING
        },
        nocmfk:{
            type:Sequelize.INTEGER
        },
        tanggalmeninggal:{
            type:Sequelize.DATE
        },
        objectkodebankfk:{
            type:Sequelize.INTEGER
        },
        nama:{
            type:Sequelize.STRING
        },
        namarekening:{
            type:Sequelize.STRING
        },
        nomorrekening:{
            type:Sequelize.STRING
        },
        idfinger:{
            type:Sequelize.STRING
        },
        tglpensiun:{
            type:Sequelize.DATE
        },
        gelarbelakang:{
            type:Sequelize.STRING
        },
        gelardepan:{
            type:Sequelize.STRING
        },
        nosip:{
            type:Sequelize.STRING
        },
        nostr:{
            type:Sequelize.STRING
        },
        tglberakhirsip:{
            type:Sequelize.DATE
        },
        tglberakhirstr:{
            type:Sequelize.DATE
        },
        tglterbitsip:{
            type:Sequelize.DATE
        },
        tglterbitstr:{
            type:Sequelize.DATE
        },
        nrp:{
            type:Sequelize.STRING
        },
        photo:{
            type:Sequelize.STRING
        },
        salary:{
            type:Sequelize.STRING
        },
        idhafis:{
            type:Sequelize.STRING
        },
        namahafis:{
            type:Sequelize.STRING
        },
        objectdesakelurahanktpfk:{
            type:Sequelize.INTEGER
        },
        objectspesialisasifk:{
            type:Sequelize.INTEGER
        },
        namaibu:{
            type:Sequelize.STRING
        },
        alamatktp:{
            type:Sequelize.STRING
        },
        rtktp:{
            type:Sequelize.STRING
        },
        rwktp:{
            type:Sequelize.STRING
        },
        kodeposktp:{
            type:Sequelize.STRING
        },
        alamatdom:{
            type:Sequelize.STRING
        },
        rtdom:{
            type:Sequelize.STRING
        },
        rwdom:{
            type:Sequelize.STRING
        },
        objectdesakelurahandomfk:{
            type:Sequelize.INTEGER
        },
        kodeposdom:{
            type:Sequelize.STRING
        },
        nosk:{
            type:Sequelize.STRING
        },
        objectgolonganptkpfk:{
            type:Sequelize.INTEGER
        },
        objectunitkerjafk:{
            type:Sequelize.INTEGER
        }
    }, {
        tableName: "m_pegawai", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_pegawai;
};