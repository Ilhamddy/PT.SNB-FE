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
import {
  getIsiOrderPatologi,
  tolakOrderPatologi,
  updateTanggalRencanaPatologi,
  verifikasiPatologi,
} from '../../../store/patologi/patologiSlice'
import patologiAPI from 'sharedjs/src/patologi/patologiAPI'
import { useSelectorRoot } from '../../../store/reducers'
import { createColumns } from '../../../utils/table'
import BtnSpinner from '../../../Components/Common/BtnSpinner'
import { dateTimeLocal, numberLocal } from '../../../utils/format'
import ModalApp from '../../../Components/Common/ModalApp'

const DetailOrderModalPatologi = forwardRef(({ submitSearch }, ref) => {
  const dispatch = useDispatch()
  const { dataIsi, loadingIsi, loadingVerifikasi, loadingTolak } =
    useSelectorRoot((state) => ({
      dataIsi: state.patologiSlice.getIsiOrderPatologi.data.isiOrder,
      loadingIsi: state.patologiSlice.getIsiOrderPatologi.loading,
      loadingVerifikasi: state.patologiSlice.verifikasiPatologi.loading,
      loadingTolak: state.patologiSlice.tolakOrderPatologi.loading,
    }))

  const [dateNow] = useState(() => new Date().toISOString())
  const vEdit = useFormik({
    initialValues: patologiAPI.bUpdateTanggalRencanaPatologi(dateNow),
    validationSchema: validationEdit(),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        updateTanggalRencanaPatologi(values, () => {
          resetForm()
          dispatch(
            getIsiOrderPatologi({
              ...patologiAPI.qGetIsiOrderPatologi(),
              norec: vVerif.values.norec,
            })
          )
        })
      )
    },
  })

  const vVerif = useFormik({
    initialValues: patologiAPI.bVerifikasiPatologi(dateNow),
    validationSchema: Yup.object({
      norec: Yup.string().required('Norec verif harus ada'),
      listorder: Yup.array()
        .min(1, 'Minimal 1 list order')
        .of(validationEdit()),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        verifikasiPatologi(values, () => {
          resetForm()
          vEdit.resetForm()
          submitSearch()
        })
      )
    },
  })

  const vTolak = useFormik({
    initialValues: patologiAPI.bTolakOrderPatologi(),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        tolakOrderPatologi(values, () => {
          resetForm()
          vVerif.resetForm()
          submitSearch()
        })
      )
    },
  })

  const vDeleteIsi = useFormik({
    initialValues: {
      norec: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(
        deleteDetailOrderPelayanan(values, () => {
          resetForm()
          dispatch(
            getIsiOrderPatologi({
              ...patologiAPI.qGetIsiOrderPatologi(),
              norec: vEdit.values.norec,
            })
          )
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

  const onClickDelete = (data) => {
    vDeleteIsi.setFieldValue('norec', data.norec)
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
    if (vVerif.values.norec) {
      dispatch(
        getIsiOrderPatologi({
          ...patologiAPI.qGetIsiOrderPatologi(),
          norec: vVerif.values.norec,
        })
      )
      dispatch(listKamarRadiologiGet())
    }
  }, [dispatch, vVerif.values.norec])

  useEffect(() => {
    const setFF = vVerif.setFieldValue
    setFF('listorder', dataIsi)
  }, [dispatch, dataIsi, vVerif.setFieldValue])

  const columns = createColumns([
    {
      name: <span className="font-weight-bold fs-13">Tgl Order</span>,
      selector: (row) => dateTimeLocal(row.tglinput),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pemeriksaan</span>,
      sortable: true,
      cell: (data) => {
        return (
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
      selector: (row) => numberLocal(row.harga),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Qty</span>,
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      selector: (row) => numberLocal(row.total),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pegawai Verif</span>,
      selector: (row) => row.pegawaiverif,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Rencana Tindakan</span>,
      selector: (row) => dateTimeLocal(row.tglperjanjian),
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
  ])

  return (
    <>
      <DeleteModalCustom
        isOpen={!!vTolak.values.norec}
        onDeleteClick={vTolak.handleSubmit}
        toggle={vTolak.resetForm}
        msgHDelete="Apa Kamu Yakin?"
        msgBDelete="Yakin ingin menolak Order Ini?"
        buttonHapus="Tolak"
        loading={loadingTolak}
      />
      <DeleteModalCustom
        isOpen={!!vDeleteIsi.values.norec}
        onDeleteClick={vDeleteIsi.handleSubmit}
        toggle={vDeleteIsi.resetForm}
        msgHDelete="Apa Kamu Yakin?"
        msgBDelete="Yakin ingin menghapus Order Ini?"
        buttonHapus="Hapus"
      />
      <ModalApp
        isOpen={
          !!vVerif.values.norec &&
          !vTolak.values.norec &&
          !vDeleteIsi.values.norec
        }
        toggle={handleClose}
        centered={true}
        size="xl"
      >
        <ModalBody className="py-12 px-12">
          <Row>
            <Col md={12}>
              <div>
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
                            enableTime: true,
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
                            type="button"
                            className="mt-2"
                            color="info"
                            placement="top"
                            onClick={vEdit.handleSubmit}
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
                            data={vVerif.values.listorder}
                            progressPending={loadingIsi}
                            customStyles={tableCustomStyles}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <BtnSpinner
                      type="button"
                      color="success"
                      placement="top"
                      id="tooltipTop"
                      onClick={(e) => {
                        vVerif.handleSubmit(e)
                      }}
                      loading={loadingVerifikasi}
                    >
                      Verifikasi
                    </BtnSpinner>
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
              </div>
            </Col>
          </Row>
        </ModalBody>
      </ModalApp>
    </>
  )
})

const validationEdit = () =>
  Yup.object({
    namatindakan: Yup.string().required('Nama Tindakan wajib diisi'),
  })

DetailOrderModalPatologi.displayName = 'DetailOrderModal'

export default DetailOrderModalPatologi
