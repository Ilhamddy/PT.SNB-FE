import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { emrHeaderGet, emrResetForm } from "../../../store/actions";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classnames from "classnames";
import TandaVital from '../TandaVital/TandaVital';
import Cppt from '../Cppt/Cppt';
import Diagnosa from '../Diagnosa/index';
import InputTindakan from '../InputTindakan/InputTindakan';

const EmrBody = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    // Pills Tabs
    const [pillsTab, setpillsTab] = useState("1");
    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };

    // Pills Tabs
    const [pillsTabRj, setpillsTabRj] = useState("1");
    const pillsToggleRj = (tab) => {
        if (pillsTabRj !== tab) {
            setpillsTabRj(tab);
        }
    };
    // Pills Tabs
    const [pillsTabRi, setpillsTabRi] = useState("1");
    const pillsToggleRi = (tab) => {
        if (pillsTabRi !== tab) {
            setpillsTabRi(tab);
        }
    };
    // Pills Billing
    const [pillsTabBilling, setpillsTabBilling] = useState("1");
    const pillsToggleBilling = (tab) => {
        if (pillsTabBilling !== tab) {
            setpillsTabBilling(tab);
        }
    };

    const taskWidgets = [
        {
            id: 1,
            label: "Rawat Jalan",
        },
        {
            id: 2,
            label: "Rawat Inap",
        },
        {
            id: 3,
            label: "Billing",
        },
        {
            id: 4,
            label: "Penunjang",
        },

    ];
    const taskRJ = [
        {
            id: 1,
            label: "TTV",
        },
        {
            id: 2,
            label: "CPPT",
        },
        {
            id: 3,
            label: "Diagnosa",
        },
    ];
    const taskRI = [
        {
            id: 1,
            label: "TTV",
        },
        {
            id: 2,
            label: "CPPT",
        },
        {
            id: 3,
            label: "Diagnosa",
        },
    ];
    const taskBilling = [
        {
            id: 1,
            label: "Input Tindakan",
        },
        {
            id: 2,
            label: "Rincian Billing",
        },
    ];

    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <Row>
                <Col xxl={12}>
                    <Card>
                        <div className="card-header align-items-center d-flex">
                            {/* <div className="flex-shrink-0 ms-2"> */}
                                <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                    {taskWidgets.map((item, key) => (
                                        <NavItem key={key}>
                                            <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === `${item.id}`, })} onClick={() => { pillsToggle(`${item.id}`); }}>
                                                <span className="fw-semibold">{item.label}</span>
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </Nav>

                            {/* </div> */}
                        </div>
                        {/* <CardBody> */}
                        <TabContent activeTab={pillsTab} className="text-muted">
                            <TabPane tabId="1" id="home-1">
                                <Card>
                                    <div className="card-header align-items-center d-flex">
                                        <div className="flex-shrink-0 ms-2">
                                            <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                                {taskRJ.map((item, key) => (
                                                    <NavItem key={key}>
                                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTabRj === `${item.id}`, })} onClick={() => { pillsToggleRj(`${item.id}`); }}>
                                                            <span className="fw-semibold">{item.label}</span>
                                                        </NavLink>
                                                    </NavItem>
                                                ))}
                                            </Nav>
                                        </div>
                                    </div>
                                    <TabContent activeTab={pillsTabRj} className="text-muted">
                                        <TabPane tabId="1" id="ttv-1">
                                            <Card>
                                                <CardBody>
                                                    <TandaVital />
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={pillsTabRj} className="text-muted">
                                        <TabPane tabId="2" id="ttv-2">
                                            <Card>
                                                <CardBody>
                                                    <Cppt />
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={pillsTabRj} className="text-muted">
                                        <TabPane tabId="3" id="diagnosa-3">
                                            <Card>
                                                <CardBody>
                                                    <Diagnosa />
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                </Card>

                            </TabPane>
                            <TabPane tabId="2" id="home-1">
                                <Card>
                                    <div className="card-header align-items-center d-flex">
                                        <div className="flex-shrink-0 ms-2">
                                            <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                                {taskRI.map((item, key) => (
                                                    <NavItem key={key}>
                                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTabRi === `${item.id}`, })} onClick={() => { pillsToggleRi(`${item.id}`); }}>
                                                            <span className="fw-semibold">{item.label}</span>
                                                        </NavLink>
                                                    </NavItem>
                                                ))}
                                            </Nav>
                                        </div>
                                    </div>
                                    <TabContent activeTab={pillsTabRi} className="text-muted">
                                        <TabPane tabId="1" id="ttv-1">
                                            <Card>
                                                <CardBody>
                                                    <TandaVital />
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={pillsTabRi} className="text-muted">
                                        <TabPane tabId="2" id="ttv-2">
                                            <Card>
                                                <CardBody>
                                                    <Cppt />
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={pillsTabRi} className="text-muted">
                                        <TabPane tabId="3" id="diagnosa-3">
                                            <Card>
                                                <CardBody>
                                                    <Diagnosa />
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                </Card>
                            </TabPane>
                            <TabPane tabId="3" id="home-1">
                                <Card>
                                    <div className="card-header align-items-center d-flex">
                                        <div className="flex-shrink-0 ms-2">
                                            <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                                {taskBilling.map((item, key) => (
                                                    <NavItem key={key}>
                                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTabBilling === `${item.id}`, })} onClick={() => { pillsToggleBilling(`${item.id}`); }}>
                                                            <span className="fw-semibold">{item.label}</span>
                                                        </NavLink>
                                                    </NavItem>
                                                ))}
                                            </Nav>
                                        </div>
                                    </div>
                                    <TabContent activeTab={pillsTabBilling} className="text-muted">
                                        <TabPane tabId="1" id="ttv-1">
                                            <Card>
                                                <CardBody>
                                                    <InputTindakan />
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={pillsTabBilling} className="text-muted">
                                        <TabPane tabId="2" id="ttv-2">
                                            <Card>
                                                <CardBody>

                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                </Card>
                            </TabPane>
                        </TabContent>


                        {/* </CardBody> */}
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default (EmrBody);