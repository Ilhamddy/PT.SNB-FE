import { useFormik } from "formik";
import userDummy from "../../assets/images/users/user-dummy-img.jpg";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table, Input, Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import * as Yup from "yup";
import classnames from "classnames"
import { Link } from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import {daftarPasienPulangGet} from "../../store/daftarPasien/action";
import DataTable from "react-data-table-component";
import { dateTimeLocal } from "../../utils/format";
import Flatpickr from "react-flatpickr";
import { comboAsuransiGet, comboRegistrasiGet } from "../../store/master/action";
import CustomSelect from "../Select/Select";
import { useNavigate, useParams } from "react-router-dom";
import { buktiBayarCancel, daftarPiutangPasienGet, daftarTagihanPasienGet, verifNotaCancel } from "../../store/payment/action";
import LoadingTable from "../../Components/Table/LoadingTable";

const dateAwalStart = (new Date(new Date() - 1000 * 60 * 60 * 24 * 3)).toISOString();
const dateAwalEnd = (new Date()).toISOString()


const DaftarPiutangPasien = () => {
    const {
        dataPiutang, 
        comboboxReg
    } = useSelector((state) => ({
        dataPiutang: state.Payment.daftarPiutangPasienGet || []
    }))
    const [userChosen, setUserChosen] = useState({
        nama: "",
        id: "",
    })

    const { location } = useParams();

    const [dateStart, setDateStart] = useState(dateAwalStart);
    const [dateEnd, setDateEnd] = useState(dateAwalEnd);
    const [search, setSearch] = useState("");
    const [instalasi, setInstalasi] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            namapasien: "",
        },
        validationSchema: Yup.object({
            namapasien: Yup.string().required("Nama Pasien belum diisi"),
        }),
        onSubmit: (values) => {
            // console.log(values)
        }
    });



    const handleFilter = () => {
        // dispatch(daftarPasienPulangGet(dateStart, dateEnd))
    }
    const handleClickCari = () => {
        dispatch(daftarPasienPulangGet({dateStart, dateEnd, instalasi, unit: "", search}))
    }
    const handleToBayar = async (norecpiutang, norecnota) => {
        norecpiutang
            && navigate(`/payment/bayar/piutang/${norecpiutang}/${norecnota}`)    
    }
    const handleCancelBayar = (norecnota, norecbayar) => {
        norecbayar && norecnota &&
            dispatch(buktiBayarCancel(
                norecnota, 
                norecbayar, 
                () => dispatch(daftarPiutangPasienGet(location))
            ))
    }
    const handleClickUser = (row) => {
        setUserChosen({
            nama: row.namapasien,
            id: row.noidentitas,
        })
    }
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Action</span>,
            sortable: false,
            cell: (row) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledTooltip placement="top" target="tooltipTop2" > Pilih opsi </UncontrolledTooltip>
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                {!row.norecbukti && <DropdownItem onClick={() => 
                                        handleToBayar(row.norecpiutang, row.norecnota)}>
                                        <i className="ri-mail-send-fill align-bottom me-2 text-muted">
                                        </i>
                                        Bayar
                                    </DropdownItem>
                                }
                                {row.norecbukti && <DropdownItem 
                                        onClick={() => handleCancelBayar(row.norecnota, row.norecbukti)}>
                                        <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                                        Batal Bayar
                                    </DropdownItem>}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                );
            },
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Registrasi</span>,
            selector: row => dateTimeLocal(new Date(row.tglregistrasi)),
            sortable: true,
            width: "160px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClickUser(row)}>{row.noregistrasi}</button>),
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No. RM</span>,
            selector: row => row.nocmfk,
            sortable: true,
            width: "60px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            width: "120px",
            wrap: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Penjamin</span>,
            selector: row => row.namarekanan,
            sortable: true,
            width: "110px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Pulang</span>,
            selector: row => dateTimeLocal(new Date(row.tglpulang)),
            sortable: true,
            width: "120px",
        },
        {
            name: <span className='font-weight-bold fs-13'>T. Piutang</span>,
            selector: row => `Rp${row.totalpiutang?.toLocaleString('id-ID') || 0}`,
            sortable: true,
            width: "110px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>T. Bayar</span>,
            selector: row => `Rp${row.totalbayar?.toLocaleString('id-ID') || 0}`,
            sortable: true,
            width: "110px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Status</span>,
            selector: row => row.totalbayar === 0 ? "Blm Bayar" 
                : row.totalbayar === row.totalpiutang 
                ? "Lunas" 
                : "Bayar Sebagian",
            sortable: true,
            width: "110px",
            wrap: true
        },
    ];
    const [pillsTab, setpillsTab] = useState("1");

    useEffect(() => {
        location && dispatch(daftarPiutangPasienGet(location))
    }, [dispatch, location])
    return(
        <div className="page-content daftar-pasien-pulang">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title={`Daftar Piutang ${location}`} pageTitle={`Daftar Piutang ${location}`} />
                <Row>
                    <Col lg={3}>
                        <Card>
                            <CardBody>
                                <h5 className="card-title mb-5">Profile Pasien</h5>
                                <div className="text-center">
                                    <img src={userDummy}
                                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                        alt="user-profile" />
                                    <h5 className="fs-17 mb-1">{userChosen.nama}</h5>
                                    <p className="text-muted mb-0">{userChosen.id}</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={9}>
                        <Card>
                            <CardBody>
                                <Form onSubmit={(e) => {
                                    e.preventDefault();
                                    return false;
                                }}
                                    className="gy-4"
                                    action="#">

                                </Form>
                                <Row className="row-header mb-2">
                                    <Col sm={3}>
                                        <div className="input-group">
                                            <Flatpickr
                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                options={{
                                                    // mode: "range",
                                                    dateFormat: "Y-m-d",
                                                    defaultDate: "today"
                                                }}
                                                value={dateStart}
                                                onChange={([dateStart]) => {
                                                    setDateStart((new Date(dateStart)).toISOString());
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col sm={1}><h4 className="mt-2">s/d</h4></Col>
                                    <Col sm={3}>
                                        <div className="input-group">
                                            <Flatpickr
                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                options={{
                                                    // mode: "range",
                                                    dateFormat: "Y-m-d",
                                                    defaultDate: "today"
                                                }}
                                                value={dateEnd}
                                                onChange={([dateEnd]) => {
                                                    setDateEnd((new Date(dateEnd)).toISOString());
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    {/* <Col lg={2}>
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
                                    </Col> */}
                                    
                                    <Col lg={1}>
                                        <Button type="button" className="rounded-pill" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                            CARI
                                        </Button>
                                        <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                    </Col>
                                </Row>
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="700px"
                                    columns={columns}
                                    pagination
                                    data={dataPiutang?.data || []}
                                    progressComponent={<LoadingTable />}
                                    progressPending={dataPiutang?.loading || false}
                                    customStyles={tableCustomStyles}
                                />
                            </CardBody>
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

export default DaftarPiutangPasien;