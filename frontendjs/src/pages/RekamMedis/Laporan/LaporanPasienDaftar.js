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
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import CustomSelect from '../../Select/Select';
import Flatpickr from "react-flatpickr";
import DataTable from 'react-data-table-component';
import LoadingTable from '../../../Components/Table/LoadingTable';

const LaporanPasienDaftar = () => {
    document.title = "Laporan Pasien Daftar";
    const dispatch = useDispatch();

    const [dateStart, setdateStart] = useState((new Date()).toISOString());
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            tglstart: dateStart,
            tglend: dateStart,
        },
        validationSchema: Yup.object({
            // dokterlab: Yup.string().required("Dokter Lab wajib diisi"),


        }),
        onSubmit: (values, { resetForm }) => {

        }
    })
    const [search, setSearch] = useState('')
    const handleFilter = (e) => {
        if (e.keyCode === 13) {
            // console.log(search)
            // useEffect(() => {
            // dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
            // dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
            // }, [dispatch]);
        }
    }
    const handleClickCari = () => {
        // dispatch(daftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
        // dispatch(widgetdaftarDokumenRekammedisGet(`${search}&start=${dateStart}&end=${dateEnd}&taskid=${idPencarian}`));
    }
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Laporan Pasien Daftar" pageTitle="Forms" />
                    <Card>
                        <CardBody>
                            <div className='mb-2'>
                                <Row>
                                    <Col sm={3}>
                                        <div className="input-group">
                                            <Flatpickr
                                                id="tglstart"
                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                options={{
                                                    enableTime: true,
                                                    // mode: "range",
                                                    dateFormat: "Y-m-d H:i",
                                                    defaultDate: "today"
                                                }}
                                                value={validation.values.tglstart}
                                                onChange={([newDate]) => {
                                                    validation.setFieldValue("tglstart", newDate.toISOString());
                                                }}
                                            />
                                            <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                        </div>
                                    </Col>
                                    <Col lg={1}><h4>s/d</h4></Col>
                                    <Col sm={3}>
                                        <div className="input-group">
                                            <Flatpickr
                                                id="tglend"
                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
                                                options={{
                                                    enableTime: true,
                                                    // mode: "range",
                                                    dateFormat: "Y-m-d H:i",
                                                    defaultDate: "today"
                                                }}
                                                value={validation.values.tglend}
                                                onChange={([newDate]) => {
                                                    validation.setFieldValue("tglend", newDate.toISOString());
                                                }}
                                            />
                                            <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                            <div className="d-flex justify-content-sm-end">
                                                <div className="search-box ms-2">
                                                    <input type="text" className="form-control search"
                                                        placeholder="Search..." onChange={event => setSearch(event.target.value)}
                                                        onKeyDown={handleFilter} />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </Col>
                                    <Col lg={2}>
                                        <Button type="button" className="rounded-pill" placement="top" id="tooltipTopPencarian" onClick={handleClickCari}>
                                            CARI
                                        </Button>
                                        <UncontrolledTooltip placement="top" target="tooltipTopPencarian" > Pencarian </UncontrolledTooltip>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (LaporanPasienDaftar)