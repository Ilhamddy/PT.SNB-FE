/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const m_instalasi = sequelize.define("m_instalasi", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        statusenabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        reportdisplay:{
            type: Sequelize.STRING
        },
        objectjenisperawatanfk:{
            type: Sequelize.INTEGER
        },
        namainstalasi:{
            type: Sequelize.STRING
        },
        ihs_id:{
            type: Sequelize.STRING
        }
    }, {
        tableName: "m_instalasi", // relation "user" does not exist
        createdAt: false,
        updatedAt: false,
    });

    return m_instalasi;
};