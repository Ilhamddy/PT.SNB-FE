import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip, ListGroup, ListGroupItem
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import CustomSelect from '../../Select/Select';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";
import {
    daftarPasienLaboratorium, laboratoriumResetForm
} from '../../../store/actions';
import LoadingTable from '../../../Components/LoadingTable/LoadingTable';
const DaftarPasienLaboratorium = () => {
    document.title = "Daftar Order Laboratorium";
    const dispatch = useDispatch();
    const { 
        editData, 
        newData, 
        loading, 
        error, 
        tsuccess,
        dataPasien, loadingPasien, successPasien } = useSelector((state) => ({
            // newData: state.Radiologi.updateTglRencanaRadiologi.newData,
            // success: state.Radiologi.updateTglRencanaRadiologi.success,
            // loading: state.Radiologi.updateTglRencanaRadiologi.loading,
            dataPasien: state.Laboratorium.daftarPasienLaboratorium.data,
            loadingPasien: state.Laboratorium.daftarPasienLaboratorium.loading,
            successPasien: state.Laboratorium.daftarPasienLaboratorium.success,

        }));
    useEffect(() => {
        return () => {
            // dispatch(laboratoriumResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(daftarPasienLaboratorium(''));
    }, [dispatch]);
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
        dispatch(daftarPasienLaboratorium(`${search}&start=${dateStart}&end=${dateEnd}`));
    }
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            dispatch(daftarPasienLaboratorium(`${search}&start=${dateStart}&end=${dateEnd}`));
        }
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
                    <Link to={`/transaksi-pelayanan-laboratorium/${data.norecdp}/${data.norecta}`} className="link-success fs-15" id="tooltipTop"><i className="ri-edit-2-line"></i></Link>
                );
            },
            width: "80px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Noregistrasi</span>,
            selector: row => row.noregistrasi,
            sortable: true,
            width: "130px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Tgl Registrasi</span>,
            selector: row => row.tglregistrasi,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>No Rm</span>,
            selector: row => row.nocm,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Nama Pasien</span>,
            selector: row => row.namapasien,
            sortable: true,
            width: "150px"
        },
        {

            name: <span className='font-weight-bold fs-13'>Unit Asal</span>,
            selector: row => row.unitasal,
            sortable: true,
            width: "150px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Penjamin</span>,
            selector: row => row.jenispenjamin,
            sortable: true,
            // width: "250px",
        },
        {

            name: <span className='font-weight-bold fs-13'>Tgl Pulang</span>,
            selector: row => row.tglpulang,
            sortable: true,
            // width: "250px",
        },
    ];
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien Laboratorium" pageTitle="Forms" />
                    <Row>
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
                                <CardBody>
                                    <Row>
                                        <Col sm={4}>
                                            <div className="input-group mb-2">
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
                                        <div id="table-gridjs">
                                            <DataTable
                                                fixedHeader
                                                fixedHeaderScrollHeight="700px"
                                                columns={columns}
                                                pagination
                                                data={dataPasien}
                                                progressPending={loadingPasien}
                                                customStyles={tableCustomStyles}
                                                progressComponent={<LoadingTable />}
                                            />
                                        </div>
                                    </Row>

                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (DaftarPasienLaboratorium)