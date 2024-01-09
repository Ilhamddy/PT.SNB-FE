import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
export default class t_asesmenawaligd extends Model {
  // eslint-disable-next-line max-lines-per-function
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      primaryKey: true
    },
    objectemrpasienfk: {
      type: DataTypes.CHAR(32),
      allowNull: true,
      references: {
        model: 't_emrpasien',
        key: 'norec'
      }
    },
    statusenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tglinput: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isnyeri: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isnyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    skalanyeri: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    skalanyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    objectterminologilokasinyerifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_terminologi',
        key: 'id'
      }
    },
    lokasinyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    penyebabnyeri: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    penyebabnyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    durasi: {
      type: DataTypes.REAL,
      allowNull: true
    },
    objectsatuannyerifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_satuan',
        key: 'id'
      }
    },
    durasinyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    frekuensinyeri: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    frekuensinyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mfs_skorjatuh: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_penyakit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_alatbantujalan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_infus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_carajalan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_statusmental: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_totalskor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectinterpretasimfsfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_interpretasi',
        key: 'id'
      }
    },
    mfs_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    hds_usia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_jeniskelamin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_diagnosa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_gangguankognitif: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_lingkungan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_pembedahan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_medikamentosa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_totalskor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectinterpretasihdsfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_interpretasi',
        key: 'id'
      }
    },
    hds_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    objectttvfk: {
      type: DataTypes.CHAR(32),
      allowNull: true,
      references: {
        model: 't_ttv',
        key: 'norec'
      }
    }
  }, {
    sequelize,
    tableName: 't_asesmenawaligd',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_asesmenawaligd_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
