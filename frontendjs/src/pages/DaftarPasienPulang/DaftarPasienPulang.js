import { useFormik } from "formik";
import userDummy from "../../assets/images/users/user-dummy-img.jpg";
import pria from "../../assets/images/svg/pria.svg"
import baby from "../../assets/images/svg/baby.svg"
import anaklaki from "../../assets/images/svg/anaklaki.svg"
import kakek from "../../assets/images/svg/kakek.svg"
import nenek from "../../assets/images/svg/nenek.svg"
import anakperempuan from "../../assets/images/svg/anakperempuan.svg"
import dewasaperempuan from "../../assets/images/svg/dewasaperempuan.svg"
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
import "./DaftarPasienPulang.scss"
import { useNavigate } from "react-router-dom";
import LoadingTable from "../../Components/Table/LoadingTable";


const DaftarPasienPulang = () => {
    document.title = "Daftar Pasien Pulang";
    const [userChosen, setUserChosen] = useState({
        nama: "",
        id: "",
        profile:''
    })
    const {dataPasienPlg, comboboxReg} = useSelector((state) => ({
        dataPasienPlg: state.DaftarPasien.daftarPasienPulangGet.data || [],
        comboboxReg: state.Master.comboRegistrasiGet.data || {},
    }))
    const [dateStart, setDateStart] = useState(() => (new Date()).toISOString());
    const [dateEnd, setDateEnd] = useState(() => (new Date()).toISOString());
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

    useEffect(() => {
        dispatch(daftarPasienPulangGet({
            dateStart: dateStart,
            dateEnd: dateEnd
        }))
        dispatch(comboAsuransiGet());
        dispatch(comboRegistrasiGet());
    }, [dispatch,dateStart,dateEnd])

    const handleFilter = () => {
        // dispatch(daftarPasienPulangGet(dateStart, dateEnd))
    }
    const handleClickCari = () => {
        dispatch(daftarPasienPulangGet({dateStart, dateEnd, instalasi, unit: "", search}))
    }
    const handleToVerif = async (norecdp) => {
        norecdp 
            && navigate(`/payment/verif-tagihan/${norecdp}`)    
    }
    const handleClickUser = (row) => {
        setUserChosen({
            nama: row.namapasien,
            id: row.noidentitas,
            profile:row.profile
        })
    }
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (row) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <UncontrolledTooltip placement="top" target="tooltipTop2" > Pengkajian Pasien </UncontrolledTooltip>
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem onClick={() => handleToVerif(row.norecdp)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Verif</DropdownItem>
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
            width: "200px",
            wrap: true
        },
        {
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => row.noregistrasi,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No. RM</span>,
            selector: row => row.nocmfk,
            sortable: true,
            width: "50px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit Asal</span>,
            selector: row => row.namaunit,
            sortable: true,
            width: "110px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Penjamin</span>,
            selector: row => row.namapenjamin,
            sortable: true,
            width: "140px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Tgl Pulang</span>,
            selector: row => dateTimeLocal(new Date(row.tglpulang)),
            sortable: true,
            width: "200px",
            wrap: true

        },
    ];
    const [pillsTab, setpillsTab] = useState("1");
    return(
        <div className="page-content daftar-pasien-pulang">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Daftar Pasien Pulang" pageTitle="Daftar Pasien Pulang" />
                <Row>
                    <Col lg={3}>
                        <Card>
                            <CardBody>
                                {/* <h5 className="card-title mb-5">Profile Pasien</h5> */}
                                <div className="text-center">
                                    {/* <img src={userDummy}
                                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                        alt="user-profile" /> */}
                                        {userChosen?.profile === 'baby' ? (
                                            <img src={baby} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                                        ) : userChosen?.profile === 'dewasalaki' ? (
                                            <img src={pria} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                                        ) : userChosen?.profile === 'anaklaki' ? (
                                            <img src={anaklaki} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                                        ) : userChosen?.profile === 'anakperempuan' ? (
                                            <img src={anakperempuan} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                                        ) : userChosen?.profile === 'dewasaperempuan' ? (
                                            <img src={dewasaperempuan} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                                        ) : userChosen?.profile === 'kakek' ? (
                                            <img src={kakek} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                                        ) : userChosen?.profile === 'nenek' ? (
                                            <img src={nenek} alt="" className="rounded-circle mb-3 avatar-xl img-thumbnail user-profile-image" />
                                        ) : (
                                            // Render when none of the conditions are met
                                            <p>No profile image available</p>
                                        )}
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
                                                    setDateEnd(new Date(dateEnd - dateEnd.getTimezoneOffset() * 60000).toISOString());
                                                }}
                                            />
                                        </div>
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
                                    
                                    {/* <Col lg={2}>
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
                                        <Button type="button" color="info" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
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
                                    highlightOnHover
                                    pointerOnHover
                                    onRowClicked={(row) => handleClickUser(row)}
                                    data={dataPasienPlg || []}
                                    progressPending={false}
                                    customStyles={tableCustomStyles}
                                    progressComponent={<LoadingTable />}
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
            backgroundColor: '#FFCB46',
        },
    },
    rows: {
        style: {
            color: "black",
            backgroundColor: "#f1f2f6"
        },
    }
}

export default DaftarPasienPulang;