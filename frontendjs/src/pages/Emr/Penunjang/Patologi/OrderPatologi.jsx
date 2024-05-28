import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Label,
  Input,
  Table,
  FormFeedback,
  Form,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  ListGroup,
  ListGroupItem,
  ModalBody,
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux'
import UiContent from '../../../../Components/Common/UiContent'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import Flatpickr from 'react-flatpickr'
import CustomSelect from '../../../../Components/Common/CustomSelect/CustomSelect'
import BreadCrumb from '../../../../Components/Common/BreadCrumb'
import DataTable from 'react-data-table-component'
import {
  comboHistoryUnitGet,
  comboTindakanRadiologiGet,
  radiologiResetForm,
  saveOrderPelayananRadiologi,
  daftarOrderRadiologiGet,
} from '../../../../store/actions'
import LoadingTable from '../../../../Components/Table/LoadingTable'
import {
  dateTimeLocal,
  numberLocal,
  onChangeStrNbr,
  strToNumber,
} from '../../../../utils/format'
import KontainerFlatpicr from '../../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { tableCustomStyles } from '../../../../Components/Table/tableCustomStyles'
import { useSelectorRoot } from '../../../../store/reducers'
import BtnSpinner from '../../../../Components/Common/BtnSpinner'
import { createColumns } from '../../../../utils/table'
import DeleteModalCustom from '../../../../Components/Common/DeleteModalCustom'
import {
  getComboTindakanPatologi,
  getHistoriPatologi,
  getHistoriUnit,
  getTransaksiPelayananPatologiByNorecDp,
  upsertOrderPelayananPatologi,
} from '../../../../store/patologi/patologiSlice'
import patologiAPI from 'sharedjs/src/patologi/patologiAPI'
import ModalApp from '../../../../Components/Common/ModalApp'
import CustomInput from '../../../../Components/Common/CustomInput/CustomInput'

