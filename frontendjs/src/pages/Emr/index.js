import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import withRouter from '../../Components/Common/withRouter';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import UiContent from '../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import EmrHeader from './EmrHeader/EmrHeader';
import EmrBody from './EmrBody/EmrBody';

const Emr = () => {
    document.title = "EMR";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="EMR" pageTitle="Forms" />
                    <Row>
                        <Col xxl={12}>
                            <EmrHeader />
                        </Col>
                        <Col xxl={12}>
                            <EmrBody/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(Emr);