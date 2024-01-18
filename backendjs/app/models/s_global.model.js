import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class s_global extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    s_key: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    s_value: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    s_label: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    statusenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 's_global',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "s_global_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
