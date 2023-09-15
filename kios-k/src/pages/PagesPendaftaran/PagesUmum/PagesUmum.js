import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Step, Stepper } from 'react-form-stepper';
import {
    Row, Col, Card, CardBody, Container, Form,
    Input, FormFeedback, Label, Button
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt, faStarHalfStroke, faPrint, faDeleteLeft,
    faArrowLeftLong, faStepBackward, faHomeUser
} from '@fortawesome/free-solid-svg-icons';
import { useFormik } from "formik"; //yupToFormErrors
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './PagesUmum.scss'
import { kioskResetForm, getComboKiosk, getCariPasienKiosk } from '../../../store/action';
import ModalPoliklinik from '../../../components/ModalPoliklinik/ModalPoliklinik';

function PagesUmum() {
    const [activeStep, setActiveStep] = useState(0);
    const [tempDaftar, setTempDaftar] = useState([]);
    const onStepsChange = (norm, namapasien, tgllahir, namapoli, idnamapoli, doktertujuan, iddoktertujuan) => {
        const newTempValue = [{ norm:norm,namapasien: namapasien,tgllahir:tgllahir, namapoli:namapoli,
             idnamapoli:idnamapoli, doktertujuan:doktertujuan, iddoktertujuan:iddoktertujuan }];

        setTempDaftar(newTempValue);
        console.log(newTempValue)
    }
    const handleNextStep = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };
    const handlePreviousStep = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
    const steps = [
        {
            label: 'Input',
            content: faPencilAlt,
            stateForm: <Step1 handleNextStep={handleNextStep} onStepsChange={onStepsChange} />
        },
        {
            label: 'Konfirmasi',
            content: faStarHalfStroke,
            stateForm: <Step2 handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} tempDaftar={tempDaftar} />
        },
        {
            label: 'Bukti Daftar',
            content: faPrint,
            stateForm: <Step3 />
        },
    ];

    return (
        <React.Fragment>
            <Container fluid>
                <div className="pages-awal" style={{ marginTop: '20px' }}>
                    <Row>
                        <Col lg={12}>
                            <div className="d-flex justify-content-center">
                                <Card className='custom-card card-custom-background' >
                                    <CardBody>
                                        <div className="stylish-stepper-container">
                                            <Stepper
                                                styleConfig={{
                                                    activeBgColor: "blue",
                                                    completedBgColor: '#28a745'
                                                }}
                                                connectorStyleConfig={{
                                                    // activeColor: "red",
                                                    // disabledColor: "blue",
                                                    // completedColor: "purple",
                                                    // size: 20
                                                }}
                                                activeStep={activeStep}>
                                                {steps.map((step, index) => (
                                                    <Step key={index} label={step.label} active={activeStep === index}>
                                                        <FontAwesomeIcon icon={step.content} />
                                                    </Step>
                                                ))}
                                            </Stepper>
                                            {/* {activeStep > 0 && activeStep < 2 && (
                                                <button onClick={handlePreviousStep}>Previous</button>
                                            )}
                                            {activeStep < steps.length - 1 && (
                                                <button onClick={handleNextStep}>Next Step</button>
                                            )} */}
                                            {activeStep >= 0 && activeStep < steps.length && steps[activeStep].stateForm}

                                        </div>

                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    );
}

