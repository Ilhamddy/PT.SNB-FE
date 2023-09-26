import React, { useEffect, useState, useCallback } from 'react';
import withRouter from '../../../Components/Common/withRouter';
import UiContent from '../../../Components/Common/UiContent';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Progress, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import SkalaNyeri from '../../../Components/SkalaNyeri/SkalaNyeri';
import { useFormik } from "formik"; //yupToFormErrors
import * as Yup from "yup";
import { useDate } from '../../../utils/format';
import { saveEmrTriageIgd } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const TriageIGD = () => {
    document.title = "Triage IGD";
    const dispatch = useDispatch();
    const { newData, successSave } = useSelector((state) => ({
        newData: state.Emr.saveEmrTriageIgd.data,
        successSave: state.Emr.saveEmrTriageIgd.success,
    }));
    const { tanggal, waktu } = useDate()
    const vSetValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            namapasien: "",
            umurpasien: "",
            tglkedatangan: '',
            namakeluarga: '',
            hubungankeluarga: '',
            nohpkeluarga: '',
            keluhan: '',
            riwayatpenyakit: '',
            riwayatobat: ''
        },
        validationSchema: Yup.object({

        }),
        onSubmit: (values) => {
            console.log(values);
            // handleNextStep()
            dispatch(saveEmrTriageIgd(values, () => {
                // dispatch(lainLainGet())
            }));

        }
    })
    const [currentStep, setCurrentStep] = useState(1);

    const handleStepChange = (step) => {
        setCurrentStep(step);
    };
    const [skala, setSkalaNyeri] = useState(0)

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
                                                <Input
                                                    id="hubungankeluarga"
                                                    name="hubungankeluarga"
                                                    type="text"
                                                    value={vSetValidation.values.hubungankeluarga || ''}
                                                    placeholder='Hubungan Keluarga'
                                                    onChange={vSetValidation.handleChange}
                                                    onBlur={vSetValidation.handleBlur}
                                                />
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
                                            onQuantityChange={(q) => setSkalaNyeri(q)}
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
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B7DBFD' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Obstruksi / partial obstruksi</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FDB7B7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Bebas</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FCFDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Bebas</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B8FDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Bebas</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={3}>
                                                <Card style={{ backgroundColor: '#EBEBEB' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Bebas</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="gy-2">
                                            <Col lg={1}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Breathing</Label>
                                                </div>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B7DBFD' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Distress napas berat / henti napas</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FDB7B7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Distress napas ringan sedang</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FCFDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Normal</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B8FDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Normal</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={3}>
                                                <Card style={{ backgroundColor: '#EBEBEB' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Normal</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="gy-2">
                                            <Col lg={1}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Circulation</Label>
                                                </div>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B7DBFD' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Gangguan hemodinamik berat / perdarahan tak terkontrol</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FDB7B7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Gangguan hemodinamik sedang / ringan</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FCFDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Stabil</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B8FDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Stabil</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={3}>
                                                <Card style={{ backgroundColor: '#EBEBEB' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Stabil</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="gy-2">
                                            <Col lg={1}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Disability</Label>
                                                </div>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B7DBFD' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Unresponsive / respon to pain</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FDB7B7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Alert, Respon to verbal</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FCFDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Alert</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B8FDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Alert</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={3}>
                                                <Card style={{ backgroundColor: '#EBEBEB' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Alert</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="gy-2">
                                            <Col lg={2}>
                                                <div className="mt-3">
                                                    <Label className="form-label">Kondisi Mental</Label>
                                                </div>
                                            </Col>
                                            <Col lg={1}>

                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FDB7B7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Tidak Kooperatif</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#FCFDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Kooperatif</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={2}>
                                                <Card style={{ backgroundColor: '#B8FDB7' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Kooperatif</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg={3}>
                                                <Card style={{ backgroundColor: '#EBEBEB' }}>
                                                    <CardBody>
                                                        <p style={{ textAlign: 'center' }}><span className="fw-small">Kooperatif</span></p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={4}>
                                        <Label className="form-label">Tingkat Kedaruratan</Label>
                                    </Col>
                                    <Col lg={8}>
                                        <Input
                                            id="search"
                                            name="search"
                                            type="select"
                                            // value={search}
                                            placeholder='Riwayat Obat Terdahulu'
                                        />
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
                                            <Button type="submit" color="success" style={{ width: '20%' }}>Simpan</Button>
                                            <Button type="button" color="danger" style={{ width: '20%' }}>Batal</Button>
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