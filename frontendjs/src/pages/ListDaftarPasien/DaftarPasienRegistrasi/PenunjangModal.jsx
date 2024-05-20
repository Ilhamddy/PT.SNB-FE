import PropTypes from 'prop-types'
import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import {
  Modal,
  ModalBody,
  Col,
  Label,
  Input,
  Row,
  Form,
  Button,
  FormFeedback,
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import ColLabelInput2 from '../../../Components/ColLabelInput2/ColLabelInput2'
import registrasiAPI from 'sharedjs/src/registrasi/registrasiAPI'
import { getComboPenunjangModal } from '../../../store/registrasi/registrasiSlice'
import { useSelectorRoot } from '../../../store/reducers'
import { upsertAntreanPenunjang } from '../../../store/emr/emrSlice'
import BtnSpinner from '../../../Components/Common/BtnSpinner'

const rawatInap = 2

const PenunjangModal = forwardRef((_, ref) => {
  const dispatch = useDispatch()
  const { comboPenunjangModal } = useSelectorRoot((state) => ({
    comboPenunjangModal: state.registrasiSlice.getComboPenunjangModal.data,
  }))
  const loadingUpsert = useSelectorRoot(
    (state) => state.emrSlice.upsertAntreanPenunjang.loading
  )
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: { ...registrasiAPI.bUpsertPenunjangModal },
    validationSchema: Yup.object({
      norecdp: Yup.string().nullable().required('norecdp diperlukan'),
      instalasiTujuan: Yup.number()
        .nullable()
        .required('Instalasi perlu diisi'),
      unitTujuan: Yup.number().nullable().required('Instalasi perlu diisi'),
      kelasTujuan: Yup.number()
        .nullable()
        .when('instalasiTujuan', {
          is: (val) => val === rawatInap,
          then: () => Yup.number().nullable().required(),
        }),
      dokter: Yup.number().nullable().required('Dokter perlu diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        upsertAntreanPenunjang(values, () => {
          resetForm()
        })
      )
    },
  })

  const changeDp = (norecdp) => {
    validation.setFieldValue('norecdp', norecdp)
  }

  const handleClose = () => {
    validation.resetForm()
  }

  useImperativeHandle(ref, () => ({
    changeDp,
  }))

  useEffect(() => {
    dispatch(getComboPenunjangModal())
  }, [dispatch])
  return (
    <Modal
      isOpen={!!validation.values.norecdp}
      toggle={handleClose}
      centered={true}
    >
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/zganwmkl.json"
            trigger="loop"
            colors="outline:#121331,primary:#3a3347,secondary:#646e78"
            style={{ width: '100px', height: '100px' }}
          ></lord-icon>
        </div>
        <Row>
          <Col md={12}>
            <div>
              <Form
                onSubmit={(e) => {
                  e.preventDefault()
                  validation.handleSubmit(e)
                  return false
                }}
                className="gy-4"
                action="#"
              >
                <Row>
                  <ColLabelInput2 lg={12} label="Instalasi Tujuan">
                    <CustomSelect
                      id="instalasiTujuan"
                      name="instalasiTujuan"
                      options={comboPenunjangModal.instalasi}
                      onChange={(e) => {
                        validation.setFieldValue(
                          'instalasiTujuan',
                          e?.value || ''
                        )
                      }}
                      value={validation.values.instalasiTujuan}
                      onBlur={validation.handleBlur}
                      className={`input row-header ${
                        !!validation?.errors.instalasiTujuan ? 'is-invalid' : ''
                      }`}
                      isClearEmpty
                    />
                    {validation.touched.instalasiTujuan &&
                      !!validation.errors.instalasiTujuan && (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.instalasiTujuan}</div>
                        </FormFeedback>
                      )}
                  </ColLabelInput2>
                  <ColLabelInput2 lg={12} label="Unit Tujuan">
                    <CustomSelect
                      id="unitTujuan"
                      name="unitTujuan"
                      options={comboPenunjangModal.unit.filter(
                        (f) =>
                          f.objectinstalasifk ===
                          validation.values.instalasiTujuan
                      )}
                      onChange={(e) => {
                        validation.setFieldValue('unitTujuan', e?.value || '')
                      }}
                      value={validation.values.unitTujuan}
                      onBlur={validation.handleBlur}
                      className={`input row-header ${
                        !!validation?.errors.unitTujuan ? 'is-invalid' : ''
                      }`}
                      isClearEmpty
                    />
                    {validation.touched.unitTujuan &&
                      !!validation.errors.unitTujuan && (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.unitTujuan}</div>
                        </FormFeedback>
                      )}
                  </ColLabelInput2>
                  {validation.values.instalasiTujuan === 2 && (
                    <ColLabelInput2 lg={12} label="Kelas">
                      <CustomSelect
                        id="kelasTujuan"
                        name="kelasTujuan"
                        options={comboPenunjangModal.kelas}
                        onChange={(e) => {
                          validation.setFieldValue(
                            'kelasTujuan',
                            e?.value || ''
                          )
                        }}
                        value={validation.values.kelasTujuan}
                        onBlur={validation.handleBlur}
                        className={`input row-header ${
                          !!validation?.errors.kelasTujuan ? 'is-invalid' : ''
                        }`}
                        isClearEmpty
                      />
                      {validation.touched.kelasTujuan &&
                        !!validation.errors.kelasTujuan && (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.kelasTujuan}</div>
                          </FormFeedback>
                        )}
                    </ColLabelInput2>
                  )}
                  <ColLabelInput2 lg={12} label="Dokter">
                    <CustomSelect
                      id="dokter"
                      name="dokter"
                      options={comboPenunjangModal.dokter.filter(
                        (f) => f.unit === validation.values.unitTujuan
                      )}
                      onChange={(e) => {
                        validation.setFieldValue('dokter', e?.value || '')
                      }}
                      value={validation.values.dokter}
                      onBlur={validation.handleBlur}
                      className={`input row-header ${
                        !!validation?.errors.dokter ? 'is-invalid' : ''
                      }`}
                      isClearEmpty
                    />
                    {validation.touched.dokter &&
                      !!validation.errors.dokter && (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.dokter}</div>
                        </FormFeedback>
                      )}
                  </ColLabelInput2>
                  <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button
                      type="button"
                      className="btn w-sm btn-light"
                      data-bs-dismiss="modal"
                      onClick={handleClose}
                    >
                      Tutup
                    </button>
                    <BtnSpinner
                      type="submit"
                      color="success"
                      placement="top"
                      id="tooltipTop"
                      loading={loadingUpsert}
                    >
                      SIMPAN
                    </BtnSpinner>
                  </div>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
})

PenunjangModal.displayName = 'PenunjangModal'

export default PenunjangModal
