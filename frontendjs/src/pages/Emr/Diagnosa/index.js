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
import CustomSelect from '../../Select/Select';

import { emrSave, emrResetForm, emrComboGet, emrGet } from "../../../store/actions";
import Diagnosax from './Diagnosax';
import Diagnosaix from './Diagnosaix';

const Diagnosa = () => {
    return (
        <React.Fragment>
            {/* <ToastContainer closeButton={false} /> */}
            <Row className="gy-6 p-5">
                {/* <Form> */}
                    <Row>
                        <Col lg={12}>
                            <Diagnosax/>
                        </Col>
                        <Col lg={12}>
                            <Diagnosaix/>
                        </Col>
                    </Row>
                {/* </Form> */}
            </Row>
        </React.Fragment>
    )
}

export default (Diagnosa)