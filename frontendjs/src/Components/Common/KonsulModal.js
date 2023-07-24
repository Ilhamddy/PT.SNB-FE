import PropTypes from "prop-types";
import React from "react";
import {
    Modal, ModalBody, Col, Label, Input, Row, Form,
    Button, FormFeedback
} from "reactstrap";
import CustomSelect from "../../pages/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { konsulSave } from "../../store/actions";

const KonsulModal = ({ show, onSimpanClick, 
    onCloseClick, 
    tempNorecAp, 
    dataUnit, 
    dataDokter }) => {
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success } = useSelector((state) => ({
        newData: state.Emr.konsulSave.newData,
        success: state.Emr.konsulSave.success,
        loading: state.Emr.konsulSave.loading,
    }));
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norecap: editData?.norecap ?? tempNorecAp,
            unittujuan: editData?.unittujuan ?? '',
            doktertujuan: editData?.doktertujuan ?? ''
        },
        validationSchema: Yup.object({
            unittujuan: Yup.string().required("Unit Tujuan wajib diisi"),
            doktertujuan: Yup.string().required("Dokter Tujuan wajib diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(validation.errors)
            dispatch(konsulSave(values, '', () => {
                onSimpanClick()
            }));
            resetForm({ values: '' })
        }
    })
    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true}>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    <lord-icon
                        src="https://cdn.lordicon.com/zganwmkl.json"
                        trigger="loop"
                        colors="outline:#121331,primary:#3a3347,secondary:#646e78"
                        style={{ width: "100px", height: "100px" }}
                    ></lord-icon>

                </div>
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
                                    <Col md={4} className="mb-2"><Label htmlFor="unittujuan" className="form-label">Unit Tujuan</Label></Col>
                                    <Col md={8} className="mb-2">
                                        <CustomSelect
                                            id="unittujuan"
                                            name="unittujuan"
                                            options={dataUnit}
                                            value={validation.values.unittujuan || ""}
                                            className={`input ${validation.errors.unittujuan ? "is-invalid" : ""}`}
                                            onChange={value => validation.setFieldValue('unittujuan', value.value)}
                                            invalid={
                                                validation.touched.unittujuan && validation.errors.unittujuan ? true : false
                                            }
                                        />
                                        {validation.touched.unittujuan && validation.errors.unittujuan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.unittujuan}</div></FormFeedback>
                                        ) : null}
                                    </Col>
                                    <Col md={4} className="mb-2"><Label htmlFor="doktertujuan" className="form-label">Dokter Tujuan</Label></Col>
                                    <Col md={8} className="mb-2">
                                        <CustomSelect
                                            id="doktertujuan"
                                            name="doktertujuan"
                                            options={dataDokter}
                                            value={validation.values.doktertujuan || ""}
                                            className={`input ${validation.errors.doktertujuan ? "is-invalid" : ""}`}
                                            onChange={value => validation.setFieldValue('doktertujuan', value.value)}
                                            invalid={
                                                validation.touched.doktertujuan && validation.errors.doktertujuan ? true : false
                                            }
                                        />
                                        {validation.touched.doktertujuan && validation.errors.doktertujuan ? (
                                            <FormFeedback type="invalid"><div>{validation.errors.doktertujuan}</div></FormFeedback>
                                        ) : null}
                                    </Col>
                                    {/* <Col xxl={12} sm={12}>
                                        <Button type="submit" color="info" className="rounded-pill" placement="top" id="tooltipTop">
                                            SIMPAN
                                        </Button>
                                    </Col> */}
                                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                        <button
                                            type="button"
                                            className="btn w-sm btn-light"
                                            data-bs-dismiss="modal"
                                            onClick={onCloseClick}
                                        >
                                            Tutup
                                        </button>
                                        <Button type="submit" color="info" className="rounded-pill" placement="top" id="tooltipTop" >
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
    );
};

KonsulModal.propTypes = {
    onCloseClick: PropTypes.func,
    onSimpanClick: PropTypes.func,
    show: PropTypes.any,
};

export default KonsulModal;