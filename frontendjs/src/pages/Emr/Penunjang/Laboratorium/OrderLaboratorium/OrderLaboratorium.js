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
import UiContent from '../../../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import CustomSelect from '../../../../Select/Select';
import BreadCrumb from '../../../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';

const OrderLaboratorium=()=>{
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success,
         dataCombo, loadingCombo, successCombo} = useSelector((state) => ({
            // newData: state.Radiologi.saveOrderPelayananRadiologi.newData,
            // success: state.Radiologi.saveOrderPelayananRadiologi.success,
            // loading: state.Radiologi.saveOrderPelayananRadiologi.loading,
            // dataCombo: state.Emr.comboHistoryUnitGet.data,
            // loadingCombo: state.Emr.comboHistoryUnitGet.loading,
            // successCombo: state.Emr.comboHistoryUnitGet.success,
            
        }));

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: newData?.norecap ?? norecap,
           
        },
        validationSchema: Yup.object({
            tindakan: Yup.string().required("Tindakan Belum Dipilih"),
            unitasal: Yup.string().required("Unit Asal Belum Dipilih"),
            namatindakan: Yup.string().required("Nama Tindakan Asal Belum Dipilih"),
           
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            // dispatch(tindakanSave(values, ''));
            resetForm({ values: '' })
        }
    })
    return(
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
                            
                        </Row>
                    </Form>
            </Row>
        </React.Fragment>
    )
}
export default (OrderLaboratorium)