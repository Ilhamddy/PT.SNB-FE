// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_pelayananpasienpetugas = sequelize.define("t_pelayananpasienpetugas", {
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
        objectpelayananpasienfk:{
            type: Sequelize.CHAR(32)
        },
        objectpegawaifk:{
            type:Sequelize.CHAR(32)
        },
        objectjenispelaksanafk:{
            type: Sequelize.CHAR(32)
        }
    }, {
        tableName: "t_pelayananpasienpetugas", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return t_pelayananpasienpetugas;
};