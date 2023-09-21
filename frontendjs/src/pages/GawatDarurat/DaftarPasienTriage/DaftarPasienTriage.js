import React, { useEffect, useState } from 'react';
import withRouter from '../../../Components/Common/withRouter';
import UiContent from '../../../Components/Common/UiContent';
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from 'reactstrap';
import { widgetDaftarPasienTriageGet, daftarPasienResetForm, DaftarPasienTriageGet } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import CountUp from "react-countup";

const TriageIGD = () => {
    document.title = "Daftar Pasien Triage";
    const dispatch = useDispatch();
    const { datawidget, data } = useSelector((state) => ({
        datawidget: state.DaftarPasien.widgetDaftarPasienTriageGet.data,
        data: state.DaftarPasien.DaftarPasienTriageGet.data,
    }));
    useEffect(() => {
        return () => {
            dispatch(daftarPasienResetForm());
        }
    }, [dispatch])
    useEffect(() => {
        dispatch(widgetDaftarPasienTriageGet());
    }, [dispatch])
    useEffect(() => {
        dispatch(DaftarPasienTriageGet());
    }, [dispatch])
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Pasien Triage" pageTitle="Forms" />
                    <Card>
                        <CardHeader className="align-items-center" style={{ backgroundColor: "#e67e22" }}>
                            <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Pasien Triage IGD</h4>
                        </CardHeader>
                        <CardBody>
                            <Row className="row-cols-xxl-5 row-cols-lg-3 row-cols-1">
                                {datawidget.map((item, key) => (
                                    <Col key={key}>
                                        <Card className="card-animate" style={{ backgroundColor: item.color }}>
                                            <CardBody>
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <p className="fw-medium mb-0">{item.label}</p>

                                                    </div>
                                                    <div>
                                                        <div className="avatar-md flex-shrink-0">
                                                            <span className={"avatar-title rounded-circle fs-4 bg-soft-info"}>
                                                                <h2 className="ff-secondary fw-semibold">
                                                                    <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                                        <CountUp
                                                                            start={0}
                                                                            end={item.counter}
                                                                            decimal={item.decimals}
                                                                            duration={3}
                                                                        />
                                                                    </span>
                                                                </h2>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>

                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                <Col lg={3}>
                                    <Card>
                                        <CardBody>
                                            {/* <h5 className="card-title mb-5">Profile Pasien</h5> */}
                                            <div className="text-center">
                                                {/* <img src={userDummy}
                                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                            alt="user-profile" />
                                        <h5 className="fs-17 mb-1">{userChosen.nama}</h5>
                                        <p className="text-muted mb-0">{userChosen.id}</p> */}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={9}>
                                    <Card>
                                        <CardHeader>
                                            <Row className="row-cols-xxl-6 row-cols-lg-3 row-cols-1">
                                                <Col>
                                                    <Input
                                                        id="search"
                                                        name="search"
                                                        type="search"
                                                        // value={search}
                                                        placeholder='Cari Berdasarkan No.RM / Nama Pasien'
                                                        onChange={(e) => {
                                                            // setSearch(e.target.value)
                                                        }}
                                                    />
                                                </Col>
                                                <Col>
                                                    <div className="mt-2">
                                                        <Label className="form-label">Jenis Triage Pasien</Label>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <Input
                                                        id="search"
                                                        name="search"
                                                        type="select"
                                                        // value={search}
                                                        placeholder='Cari Berdasarkan No.RM / Nama Pasien'
                                                        onChange={(e) => {
                                                            // setSearch(e.target.value)
                                                        }}
                                                    />
                                                </Col>
                                                <Col>
                                                    <div className="mt-2">
                                                        <Label className="form-label">Status Pasien</Label>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <Input
                                                        id="search"
                                                        name="search"
                                                        type="select"
                                                        // value={search}
                                                        placeholder='Cari Berdasarkan No.RM / Nama Pasien'
                                                        onChange={(e) => {
                                                            // setSearch(e.target.value)
                                                        }}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Button>+</Button></Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="row-cols-xxl-12 row-cols-lg-12 row-cols-1">
                                                {(data.data || []).map((item, key) => (
                                                    <Col key={key}>
                                                        <Card className="card-animate">
                                                            <CardBody>
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="avatar-md flex-shrink-0">
                                                                        <span className={"avatar-title rounded-circle fs-4 bg-soft-info"}>
                                                                            <h2 className="ff-secondary fw-semibold">
                                                                                <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                                                </span>
                                                                            </h2>
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-2">
                                                                        <h5 className="card-title mb-1">-</h5>
                                                                        <p className="text-muted mb-0">{item.namapasien}</p>
                                                                        <p className="text-muted mb-0">Digital Marketing</p>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-2">
                                                                        <h5 className="card-title mb-1">-</h5>
                                                                        <p className="text-muted mb-0">{item.namapasien}</p>
                                                                        <p className="text-muted mb-0">Digital Marketing</p>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-2">
                                                                        <h5 className="card-title mb-1">-</h5>
                                                                        <p className="text-muted mb-0">{item.namapasien}</p>
                                                                        <p className="text-muted mb-0">Digital Marketing</p>
                                                                    </div>
                                                                </div>
                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(TriageIGD)