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

import pria from "../../../assets/images/svg/pria.svg"
import baby from "../../../assets/images/svg/baby.svg"
import anaklaki from "../../../assets/images/svg/anaklaki.svg"
import kakek from "../../../assets/images/svg/kakek.svg"
import nenek from "../../../assets/images/svg/nenek.svg"
import anakperempuan from "../../../assets/images/svg/anakperempuan.svg"
import dewasaperempuan from "../../../assets/images/svg/dewasaperempuan.svg"

import { widgetdaftarPasienRIGet, daftarPasienRIGet, daftarPasienResetForm } from '../../../store/actions';
import { comboRegistrasiGet } from '../../../store/master/action';
import CustomSelect from '../../Select/Select';
import KonsulModal from '../../../Components/Common/KonsulModal';
import StatusPulangModal from '../../../Components/Common/StatusPulangModal';
import StatusPulangRIModal from '../../../Components/Common/StatusPulangRIModal';
import DepositModal from '../../../Components/Common/DepositModal/DepositModal';
import "./DaftarPasienRI.scss"
import LoadingTable from '../../../Components/Table/LoadingTable';
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles';

const DaftarPasienRI = () => {
    document.title = "Daftar Pasien Rawat Inap";
    const dispatch = useDispatch();
    const history = useNavigate();
    const [norecPulangRI, setNorecPulangRI] = useState("");
    const [norecPulangRIAP, setNorecPulangRIAP] = useState("");
    const [dpDeposit, setdpDeposit] = useState("");
    const [userChosen, setUserChosen] = useState({
        nama: "",
        id: "",
        profile:''
    })
    const { data, datawidget, loading, error, dataCombo,loadingCombo } = useSelector((state) => ({
        data: state.DaftarPasien.daftarPasienRIGet.data,
        datawidget: state.DaftarPasien.widgetdaftarPasienRIGet.data,
        loading: state.DaftarPasien.daftarPasienRIGet.loading,
        error: state.DaftarPasien.daftarPasienRIGet.error,
        dataCombo: state.Master.comboRegistrasiGet.data,
        loadingCombo: state.Master.comboRegistrasiGet.loading,
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

    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (data) => {
                return (
                    <div className="hstack gap-3 flex-wrap">
                        <Link to={`/emr-pasien/${data.norecdp}/${data.norecta}/rawat-jalan`} className="link-success fs-15" id="tooltipTop"><i className="ri-edit-2-line"></i></Link>
                        <UncontrolledTooltip placement="top" target="tooltipTop" > Pengkajian Pasien </UncontrolledTooltip>
                        <UncontrolledDropdown className="dropdown d-inline-block">
                            <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button" id="tooltipTop2">
                                <i className="ri-apps-2-line"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#!" onClick={() => handleClickKonsul(data)}><i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>Konsul Antar Unit</DropdownItem>
                                <DropdownItem href="#!" onClick={() => {setNorecPulangRI(data.norecdp); setNorecPulangRIAP(data.norecta)}}><i className="ri-run-line align-bottom me-2 text-muted"></i>Pulang</DropdownItem>
                                <DropdownItem href="#!" onClick={() => {setdpDeposit(data.norecdp)}}><i className="ri-run-line align-bottom me-2 text-muted"></i>Deposit</DropdownItem>
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
    const handleClickRM = (row) => {
        setUserChosen({
            nama: row.namapasien,
            id: row.noidentitas,
            profile:row.profile
        })
    };
    let unitRI = dataCombo.unit?.filter((unitRI) => 
        unitRI.objectinstalasifk === 2
    ) || []
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
            <StatusPulangRIModal 
                norecdp={norecPulangRI} 
                norecAP={norecPulangRIAP}
                toggle={() => setNorecPulangRI("")} />
            <DepositModal toggle={() => setdpDeposit("")} norecdp={dpDeposit}/>
            <UiContent />
            <div className="page-content daftar-pasien-rawat-inap">
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
                                </Card>
                            </Col>
                        ))}
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
                                        <p className="text-muted mb-0">{userChosen.id}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={9}>
                            <Card>
                            <CardHeader style={{ backgroundColor: "#FFCB46",
                                borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
                                padding: '10px 15px' }}>
                                    <h4 className="card-title mb-0" style={{ color: 'black' }}>Daftar Pasien Rawat Inap</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row>
                                            <Col sm={4}>
                                                <CustomSelect
                                                    id="doktertujuan"
                                                    name="doktertujuan"
                                                    className="row-header"
                                                    options={unitRI}
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
                                                <Button type="button" color='info' placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                                    CARI
                                                </Button>
                                                <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
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
                                            customStyles={tableCustomStyles}
                                            progressComponent={<LoadingTable />}
                                            expandableRows
                                            expandableRowsComponent={ExpandableDeposit}
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

const ExpandableDeposit = ({ data }) => {

    if(data.deposit.length === 0 ){
        return <></>
    }
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Tanggal Deposit</th>
                    <th scope="col">Nominal</th>
                    <th scope="col">NoBB</th>
                </tr>
            </thead>
            <tbody>

            {data.deposit.map((item, key) =>
                <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{item.tglinput}</td>
                    <td>{item.nominal?.toLocaleString("id-ID") || ""}</td>
                    <td>{item.nobukti}</td>
                </tr>
            )}
            </tbody>
        </table>

    )
}


export default withRouter(DaftarPasienRI)