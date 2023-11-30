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
import { saveMergeNoRegistrasi } from "../../store/actions";
import KontainerFlatpickr from "../KontainerFlatpickr/KontainerFlatpickr";



const MergeNoRegistrasi = ({ show, onSimpanClick,
  onCloseClick,
  tempNorecDp }) => {
  const dispatch = useDispatch();
  const [dateStart, setdateStart] = useState(() => (new Date()).toISOString());
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      noregistrasiAwal: tempNorecDp,
      tglbatal: dateStart,
      alasan: '',
      noregistrasiTujuan: '',
      password: ''
    },
    validationSchema: Yup.object({
      alasan: Yup.string().required("Alasan wajib diisi"),
      noregistrasiTujuan: Yup.string().required("No. Registrasi Tujuan wajib diisi"),
      password: Yup.string().required("Password wajib diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        saveMergeNoRegistrasi(values, () => {

        })
      )
    }
  })
  console.log(validation.errors)
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
                  <Col md={4} className="mt-2"><Label htmlFor="unittujuan" className="form-label">No. Registrasi Salah</Label></Col>
                  <Col md={8} className="mb-2">
                    <Input
                      id="noregistrasiAwal"
                      name="noregistrasiAwal"
                      type="text"
                      value={tempNorecDp}
                      onChange={(e) => {
                        validation.setFieldValue('noregistrasiAwal', e.target.value)
                      }}
                      invalid={validation.touched?.noregistrasiAwal &&
                        !!validation.errors?.noregistrasiAwal}
                      disabled
                    />
                    {validation.touched?.noregistrasiAwal
                      && !!validation.errors.noregistrasiAwal && (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.noregistrasiAwal}</div>
                        </FormFeedback>
                      )}
                  </Col>
                  <Col md={4} className="mt-2"><Label htmlFor="pembatal" className="form-label">No. Registrasi Tujuan</Label></Col>
                  <Col md={8} className="mb-2">
                    <Input
                      id="noregistrasiTujuan"
                      name="noregistrasiTujuan"
                      type="text"
                      value={validation.values.noregistrasiTujuan}
                      onChange={(e) => {
                        validation.setFieldValue('noregistrasiTujuan', e.target.value)
                      }}
                      invalid={validation.touched?.noregistrasiTujuan &&
                        !!validation.errors?.noregistrasiTujuan}

                      placeholder="Masukan No. Registrasi Tujuan"
                    />
                    {validation.touched?.noregistrasiTujuan
                      && !!validation.errors.noregistrasiTujuan && (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.noregistrasiTujuan}</div>
                        </FormFeedback>
                      )}
                  </Col>
                  <Col md={4} className="mt-2"><Label htmlFor="pembatal" className="form-label">Alasan</Label></Col>
                  <Col md={8} className="mb-2">
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
                  <Col md={4} className="mt-2"><Label htmlFor="pembatal" className="form-label">Password</Label></Col>
                  <Col md={8} className="mt-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={validation.values.password}
                      onChange={(e) => {
                        validation.setFieldValue('password', e.target.value)
                      }}
                      invalid={validation.touched?.password &&
                        !!validation.errors?.password}
                    />
                    {validation.touched?.password
                      && !!validation.errors.password && (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.password}</div>
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

MergeNoRegistrasi.propTypes = {
  onCloseClick: PropTypes.func,
  onSimpanClick: PropTypes.func,
  show: PropTypes.any,
};

export default MergeNoRegistrasi