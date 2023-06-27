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

const DaftarPasienRadiologi = () => {
    document.title = "Daftar Order Radiologi";
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien Radiologi" pageTitle="Forms" />
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

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (DaftarPasienRadiologi)