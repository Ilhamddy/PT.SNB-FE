import React, { useEffect, useState, useCallback, useReducer, useRef } from 'react';
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

import {
    emrDiagnosaxSave, emrResetForm, emrComboGet, emrDiagnosaxGet, emrListDiagnosaxGet,
    deleteDiagnosax
} from "../../../store/actions";
import DeleteModalCustom from '../../../Components/Common/DeleteModalCustom';
import LoadingTable from '../../../Components/Table/LoadingTable';

const JenisPelayanan = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();

    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default (JenisPelayanan)