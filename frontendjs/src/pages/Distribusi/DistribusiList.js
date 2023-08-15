import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrderBarang } from "../../store/actions"
import LoadingTable from "../../Components/Table/LoadingTable"
import DataTable from "react-data-table-component"
import BreadCrumb from "../../Components/Common/BreadCrumb"
import { ToastContainer } from "react-toastify"
import { Card, Container } from "reactstrap"


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
            name: <span className='font-weight-bold fs-13'>Tanggal Kirim</span>,
            sortable: true,
            selector: row => "-",
            width: "100px"
        },    
        {
            name: <span className='font-weight-bold fs-13'>No Kirim</span>,
            sortable: true,
            selector: row => "-",
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
            selector: row => row.namaunittujuan,
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