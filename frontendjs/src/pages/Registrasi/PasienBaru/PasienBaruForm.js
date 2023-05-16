import React, { useEffect, useState } from 'react';
import UiContent from '../../../Components/Common/UiContent';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import withRouter from "../../../Components/Common/withRouter";
import classnames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    Form, FormFeedback, Alert
} from 'reactstrap';

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//import images
import progileBg from '../../../assets/images/profile-bg-2.jpg';

import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { masterGet, desaGet, kecamatanGet } from '../../../store/master/action';
import { registrasiSave, registrasiResetForm, registrasiGet } from "../../../store/actions";
import CustomSelect from '../../Select/Select'

const PasienBaru = () => {
    document.title = "Profile Pasien Baru";
    const dispatch = useDispatch();
    const { data, dataJenisKelamin, dataTitle, dataGD, dataKebangsaan,
        dataPerkawinan, dataPendidikan, dataPekerjaan, dataEtnis, dataBahasa, dataDesa,
        dataKecamatan, loading, error, newData, loadingSave, success, errorSave } = useSelector((state) => ({
            data: state.Master.masterGet.data.agama,
            dataJenisKelamin: state.Master.masterGet.data.jeniskelamin,
            dataTitle: state.Master.masterGet.data.title,
            dataGD: state.Master.masterGet.data.golongandarah,
            dataKebangsaan: state.Master.masterGet.data.kebangsaan,
            dataPerkawinan: state.Master.masterGet.data.perkawinan,
            dataPendidikan: state.Master.masterGet.data.pendidikan,
            dataPekerjaan: state.Master.masterGet.data.pekerjaan,
            dataEtnis: state.Master.masterGet.data.etnis,
            dataBahasa: state.Master.masterGet.data.bahasa,
            dataDesa: state.Master.desaGet.data,
            dataKecamatan: state.Master.kecamatanGet.data,
            newData: state.Registrasi.registrasiSave.newData,
            loadingSave: state.Registrasi.registrasiSave.loading,
            errorSave: state.Registrasi.registrasiSave.error,
            success: state.Registrasi.registrasiSave.success,
            loading: state.Master.masterGet.loading,
            error: state.Master.masterGet.error,
        }));

    useEffect(() => {
        dispatch(masterGet());
        dispatch(desaGet(''));
        dispatch(kecamatanGet())
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(registrasiResetForm());
        }
    }, [dispatch])
    // Card Header Tabs
    const [cardHeaderTab, setcardHeaderTab] = useState("1");
    const cardHeaderToggle = (tab) => {
        if (cardHeaderTab !== tab) {
            setcardHeaderTab(tab);
        }
    };


    const [companyType, setcompanyType] = useState(null);
    const [desa, setDesa] = useState(null);

    function handlecompanyType(companyType) {
        setcompanyType(companyType);
        console.log(companyType);
    }
    const handleChange = (selected) => {
        console.log(selected.value);
    };
    const handleDesa = characterEntered => {
        if (characterEntered.length > 3) {
            // useEffect(() => {
            dispatch(desaGet(characterEntered));
            // }, [dispatch]);
        }
    };

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: newData?.id ?? undefined,
            namapasien: newData?.namapasien ?? "",
            noidentitas: newData?.noidentitas ?? "",
            jeniskelamin: newData?.jeniskelamin ?? "",
        },
        validationSchema: Yup.object({
            namapasien: Yup.string().required("Nama pasien wajib diisi"),
            noidentitas: Yup.string().required("Nomor identitas wajib diisi"),
            jeniskelamin: Yup.string().required("Jenis Kelamin wajib diisi"),
        }),
        onSubmit: (values) => {
            // dispatch(registrasiSave(values, ''));
            console.log(values)
        }
    });

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg profile-setting-img">
                            <img src={progileBg} className="profile-wid-img" alt="" />
                        </div>
                    </div>

                    <Row>
                        <Col xxl={12}>
                            <Card className="mt-xxl-n5">
                                <div className="card-header align-items-center d-flex">
                                    <div className="flex-shrink-0 ms-2">

                                        <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer", fontWeight: "bold" }} className={classnames({ active: cardHeaderTab === "1", })} onClick={() => { cardHeaderToggle("1"); }} >
                                                    Profile
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer", fontWeight: "bold" }} className={classnames({ active: cardHeaderTab === "2", })} onClick={() => { cardHeaderToggle("2"); }} >
                                                    Informasi Lainnya
                                                </NavLink>
                                            </NavItem>
                                        </Nav>

                                    </div>
                                </div>
                                <CardBody>
                                    <TabContent activeTab={cardHeaderTab} className="text-muted">
                                        {/* <Form className="gy-4"
                                                action="#"> */}
                                        <TabPane tabId="1" id="home2">
                                            <Form onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                                className="gy-4"
                                                action="#">
                                                {success ? (
                                                    <>
                                                        {toast("Your Redirect To Login Page...", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                                        <ToastContainer autoClose={2000} limit={1} />
                                                        <Alert color="success" >
                                                            Pasien berhasil di simpan, silahkan lanjutkan Registrasi...
                                                        </Alert>
                                                    </>
                                                ) : null}
                                                <Row>
                                                    <Col lg={4}>
                                                        <Card style={{ backgroundColor: "#f1f2f6" }}>
                                                            <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                                                <h4 className="card-title mb-0">Data Diri Pasien</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Row className="gy-4">
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="noidentitas" className="form-label">No Identitas</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="noidentitas"
                                                                                name="noidentitas"
                                                                                type="number"
                                                                                placeholder="Masukkan No Identitas pasien"
                                                                                onChange={validation.handleChange}
                                                                                onBlur={validation.handleBlur}
                                                                                value={validation.values.noidentitas || ""}
                                                                                invalid={
                                                                                    validation.touched.noidentitas && validation.errors.noidentitas ? true : false
                                                                                }
                                                                            />
                                                                            {validation.touched.noidentitas && validation.errors.noidentitas ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.noidentitas}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="namapasien" className="form-label">Nama Pasien</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="namapasien"
                                                                                name="namapasien"
                                                                                type="text"
                                                                                placeholder="Masukkan nama pasien"
                                                                                onChange={validation.handleChange}
                                                                                onBlur={validation.handleBlur}
                                                                                value={validation.values.namapasien || ""}
                                                                                invalid={
                                                                                    validation.touched.namapasien && validation.errors.namapasien ? true : false
                                                                                }
                                                                            />
                                                                            {validation.touched.namapasien && validation.errors.namapasien ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.namapasien}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="jeniskelamin" className="form-label">Jenis Kelamin</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <CustomSelect id="jeniskelamin"
                                                                                name="jeniskelamin" options={dataJenisKelamin}
                                                                                value={validation.values.jeniskelamin || ""}
                                                                                className={'input'}
                                                                                onChange={value => validation.setFieldValue('jeniskelamin', value.value)} />
                                                                                {/* <Select
                                                                                name="jeniskelamin"
                                                                                id="jeniskelamin"
                                                                                value={validation.values.jeniskelamin || ""}
                                                                            onChange={value => validation.setFieldValue('jeniskelamin', value.value)}
                                                                                options={dataJenisKelamin}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            /> */}
                                                                            {validation.touched.jeniskelamin && validation.errors.jeniskelamin ? (
                                                                                <FormFeedback type="invalid"><div>{validation.errors.jeniskelamin}</div></FormFeedback>
                                                                            ) : null}
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="titlepasien" className="form-label">Title Pasien</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={dataTitle}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="tempatlahir" className="form-label">Tempat Lahir</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Flatpickr
                                                                                className="form-control"
                                                                                options={{
                                                                                    dateFormat: "Y-m-d",
                                                                                    defaultDate: "today",
                                                                                    maxDate: "today"
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="agama" className="form-label">Agama</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={data}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="goldarah" className="form-label">Gol Darah</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={dataGD}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kebangsaan" className="form-label">Kebangsaan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={dataKebangsaan}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="statusperkawinan" className="form-label">Status Perkawinan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={dataPerkawinan}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="pendidikan" className="form-label">Pendidikan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={dataPendidikan}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="pekerjaan" className="form-label">Pekerjaan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={dataPekerjaan}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="suku" className="form-label">SUKU</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={dataEtnis}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="bahasa" className="form-label">Bahasa Yang Dikuasai</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={dataBahasa}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <Card style={{ backgroundColor: "#f1f2f6" }}>
                                                            <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                                                <h4 className="card-title mb-0">Alamat KTP</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Row className="gy-4">
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="alamatktp" className="form-label">Alamat KTP</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <textarea
                                                                                id="alamatktp"
                                                                                name="alamatktp"
                                                                                type="text"
                                                                                placeholder="Masukkan Alamat KTP"

                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="rtrw" className="form-label">RT / RW</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="row">
                                                                            <div className="col-sm">
                                                                                <Input
                                                                                    id="rt"
                                                                                    name="rt"
                                                                                    type="number"
                                                                                    placeholder="RT"

                                                                                />
                                                                            </div>
                                                                            <div className="col-sm">
                                                                                <Input
                                                                                    id="rw"
                                                                                    name="rw"
                                                                                    type="number"
                                                                                    placeholder="RW"

                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="desa" className="form-label">Kelurahan / Desa</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                onChange={handleChange}
                                                                                onInputChange={handleDesa}
                                                                                options={dataDesa}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kecamatan" className="form-label">Kecamatan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                // value={companyType}
                                                                                // onChange={() => {
                                                                                //     handlecompanyType();
                                                                                // }}
                                                                                options={dataKecamatan}
                                                                                theme={(theme) => ({
                                                                                    ...theme,
                                                                                    borderRadius: 0,
                                                                                    colors: {
                                                                                        ...theme.colors,
                                                                                        text: 'orangered',
                                                                                        primary25: '#48dbfb',
                                                                                        primary: '#48dbfb',
                                                                                    },
                                                                                })}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kota" className="form-label">Kota / Kabupaten</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="pos" className="form-label">Kode POS</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="provinsi" className="form-label">Provinsi</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="negara" className="form-label">Negara</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <Card style={{ backgroundColor: "#f1f2f6" }}>
                                                            <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                                                <h4 className="card-title mb-0">Alamat Domisili</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Row className="gy-4">
                                                                    {/* <Col xxl={6} md={6}> */}
                                                                    <div className="form-check ms-2">
                                                                        <Input className="form-check-input" type="checkbox" id="formCheck1" defaultChecked />
                                                                        <Label className="form-check-label" htmlFor="formCheck1" style={{ color: "black" }}>
                                                                            Sesuai KTP
                                                                        </Label>
                                                                    </div>
                                                                    {/* </Col> */}

                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="alamatdomisili" className="form-label">Alamat Domisili</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <textarea
                                                                                id="alamatdomisili"
                                                                                name="alamatdomisili"
                                                                                type="text"
                                                                                placeholder="Masukkan Alamat Domisili"

                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="rtrwdomisili" className="form-label">RT / RW</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="row">
                                                                            <div className="col-sm">
                                                                                <Input
                                                                                    id="rtdomisili"
                                                                                    name="rtdomisili"
                                                                                    type="text"
                                                                                    placeholder="RT"

                                                                                />
                                                                            </div>
                                                                            <div className="col-sm">
                                                                                <Input
                                                                                    id="rwdomisili"
                                                                                    name="rwdomisili"
                                                                                    type="text"
                                                                                    placeholder="RW"

                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="desa" className="form-label">Kelurahan / Desa</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kecamatandomisili" className="form-label">Kecamatan</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="kotadomisili" className="form-label">Kota / Kabupaten</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="posdomisili" className="form-label">Kode POS</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="provinsidomisili" className="form-label">Provinsi</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="negaradomisili" className="form-label">Negara</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                                <option >Select your Status </option>
                                                                                <option value="1">Declined Payment</option>
                                                                                <option value="2">Delivery Error</option>
                                                                                <option value="3">Wrong Amount</option>
                                                                            </select>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='text-center'>
                                                            <Button type="submit" color="primary" disabled={loadingSave}> Kirim </Button>

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </TabPane>

                                        <TabPane tabId="2" id="profile2">
                                            <Form className="gy-4"
                                                action="#">
                                                <Row>
                                                    <Col lg={4}>
                                                        <Card style={{ backgroundColor: "#f1f2f6" }}>
                                                            <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                                                <h4 className="card-title mb-0">Informasi Lainnya</h4>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Row className="gy-4">

                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </TabPane>
                                        {/* </Form> */}
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default withRouter(PasienBaru);