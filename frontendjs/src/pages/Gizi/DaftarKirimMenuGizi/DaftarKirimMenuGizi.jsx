import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UiContent from '../../../Components/Common/UiContent'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Input,
  Row,
} from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../../../Components/Common/CustomSelect/CustomSelect'
import { tableCustomStyles } from '../../../Components/Table/tableCustomStyles'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../../Components/Table/LoadingTable'
import {
  getDaftarKirimGizi,
  getMasterGizi,
  upsertKirimCetakLabel,
} from '../../../store/gizi/giziSlice'
import KontainerFlatpickr from '../../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { dateTimeLocal } from '../../../utils/format'
import CustomInput from '../../../Components/Common/CustomInput/CustomInput'
import { useSelectorRoot } from '../../../store/reducers'
import { ToastContainer, toast } from 'react-toastify'

const DaftarKirimMenuGizi = () => {
  document.title = 'Daftar Kirim Menu Gizi'
  const dispatch = useDispatch()
  const [dateNow] = useState(() => new Date().toISOString())
  const { data, loading, dataCombo } = useSelectorRoot((state) => ({
    data: state.giziSlice.getDaftarKirimGizi?.data || [],
    dataCombo: state.giziSlice.getMasterGizi?.data || [],
  }))
  const vFilter = useFormik({
    initialValues: {
      tglorder: dateNow,
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      dispatch(getDaftarKirimGizi(values))
    },
  })
  useEffect(() => {
    const submit = vFilter.handleSubmit
    submit()
    dispatch(getMasterGizi(''))
  }, [dispatch, vFilter.handleSubmit])

  const vPrintCetak = useFormik({
    initialValues: {
      status: 1,
      data: [],
    },
    onSubmit: (values) => {
      if (values.status === 1) {
        let allChecked = [...data]
        allChecked.filter((d) => d.checked)
        let belumPrintChecked = [...allChecked]
        belumPrintChecked.filter((d) => !d.iscetaklabel)
        if (belumPrintChecked.length > 0) {
          toast.error('Terdapat makanan yang belum diprint label')
          return
        }
      }
      dispatch(
        upsertKirimCetakLabel(values, () => {
          vFilter.handleSubmit()
        })
      )
    },
  })
  useEffect(() => {
    const setFF = vPrintCetak.setFieldValue

    setFF('data', data)
  }, [data, vPrintCetak.setFieldValue])

  const handleChecked = (checked, norec) => {
    const newListPC = [...vPrintCetak.values.data]
    const index = newListPC.findIndex((item) => item.norecgizidetail === norec)
    const newItem = { ...newListPC[index] }
    newItem.checked = !checked
    newListPC[index] = newItem
    vPrintCetak.setFieldValue('data', newListPC)
  }

  const isCheckedAll =
    vPrintCetak.values.data.length > 0
      ? vPrintCetak.values.data.every((item) => item.checked)
      : false

  const handleCheckedAll = () => {
    if (data === null) return
    const withChecked = vPrintCetak.values.data.map((pelayanan) => {
      return {
        ...pelayanan,
        checked: !pelayanan.no_nota && !isCheckedAll,
      }
    })
    vPrintCetak.setFieldValue('data', withChecked)
  }

  const columns = [
    {
      name: (
        <span className="font-weight-bold fs-13">
          <CustomInput
            className="form-check-input"
            type="checkbox"
            id={`formcheck-all`}
            checked={isCheckedAll}
            onChange={(e) => {
              handleCheckedAll(isCheckedAll)
            }}
          />
        </span>
      ),
      sortable: false,
      cell: (row) => {
        return (
          <div className="hstack gap-3 flex-wrap">
            {!row.no_nota && (
              <CustomInput
                className="form-check-input"
                type="checkbox"
                id={`formcheck-${row.norecgizidetail}`}
                checked={row.checked}
                onChange={(e) => {
                  handleChecked(row.checked, row.norecgizidetail)
                }}
              />
            )}
          </div>
        )
      },
      width: '50px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kirim</span>,
      sortable: true,
      wrap: true,
      width: '50px',
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.iskirim ? 'lightblue' : 'lightcoral',
            padding: '8px', // Adjust padding as needed
          }}
        >
          {row.iskirim ? '✓' : '❌'}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Cetak</span>,
      sortable: true,
      wrap: true,
      width: '50px',
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.iscetaklabel ? 'lightblue' : 'lightcoral',
            padding: '8px', // Adjust padding as needed
          }}
        >
          {row.iscetaklabel ? '✓' : '❌'}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">No. Registrasi</span>,
      selector: (row) => row.noregistrasi,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Tgl Order</span>,
      selector: (row) => dateTimeLocal(new Date(row.tglorder)),
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">No Order</span>,
      selector: (row) => row.nomororder,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Petugas Order</span>,
      selector: (row) => row.pegawaiorder,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Petugas Verifikasi</span>,
      selector: (row) => row.pegawaiverif,
      sortable: true,
      width: '150px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Order</span>,
      selector: (row) => row.jenisorder,
      sortable: true,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Diet 1</span>,
      selector: (row) => row.diet1,
      sortable: true,
      width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Diet 2</span>,
      selector: (row) => row.diet2,
      sortable: true,
      width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Diet 3</span>,
      selector: (row) => row.diet3,
      sortable: true,
      width: '100px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Kategori</span>,
      selector: (row) => row.kategoridiet,
      sortable: true,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Keterangan</span>,
      selector: (row) => row.keterangan,
      sortable: true,
      width: '200px',
      wrap: true,
    },
  ]

  const handleClickKirim = () => {
    vPrintCetak.setFieldValue('status', 1)
    vPrintCetak.handleSubmit()
  }

  const handleClickLabel = () => {
    vPrintCetak.setFieldValue('status', 2)
    vPrintCetak.handleSubmit()
  }

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daftar Kirim Menu Gizi" pageTitle="Forms" />
          <Card>
            <CardBody>
              <Row className="gy-2">
                <Col lg={2}>
                  <CustomSelect
                    id="unit"
                    name="unit"
                    options={dataCombo?.resultunit}
                    onChange={(e) => {
                      vFilter.setFieldValue('unit', e?.value || '')
                    }}
                    value={vFilter.values.unit}
                    onBlur={vFilter.handleBlur}
                    className={`input row-header ${
                      !!vFilter?.errors.unit ? 'is-invalid' : ''
                    }`}
                    isClearEmpty
                    placeholder="List Unit..."
                  />
                  {vFilter.touched.unit && !!vFilter.errors.unit && (
                    <FormFeedback type="invalid">
                      <div>{vFilter.errors.unit}</div>
                    </FormFeedback>
                  )}
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="jenisOrder"
                    name="jenisOrder"
                    options={dataCombo?.resultjenisOrder}
                    onChange={(e) => {
                      vFilter.setFieldValue('jenisOrder', e?.value || '')
                    }}
                    value={vFilter.values.jenisOrder}
                    onBlur={vFilter.handleBlur}
                    className={`input row-header ${
                      !!vFilter?.errors.jenisOrder ? 'is-invalid' : ''
                    }`}
                    isClearEmpty
                    placeholder="List Jenis Order..."
                  />
                  {vFilter.touched.jenisOrder &&
                    !!vFilter.errors.jenisOrder && (
                      <FormFeedback type="invalid">
                        <div>{vFilter.errors.jenisOrder}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <CustomSelect
                    id="sudahKirim"
                    name="sudahKirim"
                    options={[
                      {
                        label: 'Sudah Kirim',
                        value: 1,
                      },
                      {
                        label: 'Belum Kirim',
                        value: 2,
                      },
                    ]}
                    onChange={(e) => {
                      vFilter.setFieldValue('sudahKirim', e?.value || '')
                    }}
                    value={vFilter.values.sudahKirim}
                    onBlur={vFilter.handleBlur}
                    className={`input row-header ${
                      !!vFilter?.errors.sudahKirim ? 'is-invalid' : ''
                    }`}
                    isClearEmpty
                    placeholder="List Status Kirim..."
                  />
                  {vFilter.touched.sudahKirim &&
                    !!vFilter.errors.sudahKirim && (
                      <FormFeedback type="invalid">
                        <div>{vFilter.errors.sudahKirim}</div>
                      </FormFeedback>
                    )}
                </Col>
                <Col lg={2}>
                  <KontainerFlatpickr
                    isError={
                      vFilter.touched?.tglOrder && !!vFilter.errors?.tglOrder
                    }
                    id="tglOrder"
                    options={{
                      dateFormat: 'Y-m-d',
                      defaultDate: 'today',
                    }}
                    value={vFilter.values.tglOrder}
                    onChange={([newDate]) => {
                      vFilter.setFieldValue('tglOrder', newDate.toISOString())
                    }}
                  />
                  {vFilter.touched?.tglOrder && !!vFilter.errors.tglOrder && (
                    <FormFeedback type="invalid">
                      <div>{vFilter.errors.tglOrder}</div>
                    </FormFeedback>
                  )}
                </Col>
                <Col lg={2}>
                  <Button
                    type="button"
                    color="info"
                    placement="top"
                    id="tooltipTopPencarian"
                    onClick={() => {
                      vFilter.handleSubmit()
                    }}
                  >
                    CARI
                  </Button>
                </Col>
                <hr />
                <div id="table-gridjs">
                  <DataTable
                    fixedHeader
                    fixedHeaderScrollHeight="700px"
                    columns={columns}
                    pagination
                    data={vPrintCetak.values.data}
                    progressPending={loading}
                    customStyles={tableCustomStyles}
                    pointerOnHover
                    highlightOnHover
                    progressComponent={<LoadingTable />}
                  />
                </div>
                <Col xxl={12} sm={12}>
                  <div className="d-flex flex-wrap gap-2 justify-content-end">
                    <Button
                      type="button"
                      color="primary"
                      placement="top"
                      onClick={handleClickLabel}
                      className="d-flex align-items-center"
                    >
                      <i className="ri-printer-fill align-center me-2"></i>
                      Label
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      placement="top"
                      onClick={handleClickKirim}
                    >
                      Kirim
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DaftarKirimMenuGizi
