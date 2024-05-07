import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_odontogramdetail extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      primaryKey: true
    },
    objectodontogramfk: {
      type: DataTypes.CHAR(32),
      allowNull: true,
      references: {
        model: 't_odontogram',
        key: 'norec'
      }
    },
    objectgigifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_gigi',
        key: 'id'
      }
    },
    lokasi: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    objectlegendgigifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_legendgigi',
        key: 'id'
      }
    },
    objectgigitujuanfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_gigi',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 't_odontogramdetail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_odontogramdetail_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
