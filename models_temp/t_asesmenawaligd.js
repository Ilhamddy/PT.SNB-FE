import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_asesmenawaligd extends Model {
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
    isnyeri: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isnyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    skalanyeri: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    skalanyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    objectterminologilokasinyerifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_terminologi',
        key: 'id'
      }
    },
    lokasinyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    penyebabnyeri: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    penyebabnyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    durasi: {
      type: DataTypes.REAL,
      allowNull: true
    },
    objectsatuannyerifk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_satuan',
        key: 'id'
      }
    },
    durasinyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    frekuensinyeri: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    frekuensinyeri_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mfs_skorjatuh: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_penyakit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_alatbantujalan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_infus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_carajalan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_statusmental: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mfs_totalskor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectinterpretasimfsfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_interpretasi',
        key: 'id'
      }
    },
    mfs_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    hds_usia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_jeniskelamin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_diagnosa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_gangguankognitif: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_lingkungan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_pembedahan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_medikamentosa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hds_totalskor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectinterpretasihdsfk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'm_interpretasi',
        key: 'id'
      }
    },
    hds_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    objectttvfk: {
      type: DataTypes.CHAR(32),
      allowNull: true,
      references: {
        model: 't_ttv',
        key: 'norec'
      }
    },
    fisik_kepala: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    kepala_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_mata: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mata_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_telinga: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telinga_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_hidung: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    hidung_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_rambut: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    rambut_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_bibir: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bibir_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_gigi: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gigi_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_lidah: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lidah_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_langitlangit: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    langitlangit_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_leher: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    leher_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_tenggorokan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tenggorokan_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_tonsil: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tonsil_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_dada: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dada_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_payudara: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    payudara_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_punggung: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    punggung_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_perut: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    perut_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_genital: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    genital_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_anus: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    anus_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_lenganatas: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lenganatas_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_lenganbawah: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lenganbawah_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_jaritangan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    jaritangan_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_kukutangan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    kukutangan_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_persendiantangan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    persendiantangan_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_tungkaiatas: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tungkaiatas_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_tungkaibawah: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tungkaibawah_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_jarikaki: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    jarikaki_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_kukukaki: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    kukukaki_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fisik_persendiankaki: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    persendiankaki_ihs_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 't_asesmenawaligd',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "t_asesmenawaligd_pkey",
        unique: true,
        fields: [
          { name: "norec" },
        ]
      },
    ]
  });
  }
}
