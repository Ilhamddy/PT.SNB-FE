import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_riwayatobatpasien extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
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
    reportdisplay: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    objectpasienigdfk: {
      type: DataTypes.CHAR(32),
      allowNull: true
    },
    kode_r: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    objectprodukfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_produk',
        key: 'id'
      }
    },
    objectsignafk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_signa',
        key: 'id'
      }
    },
    objectketeranganresepfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_keteranganresep',
        key: 'id'
      }
    },
    objectlinkmenufk: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 's_linkmenu',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 't_riwayatobatpasien',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_riwayatobatpasien_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