const OrderPatologi = () => {
  const { norecdp, norecap } = useParams()
  const dispatch = useDispatch()

  const {
    dataCombo,
    dataTindakan,
    dataOrder,
    loadingOrder,
    loadingSave,
    loadingHasil,
    dataHasil,
  } = useSelectorRoot((state) => ({
    loadingSave: state.patologiSlice.upsertOrderPelayananPatologi.loading,
    dataCombo: state.patologiSlice.getHistoriUnit.data,
    dataTindakan: state.patologiSlice.getComboTindakanPatologi.data,
    loadingTindakan: state.patologiSlice.getComboTindakanPatologi.loading,
    dataOrder: state.patologiSlice.getHistoriPatologi.data,
    loadingOrder: state.patologiSlice.getHistoriPatologi.loading,
    loadingHasil:
      state.patologiSlice.getTransaksiPelayananPatologiByNorecDp.loading,
    dataHasil: state.patologiSlice.getTransaksiPelayananPatologiByNorecDp.data,
  }))

  const [dateNow] = useState(() => new Date().toISOString())

  const vViewHasil = useFormik({
    initialValues: {
      expertise: null,
    },
  })

  const vSavePatologi = useFormik({
    enableReinitialize: true,
    initialValues: {
      norecap: norecap,
      listtindakan: [],
      keterangan: '',
      objectunitasal: '',
      tglinput: dateNow,
    },
    validationSchema: Yup.object({
      objectunitasal: Yup.string().required('Unit Asal Belum Dipilih'),
      listtindakan: Yup.array().min(1, 'Minimal 1 tindakan'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        upsertOrderPelayananPatologi(values, () => {
          dispatch(
            getHistoriPatologi({
              ...patologiAPI.qGetHistoriPatologi(),
              norecdp: norecdp,
            })
          )
          resetForm()
          vTindakan.resetForm()
        })
      )
    },
  })

  const addId = (list) =>
    list.map((l, i) => {
      l.id = i
      return l
    })

  const vTindakan = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: 0,
      tindakan: '',
      namatindakan: '',
      qty: 1,
      harga: 0,
      total: 0,
    },
    validationSchema: Yup.object({
      tindakan: Yup.string().required('Tindakan Belum Dipilih'),
    }),
    onSubmit: (values, { resetForm }) => {
      let newListTindakan = [...vSavePatologi.values.listtindakan, values]
      newListTindakan = addId(newListTindakan)
      vSavePatologi.setFieldValue('listtindakan', newListTindakan)
      resetForm()
    },
  })

  const vDelete = useFormik({
    enableReinitialize: true,
    initialValues: {
      iddelete: -1,
    },
    onSubmit: (values, { resetForm }) => {
      let newListTindakan = [...vSavePatologi.values.listtindakan]
      newListTindakan.splice(values.iddelete, 1)
      newListTindakan = addId(newListTindakan)
      vSavePatologi.setFieldValue('listtindakan', newListTindakan)
      resetForm()
    },
  })

  const onClickCount = (temp) => {
    let newQty = vTindakan.values.qty
    let harga = vTindakan.values.harga
    if (temp === 'min') {
      if (newQty > 0) {
        newQty -= 1
      }
    } else {
      newQty += 1
    }
    vTindakan.setFieldValue('qty', newQty)
    vTindakan.setFieldValue('total', newQty * harga)
  }

  const handleTindakanSelcted = (selected) => {
    vTindakan.setFieldValue('tindakan', selected?.value || '')
    vTindakan.setFieldValue('namatindakan', selected?.label || '')
    vTindakan.setFieldValue('harga', selected?.totalharga || 0)
    vTindakan.setFieldValue(
      'total',
      (selected?.totalharga || 0) * vTindakan.values.qty
    )
  }

  const onClickTambah = () => {
    vTindakan.handleSubmit()
  }
  const onClickSimpan = () => {
    vSavePatologi.handleSubmit()
    // console.log(searches)
  }
  const onClickDelete = (iddelete) => {
    vDelete.setFieldValue('iddelete', iddelete)
  }
  useEffect(() => {
    if (norecdp) {
      dispatch(
        getComboTindakanPatologi({
          objectkelasfk: 8,
          objectunitfk: 30,
          namaproduk: '',
        })
      )
      dispatch(getHistoriUnit(norecdp))
      dispatch(
        getHistoriPatologi({
          ...patologiAPI.qGetHistoriPatologi(),
          norecdp: norecdp,
        })
      )
      dispatch(
        getTransaksiPelayananPatologiByNorecDp({
          ...patologiAPI.qGetTransaksiPelayananPatologiByNorecDp(),
          norecdp: norecdp,
        })
      )
    }
  }, [norecdp, dispatch])
  useEffect(() => {
    return () => {
      dispatch(radiologiResetForm())
    }
  }, [dispatch])
  useEffect(() => {}, [norecap])
  const columns = createColumns([
    {
      name: <span className="font-weight-bold fs-13">Pemeriksaan</span>,
      selector: (row) => row.namatindakan,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Harga</span>,
      selector: (row) => numberLocal(row.harga),
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
      selector: (row) => numberLocal(row.total),
      sortable: true,
      // width: "250px",
    },
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      sortable: false,
      cell: (data) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            <UncontrolledDropdown className="dropdown d-inline-block">
              <DropdownToggle
                className="btn btn-soft-secondary btn-sm"
                tag="button"
                id="tooltip-delete"
                type="button"
                onClick={() => onClickDelete(data.id)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </DropdownToggle>
            </UncontrolledDropdown>
            <UncontrolledTooltip placement="top" target="tooltip-delete">
              {' '}
              Delete{' '}
            </UncontrolledTooltip>
          </div>
        )
      },
      width: '50px',
    },
  ])
  const columnsRiwayat = createColumns([
    {
      name: <span className="font-weight-bold fs-13">Tgl. Order</span>,
      selector: (row) => dateTimeLocal(row.tglinput),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. Order</span>,
      selector: (row) => row.nomororder,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Dokter Order</span>,
      selector: (row) => row.namalengkap,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      selector: (row) => row.namaunit,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Produk</span>,
      selector: (row) => row.namaproduk,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Keterangan</span>,
      selector: (row) => row.keterangan,
      sortable: true,
      // width: "250px",
    },
  ])

  const columnsHasil = createColumns([
    {
      name: <span className="font-weight-bold fs-13">Tgl. Order</span>,
      selector: (row) => dateTimeLocal(row.tglinput),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No. Order</span>,
      selector: (row) => row.nomororder,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Dokter Order</span>,
      selector: (row) => row.pegawaipengirim,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Unit</span>,
      selector: (row) => row.unitpengirim,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Produk</span>,
      selector: (row) => row.namaproduk,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Hasil</span>,
      cell: (row) => (
        <div
          style={{ maxHeight: 20, overflow: 'hidden' }}
          dangerouslySetInnerHTML={{
            __html: row.expertise ? row.expertise : '',
          }}
        ></div>
      ),
      wrap: false,
    },
  ])
  return (
    <React.Fragment>
      <DeleteModalCustom
        isOpen={vDelete.values.iddelete >= 0}
        onDeleteClick={vDelete.handleSubmit}
        toggle={() => vDelete.resetForm()}
        msgHDelete="Hapus "
        msgBDelete="Yakin hapus tindakan ini"
      />
      <ModalApp
        isOpen={!!vViewHasil.values.expertise}
        toggle={vViewHasil.resetForm}
      >
        <ModalBody className="px-5 py-5">
          <div
            dangerouslySetInnerHTML={{
              __html: vViewHasil.values.expertise
                ? vViewHasil.values.expertise
                : '',
            }}
          ></div>
        </ModalBody>
      </ModalApp>
      <Row className="gy-4 p-5">
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            return false
          }}
          className="gy-4"
          action="#"
        >
          <Row>
            <Col lg={5}>
              <Row className="gy-2">
                <Col lg={4} md={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="unitasal"
                      className="form-label"
                    >
                      Unit Asal
                    </Label>
                  </div>
                </Col>
                <Col lg={8} md={8}>
                  <div>
                    <CustomSelect
                      id="objectunitasal"
                      name="objectunitasal"
                      options={dataCombo}
                      value={vSavePatologi.values.objectunitasal || ''}
                      className={`input ${
                        vSavePatologi.errors.objectunitasal ? 'is-invalid' : ''
                      }`}
                      onChange={(value) =>
                        vSavePatologi.setFieldValue(
                          'objectunitasal',
                          value?.value
                        )
                      }
                      isClearEmpty
                    />
                    {vSavePatologi.touched.objectunitasal &&
                    vSavePatologi.errors.objectunitasal ? (
                      <FormFeedback type="invalid">
                        <div>{vSavePatologi.errors.objectunitasal}</div>
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4} md={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="tindakan"
                      className="form-label"
                    >
                      Nama Tindakan
                    </Label>
                  </div>
                </Col>
                <Col lg={8} md={8} className="mt-2">
                  <div>
                    <CustomSelect
                      id="tindakan"
                      name="tindakan"
                      options={dataTindakan}
                      value={vTindakan.values.tindakan || ''}
                      className={`input ${
                        vTindakan.errors.tindakan ? 'is-invalid' : ''
                      }`}
                      onChange={handleTindakanSelcted}
                      isClearEmpty
                    />
                    {vTindakan.touched.tindakan && vTindakan.errors.tindakan ? (
                      <FormFeedback type="invalid">
                        <div>{vTindakan.errors.tindakan}</div>
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={7} className="mb-5">
              <Row>
                <Col lg={4} md={4}>
                  <div className="mt-2">
                    <Label
                      style={{ color: 'black' }}
                      htmlFor="tanggal"
                      className="form-label"
                    >
                      Tanggal Tindakan
                    </Label>
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <KontainerFlatpicr
                    isError={
                      vSavePatologi.touched?.tglinput &&
                      !!vSavePatologi.errors?.tglinput
                    }
                    id="tglinput"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={vSavePatologi.values.tglinput}
                    onChange={([newDate]) => {
                      vSavePatologi.setFieldValue(
                        'tglinput',
                        newDate.toISOString()
                      )
                    }}
                  />
                  {vSavePatologi.touched?.tglinput &&
                    !!vSavePatologi.errors.tglinput && (
                      <FormFeedback type="invalid">
                        <div>{vSavePatologi.errors.tglinput}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2} md={2}>
                  <div className="form-check ms-2 mt-2">
                    <CustomInput
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
                <Col lg={12} className="mt-2">
                  <Row>
                    <Col lg={4} sm={6}>
                      <div className="mt-2">
                        <Label style={{ color: 'black' }} htmlFor="qty">
                          Quantity
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4} sm={6}>
                      <div>
                        <div className="input-step">
                          <button
                            type="button"
                            className="minus"
                            onClick={() => onClickCount('min')}
                          >
                            -
                          </button>
                          <CustomInput
                            type="number"
                            className="product-quantity"
                            id="product-qty-1"
                            value={vTindakan.values.qty}
                            readOnly
                          />
                          <button
                            type="button"
                            className="plus"
                            onClick={() => onClickCount('plus')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={12} className="mt-2">
                  <Row>
                    <Col lg={4} sm={6}>
                      <div className="mt-2">
                        <Label style={{ color: 'black' }} htmlFor="harga">
                          Harga
                        </Label>
                      </div>
                    </Col>
                    <Col lg={8} sm={6}>
                      <div>
                        <CustomInput
                          type="text"
                          className="form-control bg-light border-0 product-line-price"
                          id="harga"
                          placeholder="Rp.0.00"
                          value={
                            'Rp ' + numberLocal(vTindakan.values.total || 0)
                          }
                          readOnly
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={12}>
                  <div className="d-flex gap-2 flex-row-reverse mt-3">
                    <Button
                      type="button"
                      color="success"
                      placement="top"
                      onClick={() => onClickTambah()}
                    >
                      TAMBAH
                    </Button>
                    <Button type="button" color="danger" placement="top">
                      BATAL
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={8} className="gy-2">
              <Card>
                <CardHeader className="card-header-snb ">
                  <h4 className="card-title mb-0" style={{ color: 'black' }}>
                    Daftar Order Tindakan
                  </h4>
                </CardHeader>
                <CardBody>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      columns={columns}
                      pagination
                      data={vSavePatologi.values.listtindakan}
                      customStyles={tableCustomStyles}
                      progressComponent={<LoadingTable />}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Col lg={10} sm={10} className="mt-1">
                <div>
                  <CustomInput
                    style={{ height: '300px' }}
                    id="keterangan"
                    name="keterangan"
                    type="textarea"
                    placeholder="Keterangan Order"
                    onChange={vSavePatologi.handleChange}
                    onBlur={vSavePatologi.handleBlur}
                    value={vSavePatologi.values.keterangan || ''}
                    invalid={
                      vSavePatologi.touched.keterangan &&
                      vSavePatologi.errors.keterangan
                        ? true
                        : false
                    }
                  />
                  {vSavePatologi.touched.keterangan &&
                  vSavePatologi.errors.keterangan ? (
                    <FormFeedback type="invalid">
                      <div>{vSavePatologi.errors.keterangan}</div>
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={2} sm={2} className="mt-2">
                <div className="d-flex flex-wrap gap-2 justify-content-md-start">
                  <BtnSpinner
                    type="button"
                    color="success"
                    placement="top"
                    onClick={() => onClickSimpan()}
                    loading={loadingSave}
                  >
                    Simpan
                  </BtnSpinner>
                </div>
              </Col>
            </Col>
            <Col lg={12} className="gy-2">
              <Card>
                <CardHeader className="card-header-snb ">
                  <h4 className="card-title mb-0" style={{ color: 'black' }}>
                    Riwayat Order Tindakan
                  </h4>
                </CardHeader>
                <CardBody>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      columns={columnsRiwayat}
                      pagination
                      data={dataOrder.histori}
                      progressPending={loadingOrder}
                      customStyles={tableCustomStyles}
                      progressComponent={<LoadingTable />}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={12} className="gy-2">
              <Card>
                <CardHeader className="card-header-snb ">
                  <h4 className="card-title mb-0" style={{ color: 'black' }}>
                    Hasil Patologi
                  </h4>
                </CardHeader>
                <CardBody>
                  <div id="table-gridjs">
                    <DataTable
                      fixedHeader
                      pointerOnHover
                      highlightOnHover
                      columns={columnsHasil}
                      pagination
                      data={dataHasil.pelayanan}
                      progressPending={loadingHasil}
                      progressComponent={<LoadingTable />}
                      onRowClicked={(row) => {
                        vViewHasil.setFieldValue('expertise', row.expertise)
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Row>
    </React.Fragment>
  )
}

export default OrderPatologi
