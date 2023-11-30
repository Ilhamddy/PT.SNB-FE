import { 
    Button,
    Card,
    CardBody,
    Col,
    Container,
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    FormFeedback, 
    Row, 
    UncontrolledDropdown, 
    UncontrolledTooltip 
} from "reactstrap";
import DataTable from 'react-data-table-component';
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getComboKartuStok, kartuStokQueryGet, penerimaanListQueryGet } from "../../store/actions";
import CountUp from "react-countup";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import LoadingTable from "../../Components/Table/LoadingTable";
import { dateTimeLocal } from "../../utils/format";
import { useFormik } from "formik"
import * as Yup from "yup"
import ColLabelInput from "../../Components/ColLabelInput/ColLabelInput"
import CustomSelect from "../../pages/Select/Select"
import { tableCustomStyles } from "../../Components/Table/tableCustomStyles";

const KartuStok = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        kartuStok,
        unitUser
    } = useSelector((state) => ({
        kartuStok: state.Gudang.kartuStokQueryGet || [],
        unitUser: state.Gudang.getComboKartuStok.data?.unitUser || []
    }))

    const vFilter = useFormik({
        initialValues: {
            unit: '', 
        },
        validationSchema: Yup.object({
            unit: Yup.string().required("Unit wajib diisi")
        }),
        onSubmit: (values) => {
            dispatch(kartuStokQueryGet(values))
        }
    })

    useEffect(() => {
        dispatch(kartuStokQueryGet({}))
        dispatch(getComboKartuStok({}))
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
            selector: row => dateTimeLocal(row.tglinput),
            width: "180px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Nama Unit</span>,
            sortable: true,
            selector: row => row.unit,
            width: "140px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Transaksi</span>,
            sortable: true,
            selector: row => row.masuk > 0  ? "Penerimaan" : "Pengeluaran",
            width: "140px"
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
                <BreadCrumb title="Kartu stok" pageTitle="Gudang" />
                <Card className="p-5">
                    <Row className="mb-3">
                        <ColLabelInput
                            label="Unit"
                            inputId="unit-filter"
                            lg={3}
                        >
                            <CustomSelect
                                id="unit-filter"
                                name="unit"
                                options={unitUser}
                                onChange={(e) => {
                                    vFilter.setFieldValue('unit', e?.value || '')
                                }}
                                value={vFilter.values.unit}
                                className={`input row-header ${
                                    !!vFilter?.errors.unit ? 'is-invalid' : ''
                                }`}
                                />
                            {vFilter.touched.unit &&
                                !!vFilter.errors.unit && (
                                    <FormFeedback type="invalid">
                                        <div>{vFilter.errors.unit}</div>
                                    </FormFeedback>
                                )}
                        </ColLabelInput>
                        <ColLabelInput
                            label=""
                            inputId="tbl-cari"
                            lg="auto"
                        >
                            <Button onClick={() => {
                                    vFilter.handleSubmit()
                                }}
                                color="info"
                            >
                                Cari
                            </Button>
                        </ColLabelInput>
                    </Row>
                    <Row>
                        <DataTable
                            fixedHeader
                            fixedHeaderScrollHeight="700px"
                            columns={columnsKartuStok}
                            pagination
                            data={kartuStok?.data?.kartustok || []}
                            progressPending={kartuStok?.loading}
                            customStyles={tableCustomStyles}
                            progressComponent={<LoadingTable />}
                        />
                    </Row>

                </Card>
            </Container>
        </div>   
    )
}




export default KartuStok;