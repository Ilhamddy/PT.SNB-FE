import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import(".").SequelizeInstance} Sequelize
 */
export default class t_skriningigd extends Model {
  // eslint-disable-next-line max-lines-per-function
  static init(sequelize, DataTypes) {
  return super.init({
    norec: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      primaryKey: true
    },
    objectemrpasienfk: {
      type: DataTypes.CHAR(32),
      allowNull: true,
      references: {
        model: 't_emrpasien',
        key: 'norec'
      }
    },
    statusenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tglinput: {
      type: DataTypes.DATE,
      allowNull: true
    },
    risikodecubitus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    batuk_demam: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    batuk_keringat: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    batuk_daerahwabah: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    batuk_obatjangkapanjang: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    batuk_bbturun: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gizi_bbturun: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gizi_nafsumakan: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gizi_gejala: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gizi_komorbid: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gizi_fungsional: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 't_skriningigd',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_skriningigd_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
