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
    },
    objectocclusifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_keteranganodontogram',
        key: 'id'
      }
    },
    objecttoruspalatinusfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_keteranganodontogram',
        key: 'id'
      }
    },
    objecttorusmandibularisfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_keteranganodontogram',
        key: 'id'
      }
    },
    objectpalatumfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_keteranganodontogram',
        key: 'id'
      }
    },
    diastema: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gigianomali: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lainlain: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    d: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    m: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    f: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jumlahfoto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectjenisfotofk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_keteranganodontogram',
        key: 'id'
      }
    },
    jumlahrontgenfoto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectjenisrontgenfotofk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_keteranganodontogram',
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
