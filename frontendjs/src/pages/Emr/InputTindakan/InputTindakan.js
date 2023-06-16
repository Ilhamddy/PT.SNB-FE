import React, { useEffect, useState, useCallback } from 'react';
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

import { comboHistoryUnitGet, comboTindakanGet, comboJenisPelaksanaGet, comboNamaPelaksanaGet } from "../../../store/actions";
const InputTindakan = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success, dataCombo, loadingCombo, successCombo,
        dataTindakan, loadingTindakan, successTindakan, dataJenisPelaksana,dataNamaPelaksana } = useSelector((state) => ({
            // newData: state.Emr.emrTtvSave.newData,
            // success: state.Emr.emrTtvSave.success,
            // loading: state.Emr.emrTtvSave.loading,
            dataCombo: state.Emr.comboHistoryUnitGet.data,
            loadingCombo: state.Emr.comboHistoryUnitGet.loading,
            successCombo: state.Emr.comboHistoryUnitGet.success,
            dataTindakan: state.Emr.comboTindakanGet.data,
            loadingTindakan: state.Emr.comboTindakanGet.loading,
            successTindakan: state.Emr.comboTindakanGet.success,
            dataJenisPelaksana: state.Emr.comboJenisPelaksanaGet.data,
            dataNamaPelaksana: state.Emr.comboNamaPelaksanaGet.data,
        }));
    useEffect(() => {
        if (norecdp) {
            dispatch(comboHistoryUnitGet(norecdp));
            dispatch(comboJenisPelaksanaGet(''));
            dispatch(comboNamaPelaksanaGet(''));
        }
    }, [norecdp, dispatch])
    const handleTindakan = characterEntered => {
        if (characterEntered.length > 3) {
            // useEffect(() => {
            dispatch(comboTindakanGet(validation.values.objectkelasfk + '&objectunitfk=' + validation.values.unitlast + '&namaproduk=' + characterEntered));
            // }, [dispatch]);
        }
    };
    const handleTindakanSelcted = (selected) => {
        validation.setFieldValue('tindakan', selected.value)
        setHarga(selected.totalharga)
    }
    const handleUnitLast = (selected) => {
        validation.setFieldValue('unitlast', selected.value)
        validation.setFieldValue('objectkelasfk', selected.objectkelasfk)
    };
    const [count, setCount] = useState(0);
    const [harga, setHarga] = useState(0);
    const current = new Date();
    const [dateStart, setdateStart] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}`);
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
            norec: editData?.norec ?? '',
            unitlast: editData?.unitlast ?? '',
            objectkelasfk: editData?.objectkelasfk ?? '',
            quantity: editData?.quantity ?? '',
            tindakan: editData?.tindakan ?? '',
            jenispelaksana1: editData?.jenispelaksana1 ?? '',
            jenispelaksana2: editData?.jenispelaksana2 ?? '',
            jenispelaksana3: editData?.jenispelaksana3 ?? '',
            jenispelaksana4: editData?.jenispelaksana4 ?? '',
            jenispelaksana5: editData?.jenispelaksana5 ?? '',
            jenispelaksana6: editData?.jenispelaksana6 ?? '',
            jenispelaksana7: editData?.jenispelaksana7 ?? '',
            jenispelaksana8: editData?.jenispelaksana8 ?? '',
            namapelaksana1: editData?.namapelaksana1 ?? '',
            namapelaksana2: editData?.namapelaksana2 ?? '',
            namapelaksana3: editData?.namapelaksana3 ?? '',
            namapelaksana4: editData?.namapelaksana4 ?? '',
            namapelaksana5: editData?.namapelaksana5 ?? '',
            namapelaksana6: editData?.namapelaksana6 ?? '',
            namapelaksana7: editData?.namapelaksana7 ?? '',
            namapelaksana8: editData?.namapelaksana8 ?? '',
        },
        validationSchema: Yup.object({
            unitlast: Yup.string().required("Unit Belum Dipilih"),
            tindakan: Yup.string().required("Tindakan Belum Dipilih"),
            jenispelaksana1: Yup.string().required("jenispelaksana Belum Dipilih"),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(validation.errors)
            // dispatch(emrTtvSave(values, ''));
            resetForm({ values: '' })
        }
    })
    const [showPelaksana1, setshowPelaksana1] = useState(true);
    const [showPelaksana2, setshowPelaksana2] = useState(false);
    const [showPelaksana3, setshowPelaksana3] = useState(false);
    const [showPelaksana4, setshowPelaksana4] = useState(false);
    const [showPelaksana5, setshowPelaksana5] = useState(false);
    const [showPelaksana6, setshowPelaksana6] = useState(false);
    const [showPelaksana7, setshowPelaksana7] = useState(false);
    const [showPelaksana8, setshowPelaksana8] = useState(false);
    const [showPelaksana9, setshowPelaksana9] = useState(false);
    const [showPelaksana10, setshowPelaksana10] = useState(false);
    return (
        <React.Fragment>
            <Row className="gy-4">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row>
                        <Col lg={5}>
                            <Row className="gy-2">
                                <Col lg={4} md={4}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="unitlast" className="form-label">Unit</Label>
                                    </div>
                                </Col>
                                <Col lg={8} md={8}>
                                    <div>
                                        <CustomSelect
                                            id="unitlast"
                                            name="unitlast"
                                            options={dataCombo}
                                            value={validation.values.unitlast || ""}
                                            className={`input ${validation.errors.unitlast ? "is-invalid" : ""}`}
                                            onChange={handleUnitLast}
                                        />
                                        {validation.touched.unitlast && validation.errors.unitlast ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.unitlast}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={4} md={4}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tindakan" className="form-label">Tindakan</Label>
                                    </div>
                                </Col>
                                <Col lg={8} md={8}>
                                    <div>
                                        <CustomSelect
                                            id="tindakan"
                                            name="tindakan"
                                            options={dataTindakan}
                                            value={validation.values.tindakan || ""}
                                            className={`input ${validation.errors.tindakan ? "is-invalid" : ""}`}
                                            onChange={handleTindakanSelcted}
                                            onInputChange={handleTindakan}
                                        />
                                        {validation.touched.tindakan && validation.errors.tindakan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.tindakan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>

                            </Row>
                        </Col>
                        <Col lg={7}>
                            <Row>
                                <Col lg={4} md={4}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tipediagnosa" className="form-label">Tanggal Tindakan</Label>
                                    </div>
                                </Col>
                                <Col lg={8} md={8}>
                                    <div className="input-group">
                                        <Flatpickr
                                            className="form-control border-0 fs-5 dash-filter-picker shadow"
                                            options={{
                                                //  enableTime: true,
                                                // mode: "range",
                                                dateFormat: "Y-m-d H:i",
                                                defaultDate: "today"
                                            }}
                                            value={dateStart}
                                        // onChange={([dateStart]) => {
                                        //     handleBeginOnChangeStart(dateStart);
                                        // }}
                                        />
                                        <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <Row>
                                        <Col lg={4} sm={6}>
                                            <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="qty" className="form-label fw-semibold">Quantity</Label>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} className="mt-1">
                                            <div>
                                                <div className="input-step">
                                                    <button type="button" className="minus" onClick={() => setCount(count > 0 ? (count - 1) : count)}>
                                                        –
                                                    </button>
                                                    <Input
                                                        type="number"
                                                        className="product-quantity"
                                                        id="product-qty-1"
                                                        value={count}
                                                        readOnly
                                                    />
                                                    <button type="button" className="plus" onClick={() => setCount(count + 1)}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </Col>
                                        {/* <Col lg={2} sm={6}> */}
                                        {/* <div className="mt-2">
                                                <Label style={{ color: "black" }} htmlFor="tinggibadan" className="form-label fw-semibold">Harga</Label>
                                            </div> */}
                                        {/* </Col> */}
                                        <Col lg={4} sm={6} className="mt-1">
                                            <div>
                                                <Input
                                                    type="text"
                                                    className="form-control bg-light border-0 product-line-price"
                                                    id="harga"
                                                    placeholder="Rp.0.00"
                                                    value={"Rp " + harga * count}
                                                    readOnly
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={17} lg={19} xl={20} className="mt-2" >
                            <Row>

                                {showPelaksana1 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana1" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana1"
                                                                    name="jenispelaksana1"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana1 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana1 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana1', value.value)}
                                                                />
                                                                {validation.touched.jenispelaksana1 && validation.errors.jenispelaksana1 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana1}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={5} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={7} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana1"
                                                                    name="namapelaksana1"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana1 || ""}
                                                                    className={`input ${validation.errors.tindakan1 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana1', value.value)}
                                                                />
                                                                {validation.touched.namapelaksana1 && validation.errors.namapelaksana1 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana1}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="info" className="rounded-pill" placement="top" onClick={() => setshowPelaksana2(true)}>
                                                        +
                                                    </Button>
                                                </Col>
                                                <Col lg={1}>

                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana2 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana2"
                                                                    name="jenispelaksana2"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana2 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana2 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana2', value.value)}
                                                                />
                                                                {validation.touched.jenispelaksana2 && validation.errors.jenispelaksana2 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana2}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={5} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={7} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana1"
                                                                    name="namapelaksana1"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana1 || ""}
                                                                    className={`input ${validation.errors.namapelaksana1 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana1', value.value)}
                                                                />
                                                                {validation.touched.namapelaksana1 && validation.errors.namapelaksana1 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana1}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="info" className="rounded-pill" placement="top" onClick={() => setshowPelaksana3(true)}>
                                                        +
                                                    </Button>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="danger" className="rounded-pill" placement="top" onClick={() => setshowPelaksana2(false)}>
                                                        -
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana3 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana3"
                                                                    name="jenispelaksana3"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana3 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana3 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana3', value.value)}
                                                                />
                                                                {validation.touched.jenispelaksana3 && validation.errors.jenispelaksana3 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana3}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={5} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={7} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana3"
                                                                    name="namapelaksana3"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana3 || ""}
                                                                    className={`input ${validation.errors.namapelaksana3 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana3', value.value)}
                                                                />
                                                                {validation.touched.namapelaksana3 && validation.errors.namapelaksana3 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana3}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="info" className="rounded-pill" placement="top" onClick={() => setshowPelaksana4(true)}>
                                                        +
                                                    </Button>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="danger" className="rounded-pill" placement="top" onClick={() => setshowPelaksana3(false)}>
                                                        -
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana4 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana4"
                                                                    name="jenispelaksana4"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana4 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana4 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana4', value.value)}
                                                                />
                                                                {validation.touched.jenispelaksana4 && validation.errors.jenispelaksana4 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana4}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={5} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={7} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana4"
                                                                    name="namapelaksana4"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana4 || ""}
                                                                    className={`input ${validation.errors.namapelaksana4 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana4', value.value)}
                                                                />
                                                                {validation.touched.namapelaksana4 && validation.errors.namapelaksana4 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana4}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="info" className="rounded-pill" placement="top" onClick={() => setshowPelaksana5(true)}>
                                                        +
                                                    </Button>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="danger" className="rounded-pill" placement="top" onClick={() => setshowPelaksana4(false)}>
                                                        -
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana5 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana5"
                                                                    name="jenispelaksana5"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana5 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana5 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana5', value.value)}
                                                                />
                                                                {validation.touched.jenispelaksana5 && validation.errors.jenispelaksana5 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana5}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={5} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={7} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana5"
                                                                    name="namapelaksana5"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana5 || ""}
                                                                    className={`input ${validation.errors.namapelaksana5 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana5', value.value)}
                                                                />
                                                                {validation.touched.namapelaksana5 && validation.errors.namapelaksana5 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana5}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="info" className="rounded-pill" placement="top" onClick={() => setshowPelaksana6(true)}>
                                                        +
                                                    </Button>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="danger" className="rounded-pill" placement="top" onClick={() => setshowPelaksana5(false)}>
                                                        -
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana6 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana6"
                                                                    name="jenispelaksana6"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana6 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana6 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana6', value.value)}
                                                                />
                                                                {validation.touched.jenispelaksana6 && validation.errors.jenispelaksana6 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana6}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={5} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={7} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana6"
                                                                    name="namapelaksana6"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana6 || ""}
                                                                    className={`input ${validation.errors.namapelaksana6 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana6', value.value)}
                                                                />
                                                                {validation.touched.namapelaksana6 && validation.errors.namapelaksana6 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana6}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="info" className="rounded-pill" placement="top" onClick={() => setshowPelaksana7(true)}>
                                                        +
                                                    </Button>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="danger" className="rounded-pill" placement="top" onClick={() => setshowPelaksana6(false)}>
                                                        -
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                                {showPelaksana7 ? (
                                    <>
                                        <Col className='mt-2' lg={12}>
                                            <Row>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={4} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Jenis Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={8} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="jenispelaksana7"
                                                                    name="jenispelaksana7"
                                                                    options={dataJenisPelaksana}
                                                                    value={validation.values.jenispelaksana7 || ""}
                                                                    className={`input ${validation.errors.jenispelaksana7 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('jenispelaksana7', value.value)}
                                                                />
                                                                {validation.touched.jenispelaksana7 && validation.errors.jenispelaksana7 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.jenispelaksana7}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={5}>
                                                    <Row>
                                                        <Col lg={5} md={4}>
                                                            <div className="mt-2">
                                                                <Label style={{ color: "black" }} htmlFor="jenispelaksana" className="form-label">Nama Pelaksana</Label>
                                                            </div>
                                                        </Col>
                                                        <Col lg={7} sm={6}>
                                                            <div>
                                                                <CustomSelect
                                                                    id="namapelaksana7"
                                                                    name="namapelaksana7"
                                                                    options={dataNamaPelaksana}
                                                                    value={validation.values.namapelaksana7 || ""}
                                                                    className={`input ${validation.errors.namapelaksana7 ? "is-invalid" : ""}`}
                                                                    onChange={value => validation.setFieldValue('namapelaksana7', value.value)}
                                                                />
                                                                {validation.touched.namapelaksana7 && validation.errors.namapelaksana7 ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.namapelaksana7}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="info" className="rounded-pill" placement="top" onClick={() => setshowPelaksana8(true)}>
                                                        +
                                                    </Button>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button type="button" color="danger" className="rounded-pill" placement="top" onClick={() => setshowPelaksana7(false)}>
                                                        -
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : null}
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </React.Fragment>
    )
}

export default (InputTindakan)