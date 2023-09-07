import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    Modal, ModalBody, Col, Label, Input, Row, Form,
    Button, FormFeedback, CardBody, Card
} from "reactstrap";
import CustomSelect from "../../pages/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";
import { saveBatalRegistrasi } from "../../store/actions";



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
        <Modal isOpen={show} toggle={onCloseClick} centered={true}>
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
                                        <div className="input-group">
                                            <Flatpickr
                                                id="tglbatal"
                                                className="form-control border-0 fs-5 dash-filter-picker shadow"
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
                                            <div className="input-group-text bg-secondary border-secondary text-white"><i className="ri-calendar-2-line"></i></div>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mt-2"><Label htmlFor="pembatal" className="form-label">Pembatal</Label></Col>
                                    <Col md={8} className="mb-2">
                                        <CustomSelect
                                            id="pembatal"
                                            name="pembatal"
                                            options={listPembatal}
                                            value={validation.values.pembatal || ""}
                                            className={`input ${validation.errors.pembatal ? "is-invalid" : ""}`}
                                            onChange={value => validation.setFieldValue('pembatal', value.value)}
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
                                    <Input
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
                                        <button
                                            type="button"
                                            className="btn w-sm btn-light"
                                            data-bs-dismiss="modal"
                                            onClick={onCloseClick}
                                        >
                                            Tutup
                                        </button>
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
        </Modal>
    )
}

BatalRegistrasi.propTypes = {
    onCloseClick: PropTypes.func,
    onSimpanClick: PropTypes.func,
    show: PropTypes.any,
};

export default BatalRegistrasi