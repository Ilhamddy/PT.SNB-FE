import React, { useEffect, useState } from 'react';
import withRouter from "../../../Components/Common/withRouter";
import { useParams } from "react-router-dom";
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

//import images
import userDummy from "../../../assets/images/users/user-dummy-img.jpg";

const RegistrasiPasien = () => {
    const { id } = useParams();

    return (
        <div className="page-content">
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
                                        {/* <h5 className="fs-17 mb-1">{namaPasien}</h5>
                                        <p className="text-muted mb-0">{noIdentitas}</p> */}
                                    </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={9}>
                        <Card>
                            <CardBody>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(RegistrasiPasien);