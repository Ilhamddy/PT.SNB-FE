/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
// eslint-disable-next-line max-lines-per-function
export default (sequelize, Sequelize) => {
    const t_orderresep = sequelize.define("t_orderresep", {
        norec: {
          type: Sequelize.CHAR(32),
          allowNull: false,
          primaryKey: true
        },
        kdprofile: {
          type: Sequelize.SMALLINT,
          allowNull: true
        },
        statusenabled: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        },
        kodeexternal: {
          type: Sequelize.STRING(15),
          allowNull: true
        },
        namaexternal: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        reportdisplay: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        objectantreanpemeriksaanfk: {
          type: Sequelize.CHAR(32),
          allowNull: false,
          references: {
            model: 't_antreanpemeriksaan',
            key: 'norec'
          }
        },
        objectpegawaifk: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        tglinput: {
          type: Sequelize.DATE,
          allowNull: false
        },
        objectunitasalfk: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        no_order: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        objectdepotujuanfk: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'm_unit',
            key: 'id'
          }
        },
        no_resep: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        tglverif: {
          type: Sequelize.DATE,
          allowNull: true
        },
        ihs_id: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        objectstatusfarmasifk: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'm_statusfarmasi',
            key: 'id'
          }
        },
        tglpanggil: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, {
        tableName: "t_orderresep",
        createdAt: false,
        updatedAt: false,
    });

    return t_orderresep;
};