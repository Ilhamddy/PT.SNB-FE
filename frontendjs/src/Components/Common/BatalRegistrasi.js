import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    Modal, ModalBody, Col, Label, Input, Row, Form,
    Button, FormFeedback, CardBody, Card
} from "reactstrap";
import CustomSelect from "./CustomSelect/CustomSelect";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";
import { saveBatalRegistrasi } from "../../store/actions";
import KontainerFlatpickr from "../KontainerFlatpickr/KontainerFlatpickr";
import ModalApp from "./ModalApp";
import CustomInput from "./CustomInput/CustomInput";



const BatalRegistrasi = ({ show, onSimpanClick,
    onCloseClick,
    tempNorecDp }) => {
    const dispatch = useDispatch();
    const [dateStart, setdateStart] = useState(() => (new Date()).toISOString());
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecdp: tempNorecDp,
            tglbatal: dateStart,
            alasan:'',
            pembatal:''
        },
        validationSchema: Yup.object({
            alasan: Yup.string().required("Alasan wajib diisi"),
            pembatal: Yup.string().required("Pembatal wajib diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(saveBatalRegistrasi(values, '', () => {
                onSimpanClick()
            }));
            resetForm({ values: '' })
        }
    })
    const listPembatal = [
        { label: "Pasien", value: 1 },
        { label: "Petugas", value: 2 }
    ];
    return (
        <ModalApp isOpen={show} toggle={onCloseClick} centered={true}>
            <ModalBody className="py-3 px-5">
                <Row>
                    <Col md={12}>
                        <div>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                                className="gy-4"
                                action="#">
                                <Row>
                                    <Col md={4} className="mt-2"><Label htmlFor="unittujuan" className="form-label">Tanggal Batal</Label></Col>
                                    <Col md={8} className="mb-2">
                                        <KontainerFlatpickr
                                            id="tglbatal"
                                            options={{
                                                enableTime: true,
                                                // mode: "range",
                                                dateFormat: "Y-m-d",
                                                defaultDate: "today"
                                            }}
                                            value={validation.values.tglbatal}
                                            onChange={([newDate]) => {
                                                validation.setFieldValue("tglbatal", newDate.toISOString());
                                            }}
                                            disabled
                                        />
                                    </Col>
                                    <Col md={4} className="mt-2"><Label htmlFor="pembatal" className="form-label">Pembatal</Label></Col>
                                    <Col md={8} className="mb-2">
                                        <CustomSelect
                                            id="pembatal"
                                            name="pembatal"
                                            options={listPembatal}
                                            value={validation.values.pembatal || ""}
                                            className={`input ${validation.errors.pembatal ? "is-invalid" : ""}`}
                                            onChange={value => validation.setFieldValue('pembatal', value?.value)}
                                            invalid={
                                                validation.touched.pembatal && validation.errors.pembatal ? true : false
                                            }
                                        />
                                        {validation.touched.pembatal && validation.errors.pembatal ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.pembatal}</div></FormFeedback>
                                        ) : null}
                                    </Col>
                                    <Col md={4} className="mt-2"><Label htmlFor="pembatal" className="form-label">Alasan Batal</Label></Col>
                                    <Col md={8} className="mt-2">
                                    <CustomInput
                                            id="alasan"
                                            name="alasan"
                                            type="textarea"
                                            placeholder="alasan"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.alasan || ""}
                                            invalid={
                                                validation.touched.alasan && validation.errors.alasan ? true : false
                                            }
                                        />
                                        {validation.touched.alasan && validation.errors.alasan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.alasan}</div></FormFeedback>
                                        ) : null}
                                    </Col>
                                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                        <Button type="submit" color="info" placement="top" id="tooltipTop" >
                                            SIMPAN
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </ModalBody>
        </ModalApp>
    )
}

BatalRegistrasi.propTypes = {
    onCloseClick: PropTypes.func,
    onSimpanClick: PropTypes.func,
    show: PropTypes.any,
};

export default BatalRegistrasi