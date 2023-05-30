import React, { useEffect, useState, useCallback } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Nav, NavItem,
    NavLink, TabContent, TabPane, Button, Label, Input, Table,
    FormFeedback, Form
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useNavigate } from "react-router-dom";
import { emrHeaderGet, emrResetForm } from "../../../store/actions";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";

const TandaVital = () => {
    const { norecdp, norecap } = useParams();
    const dispatch = useDispatch();
    const { editData } = useSelector((state) => ({


    }));
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? norecap,
            tinggibadan: editData?.tinggibadan ?? '',
            suhu: editData?.suhu ?? '',
            gcse: editData?.gcse ?? '',
            gcsm: editData?.gcsm ?? '',
            gcsv: editData?.gcsv ?? '',
            beratbadan: editData?.beratbadan ?? '',
            nadi: editData?.nadi ?? '',
            alergi: editData?.alergi ?? '',
            tekanandarah: editData?.tekanandarah ?? '',
            spo2: editData?.spo2 ?? '',
            pernapasan: editData?.pernapasan ?? '',
            keadaanumum: editData?.keadaanumum ?? '',
        },
        validationSchema: Yup.object({
            tinggibadan: Yup.string().required("Tinggi Badan wajib diisi"),
            suhu: Yup.string().required("Suhu wajib diisi"),
            gcse: Yup.string().required("E wajib diisi"),
            gcsm: Yup.string().required("M wajib diisi"),
            gcsv: Yup.string().required("V wajib diisi"),
            beratbadan: Yup.string().required("Berat Badan wajib diisi"),
            nadi: Yup.string().required("Nadi wajib diisi"),
            alergi: Yup.string().required("Alergi wajib diisi"),
            tekanandarah: Yup.string().required("Tekanan Darah wajib diisi"),
            spo2: Yup.string().required("SpO2 wajib diisi"),
            pernapasan: Yup.string().required("Pernapasan wajib diisi"),
            keadaanumum: Yup.string().required("Keadaan Umum wajib diisi"),
            // aCheckbox: Yup.boolean('Select this checkbox please'),
            // keadaanumum: Yup.string().when("aCheckbox", {
            //     is: (aCheckbox) => aCheckbox === true,
            //     then: Yup.string().required('I am required now the checkbox is checked')
            // })
        }),
        onSubmit: (values) => {
            console.log(validation.errors)
            // dispatch(registrasiSaveRuangan(values, ''));
        }
    })
    console.log(validation.errors)
    return (
        <React.Fragment>
            <Row className="gy-4">
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    className="gy-4"
                    action="#">
                    <Row>

                        <Col xxl={3} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tinggibadan" className="form-label fw-semibold">Tinggi Badan(cm)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="tinggibadan"
                                            name="tinggibadan"
                                            type="number"
                                            placeholder="Tinggi Badan pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.tinggibadan || ""}
                                            invalid={
                                                validation.touched.tinggibadan && validation.errors.tinggibadan ? true : false
                                            }
                                        />
                                        {validation.touched.tinggibadan && validation.errors.tinggibadan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.tinggibadan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="suhu" className="form-label fw-semibold">Suhu(°C)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="suhu"
                                            name="suhu"
                                            type="number"
                                            placeholder="Suhu Badan pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.suhu || ""}
                                            invalid={
                                                validation.touched.suhu && validation.errors.suhu ? true : false
                                            }
                                        />
                                        {validation.touched.suhu && validation.errors.suhu ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.suhu}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="gcs" className="form-label fw-semibold">GCS(EMV)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <Row>
                                        <Col lg={4} sm={6}>
                                            <div>
                                                <Input
                                                    id="gcse"
                                                    name="gcse"
                                                    type="number"
                                                    placeholder="E"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.gcse || ""}
                                                    invalid={
                                                        validation.touched.gcse && validation.errors.gcse ? true : false
                                                    }
                                                />
                                                {validation.touched.gcse && validation.errors.gcse ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.gcse}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6}>
                                            <div>
                                                <Input
                                                    id="gcsm"
                                                    name="gcsm"
                                                    type="number"
                                                    placeholder="M"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.gcsm || ""}
                                                    invalid={
                                                        validation.touched.gcsm && validation.errors.gcsm ? true : false
                                                    }
                                                />
                                                {validation.touched.gcsm && validation.errors.gcsm ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.gcsm}</div></FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6}>
                                            <div>
                                                <Input
                                                    id="gcsv"
                                                    name="gcsv"
                                                    type="number"
                                                    placeholder="V"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.gcsv || ""}
                                                    invalid={
                                                        validation.touched.gcsv && validation.errors.gcsv ? true : false
                                                    }
                                                />
                                                {validation.touched.gcsv && validation.errors.gcsv ? (
                                                    <FormFeedback type="invalid"><div>{validation.errors.gcsv}</div></FormFeedback>
                                                ) : null}

                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={3} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="beratbadan" className="form-label fw-semibold">Berat Badan(cm)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="beratbadan"
                                            name="beratbadan"
                                            type="number"
                                            placeholder="Berat Badan pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.beratbadan || ""}
                                            invalid={
                                                validation.touched.beratbadan && validation.errors.beratbadan ? true : false
                                            }
                                        />
                                        {validation.touched.beratbadan && validation.errors.beratbadan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.beratbadan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="nadi" className="form-label fw-semibold">Nadi (X/menit)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="nadi"
                                            name="nadi"
                                            type="number"
                                            placeholder="Nadi pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.nadi || ""}
                                            invalid={
                                                validation.touched.nadi && validation.errors.nadi ? true : false
                                            }
                                        />
                                        {validation.touched.nadi && validation.errors.nadi ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.nadi}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="alergi" className="form-label fw-semibold">Alergi</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="alergi"
                                            name="alergi"
                                            type="input"
                                            placeholder="Alergi"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.alergi || ""}
                                            invalid={
                                                validation.touched.alergi && validation.errors.alergi ? true : false
                                            }
                                        />
                                        {validation.touched.alergi && validation.errors.alergi ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.alergi}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={3} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="tekanandarah" className="form-label fw-semibold">Tekanan Darah(mmhg)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="tekanandarah"
                                            name="tekanandarah"
                                            type="number"
                                            placeholder="Tekanan Darah"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.tekanandarah || ""}
                                            invalid={
                                                validation.touched.tekanandarah && validation.errors.tekanandarah ? true : false
                                            }
                                        />
                                        {validation.touched.tekanandarah && validation.errors.tekanandarah ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.tekanandarah}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="spo2" className="form-label fw-semibold">SpO2(%)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="spo2"
                                            name="spo2"
                                            type="number"
                                            placeholder="Masukan SpO2"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.spo2 || ""}
                                            invalid={
                                                validation.touched.spo2 && validation.errors.spo2 ? true : false
                                            }
                                        />
                                        {validation.touched.spo2 && validation.errors.spo2 ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.spo2}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={3} sm={6}>
                            <Row>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="pernapasan" className="form-label fw-semibold">Pernapasan (X/menit)</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="pernapasan"
                                            name="pernapasan"
                                            type="number"
                                            placeholder="Pernapasan pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.pernapasan || ""}
                                            invalid={
                                                validation.touched.pernapasan && validation.errors.pernapasan ? true : false
                                            }
                                        />
                                        {validation.touched.pernapasan && validation.errors.pernapasan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.pernapasan}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="keadaanumum" className="form-label fw-semibold">Keadaan Umum</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="keadaanumum"
                                            name="keadaanumum"
                                            type="textarea"
                                            placeholder="Keadaan Umum Pasien"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.keadaanumum || ""}
                                            invalid={
                                                validation.touched.keadaanumum && validation.errors.keadaanumum ? true : false
                                            }
                                        />
                                        {validation.touched.keadaanumum && validation.errors.keadaanumum ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.keadaanumum}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col>
                                {/* <Col lg={6} sm={6}>
                                    <div className="mt-2">
                                        <Label style={{ color: "black" }} htmlFor="aCheckbox" className="form-label fw-semibold">Checkbox</Label>
                                    </div>
                                </Col>
                                <Col lg={6} sm={6} className="mt-1">
                                    <div>
                                        <Input
                                            id="aCheckbox"
                                            name="aCheckbox"
                                            type="checkbox"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.aCheckbox || ""}
                                            invalid={
                                                validation.touched.aCheckbox && validation.errors.aCheckbox ? true : false
                                            }
                                        />
                                        {validation.touched.aCheckbox && validation.errors.aCheckbox ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.aCheckbox}</div></FormFeedback>
                                        ) : null}
                                    </div>
                                </Col> */}
                            </Row>
                        </Col>
                        <Col xxl={12} sm={12}>
                            <Button type="submit" color="info" className="rounded-pill"> SIMPAN </Button>
                            <Button type="button" color="danger" className="rounded-pill" > BATAL </Button>
                        </Col>

                    </Row>
                </Form>
            </Row>
        </React.Fragment>
    )
}

export default (TandaVital)