import React, { useEffect, useState, useCallback }  from 'react';
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardHeader,
    Collapse
} from "reactstrap";
import classnames from "classnames";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Barcode from 'react-barcode';
import withRouter from '../../Components/Common/withRouter';
import { useParams } from "react-router-dom";
import { registrasiNoregistrasiResetForm, registrasiNoregistrasiGet } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

const BuktiPendaftaran3 = (props) => {
    const { noregistrasi } = useParams();
    document.title = "Bukti Pendaftaran test";
    const dispatch = useDispatch();
    useEffect(() => {
        if (noregistrasi) {
            dispatch(registrasiNoregistrasiGet(noregistrasi));
        }
    }, [noregistrasi, dispatch]);

    useEffect(() => {
        return () => {

            dispatch(registrasiNoregistrasiResetForm());
        }
    }, [dispatch])

    const { data, loading, error } = useSelector((state) => ({
        loading: state.Registrasi.registrasiNoregistrasiGet.loading,
        error: state.Registrasi.registrasiNoregistrasiGet.error,
        data: state.Registrasi.registrasiNoregistrasiGet.data
    }));
   
    const [tempData, settempData] = useState("");
    useEffect(() => {
        if (data !== null) {
            settempData(data)
            // console.log(data)
        }
    }, [data, dispatch])

    return (
       
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Invoice Details" pageTitle="Invoices" />
                <Row className="justify-content-center">
                    <Col xxl={9}>
                        <Card id="demo">
                            <Row>
                                <Col lg={12}>
                                    <CardHeader className="border-bottom-dashed p-4">
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <div className="mt-sm-5 mt-4" style={{ textAlign: "center" }}>
                                                    <h6 className="text-muted text-uppercase fw-semibold">Bukti Pendaftaran Pasien</h6>
                                                    <p className="text-muted mb-1" id="address-details">SIMRS SNB</p>
                                                    <hr style={{ border: "2px solid" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Col>
                                <Col lg={12}>
                                    <CardBody className="p-4">
                                        <Row className="g-3">
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">No RM</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">: {tempData.nocm}</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">NoRegistrasi</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">: {tempData.noregistrasi}</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Nama Pasien</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">: {tempData.namapasien}</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Poliklinik Tujuan</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">: {tempData.namaunit}</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Nomor Antrean</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">: {tempData.noantrian}</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Dokter Tujuan</p>
                                            </Col>
                                            <Col lg={6} className="col-6">
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">: {tempData.namadokter}</p>
                                            </Col>
                                        </Row>
                                        {/* <Barcode value={tempData.noregistrasi} />, */}
                                    </CardBody>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
       
    )
}

export default withRouter(BuktiPendaftaran3);