function Step1({ handleNextStep, onStepsChange }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, dataPasien } = useSelector((state) => ({
        data: state.Kiosk.getComboKiosk.data || [],
        dataPasien: state.Kiosk.getCariPasienKiosk.data || []
    }));

    const vSetStep1 = useFormik({
        enableReinitialize: true,
        initialValues: {
            norm: "",
            namapasien: '',
            tgllahir: '',
            namapoli: "Pilih Poliklinik",
            idnamapoli: '',
            doktertujuan: '',
            iddoktertujuan: ''
        },
        validationSchema: Yup.object({
            norm: Yup.string().required("No.RM harus diisi"),
            namapasien: Yup.string().required("Nama Pasien harus diisi"),
            tgllahir: Yup.string().required("Tanggal Lahir harus diisi"),
            doktertujuan: Yup.string().required("Dokter harus diisi")
        }),
        onSubmit: (values) => {
            // console.log(values);
            handleNextStep()
            onStepsChange(vSetStep1.values.norm,
                vSetStep1.values.namapasien,
                vSetStep1.values.tgllahir,
                vSetStep1.values.namapoli,
                vSetStep1.values.idnamapoli,
                vSetStep1.values.doktertujuan,
                vSetStep1.values.iddoktertujuan)

        }
    })
    useEffect(() => {
        dispatch(kioskResetForm());
    }, [dispatch])
    useEffect(() => {
        dispatch(getComboKiosk());
    }, [dispatch])
    // const [displayValue, setDisplayValue] = useState('0');
    const handleNumericButtonClick = (value) => {
        if (vSetStep1.values.norm === undefined) {

            vSetStep1.setFieldValue('norm', value)
        } else {
            vSetStep1.setFieldValue('norm', vSetStep1.values.norm + value)
        }
    };

    // const handleClearButtonClick = () => {
    //     // vSetStep1.setFieldValue('norm', '')
    // };

    const handleCariButtonClick = () => {
        dispatch(getCariPasienKiosk({
            search: vSetStep1.values.norm
        }));
        setstateHasilCari(true)
    };

    const handleDeleteButtonClick = () => {
        if (vSetStep1.values.norm.length > 1) {
            vSetStep1.setFieldValue('norm', vSetStep1.values.norm.slice(0, -1))
        } else {
            vSetStep1.setFieldValue('norm', '')
        }
    };

    // const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    const [modal, setModal] = useState(false);
    const onDokterChange = (poliklinik, dokter, idpoliklinik, iddokter) => {
        vSetStep1.setFieldValue('namapoli', poliklinik)
        vSetStep1.setFieldValue('doktertujuan', dokter)
        vSetStep1.setFieldValue('idnamapoli', idpoliklinik)
        vSetStep1.setFieldValue('iddoktertujuan', iddokter)
    }
    const [stateHasilCari, setstateHasilCari] = useState(false)
    useEffect(() => {
        const setFF = vSetStep1.setFieldValue
        if (dataPasien[0] !== undefined && stateHasilCari) {
            setFF("norm", dataPasien[0].nocm || "")
            setFF("namapasien", dataPasien[0].namapasien || "")
            setFF("tgllahir", dataPasien[0].tgllahir || "")
        }
    }, [dispatch, dataPasien, vSetStep1.setFieldValue, stateHasilCari])
    const handleHome = () => {
        setstateHasilCari(false)
        navigate('/pages-awal');
    };
    const handleBack = () => {
        setstateHasilCari(false)
        navigate(-1)
    };
    return (
        <div>
            <ModalPoliklinik onDokterChange={onDokterChange} open={modal} toggle={() => setModal(!modal)} data={data} />
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    vSetStep1.handleSubmit();
                    return false;
                }}
                className="gy-4"
                action="#">
                <Row>
                    <Card>
                        <Row>
                            <Col lg={12} className='mr-2'>
                                <div className="d-flex justify-content-end gap-2">
                                    <Button color="danger" style={{ width: '100px' }} className="m-2 mr-2" onClick={() => handleBack()}>
                                        <FontAwesomeIcon icon={faStepBackward} />
                                    </Button>
                                    <Button style={{ width: '100px', backgroundColor: '#7084c7' }} className="m-2 mr-2" onClick={() => handleHome()}>
                                        <FontAwesomeIcon icon={faHomeUser} />
                                    </Button>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <Row className="gy-3 mt-2" style={{ textAlign: 'left' }}>
                                    <Col lg={6}>
                                        <div className="mt-2">
                                            <Label style={{ color: "black" }} htmlFor="norm" className="form-label">No. Rekam Medis / NIK</Label>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div>
                                            <Input
                                                id="norm"
                                                name="norm"
                                                type="text"
                                                placeholder="Masukan No. Rekam Medis / NIK"
                                                onChange={vSetStep1.handleChange}
                                                onBlur={vSetStep1.handleBlur}
                                                value={vSetStep1.values.norm || ''}
                                                invalid={
                                                    vSetStep1.touched.norm && vSetStep1.errors.norm ? true : false
                                                }
                                            />
                                            {vSetStep1.touched.norm && vSetStep1.errors.norm ? (
                                                <FormFeedback type="invalid"><div>{vSetStep1.errors.norm}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mt-2">
                                            <Label style={{ color: "black" }} htmlFor="namapasien" className="form-label">Nama Pasien</Label>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div>
                                            <Input
                                                id="namapasien"
                                                name="namapasien"
                                                type="text"
                                                // placeholder="Nama Pasien"
                                                onChange={vSetStep1.handleChange}
                                                onBlur={vSetStep1.handleBlur}
                                                value={vSetStep1.values.namapasien || ""}
                                                invalid={
                                                    vSetStep1.touched.namapasien && vSetStep1.errors.namapasien ? true : false
                                                }
                                                disabled
                                            />
                                            {vSetStep1.touched.namapasien && vSetStep1.errors.namapasien ? (
                                                <FormFeedback type="invalid"><div>{vSetStep1.errors.namapasien}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mt-2">
                                            <Label style={{ color: "black" }} htmlFor="tgllahir" className="form-label">Tanggal Lahir</Label>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div>
                                            <Input
                                                id="tgllahir"
                                                name="tgllahir"
                                                type="text"
                                                placeholder="Tanggal Lahir"
                                                onChange={vSetStep1.handleChange}
                                                onBlur={vSetStep1.handleBlur}
                                                value={vSetStep1.values.tgllahir || ""}
                                                invalid={
                                                    vSetStep1.touched.tgllahir && vSetStep1.errors.tgllahir ? true : false
                                                }
                                                disabled
                                            />
                                            {vSetStep1.touched.tgllahir && vSetStep1.errors.tgllahir ? (
                                                <FormFeedback type="invalid"><div>{vSetStep1.errors.tgllahir}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mt-2">
                                            <Label style={{ color: "black" }} htmlFor="poliklinik" className="form-label">Poliklinik Tujuan</Label>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div>
                                            <Button id="namapoli"
                                                name="namapoli" type="button" style={{ backgroundColor: '#7084c7', width: '100%' }} onClick={() => setModal(!modal)}>
                                                {vSetStep1.values.namapoli}
                                            </Button>
                                            {/* <Input
                                            id="poliklinik"
                                            name="poliklinik"
                                            type="select"
                                            placeholder="Poliklinik Tujuan"
                                            onChange={vSetStep1.handleChange}
                                            onBlur={vSetStep1.handleBlur}
                                            value={vSetStep1.values.poliklinik || ""}
                                            invalid={
                                                vSetStep1.touched.poliklinik && vSetStep1.errors.poliklinik ? true : false
                                            }
                                        >
                                            <option value="" disabled>
                                                Select an option
                                            </option>
                                            {(data.unit || []).map((option, index) => (
                                                <option key={index} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </Input>
                                        {vSetStep1.touched.poliklinik && vSetStep1.errors.poliklinik ? (
                                            <FormFeedback type="invalid"><div>{vSetStep1.errors.poliklinik}</div></FormFeedback>
                                        ) : null} */}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mt-2">
                                            <Label style={{ color: "black" }} htmlFor="doktertujuan" className="form-label">Dokter Tujuan</Label>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div>
                                            <Input
                                                id="doktertujuan"
                                                name="doktertujuan"
                                                type="input"
                                                placeholder="Dokter Tujuan"
                                                onChange={vSetStep1.handleChange}
                                                onBlur={vSetStep1.handleBlur}
                                                value={vSetStep1.values.doktertujuan || ""}
                                                invalid={
                                                    vSetStep1.touched.doktertujuan && vSetStep1.errors.doktertujuan ? true : false
                                                }
                                                disabled
                                            />
                                            {vSetStep1.touched.doktertujuan && vSetStep1.errors.doktertujuan ? (
                                                <FormFeedback type="invalid"><div>{vSetStep1.errors.doktertujuan}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <div className="keypad">
                                    <button type='button' onClick={() => handleNumericButtonClick('1')}>1</button>
                                    <button type='button' onClick={() => handleNumericButtonClick('2')}>2</button>
                                    <button type='button' onClick={() => handleNumericButtonClick('3')}>3</button>
                                    <button type='button' onClick={() => handleNumericButtonClick('4')}>4</button>
                                    <button type='button' onClick={() => handleNumericButtonClick('5')}>5</button>
                                    <button type='button' onClick={() => handleNumericButtonClick('6')}>6</button>
                                    <button type='button' onClick={() => handleNumericButtonClick('7')}>7</button>
                                    <button type='button' onClick={() => handleNumericButtonClick('8')}>8</button>
                                    <button type='button' onClick={() => handleNumericButtonClick('9')}>9</button>
                                    <button className="clear" type='button' onClick={handleDeleteButtonClick}>
                                        <FontAwesomeIcon icon={faDeleteLeft} />
                                    </button>
                                    {/* <button type='button' className="clear" onClick={handleClearButtonClick}>C</button> */}
                                    <button type='button' onClick={() => handleNumericButtonClick('0')}>0</button>
                                    <button type='button' className="cari" onClick={handleCariButtonClick}>
                                        <FontAwesomeIcon icon={faArrowLeftLong} />
                                    </button>
                                </div>
                            </Col>
                            <Col lg={12} style={{ textAlign: 'right' }} className="mr-3 me-3">
                                <Button type="submit" color="success">Selanjutnya</Button>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Form>
        </div>
    )
}

function Step2({ handleNextStep, handlePreviousStep, tempDaftar }) {
    const navigate = useNavigate();
    const vSetStep2 = useFormik({
        enableReinitialize: true,
        initialValues: {
            norm:  tempDaftar[0].norm||'',
            namapasien: tempDaftar[0].namapasien||"",
            tgllahir: tempDaftar[0].tgllahir || '',
            namapoli: tempDaftar[0].namapoli || '',
            idnamapoli: tempDaftar[0].idnamapoli || '',
            doktertujuan: tempDaftar[0].doktertujuan || '',
            iddoktertujuan: tempDaftar[0].iddoktertujuan || ''
        },
        vSetStep1Schema: Yup.object({
            norm: Yup.string().required("Metode harus diisi"),
            tipedata: Yup.string().required("Tipe Data harus diisi")
        }),
        onSubmit: (values) => {
            // console.log(values);
            handleNextStep()
            // dispatch(saveSetMasterNilaiNormalLab(values, () => {
            //     // dispatch(lainLainGet())
            // }));

        }
    })
    const handleKembali = () => {
        handlePreviousStep()
    }
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    const formattedTime = currentDateTime.toLocaleTimeString();
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[currentDateTime.getMonth()];
    const formattedDate = `${currentDateTime.getDate()} ${monthName} ${currentDateTime.getFullYear()}`;
    const [tglDaftar] = useState(formattedDate);
    const handleHome = () => {
        navigate('/pages-awal');
    };
    const handleBack = () => {
        navigate(-1)
    };
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                vSetStep2.handleSubmit();
                return false;
            }}
            className="gy-4"
            action="#">
            <Row>
                <Card>
                    <Row>
                        <Col lg={12}>
                            <Row className="gy-3 mt-2" style={{ textAlign: 'left' }}>
                                <Col lg={12} className='mr-2'>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Button color="danger" style={{ width: '100px' }} className="m-2 mr-2" onClick={() => handleBack()}>
                                            <FontAwesomeIcon icon={faStepBackward} />
                                        </Button>
                                        <Button style={{ width: '100px', backgroundColor: '#7084c7' }} className="m-2 mr-2" onClick={() => handleHome()}>
                                            <FontAwesomeIcon icon={faHomeUser} />
                                        </Button>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="norm" className="form-label">Tanggal Pendaftaran</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <Row>
                                        <Col lg={6}>
                                            <div>
                                                <Input
                                                    id="tgldaftar"
                                                    name="tgldaftar"
                                                    type="text"
                                                    value={tglDaftar}
                                                    disabled
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div>
                                                <Input
                                                    id="tgldaftar"
                                                    name="tgldaftar"
                                                    type="text"
                                                    value={formattedTime}
                                                    disabled
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="norm" className="form-label">No. Rekam Medis</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="norm"
                                            name="norm"
                                            type="text"
                                            placeholder="Masukan No. Rekam Medis"
                                            onChange={vSetStep2.handleChange}
                                            onBlur={vSetStep2.handleBlur}
                                            value={vSetStep2.values.norm || ''}
                                            invalid={
                                                vSetStep2.touched.norm && vSetStep2.errors.norm ? true : false
                                            }
                                            disabled
                                        />
                                        {vSetStep2.touched.norm && vSetStep2.errors.norm ? (
                                            <FormFeedback type="invalid"><div>{vSetStep2.errors.norm}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="namapasien" className="form-label">Nama Pasien</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="namapasien"
                                            name="namapasien"
                                            type="text"
                                            placeholder="Nama Pasien"
                                            onChange={vSetStep2.handleChange}
                                            onBlur={vSetStep2.handleBlur}
                                            value={vSetStep2.values.namapasien || ""}
                                            invalid={
                                                vSetStep2.touched.namapasien && vSetStep2.errors.namapasien ? true : false
                                            }
                                            disabled
                                        />
                                        {vSetStep2.touched.namapasien && vSetStep2.errors.namapasien ? (
                                            <FormFeedback type="invalid"><div>{vSetStep2.errors.namapasien}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tgllahir" className="form-label">Tanggal Lahir</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="tgllahir"
                                            name="tgllahir"
                                            type="text"
                                            placeholder="Tanggal Lahir"
                                            onChange={vSetStep2.handleChange}
                                            onBlur={vSetStep2.handleBlur}
                                            value={vSetStep2.values.tgllahir || ""}
                                            invalid={
                                                vSetStep2.touched.tgllahir && vSetStep2.errors.tgllahir ? true : false
                                            }
                                            disabled
                                        />
                                        {vSetStep2.touched.tgllahir && vSetStep2.errors.tgllahir ? (
                                            <FormFeedback type="invalid"><div>{vSetStep2.errors.tgllahir}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="namapoli" className="form-label">Poliklinik Tujuan</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="namapoli"
                                            name="namapoli"
                                            type="input"
                                            placeholder="Poliklinik Tujuan"
                                            onChange={vSetStep2.handleChange}
                                            onBlur={vSetStep2.handleBlur}
                                            value={vSetStep2.values.namapoli || ""}
                                            invalid={
                                                vSetStep2.touched.namapoli && vSetStep2.errors.namapoli ? true : false
                                            }
                                            disabled
                                        />
                                        {vSetStep2.touched.namapoli && vSetStep2.errors.namapoli ? (
                                            <FormFeedback type="invalid"><div>{vSetStep2.errors.namapoli}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="doktertujuan" className="form-label">Dokter Tujuan</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="doktertujuan"
                                            name="doktertujuan"
                                            type="input"
                                            placeholder="Dokter Tujuan"
                                            onChange={vSetStep2.handleChange}
                                            onBlur={vSetStep2.handleBlur}
                                            value={vSetStep2.values.doktertujuan || ""}
                                            invalid={
                                                vSetStep2.touched.doktertujuan && vSetStep2.errors.doktertujuan ? true : false
                                            }
                                            disabled
                                        />
                                        {vSetStep2.touched.doktertujuan && vSetStep2.errors.doktertujuan ? (
                                            <FormFeedback type="invalid"><div>{vSetStep2.errors.doktertujuan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12} className="mr-3 me-3 mt-2">
                            <div className="d-flex flex-wrap justify-content-end gap-2">
                                <Button type="button" onClick={handleKembali} color="danger" style={{width:'20%'}}>Kembali</Button>
                                <Button type="submit" color="success" style={{width:'20%'}}>Daftar</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Form>
    )
}

function Step3() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const vSetStep3 = useFormik({
        enableReinitialize: true,
        initialValues: {
            metode: "",
            tipedata: "",
            namaPemeriksaan: '',
            idnamaPemeriksaan: ''
        },
        vSetStep1Schema: Yup.object({
            metode: Yup.string().required("Metode harus diisi"),
            tipedata: Yup.string().required("Tipe Data harus diisi")
        }),
        onSubmit: (values) => {
            // console.log(values);
            // handleNextStep()
            // dispatch(saveSetMasterNilaiNormalLab(values, () => {
            //     // dispatch(lainLainGet())
            // }));

        }
    })
    const handlePrint = () => {
        MySwal.fire({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
            title: 'Anda Akan Mencetak Bukti Pendaftaran..?',
            text: `Silahkan Pilih Tombol Dibawah!`,
            icon: 'question',
            confirmButtonText: 'Print ..!',
            cancelButtonText: 'Tidak ..!',
            showCancelButton: true,
        })

    }
    const handleHome = () => {
        navigate('/pages-awal');
    };
    const handleBack = () => {
        navigate(-1)
    };
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                vSetStep3.handleSubmit();
                return false;
            }}
            className="gy-4"
            action="#">
            <Row>
                <Card>
                    <Row>
                        <Col lg={12}>
                            <Row className="gy-3 mt-2" style={{ textAlign: 'left' }}>
                                <Col lg={12} className='mr-2'>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Button color="danger" style={{ width: '100px' }} className="m-2 mr-2" onClick={() => handleBack()}>
                                            <FontAwesomeIcon icon={faStepBackward} />
                                        </Button>
                                        <Button style={{ width: '100px', backgroundColor: '#7084c7' }} className="m-2 mr-2" onClick={() => handleHome()}>
                                            <FontAwesomeIcon icon={faHomeUser} />
                                        </Button>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="norm" className="form-label">No. Rekam Medis / NIK</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="norm"
                                            name="norm"
                                            type="text"
                                            placeholder="Masukan No. Rekam Medis / NIK"
                                            onChange={vSetStep3.handleChange}
                                            onBlur={vSetStep3.handleBlur}
                                            value={vSetStep3.values.norm || ''}
                                            invalid={
                                                vSetStep3.touched.norm && vSetStep3.errors.norm ? true : false
                                            }
                                        />
                                        {vSetStep3.touched.norm && vSetStep3.errors.norm ? (
                                            <FormFeedback type="invalid"><div>{vSetStep3.errors.norm}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="namapasien" className="form-label">Nama Pasien</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="namapasien"
                                            name="namapasien"
                                            type="text"
                                            placeholder="Nama Pasien"
                                            onChange={vSetStep3.handleChange}
                                            onBlur={vSetStep3.handleBlur}
                                            value={vSetStep3.values.namapasien || ""}
                                            invalid={
                                                vSetStep3.touched.namapasien && vSetStep3.errors.namapasien ? true : false
                                            }
                                        />
                                        {vSetStep3.touched.namapasien && vSetStep3.errors.namapasien ? (
                                            <FormFeedback type="invalid"><div>{vSetStep3.errors.namapasien}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tgllahir" className="form-label">Tanggal Lahir</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="tgllahir"
                                            name="tgllahir"
                                            type="text"
                                            placeholder="Tanggal Lahir"
                                            onChange={vSetStep3.handleChange}
                                            onBlur={vSetStep3.handleBlur}
                                            value={vSetStep3.values.tgllahir || ""}
                                            invalid={
                                                vSetStep3.touched.tgllahir && vSetStep3.errors.tgllahir ? true : false
                                            }
                                        />
                                        {vSetStep3.touched.tgllahir && vSetStep3.errors.tgllahir ? (
                                            <FormFeedback type="invalid"><div>{vSetStep3.errors.tgllahir}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="poliklinik" className="form-label">Poliklinik Tujuan</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="poliklinik"
                                            name="poliklinik"
                                            type="select"
                                            placeholder="Poliklinik Tujuan"
                                            onChange={vSetStep3.handleChange}
                                            onBlur={vSetStep3.handleBlur}
                                            value={vSetStep3.values.poliklinik || ""}
                                            invalid={
                                                vSetStep3.touched.poliklinik && vSetStep3.errors.poliklinik ? true : false
                                            }
                                        />
                                        {vSetStep3.touched.poliklinik && vSetStep3.errors.poliklinik ? (
                                            <FormFeedback type="invalid"><div>{vSetStep3.errors.poliklinik}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="doktertujuan" className="form-label">Dokter Tujuan</Label>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Input
                                            id="doktertujuan"
                                            name="doktertujuan"
                                            type="select"
                                            placeholder="Dokter Tujuan"
                                            onChange={vSetStep3.handleChange}
                                            onBlur={vSetStep3.handleBlur}
                                            value={vSetStep3.values.doktertujuan || ""}
                                            invalid={
                                                vSetStep3.touched.doktertujuan && vSetStep3.errors.doktertujuan ? true : false
                                            }
                                        />
                                        {vSetStep3.touched.doktertujuan && vSetStep3.errors.doktertujuan ? (
                                            <FormFeedback type="invalid"><div>{vSetStep3.errors.doktertujuan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12} className="mr-3 me-3 mt-2">
                            <div className="d-flex flex-wrap justify-content-end gap-2">
                                <Button type="button" onClick={handlePrint} color="danger">Cetak Bukti Pendaftaran</Button>
                                {/* <Button type="button" onClick={handleClickSelesai} color="success">Selesai</Button> */}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Form>
    )
}

export default PagesUmum;
