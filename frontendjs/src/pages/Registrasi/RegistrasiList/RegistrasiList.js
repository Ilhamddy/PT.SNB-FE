import React, { useEffect, useState } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { registrasiGetList, registrasiGetListByOr } from '../../../store/actions';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeaderNew from '../../../Components/Common/PreviewCardHeaderNew';
import UiContent from '../../../Components/Common/UiContent';
import { Link } from 'react-router-dom';
import withRouter from '../../../Components/Common/withRouter';
import DataTable from 'react-data-table-component';
import classnames from "classnames";
//import images
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";

const RegistrasiList = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => ({
        data: state.Registrasi.registrasiList.data,
        loading: state.Registrasi.registrasiList.loading,
        error: state.Registrasi.registrasiList.error,
    }));

    useEffect(() => {
        dispatch(registrasiGetList(''));
    }, [dispatch]);

    // Pills Tabs
    const [pillsTab, setpillsTab] = useState("3");
    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };

    // Profil
    const [namaPasien, setnamaPasien] = useState(null);
    const [noIdentitas, setnoIdentitas] = useState(null);
    const [norm, setnorm] = useState(null);
    const [nohp, setnohp] = useState(null);
    const [alamat, setalamat] = useState(null);
    const [search, setSearch] = useState('')

    const handleClick = (e) => {
        setnamaPasien(e.namapasien)
        setnoIdentitas(e.noidentitas)
        setnorm(e.nocm)
        setnohp(e.nohp)
        setalamat(e.alamatrmh)
        console.log('this is:', e.namapasien);
    };

    const handleFilter = (e) => {
        if (e.keyCode === 13 ) {
            console.log(search)
            // useEffect(() => {
                dispatch(registrasiGetList(search));
            // }, [dispatch]);
        }
    }

    document.title = "Pasien Lama";

    const tableCustomStyles = {
        headRow: {
            style: {
                color: '#223336',
                backgroundColor: '#48dbfb'
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
            name: <span className='font-weight-bold fs-13'>No. RM</span>,
            selector: row => row.nocm,
            sortable: true
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            // style: {
            //     background: "orange",
            //   },
        },
        {
            name: <span className='font-weight-bold fs-13'>No. Identitas</span>,
            selector: row => row.noidentitas,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>No. BPJS</span>,
            selector: row => row.nobpjs,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Lahir</span>,
            selector: row => row.tgllahir,
            sortable: false
        },
        {
            name: <span className='font-weight-bold fs-13'>Detail</span>,
            sortable: false,
            cell: (data) => {
                return (
                    // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
                    <button className="btn btn-sm btn-soft-info" onClick={() => handleClick(data)}>View</button>
                );
            },
        },
    ];


    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Pasien Lama" pageTitle="Forms" />

                    <Row>
                        <Col lg={3}>
                            <Card>
                                <CardBody>
                                    <h5 className="card-title mb-5">Profile Pasien</h5>
                                    <div className="text-center">
                                        <img src={userDummy}
                                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                            alt="user-profile" />
                                        <h5 className="fs-17 mb-1">{namaPasien}</h5>
                                        <p className="text-muted mb-0">{noIdentitas}</p>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <Nav pills className="nav-success mb-3">
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "1", })} onClick={() => { pillsToggle("1"); }} >
                                                Profile
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "2", })} onClick={() => { pillsToggle("2"); }} >
                                                    Riwayat
                                                </NavLink>
                                            </NavItem>
                                        </NavItem>
                                        <NavItem>
                                            <NavItem>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "3", })} onClick={() => { pillsToggle("3"); }} >
                                                    Action
                                                </NavLink>
                                            </NavItem>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={pillsTab} className="text-muted">
                                        <TabPane tabId="1" id="home-1">
                                            <Card>
                                                <CardBody>
                                                    <div className="table-responsive">
                                                        <Table className="table-borderless mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <th className="ps-0" scope="row">NoRM :</th>
                                                                    <td className="text-muted">{norm}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="ps-0" scope="row">No Hp :</th>
                                                                    <td className="text-muted">{nohp}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="ps-0" scope="row">Alamat :</th>
                                                                    <td className="text-muted">{alamat}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </TabPane>

                                        <TabPane tabId="2" id="profile-1">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0">
                                                    <i className="ri-checkbox-circle-fill text-success"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.
                                                </div>
                                            </div>
                                            <div className="d-flex mt-2">
                                                <div className="flex-shrink-0">
                                                    <i className="ri-checkbox-circle-fill text-success"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                                                </div>
                                            </div>
                                        </TabPane>

                                        <TabPane tabId="3" id="messages-1" >
                                            <div className="live-preview">
                                                <div className="d-flex flex-wrap gap-2">
                                                    <Button color="info" className="btn-animation" data-text="Registrasi"> <span>Registrasi</span> </Button>
                                                    <Button color="info" className="btn-animation" data-text="Edit Data Pasien"> <span>Edit Data Pasien</span> </Button>
                                                    <Button color="info" className="btn-animation" data-text="[BPJS] Cek Kepesertaan"> <span>[BPJS] Cek Kepesertaan</span> </Button>
                                                    <Button color="info" className="btn-animation" data-text="[BPJS] Cek Rujukan"> <span>[BPJS] Cek Rujukan</span> </Button>
                                                    <Button color="info" className="btn-animation" data-text="[BPJS] Buat Surkon/SPRI"> <span>[BPJS] Buat Surkon/SPRI</span> </Button>
                                                    <Button color="info" className="btn-animation" data-text="Cetak Kartu Pasien"> <span>Cetak Kartu Pasien</span> </Button>
                                                    <Button color="info" className="btn-animation" data-text="Cetak Label Pasien"> <span>Cetak Label Pasien</span> </Button>
                                                </div>
                                            </div>



                                        </TabPane>

                                        <TabPane tabId="4" id="settings-1">
                                            <div className="d-flex mt-2">
                                                <div className="flex-shrink-0">
                                                    <i className="ri-checkbox-circle-fill text-success"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.
                                                </div>
                                            </div>
                                            <div className="d-flex mt-2">
                                                <div className="flex-shrink-0">
                                                    <i className="ri-checkbox-circle-fill text-success"></i>
                                                </div>
                                                <div className="flex-grow-1 ms-2">
                                                    After gathering lots of different opinions and graphic design basics, I came up with a list of 30 graphic design tips that you can start implementing.
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={9}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <div className="live-preview">
                                        <Row>
                                            <Col lg={12}>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Daftar Pasien Lama</h4>
                                            </Col>
                                        </Row>
                                    </div>

                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <Col className="col-sm">
                                            <div className="d-flex justify-content-sm-end">
                                                <div className="search-box ms-2">
                                                    <input type="text" className="form-control search"
                                                    onChange={event => setSearch(event.target.value)} 
                                                    onKeyDown={handleFilter} placeholder="Search..."/>
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </Col>
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
    );
}

export default withRouter(RegistrasiList);