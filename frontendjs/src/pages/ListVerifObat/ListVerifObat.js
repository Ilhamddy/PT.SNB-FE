import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getAllVerifResep } from "../../store/farmasi/action"
import { ToastContainer } from "react-toastify"
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table, Input, Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip, Button, FormFeedback, Label, Modal, ModalBody } from "reactstrap";
import DataTable from "react-data-table-component";
import NoDataTable from "../../Components/Table/NoDataTable";
import LoadingTable from "../../Components/Table/LoadingTable";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import CustomSelect from "../Select/Select";

const initialRetur = {
    norecverif: "",
    data: {
        noresep: "",
        namadepo: "",
        namaobat: "",
        qty: "",
    }
}

const ListVerifObat = () => {
    const dispatch = useDispatch()

    const {dataVerif} = useSelector(state => ({
        dataVerif: state.Farmasi.getAllVerifResep?.data?.dataverif || []
    }))

    const [dataModal, setDataModal] = useState(initialRetur)

    useEffect(() => {
        dispatch(getAllVerifResep())
    }, [dispatch])

    console.log(dataModal)
    
    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsTransaksi = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            cell: row => (
                <div className="hstack gap-3 flex-wrap">
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
                                        namaobat: row.namaproduk,
                                    }
                                })
                            }}>
                                <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                </i>
                                Retur Obat
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>)
                ,
            sortable: true,
            width: "70px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>R/</span>,
            sortable: true,
            selector: row => row.koder + (row.kodertambahan ? "." + row.kodertambahan : ""),
            width: "150px"
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
            selector: row => row.namaobat,
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
            <ModalRetur dataModal={dataModal} toggle={() => setDataModal({...initialRetur})}/>
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="List Verif Obat" pageTitle="List Verif Obat" />
                <Card className="p-5">
                    <Row className="mb-2">
                        <DataTable
                            fixedHeader
                            fixedHeaderScrollHeight="700px"
                            columns={columnsTransaksi}
                            pagination
                            data={dataVerif}
                            progressPending={false}
                            customStyles={tableCustomStyles}
                            expandableRows
                            progressComponent={<LoadingTable />}
                            noDataComponent={<NoDataTable dataName={"data order"}/>}
                        />
                    </Row>
                </Card>
            </Container>
        </div>
    )
}

const ModalRetur = ({dataModal, ...rest}) => {

    const vRetur = useFormik({
        initialValues: {
            norecverif: "",
            qtyretur: "",
        }
    })
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
                            options={[]}
                            onChange={(e) => {}}
                            value={vRetur.values.jenis}
                            className={`input ${!!vRetur?.errors.jenis ? "is-invalid" : ""}`}
                            />
                        {vRetur.touched.jenis 
                            && !!vRetur.errors.jenis && (
                                <FormFeedback type="invalid" >
                                    <div>
                                        {vRetur.errors.jenis}
                                    </div>
                                </FormFeedback>
                            )
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
                            value={""} 
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
                            value={""} 
                            readOnly
                            />
                    </Col>
                </Row>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <Button type="submit" color="info" placement="top" id="tooltipTop" >
                        Cetak
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
            backgroundColor: '#e67e22',
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