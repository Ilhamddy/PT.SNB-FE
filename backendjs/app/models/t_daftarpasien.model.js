import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class t_daftarpasien extends Model {
    // eslint-disable-next-line max-lines-per-function
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
            nocmfk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'm_pasien',
                key: 'id'
            }
            },
            noregistrasi: {
            type: DataTypes.STRING(200),
            allowNull: true
            },
            objectdokterpemeriksafk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_pegawai',
                key: 'id'
            }
            },
            objectpegawaifk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_pegawai',
                key: 'id'
            }
            },
            objectkelasfk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_kelas',
                key: 'id'
            }
            },
            objectkelompokpasienlastfk: {
            type: DataTypes.INTEGER,
            allowNull: true
            },
            objectkondisipasienfk: {
            type: DataTypes.INTEGER,
            allowNull: true
            },
            pembawapasien: {
            type: DataTypes.STRING(40),
            allowNull: true
            },
            objecthubunganpembawapasienfk: {
            type: DataTypes.INTEGER,
            allowNull: true
            },
            objectpenyebabkematianfk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_penyebabkematian',
                key: 'id'
            }
            },
            objectpenjaminfk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_rekanan',
                key: 'id'
            }
            },
            objectpenjamin2fk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_rekanan',
                key: 'id'
            }
            },
            objectpenjamin3fk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_rekanan',
                key: 'id'
            }
            },
            objectunitlastfk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_unit',
                key: 'id'
            }
            },
            statuspasien: {
            type: DataTypes.STRING(255),
            allowNull: true
            },
            objectstatuspulangfk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_statuspulang',
                key: 'id'
            }
            },
            tglpulang: {
            type: DataTypes.DATE,
            allowNull: true
            },
            tglregistrasi: {
            type: DataTypes.DATE,
            allowNull: true
            },
            objectunitasalfk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_unit',
                key: 'id'
            }
            },
            keteranganpenyebabkematian: {
            type: DataTypes.STRING(255),
            allowNull: true
            },
            isclosing: {
            type: DataTypes.BOOLEAN,
            allowNull: true
            },
            tglclosing: {
            type: DataTypes.DATE,
            allowNull: true
            },
            catatan: {
            type: DataTypes.STRING(500),
            allowNull: true
            },
            statuskirimdokumen: {
            type: DataTypes.INTEGER,
            allowNull: true
            },
            tgltutuplayananpasien: {
            type: DataTypes.DATE,
            allowNull: true
            },
            sensus: {
            type: DataTypes.BOOLEAN,
            allowNull: true
            },
            tanggalrawat: {
            type: DataTypes.DATE,
            allowNull: true
            },
            keterangan: {
            type: DataTypes.TEXT,
            allowNull: true
            },
            objectpjpasienfk: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            references: {
                model: 'm_hubungankeluarga',
                key: 'id'
            }
            },
            namapjpasien: {
            type: DataTypes.STRING,
            allowNull: true
            },
            objectasalrujukanfk: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            references: {
                model: 'm_asalrujukan',
                key: 'id'
            }
            },
            objectinstalasifk: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            references: {
                model: 'm_instalasi',
                key: 'id'
            }
            },
            nohppj: {
            type: DataTypes.STRING,
            allowNull: true
            },
            objectjenispenjaminfk: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            references: {
                model: 'm_jenispenjamin',
                key: 'id'
            }
            },
            objectcarapulangrifk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_carapulangri',
                key: 'id'
            }
            },
            objectkondisipulangrifk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_kondisipulangri',
                key: 'id'
            }
            },
            objectstatuspulangrifk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_statuspulangri',
                key: 'id'
            }
            },
            pembawapulang: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
            objecthubungankeluargapembawafk: {
            type: DataTypes.INTEGER,
            allowNull: true
            },
            tglmeninggal: {
            type: DataTypes.DATE,
            allowNull: true
            },
            tglkeluar: {
            type: DataTypes.DATE,
            allowNull: true
            },
            objectdokterperujukfk: {
            type: DataTypes.INTEGER,
            allowNull: true
            },
            faskestujuan: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
            namafaskes: {
            type: DataTypes.STRING(100),
            allowNull: true
            },
            tglrujuk: {
            type: DataTypes.DATE,
            allowNull: true
            },
            alasanrujuk: {
            type: DataTypes.STRING(255),
            allowNull: true
            },
            objectcaramasukfk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_caramasuk',
                key: 'id'
            }
            },
            cbg_code: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
            cbg_description: {
            type: DataTypes.STRING(150),
            allowNull: true
            },
            cbg_tarif: {
            type: DataTypes.REAL,
            allowNull: true
            },
            cbg_mdc_number: {
            type: DataTypes.STRING(5),
            allowNull: true
            },
            cbg_mdc_description: {
            type: DataTypes.STRING(150),
            allowNull: true
            },
            cbg_drg_code: {
            type: DataTypes.STRING(15),
            allowNull: true
            },
            cbg_drg_description: {
            type: DataTypes.STRING(200),
            allowNull: true
            },
            add_payment_amt: {
            type: DataTypes.REAL,
            allowNull: true
            },
            status_grouping: {
            type: DataTypes.STRING(15),
            allowNull: true
            },
            objectjenispelayananfk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_jenispelayanan',
                key: 'id'
            }
            },
            isprinted: {
            type: DataTypes.BOOLEAN,
            allowNull: true
            },
            nominalklaim: {
            type: DataTypes.REAL,
            allowNull: true
            },
            caradaftar: {
            type: DataTypes.STRING(20),
            allowNull: true
            },
            ihs_id: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
            ihs_reference: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
            objectnaikturunkelasfk: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_naikturunkelas',
                key: 'id'
            }
            },
            tarifnaikkelas: {
            type: DataTypes.REAL,
            allowNull: true
            }
        }, {
            sequelize,
            tableName: 't_daftarpasien',
            schema: 'public',
            timestamps: false,
            indexes: [
            {
                name: "t_daftarpasien_pkey",
                unique: true,
                fields: [
                { name: "norec" },
                ]
            },
            ]
        });
    }
}
