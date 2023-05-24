import React, { useEffect, useState, useCallback } from 'react';
import withRouter from "../../../Components/Common/withRouter";
import { useParams } from "react-router-dom";
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table, Form,
    FormFeedback, Alert, Modal,
    ModalHeader, ModalBody
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
//import images
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";

import CustomSelect from '../../Select/Select'
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

import { comboRegistrasiGet } from '../../../store/master/action';
import { registrasiResetForm, registrasiGet, registrasiSaveRuangan } from "../../../store/actions";
import BuktiPendaftaran from '../../Print/BuktiPendaftaran';



const RegistrasiPasien = (props) => {
    const { id } = useParams();
    document.title = "Registrasi Pasien";
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);


    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    }, [modal]);


    // Pills Tabs
    const [pillsTab, setpillsTab] = useState("1");
    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    useEffect(() => {
        dispatch(comboRegistrasiGet());
        if (id) {
            dispatch(registrasiGet(id));
        }
    }, [id, dispatch]);


    const { datas, data, loading, error, newData, loadingSave, success, errorSave } = useSelector((state) => ({

        data: state.Master.comboRegistrasiGet.data,
        newData: state.Registrasi.registrasiSaveRuangan.newData,
        success: state.Registrasi.registrasiSaveRuangan.success,
        loadingSave: state.Registrasi.registrasiSaveRuangan.loading,
        errorSave: state.Registrasi.registrasiSaveRuangan.error,
        loading: state.Master.comboRegistrasiGet.loading,
        error: state.Master.comboRegistrasiGet.error,
        datas: state.Registrasi.registrasiGet.data,

    }));
    // const [test, setTest] = useState(datas);
    // setTest(test)
    // console.log(datas)

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: newData?.id ?? id,
            tglregistrasi: newData?.tglregistrasi ?? "",
            unittujuan: newData?.unittujuan ?? "",
            rujukanasal: newData?.rujukanasal ?? "",
            jenispenjamin: newData?.jenispenjamin ?? "",
            penjamin: newData?.penjamin ?? "",
            tujkunjungan: newData?.tujkunjungan ?? "",
            dokter: newData?.dokter ?? "",
            penanggungjawab: newData?.penanggungjawab ?? "",
            namapasien: datas?.namapasien ?? "",
            nocm: datas?.nocm ?? "",
            nobpjs: datas?.nobpjs ?? "",
            noidentitas: datas?.noidentitas ?? "",
            tgllahir: datas?.tgllahir ?? "",

        },
        validationSchema: Yup.object({
            tglregistrasi: Yup.string().required("Tanggal Registrasi wajib diisi"),
            tujkunjungan: Yup.string().required("Tujuan Kunjungan wajib diisi"),
            unittujuan: Yup.string().required("Unit wajib diisi"),
            rujukanasal: Yup.string().required("Asal Rujukan wajib diisi"),
            jenispenjamin: Yup.string().required("Jenis Penjamin wajib diisi"),
            penjamin: Yup.array().required("Penjamin wajib diisi"),
            dokter: Yup.string().required("Dokter wajib diisi"),
            penanggungjawab: Yup.string().required("Penanggung jawab wajib diisi"),
        }),
        onSubmit: (values) => {
            // console.log(values)
            dispatch(registrasiSaveRuangan(values, ''));
        }
    });

    const [messageNewData, setmessageNewData] = useState("");
    const notifyError = useCallback(() => {
        return toast("Terjadi kesalahan", { position: "top-right", hideProgressBar: false, className: 'bg-danger text-white' });
    }, []);

    const notifySuccess = useCallback((t) => {
        return toast(t, { position: "top-right", hideProgressBar: false, className: 'bg-success text-white' });
    }, []);

    useEffect(() => {
        // console.log('massukkk')
        if (errorSave) {
            notifyError();
        }
    }, [errorSave, notifyError])

    useEffect(() => {

        if (newData !== null) {
            setmessageNewData(newData.data.daftarPasien.noregistrasi + ' Nomor Antrean Dokter ' + newData.data.antreanPemeriksaan.noantrian)
            notifySuccess('Nomor Registrasi Pasien ' + newData.data.daftarPasien.noregistrasi)
            console.log(newData)
        }
    }, [newData, notifySuccess])

    useEffect(() => {
        return () => {

            dispatch(registrasiResetForm());
        }
    }, [dispatch])
    const [dataUnit, setdataUnit] = useState([]);
    const handleChangeTujuan = (selected) => {
        validation.setFieldValue('tujkunjungan', selected.value)
        var newArray = data.unit.filter(function (el) {
            return el.objectinstalasifk === selected.value;
        });
        validation.setFieldValue('unittujuan', "")
        setdataUnit(newArray)

    }

    const handleBeginOnChange = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        validation.setFieldValue('tglregistrasi', dateString)
    }

    function handleSelect(data) {
        validation.setFieldValue('penjamin', data)
        console.log(validation.values.penjamin)
        // setSelectedOptions(data);
    }

    return (
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Registrasi Pasien" pageTitle="Registrasi Pasien" />
                <Row>
                    <Col lg={3}>
                        <Card>
                            <CardBody>
                                <h5 className="card-title mb-5">Profile Pasien</h5>
                                <div className="text-center">
                                    <img src={userDummy}
                                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                        alt="user-profile" />
                                    <Input style={{ border: 'none', textAlign: 'center' }}
                                        id="namapasien"
                                        name="namapasien"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.namapasien || ""}

                                    />
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Nav pills className="nav-success mb-3">
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "1", })} onClick={() => { pillsToggle("1"); }} >
                                            Profile
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "2", })} onClick={() => { pillsToggle("2"); }} >
                                            Riwayat
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={pillsTab} className="text-muted">
                                    <TabPane tabId="1" id="home-1">
                                        <Card>
                                            <CardBody>
                                                <div className="table-responsive">
                                                    <Table className="table-borderless mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <th className="ps-0" scope="row">NoRM :</th>
                                                                <td className="text-muted">{validation.values.nocm}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Tgllahir :</th>
                                                                <td className="text-muted">{validation.values.tgllahir}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">No BPJS :</th>
                                                                <td className="text-muted">{validation.values.nobpjs}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">No Identitas :</th>
                                                                <td className="text-muted">{validation.values.noidentitas}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                    <TabPane tabId="2" id="home-2">
                                        <Card>
                                            <CardBody>

                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={9}>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}
                            className="gy-4"
                            action="#">
                            {success && success ? (
                                <>
                                    {toast("Registrasi Pasien Berhasil.....", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                    <ToastContainer autoClose={2000} limit={1} />
                                    <Alert color="success" >
                                        Registrasi Pasien Berhasil, dengan nomor registrasi {messageNewData}
                                    </Alert>
                                </>
                            ) : null}

                            <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                                <BuktiPendaftaran />
                                {/* <ModalHeader className="bg-light p-3" toggle={toggle}>
                                    Bukti Pendaftaran
                                </ModalHeader>
                                <Button
                                    className="invoice-print-button"
                                    variant="contained"
                                    onClick={() => window.print()}
                                >
                                    Print
                                </Button> */}
                            </Modal>
                            <Card>
                                <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                    <h4 className="card-title mb-0">Registrasi</h4>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col lg={6}>
                                            <Card>
                                                <CardBody>
                                                    <Row className="gy-4">
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="tglregistrasi" className="form-label">Tanggal Registrasi</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <Flatpickr
                                                                    // value={validation.values.tglregistrasi || ""}
                                                                    onChange={([newDate]) => {
                                                                        handleBeginOnChange(newDate);
                                                                    }}
                                                                    className="form-control"
                                                                    options={{
                                                                        dateFormat: "Y-m-d",
                                                                        defaultDate: "today",
                                                                        maxDate: "today",
                                                                        minDate: "today"
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="tujkunjungan" className="form-label">Tujuan Kunjungan</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="tujkunjungan"
                                                                    name="tujkunjungan"
                                                                    options={data.instalasi}
                                                                    value={validation.values.tujkunjungan || ""}
                                                                    className={`input ${validation.errors.tujkunjungan ? "is-invalid" : ""}`}
                                                                    onChange={handleChangeTujuan}
                                                                />
                                                                {validation.touched.tujkunjungan && validation.errors.tujkunjungan ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.tujkunjungan}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="unittujuan" className="form-label">Unit Tujuan</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="unittujuan"
                                                                    name="unittujuan"
                                                                    options={dataUnit}
                                                                    value={validation.values.unittujuan || ""}
                                                                    className={`input ${validation.errors.unittujuan ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('unittujuan', value.value)}
                                                                />
                                                                {validation.touched.unittujuan && validation.errors.unittujuan ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.unittujuan}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="rujukanasal" className="form-label">Rujukan Asal</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="rujukanasal"
                                                                    name="rujukanasal"
                                                                    options={data.asalrujukan}
                                                                    value={validation.values.rujukanasal || ""}
                                                                    className={`input ${validation.errors.rujukanasal ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('rujukanasal', value.value)}
                                                                />
                                                                {validation.touched.rujukanasal && validation.errors.rujukanasal ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.rujukanasal}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg={6}>
                                            <Card>
                                                <CardBody>
                                                    <Row className="gy-4">
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispenjamin" className="form-label">Jenis Penjamin</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispenjamin"
                                                                    name="jenispenjamin"
                                                                    options={data.jenispenjamin}
                                                                    value={validation.values.jenispenjamin || ""}
                                                                    className={`input ${validation.errors.jenispenjamin ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispenjamin', value.value)}
                                                                />
                                                                {validation.touched.jenispenjamin && validation.errors.jenispenjamin ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispenjamin}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="penjamin" className="form-label">Penjamin</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="penjamin"
                                                                    name="penjamin"
                                                                    options={data.rekanan}
                                                                    value={validation.values.penjamin || ""}
                                                                    className={`input ${validation.errors.penjamin ? "is-invalid" : ""}`}
                                                                    // onChange={value => validation.setFieldValue('penjamin', value.value)}
                                                                    onChange={handleSelect}
                                                                    isMulti={true}
                                                                />
                                                                {validation.touched.penjamin && validation.errors.penjamin ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.penjamin}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="dokter" className="form-label">Dokter Penanggung Jawab</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="dokter"
                                                                    name="dokter"
                                                                    options={data.pegawai}
                                                                    value={validation.values.dokter || ""}
                                                                    className={`input ${validation.errors.dokter ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('dokter', value.value)}
                                                                />
                                                                {validation.touched.dokter && validation.errors.dokter ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.dokter}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="dokter" className="form-label">Penanggung Jawab Pasien</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="penanggungjawab"
                                                                    name="penanggungjawab"
                                                                    options={data.hubungankeluarga}
                                                                    value={validation.values.penanggungjawab || ""}
                                                                    className={`input ${validation.errors.penanggungjawab ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('penanggungjawab', value.value)}
                                                                />
                                                                {validation.touched.penanggungjawab && validation.errors.penanggungjawab ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.penanggungjawab}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg={12} style={{ textAlign: 'right' }}>
                                            <Button type="submit" color="info" className="rounded-pill" disabled={loadingSave}> SIMPAN </Button>
                                            <Button
                                                type="button"
                                                className="btn btn-primary add-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#showModal"
                                                id="create-btn"
                                                onClick={() => { toggle(); }}
                                            >
                                                <i className="ri-add-line align-bottom me-1"></i> 
                                                print
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(RegistrasiPasien);