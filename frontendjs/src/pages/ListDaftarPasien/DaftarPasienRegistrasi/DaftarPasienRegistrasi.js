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
import { daftarPasienResetForm, daftarPasienRegistrasiGet, widgetdaftarPasienRegistrasiGet } from '../../../store/actions';
import { comboRegistrasiGet } from '../../../store/master/action';
import CustomSelect from '../../Select/Select';
import "./DaftarPasienRegistrasi.scss"
import LoadingTable from '../../../Components/Table/LoadingTable';
import BatalRegistrasi from '../../../Components/Common/BatalRegistrasi';
import pria from "../../../assets/images/svg/pria.svg"
import baby from "../../../assets/images/svg/baby.svg"
import anaklaki from "../../../assets/images/svg/anaklaki.svg"
import kakek from "../../../assets/images/svg/kakek.svg"
import nenek from "../../../assets/images/svg/nenek.svg"
import anakperempuan from "../../../assets/images/svg/anakperempuan.svg"
import dewasaperempuan from "../../../assets/images/svg/dewasaperempuan.svg"
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr';
import MergeNoRegistrasi from '../../../Components/Common/MergeNoRegistrasi';

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
        profile:''
    })
    const [dateNow] = useState(() => new Date())
    const [dateStart, setdateStart] = useState(() => new Date().toISOString())
    const [dateEnd, setdateEnd] = useState(`${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`);
    const [search, setSearch] = useState('')
    
    const handleBeginOnChangeStart = (newBeginValue) => {
        let dateString = newBeginValue?.toISOString() || ""
        setdateStart(dateString)
    }
    const handleBeginOnChangeEnd = (newBeginValue) => {
        let dateString = newBeginValue?.toISOString() || ""
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
        dispatch(daftarPasienRegistrasiGet(`${""}&start=${dateNow.toISOString()}&end=${dateNow.toISOString()}`));
    }, [dispatch, dateNow]);
    useEffect(() => {
        return () => {
            dispatch(daftarPasienResetForm());
        }
    }, [dispatch])
    const handleClickRM = (row) => {
        setUserChosen({
            nama: row.namapasien,
            id: row.noidentitas,
            profile:row.profile
        })
    };
    const [tempNorecDp, settempNorecDp] = useState('');
    const [tempNorecDpMerge, settempNorecDpMerge] = useState({
        norec: '',
        noregistrasi: '',
    });

    const [batalModal, setbatalModal] = useState(false);
    const handleToCancel = async (norecdp) => {
        settempNorecDp(norecdp)
        setbatalModal(true)
    }
    const handleToCloseBatalModal = async () => {
        setbatalModal(false)
        handleClickCari()
    }
    const handleToMergeNoregistrasi = async (row) => {
        settempNorecDpMerge({
            norec: row.norecdp,
            noregistrasi: row.noregistrasi
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
                                <DropdownItem onClick={() => handleToCancel(row.norecdp)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Batal Registrasi</DropdownItem>
                                <DropdownItem onClick={() => handleToMergeNoregistrasi(row)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Merge No. Registrasi</DropdownItem>
                                <Link to={`/registrasi/pasien-ruangan/${row.idpasien}/${row.norecdp}`}>
                                    <DropdownItem ><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Edit Registrasi</DropdownItem>
                                </Link>
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
            <MergeNoRegistrasi
                show={!!tempNorecDpMerge.norec}
                onCloseClick={() => settempNorecDpMerge({
                    norec: '',
                    noregistrasi: ''
                })}
                tempNorecDp={tempNorecDpMerge} />
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
                                                    <span className="counter-value" style={{ fontSize: "1.5rem" }}>
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
                                                <div className="avatar-md flex-shrink-0">
                                                    <span className={"avatar-title rounded-circle fs-4 bg-soft-" + item.iconClass + " text-" + item.iconClass}>
                                                        <img src={item.icon}
                                                            alt="" className="avatar-md" />
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
                                <CardHeader className="card-header-snb ">
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>Daftar Pasien Registrasi</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row className="g-3">
                                            <Col lg={12}>
                                                <Row>
                                                    <Col sm={4}>
                                                        <KontainerFlatpickr
                                                            options={{
                                                                mode: "range",
                                                                dateFormat: "Y-m-d",
                                                                defaultDate: "today"
                                                            }}
                                                            value={[dateStart, dateEnd]}
                                                            onChange={([dateStart, dateEnd]) => {
                                                                handleBeginOnChangeStart(dateStart);
                                                                handleBeginOnChangeEnd(dateEnd);
                                                            }}
                                                        />
                                                    </Col>
                                                    {/* <Col lg={1} className='mt-2'><h4>s/d</h4></Col>
                                                    <Col sm={4}>
                                                        <KontainerFlatpickr
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
                                                    </Col> */}
                                                    <Col lg={"auto"}>
                                                        <div className="d-flex justify-content-sm-end">
                                                            <div className="search-box ms-2">
                                                                <input type="text" className="form-control search"
                                                                    placeholder="No RM/Nama pasien..." onChange={event => setSearch(event.target.value)}
                                                                    onKeyDown={handleFilter} />
                                                                <i className="ri-search-line search-icon"></i>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg={1}>
                                                        <Button 
                                                            type="button" 
                                                            color='info' 
                                                            placement="top" 
                                                            id="tooltipTopPencarian" 
                                                            onClick={handleClickCari}>
                                                            CARI
                                                        </Button>
                                                        <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div id="table-gridjs">
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