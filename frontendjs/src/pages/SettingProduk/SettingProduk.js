import { useState, useEffect } from "react";
import { Button, Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { comboSettingProdukGet } from "../../store/master/action";

const linkSettingProduk = "/farmasi/gudang/setting-produk"

const SettingProduk = () => {
    const { tabopen } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(comboSettingProdukGet())
    }, [dispatch])

    return (
        <div className="page-content page-setting-produk">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Pembayaran" pageTitle="Pembayaran" />
                    <Card >
                        <div className="card-header align-items-center d-flex">
                            <div className="flex-shrink-0 ms-2">
                                <Nav tabs 
                                    className="nav justify-content-end 
                                    nav-tabs-custom rounded card-header-tabs 
                                    border-bottom-0">
                                    <NavItem>
                                        <NavLink 
                                            style={{ cursor: "pointer", fontWeight: "bold" }} 
                                            className={classnames({ active: tabopen === "1", })} 
                                            onClick={() => { navigate(linkSettingProduk + "/1"); }} >
                                            Tambah Produk
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink 
                                            style={{ cursor: "pointer", fontWeight: "bold" }} 
                                            className={classnames({ active: tabopen === "2", })} 
                                            onClick={() => { navigate(linkSettingProduk + "/2"); }} >
                                            Konversi Produk
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink 
                                            style={{ cursor: "pointer", fontWeight: "bold" }} 
                                            className={classnames({ active: tabopen === "3", })} 
                                            onClick={() => { navigate(linkSettingProduk + "/3"); }} >
                                            Lain-lain
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                        <CardBody>
                            <TabContent activeTab={tabopen} className="text-muted">
                                <TambahProduk />
                            </TabContent>
                        </CardBody>
                    </Card>
                    
            </Container>
        </div>
    )
}

