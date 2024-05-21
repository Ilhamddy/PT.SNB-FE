import PropTypes from 'prop-types'
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  Col,
  Label,
  Input,
  Row,
  Form,
  Button,
  FormFeedback,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import Flatpickr from 'react-flatpickr'
import DataTable from 'react-data-table-component'
import {
  listOrderByNorecGet,
  listKamarRadiologiGet,
  updateTglRencanaRadiologi,
  saveVerifikasiRadiologi,
  deleteDetailOrderPelayanan,
  radiologiResetForm,
  deleteOrderPelayanan,
} from '../../../store/actions'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import DeleteModalCustom from '../../../Components/Common/DeleteModalCustom'

const DetailOrderModal = forwardRef(({ submitSearch }, ref) => {
  const dispatch = useDispatch()
  const {
    editData,
    newData,
    loading,
    error,
    success,
    dataOrder,
    loadingOrder,
    successOrder,
    dataKamar,
    loadingKamar,
    successKamar,
    updateVerifikasi,
    loadingVerifikasi,
    successVerifikasi,
    deleteDetail,
    successdeleteDetail,
    loadingdeleteDetail,
  } = useSelector((state) => ({
    newData: state.Radiologi.updateTglRencanaRadiologi.newData,
    success: state.Radiologi.updateTglRencanaRadiologi.success,
    loading: state.Radiologi.updateTglRencanaRadiologi.loading,
    dataOrder: state.Radiologi.listOrderByNorecGet.data,
    loadingOrder: state.Radiologi.listOrderByNorecGet.loading,
    successOrder: state.Radiologi.listOrderByNorecGet.success,
    dataKamar: state.Radiologi.listKamarRadiologiGet.data,
    loadingKamar: state.Radiologi.listKamarRadiologiGet.loading,
    successKamar: state.Radiologi.listKamarRadiologiGet.success,
    updateVerifikasi: state.Radiologi.saveVerifikasiRadiologi.newData,
    successVerifikasi: state.Radiologi.saveVerifikasiRadiologi.success,
    loadingVerifikasi: state.Radiologi.saveVerifikasiRadiologi.loading,
    deleteDetail: state.Radiologi.deleteDetailOrderPelayanan.newData,
    successdeleteDetail: state.Radiologi.deleteDetailOrderPelayanan.success,
    loadingdeleteDetail: state.Radiologi.deleteDetailOrderPelayanan.loading,
  }))

  const [dateNow] = useState(() => new Date().toISOString())
  const vEdit = useFormik({
    initialValues: {
      norec: editData?.norec || '',
      namatindakan: editData?.namatindakan || '',
      norecselected: editData?.norecselected || '',
      nokamar: editData?.nokamar || '',
      tglinput: editData?.tglinput || dateNow,
    },
    validationSchema: Yup.object({
      namatindakan: Yup.string().required('Nama Tindakan wajib diisi'),
      nokamar: Yup.string().required('No Kamar wajib diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        updateTglRencanaRadiologi(values, () => {
          resetForm()
          dispatch(listOrderByNorecGet({ norec: vEdit.values.norec }))
        })
      )
    },
  })

  const vVerif = useFormik({
    initialValues: {
      norec: '',
      tglinput: dateNow,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(
        saveVerifikasiRadiologi(values, () => {
          resetForm()
          vEdit.resetForm()
          submitSearch()
        })
      )
    },
  })

  const vTolak = useFormik({
    initialValues: {
      norec: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(
        deleteOrderPelayanan(values, () => {
          resetForm()
          vVerif.resetForm()
          submitSearch()
        })
      )
    },
  })

  const handlePrepareTolak = () => {
    vTolak.setFieldValue('norec', vVerif.values.norec)
  }
  const handleBeginOnChangeTglInput = (newBeginValue) => {
    let dateString = new Date(newBeginValue).toISOString()
    vVerif.setFieldValue('tglinput', dateString)
    vEdit.setFieldValue('tglinput', dateString)
  }

  const handleClick = (norec) => {
    vEdit.setFieldValue('norecselected', norec.norec)
    vEdit.setFieldValue('namatindakan', norec.namaproduk)
  }

  const onClickDelete = (e) => {
    let tempValue = {
      norec: e.norec,
    }
    dispatch(
      deleteDetailOrderPelayanan(tempValue, () => {
        dispatch(listOrderByNorecGet({ norec: vEdit.values.norec }))
      })
    )
  }

  const setNorecOrder = (norec) => {
    vEdit.setFieldValue('norec', norec)
    vVerif.setFieldValue('norec', norec)
  }
  const handleClose = () => {
    vVerif.resetForm()
    vEdit.resetForm()
  }

  useImperativeHandle(ref, () => ({
    setNorecOrder,
  }))

  useEffect(() => {
    return () => {
      dispatch(radiologiResetForm())
    }
  }, [dispatch])
  useEffect(() => {
    if (vVerif.values.norec) {
      dispatch(listOrderByNorecGet({ norec: vVerif.values.norec }))
      dispatch(listKamarRadiologiGet())
    }
  }, [vVerif.values.norec, dispatch])

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">TGL Order</span>,
      selector: (row) => row.tglinput,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pemeriksaan</span>,
      // selector: row => row.namaproduk,
      sortable: true,
      cell: (data) => {
        return (
          // <Link to={`/registrasi/pasien/${data.id}`}>Details</Link>
          <button
            className="btn btn-sm btn-soft-info"
            onClick={() => handleClick(data)}
          >
            {data.namaproduk}
          </button>
        )
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Harga</span>,
      selector: (row) => row.harga,
      sortable: true,
      // width: "150px"
    },
    {
      name: <span className="font-weight-bold fs-13">Qty</span>,
      selector: (row) => row.qty,
      sortable: true,
      // width: "150px"
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      selector: (row) => row.total,
      sortable: true,
      // width: "250px",
    },
    {
      name: <span className="font-weight-bold fs-13">Pegawai Verif</span>,
      selector: (row) => row.pegawaiverif,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">No Kamar</span>,
      selector: (row) => row.namakamar,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Rencana Tindakan</span>,
      selector: (row) => row.tglinput,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">#</span>,
      sortable: false,
      cell: (data) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            <UncontrolledDropdown className="dropdown d-inline-block">
              <DropdownToggle
                className="btn btn-soft-secondary btn-sm"
                tag="button"
                id="tooltipTop2"
                type="button"
                onClick={() => onClickDelete(data)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </DropdownToggle>
            </UncontrolledDropdown>
            <UncontrolledTooltip placement="top" target="tooltipTop2">
              {' '}
              Delete{' '}
            </UncontrolledTooltip>
          </div>
        )
      },
      width: '50px',
    },
  ]

  return (
    <>
      <DeleteModalCustom
        show={!!vTolak.values.norec}
        onDeleteClick={vTolak.handleSubmit}
        onCloseClick={vTolak.resetForm}
        msgHDelete="Apa Kamu Yakin?"
        msgBDelete="Yakin ingin menolak Order Ini?"
        buttonHapus="Tolak"
      />
      <Modal
        isOpen={!!vVerif.values.norec && !vTolak.values.norec}
        toggle={handleClose}
        centered={true}
        size="xl"
      >
        <ModalBody className="py-12 px-12">
          <Row>
            <Col md={12}>
              <div>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault()
                    vEdit.handleSubmit(e)
                    return false
                  }}
                  className="gy-4"
                  action="#"
                >
                  <Row>
                    <Col lg={5}>
                      <Row>
                        <Col md={4} className="mb-2">
                          <Label htmlFor="namatindakan" className="form-label">
                            Nama Tindakan
                          </Label>
                        </Col>
                        <Col md={8} className="mb-2">
                          <Input
                            id="namatindakan"
                            name="namatindakan"
                            type="text"
                            onChange={vEdit.handleChange}
                            onBlur={vEdit.handleBlur}
                            value={vEdit.values.namatindakan || ''}
                            invalid={
                              vEdit.touched.namatindakan &&
                              vEdit.errors.namatindakan
                                ? true
                                : false
                            }
                            disabled
                          />
                          {vEdit.touched.namatindakan &&
                          vEdit.errors.namatindakan ? (
                            <FormFeedback type="invalid">
                              <div>{vEdit.errors.namatindakan}</div>
                            </FormFeedback>
                          ) : null}
                        </Col>
                        <Col md={4} className="mb-2">
                          <Label htmlFor="nokamar" className="form-label">
                            No Kamar
                          </Label>
                        </Col>
                        <Col md={8} className="mb-2">
                          <CustomSelect
                            id="nokamar"
                            name="nokamar"
                            options={dataKamar}
                            value={vEdit.values.nokamar || ''}
                            className={`input ${
                              vEdit.errors.nokamar ? 'is-invalid' : ''
                            }`}
                            onChange={(value) =>
                              vEdit.setFieldValue('nokamar', value?.value)
                            }
                            invalid={
                              vEdit.touched.nokamar && vEdit.errors.nokamar
                                ? true
                                : false
                            }
                          />
                          {vEdit.touched.nokamar && vEdit.errors.nokamar ? (
                            <FormFeedback type="invalid">
                              <div>{vEdit.errors.nokamar}</div>
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={7}>
                      <Row>
                        <Col lg={4} md={4}>
                          <div className="mt-2">
                            <Label
                              style={{ color: 'black' }}
                              htmlFor="tanggal"
                              className="form-label"
                            >
                              Rencana Tindakan
                            </Label>
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <KontainerFlatpickr
                            options={{
                              dateFormat: 'Y-m-d H:i',
                              defaultDate: 'today',
                            }}
                            value={vVerif.values.tglinput}
                            onChange={([newDate]) => {
                              handleBeginOnChangeTglInput(newDate)
                            }}
                          />
                        </Col>
                        <Col lg={2} md={2}>
                          <div className="form-check ms-2">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id="formCheck1"
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="formCheck1"
                              style={{ color: 'black' }}
                            >
                              Cito
                            </Label>
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className="d-flex flex-wrap gap-2 justify-content-md-start">
                            <Button
                              type="submit"
                              className="mt-2"
                              color="info"
                              placement="top"
                            >
                              Edit
                            </Button>
                            <Button
                              type="button"
                              className="mt-2"
                              color="danger"
                              placement="top"
                            >
                              BATAL
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} className="gy-2">
                      <Card>
                        <CardHeader className="card-header-snb ">
                          <h4
                            className="card-title mb-0"
                            style={{ color: 'black' }}
                          >
                            Daftar Order Tindakan
                          </h4>
                        </CardHeader>
                        <CardBody>
                          <div id="table-gridjs">
                            <DataTable
                              fixedHeader
                              columns={columns}
                              pagination
                              data={dataOrder}
                              progressPending={loadingOrder}
                              customStyles={tableCustomStyles}
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                      <button
                        type="button"
                        className="btn w-sm btn-light"
                        data-bs-dismiss="modal"
                        onClick={vVerif.resetForm}
                      >
                        Tutup
                      </button>

                      <Button
                        type="button"
                        color="success"
                        placement="top"
                        id="tooltipTop"
                        onClick={vVerif.handleSubmit}
                      >
                        SIMPAN
                      </Button>
                      <button
                        type="button"
                        className="btn w-sm btn-danger"
                        data-bs-dismiss="modal"
                        onClick={handlePrepareTolak}
                      >
                        Tolak
                      </button>
                    </div>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
})

DetailOrderModal.displayName = 'DetailOrderModal'

export default DetailOrderModal
