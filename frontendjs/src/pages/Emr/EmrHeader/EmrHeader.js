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
                    <Card className="card-animate" style={{ backgroundColor: '#e67e22' }}>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="flex-shrink-0 mt-sm-0 mt-3">
                                    <h6><span className="fw-semibold text-light">{editData.namapasien}</span></h6>
                                    <h6><span className="fw-semibold text-light">{editData.tgllahir}</span></h6>
                                    <h6><span className="fw-semibold text-light">{editData.umur}</span></h6>
                                    <h6 className="mb-0"><span className="fw-semibold text-light">{editData.jeniskelamin}</span></h6>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={3} sm={6}>
                    <Card className="card-animate" style={{ backgroundColor: '#e67e22' }}>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="flex-shrink-0 mt-sm-0 mt-3">
                                    <h6><span className="fw-semibold text-light">{editData.nocm}</span></h6>
                                    <h6><span className="fw-semibold text-light">{editData.noregistrasi}</span></h6>
                                    <h6><span className="fw-semibold text-light">{editData.ruanganta}</span></h6>
                                    <h6 className="mb-0"><span className="fw-semibold text-light">{editData.namarekanan}</span></h6>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={2} sm={6}>
                    <Card className="card-animate" style={{backgroundColor:'#f0932b'}}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.tekanandarah} <span style={{ color: "red" }}>mmhg</span></p>
                                </div>
                                <div className="flex-shrink-0">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  T.Darah
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.pernapasan}  <span style={{ color: "red" }}>X/menit</span></p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Pernapasan
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.suhu} <span style={{ color: "red" }}>°C</span></p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Suhu
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.nadi}  <span style={{ color: "red" }}>X/menit</span></p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Nadi
                                    </h5>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={2} sm={6}>
                    <Card className="card-animate" style={{backgroundColor:'#f0932b'}}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.spo2} <span style={{color:'red'}}>%</span></p>
                                </div>
                                <div className="flex-shrink-0">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  SpO2
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.keadaanumum}</p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Keadaan
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.namagcs}</p>
                                </div>
                            </div>

                        </CardBody>
                    </Card>
                </Col>
                <Col xxl={2} sm={6}>
                    <Card className="card-animate" style={{backgroundColor:'#f0932b'}}>
                        <CardBody>
                        <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"fw-semibold mb-0"} style={{ color: "black" }}>{editData.beratbadan}<span style={{color:'red'}}> Kg</span></p>
                                </div>
                                <div className="flex-shrink-0">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Berat Badan
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"fw-semibold mb-0"} style={{ color: "black" }}>{editData.tinggibadan} <span style={{color:'red'}}>cm</span></p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  T.Badan
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <p className={"text-uppercase fw-semibold mb-0"} style={{ color: "black" }}>{editData.alergi}</p>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <h5 className={"fs-14 mb-0"}>
                                        <i className={"fs-13 align-middle"}></i>  Alergi
                                    </h5>
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