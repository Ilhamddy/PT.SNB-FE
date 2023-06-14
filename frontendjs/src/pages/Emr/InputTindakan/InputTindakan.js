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


const InputTindakan = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success } = useSelector((state) => ({
        // newData: state.Emr.emrTtvSave.newData,
        // success: state.Emr.emrTtvSave.success,
        // loading: state.Emr.emrTtvSave.loading,
    }));

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
            norec: editData?.norec ?? '',

        },
        validationSchema: Yup.object({
            // tinggibadan: Yup.string().required("Tinggi Badan wajib diisi"),

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
                                            // options={dataCombo.tipediagnosa}
                                            value={validation.values.unitlast || ""}
                                            className={`input ${validation.errors.unitlast ? "is-invalid" : ""}`}
                                            onChange={value => validation.setFieldValue('unitlast', value.value)}
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
                                            // options={dataCombo.tindakan}
                                            value={validation.values.tindakan || ""}
                                            className={`input ${validation.errors.tindakan ? "is-invalid" : ""}`}
                                            onChange={value => validation.setFieldValue('tindakan', value.value)}
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
                                    <Col lg={3} sm={6}>
                                        <div className="mt-2">
                                            <Label style={{ color: "black" }} htmlFor="qty" className="form-label fw-semibold">Qty</Label>
                                        </div>
                                    </Col>
                                    <Col lg={3} sm={6} className="mt-1">
                                        <div>
                                            <Input
                                                id="qty"
                                                name="qty"
                                                type="number"
                                                placeholder="Qty"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.qty || ""}
                                                invalid={
                                                    validation.touched.qty && validation.errors.qty ? true : false
                                                }
                                            />
                                            {validation.touched.qty && validation.errors.qty ? (
                                                <FormFeedback type="invalid"><div>{validation.errors.qty}</div></FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    <Col lg={3} sm={6}>
                                        <div className="mt-2">
                                            <Label style={{ color: "black" }} htmlFor="tinggibadan" className="form-label fw-semibold">Harga</Label>
                                        </div>
                                    </Col>
                                    <Col lg={3} sm={6} className="mt-1">
                                        <div>
                                            <Input
                                                id="Harga"
                                                name="Harga"
                                                type="number"
                                                placeholder="Harga"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.Harga || ""}
                                                invalid={
                                                    validation.touched.Harga && validation.errors.Harga ? true : false
                                                }
                                            />
                                            {validation.touched.Harga && validation.errors.Harga ? (
                                                <FormFeedback type="invalid"><div>{validation.errors.Harga}</div></FormFeedback>
                                            ) : null}
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