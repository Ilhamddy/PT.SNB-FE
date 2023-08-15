// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_hasilpemeriksaandetail = sequelize.define("t_hasilpemeriksaandetail", {
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
        objecthasilpemeriksaanfk:{
            type:Sequelize.CHAR(32)
        },
        objectpemeriksaanlabfk:{
            type: Sequelize.INTEGER
        },
        objectnilainormallabfk:{
            type:Sequelize.INTEGER
        },
        objectsatuanfk:{
            type:Sequelize.INTEGER
        },
        nilaihasil:{
            type:Sequelize.STRING
        },
        metode:{
            type:Sequelize.STRING
        },
        nilaikritis:{
            type:Sequelize.STRING
        },
        keterangan:{
            type:Sequelize.STRING
        },
    }, {
        tableName: "t_hasilpemeriksaandetail", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_hasilpemeriksaandetail;
};