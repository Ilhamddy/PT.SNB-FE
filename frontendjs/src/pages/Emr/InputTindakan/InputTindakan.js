import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
    UncontrolledTooltip
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

import { comboHistoryUnitGet, comboTindakanGet } from "../../../store/actions";
const InputTindakan = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success, dataCombo, loadingCombo, successCombo,
        dataTindakan, loadingTindakan, successTindakan } = useSelector((state) => ({
            // newData: state.Emr.emrTtvSave.newData,
            // success: state.Emr.emrTtvSave.success,
            // loading: state.Emr.emrTtvSave.loading,
            dataCombo: state.Emr.comboHistoryUnitGet.data,
            loadingCombo: state.Emr.comboHistoryUnitGet.loading,
            successCombo: state.Emr.comboHistoryUnitGet.success,
            dataTindakan: state.Emr.comboTindakanGet.data,
            loadingTindakan: state.Emr.comboTindakanGet.loading,
            successTindakan: state.Emr.comboTindakanGet.success,
        }));
    useEffect(() => {
        if (norecdp) {
            dispatch(comboHistoryUnitGet(norecdp));
        }
    }, [norecdp, dispatch])
    const handleTindakan = characterEntered => {
        if (characterEntered.length > 3) {
            // useEffect(() => {
            dispatch(comboTindakanGet(validation.values.objectkelasfk + '&objectunitfk=' + validation.values.unitlast + '&namaproduk=' + characterEntered));
            // }, [dispatch]);
        }
    };
    const handleTindakanSelcted = (selected)=>{
        validation.setFieldValue('tindakan', selected.value)
        setHarga(selected.totalharga)
    }
    const handleUnitLast = (selected) => {
        validation.setFieldValue('unitlast', selected.value)
        validation.setFieldValue('objectkelasfk', selected.objectkelasfk)
    };
    const [count, setCount] = useState(0);
    const [harga, setHarga] = useState(0);
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
            norec: editData?.norec ?? '',
            unitlast: editData?.unitlast ?? '',
            objectkelasfk: editData?.objectkelasfk ?? '',
            quantity: editData?.quantity ?? ''
        },
        validationSchema: Yup.object({
            unitlast: Yup.string().required("Unit Belum Dipilih"),
            tindakan: Yup.string().required("Tindakan Belum Dipilih"),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(validation.errors)
            // dispatch(emrTtvSave(values, ''));
            resetForm({ values: '' })
        }
    })
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
                        <Col lg={4}>
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
                        <Col lg={8}>
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
                                        // value={dateStart}
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
                                        <Col lg={2} sm={6} className="mt-1">
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
                                        <Col lg={4} sm={6} className="mt-1 ms-4">
                                            <div>
                                                <Input
                                                    type="text"
                                                    className="form-control bg-light border-0 product-line-price"
                                                    id="harga"
                                                    placeholder="Rp.0.00"
                                                    value={"Rp "+harga*count}
                                                    readOnly
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </React.Fragment>
    )
}

export default (InputTindakan)