import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_ordergizi extends Model {
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
    objectjenisordergizifk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectdiet1fk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectdiet2fk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectdiet3fk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectkategoridietfk: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    objectmakananfk: {
    type: DataTypes.INTEGER,
    allowNull: true
    },
    keterangan: {
    type: DataTypes.STRING(100),
    allowNull: true
    },
    tglinput:{
    type: DataTypes.DATE,
    allowNull: true
    },
    nomororder:{
    type: DataTypes.STRING(50),
    allowNull: true
    },
    tglorder:{
    type: DataTypes.DATE,
    allowNull: true
    },
    isverif:{
      type: DataTypes.BOOLEAN
    },
    tglverif:{
      type: DataTypes.DATE,
      allowNull: true
      },
    objectpegawaiinputfk: {
      type: DataTypes.INTEGER,
      allowNull: true
      },
    objectpegawaiveriffk: {
      type: DataTypes.INTEGER,
      allowNull: true
      },
  }, {
    sequelize,
    tableName: 't_ordergizi',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_ordergizi_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
