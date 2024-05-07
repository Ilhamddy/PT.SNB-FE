import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { emrHeaderGet, emrResetForm, emrTtvGet, registrasiRuanganNorecGet,listTagihanGet, listTagihanPrintGet } from "../../../store/actions";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";

// import Swiper core and required modules
import { Autoplay, Mousewheel } from 'swiper';

import classnames from "classnames";
import TandaVital from '../TandaVital/TandaVital';
import Cppt from '../Cppt/Cppt';
import Diagnosa from '../Diagnosa/index';
import InputTindakan from '../InputTindakan/InputTindakan';
import Tagihan from '../Tagihan/Tagihan';
import OrderRadiologi from '../Penunjang/Radiologi/OrderRadiologi/OrderRadiologi';
import OrderLaboratorium from '../Penunjang/Laboratorium/OrderLaboratorium/OrderLaboratorium';
import OrderResep from '../Penunjang/OrderResep/OrderResep';
import OrderOperasi from '../Penunjang/OrderOperasi/OrderOperasi';
import EfisiensiBPJS from '../EfisiensiBPJS/EfisiensiBPJS';
import AsesmenBayiBaruLahir from '../AsesmenBayiBaruLahir';
import PengkajianAwalKeperawatanRJ from '../PengkajianAwalKeperawatanRJ/PengkajianAwalKeperawatanRJ';
import AsesmenAwalIGD from '../AsesmenAwalIGD/AsesmenAwalIGD';
import SkriningIGD from '../SkriningIGD/SkriningIGD';
import LazyTabPane from '../../../Components/LazyTabPane/LazyTabPane';
import OrderBankDarah from '../Penunjang/BankDarah/OrderBankDarah/OrderBankDarah';
import Odontogram from '../../Odontogram/Odontogram';


