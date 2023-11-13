import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { createAntreanFarmasi, createOrUpdateRetur, getAllVerifResep, getAntreanFromDP } from "../../store/farmasi/action"
import { ToastContainer } from "react-toastify"
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table, Input, Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip, Button, FormFeedback, Label, Modal, ModalBody } from "reactstrap";
import DataTable from "react-data-table-component";
import NoDataTable from "../../Components/Table/NoDataTable";
import LoadingTable from "../../Components/Table/LoadingTable";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import CustomSelect from "../Select/Select";
import { useNavigate, useParams } from "react-router-dom";
import { getComboReturObat } from "../../store/master/action";
import { onChangeStrNbr, strToNumber } from "../../utils/format";
import * as Yup from "yup";

const initialRetur = {
    norecverif: "",
    data: {
        noresep: "",
        namadepo: "",
        namaobat: "",
        qty: "",
        nobatch: "",
        unit: "",
    }
}

const ListVerifObat = () => {
    const dispatch = useDispatch()
    const {norecdp} = useParams();

    const {dataVerif} = useSelector(state => ({
        dataVerif: state.Farmasi.getAllVerifResep?.data?.dataverif || []
    }))

    const [dataModal, setDataModal] = useState(initialRetur)
    const [isOpenTambah, setIsOpenTambah] = useState(false)

    useEffect(() => {
        dispatch(getAllVerifResep({norecdp: norecdp}))
        dispatch(getAntreanFromDP({norecdp: norecdp}))
    }, [dispatch, norecdp])

    useEffect(() => {
        dispatch(getComboReturObat())
    }, [dispatch])
    
    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsTransaksi = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            cell: row => (
                <div className="hstack gap-3 flex-wrap">
                    {!row.kodertambahan && 
                    <>
                        <UncontrolledTooltip placement="top" target="detail-produk" > Detail Produk </UncontrolledTooltip>
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="detail-produk">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem onClick={() => {
                                    setDataModal({
                                        norecverif: row.norecverif,
                                        data: {
                                            noresep: row.noresep,
                                            namadepo: row.namaunit,
                                            unit: row.unit,
                                            namaobat: row.namaproduk,
                                            qty: row.qty,
                                            nobatch: row.nobatch,
                                        }
                                    })
                                }}>
                                    <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                    </i>
                                    Retur Obat
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </>
                    }
                </div>)
                ,
            sortable: true,
            width: "70px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>R/</span>,
            sortable: true,
            selector: row => (row.koder) + (row.kodertambahan ? ("." + row.kodertambahan) : ""),
            width: "60px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No Resep</span>,
            sortable: true,
            selector: row => row.noresep,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Depo</span>,
            sortable: true,
            selector: row => row.namaunit,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Obat</span>,
            sortable: true,
            selector: row => row.namaproduk,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Quantity</span>,
            sortable: true,
            selector: row => row.qty,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Harga</span>,
            sortable: true,
            selector: row => row.harga,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Total Harga</span>,
            sortable: true,
            selector: row => row.total,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No Batch</span>,
            sortable: true,
            selector: row => row.nobatch,
            width: "120px"
        },
        
    ];

    return (
        <div className="page-content page-verifikasi-resep">
            <ModalRetur dataModal={dataModal} 
                toggle={() => setDataModal({...initialRetur})}
                onRetur={() => {
                    dispatch(getAllVerifResep({norecdp: norecdp}))
                }}
            />
            <ModalTambahObat 
                isOpen={isOpenTambah}
                toggle={() => setIsOpenTambah(!isOpenTambah)}
            />
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="List Verif Obat" pageTitle="List Verif Obat" />
                <Card className="p-5">
                    <Row className="mb-2">
                        <Row className="d-flex flex-row-reverse mb-3">
                            <Col lg={2} className="d-flex flex-row-reverse">
                                <Button color={"info"}
                                    onClick={() => setIsOpenTambah(true)}>
                                    Menu
                                </Button>
                            </Col>
                        </Row>
                        <DataTable
                            fixedHeader
                            fixedHeaderScrollHeight="700px"
                            columns={columnsTransaksi}
                            pagination
                            data={dataVerif}
                            progressPending={false}
                            customStyles={tableCustomStyles}
                            progressComponent={<LoadingTable />}
                            noDataComponent={<NoDataTable dataName={"order"}/>}
                        />
                    </Row>
                </Card>
            </Container>
        </div>
    )
}

