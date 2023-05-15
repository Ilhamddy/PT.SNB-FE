import React, { useEffect, useState } from 'react';
import UiContent from '../../../Components/Common/UiContent';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import withRouter from "../../../Components/Common/withRouter";
import classnames from "classnames";

import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    Form
} from 'reactstrap';

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//import images
import progileBg from '../../../assets/images/profile-bg-2.jpg';

import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { masterGet } from '../../../store/master/action';

const PasienBaru = () => {
    document.title = "Profile Pasien Baru";
    const dispatch = useDispatch();
    const { data, dataJenisKelamin, dataTitle, dataGD, dataKebangsaan,
         dataPerkawinan,dataPendidikan,dataPekerjaan,dataEtnis,dataBahasa, loading, error } = useSelector((state) => ({
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
        loading: state.Master.masterGet.loading,
        error: state.Master.masterGet.error,
    }));

    useEffect(() => {
        dispatch(masterGet());
    }, [dispatch]);
    // Card Header Tabs
    const [cardHeaderTab, setcardHeaderTab] = useState("1");
    const cardHeaderToggle = (tab) => {
        if (cardHeaderTab !== tab) {
            setcardHeaderTab(tab);
        }
    };


    const [companyType, setcompanyType] = useState(null);

    function handlecompanyType(companyType) {
        setcompanyType(companyType);
    }
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
                                            <Form className="gy-4"
                                                action="#">
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
                                                                            <Label style={{ color: "black" }} htmlFor="nik" className="form-label">No Identitas</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="nik"
                                                                                name="nik"
                                                                                type="number"
                                                                                placeholder="Masukkan No Identitas pasien"

                                                                            />
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

                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="namapasien" className="form-label">Jenis Kelamin</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Select
                                                                                name="choices-single-default"
                                                                                id="choices-single-default"
                                                                                value={companyType}
                                                                                onChange={() => {
                                                                                    handlecompanyType();
                                                                                }}
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
                                                                            />
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
                                                                            <Label style={{ color: "black" }} htmlFor="namapasien" className="form-label">Kelurahan / Desa</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="kecamatan" className="form-label">Kecamatan</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="namapasien" className="form-label">Kelurahan / Desa</Label>
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
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="nik" className="form-label">No Identitas</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Input
                                                                                id="nik"
                                                                                name="nik"
                                                                                type="number"
                                                                                placeholder="Masukkan No Identitas pasien"

                                                                            />
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

                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div className="mt-2">
                                                                            <Label style={{ color: "black" }} htmlFor="namapasien" className="form-label">Jenis Kelamin</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="titlepasien" className="form-label">Title Pasien</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="tempatlahir" className="form-label">Tempat Lahir</Label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xxl={6} md={6}>
                                                                        <div>
                                                                            <Flatpickr
                                                                                className="form-control"
                                                                                options={{
                                                                                    dateFormat: "Y-m-d",
                                                                                    defaultDate: ["2022-01-20"]
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
                                                                            <Label style={{ color: "black" }} htmlFor="goldarah" className="form-label">Gol Darah</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="kebangsaan" className="form-label">Kebangsaan</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="statusperkawinan" className="form-label">Status Perkawinan</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="pendidikan" className="form-label">Pendidikan</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="pekerjaan" className="form-label">Pekerjaan</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="suku" className="form-label">SUKU</Label>
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
                                                                            <Label style={{ color: "black" }} htmlFor="bahasa" className="form-label">Bahasa Yang Dikuasai</Label>
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