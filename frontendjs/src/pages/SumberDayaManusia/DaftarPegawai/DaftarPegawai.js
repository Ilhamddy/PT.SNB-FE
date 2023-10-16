import React, { useEffect, useState } from "react"
import withRouter from "../../../Components/Common/withRouter"
import { ToastContainer } from "react-toastify";
import UiContent from "../../../Components/Common/UiContent";
import { Button, Card, CardHeader, Col, Container, Form, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";

const DaftarPegawai = () => {
    document.title = "Daftar Pegawai";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const vSetValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            unitOrder: '',
            search: ''
        },
        validationSchema: Yup.object({
            // tingkatdarurat: Yup.string().required("Tingkat Darurat jawab wajib diisi"),
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })
    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Daftar Pegawai" pageTitle="Forms" />
                    <Row>
                        <Col lg={3}>
                            <Card>

                            </Card>
                        </Col>
                        <Col lg={9}>
                            <Card>
                                <CardHeader>
                                    <Form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            vSetValidation.handleSubmit();
                                            return false;
                                        }}
                                        className="gy-4"
                                        action="#">
 <Row className="gy-4">
 <Col lg={1}>
                                                    <Button type="submit" color="info" placement="top">
                                                        Tambah Pegawai
                                                    </Button>
                                                </Col>
 </Row>
                                    </Form>
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default withRouter(DaftarPegawai)