import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
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
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect';
import withRouter from '../../../Components/Common/withRouter';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import DataTable from 'react-data-table-component';
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import {
    comboLaboratoriumGet
} from '../../../store/actions';
import InputKelompokUmur from './InputKelompokUmur';
import DetailKelompokUmur from './DetailKelompokUmur';
import usePageState from "../../../utils/usePageState";
const KelompokUmur = () => {
    document.title = "Kelompok Umur";
    const { idkelompokumur } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, loading, error } = useSelector((state) => ({
        data: state.Laboratorium.comboLaboratoriumGet.data,
        loading: state.Laboratorium.comboLaboratoriumGet.loading

    }));



    const columns = [

        {
            name: <span className='font-weight-bold fs-13'>No</span>,
            selector: row => row.no,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Kelompok Umur</span>,
            selector: row => row.label,
            sortable: true,
            width: "350px"
        },
        {
            name: <span className='font-weight-bold fs-13'>Enabled</span>,
            selector: row => row.status,
            sortable: true,
            width: "100px"
        },
    ];
    const columns2 = useMemo(
        () => [

            {
                Header: "No",
                accessor: "no",
                filterable: false,
                id: '#',
            },
            {
                Header: "Kelompok Umur",
                accessor: "label",
                filterable: false,
            },
            {
                Header: "Enabled",
                accessor: "status",
                filterable: false,
            },
        ],
        []
    );
    useEffect(() => {
        dispatch(comboLaboratoriumGet(''));
    }, [dispatch])
    const [sSettingLayLab, setSSettingLayLab] = usePageState("SETTING_LAYANAN_LAB")
    return (
        <React.Fragment>
            <Row>
                <Col lg={5}>
                    <Card>
                        <CardHeader className="aflign-items-center d-flex">
                            <div className="live-preview">
                                <Row>
                                    <Col>
                                        <h4 className="card-title mb-0 flex-grow-1 mb-3">Tambah Kelompok Umur <span style={{ color: '#FFCB46' }}> </span></h4>
                                    </Col>
                                </Row>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className='mb-2'>
                                <Row className="g-3">
                                    <Col lg={12}>
                                        <Row className="gy-4">
                                            <Col lg={12}>
                                                <InputKelompokUmur idkelompokumur={idkelompokumur}/>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={7}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <div className="live-preview">
                                <Row>
                                    <Col>
                                        <h4 className="card-title mb-0 flex-grow-1 mb-3">Detail Kelompok Umur {sSettingLayLab.labelkelumur}<span style={{ color: '#FFCB46' }}> </span></h4>
                                    </Col>
                                </Row>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <DetailKelompokUmur />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default withRouter(KelompokUmur)