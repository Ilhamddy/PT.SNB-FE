import { 
    Button,
    Card,
    CardBody,
    Col,
    Container,
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    Row, 
    UncontrolledDropdown, 
    UncontrolledTooltip 
} from "reactstrap";
import DataTable from 'react-data-table-component';
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { kartuStokQueryGet, penerimaanListQueryGet } from "../../store/actions";
import CountUp from "react-countup";
import BreadCrumb from "../../Components/Common/BreadCrumb";



const KartuStok = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        kartuStok
    } = useSelector((state) => ({
        kartuStok: state.Gudang.kartuStokQueryGet || [],
    }))

    useEffect(() => {
        dispatch(kartuStokQueryGet({}))
    }, [dispatch])

    /**
     * @type {import("react-data-table-component").TableColumn[]}
     */
    const columnsKartuStok = [
        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            sortable: true,
            selector: (row, index) => index + 1,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tanggal Transaksi</span>,
            sortable: true,
            selector: row => row.tglinput,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Transaksi</span>,
            sortable: true,
            selector: row => row.tabeltransaksi === "t_penerimaanbarangdetail" ? "Penerimaan" : "Pengeluaran",
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Item</span>,
            sortable: true,
            selector: row => row.namaproduk,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Batch</span>,
            sortable: true,
            selector: row => row.nobatch,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Saldo Awal</span>,
            sortable: true,
            selector: row => row.saldoawal,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Saldo Masuk</span>,
            sortable: true,
            selector: row => row.masuk,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Saldo Keluar</span>,
            sortable: true,
            selector: row => row.keluar,
            width: "100px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Saldo Akhir</span>,
            sortable: true,
            selector: row => row.saldoakhir,
            width: "100px"
        }

    ];

    return (
        <div className="page-content page-list-penerimaan">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Kartu stok" pageTitle="Kartu stok " />
                <Card className="p-5">
                    <Row>
                        <div id="table-gridjs">
                            <DataTable
                                fixedHeader
                                fixedHeaderScrollHeight="400px"
                                columns={columnsKartuStok}
                                pagination
                                data={kartuStok?.data?.kartustok || []}
                                progressPending={kartuStok?.loading}
                                customStyles={tableCustomStyles}
                            />
                        </div>
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


export default KartuStok;