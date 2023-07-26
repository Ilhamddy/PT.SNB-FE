import { useState, useEffect, useRef } from "react";
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
import {lainLainGet, obatGudangSave} from "../../store/gudang/action";
import DataTable from "react-data-table-component";


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
                                            className={classnames({ active: tabopen === "tambah", })} 
                                            onClick={() => { navigate(linkSettingProduk + "/tambah"); }} >
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
                                            className={classnames({ active: tabopen === "lain-lain", })} 
                                            onClick={() => { navigate(linkSettingProduk + "/lain-lain"); }} >
                                            Lain-lain
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                        <CardBody>
                            <TabContent activeTab={tabopen} className="text-muted">
                                <TambahProduk />
                                <LainLain />
                            </TabContent>
                        </CardBody>
                    </Card>
                    
            </Container>
        </div>
    )
}



const TambahProduk = () => {
    const dispatch = useDispatch();

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
            tipeproduk: Yup.number().min(0, "Tipe produk harus dipilih"),
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
            dispatch(obatGudangSave(values))
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
        <TabPane tabId="tambah" id="home2">
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
                                <Label className="form-label mt-2" 
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
                                    className="form-label mt-2">
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
                                    className="form-label mt-2">
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
                                    className="form-label mt-2">
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
                                    className="form-label mt-2">
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
                                    className="form-label mt-2">
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
                                    className="form-label mt-2">
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
                                    className="form-label mt-2">
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
                                    className="form-label mt-2">
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
                                        RS
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


const LainLain = () => {

    const dispatch = useDispatch();
    const {
        comboSettingProduk,
        detailjenisproduk,
        sediaan,
        satuan
    } = useSelector(state => ({
        comboSettingProduk: state.Master.comboSettingProdukGet.data,
        detailjenisproduk: state.Gudang.lainLainGet.data?.detailjenisproduk || [],
        sediaan: state.Gudang.lainLainGet.data?.sediaan || [],
        satuan: state.Gudang.lainLainGet.data?.satuan || [],
    }))
    const refJenisProduk = useRef(null);
    const refJenisSatuan = useRef(null);

    const vJenisProduk = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: "",
            detailjenisproduk: "",
            jenisproduk: "",
            statusenabled: true,
        },
        validationSchema: Yup.object({
            detailjenisproduk: Yup.string().required("Detail jenis produk harus diisi"),
            jenisproduk: Yup.string().required("Jenis produk harus diisi"),
        }),
        onSubmit: (values) => {

        }
    })

    const vSediaan = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: "",
            sediaan: "",
            statusenabled: true,
        },
        validationSchema: Yup.object({
            sediaan: Yup.string().required("Sediaan harus diisi")
        }),
        onSubmit: (values) => {

        }
    })

    const vSatuan = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: "",
            satuan: "",
            jenissatuan: "",
            statusenabled: true,
        },
        validationSchema: Yup.object({
            sediaan: Yup.string().required("Sediaan harus diisi"),
            jenissatuan: Yup.string().required("Jenis satuan harus diisi")
        }),
        onSubmit: (values) => {

        }
    })

    useEffect(() => {
        dispatch(lainLainGet())
    }, [dispatch])

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsProduk = [
        {
            name: <span className='font-weight-bold fs-13'>ID</span>,
            selector: row => row.id,
            sortable: true,
            width: "50px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>status enabled</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => row.statusenabled ? "Aktif" : "Tidak Aktif",
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>jenis produk</span>,
            selector: row => row.jenisproduk,
            sortable: true,
            width: "170px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Detail jenis produk</span>,
            selector: row => row.detailjenisproduk,
            sortable: true,
            width: "170px"
        }
    ];

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsSediaan = [
        {
            name: <span className='font-weight-bold fs-13'>ID</span>,
            selector: row => row.id,
            sortable: true,
            width: "50px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Status Enabled</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => row.statusenabled ? "Aktif" : "Tidak Aktif",
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Sediaan</span>,
            selector: row => row.sediaan,
            sortable: true,
            width: "170px"
        }
    ];
    
    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsSatuan = [
        {
            name: <span className='font-weight-bold fs-13'>ID</span>,
            selector: row => row.id,
            sortable: true,
            width: "50px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Status Enabled</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => row.statusenabled ? "Aktif" : "Tidak Aktif",
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Jenis satuan</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => row.jenissatuan,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan</span>,
            selector: row => row.satuan,
            sortable: true,
            width: "170px"
        }
    ];
    

    const optionStatusEnabled = [
        {
            value: true,
            label: "Aktif"
        },
        {
            value: false,
            label: "Tidak Aktif"
        }
    ]


    const RowJenisProdukDetail = (
        <Row className="mb-5">
            <Col lg={6}>
                <DataTable 
                    fixedHeader
                    columns={columnsProduk}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5]}
                    data={detailjenisproduk}
                    progressPending={false}
                    customStyles={tableCustomStyles}
                />
            </Col>
            <Col lg={6}>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        vJenisProduk.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row className="mb-2">
                        <Col lg={5}>
                            <Label className="form-label mt-2" 
                                htmlFor="detailjenisproduk"
                                style={{ color: "black" }} 
                                >
                                Detail jenis produk
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <Input 
                                id={`detailjenisproduk`}
                                name={`detailjenisproduk`}
                                type="text"
                                value={vJenisProduk.values.detailjenisproduk} 
                                onChange={vJenisProduk.handleChange}
                                invalid={
                                    vJenisProduk.touched.detailjenisproduk 
                                        && !!vJenisProduk.errors.detailjenisproduk
                                }
                                />
                            {vJenisProduk.touched.detailjenisproduk 
                                && vJenisProduk.errors.detailjenisproduk ? (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vJenisProduk.errors.detailjenisproduk}
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
                                htmlFor={`jenisproduk`}
                                className="form-label mt-2">
                                Jenis Produk
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <CustomSelect
                                id={`jenisproduk`}
                                name={`jenisproduk`}
                                options={comboSettingProduk?.jenisproduk || []}
                                onChange={(e) => {
                                    vJenisProduk.setFieldValue('jenisproduk', e?.value || "")
                                }}
                                value={vJenisProduk.values.jenisproduk}
                                ref={refJenisProduk}
                                />
                            {vJenisProduk.touched.jenisproduk
                                && !!vJenisProduk.errors.jenisproduk && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vJenisProduk.errors.jenisproduk}
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
                                htmlFor={`statusenabled`}
                                className="form-label mt-2">
                                Status Enabled
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <CustomSelect
                                id={`statusenabled`}
                                name={`statusenabled`}
                                options={optionStatusEnabled}
                                onChange={(e) => {vJenisProduk.setFieldValue('statusenabled', e.value)}}
                                value={vJenisProduk.values.statusenabled}
                                />
                            {vJenisProduk.touched.statusenabled
                                && !!vJenisProduk.errors.statusenabled && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vJenisProduk.errors.statusenabled}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                    </Row>
                    <Row>
                        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                            <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                Tambah
                            </Button>
                            <Button type="button" 
                                className="btn-danger" 
                                placement="top" 
                                id="tooltipTop" 
                                onClick={() => {
                                    vJenisProduk.resetForm()
                                    refJenisProduk.current.clearValue()
                                }}
                                >
                                Batal
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Col>
        </Row>
    )


    const RowSediaan = (
        <Row className="mb-5">
            <Col lg={6}>
                <DataTable 
                    fixedHeader
                    columns={columnsSediaan}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5]}
                    data={sediaan}
                    progressPending={false}
                    customStyles={tableCustomStyles}
                />
            </Col>
            <Col lg={6}>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        vSediaan.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row className="mb-2">
                        <Col lg={5}>
                            <Label className="form-label mt-2" 
                                htmlFor="sediaan"
                                style={{ color: "black" }} 
                                >
                                Sediaan
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <Input 
                                id={`sediaan`}
                                name={`sediaan`}
                                type="text"
                                value={vSediaan.values.sediaan} 
                                onChange={vSediaan.handleChange}
                                invalid={
                                    vSediaan.touched.sediaan 
                                        && !!vSediaan.errors.sediaan
                                }
                                />
                            {vSediaan.touched.sediaan 
                                && !!vSediaan.errors.sediaan && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vSediaan.errors.sediaan}
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
                                htmlFor={`statusenabledsediaan`}
                                className="form-label mt-2">
                                Status Enabled
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <CustomSelect
                                id={`statusenabledsediaan`}
                                name={`statusenabledsediaan`}
                                options={optionStatusEnabled}
                                onChange={(e) => {vSediaan.setFieldValue('statusenabled', e.value)}}
                                value={vSediaan.values.statusenabled}
                                />
                            {vSediaan.touched.statusenabled
                                && !!vSediaan.errors.statusenabled && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vSediaan.errors.statusenabled}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                    </Row>
                    <Row>
                        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                            <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                Tambah
                            </Button>
                            <Button type="button" 
                                className="btn-danger" 
                                placement="top" 
                                id="tooltipTop" 
                                onClick={() => {
                                    vSediaan.resetForm()
                                }}
                                >
                                Batal
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Col>
        </Row>
    )


    const RowSatuan = (
        <Row className="mb-5">
            <Col lg={6}>
                <DataTable 
                    fixedHeader
                    columns={columnsSatuan}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5]}
                    data={satuan}
                    progressPending={false}
                    customStyles={tableCustomStyles}
                />
            </Col>
            <Col lg={6}>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        vSediaan.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row className="mb-2">
                        <Col lg={5}>
                            <Label className="form-label mt-2" 
                                htmlFor="satuan"
                                style={{ color: "black" }} 
                                >
                                Satuan
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <Input 
                                id={`satuan`}
                                name={`satuan`}
                                type="text"
                                value={vSatuan.values.satuan} 
                                onChange={vSatuan.handleChange}
                                invalid={
                                    vSatuan.touched.satuan 
                                        && !!vSatuan.errors.satuan
                                }
                                />
                            {vSatuan.touched.satuan 
                                && !!vSatuan.errors.satuan && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vSatuan.errors.satuan}
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
                                htmlFor={`jenissatuan`}
                                className="form-label mt-2">
                                Jenis Satuan
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <CustomSelect
                                id={`jenissatuan`}
                                name={`jenissatuan`}
                                options={comboSettingProduk?.jenissatuan || []}
                                onChange={(e) => {
                                    vSatuan.setFieldValue('jenissatuan', e?.value || "")
                                }}
                                value={vSatuan.values.jenissatuan}
                                ref={refJenisSatuan}
                                />
                            {vSatuan.touched.jenissatuan
                                && !!vSatuan.errors.jenissatuan && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vSatuan.errors.jenissatuan}
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
                                htmlFor={`statusenabledsatuan`}
                                className="form-label mt-2">
                                Status Enabled
                            </Label>
                        </Col>
                        <Col lg={7}>
                            <CustomSelect
                                id={`statusenabledsatuan`}
                                name={`statusenabledsatuan`}
                                options={optionStatusEnabled}
                                onChange={(e) => {vSatuan.setFieldValue('statusenabled', e.value)}}
                                value={vSatuan.values.statusenabled}
                                />
                            {vSatuan.touched.statusenabled
                                && !!vSatuan.errors.statusenabled && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vSatuan.errors.statusenabled}
                                        </div>
                                    </FormFeedback>
                                )
                            }
                        </Col>
                    </Row>
                    <Row>
                        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                            <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                Tambah
                            </Button>
                            <Button type="button" 
                                className="btn-danger" 
                                placement="top" 
                                id="tooltipTop" 
                                onClick={() => {
                                    vSatuan.resetForm()
                                    refJenisSatuan.current.clearValue()
                                }}
                                >
                                Batal
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Col>
        </Row>
    )


    
    return (
        <TabPane tabId="lain-lain" id="home2">
            {RowJenisProdukDetail}
            {RowSediaan}
            {RowSatuan}
        </TabPane>
    )
}

const tableCustomStyles = {
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: '#B57602'
        },
    },
    rows: {
        style: {
            color: "black",
            backgroundColor: "#f1f2f6"
        },

    }
}

export default SettingProduk;