import { useState, useEffect, useRef } from "react";
import { 
    Button, 
    Card, 
    CardBody, 
    Col, 
    Container, 
    Form, 
    FormFeedback, 
    Input, 
    Label, 
    Nav, 
    NavItem, 
    NavLink, 
    Row, 
    TabContent, 
    TabPane 
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { comboSettingProdukGet } from "../../store/master/action";
import {detailProdukSaveOrUpdate, lainLainGet, satuanSaveOrUpdate, sediaanSaveOrUpdate} from "../../store/gudang/action";
import DataTable from "react-data-table-component";
import { KonversiProduk } from "./KonversiProduk";


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

    const vDetailJenisProduk = useFormik({
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
            dispatch(detailProdukSaveOrUpdate(values))
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
            dispatch(sediaanSaveOrUpdate(values))
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
            satuan: Yup.string().required("Satuan harus diisi"),
            jenissatuan: Yup.string().required("Jenis satuan harus diisi")
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(satuanSaveOrUpdate(values));
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
            selector: row => row.statusenabled ? "Aktif" : "NonAktif",
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
            selector: row => row.statusenabled ? "Aktif" : "NonAktif",
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
            selector: row => row.statusenabled ? "Aktif" : "NonAktif",
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
            label: "NonAktif"
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
                        vDetailJenisProduk.handleSubmit();
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
                                value={vDetailJenisProduk.values.detailjenisproduk} 
                                onChange={vDetailJenisProduk.handleChange}
                                invalid={
                                    vDetailJenisProduk.touched.detailjenisproduk 
                                        && !!vDetailJenisProduk.errors.detailjenisproduk
                                }
                                />
                            {vDetailJenisProduk.touched.detailjenisproduk 
                                && vDetailJenisProduk.errors.detailjenisproduk ? (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vDetailJenisProduk.errors.detailjenisproduk}
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
                                    vDetailJenisProduk.setFieldValue('jenisproduk', e?.value || "")
                                }}
                                value={vDetailJenisProduk.values.jenisproduk}
                                ref={refJenisProduk}
                                />
                            {vDetailJenisProduk.touched.jenisproduk
                                && !!vDetailJenisProduk.errors.jenisproduk && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vDetailJenisProduk.errors.jenisproduk}
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
                                onChange={(e) => {vDetailJenisProduk.setFieldValue('statusenabled', e.value)}}
                                value={vDetailJenisProduk.values.statusenabled}
                                />
                            {vDetailJenisProduk.touched.statusenabled
                                && !!vDetailJenisProduk.errors.statusenabled && (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vDetailJenisProduk.errors.statusenabled}
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
                                    vDetailJenisProduk.resetForm()
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
                        console.log(vSatuan.values)
                        console.log(vSatuan.errors)
                        vSatuan.handleSubmit();
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

export default LainLain