const EmrBody = () => {
    const { norecdp, norecap, tab } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Pills Tabs
    const [pillsTab, setpillsTab] = useState("1");
    const tabToggle = (newTab) => {
        if (tab !== newTab) {
            navigate(`/emr-pasien/${norecdp}/${norecap}/${newTab}`)
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
    // Pills Penunjang
    const [pillsTabPenunjang, setpillsTabPenunjang] = useState("1");
    const pillsTogglePenunjang = (tab) => {
        if (pillsTabPenunjang !== tab) {
            setpillsTabPenunjang(tab);
        }
    };

     // Pills Operasi
     const [pillsTabOperasi, setpillsTabOperasi] = useState("1");
     const pillsToggleOperasi = (tab) => {
         if (pillsTabOperasi !== tab) {
             setpillsTabOperasi(tab);
         }
     };

    const taskWidgets = [
        {
            id: "rawat-jalan",
            label: "Rawat Jalan",
        },
        {
            id: "rawat-inap",
            label: "Rawat Inap",
        },
        {
            id: "billing",
            label: "Billing",
        },
        {
            id: "penunjang",
            label: "Penunjang",
        },
        {
            id: "operasi",
            label: "Operasi",
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
        {
            id: 4,
            label: "Pengkajian Awal Keperawatan",
        },
        {
            id: 5,
            label: "Asesmen Awal IGD"
        },
        {
            id: 6,
            label: "Skrining IGD"
        }
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
            label: "Tagihan",
        },
        {
            id: 3,
            label: "Efisiensi BPJS",
        },
    ];
    const taskPenunjang = [
        {
            id: 1,
            label: "Laboratorium",
        },
        {
            id: 2,
            label: "Radiologi",
        },
        {
            id: 3,
            label: "Resep",
        },
        {
            id: 4,
            label: "Bank Darah",
        },
        {
            id: 5,
            label: "Odontogram",
        },
    ];
    const taskOperasi = [
        {
            id: 1,
            label: "Order Operasi",
        },
        {
            id: 2,
            label: "Asesmen Bayi Baru Lahir",
        },
    ];

    useEffect(() => {
        if(norecdp){
            dispatch(registrasiRuanganNorecGet(norecdp))
            dispatch(emrTtvGet(norecdp));
        }
    }, [norecdp, dispatch])

    return (
        <React.Fragment>
            <Row>
                <Col xxl={12}>
                    <Card>
                        <div className="card-header align-items-center d-flex">
                            {/* <div className="flex-shrink-0 ms-2"> */}
                            <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                {taskWidgets.map((item, key) => (
                                    <NavItem key={key}>
                                        <NavLink 
                                            style={{ cursor: "pointer" }} 
                                            className={classnames({ active: tab === `${item.id}`, })} 
                                            onClick={() => { tabToggle(`${item.id}`); }}>
                                            <span className="fw-semibold">
                                                {item.label}
                                            </span>
                                        </NavLink>
                                    </NavItem>
                                ))}
                            </Nav>

                            {/* </div> */}
                        </div>
                        {/* <CardBody> */}
                        <TabContent activeTab={tab} className="text-muted">
                            <LazyTabPane activeTab={tab} tabId="rawat-jalan" id="home-1">
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
                                    <TabContent activeTab={pillsTabRj} className="text-muted">
                                        <TabPane tabId="4" id="pengkajianawalkeperawatan-3">
                                            <Card>
                                                <CardBody>
                                                    <PengkajianAwalKeperawatanRJ/>
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={pillsTabRj} className="text-muted">
                                        <TabPane tabId="5" id="asesmen-awal-igd">
                                            <Card>
                                                <CardBody>
                                                    <AsesmenAwalIGD/>
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={pillsTabRj} className="text-muted">
                                        <TabPane tabId="6" id="skrining-igd">
                                            <Card>
                                                <CardBody>
                                                    <SkriningIGD/>
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                </Card>
                            </LazyTabPane>
                            <LazyTabPane activeTab={tab} tabId="rawat-inap" id="home-2">
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
                                        <TandaVital />
                                    </TabPane>
                                </TabContent>
                                <TabContent activeTab={pillsTabRi} className="text-muted">
                                    <TabPane tabId="2" id="ttv-2">
                                        <Cppt />
                                    </TabPane>
                                </TabContent>
                                <TabContent activeTab={pillsTabRi} className="text-muted">
                                    <TabPane tabId="3" id="diagnosa-3">
                                        <Diagnosa />
                                    </TabPane>
                                </TabContent>
                            </LazyTabPane>
                            <LazyTabPane activeTab={tab} tabId="billing" id="home-1">
                                <Card>
                                    <div className="card-header align-items-center d-flex">
                                        {/* <div className="flex-shrink-0 ms-2"> */}
                                            <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                                {taskBilling.map((item, key) => (
                                                    <NavItem key={key}>
                                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTabBilling === `${item.id}`, })} onClick={() => { pillsToggleBilling(`${item.id}`); }}>
                                                            <span className="fw-semibold">{item.label}</span>
                                                        </NavLink>
                                                    </NavItem>
                                                ))}
                                            </Nav>
                                        {/* </div> */}
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
                                                    <Tagihan show={pillsTabBilling} />
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={pillsTabBilling} className="text-muted">
                                        <TabPane tabId="3" id="ttv-3">
                                            <Card>
                                                <CardBody>
                                                    <EfisiensiBPJS/>
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                </Card>
                            </LazyTabPane>

                            <LazyTabPane activeTab={tab} tabId="penunjang" id="home-1">
                                <div className="card-header align-items-center d-flex">
                                    <div className="flex-shrink-0 ms-2">
                                        <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                            {taskPenunjang.map((item, key) => (
                                                <NavItem key={key}>
                                                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTabPenunjang === `${item.id}`, })} onClick={() => { pillsTogglePenunjang(`${item.id}`); }}>
                                                        <span className="fw-semibold">{item.label}</span>
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </Nav>
                                    </div>
                                </div>
                                <TabContent activeTab={pillsTabPenunjang} className="text-muted">
                                    <LazyTabPane  activeTab={pillsTabPenunjang} tabId="1" id="penunjang-1">
                                        <OrderLaboratorium/>                                        
                                    </LazyTabPane>
                                </TabContent>
                                <TabContent activeTab={pillsTabPenunjang} className="text-muted">
                                    <LazyTabPane activeTab={pillsTabPenunjang} tabId="2" id="penunjang-2">
                                        <OrderRadiologi />
                                    </LazyTabPane>
                                </TabContent>
                                <TabContent activeTab={pillsTabPenunjang} className="text-muted">
                                    <LazyTabPane activeTab={pillsTabPenunjang} tabId="3" id="penunjang-2">
                                        <OrderResep />
                                    </LazyTabPane>
                                </TabContent>
                                <TabContent activeTab={pillsTabPenunjang} className="text-muted">
                                    <LazyTabPane activeTab={pillsTabPenunjang} tabId="4" id="penunjang-2">
                                        <OrderBankDarah />
                                    </LazyTabPane>
                                </TabContent>
                                <TabContent activeTab={pillsTabPenunjang} className="text-muted">
                                    <LazyTabPane activeTab={pillsTabPenunjang} tabId="5" id="penunjang-2">
                                        <Odontogram />
                                    </LazyTabPane>
                                </TabContent>
                            </LazyTabPane>

                            <LazyTabPane activeTab={tab} tabId="operasi" id="home-1">
                                <div className="card-header align-items-center d-flex">
                                    <div className="flex-shrink-0 ms-2">
                                        <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                            {taskOperasi.map((item, key) => (
                                                <NavItem key={key}>
                                                    <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTabOperasi === `${item.id}`, })} onClick={() => { pillsToggleOperasi(`${item.id}`); }}>
                                                        <span className="fw-semibold">{item.label}</span>
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </Nav>
                                    </div>
                                </div>
                                <TabContent activeTab={pillsTabOperasi} className="text-muted">
                                    <LazyTabPane activeTab={pillsTabOperasi} tabId="1" id="operasi-1">
                                        <Card>
                                            <CardBody>
                                                <OrderOperasi />  
                                            </CardBody>
                                        </Card>                                     
                                    </LazyTabPane>
                                    <LazyTabPane activeTab={pillsTabOperasi} tabId="2" id="operasi-1">
                                        <Card>
                                            <CardBody>
                                                <AsesmenBayiBaruLahir />  
                                            </CardBody>
                                        </Card>                                     
                                    </LazyTabPane>
                                </TabContent>
                            </LazyTabPane>
                        </TabContent>


                        {/* </CardBody> */}
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}


export default (EmrBody);