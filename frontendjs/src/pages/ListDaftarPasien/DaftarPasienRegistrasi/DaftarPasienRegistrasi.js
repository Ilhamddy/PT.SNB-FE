import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Flatpickr from "react-flatpickr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CountUp from "react-countup";
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";
import { daftarPasienResetForm, daftarPasienRegistrasiGet, widgetdaftarPasienRegistrasiGet } from '../../../store/actions';
import { comboRegistrasiGet } from '../../../store/master/action';
import CustomSelect from '../../Select/Select';
import "./DaftarPasienRegistrasi.scss"
import LoadingTable from '../../../Components/Table/LoadingTable';
import BatalRegistrasi from '../../../Components/Common/BatalRegistrasi';
const DaftarPasienRegistrasi = () => {
    document.title = "Daftar Pasien Rawat Jalan";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, loading, error, datawidget, dataCombo, loadingCombo, errorCombo } = useSelector((state) => ({
        data: state.DaftarPasien.daftarPasienRegistrasiGet.data,
        datawidget: state.DaftarPasien.widgetdaftarPasienRegistrasiGet.data,
        loading: state.DaftarPasien.daftarPasienRegistrasiGet.loading

    }));

    const [userChosen, setUserChosen] = useState({
        nama: "",
        id: "",
    })
    const current = new Date();
    const [dateStart, setdateStart] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [dateEnd, setdateEnd] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [search, setSearch] = useState('')
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
    const handleBeginOnChangeStart = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        setdateStart(dateString)
    }
    const handleBeginOnChangeEnd = (newBeginValue) => {
        var dateString = new Date(newBeginValue.getTime() - (newBeginValue.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        setdateEnd(dateString)
    }
    const handleClickCari = () => {
        dispatch(daftarPasienRegistrasiGet(`${search}&start=${dateStart}&end=${dateEnd}`));
    }
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            dispatch(daftarPasienRegistrasiGet(`${search}&start=${dateStart}&end=${dateEnd}`));
        }
    }
    useEffect(() => {
        dispatch(widgetdaftarPasienRegistrasiGet(''))
        dispatch(daftarPasienRegistrasiGet(''));

    }, [dispatch]);
    useEffect(() => {
        return () => {
            dispatch(daftarPasienResetForm());
        }
    }, [dispatch])
    const handleClickRM = (row) => {
        setUserChosen({
            nama: row.namapasien,
            id: row.noidentitas
        })
    };
    const [tempNorecDp, settempNorecDp] = useState('');
    const [batalModal, setbatalModal] = useState(false);
    const handleToCancel = async (norecdp) => {
        settempNorecDp(norecdp)
        setbatalModal(true)
    }
    const handleToCloseBatalModal = async () => {
        setbatalModal(false)
        handleClickCari()
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
                                <DropdownItem onClick={() => handleToCancel(row.norecdp)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Batal Registrasi</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                );
            },
            width: "70px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Registrasi</span>,
            selector: row => row.tglregistrasi,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No. Registrasi</span>,
            // selector: row => row.noregistrasi,
            sortable: true,
            selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClickRM(row)}>{row.noregistrasi}</button>),
            // cell: (data) => {
            //     return (
            //         // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
            //         <button className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>View</button>
            //     );
            // },
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>No. RM</span>,
            selector: row => row.nocm,
            sortable: true,
            width: "100px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Poliklinik</span>,
            selector: row => row.namaunit,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>DPJP Tujuan</span>,
            selector: row => row.namadokter,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Jenis Pasien</span>,
            selector: row => row.jenispenjamin,
            sortable: true
        },
    ];
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <BatalRegistrasi
                show={batalModal}
                onSimpanClick={() => setbatalModal(false)}
                onCloseClick={() => handleToCloseBatalModal()}
                tempNorecDp={tempNorecDp} />
            <UiContent />
            <div className="page-content daftar-pasien-registrasi">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien Registrasi" pageTitle="Forms" />

                    <Row>
                        {datawidget.map((item, key) => (
                            <Col xxl={4} sm={6} key={key}>
                                <Card className="card-animate">
                                    <CardBody>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="fw-medium text-muted mb-0">Total Pasien {item.label}</p>
                                                <h2 className="mt-4 ff-secondary fw-semibold">
                                                    <span className="counter-value" style={{ fontSize: "5rem" }}>
                                                        <CountUp
                                                            start={0}
                                                            end={item.counter}
                                                            decimal={item.decimals}
                                                            duration={3}
                                                        />
                                                    </span>
                                                </h2>

                                            </div>
                                            <div>
                                                <div className="avatar-xl flex-shrink-0">
                                                    <span className={"avatar-title rounded-circle fs-4 bg-soft-" + item.iconClass + " text-" + item.iconClass}>
                                                        <img src={item.icon}
                                                            alt="" className="avatar-lg" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
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
                                <CardHeader className="align-items-center d-flex">
                                    <div className="live-preview">
                                        <Row>
                                            <Col>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Daftar Pasien Registrasi <span style={{ color: '#FFCB46' }}> </span></h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row className="g-3">
                                            <Col lg={12}>
                                                <Row>
                                                    <Col sm={4}>
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
                                                                    handleBeginOnChangeStart(dateStart);
                                                                }}
                                                            />
                                                            <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                                        </div>
                                                    </Col>
                                                    <Col lg={1}><h4>s/d</h4></Col>
                                                    <Col sm={4}>
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
                                                                    handleBeginOnChangeEnd(dateEnd);
                                                                }}
                                                            />
                                                            <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                                        </div>
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
                                            </Col>
                                        </Row>
                                    </div>
                                    <div id="table-gridjs">
                                        {/* <Col className="col-sm">
                                            <div className="d-flex justify-content-sm-end">
                                                <div className="search-box ms-2">
                                                    <input type="text" className="form-control search"
                                                        placeholder="Search..." />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="700px"
                                            progressComponent={<LoadingTable />}
                                            columns={columns}
                                            pagination
                                            data={data}
                                            progressPending={loading}
                                            customStyles={tableCustomStyles}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(DaftarPasienRegistrasi)