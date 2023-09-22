import React, { useEffect, useState, useCallback } from 'react';
import withRouter from '../../../Components/Common/withRouter';
import UiContent from '../../../Components/Common/UiContent';
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Progress, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const TriageIGD = () => {
    document.title = "Triage IGD";
    const [currentStep, setCurrentStep] = useState(1);

    const handleStepChange = (step) => {
        setCurrentStep(step);
    };

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Input Pasien Triage" pageTitle="Forms" />
                    <Card>
                        <CardHeader className="align-items-center" style={{ backgroundColor: "#e67e22" }}>
                            <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Identitas Pasien IGD</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg={6}>
                                    <Row className="gy-2">
                                        <Col lg={4}>
                                            <div className="mt-2">
                                                <Label className="form-label">Nama Pasien</Label>
                                            </div>
                                        </Col>
                                        <Col lg={8}>
                                            <Input
                                                id="search"
                                                name="search"
                                                type="search"
                                                // value={search}
                                                placeholder='Masukan Nama Pasien'
                                                onChange={(e) => {
                                                    // setSearch(e.target.value)
                                                }}
                                            />
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mt-2">
                                                <Label className="form-label">Umur</Label>
                                            </div>
                                        </Col>
                                        <Col lg={8}>
                                            <Input
                                                id="search"
                                                name="search"
                                                type="search"
                                                // value={search}
                                                placeholder='Masukan Umur Pasien'
                                                onChange={(e) => {
                                                    // setSearch(e.target.value)
                                                }}
                                            />
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mt-2">
                                                <Label className="form-label">Tgl. Kedatangan</Label>
                                            </div>
                                        </Col>
                                        <Col lg={8}>
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
                                    </Row>
                                </Col>
                                <Col lg={6}>
                                    <Row className="gy-2">
                                        <Col lg={4}>
                                            <div className="mt-2">
                                                <Label className="form-label">Nama Keluarga</Label>
                                            </div>
                                        </Col>
                                        <Col lg={8}>
                                            <Input
                                                id="search"
                                                name="search"
                                                type="search"
                                                // value={search}
                                                placeholder='Nama Keluarga'
                                                onChange={(e) => {
                                                    // setSearch(e.target.value)
                                                }}
                                            />
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mt-2">
                                                <Label className="form-label">Hubungan Keluarga</Label>
                                            </div>
                                        </Col>
                                        <Col lg={8}>
                                            <Input
                                                id="search"
                                                name="search"
                                                type="search"
                                                // value={search}
                                                placeholder='Hubungan Keluarga'
                                                onChange={(e) => {
                                                    // setSearch(e.target.value)
                                                }}
                                            />
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mt-2">
                                                <Label className="form-label">No. Hp Keluarga</Label>
                                            </div>
                                        </Col>
                                        <Col lg={8}>
                                            <Input
                                                id="search"
                                                name="search"
                                                type="search"
                                                // value={search}
                                                placeholder='No. Hp Keluarga'
                                                onChange={(e) => {
                                                    // setSearch(e.target.value)
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className="align-items-center" style={{ backgroundColor: "#e67e22" }}>
                            <h4 className="mb-0" style={{ color: 'black', textAlign: 'center' }}>Triage IGD Terintegrasi</h4>
                        </CardHeader>
                        <CardBody>
                            <Row className="gy-2">
                                <Col lg={4}><div className="mt-2">
                                    <Label className="form-label">Keluhan</Label>
                                </div></Col>
                                <Col lg={8}>
                                    <Input
                                        id="search"
                                        name="search"
                                        type="textarea"
                                        // value={search}
                                        placeholder='Keluhan'
                                        onChange={(e) => {
                                            // setSearch(e.target.value)
                                        }}
                                    />
                                </Col>
                                <Col lg={4}><div className="mt-2">
                                    <Label className="form-label">Riwayat Penyakit</Label>
                                </div></Col>
                                <Col lg={8}>
                                    <Input
                                        id="search"
                                        name="search"
                                        type="textarea"
                                        // value={search}
                                        placeholder='Riwayat Penyakit'
                                        onChange={(e) => {
                                            // setSearch(e.target.value)
                                        }}
                                    />
                                </Col>
                                <Col lg={4}><div className="mt-2">
                                    <Label className="form-label">Riwayat Obat Terdahulu</Label>
                                </div></Col>
                                <Col lg={8}>
                                    <Input
                                        id="search"
                                        name="search"
                                        type="textarea"
                                        // value={search}
                                        placeholder='Riwayat Obat Terdahulu'
                                        onChange={(e) => {
                                            // setSearch(e.target.value)
                                        }}
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Label className="form-label">Skala Nyeri</Label>
                                </Col>
                                <Col lg={8}>
                                    <Progress multi>
                                        <Progress bar value="10" style={{ backgroundColor: '#308A45' }} max={100}>0</Progress>
                                        <Progress bar style={{ backgroundColor: '#91BE32' }} value="10" max={100}>1</Progress>
                                        <Progress bar style={{ backgroundColor: '#91BE32' }} value="10" max={100}>2</Progress>
                                        <Progress bar style={{ backgroundColor: '#FCEA2B' }} value="10" max={100}>3</Progress>
                                        <Progress bar style={{ backgroundColor: '#FCEA2B' }} value="10" max={100}>4</Progress>
                                        <Progress bar style={{ backgroundColor: '#F3B210' }} value="10" max={100}>5</Progress>
                                        <Progress bar style={{ backgroundColor: '#F3B210' }} value="10" max={100}>6</Progress>
                                        <Progress bar style={{ backgroundColor: '#F37100' }} value="10" max={100}>7</Progress>
                                        <Progress bar style={{ backgroundColor: '#F37100' }} value="10" max={100}>8</Progress>
                                        <Progress bar style={{ backgroundColor: '#FF0A0A' }} value="10" max={100}>9</Progress>
                                        <Progress bar style={{ backgroundColor: '#FF0A0A' }} value="10" max={100}>10</Progress>
                                    </Progress>
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