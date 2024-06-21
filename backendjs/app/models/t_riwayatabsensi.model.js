import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_riwayatabsensi extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      primaryKey: true
    },
    statusenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tglabsensi: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jammasuk: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jamkeluar: {
      type: DataTypes.DATE,
      allowNull: true
    },
    objectpegawaifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_pegawai',
        key: 'id'
      }
    },
    jenisabsensi: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    statusabsensi: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    urifoto: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 't_riwayatabsensi',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_riwayatabsensi_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
