import React, { useEffect, useState, useCallback } from 'react';
import withRouter from '../../../Components/Common/withRouter';
import UiContent from '../../../Components/Common/UiContent';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Progress, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import SkalaNyeri from '../../../Components/SkalaNyeri/SkalaNyeri';
import { useFormik } from "formik"; //yupToFormErrors
import * as Yup from "yup";
import { useDate } from '../../../utils/format';
import { saveEmrTriageIgd, getGetComboTriageIgd, emrResetForm,getHistoriTriagiByNorec,
    getComboKfa,getComboRiwayatPenyakitPribadi } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomSelect from '../../Select/Select';
import { useNavigate,useParams } from 'react-router-dom';
import { TabelResep, initValueResep, useResepRef, validationResep } from '../../PenjualanObatBebas/KomponenResep';

const TriageIGD = () => {
    document.title = "Triage IGD";
    const { norec } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newData, successSave, data,dataHistory,dataComboKfa,dataComboRiwayatPenyakitPribadi } = useSelector((state) => ({
        newData: state.Emr.saveEmrTriageIgd.data,
        successSave: state.Emr.saveEmrTriageIgd.success,
        data: state.Emr.getGetComboTriageIgd.data,
        dataHistory: state.Emr.getHistoriTriagiByNorec.data,
        dataComboKfa:state.Emr.getComboKfa.data || [],
        dataComboRiwayatPenyakitPribadi:state.Emr.getComboRiwayatPenyakitPribadi.data || []
    }));

    const resepRef = useResepRef()

    const { tanggal, waktu } = useDate()
    const vSetValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norec: '',
            namapasien: "",
            umurpasien: "",
            tglkedatangan: '',
            namakeluarga: '',
            hubungankeluarga: '',
            nohpkeluarga: '',
            keluhan: '',
            riwayatpenyakit: '',
            skalanyeri: '',
            airway: '',
            breathing: '',
            circulation: '',
            disability: '',
            kondisimental: '',
            tingkatdarurat: '',
            rencanaterapi:'',
            transportasiKedatangan:'',
            keluhanUtama:'',
            alergiMakanan:'',
            alergiObat:'',
            alergiLingkungan:'',
            resep: [
                {
                    ...initValueResep
                }
            ],
            statusRujukan:''
        },
        validationSchema: Yup.object({
            tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
            // resep: validationResep(false)
        }),
        onSubmit: (values) => {
            console.log(values);
            // handleNextStep()
            dispatch(saveEmrTriageIgd(values, () => {
                // dispatch(lainLainGet())
            }));

        }
    })
    // console.log(vSetValidation.errors)
    const [skala, setSkalaNyeri] = useState(0)
    const onClickSkalaNyeri = (q) => {
        setSkalaNyeri(q)
        vSetValidation.setFieldValue('skalanyeri', q)
    }
    const onClickCardAirway = (e) => {
        vSetValidation.setFieldValue('airway', e)
    }
    const onClickCardBreathing = (e) => {
        vSetValidation.setFieldValue('breathing', e)
    }
    const onClickCardCirculation = (e) => {
        vSetValidation.setFieldValue('circulation', e)
    }
    const onClickCardDisability = (e) => {
        vSetValidation.setFieldValue('disability', e)
    }
    const onClickCardKondisiMental = (e) => {
        vSetValidation.setFieldValue('kondisimental', e)
    }
    const dataAirway = [
        {
            value: 1,
            label: 'Obstruksi / partial obstruksi',
            color: '#B7DBFD',
            lg: 2
        },
        {
            value: 2,
            label: 'Bebas',
            color: '#FDB7B7',
            lg: 2
        },
        {
            value: 3,
            label: 'Bebas',
            color: '#FCFDB7',
            lg: 2
        },
        {
            value: 4,
            label: 'Bebas',
            color: '#B8FDB7',
            lg: 2
        },
        {
            value: 5,
            label: 'Bebas',
            color: '#EBEBEB',
            lg: 3
        }
    ]
    const dataBreathing = [
        {
            value: 1,
            label: 'Distress napas berat / henti napas',
            color: '#B7DBFD',
            lg: 2
        },
        {
            value: 2,
            label: 'Distress napas ringan sedang',
            color: '#FDB7B7',
            lg: 2
        },
        {
            value: 3,
            label: 'Normal',
            color: '#FCFDB7',
            lg: 2
        },
        {
            value: 4,
            label: 'Normal',
            color: '#B8FDB7',
            lg: 2
        },
        {
            value: 5,
            label: 'Normal',
            color: '#EBEBEB',
            lg: 3
        }
    ]
    const dataCirculation = [
        {
            value: 1,
            label: 'Gangguan hemodinamik berat / perdarahan tak terkontrol',
            color: '#B7DBFD',
            lg: 2
        },
        {
            value: 2,
            label: 'Gangguan hemodinamik sedang / ringan',
            color: '#FDB7B7',
            lg: 2
        },
        {
            value: 3,
            label: 'Stabil',
            color: '#FCFDB7',
            lg: 2
        },
        {
            value: 4,
            label: 'Stabil',
            color: '#B8FDB7',
            lg: 2
        },
        {
            value: 5,
            label: 'Stabil',
            color: '#EBEBEB',
            lg: 3
        }
    ]
    const dataDisability = [
        {
            value: 1,
            label: 'Unresponsive / respon to pain',
            color: '#B7DBFD',
            lg: 2
        },
        {
            value: 2,
            label: 'Alert, Respon to verbal',
            color: '#FDB7B7',
            lg: 2
        },
        {
            value: 3,
            label: 'Alert',
            color: '#FCFDB7',
            lg: 2
        },
        {
            value: 4,
            label: 'Alert',
            color: '#B8FDB7',
            lg: 2
        },
        {
            value: 5,
            label: 'Alert',
            color: '#EBEBEB',
            lg: 3
        }
    ]
    const dataKondisiMental = [
        {
            value: 2,
            label: 'Tidak Kooperatif',
            color: '#FDB7B7',
            lg: 2
        },
        {
            value: 3,
            label: 'Kooperatif',
            color: '#FCFDB7',
            lg: 2
        },
        {
            value: 4,
            label: 'Kooperatif',
            color: '#B8FDB7',
            lg: 2
        },
        {
            value: 5,
            label: 'Kooperatif',
            color: '#EBEBEB',
            lg: 3
        }
    ]
    const [dataHubungan, setdataHubungan] = useState([]);
    const [dataTingkatDarurat, setdataTingkatDarurat] = useState([]);
    useEffect(() => {
        if (data) {
            let newArray = data?.mhubungankeluarga || [];
            newArray.push({ value: '', label: 'Isi Hubungan Keluarga' });
            setdataHubungan(newArray.sort((a, b) => a.value - b.value))
        }
    }, [data])
    useEffect(() => {
        if (vSetValidation.values.airway) {
            let tempArray = []
            if (vSetValidation.values.airway) {
                tempArray.push({ value: vSetValidation.values.airway });
            }
            if (vSetValidation.values.breathing) {
                tempArray.push({ value: vSetValidation.values.breathing });
            }

            if (vSetValidation.values.circulation) {
                tempArray.push({ value: vSetValidation.values.circulation });
            }

            if (vSetValidation.values.disability) {
                tempArray.push({ value: vSetValidation.values.disability });
            }

            if (vSetValidation.values.kondisimental) {
                tempArray.push({ value: vSetValidation.values.kondisimental });
            }

            let newArray = data?.mdaruratigd?.filter(function (el) {
                return tempArray.some(item => item.value === el.value);
            }) || [];
            newArray.push({ value: '', label: 'Isi Tingkat Kedaruratan' });
            setdataTingkatDarurat(newArray.sort((a, b) => a.value - b.value))
        }

    }, [vSetValidation.values.airway, vSetValidation.values.breathing,
    vSetValidation.values.circulation, vSetValidation.values.disability, vSetValidation.values.kondisimental, data?.mdaruratigd])
    const handleBack = (e) => {
        navigate(-1)
    }
    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        norec && dispatch(getHistoriTriagiByNorec({norec:norec}));
    }, [dispatch, norec]);
    useEffect(() => { 
        dispatch(getGetComboTriageIgd(''))
        dispatch(getComboRiwayatPenyakitPribadi({ nama: '' }));
        dispatch(getComboKfa({ nama: '' }));
    }, [dispatch])
    useEffect(() => {
        if (dataHistory && data) {
            if (dataHistory[0] !== undefined) {
            const setFF = vSetValidation.setFieldValue
            setFF("norec", dataHistory[0].norec || "")
            setFF("namapasien", dataHistory[0].namapasien || "")
            setFF("umurpasien", dataHistory[0].umur || "")
            setFF("keluhan", dataHistory[0].keluhan || "")
            setFF("namakeluarga", dataHistory[0].namapj || "")
            setFF("nohpkeluarga", dataHistory[0].nohp || "")
            setFF("tglkedatangan", dataHistory[0].tglinput || "")
            // console.log(dataHistory[0].riwayatpenyakit)
            setFF("riwayatpenyakit", dataHistory[0].riwayatpenyakit || "")
            setFF("riwayatobat", dataHistory[0].riwayatobat || "")
            setFF("skalanyeri", dataHistory[0].skalanyeri || "")
            setFF("airway", dataHistory[0].airway || "")
            setFF("breathing", dataHistory[0].breathing || "")
            setFF("circulation", dataHistory[0].circulation || "")
            setFF("disability", dataHistory[0].disability || "")
            setFF("kondisimental", dataHistory[0].kondisimental || "")
            setFF("tingkatdarurat", dataHistory[0].objectdaruratigdfk || "")
            setFF("rencanaterapi", dataHistory[0].rencanaterapi || "")
            setFF("keluhanUtama", dataHistory[0].objectterminologikeluhanfk || "")
            setFF("transportasiKedatangan", dataHistory[0].objecttransportasikedatanganfk || "")
            setFF("alergiMakanan", dataHistory[0].riwayatalergimakanan || "")
            setFF("alergiObat", dataHistory[0].riwayatalergiobat || "")
            setFF("alergiLingkungan", dataHistory[0].riwayatalergilingkungan || "")
            setFF("hubungankeluarga", dataHistory[0].objecthubunganpjfk || "")
            setFF("statusRujukan", dataHistory[0].status_rujukan || "")
            setSkalaNyeri(dataHistory[0].skalanyeri)
            }
        }
    }, [data,dataHistory,vSetValidation.setFieldValue])
    const handleComboKfa = characterEntered => {
        if (characterEntered.length > 3) {
          dispatch(getComboKfa({ nama: characterEntered }));
        }
      };
      const handleComboRiwayatPenyaktiPribadi = characterEntered => {
        if (characterEntered.length > 3) {
        //   dispatch(getComboRiwayatPenyakitPribadi({ nama: characterEntered }));
        }
      };
    const [stateTidakObat, setstateTidakObat] = useState(true)
    const [stateTidakMakanan, setstateTidakMakanan] = useState(true)
    const [stateTidakLingkungan, setstateTidakLingkungan] = useState(true)
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Input Pasien Triage" pageTitle="Forms" />
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            vSetValidation.handleSubmit();
                            return false;
                        }}
                        className="gy-4"
                        action="#">
                        <Card>
                            <CardHeader className="card-header-snb">
                                <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Identitas Pasien IGD</h4>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg={6}>
                                        <Row className="gy-2">
                                            <Col lg={4}>
                                                <div className="mt-2">
                                                    <Label className="form-label">Nama Pasien</Label>
                                                </div>
                                            </Col>
                                            <Col lg={8}>
                                                <Input
                                                    id="namapasien"
                                                    name="namapasien"
                                                    type="text"
                                                    placeholder='Masukan Nama Pasien'
                                                    onChange={vSetValidation.handleChange}
                                                    onBlur={vSetValidation.handleBlur}
                                                    value={vSetValidation.values.namapasien || ''}
                                                    invalid={
                                                        vSetValidation.touched.namapasien && vSetValidation.errors.namapasien ? true : false
                                                    }
                                                />
                                                {vSetValidation.touched.namapasien && vSetValidation.errors.namapasien ? (
                                                    <FormFeedback type="invalid"><div>{vSetValidation.errors.namapasien}</div></FormFeedback>
                                                ) : null}
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mt-2">
                                                    <Label className="form-label">Umur</Label>
                                                </div>
                                            </Col>
                                            <Col lg={8}>
                                                <Input
                                                    id="umurpasien"
                                                    name="umurpasien"
                                                    type="text"
                                                    onChange={vSetValidation.handleChange}
                                                    onBlur={vSetValidation.handleBlur}
                                                    value={vSetValidation.values.umurpasien || ''}
                                                    placeholder='Masukan Umur Pasien'
                                                />
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mt-2">
                                                    <Label className="form-label">Tgl. Kedatangan</Label>
                                                </div>
                                            </Col>
                                            <Col lg={8}>
                                                <Input
                                                    id="tglkedatangan"
                                                    name="tglkedatangan"
                                                    type="text"
                                                    value={vSetValidation.values.tglkedatangan || tanggal + ' ' + waktu}
                                                    onChange={vSetValidation.handleChange}
                                                    onBlur={vSetValidation.handleBlur}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={6}>
                                        <Row className="gy-2">
                                            <Col lg={4}>
                                                <div className="mt-2">
                                                    <Label className="form-label">Nama Keluarga</Label>
                                                </div>
                                            </Col>
                                            <Col lg={8}>
                                                <Input
                                                    id="nohp"
                                                    name="namakeluarga"
                                                    type="text"
                                                    value={vSetValidation.values.namakeluarga || ''}
                                                    placeholder='Nama Keluarga'
                                                    onChange={vSetValidation.handleChange}
                                                    onBlur={vSetValidation.handleBlur}
                                                />
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mt-2">
                                                    <Label className="form-label">Hubungan Keluarga</Label>
                                                </div>
                                            </Col>
                                            <Col lg={8}>
                                                <CustomSelect
                                                    id="hubungankeluarga"
                                                    name="hubungankeluarga"
                                                    options={dataHubungan || []}
                                                    onChange={(e) => {
                                                        vSetValidation.setFieldValue('hubungankeluarga', e?.value || '')
                                                    }}
                                                    value={vSetValidation.values.hubungankeluarga}
                                                    className={`input row-header ${!!vSetValidation?.errors.hubungankeluarga ? 'is-invalid' : ''
                                                        }`}
                                                />
                                                {vSetValidation.touched.hubungankeluarga &&
                                                    !!vSetValidation.errors.hubungankeluarga && (
                                                        <FormFeedback type="invalid">
                                                            <div>{vSetValidation.errors.hubungankeluarga}</div>
                                                        </FormFeedback>
                                                    )}
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mt-2">
                                                    <Label className="form-label">No. Hp Keluarga</Label>
                                                </div>
                                            </Col>
                                            <Col lg={8}>
                                                <Input
                                                    id="nohpkeluarga"
                                                    name="nohpkeluarga"
                                                    type="text"
                                                    value={vSetValidation.values.nohpkeluarga || ''}
                                                    placeholder='No. Hp Keluarga'
                                                    onChange={vSetValidation.handleChange}
                                                    onBlur={vSetValidation.handleBlur}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="card-header-snb">
                                <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Triage IGD Terintegrasi</h4>
                            </CardHeader>
                            <CardBody>
                                <Row className="gy-2">
                                <Col lg={4}><div className="mt-2">
                                        <Label className="form-label">Transportasi Kedatangan</Label>
                                    </div></Col>
                                    <Col lg={6}>
                                        <CustomSelect
                                            id="transportasiKedatangan"
                                            name="transportasiKedatangan"
                                            options={data.transportasi}
                                            onChange={(e) => {
                                                vSetValidation.setFieldValue('transportasiKedatangan', e?.value || '')
                                            }}
                                            value={vSetValidation.values.transportasiKedatangan}
                                            className={`input row-header ${
                                                !!vSetValidation?.errors.transportasiKedatangan ? 'is-invalid' : ''
                                            }`}
                                            />
                                        {vSetValidation.touched.transportasiKedatangan &&
                                            !!vSetValidation.errors.transportasiKedatangan && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidation.errors.transportasiKedatangan}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={4}><div className="mt-2">
                                        <Label className="form-label">Status Rujukan</Label>
                                    </div></Col>
                                    <Col lg={6}>
                                        <CustomSelect
                                            id="statusRujukan"
                                            name="statusRujukan"
                                            options={data.yatidak}
                                            onChange={(e) => {
                                                vSetValidation.setFieldValue('statusRujukan', e?.value || '')
                                            }}
                                            value={vSetValidation.values.statusRujukan}
                                            className={`input row-header ${
                                                !!vSetValidation?.errors.statusRujukan ? 'is-invalid' : ''
                                            }`}
                                            />
                                        {vSetValidation.touched.statusRujukan &&
                                            !!vSetValidation.errors.statusRujukan && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidation.errors.statusRujukan}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={4}><div className="mt-2">
                                        <Label className="form-label">Keluhan</Label>
                                    </div></Col>
                                    <Col lg={4}>
                                        <CustomSelect
                                            id="keluhanUtama"
                                            name="keluhanUtama"
                                            options={data?.keluhanutama || []}
                                            onChange={(e) => {
                                                vSetValidation.setFieldValue('keluhanUtama', e?.value || '')
                                            }}
                                            value={vSetValidation.values.keluhanUtama}
                                            className={`input row-header ${
                                                !!vSetValidation?.errors.keluhanUtama ? 'is-invalid' : ''
                                            }`}
                                            isClearEmpty
                                            placeholder='Keluhan Utama'
                                            />
                                        {vSetValidation.touched.keluhanUtama &&
                                            !!vSetValidation.errors.keluhanUtama && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidation.errors.keluhanUtama}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={4}>
                                        <Input
                                            id="keluhan"
                                            name="keluhan"
                                            type="textarea"
                                            value={vSetValidation.values.keluhan || ''}
                                            placeholder='Detail Keluhan'
                                            onChange={vSetValidation.handleChange}
                                            onBlur={vSetValidation.handleBlur}
                                        />
                                    </Col>
                                    <Col lg={4}><div className="mt-2">
                                        <Label className="form-label">Riwayat Penyakit</Label>
                                    </div></Col>
                                    <Col lg={8}>
                                        <CustomSelect
                                            id="riwayatpenyakit"
                                            name="riwayatpenyakit"
                                            options={dataComboRiwayatPenyakitPribadi?.list || []}
                                            onChange={(e) => {
                                                vSetValidation.setFieldValue('riwayatpenyakit', e || '')
                                            }}
                                            value={vSetValidation.values.riwayatpenyakit||[]}
                                            className={`input row-header ${
                                                !!vSetValidation?.errors.riwayatpenyakit ? 'is-invalid' : ''
                                            }`}
                                            onInputChange={handleComboRiwayatPenyaktiPribadi}
                                            isMulti
                                            isClearEmpty
                                            />
                                        {vSetValidation.touched.riwayatpenyakit &&
                                            !!vSetValidation.errors.riwayatpenyakit && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidation.errors.riwayatpenyakit}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={4}><div className="mt-2">
                                        <Label className="form-label">Riwayat Alergi</Label>
                                    </div></Col>
                                    <Col lg={8}>
                                        <Row className='gy-2'>
                                            <Col lg={3}><div className="mt-2">
                                                <Label className="form-label">Makanan</Label>
                                            </div></Col>
                                           
                                            <Col lg={9}>
                                                <CustomSelect
                                                    id="alergiMakanan"
                                                    name="alergiMakanan"
                                                    options={data?.alergi||[]}
                                                    onChange={(e) => {
                                                        vSetValidation.setFieldValue('alergiMakanan', e || '')
                                                    }}
                                                    value={vSetValidation.values.alergiMakanan || []}
                                                    className={`input row-header ${
                                                        !!vSetValidation?.errors.alergiMakanan ? 'is-invalid' : ''
                                                    }`}
                                                    isClearEmpty
                                                    isDisabled={stateTidakMakanan}
                                                    isMulti
                                                    />
                                                {vSetValidation.touched.alergiMakanan &&
                                                    !!vSetValidation.errors.alergiMakanan && (
                                                        <FormFeedback type="invalid">
                                                            <div>{vSetValidation.errors.alergiMakanan}</div>
                                                        </FormFeedback>
                                                    )}
                                            </Col>
                                            <Col lg={3}><div className="mt-2">
                                                <Label className="form-label">Obat-Obatan</Label>
                                            </div></Col>
                                            
                                            <Col lg={9}>
                                            <CustomSelect
                                                id="alergiObat"
                                                name="alergiObat"
                                                options={dataComboKfa?.list || []}
                                                onChange={(e) => {
                                                vSetValidation.setFieldValue('alergiObat', e || '')
                                                // vSetValidation.setFieldValue('codealergiObat', e?.code || '')
                                                // vSetValidation.setFieldValue('displayalergiObat', e?.label || '')
                                                }}
                                                onInputChange={handleComboKfa}
                                                value={vSetValidation.values.alergiObat||[]}
                                                className={`input row-header ${!!vSetValidation?.errors.alergiObat ? 'is-invalid' : ''
                                                }`}
                                                isClearEmpty
                                                isDisabled={stateTidakObat}
                                                isMulti
                                            />
                                                {vSetValidation.touched.yatidakObat &&
                                                    !!vSetValidation.errors.yatidakObat && (
                                                        <FormFeedback type="invalid">
                                                            <div>{vSetValidation.errors.yatidakObat}</div>
                                                        </FormFeedback>
                                                    )}
                                            </Col>
                                            <Col lg={3}><div className="mt-2">
                                                <Label className="form-label">Lingkungan</Label>
                                            </div></Col>
                                            
                                            <Col lg={9}>
                                                <CustomSelect
                                                    id="alergiLingkungan"
                                                    name="alergiLingkungan"
                                                    options={data?.alergi||[]}
                                                    onChange={(e) => {
                                                        vSetValidation.setFieldValue('alergiLingkungan', e || '')
                                                    }}
                                                    value={vSetValidation.values.alergiLingkungan || []}
                                                    className={`input row-header ${
                                                        !!vSetValidation?.errors.alergiLingkungan ? 'is-invalid' : ''
                                                    }`}
                                                    isClearEmpty
                                                    isDisabled={stateTidakLingkungan}
                                                    isMulti
                                                    />
                                                {vSetValidation.touched.alergiLingkungan &&
                                                    !!vSetValidation.errors.alergiLingkungan && (
                                                        <FormFeedback type="invalid">
                                                            <div>{vSetValidation.errors.alergiLingkungan}</div>
                                                        </FormFeedback>
                                                    )}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={4}><div className="mt-2">
                                        <Label className="form-label">Riwayat Obat Terdahulu</Label>
                                    </div></Col>
                                    <Col lg={12}>
                                        <TabelResep 
                                            vResep={vSetValidation}
                                            resepRef={resepRef}
                                            isQty={false}
                                            isAllObat
                                            isRacikan={false}
                                            nameNonRacikan='Riwayat Obat'
                                            />
                                    </Col>
                                    <Col lg={4}>
                                        <Label className="form-label">Skala Nyeri</Label>
                                    </Col>
                                    <Col lg={8}>
                                        <SkalaNyeri
                                            quantity={skala}
                                            // onQuantityChange={(q) => setSkalaNyeri(q)}
                                            onQuantityChange={(q) => onClickSkalaNyeri(q)}
                                        />
                                    </Col>
                                    <Col lg={2}>
                                        <Label className="form-label">Pengkajian</Label>
                                    </Col>
                                    <Col lg={10}>
                                        <Row className="gy-2">
                                            <Col lg={1}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Pengkajian</Label>
                                                </div>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B7DBFD', height: '50px', borderRadius: '100px' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">RESUSITASI</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FDB7B7', height: '50px', borderRadius: '100px' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">EMERGENCY</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FCFDB7', height: '50px', borderRadius: '100px' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">URGENT</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B8FDB7', height: '50px', borderRadius: '100px' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">NON URGENT</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={3}>
                                                <Card style={{ backgroundColor: '#EBEBEB', height: '50px', borderRadius: '100px' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">FALSE EMERGENCY</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="gy-2">
                                            <Col lg={1}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Airway</Label>
                                                </div>
                                            </Col>
                                            {(dataAirway || []).map((item, key) => (
                                                <Col key={key} lg={item.lg}>
                                                    <Card className="card-animate" style={{ backgroundColor: vSetValidation.values.airway === item.value ? item.color : '#FFFFFF' }} onClick={() => onClickCardAirway(item.value)}>
                                                        <CardBody>
                                                            <p style={{ textAlign: 'center' }}><span className="fw-small">{item.label}</span></p>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                        <Row className="gy-2">
                                            <Col lg={1}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Breathing</Label>
                                                </div>
                                            </Col>
                                            {(dataBreathing || []).map((item, key) => (
                                                <Col key={key} lg={item.lg}>
                                                    <Card className="card-animate" style={{ backgroundColor: vSetValidation.values.breathing === item.value ? item.color : '#FFFFFF' }} onClick={() => onClickCardBreathing(item.value)}>
                                                        <CardBody>
                                                            <p style={{ textAlign: 'center' }}><span className="fw-small">{item.label}</span></p>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                        <Row className="gy-2">
                                            <Col lg={1}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Circulation</Label>
                                                </div>
                                            </Col>
                                            {(dataCirculation || []).map((item, key) => (
                                                <Col key={key} lg={item.lg}>
                                                    <Card className="card-animate" style={{ backgroundColor: vSetValidation.values.circulation === item.value ? item.color : '#FFFFFF' }} onClick={() => onClickCardCirculation(item.value)}>
                                                        <CardBody>
                                                            <p style={{ textAlign: 'center' }}><span className="fw-small">{item.label}</span></p>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                        <Row className="gy-2">
                                            <Col lg={1}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Disability</Label>
                                                </div>
                                            </Col>
                                            {(dataDisability || []).map((item, key) => (
                                                <Col key={key} lg={item.lg}>
                                                    <Card className="card-animate" style={{ backgroundColor: vSetValidation.values.disability === item.value ? item.color : '#FFFFFF' }} onClick={() => onClickCardDisability(item.value)}>
                                                        <CardBody>
                                                            <p style={{ textAlign: 'center' }}><span className="fw-small">{item.label}</span></p>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                        <Row className="gy-2">
                                            <Col lg={2}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Kondisi Mental</Label>
                                                </div>
                                            </Col>
                                            <Col lg={1}>

                                            </Col>
                                            {(dataKondisiMental || []).map((item, key) => (
                                                <Col key={key} lg={item.lg}>
                                                    <Card className="card-animate" style={{ backgroundColor: vSetValidation.values.kondisimental === item.value ? item.color : '#FFFFFF' }} onClick={() => onClickCardKondisiMental(item.value)}>
                                                        <CardBody>
                                                            <p style={{ textAlign: 'center' }}><span className="fw-small">{item.label}</span></p>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Col>
                                    <Col lg={4}>
                                        <Label className="form-label">Tingkat Kedaruratan</Label>
                                    </Col>
                                    <Col lg={8}>
                                        <CustomSelect
                                            id="rencanaterapi"
                                            name="tingkatdarurat"
                                            options={dataTingkatDarurat || []}
                                            onChange={(e) => {
                                                vSetValidation.setFieldValue('tingkatdarurat', e?.value || '')
                                            }}
                                            value={vSetValidation.values.tingkatdarurat}
                                            className={`input row-header ${!!vSetValidation?.errors.tingkatdarurat ? 'is-invalid' : ''
                                                }`}
                                        />
                                        {vSetValidation.touched.tingkatdarurat &&
                                            !!vSetValidation.errors.tingkatdarurat && (
                                                <FormFeedback type="invalid">
                                                    <div>{vSetValidation.errors.tingkatdarurat}</div>
                                                </FormFeedback>
                                            )}
                                    </Col>
                                    <Col lg={4}>
                                        <Label className="form-label">Rencana Terapi</Label>
                                    </Col>
                                    <Col lg={8}>
                                        <Input
                                            id="rencanaterapi"
                                            name="rencanaterapi"
                                            type="textarea"
                                            value={vSetValidation.values.rencanaterapi || ''}
                                            placeholder='Rencana Terapi'
                                            onChange={vSetValidation.handleChange}
                                            onBlur={vSetValidation.handleBlur}
                                        />
                                    </Col>
                                    <Col lg={12} className="mr-3 me-3 mt-2">
                                        <div className="d-flex flex-wrap justify-content-end gap-2">
                                            {!successSave ? (
                                                <>
                                                    <Button type="submit" color="success" >Simpan</Button>
                                                    <Button type="button" color="danger" onClick={() => { handleBack() }}>Batal</Button>
                                                </>
                                            ) :
                                                <Button type="button" color="danger" onClick={() => { handleBack() }}>Kembali</Button>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Form>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(TriageIGD)