import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_ordergizidetail extends Model {
  // eslint-disable-next-line max-lines-per-function
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      primaryKey: true
    },
    statusenabled:{
        type: DataTypes.BOOLEAN
    },
    objectordergizifk: {
      type: DataTypes.CHAR(32),
      allowNull: true
    },
    objectantreanpemeriksaanfk: {
      type: DataTypes.CHAR(32),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 't_ordergizidetail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_ordergizidetail_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}