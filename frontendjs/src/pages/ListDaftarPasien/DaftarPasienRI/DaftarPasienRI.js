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

import { widgetdaftarPasienRIGet, daftarPasienRIGet, daftarPasienResetForm } from '../../../store/actions';
import { comboRegistrasiGet } from '../../../store/master/action';
import CustomSelect from '../../Select/Select';
import KonsulModal from '../../../Components/Common/KonsulModal';

const DaftarPasienRI = () => {
    document.title = "Daftar Pasien Rawat Inap";
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, datawidget, loading, error, dataCombo } = useSelector((state) => ({
        data: state.DaftarPasien.daftarPasienRIGet.data,
        datawidget: state.DaftarPasien.widgetdaftarPasienRIGet.data,
        loading: state.DaftarPasien.daftarPasienRIGet.loading,
        error: state.DaftarPasien.daftarPasienRIGet.error,
        dataCombo: state.Master.comboRegistrasiGet.data,
    }));
    const [dataUnit, setdataUnit] = useState([]);
    useEffect(() => {
        dispatch(widgetdaftarPasienRIGet(''));
        dispatch(comboRegistrasiGet());
        dispatch(daftarPasienRIGet(''))
    }, [dispatch]);
    useEffect(() => {
        return () => {
            dispatch(daftarPasienResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        if (dataCombo !== []) {
            var newArray = dataCombo.unit.filter(function (el) {
                return el.objectinstalasifk === 1;
            });
            setdataUnit(newArray)
        }
    }, [dataCombo, dispatch])
    const [search, setSearch] = useState('')
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            // console.log(search)
            // useEffect(() => {
            // dispatch(daftarPasienRJGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
            // dispatch(widgetdaftarPasienRJGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
            // }, [dispatch]);
        }
    }
    const [selectedSingle, setSelectedSingle] = useState(null);
    function handleSelectSingle(selectedSingle) {
        setSelectedSingle(selectedSingle);
    }
    const handleClickCari = () => {
        // dispatch(daftarPasienRJGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
        // dispatch(widgetdaftarPasienRJGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
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

    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <Link to={`/emr-pasien/${data.norecdp}/${data.norecta}`} className="link-success fs-15" id="tooltipTop"><i className="ri-edit-2-line"></i></Link>
                        <UncontrolledTooltip placement="top" target="tooltipTop" > Pengkajian Pasien </UncontrolledTooltip>


                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#!" onClick={() => handleClickKonsul(data)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Konsul Antar Unit</DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledTooltip placement="top" target="tooltipTop2" > Menu </UncontrolledTooltip>
                    </div>
                );
            },
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
            selector: row => (<button className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>{row.noregistrasi}</button>),
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

            name: <span className='font-weight-bold fs-13'>Jenis Pasein</span>,
            selector: row => row.jenispenjamin,
            sortable: true
        },
    ];
    const handleClick = (e) => {

        // console.log('this is:', e.namapasien);
    };
    const [konsulModal, setkonsulModal] = useState(false);
    const [dataUnitKonsul, setdataUnitKonsul] = useState([]);
    const [dataDokter, setdataDokter] = useState([]);
    const [tempNorecAp, settempNorecAp] = useState('');
    const handleClickKonsul = (e) => {
        setkonsulModal(true);
        // console.log(dataCombo.unit)
        var newArray = dataCombo.unit.filter(function (el) {
            return el.objectinstalasifk === 1;
        });
        setdataUnitKonsul(newArray)
        setdataDokter(dataCombo.pegawai)
        settempNorecAp(e.norecta)
    };
    const handleSimpanKonsul = () => {
        // if (product) {
        setkonsulModal(false);
        // }
    };
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <KonsulModal
                show={konsulModal}
                onSimpanClick={handleSimpanKonsul}
                onCloseClick={() => setkonsulModal(false)}
                tempNorecAp={tempNorecAp}
                dataUnit={dataUnit}
                dataDokter={dataDokter}
            />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien Rawat Inap" pageTitle="Forms" />
                    <Row>
                        {datawidget.map((item, key) => (
                            <Col xxl={4} sm={6} key={key}>
                                <Card className="card-animate">
                                    <CardBody>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="fw-medium text-muted mb-0">Total Tempat Tidur {item.label}</p>
                                                <h2 className="mt-4 ff-secondary fw-semibold">
                                                    <span className="counter-value" style={{ fontSize: "5rem" }}>
                                                        <CountUp
                                                            start={0}
                                                            end={item.counter}
                                                            decimal={item.decimals}
                                                            // suffix={item.suffix}
                                                            duration={3}
                                                        />
                                                    </span>
                                                </h2>
                                                {/* <p className="mb-0 text-muted"><span className={"badge bg-light mb-0 text-" + item.badgeClass}>
                                                    <i className={"align-middle " + item.badge}></i> {item.percentage}
                                                </span> vs. previous month</p> */}
                                            </div>
                                            <div>
                                                <div className="avatar-xl flex-shrink-0">
                                                    <span className={"avatar-title rounded-circle fs-4 bg-soft-" + item.iconClass + " text-" + item.iconClass}>
                                                        {/* <i className={item.icon}></i> */}
                                                        <img src={item.icon}
                                                            alt="" className="avatar-lg" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                    {/* <div className="card-footer" style={{ backgroundColor: '#e67e22' }}>
                                        <div className="text-center">
                                            <Link to="#" className="link-light" onClick={() => handleClickCard(item)}>View <i className="ri-arrow-right-s-line align-middle lh-1"></i></Link>
                                        </div>
                                    </div> */}
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
                                        <h5 className="fs-17 mb-1">Testing</h5>
                                        <p className="text-muted mb-0">Testing</p>
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
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Daftar Pasien Rawat Inap <span style={{ color: '#e67e22' }}></span></h4>
                                            </Col>
                                        </Row>
                                    </div>

                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row>
                                            <Col sm={4}>
                                                <CustomSelect
                                                    id="doktertujuan"
                                                    name="doktertujuan"
                                                    options={dataUnit}
                                                    value={selectedSingle}
                                                    onChange={() => {
                                                        handleSelectSingle();
                                                    }}
                                                />
                                            </Col>
                                            <Col sm={4}>
                                                {/* <div className="d-flex justify-content-sm-end"> */}
                                                <div className="search-box ms-2">
                                                    <input type="text" className="form-control search"
                                                        placeholder="Search..." onChange={event => setSearch(event.target.value)}
                                                        onKeyDown={handleFilter} />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                                {/* </div> */}
                                            </Col>
                                            <Col lg={3}>
                                                <Button type="button" className="rounded-pill" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                                    CARI
                                                </Button>
                                                <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div id="table-gridjs">
                                        <DataTable
                                            fixedHeader
                                            fixedHeaderScrollHeight="400px"
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

export default withRouter(DaftarPasienRI)