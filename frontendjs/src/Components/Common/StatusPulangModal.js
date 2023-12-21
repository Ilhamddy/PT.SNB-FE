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
import { updateStatusPulangRJ, upsertEncounterPulang } from "../../store/actions";

const StatusPulangModal = ({ show, onSimpanClick, onCloseClick, tempNorecDp,tempNorecAp, dataStatusPulang }) => {
    const dispatch = useDispatch();
    const { editData, newData, loading, error, success } = useSelector((state) => ({
        newData: state.Emr.updateStatusPulangRJ.newData,
        success: state.Emr.updateStatusPulangRJ.success,
        loading: state.Emr.updateStatusPulangRJ.loading,
    }));
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            norec: editData?.norec ?? tempNorecDp,
            norecta:editData?.norecta ?? tempNorecAp,
            statuspulang: editData?.statuspulang ?? ''
        },
        validationSchema: Yup.object({
            statuspulang: Yup.string().required("Status Pulang wajib diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(validation.errors)
            dispatch(updateStatusPulangRJ(values, ''));
            dispatch(
                upsertEncounterPulang(values, () => {
                    // resetForm()
                })
              )
            resetForm()
        }
    })
    return(
        <Modal isOpen={show} toggle={onCloseClick} centered={true}>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    <lord-icon
                        src="https://cdn.lordicon.com/twopqjaj.json"
                        trigger="loop"
                        colors="primary:#121331,secondary:#ebe6ef,tertiary:#f9c9c0,quaternary:#f24c00,quinary:#3a3347,senary:#b26836,septenary:#2ca58d"
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
                                    <Col md={4} className="mb-2"><Label htmlFor="statuspulang" className="form-label">Status Pulang</Label></Col>
                                    <Col md={8} className="mb-2">
                                         <CustomSelect
                                            id="statuspulang"
                                            name="statuspulang"
                                            options={dataStatusPulang}
                                            value={validation.values?.statuspulang}
                                            onChange={(val) => {
                                            validation.setFieldValue('statuspulang', val?.value || '')
                                            }}
                                            isClearEmpty
                                            className={`input 
                                                            ${validation.errors?.statuspulang ? 'is-invalid' : ''}`}
                                        />
                                        {validation.touched?.statuspulang && !!validation.errors?.statuspulang && (
                                            <FormFeedback type="invalid">
                                            <div>{validation.errors?.statuspulang}</div>
                                            </FormFeedback>
                                        )}
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
                                        <Button type="submit" color="success" placement="top" id="tooltipTop" >
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

StatusPulangModal.propTypes = {
    onCloseClick: PropTypes.func,
    onSimpanClick: PropTypes.func,
    show: PropTypes.any,
};

export default StatusPulangModal;