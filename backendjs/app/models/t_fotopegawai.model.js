import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_fotopegawai extends Model {
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
    kdprofile: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    objectpegawaifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_pegawai',
        key: 'id'
      }
    },
    urifoto: {
      type: DataTypes.TEXT,
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
    }
  }, {
    sequelize,
    tableName: 't_fotopegawai',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "m_fotopegawai_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
