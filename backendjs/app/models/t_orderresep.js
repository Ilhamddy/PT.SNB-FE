import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_orderresep extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      primaryKey: true
    },
    kdprofile: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    statusenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    kodeexternal: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    namaexternal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reportdisplay: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    objectantreanpemeriksaanfk: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      references: {
        model: 't_antreanpemeriksaan',
        key: 'norec'
      }
    },
    objectpegawaifk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tglinput: {
      type: DataTypes.DATE,
      allowNull: false
    },
    objectunitasalfk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    no_order: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    objectdepotujuanfk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'm_unit',
        key: 'id'
      }
    },
    no_resep: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tglverif: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    objectstatusfarmasifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_statusfarmasi',
        key: 'id'
      }
    },
    tglpanggil: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 't_orderresep',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_orderresep_norec_key1",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
      {
        name: "t_orderresep_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
