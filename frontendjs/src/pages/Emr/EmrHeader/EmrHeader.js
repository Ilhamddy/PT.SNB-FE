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
import classnames from "classnames";

const EmrHeader = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData } = useSelector(state => ({
        editData: state.Emr.emrHeaderGet.data,
    }));

    useEffect(() => {
        if (norecap) {
            dispatch(emrHeaderGet(norecap));
        }
    }, [norecap, dispatch])

    useEffect(() => {
        return () => {
            dispatch(emrResetForm());
        }
    }, [dispatch])

    

    

    return (
        <React.Fragment>
            <Row>
                <Col xxl={3} sm={6}>
                    <Card className="card-animate card-info">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="flex-shrink-0 mt-sm-0 mt-3">
                                    <h6><span className="fw-semibold">{editData.namapasien}</span></h6>
                                    <h6><span className="fw-semibold">{editData.tgllahir}</span></h6>
                                    <h6><span className="fw-semibold">{editData.umur}</span></h6>
                                    <h6 className="mb-0"><span className="fw-semibold">{editData.jeniskelamin}</span></h6>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={3} sm={6}>
                    <Card className="card-animate card-info">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="flex-shrink-0 mt-sm-0 mt-3">
                                    <h6><span className="fw-semibold">{editData.nocm}</span></h6>
                                    <h6><span className="fw-semibold">{editData.noregistrasi}</span></h6>
                                    <h6><span className="fw-semibold">{editData.ruanganta}</span></h6>
                                    <h6 className="mb-0"><span className="fw-semibold">{editData.namarekanan}</span></h6>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={2} sm={6}>
                    <Card className="card-animate card-warning">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fw-medium text-muted mb-0">test</p>
                                    <h2 className="mt-4 ff-secondary fw-semibold">
                                        <span className="counter-value" style={{ fontSize: "5rem" }}>

                                        </span>
                                    </h2>

                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={2} sm={6}>
                    <Card className="card-animate card-warning">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fw-medium text-muted mb-0">test</p>
                                    <h2 className="mt-4 ff-secondary fw-semibold">
                                        <span className="counter-value" style={{ fontSize: "5rem" }}>

                                        </span>
                                    </h2>

                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={2} sm={6}>
                    <Card className="card-animate card-warning">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fw-medium text-muted mb-0">test</p>
                                    <h2 className="mt-4 ff-secondary fw-semibold">
                                        <span className="counter-value" style={{ fontSize: "5rem" }}>

                                        </span>
                                    </h2>

                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                
            </Row>
        </React.Fragment>
    )
}

export default (EmrHeader);