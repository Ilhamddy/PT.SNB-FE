import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrderBarang, getStokUnitGudang } from "../../store/actions"
import LoadingTable from "../../Components/Table/LoadingTable"
import DataTable from "react-data-table-component"
import BreadCrumb from "../../Components/Common/BreadCrumb"
import { ToastContainer } from "react-toastify"
import { Button, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown, UncontrolledTooltip } from "reactstrap"
import { Link } from "react-router-dom"


const StokUnitList = () => {
    const dispatch = useDispatch()

    const {
        stokUnit
    } = useSelector(state => ({
        stokUnit: state.Gudang?.getStokUnitGudang?.data?.stokUnit || []
    }))

    useEffect(() => {
        dispatch(getStokUnitGudang())
    }, [dispatch])

     /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
     const columnsProduk = [
        {
            name: <span className='font-weight-bold fs-13'>Nama Produk</span>,
            sortable: true,
            selector: row => row.namaproduk || "-",
            width: "100px"
        },    
        {
            name: <span className='font-weight-bold fs-13'>Nama Unit</span>,
            sortable: true,
            selector: row => row.namaunit || "-",
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No Batch</span>,
            sortable: true,
            selector: row => row.nobatch || "-",
            width: "100px"
        }, 
        {
            name: <span className='font-weight-bold fs-13'>Quantity</span>,
            sortable: true,
            selector: row => row.qty || "0",
            width: "100px"
        }, 

        
    ];

    return (
        <div className="page-content page-penerimaan-barang">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Order Barang" pageTitle="Gudang" />
                <Card className="p-5">

                    <Row>

                        <DataTable 
                            fixedHeader
                            columns={columnsProduk}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5]}
                            data={stokUnit}
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

export default StokUnitList