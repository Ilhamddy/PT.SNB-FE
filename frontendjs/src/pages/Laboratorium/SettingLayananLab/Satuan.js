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
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import {
    comboLaboratoriumGet, saveNilaiNormalLaboratorium
} from '../../../store/actions';

const Satuan = () => {
    document.title = "Satuan";
    const dispatch = useDispatch();
    const history = useNavigate();

    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <div className="live-preview">
                                <Row>
                                    <Col>
                                        <h4 className="card-title mb-0 flex-grow-1 mb-3">Satuan <span style={{ color: '#e67e22' }}> </span></h4>
                                    </Col>
                                </Row>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className='mb-2'>
                                <Row className="g-3">
                                    <Col lg={12}>

                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default withRouter(Satuan)