const ModalTambahObat = ({dataModal, ...rest}) => {
    const {norecdp} = useParams();

    const {
        dataAntrean
    } = useSelector(state => ({
        dataAntrean: state.Farmasi.getAntreanFromDP?.data?.dataantrean || []
    }))
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsAntrean = [
        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            sortable: true,
            selector: row => row.no,
            width: "40px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl registrasi</span>,
            sortable: true,
            selector: row => row.tanggalregistrasi,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Unit</span>,
            sortable: true,
            selector: row => row.namaunitasal || row.namaunit,
            width: "200px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Penjamin</span>,
            sortable: true,
            selector: row => row.namarekanan,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Masuk</span>,
            sortable: true,
            selector: row => row.tanggalmasuk,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Keluar</span>,
            sortable: true,
            selector: row => row.tanggalkeluar,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'></span>,
            sortable: true,
            selector: row => <Button color="info" onClick={() => {
                navigate(`/farmasi/tambah-obat-farmasi/${row.norecap}`)
            }}>Tambah</Button>,
            width: "120px"
        },  
    ];
    return (
        <Modal 
            centered={true}
            size="xl" {...rest}>
            <ModalBody className="py-12 px-12">
                <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="700px"
                    columns={columnsAntrean}
                    data={dataAntrean}
                    progressPending={false}
                    customStyles={tableCustomStyles}
                    progressComponent={<LoadingTable />}
                    noDataComponent={<NoDataTable dataName={"antrean pasien"}/>}
                    />
            </ModalBody>
            {/* <Row className="d-flex gap-2 justify-content-center mb-3">
                <Col lg={3}>
                    <Button color="success" onClick={() => {
                        dispatch(createAntreanFarmasi({
                            norecdp: norecdp
                        }, () => {
                            dispatch(getAntreanFromDP({norecdp: norecdp}))
                        }))
                    }}>
                        Tambah Resep
                    </Button>
                </Col>
            </Row> */}
        </Modal>
    )
}

