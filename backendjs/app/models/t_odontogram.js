import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_odontogram extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      primaryKey: true
    },
    statusenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    objectantreanpemeriksaanfk: {
      type: DataTypes.CHAR(32),
      allowNull: true,
      references: {
        model: 't_antreanpemeriksaan',
        key: 'norec'
      }
    },
    tglinput: {
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
    }
  }, {
    sequelize,
    tableName: 't_odontogram',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_odontogram_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
