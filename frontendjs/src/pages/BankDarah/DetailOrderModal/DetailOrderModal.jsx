import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Card, CardBody, CardHeader, Modal, ModalBody, Col, Label, Input, Row, Form,
  Button, FormFeedback, DropdownToggle, UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap";
import CustomSelect from "../../Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import DataTable from 'react-data-table-component';

const DetailOrderModal = ({ show, onSimpanClick, onCloseClick, onTolakClick, tempNorec }) => {
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      norec: tempNorec,
      namatindakan: '',
      norecselected: '',
      tglinput: '',
    },
    validationSchema: Yup.object({
      namatindakan: Yup.string().required("Nama Tindakan wajib diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(validation.errors)
      // dispatch(updateTglRencanaRadiologi(values,''));
      resetForm({ values: '' })
    }
  })

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true} size="xl">
      <ModalBody className="py-12 px-12">
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

              </Form>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}
DetailOrderModal.propTypes = {
  onCloseClick: PropTypes.func,
  onSimpanClick: PropTypes.func,
  show: PropTypes.any,
  onTolakClick: PropTypes.func,
};

export default DetailOrderModal;