const ModalRetur = ({dataModal, onRetur, ...rest}) => {
    const {
        alasan
    } = useSelector(state => ({
        alasan: state.Master?.getComboReturObat?.data?.alasan || []
    }))
    const dispatch = useDispatch()
    const vRetur = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecverif: "",
            qty: "",
            qtyretur: "",
            alasan: "",
            unit: "",
            nobatch: "",
        },
        validationSchema: Yup.object({
            qty: Yup.string().required("qty kosong Lab wajib diisi"),
            qtyretur: Yup.string().required("qtyretur wajib diisi"),
            alasan: Yup.string().required("alasan wajib diisi"),
        }),
        onSubmit: (values) => {
            const newVal = {...values}
            newVal.qty = strToNumber(newVal.qty)
            newVal.qtyretur = strToNumber(newVal.qtyretur)
            dispatch(createOrUpdateRetur(newVal, () => {
                onRetur(); 
                rest.toggle()
            }))
            
        }
    })
    useEffect(() => {
        const setFF = vRetur.setFieldValue
        setFF("norecverif", dataModal.norecverif)
        setFF("qty", dataModal.data.qty)
        setFF("nobatch", dataModal.data.nobatch)
        setFF("unit", dataModal.data.unit)
    }, [dataModal, vRetur.setFieldValue])
    return (
        <Modal isOpen={!!dataModal.norecverif} centered={true} size="xl" {...rest}>
            <ModalBody className="py-12 px-12">
                <Row>
                    <Col lg={6}>
                        <div className="mt-2">
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor="namapasien" 
                                className="form-label">
                                No resep
                            </Label>
                        </div>
                        <Input 
                            id={`noresep`}
                            name={`noresep`}
                            type="text"
                            value={dataModal.data.noresep} 
                            readOnly
                            disabled
                            />
                    </Col>
                    <Col lg={6}>
                        <div className="mt-2">
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor="namapasien" 
                                className="form-label">
                                Depo
                            </Label>
                        </div>
                        <Input 
                            id={`namadepo`}
                            name={`namadepo`}
                            type="text"
                            value={dataModal.data.namadepo} 
                            readOnly
                            disabled
                            />
                    </Col>
                    <Col lg={6}>
                        <div className="mt-2">
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor="namapasien" 
                                className="form-label">
                                Obat
                            </Label>
                        </div>
                        <Input 
                            id={`namaobat`}
                            name={`namaobat`}
                            type="text"
                            value={dataModal.data.namaobat} 
                            readOnly
                            disabled
                            />
                    </Col>
                    <Col>
                        <div className="mt-2">
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor="namapasien" 
                                className="form-label">
                                Alasan
                            </Label>
                        </div>
                        <CustomSelect
                                id="alasan"
                                name="alasan"
                                options={alasan}
                                onChange={(e) => {
                                    vRetur.setFieldValue("alasan", e.value)
                                }}
                                value={vRetur.values.alasan}
                                className={`input ${!!vRetur.errors.alasan 
                                    && vRetur.touched.alasan ? "is-invalid" : ""}`}
                                />
                            {vRetur.touched.alasan 
                                && !!vRetur.errors.alasan ? (
                                    <FormFeedback type="invalid" >
                                        <div>
                                            {vRetur.errors.alasan}
                                        </div>
                                    </FormFeedback>
                                ) : null
                            }
                    </Col>
                    <Col lg={6}>
                        <div className="mt-2">
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor="namapasien" 
                                className="form-label">
                                Quantity
                            </Label>
                        </div>
                        <Input 
                            id={`qty`}
                            name={`qty`}
                            type="text"
                            value={dataModal.data.qty} 
                            disabled
                            readOnly
                            />
                    </Col>
                    <Col lg={6}>
                        <div className="mt-2">
                            <Label 
                                style={{ color: "black" }} 
                                htmlFor="namapasien" 
                                className="form-label">
                                Quantity Retur
                            </Label>
                        </div>
                        <Input 
                            id={`qtyretur`}
                            name={`qtyretur`}
                            type="text"
                            value={vRetur.values.qtyretur} 
                            onChange={(e) => {
                                let newVal = onChangeStrNbr(
                                    e.target.value, 
                                    vRetur.values.qtyretur
                                )
                                if(strToNumber(newVal) > strToNumber(dataModal.data.qty)){
                                    newVal = onChangeStrNbr(
                                        dataModal.data.qty, 
                                        vRetur.values.qtyretur
                                    )
                                }
                                vRetur.setFieldValue("qtyretur", newVal);
                            }}
                            invalid={vRetur.touched?.qtyretur 
                                && !!vRetur.errors?.qtyretur}
                            />
                        {vRetur?.touched.qtyretur
                            && !!vRetur?.errors?.qtyretur && (
                            <FormFeedback type="invalid" >
                                <div>
                                    {vRetur.touched?.qtyretur }
                                </div>
                            </FormFeedback>
                        )}
                    </Col>
                </Row>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <Button 
                        onClick={() => vRetur.handleSubmit()}
                        type="submit" 
                        color="info" placement="top" id="tooltipTop" >
                        Simpan
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => {rest.toggle()}}
                    >
                        Batal
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

const tableCustomStyles = {
    headRow: {
        style: {
            color: '#ffffff',
            backgroundColor: '#FFCB46',
        },
    },
    rows: {
        style: {
            color: "black",
            backgroundColor: "#f1f2f6"
        },
    }
}

export default ListVerifObat