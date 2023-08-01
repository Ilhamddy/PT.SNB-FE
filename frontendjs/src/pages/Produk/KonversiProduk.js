import { 
    useState, 
    useEffect, 
    useRef 
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, 
    Col, 
    Form, 
    FormFeedback, 
    Input, 
    Label, 
    Row, 
    TabPane, 
    UncontrolledTooltip
} from "reactstrap";
import CustomSelect from "../Select/Select";
import DataTable from "react-data-table-component";
import { kemasanSaveOrUpdate, konversiKemasanQueryGet, konversiProdukQueryGet } from "../../store/gudang/action";
import { useFormik } from "formik";
import * as Yup from "yup"
import { Link, useNavigate, useParams } from "react-router-dom";
import { rgxAllPeriods, rgxValidNumber } from "../../utils/regexcommon.js";
import { onChangeStrNbr } from "../../utils/format";

const KonversiProduk = ({tabId}) => {
    const {paramobat} = useParams();
    const dispatch = useDispatch();
    const refQSearch = useRef("");
    const refKemasan = useRef(null);
    const navigate = useNavigate();

    const { 
        listProduk,
        comboSettingProduk,
        satuanProduk,
        produkTerpilih
    } = useSelector(state => ({
        listProduk: state.Gudang.konversiProdukQueryGet.data?.produk || [],
        comboSettingProduk: state.Master.comboSettingProdukGet.data?.satuan || [],
        satuanProduk: state.Master.comboSettingProdukGet.data?.satuanproduk || [],
        produkTerpilih: state.Gudang.konversiKemasanQueryGet
    }));




    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            idkemasanproduk: "",
            idproduk: "",
            namaproduk: "",
            idkemasan: "",
            jumlahkonversi: "",
            satuanjual: ""
        },
        validationSchema: Yup.object({
            idproduk: Yup.string().required("Pilih produk terlebih dahulu"),
            idkemasan: Yup.string().required("Kemasan harus diisi"),
            jumlahkonversi: Yup.string().required("Jumlah konversi harus diisi"),
            satuanjual: Yup.string().required("Satuan jual harus diisi")
        }),
        onSubmit: (values) => {
            console.log("masuk")
            let newValues = {...values}
            let newJml = newValues.jumlahkonversi.replace(rgxAllPeriods, "")
            newJml = Number(newJml);
            newValues.jumlahkonversi = newJml;
            dispatch(
                kemasanSaveOrUpdate(newValues, () => {
                    dispatch(konversiKemasanQueryGet({ idproduk: newValues.idproduk }))
                })
            )
        }
    })

    useEffect(() => {
        dispatch(konversiProdukQueryGet({ qsearch: refQSearch.current }))
    }, [dispatch])


    useEffect(() => {
        paramobat && dispatch(konversiKemasanQueryGet({ idproduk: paramobat }))
    }, [dispatch, paramobat])

    useEffect(() => {
        const produk = produkTerpilih.data?.produk
        if (!produk) return;
        const setFF = validation.setFieldValue
        setFF("idproduk", produk.id);
        setFF("namaproduk", produk.namaproduk);
        setFF("satuanjual", produk.idsatuan);
    }, [
        produkTerpilih.data?.produk,
        validation.setFieldValue
    ])

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
            name: <span className='font-weight-bold fs-13'>Barcode</span>,
            sortable: true,
            selector: row => row.barcode,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Produk</span>,
            sortable: true,
            selector: (row, index) => (
                <div>
                    <Link
                        className="lain-edit-2-line"
                        id={`edit-konv-produk-${index}`}
                        to={`/farmasi/gudang/setting-produk/konversi-produk/${row.id}`}
                        >
                            {row.namaproduk}
                    </Link>
                    <UncontrolledTooltip 
                        placement="top" 
                        target={`edit-konv-produk-${index}`}> 
                        Edit {row.namaproduk}
                    </UncontrolledTooltip>
                </div>),
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan Jual</span>,
            selector: row => row.satuan,
            sortable: true,
            width: "170px"
        }
    ];

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsKemasan = [
        {
            name: <span className='font-weight-bold fs-13'>ID</span>,
            selector: row => row.id,
            sortable: true,
            width: "50px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Kemasan</span>,
            sortable: true,
            selector: row => row.kemasan,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Jumlah</span>,
            sortable: true,
            selector: row => row.nilaikonversi,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan Jual</span>,
            selector: row => row.satuan,
            sortable: true,
            width: "170px"
        }
    ];

    return (
        <TabPane tabId={tabId} id="home2">
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}
                className="gy-4"
                action="#">
                <Row className="mb-5">
                    <Col lg={4}>
                        <Label className="form-label mt-2" 
                            htmlFor="tipeproduk"
                            style={{ color: "black" }} 
                            >
                            Nama Produk/Deskripsi Produk
                        </Label>
                    </Col>
                    <Col lg={5}>
                        <Input 
                            id={`namaproduk`}
                            name={`namaproduk`}
                            type="text"
                            onChange={(e) => {refQSearch.current = e.target.value}}
                            />
                    </Col>
                    <Col lg={2}>
                        <Button type="button"
                            color="info" 
                            className="rounded-pill" 
                            placement="top" 
                        >
                            Cari
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <DataTable 
                            fixedHeader
                            columns={columnsProduk}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5]}
                            data={listProduk}
                            progressPending={false}
                            customStyles={tableCustomStyles}
                        />
                    </Col>
                    
                    <Col lg={6}>
                        <Row className="mb-2">
                            <DataTable 
                                fixedHeader
                                columns={columnsKemasan}
                                pagination
                                paginationPerPage={5}
                                paginationRowsPerPageOptions={[5]}
                                data={produkTerpilih.data?.kemasan || []}
                                progressPending={produkTerpilih.loading || false}
                                customStyles={tableCustomStyles}
                                
                            />
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label className="form-label mt-2" 
                                    htmlFor="namaproduk"
                                    style={{ color: "black" }}
                                    >
                                Produk
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <Input 
                                    id={`namaproduk`}
                                    name={`namaproduk`}
                                    type="text"
                                    value={validation.values.namaproduk} 
                                    onChange={validation.handleChange}
                                    invalid={
                                        validation.touched.idproduk 
                                            && !!validation.errors.idproduk
                                    }
                                    disabled
                                    />
                                {validation.touched.idproduk
                                    && !!validation.errors.idproduk && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.idproduk}
                                            </div>
                                        </FormFeedback>
                                    )
                                }
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label className="form-label mt-2" 
                                    htmlFor="idkemasan"
                                    style={{ color: "black" }}
                                    >
                                Kemasan
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <CustomSelect
                                    id={`idkemasan`}
                                    name={`idkemasan`}
                                    options={satuanProduk}
                                    onChange={(e) => {
                                        validation.setFieldValue('idkemasan', e?.value || "")
                                    }}
                                    value={validation.values.idkemasan}
                                    ref={refKemasan}
                                    className={`input ${validation.errors.idkemasan ? "is-invalid" : ""}`}
                                    />
                                {validation.touched.idkemasan
                                    && !!validation.errors.idkemasan && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.idkemasan}
                                            </div>
                                        </FormFeedback>
                                    )
                                }
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label className="form-label mt-2" 
                                    htmlFor="kemasan"
                                    style={{ color: "black" }}
                                    >
                                Jumlah/konversi
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <Input 
                                    id={`jumlahkonversi`}
                                    name={`jumlahkonversi`}
                                    type="text"
                                    value={validation.values.jumlahkonversi} 
                                    onChange={
                                        (e) => {
                                            const newVal = onChangeStrNbr(
                                                e.target.value, 
                                                validation.values.jumlahkonversi
                                            )
                                            validation.setFieldValue("jumlahkonversi", newVal)
                                        }
                                    }
                                    invalid={
                                        validation.touched.jumlahkonversi 
                                            && !!validation.errors.jumlahkonversi
                                    }
                                    />
                                {validation.touched.jumlahkonversi 
                                    && validation.errors.jumlahkonversi ? (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.jumlahkonversi}
                                            </div>
                                        </FormFeedback>
                                    ) : null
                                }
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg={5}>
                                <Label className="form-label mt-2" 
                                    htmlFor="kemasan"
                                    style={{ color: "black" }}
                                    >
                                Satuan Jual
                                </Label>
                            </Col>
                            <Col lg={7}>
                                <CustomSelect
                                    id={`satuanjual`}
                                    name={`satuanjual`}
                                    options={comboSettingProduk}
                                    value={validation.values.satuanjual}
                                    isDisabled
                                    ref={refKemasan}
                                    className={`input ${validation.errors.satuanjual ? "is-invalid" : ""}`}
                                    />
                                {validation.touched.satuanjual
                                    && !!validation.errors.satuanjual && (
                                        <FormFeedback type="invalid" >
                                            <div>
                                                {validation.errors.satuanjual}
                                            </div>
                                        </FormFeedback>
                                    )
                                }
                            </Col>
                        </Row>
                        <Row>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                    {validation.values.idkemasanproduk ? "Edit" : "Tambah"}
                                </Button>
                                <Button type="button" 
                                    className="btn-danger" 
                                    placement="top" 
                                    id="tooltipTop" 
                                    onClick={() => {}}
                                    >
                                    Batal
                                </Button>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Form>
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

export { KonversiProduk }