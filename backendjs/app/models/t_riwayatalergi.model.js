import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_riwayatalergi extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      primaryKey: true
    },
    norecreferenci: {
      type: DataTypes.CHAR(32),
      allowNull: true
    },
    namaalergi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    objectjenisalergifk:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectlinkfk: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 's_linkmenu',
        key: 'id'
      }
    },
    ihs_id: {
      type: DataTypes.CHAR(50)
    },
    objectterminologikfafk:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 't_riwayatalergi',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_riwayatalergi_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
