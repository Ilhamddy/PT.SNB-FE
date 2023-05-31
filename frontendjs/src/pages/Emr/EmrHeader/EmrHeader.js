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
            dispatch(emrHeaderGet(norecap + `&norecdp=${norecdp}`));
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
                                <div className="flex-shrink-0 mt-sm-0 mt-3">
                                    <h6><span className="fw-semibold">{editData.tekanandarah} mmhg</span><span className="fw-semibold" style={{color:"red"}}> T.Darah</span></h6>
                                    <h6><span className="fw-semibold">{editData.pernapasan} X/menit</span><span className="fw-semibold" style={{color:"red"}}> Pernapasan</span></h6>
                                    <h6><span className="fw-semibold">{editData.suhu} °C</span><span className="fw-semibold" style={{color:"red"}}> Suhu</span></h6>
                                    <h6 className="mb-0"><span className="fw-semibold">{editData.nadi} X/menit</span><span className="fw-semibold" style={{color:"red"}}> Nadi</span></h6>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={2} sm={6}>
                    <Card className="card-animate card-warning">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="flex-shrink-0 mt-sm-0 mt-3">
                                    <h6><span className="fw-semibold">{editData.spo2} %</span><span className="fw-semibold" style={{color:"red"}}> SpO2</span></h6>
                                    <h6><span className="fw-semibold">{editData.keadaanumum}</span><span className="fw-semibold" style={{color:"red"}}> Keadaan Umum</span></h6>
                                   
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={2} sm={6}>
                    <Card className="card-animate card-warning">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="flex-shrink-0 mt-sm-0 mt-3">
                                    <h6><span className="fw-semibold">{editData.beratbadan}</span><span className="fw-semibold" style={{color:"red"}}> Berat Badan</span></h6>
                                    <h6><span className="fw-semibold">{editData.tinggibadan}</span><span className="fw-semibold" style={{color:"red"}}> Tinggi Badan</span></h6>
                                    <h6><span className="fw-semibold">{editData.alergi}</span><span className="fw-semibold" style={{color:"red"}}> Alergi</span></h6>
                                   
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