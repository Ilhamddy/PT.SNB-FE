import React, { useEffect, useState } from 'react';
import withRouter from '../../../Components/Common/withRouter';
import UiContent from '../../../Components/Common/UiContent';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import {
    widgetDaftarPasienTriageGet, daftarPasienResetForm, DaftarPasienTriageGet, getGetComboTriageIgd,
    registrasiGetList
} from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import CountUp from "react-countup";
import pria from "../../../assets/images/svg/pria.svg";
import baby from "../../../assets/images/svg/baby.svg"
import anaklaki from "../../../assets/images/svg/anaklaki.svg"
import kakek from "../../../assets/images/svg/kakek.svg"
import nenek from "../../../assets/images/svg/nenek.svg"
import anakperempuan from "../../../assets/images/svg/anakperempuan.svg"
import dewasaperempuan from "../../../assets/images/svg/dewasaperempuan.svg"

import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import CustomSelect from '../../Select/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Flatpickr from "react-flatpickr";
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr';

const TriageIGD = () => {
    document.title = "Daftar Pasien Triage";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { datawidget, data, dataCombo } = useSelector((state) => ({
        datawidget: state.DaftarPasien.widgetDaftarPasienTriageGet.data,
        data: state.DaftarPasien.DaftarPasienTriageGet.data,
        dataCombo: state.Emr.getGetComboTriageIgd.data,
    }));
    const vSetValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            tingkatdarurat: '',
            search: '',
            statuspasien: ''
        },
        validationSchema: Yup.object({
        }),
        onSubmit: (values) => {

        }
    })
    const [namaPasien, setnamaPasien] = useState(null);
    const [selectedPasien, setselectedPasien] = useState(null);
    useEffect(() => {
        return () => {
            dispatch(daftarPasienResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(widgetDaftarPasienTriageGet());
        dispatch(getGetComboTriageIgd(''));
    }, [dispatch])
    useEffect(() => {
        dispatch(DaftarPasienTriageGet({ search: '' }));
    }, [dispatch])
    const [datax, setDatax] = useState([]);
    useEffect(() => {
        setDatax(data.data)
    }, [setDatax, data])
    const handleCard = (item) => {
        // console.log(item)
        setnamaPasien(item.namapasien)
        setselectedPasien(item)
        const itemIndex = datax.findIndex((dataItem) => dataItem.norec === item.norec);
        if (itemIndex !== -1) {
            const updatedData = [...datax];
            for (let i = 0; i < updatedData.length; i++) {
                if (i !== itemIndex) {
                    updatedData[i].color = '#FFFFFF';
                } else {
                    updatedData[i].color = '#F2E9CA';
                }
            }
            setDatax(updatedData);
        }
    };
    const handleSelect = (nama, value) => {
        if (nama === 'tingkatdarurat') {
            vSetValidation.setFieldValue('tingkatdarurat', value || '')
            dispatch(DaftarPasienTriageGet({ search: vSetValidation.values.search, tingkatdarurat: value, statuspasien: vSetValidation.values.statuspasien }));
        } else if (nama === 'search') {
            vSetValidation.setFieldValue('search', value || '')
            dispatch(DaftarPasienTriageGet({ search: value, tingkatdarurat: vSetValidation.values.tingkatdarurat, statuspasien: vSetValidation.values.statuspasien }));
        } else if (nama === 'statuspasien') {
            vSetValidation.setFieldValue('statuspasien', value || '')
            dispatch(DaftarPasienTriageGet({ search: vSetValidation.values.search, tingkatdarurat: vSetValidation.values.tingkatdarurat, statuspasien: value }));
        }
    }
    const dataStatusPasien = [
        {
            value: 1,
            label: 'Semua'
        },
        {
            value: 2,
            label: 'Terdaftar'
        },
        {
            value: 3,
            label: 'Belum Terdaftar'
        }
    ]
    const handleClickButton = (e) => {
        if (namaPasien === null) {
            toast.error("Pasien Belum Dipilih", { autoClose: 3000 });
            return
        }
        

        if (e === 'registrasi') {
            if (selectedPasien.noregistrasi !== null) {
                toast.error("Pasien Sudah Teregistrasi", { autoClose: 3000 });
                return
            }else{
                setisRegistrasiOpen(true)
            }
        } else if(e==='pengkajian'){
            navigate(`/gawatdarurat/input-pasien-triage-edit/${selectedPasien.norec}`)
        }

    };
    const [isRegistrasiOpen, setisRegistrasiOpen] = useState(false);
    return (
        <React.Fragment>
            <ModalRegistrasi
                isRegistrasiOpen={isRegistrasiOpen}
                toggle={() => setisRegistrasiOpen(!isRegistrasiOpen)}
                selectedPasien={selectedPasien}
            />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien Triage" pageTitle="Forms" />
                    <Card>
                        <CardHeader className="card-header-snb">
                            <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Pasien Triage IGD</h4>
                        </CardHeader>
                        <CardBody>
                            <Row className="row-cols-xxl-5 row-cols-lg-3 row-cols-1">
                                {datawidget.map((item, key) => (
                                    <Col key={key}>
                                        <Card className="card-animate" style={{ backgroundColor: item.color }}>
                                            <CardBody>
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <p className="fw-medium mb-0">{item.label}</p>

                                                    </div>
                                                    <div>
                                                        <div className="avatar-md flex-shrink-0">
                                                            <span className={"avatar-title rounded-circle fs-4 bg-soft-info"}>
                                                                <h2 className="ff-secondary fw-semibold">
                                                                    <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                                        <CountUp
                                                                            start={0}
                                                                            end={item.counter}
                                                                            decimal={item.decimals}
                                                                            duration={3}
                                                                        />
                                                                    </span>
                                                                </h2>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>

                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                <Col lg={3}>
                                    <Card>
                                        <CardBody className="p-4 text-center">
                                            <div className="mx-auto avatar-md mb-3">
                                                <span className={"avatar-title rounded-circle fs-4 bg-soft-info"}>
                                                    <h2 className="ff-secondary fw-semibold">
                                                        <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                        {selectedPasien?.profile === 'baby' ? (
                                                            <img src={baby} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'dewasalaki' ? (
                                                            <img src={pria} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'anaklaki' ? (
                                                            <img src={anaklaki} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'anakperempuan' ? (
                                                            <img src={anakperempuan} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'dewasaperempuan' ? (
                                                            <img src={dewasaperempuan} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'kakek' ? (
                                                            <img src={kakek} alt="" className="img-fluid rounded-circle" />
                                                        ) : selectedPasien?.profile === 'nenek' ? (
                                                            <img src={nenek} alt="" className="img-fluid rounded-circle" />
                                                        ) : (
                                                            // Render when none of the conditions are met
                                                            <p>No profile image available</p>
                                                        )}
                                                        </span>
                                                    </h2>
                                                </span>
                                            </div>
                                            <h5 className="card-title mb-1">{namaPasien}</h5>
                                            {/* <p className="text-muted mb-0">Graphic Designer</p> */}
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <div className="live-preview">
                                                <div className="d-flex flex-column gap-2">
                                                    <Button color="info" className="btn-animation" data-text="Registrasi" onClick={() => handleClickButton('registrasi')}><span>Registrasi</span></Button>
                                                    <Button color="info" className="btn-animation" data-text="Pengkajian Medis" onClick={() => handleClickButton('pengkajian')}> <span>Pengkajian Medis</span> </Button>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={9}>
                                    <Card>
                                        <CardHeader>
                                            <Row className="row-cols-xxl-6 row-cols-lg-3 row-cols-1">
                                                <Col>
                                                    <Input
                                                        id="search"
                                                        name="search"
                                                        type="search"
                                                        // value={search}
                                                        placeholder='Cari Berdasarkan No.RM / Nama Pasien'
                                                        onChange={(e) => {
                                                            handleSelect('search', e.target.value)
                                                        }}
                                                    />
                                                </Col>
                                                <Col>
                                                    <div className="mt-2">
                                                        <Label className="form-label">Jenis Triage Pasien</Label>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <CustomSelect
                                                        id="tingkatdarurat"
                                                        name="tingkatdarurat"
                                                        options={dataCombo?.mdaruratigd}
                                                        onChange={(e) => {
                                                            handleSelect('tingkatdarurat', e?.value)
                                                            // vSetValidation.setFieldValue('tingkatdarurat', e?.value || '')
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
                                                <Col>
                                                    <div className="mt-2">
                                                        <Label className="form-label">Status Pasien</Label>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <CustomSelect
                                                        id="statuspasien"
                                                        name="statuspasien"
                                                        options={dataStatusPasien}
                                                        onChange={(e) => {
                                                            handleSelect('statuspasien', e?.value)
                                                            // vSetValidation.setFieldValue('statuspasien', e?.value || '')
                                                        }}
                                                        value={vSetValidation.values.statuspasien}
                                                        className={`input row-header ${!!vSetValidation?.errors.statuspasien ? 'is-invalid' : ''
                                                            }`}
                                                    />
                                                    {vSetValidation.touched.statuspasien &&
                                                        !!vSetValidation.errors.statuspasien && (
                                                            <FormFeedback type="invalid">
                                                                <div>{vSetValidation.errors.statuspasien}</div>
                                                            </FormFeedback>
                                                        )}
                                                </Col>
                                                <Col>
                                                    <Button onClick={() => { navigate(`/gawatdarurat/input-pasien-triage`) }} color='info'>+</Button></Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                                {(datax || []).map((item, key) => (
                                                    <React.Fragment key={key}>
                                                        <Card className="product card-animate" style={{ backgroundColor: item.color }} onClick={() => { handleCard(item) }}>
                                                            <CardBody>
                                                                <Row className="gy-3">
                                                                    <div className="col-sm-auto">
                                                                        <div className="avatar-md flex-shrink-0">
                                                                            <span className={"avatar-title rounded-circle fs-4"} style={{ backgroundColor: item.statusdarurat }}>
                                                                                <h2 className="ff-secondary fw-semibold">
                                                                                    <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                                                    </span>
                                                                                </h2>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        <h5 className="card-title mb-1">{item.nocm ? item.nocm : '-'}</h5>
                                                                        <p className="mb-0">
                                                                            {item.namapasien && item.namapasien.length > 20
                                                                                ? `${item.namapasien.substring(0, 20)}...`
                                                                                : item.namapasien}
                                                                        </p>
                                                                        <p className="text-muted mb-0">{item.umur ? item.umur : '-'}</p>
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        <div className="text-lg-start">
                                                                            <p className="text-muted mb-0">Tgl. Kedatangan {item.tglinput}</p>
                                                                            <p className="text-muted mb-0">Pembawa Pasien {item.namapj ? item.namapj : '-'}</p>
                                                                            <p className="text-muted mb-0">No Hp {item.nohp ? item.nohp : '-'}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        <div className="text-lg-start">
                                                                            <p className="text-muted mb-0">No. Registrasi : {item.noregistrasi ? item.noregistrasi : '-'}</p>
                                                                            <p className="text-muted mb-0">DPJP Pasien : {item.namapj ? item.namapj : '-'}</p>
                                                                            <p className="text-muted mb-0">Keluhan : {item.keluhan ? item.keluhan : '-'}</p>
                                                                        </div>
                                                                    </div>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

const ModalRegistrasi = ({ isRegistrasiOpen, toggle, selectedPasien }) => {
    const [dateEnd] = useState(() => (new Date()).toISOString())
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading } = useSelector((state) => ({
        data: state.Registrasi.registrasiList.data,
        loading: state.Registrasi.registrasiList.loading,
    }));
    const vSetValidationModal = useFormik({
        enableReinitialize: true,
        initialValues: {
            tglend: dateEnd,
            search: '',
            statuspasien: ''
        },
        validationSchema: Yup.object({
        }),
        onSubmit: (values) => {

        }
    })
    const handleSearch = (nama, value) => {
        if (nama === 'search') {
            // vSetValidation.setFieldValue('tingkatdarurat', value || '')
            dispatch(registrasiGetList(value));
        }
    }
    const [datax, setDatax] = useState([]);
    useEffect(() => {
        setDatax(data)
    }, [setDatax, data])
    const [selectedPasienPopUp, setselectedPasienPopUp] = useState(null);
    const handleCard = (item) => {
        setselectedPasienPopUp(item)
        const itemIndex = datax.findIndex((dataItem) => dataItem.id === item.id);
        if (itemIndex !== -1) {
            const updatedData = [...datax];
            for (let i = 0; i < updatedData.length; i++) {
                if (i !== itemIndex) {
                    updatedData[i].color = '#FFFFFF';
                } else {
                    updatedData[i].color = '#F2E9CA';
                }
            }
            setDatax(updatedData);
        }
    };
    const handleRegistrasi = () => {
        navigate(`/registrasi/pasien-ruangan-triage/${selectedPasienPopUp.id}/${selectedPasien.norec}`);
    }
    const handleEditPasien = () => {
        navigate(`/registrasi/pasien-baru-triage/${selectedPasienPopUp.id}/${selectedPasien.norec}`);
    }

    return (
        <Modal isOpen={isRegistrasiOpen} toggle={toggle} centered={true} size="xl">
            <ModalBody>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        vSetValidationModal.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Card>
                        <CardHeader className="align-items-center" style={{ backgroundColor: "#FFCB46" }}>
                            <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Pasien Triage IGD</h4>
                        </CardHeader>
                        <Card>
                            <CardHeader className="card-header border-0">
                                <Row className="align-items-center gy-3">
                                    <div className="col-sm">
                                        {/* <h5 className="card-title mb-0">Order History</h5> */}
                                    </div>
                                    <div className="col-sm-auto">
                                        <div className="d-flex gap-1 flex-wrap">
                                            <button
                                                type="button"
                                                className="btn btn-success add-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#showModal"
                                                id="create-btn"
                                                onClick={() => { navigate(`/registrasi/pasien-baru-triage/${selectedPasien.norec}`) }}
                                            >
                                                Belum Punya RM
                                            </button>
                                        </div>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row className="gy-3">
                                    <Col lg={8}>
                                        <Input
                                            className="form-control search"
                                            id="search"
                                            name="search"
                                            type="search"
                                            // value={search}
                                            placeholder='NIK / No. RM / Nama Pasien'
                                            onChange={(e) => {
                                                handleSearch('search', e.target.value)
                                            }}
                                        />
                                    </Col>
                                    <Col lg={4}>
                                        <KontainerFlatpickr
                                            id="tglend"
                                            options={{
                                                enableTime: true,
                                                // mode: "range",
                                                dateFormat: "Y-m-d",
                                                defaultDate: "today"
                                            }}
                                            value={vSetValidationModal.values.tglend}
                                            onChange={([newDate]) => {
                                                vSetValidationModal.setFieldValue("tglend", newDate.toISOString());
                                            }}
                                        />
                                    </Col>
                                    <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                        {(data || []).map((item, key) => (
                                            <React.Fragment key={key}>
                                                <Card className="product card-animate" style={{ backgroundColor: item.color }}
                                                    onClick={() => { handleCard(item) }}
                                                >
                                                    <CardBody>
                                                        <Row className="gy-3">
                                                            <div className="col-sm">
                                                                <h5 className="card-title mb-1">{item.nocm ? item.nocm : '-'}</h5>
                                                                <p className="text-muted mb-0">{item.noidentitas ? item.noidentitas : '-'}</p>
                                                                <p className="mb-0">
                                                                    {item.namapasien && item.namapasien.length > 20
                                                                        ? `${item.namapasien.substring(0, 20)}...`
                                                                        : item.namapasien}
                                                                </p>
                                                            </div>
                                                            <div className="col-sm">
                                                                <div className="text-lg-start">
                                                                    <p className="text-muted mb-0">{item.tgllahir}</p>
                                                                    <p className="text-muted mb-0">No Hp {item.nohp ? item.nohp : '-'}</p>
                                                                    <p className="text-muted mb-0">{item.alamatrmh ? item.alamatrmh : '-'}</p>
                                                                </div>
                                                            </div>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                        <Button
                                            onClick={() => handleRegistrasi()}
                                            type="submit"
                                            color="success" placement="top" id="tooltipTop" >
                                            Registrasi
                                        </Button>
                                        <Button
                                            color="info"
                                            onClick={() => handleEditPasien()}
                                        >
                                            Edit Data Pasien
                                        </Button>
                                    </div>
                                </Row>
                            </CardBody>
                        </Card>
                    </Card>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default withRouter(TriageIGD)