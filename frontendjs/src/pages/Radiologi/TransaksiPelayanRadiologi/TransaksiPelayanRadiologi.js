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
    listPelayananRadiologiGet, radiologiResetForm
} from '../../../store/actions';
const TransaksiPelayananRadiologi = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    document.title = "Transaksi Pelayanan Radiologi";
    const { dataPelayanan, loadingPelayanan, successPelayanan } = useSelector((state) => ({
        dataPelayanan: state.Radiologi.listPelayananRadiologiGet.data,
        loadingPelayanan: state.Radiologi.listPelayananRadiologiGet.loading,
        successPelayanan: state.Radiologi.listPelayananRadiologiGet.success,
    }));
    useEffect(() => {
        return () => {
            dispatch(radiologiResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(listPelayananRadiologiGet(norecdp));
    }, [norecdp,dispatch]);
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

            name: <span className='font-weight-bold fs-13'>Dokter Radiologi</span>,
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
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Transaksi Pelayanan Radiologi" pageTitle="Forms" />
                    <Row>
                        <Col xxl={12}>
                            <EmrHeader />
                        </Col>
                        <Col ccl={12}>
                            <Card>
                                <CardBody>
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
                                            columns={columns}
                                            pagination
                                            data={dataPelayanan}
                                            progressPending={loadingPelayanan}
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

export default withRouter(TransaksiPelayananRadiologi);