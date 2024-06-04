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

import { taskWidgets } from '../../../common/data';
import CountUp from "react-countup";

import {
    daftarPasienIGDGet
} from '../../../store/actions';
// Imported Images
import pac from "../../../assets/images/sudah-periksa.png";
//import images
import pria from "../../../assets/images/svg/pria.svg"
import baby from "../../../assets/images/svg/baby.svg"
import anaklaki from "../../../assets/images/svg/anaklaki.svg"
import kakek from "../../../assets/images/svg/kakek.svg"
import nenek from "../../../assets/images/svg/nenek.svg"
import anakperempuan from "../../../assets/images/svg/anakperempuan.svg"
import dewasaperempuan from "../../../assets/images/svg/dewasaperempuan.svg"

import KonsulModal from '../../../Components/Common/KonsulModal';
import { comboRegistrasiGet } from '../../../store/master/action';
import StatusPulangModal from '../../../Components/Common/StatusPulangModal';
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect';
import "./DaftarPasienIGD.scss"
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr';
import SearchInput from '../../../Components/Common/CustomInput/SearchInput';

const DaftarPasienIGD = () => {
    document.title = "Daftar Pasien Rawat Darurat";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, datawidget, loading, error, dataCombo, loadingCombo, errorCombo, successUpdateTaskId,
        newDataDokumen, successDokumen } = useSelector((state) => ({
            data: state.DaftarPasien.daftarPasienIGDGet.data,
            loading: state.DaftarPasien.daftarPasienIGDGet.loading,
            error: state.DaftarPasien.daftarPasienIGDGet.error,
            dataCombo: state.Master.comboRegistrasiGet.data,
            loadingCombo: state.Master.comboRegistrasiGet.loading,
            errorCombo: state.Master.comboRegistrasiGet.error,
        }));
    const [userChosen, setUserChosen] = useState({
        nama: "",
        id: "",
        profile:''
    })
    const current = new Date();
    const [dateStart, setdateStart] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [dateEnd, setdateEnd] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
    const [search, setSearch] = useState('')
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
        dispatch(daftarPasienIGDGet({ noregistrasi: search, start: dateStart, end: dateEnd }));
    }
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            // console.log(search)
            // useEffect(() => {
            dispatch(daftarPasienIGDGet({ noregistrasi: search, start: dateStart, end: dateEnd }));
            // }, [dispatch]);
        }
    }
    
    const handleToPengkajian = async (data) => {
        history(`/emr-pasien/${data.norecdp}/${data.norecta}/rawat-jalan`)
       
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
                                <DropdownItem onClick={() => handleToPengkajian(row)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Pengkajian Pasien</DropdownItem>
                                <DropdownItem href="#!" onClick={() => handleClickPulang(row)}><i className="ri-run-line align-bottom me-2 text-muted"></i>Pulang</DropdownItem>
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
    const handleClickRM = (row) => {
        setUserChosen({
            nama: row.namapasien,
            id: row.noidentitas,
            profile:row.profile
        })
    };
    const [statusPulangModal, setstatusPulangModal] = useState(false);
    const [tempNorecAp, settempNorecAp] = useState('');
    const [tempNorecDp, settempNorecDp] = useState('');
    useEffect(() => {
        dispatch(daftarPasienIGDGet(''));
        dispatch(comboRegistrasiGet());
    }, [dispatch]);
    const handleClickPulang = (e) => {
        setstatusPulangModal(true);
        settempNorecDp(e.norecdp)
        settempNorecAp(e.norecta)
    }
    return (
        <React.Fragment>
            <StatusPulangModal
                show={statusPulangModal}
                // onSimpanClick={handleSimpanKonsul}
                onCloseClick={() => setstatusPulangModal(false)}
                tempNorecDp={tempNorecDp}
                dataStatusPulang={dataCombo.statuspulang}
                tempNorecAp={tempNorecAp}
            />
            <UiContent />
            <div className="page-content daftar-pasien-igd">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien IGD" pageTitle="Forms" />
                    <Row>
                        <Col lg={3}>
                            <Card>
                                <CardBody>
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
                                        {/* <p className="text-muted mb-0">{userChosen.id}</p> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={9}>
                            <Card>
                                <CardHeader className="card-header-snb ">
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>Daftar Pasien IGD</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row className="g-3">
                                            <Col lg={12}>
                                                <Row>
                                                    <Col sm={4}>
                                                        <KontainerFlatpickr
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
                                                    </Col>
                                                    <Col lg={1}><h4 className='mt-2'>s/d</h4></Col>
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
                                                    </Col>
                                                    <Col lg={2}>
                                                        <SearchInput type="text" className="form-control search"
                                                            placeholder="Search..." onChange={event => setSearch(event.target.value)}
                                                            onKeyDown={handleFilter} />
                                                    </Col>
                                                    <Col lg={1}>
                                                        <Button type="button" color='info' placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
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
                                            columns={columns}
                                            pagination
                                            data={data}
                                            progressPending={loading}
                                            progressComponent={<LoadingTable />}
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

export default withRouter(DaftarPasienIGD);