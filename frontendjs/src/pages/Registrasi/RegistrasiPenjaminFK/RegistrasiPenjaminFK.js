
import { useState } from "react";
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";
import classnames from "classnames";
import withRouter from "../../../Components/Common/withRouter";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, Input, Form, TabContent, TabPane, Table, Label, FormFeedback,
} from 'reactstrap';
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import CustomSelect from "../../Select/Select";


const RegistrasiPenjaminFK = () => {
    const { id } = useParams();
    const [cardHeaderTab, setcardHeaderTab] = useState("1")

    const [pillsTab, setpillsTab] = useState("1");
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: id,
        },
        validationSchema: Yup.object({

        }),
        onSubmit: (values) => {
            // console.log(values)
        }
    });
    const pillsToggle = (tab) => {
        if (pillsTab !== tab) {
            setpillsTab(tab);
        }
    };
    const cardHeaderToggle = (tab) => {
        if (cardHeaderTab !== tab) {
            setcardHeaderTab(tab);
        }
    }

    const NavItemCust = ({tabNumber, text}) => (
        <NavItem>
            <NavLink style={{ cursor: "pointer", fontWeight: "bold" }} className={classnames({ active: cardHeaderTab === tabNumber})} onClick={() => { cardHeaderToggle(tabNumber); }} >
                {text}
            </NavLink>
        </NavItem>
    );
    

    return(
        <div className="page-content">
            <ToastContainer closeButton={false} />
            <Container fluid>
                <BreadCrumb title="Registrasi Pasien" pageTitle="Registrasi Pasien" />
                <Row>
                    <Col lg={3}>
                        <Card>
                            <CardBody>
                                <h5 className="card-title mb-5">Profile Pasien</h5>
                                <div className="text-center">
                                    <img src={userDummy}
                                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                        alt="user-profile" />
                                    <Input style={{ border: 'none', textAlign: 'center' }}
                                        id="namapasien"
                                        name="namapasien"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.namapasien || ""}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Nav pills className="nav-success mb-3">
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "1", })} onClick={() => { pillsToggle("1"); }} >
                                            Profile
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "2", })} onClick={() => { pillsToggle("2"); }} >
                                            Riwayat
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: pillsTab === "3", })} onClick={() => { pillsToggle("3"); }} >
                                            Action
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={9}>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}
                            className="gy-4"
                            action="#">

                            <Card>
                                <CardHeader style={{ backgroundColor: "#dfe4ea" }}>
                                    <h4 className="card-title mb-0">Registrasi</h4>
                                </CardHeader>
                                <div className="card-header align-items-center d-flex">
                                    <div className="flex-shrink-0 ms-2">
                                        <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                                            <NavItemCust tabNumber={"1"} text={"BPJS"}/>
                                            <NavItemCust tabNumber={"2"} text={"Penjamin Lainnya"}/>
                                        </Nav>
                                    </div>
                                </div>
                                <TabContent activeTab={cardHeaderTab} className="text-muted">
                                    <TabPane tabId="1" id="home-1">
                                        <Card>
                                            <CardBody>
                                                <Col xxl={6} md={6}>
                                                    <div className="mt-2">
                                                        <Label style={{ color: "black" }} htmlFor="tglregistrasi" className="form-label">Tanggal Registrasi</Label>
                                                    </div>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <div>
                                                        <Flatpickr
                                                            // value={validation.values.tglregistrasi || ""}
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "Y-m-d",
                                                                defaultDate: "today",
                                                                maxDate: "today",
                                                                minDate: "today"
                                                            }}
                                                            onChange={([newDate]) => {
                                                                
                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <div className="mt-2">
                                                        <Label style={{ color: "black" }} htmlFor="tujkunjungan" className="form-label">Tujuan Kunjungan</Label>
                                                    </div>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <div>
                                                        <CustomSelect
                                                            id="tujkunjungan"
                                                            name="tujkunjungan"
                                                        />
                                                        {validation.touched.tujkunjungan && validation.errors.tujkunjungan ? (
                                                            <FormFeedback type="invalid"><div>{validation.errors.tujkunjungan}</div></FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                            </CardBody>
                                        </Card>
                                    </TabPane>

                                    <TabPane tabId="2" id="home-1">
                                        <Card>
                                            <CardBody>
                                                body2
                                            </CardBody>
                                        </Card>
                                    </TabPane>

                                    <TabPane tabId="3" id="home-1">
                                        <Card>
                                            <CardBody>
                                                body3
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                </TabContent>
                            </Card>                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default withRouter(RegistrasiPenjaminFK);