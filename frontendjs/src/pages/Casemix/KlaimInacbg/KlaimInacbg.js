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
import calendar from "../../../assets/images/users/calendar.png";
import SearchOption from '../../../Components/Common/SearchOption';
import { dateISOString, dateTimeLocal } from "../../../utils/format";

const dateAwalStart = dateISOString(new Date(new Date() - 1000 * 60 * 60 * 24 * 3));
const dateAwalEnd = dateISOString(new Date())
const KlaimInacbg = () => {
    document.title = "Klaim Inacbg";
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success,
        dataPasien, loadingPasien, successPasien } = useSelector((state) => ({
            // newData: state.Radiologi.updateTglRencanaRadiologi.newData,
            // success: state.Radiologi.updateTglRencanaRadiologi.success,
            // loading: state.Radiologi.updateTglRencanaRadiologi.loading,
            // dataPasien: state.Laboratorium.daftarPasienLaboratorium.data,
            // loadingPasien: state.Laboratorium.daftarPasienLaboratorium.loading,
            // successPasien: state.Laboratorium.daftarPasienLaboratorium.success,
        }));
    const handleClickButton = (e) => {
        if (cardCari === true)
            setcardCari(false)
        else
            setcardCari(true)
    };
    const [cardCari, setcardCari] = useState(false);
    const listJenisRawat = [
        {
            options: [
                { label: "Semua", value: 1 },
                { label: "Rawat Inap", value: 2 },
                { label: "Rawat Jalan", value: 3 }
            ],
        },
    ];
    const listPeriode = [
        {
            options: [
                { label: "Tanggal Pulang", value: 1 },
                { label: "Tanggal Masuk", value: 2 },
                // { label: "Tanggal ", value: 3 }
            ],
        },
    ];
    const [dateStart, setDateStart] = useState(dateAwalStart);
    const [dateEnd, setDateEnd] = useState(dateAwalEnd);
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="KLAIM" pageTitle="Forms" />
                    <Row>
                        <Col lg={8}>
                            <Card style={{ backgroundColor: "#ffdd99",height:'500px' }}>
                                <CardBody>
                                    <Row>
                                        <Col lg={3} md={3}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="alamatktp" className="form-label">Cari No. RM / No. SEP / Nama</Label>
                                            </div>
                                        </Col>
                                        <Col lg={6} md={6}>
                                            <div className="mt-1">
                                                <div className="form-icon">
                                                    <Input type="email" className="form-control form-control-icon rounded-pill" id="iconInput" />
                                                    <i className="ri-search-2-line"></i>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={3} md={3}>
                                            <Link to="#" className="avatar-group-item" id="calendar">
                                                <img src={calendar} alt="" className="rounded-circle avatar-sm" onClick={() => handleClickButton('registrasi')} />
                                            </Link>
                                        </Col>
                                        {cardCari ? (
                                            <Col lg={12}>
                                                <Card style={{height:'400px'}}>
                                                    <CardBody>
                                                        <div className="table-responsive">
                                                            <table className="table table-bordered table-nowrap align-middle mb-0" style={{height:'300px'}}>
                                                                <thead>
                                                                    <tr>
                                                                        <td style={{ fontStyle: "italic", textAlign: 'center', borderTop: '0' }} colSpan={4}>Pencarian klaim dengan kriteria:</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: "30px" }}>Jenis Rawat : </td>
                                                                        <td style={{ width: "70px" }} colSpan={4}>
                                                                            <Col lg={6}><CustomSelect
                                                                                id="jenis_rawat"
                                                                                name="jenis_rawat"
                                                                                options={listJenisRawat}
                                                                            // onChange={handleChangeUnitTujuan}
                                                                            /></Col>
                                                                            <Col lg={6}></Col>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Periode :</td>
                                                                        <td colSpan={3}>
                                                                            <table className="table table-bordered table-nowrap align-middle mb-0">
                                                                                <tbody style={{ border: 'hidden' }}>
                                                                                    <tr>
                                                                                        <td style={{ width: "100%", border: 'hidden' }}><CustomSelect
                                                                                            id="periode"
                                                                                            name="periode"
                                                                                            options={listPeriode}
                                                                                        // onChange={handleChangeUnitTujuan}
                                                                                        /></td>
                                                                                        <td style={{ border: 'hidden' }}>
                                                                                            <Flatpickr
                                                                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                                                                options={{
                                                                                                    // mode: "range",
                                                                                                    dateFormat: "Y-m-d",
                                                                                                    defaultDate: "today"
                                                                                                }}
                                                                                                value={dateStart}
                                                                                                onChange={([dateStart]) => {
                                                                                                    setDateStart(dateISOString(dateStart - dateStart.getTimezoneOffset() * 60000));
                                                                                                }}
                                                                                            />
                                                                                        </td>
                                                                                        <td style={{ border: 'hidden' }}>s/d</td>
                                                                                        <td style={{ border: 'hidden' }}>
                                                                                            <Flatpickr
                                                                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                                                                options={{
                                                                                                    // mode: "range",
                                                                                                    dateFormat: "Y-m-d",
                                                                                                    defaultDate: "today"
                                                                                                }}
                                                                                                value={dateEnd}
                                                                                                onChange={([dateEnd]) => {
                                                                                                    setDateEnd(dateISOString(dateEnd - dateEnd.getTimezoneOffset() * 60000));
                                                                                                }}
                                                                                            />
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: "30px" }}>Metode Pembayaran :</td>
                                                                        <td>
                                                                            <Col lg={6}>
                                                                                <CustomSelect
                                                                                    id="periode"
                                                                                    name="periode"
                                                                                    options={listJenisRawat}
                                                                                // onChange={handleChangeUnitTujuan}
                                                                                />
                                                                            </Col>
                                                                            <Col lg={6}></Col>

                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={5}></td>
                                                                    </tr>
                                                                </thead>
                                                            </table>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        ) : null}
                                    </Row>

                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={4}></Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (KlaimInacbg)