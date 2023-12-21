/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_pengkajianawalkeperawatan = sequelize.define("t_pengkajianawalkeperawatan", {
        norec: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.CHAR(32)
        },
        objectemrfk:{
            type: Sequelize.CHAR(32)
        },
        objectsumberdatafk:{
            type: Sequelize.INTEGER
        },
        keluhanutama:{
            type: Sequelize.STRING
        },
        objectterminologikeluhanfk:{
            type: Sequelize.INTEGER
        },
        objectstatuspsikologisfk:{
            type: Sequelize.JSON
        },
        objectterminologialergifk:{
            type: Sequelize.INTEGER
        },
        ihs_keluhan:{
            type:Sequelize.STRING
        },
        ihs_alergi:{
            type:Sequelize.STRING
        },
        tglinput:{
            type:Sequelize.DATE
        },
        status_ihs_keluhan:{
            type: Sequelize.BOOLEAN
        },
        status_ihs_alergi:{
            type: Sequelize.BOOLEAN
        }
    }, {
        tableName: "t_pengkajianawalkeperawatan",
        createdAt: false,
        updatedAt: false,
    });

    return t_pengkajianawalkeperawatan;
};