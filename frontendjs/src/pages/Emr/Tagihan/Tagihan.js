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
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import CustomSelect from '../../Select/Select';
import Flatpickr from "react-flatpickr";
import DataTable from 'react-data-table-component';


const Tagihan = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();


    const tableCustomStyles = {
        headRow: {
            style: {
                color: '#ffffff',
                backgroundColor: '#B57602',
            },
        },
        rows: {
            style: {
                color: "black",
                backgroundColor: "#f1f2f6"
            },

        }
    }
    return (
        <React.Fragment>
            <Row className="gy-4">

                <Card>
                    <CardHeader style={{ backgroundColor: "#B57602" }}>
                        <h4 className="card-title mb-0" style={{ color: '#ffffff' }}>Rincian Tagihan</h4>
                    </CardHeader>
                    <CardBody>
                        <div id="table-gridjs">
                            <DataTable
                                fixedHeader
                                fixedHeaderScrollHeight="330px"
                                // columns={columns}
                                pagination
                                // data={dataRiwayat}
                                // progressPending={loadingRiwayat}
                                customStyles={tableCustomStyles}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </React.Fragment>
    )
}

export default (Tagihan)