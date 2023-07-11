import { useFormik } from "formik";
import userDummy from "../../assets/images/users/user-dummy-img.jpg";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table, Input, Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip, Button, FormFeedback, Label } from "reactstrap";
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
    comboRegistrasiGet,
} from "../../store/master/action";
import { 
    pelayananFromAntreanGet,
    notaVerifCreate
} from "../../store/payment/action";
import CustomSelect from "../Select/Select";
import "./VerifikasiPelayanan.scss"
import { useNavigate, useParams } from "react-router-dom";

const dateAwalStart = dateISOString(new Date(new Date() - 1000 * 60 * 60 * 24 * 3));
const dateAwalEnd = dateISOString(new Date())
const date = new Date()


const VerifikasiPelayanan = () => {
    const { norecap } = useParams();
    let {
        dataPasienPlg, 
        comboboxReg,
        listPelayanan,
        norecdp
    } = useSelector((state) => ({
        dataPasienPlg: state.DaftarPasien.daftarPasienPulangGet.data || [],
        comboboxReg: state.Master.comboRegistrasiGet.data || {},
        listPelayanan: state.Payment.pelayananFromNoAntrianGet.data?.pelayanan || null,
        norecdp: state.Payment.pelayananFromNoAntrianGet.data?.objectdaftarpasienfk || "",
    }))
    const [listPelayananChecked, setListPelayananChecked] = useState([])



    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            objectdaftarpasienfk: "",
            total: 0,
            no_nota: `V${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`  ,
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
                        {!row.no_nota && <Input 
                            className="form-check-input" 
                            type="checkbox" 
                            id={`formcheck-${row.norec}`} 
                            checked={row.checked} 
                            onChange={e => {handleChecked(row.checked, row.norec)}}/>}
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
            selector: row => (`Rp${row.harga?.toLocaleString("id-ID") || 0}`),
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
            selector: row => (`Rp${row.total?.toLocaleString("id-ID") || 0}`),
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

    return(
        <div className="page-content verifikasi-pelayanan">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Registrasi Pasien" pageTitle="Verifikasi Tagihan" />
                <Card className="p-2">
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                        }}
                        className="gy-4"
                        action="#">
                        <Row>
                            <Col lg={12}>
                                <Row className="row-header mb-2">
                                    <Col lg={2}>
                                        <CustomSelect
                                            id="instalasifilter"
                                            name="instalasifilter"
                                            className={"row-header"}
                                            options={comboboxReg?.instalasi || []}
                                            onChange={(e) => {setInstalasi(e.value)}}
                                            value={instalasi || ""}
                                        />
                                    </Col>
                                    <Col lg={2}>
                                        <CustomSelect
                                            id="instalasifilter"
                                            name="instalasifilter"
                                            className={"row-header"}
                                            options={comboboxReg?.instalasi || []}
                                            onChange={(e) => {setInstalasi(e.value)}}
                                            value={instalasi || ""}
                                        />
                                    </Col>
                                    
                                    <Col lg={2}>
                                        <div className="d-flex justify-content-sm-end">
                                            <div className="search-box ms-2">
                                                <input type="text" className="form-control search"
                                                    placeholder="Search..." onChange={event => setSearch(event.target.value)}
                                                    onKeyDown={handleFilter} />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </div>
                                    </Col>
                                    
                                    <Col lg={1}>
                                        <Button type="button" className="rounded-pill" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                            CARI
                                        </Button>
                                        <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                    </Col>
                                </Row>
                                <DataTable
                                    fixedHeader
                                    columns={columns}
                                    pagination
                                    data={listPelayananChecked || []}
                                    progressPending={false}
                                    customStyles={tableCustomStyles}
                                />
                            </Col>
                            <Row className="row-header mb-2">
                                <Col lg={1} >
                                    <Label style={{ color: "black" }} htmlFor="keterangan" className="form-label">
                                        Keterangan: 
                                    </Label>
                                </Col>
                                <Col lg={4}>
                                    <Input
                                        id="keterangan"
                                        name="keterangan"
                                        type="keterangan"
                                        placeholder="Isi Keterangan"
                                        style={{ height: '200px' }}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.keterangan || ""}
                                        invalid={
                                            validation.touched.keterangan && validation.errors.keterangan ? true : false
                                        }
                                    />
                                    {validation.touched.keterangan && validation.errors.keterangan ? (
                                        <FormFeedback type="invalid"><div>{validation.errors.keterangan}</div></FormFeedback>
                                    ) : null}
                                </Col>
                                <Col lg={7} className="flex-row-reverse d-flex">
                                    <table className="table-payment ">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Deposit</th>
                                                <th className="text-center">0</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center">Verifikasi Layanan</td>
                                                <td className="text-center">Rp{totalLayanan}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">Verifikasi Resep</td>
                                                <td className="text-center">Rp{totalObat}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">Total Verifikasi</td>
                                                <td className="text-center">Rp{grandTot}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                            <Row className="row-header mb-2">
                                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                    <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                        SIMPAN
                                    </Button>
                                    <button
                                        type="button"
                                        className="btn w-sm btn-danger"
                                        data-bs-dismiss="modal"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </Row>
                        </Row>
                    </Form>
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

export default VerifikasiPelayanan;