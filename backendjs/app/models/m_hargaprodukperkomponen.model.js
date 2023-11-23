import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class m_hargaprodukperkomponen extends Model {
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
      allowNull: true
    },
    kodeexternal: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    namaexternal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reportdisplay: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    objectasalprodukfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_asalproduk',
        key: 'id'
      }
    },
    objecttotalhargaprodukbykelasfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_totalhargaprodukbykelas',
        key: 'id'
      }
    },
    objectjenistariffk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_jenistarif',
        key: 'id'
      }
    },
    objectkomponenprodukfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_komponenproduk',
        key: 'id'
      }
    },
    objectmatauangfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_matauang',
        key: 'id'
      }
    },
    harga: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    hargasatuan: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    qtycurrentstok: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    tglberlakuakhir: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tglberlakuawal: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tglkadaluarsalast: {
      type: DataTypes.DATE,
      allowNull: true
    },
    objectjenispelayananfk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectsuratkeputusanfk: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'm_hargaprodukperkomponen',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "m_hargaproduk_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
