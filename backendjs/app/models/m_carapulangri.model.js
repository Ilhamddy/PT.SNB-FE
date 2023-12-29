import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class m_carapulangri extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kdprofile: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    statusenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    reportdisplay: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    kodeexternal: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    tglinput: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tglupdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    objectpegawaiinputfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_pegawai',
        key: 'id'
      }
    },
    objectpegawaiupdatefk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_pegawai',
        key: 'id'
      }
    },
    ihs_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ihs_display: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ihs_definition: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'm_carapulangri',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "m_carapulangri_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