const TambahProduk = () => {

    const {
        comboSettingProduk
    } = useSelector(state => ({
        comboSettingProduk: state.Master.comboSettingProdukGet.data
    }))

    const navigate = useNavigate();
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            tipeproduk: -1,
            namaproduk: "",
            deskripsikandungan: "",
            kekuatan: "",
            sediaan: "",
            golonganobat: "",
            detailjenisproduk: "",
            variabelbpjs: "",
            satuanjual: "",
            isnasional: false,
            isrs: false,
        },
        validationSchema: Yup.object({
            tipeproduk: Yup.number().lessThan(0, "Tipe produk harus dipilih"),
            namaproduk: Yup.string().required("Nama produk harus diisi"),
            deskripsikandungan: Yup.string().required("Deskripsi kandungan harus diisi"),
            kekuatan: Yup.string().required("Kekuatan harus diisi"),
            sediaan: Yup.string().required("Sediaan harus diisi"),
            golonganobat: Yup.string().required("Golongan obat harus diisi"),
            detailjenisproduk: Yup.string().required("Detail jenis produk harus diisi"),
            variabelbpjs: Yup.string().required("Variabel BPJS harus diisi"),
            satuanjual: Yup.string().required("Satuan jual harus diisi"),
        }),
        onSubmit: (values) => {
            
        }
    })

    const optionTipe = [
        {
            value: 0,
            label: "Obat"
        },
        {
            value: 1,
            label: "BMHP"
        },  
        {
            value: 2,
            label: "Alkes"
        },
    ]



    return (
        <TabPane tabId="1" id="home2">
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}
                className="gy-4"
                action="#">
                <Row>
                    <Col lg={6}>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label className="form-label" 
                                    htmlFor="tipeproduk"
                                    style={{ color: "black" }} 
                                    >
                                    Tipe Produk
                                </Label>
                            </Col>
                            <Col lg={7}>
                                {(optionTipe || []).map((data, index) => 
                                    <span className="d-flex flex-row" id="tipeproduk" key={index}>
                                        <Input 
                                            className="form-check-input" 
                                            type="radio" 
                                            id={`settingproduk-${index}`}   
                                            checked={data.value === validation.values.tipeproduk}
                                            readOnly
                                            onClick={e => { 
                                                validation.setFieldValue('tipeproduk', data.value)
                                            }}/>
                                        <Label className="form-check-label ms-2" 
                                            htmlFor={`settingproduk-${index}`} 
                                            style={{ color: "black" }} >
                                            {data.label}
                                        </Label>
                                    </span>
                                )}
                                {validation.errors.tipeproduk && !!validation.touched.tipeproduk && 
                                    <div style={{color: "#E3866F"}} className="mb-3">
                                        {validation.errors.tipeproduk}
                                    </div>
                                }
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label 
                                    style={{ color: "black" }} 
                                    htmlFor={`namaproduk`}
                                    className="form-label">
                                    Nama Produk
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <Input 
                                    id={`namaproduk`}
                                    name={`namaproduk`}
                                    type="text"
                                    value={validation.values.namaproduk} 
                                    onChange={validation.handleChange}
                                    invalid={validation.touched.namaproduk && !!validation.errors.namaproduk}
                                    />
                                {validation.touched.namaproduk && validation.errors.namaproduk ? (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {validation.errors.namaproduk}
                                        </div>
                                    </FormFeedback>
                                ) : null}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label 
                                    style={{ color: "black" }} 
                                    htmlFor={`deskripsikandungan`}
                                    className="form-label">
                                    Deskripsi/Kandungan produk
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <Input 
                                    id={`deskripsikandungan`}
                                    name={`deskripsikandungan`}
                                    type="text"
                                    value={validation.values.deskripsikandungan} 
                                    onChange={validation.handleChange}
                                    invalid={
                                        validation.touched.deskripsikandungan 
                                            && !!validation.errors.deskripsikandungan
                                    }
                                    />
                                {validation.touched.deskripsikandungan 
                                    && validation.errors.deskripsikandungan ? (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.deskripsikandungan}
                                            </div>
                                        </FormFeedback>
                                    ) : null
                                }
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label 
                                    style={{ color: "black" }} 
                                    htmlFor={`kekuatan`}
                                    className="form-label">
                                    Kekuatan
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <Input 
                                    id={`kekuatan`}
                                    name={`kekuatan`}
                                    type="text"
                                    value={validation.values.kekuatan} 
                                    onChange={validation.handleChange}
                                    invalid={validation.touched.kekuatan && !!validation.errors.kekuatan}
                                    />
                                {validation.touched.kekuatan 
                                    && validation.errors.kekuatan ? (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.kekuatan}
                                            </div>
                                        </FormFeedback>
                                    ) : null
                                }
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label 
                                    style={{ color: "black" }} 
                                    htmlFor={`sediaan`}
                                    className="form-label">
                                    Sediaan
                                </Label>
                            </Col>
                            <Col lg={6}>
                                <CustomSelect
                                    id={`sediaan`}
                                    name={`sediaan`}
                                    options={comboSettingProduk?.sediaan || []}
                                    onChange={(e) => {validation.setFieldValue('sediaan', e.value)}}
                                    value={validation.values.sediaan}
                                    />
                                {validation.touched.sediaan
                                    && !!validation.errors.sediaan && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.sediaan}
                                            </div>
                                        </FormFeedback>
                                    )
                                }
                            </Col>
                            <Col lg={1}>
                                <Button type="button" 
                                color="info" 
                                className="rounded-pill" 
                                placement="top" 
                                onClick={() => 
                                        navigate(linkSettingProduk + "/3")
                                    }>
                                    +
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label 
                                    style={{ color: "black" }} 
                                    htmlFor={`golonganobat`}
                                    className="form-label">
                                    Golongan Obat
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <CustomSelect
                                    id="golonganobat"
                                    name="golonganobat"
                                    options={comboSettingProduk?.golonganobat || []}
                                    onChange={(e) => {validation.setFieldValue('golonganobat', e.value)}}
                                    value={validation.values.golonganobat}
                                    className={`input ${validation.errors.golonganobat ? "is-invalid" : ""}`}
                                    />
                                {validation.touched.golonganobat 
                                    && validation.errors.golonganobat ? (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.golonganobat}
                                            </div>
                                        </FormFeedback>
                                    ) : null
                                }
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label 
                                    style={{ color: "black" }} 
                                    htmlFor={`detailjenisproduk`}
                                    className="form-label">
                                    Detail Jenis Produk
                                </Label>
                            </Col>
                            <Col lg={6}>
                                <CustomSelect
                                    id={`detailjenisproduk`}
                                    name={`detailjenisproduk`}
                                    options={comboSettingProduk?.detailjenisproduk || []}
                                    onChange={(e) => {validation.setFieldValue('detailjenisproduk', e.value)}}
                                    value={validation.values.detailjenisproduk}
                                    className={`input ${validation.errors.detailjenisproduk ? "is-invalid" : ""}`}
                                    />
                                {!!validation.touched.detailjenisproduk
                                    && !!validation.errors.detailjenisproduk && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.detailjenisproduk}
                                            </div>
                                        </FormFeedback>
                                    )
                                }
                            </Col>
                            <Col lg={1}>
                                <Button type="button" 
                                color="info" 
                                className="rounded-pill" 
                                placement="top" 
                                onClick={() => 
                                    navigate(linkSettingProduk + "/3")}
                                    >
                                    +
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label 
                                    style={{ color: "black" }} 
                                    htmlFor={`variabelbpjs`}
                                    className="form-label">
                                    Variabel bpjs
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <CustomSelect
                                    id="variabelbpjs"
                                    name="variabelbpjs"
                                    options={comboSettingProduk?.variabelbpjs || []}
                                    onChange={(e) => {validation.setFieldValue('variabelbpjs', e.value)}}
                                    value={validation.values.variabelbpjs || []}
                                    className={`input ${validation.errors.variabelbpjs ? "is-invalid" : ""}`}
                                    />
                                {validation.touched.variabelbpjs 
                                    && !!validation.errors.variabelbpjs && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.variabelbpjs}
                                            </div>
                                        </FormFeedback>
                                    ) 
                                }
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label 
                                    style={{ color: "black" }} 
                                    htmlFor={`satuanjual`}
                                    className="form-label">
                                    Satuan Jual 
                                </Label>
                            </Col>
                            <Col lg={6}>
                                <CustomSelect
                                    id={`satuanjual`}
                                    name={`satuanjual`}
                                    options={comboSettingProduk?.satuan || []}
                                    onChange={(e) => {
                                        validation.setFieldValue('satuanjual', e.value)
                                    }}
                                    value={validation.values.satuanjual}
                                    />
                                {validation.touched.satuanjual
                                    && validation.errors.satuanjual && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.satuanjual}
                                            </div>
                                        </FormFeedback>
                                    )
                                }
                            </Col>
                            <Col lg={1}>
                                <Button type="button" 
                                color="info" 
                                className="rounded-pill" 
                                placement="top" 
                                onClick={() => navigate(linkSettingProduk + "/3")}>
                                    +
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label 
                                    style={{ color: "black" }} 
                                    htmlFor={`variabelbpjs`}
                                    className="form-label">
                                    Formularium
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <span className="form-check ms-2">
                                    <Input className="form-check-input" 
                                        type="checkbox" 
                                        checked={validation.values.isnasional}
                                        id="isnasional" 
                                        onChange={e => validation.setFieldValue("isnasional", e.target.checked)}/>
                                    <Label className="form-check-label" htmlFor="isnasional" style={{ color: "black" }} >
                                        Nasional
                                    </Label>
                                </span>
                                <span className="form-check ms-2">
                                    <Input className="form-check-input" 
                                        type="checkbox" 
                                        checked={validation.values.isrs}
                                        id="isrs" 
                                        onChange={e => validation.setFieldValue("isrs", e.target.checked)}/>
                                    <Label className="form-check-label" htmlFor="isrs" style={{ color: "black" }} >
                                        Nasional
                                    </Label>
                                </span>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
                <Row>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <Button type="submit" color="info" placement="top" id="tooltipTop" >
                            Simpan
                        </Button>
                    </div>
                </Row>
            </Form>
        </TabPane>
    )
}

export default SettingProduk;