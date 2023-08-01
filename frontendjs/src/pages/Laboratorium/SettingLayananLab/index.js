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
import KelompokUmur from './KelompokUmur';
import Satuan from './Satuan';

const SettingLayananLab = () => {
    document.title = "Setting Layanan Laboratorium";
    const dispatch = useDispatch();
    const history = useNavigate();

    const taskWidgets = [
        {
            id: 1,
            label: "Kelompok Umur",
        },
        {
            id: 2,
            label: "Satuan",
        }
    ];
    const [pillsTab, setpillsTab] = useState("1");
    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="SETTING LAYANAN LABORATORIUM" pageTitle="Forms" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <div className="live-preview">
                                        <Row>
                                            <Col>
                                                <h4 className="card-title mb-0 flex-grow-1 mb-3">Setting Layanan Laboratorium <span style={{ color: '#e67e22' }}> </span></h4>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className='mb-2'>
                                        <Row className="g-3">
                                            <Col lg={12}>
                                                <div className="card-header align-items-center d-flex">
                                                    <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                                        {taskWidgets.map((item, key) => (
                                                            <NavItem key={key}>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === `${item.id}`, })} onClick={() => { pillsToggle(`${item.id}`); }}>
                                                                    <span className="fw-semibold">{item.label}</span>
                                                                </NavLink>
                                                            </NavItem>
                                                        ))}
                                                    </Nav>
                                                </div>
                                                <TabContent activeTab={pillsTab} className="text-muted">
                                                    <TabPane tabId="1" id="home-1">
                                                        <KelompokUmur/>
                                                    </TabPane>
                                                </TabContent>
                                                <TabContent activeTab={pillsTab} className="text-muted">
                                                    <TabPane tabId="2" id="home-2">
                                                        <Satuan/>
                                                    </TabPane>
                                                </TabContent>
                                            </Col>
                                        </Row>
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

export default withRouter(SettingLayananLab)