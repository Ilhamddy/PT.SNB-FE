import React, { useEffect, useState, useCallback, useRef } from 'react';
import withRouter from "../../../Components/Common/withRouter";
import { useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table, Form,
    FormFeedback, Alert, Modal,
    ModalHeader, ModalBody
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
//import images
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";

import CustomSelect from '../../Select/Select'
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { comboRegistrasiGet } from '../../../store/master/action';
import { registrasiNoregistrasiResetForm, registrasiGet, registrasiSaveRuangan, registrasiNoBPJSGet, registrasiRuanganNorecGet, registrasiSaveRuanganReset, registrasiGetReset, registrasiRuanganNorecGetReset } from "../../../store/actions";

const dateStart = (new Date()).toISOString()

const RegistrasiMutasiPasien = (props) => {
    const { id, norec } = useParams();
    document.title = "Registrasi Mutasi Pasien";
    const dispatch = useDispatch();

    return (
        <div className="page-content">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Registrasi Mutasi Pasien" pageTitle="Registrasi Mutasi Pasien" />

            </Container>
        </div>
    )
}

export default withRouter(RegistrasiMutasiPasien);