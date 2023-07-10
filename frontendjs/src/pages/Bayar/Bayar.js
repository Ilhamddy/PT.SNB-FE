import { useFormik } from "formik";
import userDummy from "../../assets/images/users/user-dummy-img.jpg";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table, Input, Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip, Button, FormFeedback, Label, CardHeader } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import * as Yup from "yup";
import classnames from "classnames"
import { Link } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import {daftarPasienPulangGet,} from "../../store/daftarPasien/action";
import DataTable from "react-data-table-component";
import { dateISOString, dateTimeLocal } from "../../utils/format";
import Flatpickr from "react-flatpickr";
import { 
    comboAsuransiGet, 
    comboPaymentGet, 
    comboRegistrasiGet,
} from "../../store/master/action";
import { 
    pelayananFromAntreanGet,
    notaVerifCreate
} from "../../store/payment/action";
import CustomSelect from "../Select/Select";
import "./Bayar.scss"
import { useNavigate, useParams } from "react-router-dom";

const dateAwalStart = dateISOString(new Date(new Date() - 1000 * 60 * 60 * 24 * 3));
const dateAwalEnd = dateISOString(new Date())
const date = new Date()


const Bayar = () => {
    const { norecap } = useParams();
    let {
        dataPasienPlg, 
        comboboxReg,
        listPelayanan,
        norecdp,
        comboboxpayment
    } = useSelector((state) => ({
        dataPasienPlg: state.DaftarPasien.daftarPasienPulangGet.data || [],
        comboboxReg: state.Master.comboRegistrasiGet.data || {},
        listPelayanan: state.Payment.pelayananFromNoAntrianGet.data?.pelayanan || null,
        norecdp: state.Payment.pelayananFromNoAntrianGet.data?.objectdaftarpasienfk || "",
        comboboxpayment: state.Master.comboPaymentGet.data?.metodeBayar || []
    }))
    const [listPelayananChecked, setListPelayananChecked] = useState([])



    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            objectdaftarpasienfk: "",
            total: 0,
            no_nota: 'P' 
                + (Math.floor(date.getTime() / 1000)).toString(),
            objectpegawaifk: 1,
            keterangan: "",
            norecppdone: []
        },
        validationSchema: Yup.object({
            keterangan: Yup.string().required("Keterangan harus diisi"),
        }),
        onSubmit: (values) => {
            dispatch(notaVerifCreate(values, () => {dispatch(pelayananFromAntreanGet(norecap))}))
        }
    })



    const [dateStart, setDateStart] = useState(dateAwalStart);
    const [dateEnd, setDateEnd] = useState(dateAwalEnd);
    const [search, setSearch] = useState("");
    const [instalasi, setInstalasi] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(listPelayanan === null) return
        const withChecked = listPelayanan.map((pelayanan) => {
            return {
                ...pelayanan,
                checked: false
            }   
        })
        setListPelayananChecked(withChecked)
    }, [listPelayanan])

    useEffect(() => {
        dispatch(pelayananFromAntreanGet(norecap));
    }, [dispatch, norecap])

    const handleFilter = () => {
        dispatch(daftarPasienPulangGet(dateStart, dateEnd))
    }
    const handleClickCari = () => {
        dispatch(daftarPasienPulangGet({dateStart, dateEnd, instalasi, unit: "", search}))
    }
    const handleToVerif = async (norecpp) => {
        norecpp 
            && navigate(`/payment/verif-tagihan/${norecpp}`)    
    }
    const handleChecked = (checked, norec) => {
        const newListPC = [...listPelayananChecked]
        const index = newListPC.findIndex((item) => item.norec === norec)
        const newItem = {...newListPC[index]}
        newItem.checked = !checked
        newListPC[index] = newItem
        setListPelayananChecked(newListPC)
    }
    const totalObat = listPelayananChecked.reduce((prev, data) => {
        return prev + (data.checked && data.isobat ? (data.total || 0) : 0)
    }, 0)
    const totalLayanan = listPelayananChecked.reduce((prev, data) => {
        return prev + (data.checked && !data.isobat ? (data.total || 0) : 0)
    }, 0)
    const grandTot = totalObat + totalLayanan

    useEffect(() => {
        const hasilCheck = listPelayananChecked.filter((item) => item.checked).map((item) => item.norec)
        validation.setFieldValue("objectdaftarpasienfk", norecdp)
        validation.setFieldValue("total", grandTot)
        validation.setFieldValue("norecppdone", hasilCheck)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [norecdp, validation.setFieldValue, grandTot, listPelayananChecked])
    
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (row) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <Input 
                            className="form-check-input" 
                            type="checkbox" 
                            id={`formcheck-${row.norec}`} 
                            checked={row.checked} 
                            onChange={e => {handleChecked(row.checked, row.norec)}}/>
                    </div>
                );
            },
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Pelayanan</span>,
            selector: row => dateTimeLocal(new Date(row.tglinput)),
            sortable: true,
            width: "160px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Layanan</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => row.namaproduk,
            width: "120px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Petugas</span>,
            selector: row => row.namapegawai,
            sortable: true,
            width: "120px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit</span>,
            selector: row => row.namaunit,
            sortable: true,
            width: "120px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Kelas</span>,
            selector: row => row.namakelas,
            sortable: true,
            width: "110px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Harga</span>,
            selector: row => row.harga,
            sortable: true,
            width: "110px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Qty</span>,
            selector: row => row.qty,
            sortable: true,
            width: "20px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Diskon</span>,
            selector: row => row.discount || 0,
            sortable: true,
            width: "70px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Jasa</span>,
            selector: row => row.jasa || 0,
            sortable: true,
            width: "70px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>C</span>,
            selector: row => `${row.iscito ? "v" : "x"}`,
            sortable: true,
            width: "40px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Total</span>,
            selector: row => row.total,
            sortable: true,
            width: "140px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>No Verif/NBB</span>,
            selector: row => (`${row.no_nota ? `${row.no_nota}/` : ``}`),
            sortable: true,
            width: "140px",
            wrap: true
        },
    ];

    useEffect(() => {
        dispatch(comboPaymentGet())
    }, [dispatch])

    return(
        <div className="page-content page-bayar">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Registrasi Pasien" pageTitle="Verifikasi Tagihan" />
                    <Row>
                        <Col lg={8}>
                            <Card className="p-3">
                                <Row>
                                    <Col lg={6}>
                                        <Label style={{ color: "black" }} htmlFor="keterangan" className="form-label">
                                            Metode Pembayaran
                                        </Label>
                                        <div>
                                            <CustomSelect
                                                id="metodepembayaran"
                                                name="metodepembayaran"
                                                options={comboboxpayment}
                                                onChange={(e) => {
                                                    
                                                }}
                                                value={validation.values.metodepembayaran || ""}
                                            />
                                            {validation.touched.metodepembayaran && validation.errors.metodepembayaran ? (
                                                <FormFeedback type="invalid"><div>{validation.errors.metodepembayaran}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    <Col xxl={6} md={6}>
                                        <Card>
                                            <CardHeader>
                                                
                                            </CardHeader>
                                        </Card>
                                    </Col>
                                </Row>
                                
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card>
                                <Label style={{ color: "black" }} htmlFor="keterangan" className="form-label">
                                    Total Tagihan
                                </Label>
                            </Card>
                        </Col>
                    </Row>
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

export default Bayar;