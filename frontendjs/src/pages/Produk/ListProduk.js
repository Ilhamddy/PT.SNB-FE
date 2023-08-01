import { useState, useEffect, useRef } from "react";
import { Button, 
    Card, 
    CardBody, 
    Col, 
    Container, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    Input, 
    Row, 
    UncontrolledDropdown, 
    UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { produkMasterGet } from "../../store/actions";



const ListProduk = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        produkMaster
    } = useSelector(state => ({
        produkMaster: state.Gudang.produkMasterGet || null
    }))

    const vFilter = useFormik({
        enableReinitialize: true,
        initialValues: {
            namaproduk: "",
            active: false
        },
        onSubmit: (values) => {

        }
    })
    

    useEffect(() => {
        dispatch(produkMasterGet({}))
    }, [dispatch])


    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsKemasan = [
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
                            <DropdownItem onClick={() => 
                                navigate(`/farmasi/gudang/setting-produk/tambah/${row.id}`)}>
                                <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                </i>
                                Edit
                            </DropdownItem>
                            <DropdownItem 
                                onClick={() => navigate(`/farmasi/gudang/setting-produk/konversi-produk/${row.id}`)}>
                                <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                </i>
                                Konversi
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>)
                ,
            sortable: true,
            width: "70px",
            wrap: true
        },
        // {
        //     name: <span className='font-weight-bold fs-13'>No</span>,
        //     sortable: true,
        //     selector: (row, index) => index + 1,
        //     width: "60px"
        // },
        {
            name: <span className='font-weight-bold fs-13'>ID Produk</span>,
            sortable: true,
            selector: row => row.id,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Aktif</span>,
            sortable: true,
            selector: row => row.statusenabled ? "Aktif" : "Tidak Aktif",
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Produk</span>,
            selector: row => row.namaproduk,
            sortable: true,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Satuan Jual</span>,
            sortable: true,
            selector: row => row.satuanjual,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Variabel BPJS</span>,
            sortable: true,
            selector: row => row.variabelbpjs,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Detail Jenis</span>,
            sortable: true,
            selector: row => row.detailjenisproduk,
            width: "150px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Golongan Obat</span>,
            sortable: true,
            selector: row => row.golonganobat,
            width: "100px"
        },
    ];

    

    return (
        <div className="page-content page-list-produk">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Pembayaran" pageTitle="Pembayaran" />
                    <Card className="p-5">
                        <Row className="justify-content-between mb-5">
                            <Col>
                                <Link to="/farmasi/gudang/setting-produk/tambah">
                                    <Button type="button" color="info">
                                        Setting Produk
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <Input 
                                            id={`namaproduk`}
                                            name={`namaproduk`}
                                            type="text"
                                            value={vFilter.values.namaproduk} 
                                            onChange={vFilter.handleChange}
                                            invalid={
                                                vFilter.touched.jumlahkonversi 
                                                    && !!vFilter.errors.jumlahkonversi
                                            }
                                            />
                                    </Col>
                                    <Col>
                                        <Button type="button" color="info" placement="top" id="tooltipTop" >
                                            Cari
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row >
                            <DataTable 
                                fixedHeader
                                columns={columnsKemasan}
                                pagination
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10]}
                                data={produkMaster?.data?.produk || []}
                                progressPending={produkMaster.loading || false}
                                customStyles={tableCustomStyles}
                            />
                        </Row>
                    </Card>
            </Container>
        </div>
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


export default ListProduk;