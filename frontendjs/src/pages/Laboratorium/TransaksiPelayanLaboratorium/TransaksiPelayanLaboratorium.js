import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import EmrHeader from '../../Emr/EmrHeader/EmrHeader';
import DataTable from 'react-data-table-component';
import { useParams } from "react-router-dom";
import {
    listPelayananLaboratoriumGet, laboratoriumResetForm
} from '../../../store/actions';
import classnames from "classnames";
const TransaksiPelayanLaboratorium = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    document.title = "Transaksi Pelayan Laboratorium";
    const { dataPelayanan, loadingPelayanan, successPelayanan } = useSelector((state) => ({
        dataPelayanan: state.Laboratorium.listPelayananLaboratoriumGet.data,
        loadingPelayanan: state.Laboratorium.listPelayananLaboratoriumGet.loading,
        successPelayanan: state.Laboratorium.listPelayananLaboratoriumGet.success,
    }));
    useEffect(() => {
        return () => {
            dispatch(laboratoriumResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(listPelayananLaboratoriumGet(norecdp));
    }, [norecdp, dispatch]);
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
                    <Link to='#' className="link-success fs-15" id="tooltipTop"><i className="ri-edit-2-line"></i></Link>
                );
            },
            width: "80px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Pelayanan</span>,
            selector: row => row.tglinput,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Pemeriksaan</span>,
            selector: row => row.namaproduk,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Dokter Pengirim</span>,
            selector: row => row.pegawaipengirim,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit Pengirim</span>,
            selector: row => row.unitpengirim,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Dokter Laboratorium</span>,
            selector: row => '',
            sortable: true,
            width: "150px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Tgl Perjanjian</span>,
            selector: row => row.tglperjanjian,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>No Order</span>,
            selector: row => row.nomororder,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>No Photo</span>,
            selector: row => '',
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Status Cito</span>,
            selector: row => row.statuscito,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Total</span>,
            selector: row => row.total,
            sortable: true,
            // width: "250px",
        },
    ];
    const [pillsTab, setpillsTab] = useState("1");
    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    const taskWidgets = [
        {
            id: 1,
            label: "Transaksi Pelayanan",
        },
        {
            id: 2,
            label: "Tindakan",
        },

    ];
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Transaksi Pelayanan Laboratorium" pageTitle="Forms" />
                    <Row>
                        <Col xxl={12}>
                            <EmrHeader />
                        </Col>
                        <Col ccl={12}>
                            <Card>
                                <CardBody>
                                <div className="card-header align-items-center d-flex">
                                    <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                        {taskWidgets.map((item, key) => (
                                            <NavItem key={key}>
                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === `${item.id}`, })} onClick={() => { pillsToggle(`${item.id}`); }}>
                                                    <span className="fw-semibold">{item.label}</span>
                                                </NavLink>
                                            </NavItem>
                                        ))}
                                    </Nav>
                                    </div>
                                    <TabContent activeTab={pillsTab} className="text-muted">
                                        <TabPane tabId="1" id="home-1">
                                            <Card>
                                                <CardBody>
                                            <div id="table-gridjs">
                                                
                                                <DataTable
                                                    fixedHeader
                                                    fixedHeaderScrollHeight="400px"
                                                    columns={columns}
                                                    pagination
                                                    data={dataPelayanan}
                                                    progressPending={loadingPelayanan}
                                                    customStyles={tableCustomStyles}
                                                    expandableRows
                                                    expandableRowsComponent={ExpandableNilaiNormal}
                                                />
                                            </div>
                                            </CardBody>
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="2" id="home-1">

                                        </TabPane>
                                    </TabContent>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

const ExpandableNilaiNormal = ({ dataPelayanan }) => {

    // if(data.deposit.length === 0 ){
    //     return <></>
    // }
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Detail Pemeriksaan</th>
                    <th scope="col">Hasil Pemeriksaan</th>
                    <th scope="col">Nilai Normal</th>
                    <th scope="col">Satuan Hasil</th>
                    <th scope="col">Metode</th>
                    <th scope="col">Keterangan</th>
                </tr>
            </thead>
            <tbody>

            {/* {data.deposit.map((item, key) =>
                <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{item.tglinput}</td>
                    <td>{item.nominal?.toLocaleString("id-ID") || ""}</td>
                    <td>{item.nobukti}</td>
                </tr>
            )} */}
            </tbody>
        </table>

    )
}


export default withRouter(TransaksiPelayanLaboratorium);