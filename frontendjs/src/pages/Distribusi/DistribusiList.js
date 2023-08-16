import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrderBarang } from "../../store/actions"
import LoadingTable from "../../Components/Table/LoadingTable"
import DataTable from "react-data-table-component"
import BreadCrumb from "../../Components/Common/BreadCrumb"
import { ToastContainer } from "react-toastify"
import { Button, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown, UncontrolledTooltip } from "reactstrap"
import { Link } from "react-router-dom"


const DistribusiOrderList = () => {
    const dispatch = useDispatch()

    const {
        listOrder
    } = useSelector(state => ({
        listOrder: state.Distribusi.getOrderBarang.data?.order || []
    }))

    useEffect(() => {
        dispatch(getOrderBarang())
    }, [dispatch])

     /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
     const columnsProduk = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            cell: (row) => (
                <div className="hstack gap-3 flex-wrap">
                    <UncontrolledTooltip 
                        placement="top" 
                        target="edit-produk" > 
                        Detail Produk 
                    </UncontrolledTooltip>
                    <UncontrolledDropdown className="dropdown d-inline-block">
                        <DropdownToggle 
                            className="btn btn-soft-secondary btn-sm" 
                            itemType="button"
                            id="edit-produk">
                            <i className="ri-apps-2-line"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <Link to={`/farmasi/gudang/distribusi-kirim/${row.norecorder}`}>
                                <DropdownItem >
                                    <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                    </i>
                                    Kirim Order
                                </DropdownItem>
                            </Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>)
                ,
            sortable: true,
            width: "70px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Tanggal Kirim</span>,
            sortable: true,
            selector: row => row.tglkirim || "-",
            width: "100px"
        },    
        {
            name: <span className='font-weight-bold fs-13'>No Kirim</span>,
            sortable: true,
            selector: row => row.nokirim || "-",
            width: "100px"
        },        
        {
            name: <span className='font-weight-bold fs-13'>Tanggal Order</span>,
            sortable: true,
            selector: row => row.tglorder,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No Order</span>,
            sortable: true,
            selector: row => row.noorder,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Unit Membutuhkan</span>,
            sortable: true,
            selector: row => row.namaunitasal,
            width: "200px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Jenis Kirim</span>,
            sortable: true,
            selector: row => row.namajenisorder,
            width: "200px"
        },
    ];

    return (
        <div className="page-content page-penerimaan-barang">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Order Barang" pageTitle="Gudang" />
                <Card className="p-5">
                    <Row className="d-flex flex-row-reverse mb-3">
                        <Col lg={2} className="d-flex flex-row-reverse">
                            <Link to={"/farmasi/gudang/distribusi-order"}>
                                <Button color={"info"}>
                                    Tambah
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>

                        <DataTable 
                            fixedHeader
                            columns={columnsProduk}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5]}
                            data={listOrder}
                            progressPending={false}
                            customStyles={tableCustomStyles}
                            progressComponent={<LoadingTable />}
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

export default DistribusiOrderList