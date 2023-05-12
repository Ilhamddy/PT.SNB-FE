import React from 'react';
import UiContent from '../../../Components/Common/UiContent';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import withRouter from "../../../Components/Common/withRouter";


import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
const PasienBaru = () => {
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Pasien Baru" pageTitle="Forms" />
                </Container>
            </div>
        </React.Fragment>
    );
}

export default withRouter(PasienBaru);