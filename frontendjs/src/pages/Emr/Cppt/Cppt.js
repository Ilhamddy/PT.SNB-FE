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
import DataTable from 'react-data-table-component';

const Cppt = () => {

    return (
        <React.Fragment>
            <Row className="gy-4">
                <Form>
                    <Row>
                        <Col xxl={6} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="subjective" className="form-label fw-semibold">Subjective</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="subjective"
                                            name="subjective"
                                            type="textarea"
                                            placeholder="Subjective"
                                            style={{ height: '300px' }}
                                        />

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={6} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="assesment" className="form-label fw-semibold">Assesment</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="assesment"
                                            name="assesment"
                                            type="textarea"
                                            placeholder="Assesment"
                                            style={{ height: '300px' }}
                                        />

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={6} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="objective" className="form-label fw-semibold">Objective</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="objective"
                                            name="objective"
                                            type="textarea"
                                            placeholder="Objective"
                                            style={{ height: '300px' }}
                                        />

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={6} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="plan" className="form-label fw-semibold">Plan</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="plan"
                                            name="plan"
                                            type="textarea"
                                            placeholder="Plan"
                                            style={{ height: '300px' }}
                                        />

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </React.Fragment>
    )
}
export default (Cppt)