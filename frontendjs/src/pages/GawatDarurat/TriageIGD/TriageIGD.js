import React, { useEffect, useState, useCallback } from 'react';
import withRouter from '../../../Components/Common/withRouter';
import UiContent from '../../../Components/Common/UiContent';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Progress, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import SkalaNyeri from '../../../Components/SkalaNyeri/SkalaNyeri';
import { useFormik } from "formik"; //yupToFormErrors
import * as Yup from "yup";
import { useDate } from '../../../utils/format';
import { saveEmrTriageIgd, getGetComboTriageIgd, emrResetForm } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomSelect from '../../Select/Select';
import { useNavigate } from 'react-router-dom';

const TriageIGD = () => {
    document.title = "Triage IGD";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newData, successSave, data } = useSelector((state) => ({
        newData: state.Emr.saveEmrTriageIgd.data,
        successSave: state.Emr.saveEmrTriageIgd.success,
        data: state.Emr.getGetComboTriageIgd.data,
    }));

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
            riwayatobat: '',
            skalanyeri: '',
            airway: '',
            breathing: '',
            circulation: '',
            disability: '',
            kondisimental: '',
            tingkatdarurat: ''
        },
        validationSchema: Yup.object({
            tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
        }),
        onSubmit: (values) => {
            console.log(values);
            // handleNextStep()
            dispatch(saveEmrTriageIgd(values, () => {
                // dispatch(lainLainGet())
            }));

        }
    })
    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(getGetComboTriageIgd(''))
    }, [dispatch])
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
            value: 1,
            label: 'Tidak Kooperatif',
            color: '#FDB7B7',
            lg: 2
        },
        {
            value: 2,
            label: 'Kooperatif',
            color: '#FCFDB7',
            lg: 2
        },
        {
            value: 3,
            label: 'Kooperatif',
            color: '#B8FDB7',
            lg: 2
        },
        {
            value: 4,
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
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
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
                            <CardHeader className="align-items-center" style={{ backgroundColor: "#e67e22" }}>
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
                                                    id="namakeluarga"
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
                            <CardHeader className="align-items-center" style={{ backgroundColor: "#e67e22" }}>
                                <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Triage IGD Terintegrasi</h4>
                            </CardHeader>
                            <CardBody>
                                <Row className="gy-2">
                                    <Col lg={4}><div className="mt-2">
                                        <Label className="form-label">Keluhan</Label>
                                    </div></Col>
                                    <Col lg={8}>
                                        <Input
                                            id="keluhan"
                                            name="keluhan"
                                            type="textarea"
                                            value={vSetValidation.values.keluhan || ''}
                                            placeholder='Keluhan'
                                            onChange={vSetValidation.handleChange}
                                            onBlur={vSetValidation.handleBlur}
                                        />
                                    </Col>
                                    <Col lg={4}><div className="mt-2">
                                        <Label className="form-label">Riwayat Penyakit</Label>
                                    </div></Col>
                                    <Col lg={8}>
                                        <Input
                                            id="riwayatpenyakit"
                                            name="riwayatpenyakit"
                                            type="textarea"
                                            value={vSetValidation.values.riwayatpenyakit || ''}
                                            placeholder='Riwayat Penyakit'
                                            onChange={vSetValidation.handleChange}
                                            onBlur={vSetValidation.handleBlur}
                                        />
                                    </Col>
                                    <Col lg={4}><div className="mt-2">
                                        <Label className="form-label">Riwayat Obat Terdahulu</Label>
                                    </div></Col>
                                    <Col lg={8}>
                                        <Input
                                            id="riwayatobat"
                                            name="riwayatobat"
                                            type="textarea"
                                            value={vSetValidation.values.riwayatobat || ''}
                                            placeholder='Riwayat Obat Terdahulu'
                                            onChange={vSetValidation.handleChange}
                                            onBlur={vSetValidation.handleBlur}
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
                                            id="tingkatdarurat"
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
                                                    <Button type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
                                                    <Button type="button" color="danger" style={{ width: '20%' }} onClick={() => { handleBack() }}>Batal</Button>
                                                </>
                                            ) :
                                                <Button type="button" color="danger" style={{ width: '20%' }} onClick={() => { handleBack() }}>Kembali</Button>
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