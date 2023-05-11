import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { registrasiSave, registrasiResetForm, registrasiGet } from "../../../store/actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useCallback, useEffect } from "react";
import withRouter from "../../../Components/Common/withRouter";
import { useParams } from "react-router-dom";

const RegistrasiForm = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {loading, newData, error, editData} = useSelector(state => ({
        editData: state.Registrasi.registrasiGet.data,
        newData: state.Registrasi.registrasiSave.newData,
        loading: state.Registrasi.registrasiSave.loading,
        error: state.Registrasi.registrasiSave.error,
        list: state.Registrasi.registrasiList.data,
    }));

    const notifyError = useCallback(() => {
        return toast("Terjadi kesalahan", { position: "top-right", hideProgressBar: false, className: 'bg-danger text-white' });
    }, []);
    const notifySuccess = useCallback(() => {
        return toast("Sukses menyimpan data", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white' });
    }, []);

    useEffect(() => {
        if (error) {
            notifyError();
        }
    }, [error, notifyError]);

    useEffect(() => {
        if (newData !== null) {
            notifySuccess()
        }
    }, [newData, notifySuccess])

    useEffect(() => {
        if (id) {
            dispatch(registrasiGet(id));
        }
    }, [id, dispatch])

    useEffect(() => {
        return () => {
            dispatch(registrasiResetForm());
        }
    }, [dispatch])



    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: editData?.id ?? undefined,
            namapasien: editData?.namapasien ?? "",
            noidentitas: editData?.noidentitas ?? "",
            nobpjs: editData?.nobpjs ?? "",
            nohp: editData?.nohp ?? "",
        },
        validationSchema: Yup.object({
            namapasien: Yup.string().required("Nama pasien wajib diisi"),
            noidentitas: Yup.string().required("Nomor identitas wajib diisi"),
            nobpjs: Yup.string().required("Nomor BPJS wajib diisi"),
            nohp: Yup.string().required("Nomor handphone wajib diisi"),
        }),
        onSubmit: (values) => {
            dispatch(registrasiSave(values, props.router.navigate));
        }
    });

    return (
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Registrasi Pasien Baru" pageTitle="Registrasi Pasien" />
                <Row>
                    <Col lg={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Form Registrasi Pasien Baru</h4>
                            </CardHeader>
                            <CardBody>
                                <Row className="gy-4">
                                    <Form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                        className="gy-4"
                                        action="#">
                                        <Col md={12}>
                                            <div>
                                                <Label htmlFor="namapasien" className="form-label">Nama Pasien</Label>
                                                <Input
                                                    id="namapasien"
                                                    name="namapasien"
                                                    type="text"
                                                    placeholder="Masukkan nama pasien"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.namapasien || ""}
                                                    invalid={
                                                        validation.touched.namapasien && validation.errors.namapasien ? true : false
                                                    }
                                                />
                                                {validation.touched.namapasien && validation.errors.namapasien ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.namapasien}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div>
                                                <Label htmlFor="noidentitas" className="form-label">No. Identitas</Label>
                                                <Input
                                                    id="noidentitas"
                                                    name="noidentitas"
                                                    type="text"
                                                    placeholder="Masukkan no. identitas"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.noidentitas || ""}
                                                    invalid={
                                                        validation.touched.noidentitas && validation.errors.noidentitas ? true : false
                                                    }
                                                />
                                                {validation.touched.noidentitas && validation.errors.noidentitas ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.noidentitas}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div>
                                                <Label htmlFor="nobpjs" className="form-label">No. BPJS</Label>
                                                <Input
                                                    id="nobpjs"
                                                    name="nobpjs"
                                                    type="text"
                                                    placeholder="Masukkan no. BPJS"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.nobpjs || ""}
                                                    invalid={
                                                        validation.touched.nobpjs && validation.errors.nobpjs ? true : false
                                                    }
                                                />
                                                {validation.touched.namapasien && validation.errors.namapasien ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.namapasien}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div>
                                            <Label htmlFor="nohp" className="form-label">No. HP</Label>
                                                <Input
                                                    id="nohp"
                                                    name="nohp"
                                                    type="text"
                                                    placeholder="Masukkan no. hp"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.nohp || ""}
                                                    invalid={
                                                        validation.touched.nohp && validation.errors.nohp ? true : false
                                                    }
                                                />
                                                {validation.touched.nohp && validation.errors.nohp ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.nohp}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div>
                                                <Button type="submit" color="primary" disabled={loading}> Kirim </Button>
                                            </div>
                                        </Col>
                                    </Form>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(RegistrasiForm);