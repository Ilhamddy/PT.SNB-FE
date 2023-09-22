import React, { useEffect, useState } from 'react';
import withRouter from '../../../Components/Common/withRouter';
import UiContent from '../../../Components/Common/UiContent';
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from 'reactstrap';
import { widgetDaftarPasienTriageGet, daftarPasienResetForm, DaftarPasienTriageGet } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import CountUp from "react-countup";
import pria from "../../../assets/images/svg/pria.svg";
import { useNavigate } from 'react-router-dom';

const TriageIGD = () => {
    document.title = "Daftar Pasien Triage";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { datawidget, data } = useSelector((state) => ({
        datawidget: state.DaftarPasien.widgetDaftarPasienTriageGet.data,
        data: state.DaftarPasien.DaftarPasienTriageGet.data,
    }));
    const [namaPasien, setnamaPasien] = useState(null);
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
    const handleCard = (item) => {
        // console.log(item)
        setnamaPasien(item.namapasien)
    };
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
                                        <CardBody className="p-4 text-center">
                                            <div className="mx-auto avatar-md mb-3">
                                                <span className={"avatar-title rounded-circle fs-4 bg-soft-info"}>
                                                    <h2 className="ff-secondary fw-semibold">
                                                        <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                        <img src={pria} alt="" className="img-fluid rounded-circle" />
                                                        </span>
                                                    </h2>
                                                </span>
                                            </div>
                                            <h5 className="card-title mb-1">{namaPasien}</h5>
                                            {/* <p className="text-muted mb-0">Graphic Designer</p> */}
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <div className="live-preview">
                                                <div className="d-flex flex-column gap-2">
                                                    <Button color="info" className="btn-animation" data-text="Cetak Label Pasien"> <span>Registrasi</span> </Button>
                                                    <Button color="info" className="btn-animation" data-text="Cetak Label Pasien"> <span>Pengkajian Medis</span> </Button>
                                                </div>
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
                                                    <Button onClick={()=>{navigate(`/gawatdarurat/input-pasien-triage`) }} color='info'>+</Button></Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                                <Row className="row-cols-xxl-12 row-cols-lg-12 row-cols-1">
                                                    {(data.data || []).map((item, key) => (
                                                        <Col key={key}>
                                                            <Card className="card-animate" onClick={()=>{handleCard(item)}}>
                                                                <CardBody>
                                                                    <Row className="gy-2">
                                                                        <Col xs={1}>
                                                                            <div className="avatar-md flex-shrink-0">
                                                                                <span className={"avatar-title rounded-circle fs-4 bg-soft-info"}>
                                                                                    <h2 className="ff-secondary fw-semibold">
                                                                                        <span className="counter-value" style={{ fontSize: "1.5rem" }}>
                                                                                        </span>
                                                                                    </h2>
                                                                                </span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <div className="flex-grow-1 ms-2">
                                                                                <h5 className="card-title mb-1">{item.nocm ? item.nocm : '-'}</h5>
                                                                                <p className="mb-0">
                                                                                    {item.namapasien && item.namapasien.length > 20
                                                                                        ? `${item.namapasien.substring(0, 20)}...`
                                                                                        : item.namapasien}
                                                                                </p>
                                                                                <p className="text-muted mb-0">{item.umur ? item.umur : '-'}</p>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xs={3}>
                                                                            <div className="flex-grow-1 ms-2">
                                                                                <p className="text-muted mb-0">Tgl. Kedatangan {item.tglinput}</p>
                                                                                <p className="text-muted mb-0">Pembawa Pasien {item.namapj ? item.namapj : '-'}</p>
                                                                                <p className="text-muted mb-0">No Hp {item.nohp ? item.nohp : '-'}</p>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xs={5}>
                                                                            <div className="flex-grow-1 ms-2">
                                                                                <p className="text-muted mb-0">No. Registrasi : {item.noregistrasi ? item.noregistrasi : '-'}</p>
                                                                                <p className="text-muted mb-0">DPJP Pasien : {item.namapj ? item.namapj : '-'}</p>
                                                                                <p className="text-muted mb-0">Keluhan : {item.keluhan ? item.keluhan : '-'}</p>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </div>
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