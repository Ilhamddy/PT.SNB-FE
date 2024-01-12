import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_asesmenawaligd_fisik extends Model {
  // eslint-disable-next-line max-lines-per-function
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      primaryKey: true
    },
    objectasesmenawaligd: {
      type: DataTypes.CHAR(32),
      allowNull: true
    },
    objectterminologifk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    keterangan: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 't_asesmenawaligd_fisik',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_asesmenawaligd_fisik_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
