import { ToastContainer } from 'react-toastify'
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
  FormFeedback,
  Button,
  UncontrolledTooltip,
  Nav,
  NavItem,
  NavLink,
  TabPane,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getMasterTarifLayanan } from '../../store/payment/action'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classnames from 'classnames'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import * as Yup from 'yup'
import {
  getComboMapRuangPelayanan,
  getLainLain,
  getLayanan,
  getLayananMapping,
  getMapUnitToProduk,
  saveOrDeleteMapping,
  upsertDetailJenisProduk,
  upsertJenisProduk,
  upsertLayanan,
} from '../../store/masterdatalayanan/action'
import NoDataTable from '../../Components/Table/NoDataTable'
import { dateLocal } from '../../utils/format'
import { toast } from 'react-toastify'
import DeleteModalCustom from '../../Components/Common/DeleteModalCustom'

const LainLainPelayanan = ({ tabId }) => {
  const dispatch = useDispatch()
  const {
    loading,
    jenisProduk,
    detailJenisProduk,
    statusEnabled,
    instalasi,
    comboJenisProduk,
  } = useSelector((state) => ({
    loading: state.MasterDataLayanan.getLainLain.loading || false,
    jenisProduk: state.MasterDataLayanan.getLainLain.data?.jenisProduk || [],
    detailJenisProduk:
      state.MasterDataLayanan.getLainLain.data?.detailJenisProduk || [],
    statusEnabled:
      state.MasterDataLayanan.getLainLain.data?.statusEnabled || [],
    instalasi: state.MasterDataLayanan.getLainLain.data?.instalasi || [],
    comboJenisProduk:
      state.MasterDataLayanan.getLainLain.data?.comboJenisProduk || [],
  }))
  const vJenisProduk = useFormik({
    initialValues: {
      id: '',
      namajenisproduk: '',
      instalasi: '',
      statusenabled: '',
    },
    validationSchema: Yup.object({
      namajenisproduk: Yup.string().required('Nama jenis produk perlu diisi'),
      instalasi: Yup.string().required('Instalasi Perlu diisi'),
      statusenabled: Yup.string().required('Status Enabled perlu diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        upsertJenisProduk(values, () => {
          resetForm()
          dispatch(getLainLain({}))
        })
      )
    },
  })
  const vDetailJenisProduk = useFormik({
    initialValues: {
      id: '',
      namadetailjenisproduk: '',
      jenisproduk: '',
      instalasi: '',
      statusenabled: '',
    },
    validationSchema: Yup.object({
      namadetailjenisproduk: Yup.string().required(
        'Nama detail jenis produk perlu diisi'
      ),
      jenisproduk: Yup.string().required('Jenis produk perlu diisi'),
      statusenabled: Yup.string().required('Status Enabled perlu diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        upsertDetailJenisProduk(values, () => {
          resetForm()
          dispatch(getLainLain({}))
        })
      )
    },
  })
  useEffect(() => {
    dispatch(getLainLain({}))
  }, [dispatch])

  const handleClick = (row) => {
    vJenisProduk.setValues({
      ...vJenisProduk.initialValues,
      id: row.idjenisproduk,
      namajenisproduk: row.namajenisproduk,
      instalasi: row.instalasi,
      statusenabled: row.statusenabledval,
    })
  }

  const handleClickDetail = (row) => {
    vDetailJenisProduk.setValues({
      ...vDetailJenisProduk.initialValues,
      id: row.iddetailjenisproduk,
      namadetailjenisproduk: row.namadetailjenisproduk,
      jenisproduk: row.idjenisproduk,
      instalasi: row.instalasi,
      statusenabled: row.statusenabledval,
    })
  }
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsJenis = [
    {
      name: <span className="font-weight-bold fs-13">Id</span>,
      sortable: true,
      selector: (row) => row.idjenisproduk,
      width: '80px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namajenisproduk,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Aktif</span>,
      selector: (row) => (row.statusenabled ? 'Aktif' : 'Nonaktif'),
      sortable: true,
      width: '150px ',
    },
  ]
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Id</span>,
      sortable: true,
      selector: (row) => row.iddetailjenisproduk,
      width: '80px',
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namajenisproduk,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Detail Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namadetailjenisproduk,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Aktif</span>,
      selector: (row) => (row.statusenabled ? 'Aktif' : 'Nonaktif'),
      sortable: true,
      width: '100px ',
    },
  ]
  return (
    <TabPane className="p-4" tabId={tabId} id="home2">
      <Row>
        <Label style={{ color: '#000000' }}>Jenis Produk</Label>
      </Row>
      <Row>
        <Col lg={7}>
          <DataTable
            columns={columnsJenis}
            pagination
            data={jenisProduk}
            progressPending={loading}
            customStyles={tableCustomStyles}
            progressComponent={<LoadingTable />}
            noDataComponent={<NoDataTable dataName={'Mapping'} />}
            onRowClicked={(row) => handleClick(row)}
            highlightOnHover
          />
        </Col>
        <Col lg={5}>
          <Row>
            <ColLabelInput className="mb-3" lg={12} label="Jenis Produk">
              <Input
                id="namajenisproduk"
                name="namajenisproduk"
                type="text"
                value={vJenisProduk.values.namajenisproduk}
                onChange={(e) => {
                  vJenisProduk.setFieldValue('namajenisproduk', e.target.value)
                }}
                invalid={
                  vJenisProduk.touched?.namajenisproduk &&
                  !!vJenisProduk.errors?.namajenisproduk
                }
              />
              {vJenisProduk.touched?.namajenisproduk &&
                !!vJenisProduk.errors.namajenisproduk && (
                  <FormFeedback type="invalid">
                    <div>{vJenisProduk.errors.namajenisproduk}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" lg={12} label="Instalasi">
              <CustomSelect
                id="instalasi"
                name="instalasi"
                options={instalasi}
                onChange={(e) => {
                  vJenisProduk.setFieldValue('instalasi', e?.value || '')
                }}
                isClearEmpty
                value={vJenisProduk.values.instalasi}
                className={`input row-header ${
                  !!vJenisProduk?.errors.instalasi ? 'is-invalid' : ''
                }`}
              />
              {vJenisProduk.touched.instalasi &&
                !!vJenisProduk.errors.instalasi && (
                  <FormFeedback type="invalid">
                    <div>{vJenisProduk.errors.instalasi}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" lg={12} label="Status Enabled">
              <CustomSelect
                id="statusenabled"
                name="statusenabled"
                options={statusEnabled}
                onChange={(e) => {
                  vJenisProduk.setFieldValue('statusenabled', e?.value || '')
                }}
                isClearEmpty
                value={vJenisProduk.values.statusenabled}
                className={`input row-header ${
                  !!vJenisProduk?.errors.statusenabled ? 'is-invalid' : ''
                }`}
              />
              {vJenisProduk.touched.statusenabled &&
                !!vJenisProduk.errors.statusenabled && (
                  <FormFeedback type="invalid">
                    <div>{vJenisProduk.errors.statusenabled}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <Col className="d-flex justify-content-center">
              <Button
                color="success"
                className="me-3"
                type="button"
                onClick={() => vJenisProduk.handleSubmit()}
              >
                {vJenisProduk.values.id ? 'Edit' : 'Tambah'}
              </Button>
              <Button
                color="danger"
                onClick={() => {
                  vJenisProduk.resetForm()
                }}
              >
                Batal
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Label style={{ color: '#000000' }}>Detail Jenis Produk</Label>
      </Row>
      <Row>
        <Col lg={7}>
          <DataTable
            columns={columnsDetail}
            pagination
            data={detailJenisProduk}
            progressPending={loading}
            customStyles={tableCustomStyles}
            progressComponent={<LoadingTable />}
            noDataComponent={<NoDataTable dataName={'Detail'} />}
            onRowClicked={(row) => handleClickDetail(row)}
            highlightOnHover
          />
        </Col>
        <Col lg={5}>
          <Row>
            <ColLabelInput
              className="mb-3"
              lg={12}
              label="Nama Detail Jenis Produk"
            >
              <Input
                id="namadetailjenisproduk"
                name="namadetailjenisproduk"
                type="text"
                value={vDetailJenisProduk.values.namadetailjenisproduk}
                onChange={(e) => {
                  vDetailJenisProduk.setFieldValue(
                    'namadetailjenisproduk',
                    e.target.value
                  )
                }}
                invalid={
                  vDetailJenisProduk.touched?.namadetailjenisproduk &&
                  !!vDetailJenisProduk.errors?.namadetailjenisproduk
                }
              />
              {vDetailJenisProduk.touched?.namadetailjenisproduk &&
                !!vDetailJenisProduk.errors.namadetailjenisproduk && (
                  <FormFeedback type="invalid">
                    <div>{vDetailJenisProduk.errors.namadetailjenisproduk}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" lg={12} label="Jenis Produk">
              <CustomSelect
                id="jenisproduk"
                name="jenisproduk"
                options={comboJenisProduk}
                onChange={(e) => {
                  vDetailJenisProduk.setFieldValue(
                    'jenisproduk',
                    e?.value || ''
                  )
                  vDetailJenisProduk.setFieldValue(
                    'instalasi',
                    e?.instalasi || ''
                  )
                }}
                isClearEmpty
                value={vDetailJenisProduk.values.jenisproduk}
                className={`input row-header ${
                  !!vDetailJenisProduk?.errors.jenisproduk ? 'is-invalid' : ''
                }`}
              />
              {vDetailJenisProduk.touched.jenisproduk &&
                !!vDetailJenisProduk.errors.jenisproduk && (
                  <FormFeedback type="invalid">
                    <div>{vDetailJenisProduk.errors.jenisproduk}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" lg={12} label="Status Enabled">
              <CustomSelect
                id="statusenabled"
                name="statusenabled"
                options={statusEnabled}
                onChange={(e) => {
                  vDetailJenisProduk.setFieldValue(
                    'statusenabled',
                    e?.value || ''
                  )
                }}
                isClearEmpty
                value={vDetailJenisProduk.values.statusenabled}
                className={`input row-header ${
                  !!vDetailJenisProduk?.errors.statusenabled ? 'is-invalid' : ''
                }`}
              />
              {vDetailJenisProduk.touched.statusenabled &&
                !!vDetailJenisProduk.errors.statusenabled && (
                  <FormFeedback type="invalid">
                    <div>{vDetailJenisProduk.errors.statusenabled}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <Col className="d-flex justify-content-center">
              <Button
                color="success"
                className="me-3"
                type="button"
                onClick={() => vDetailJenisProduk.handleSubmit()}
              >
                {vDetailJenisProduk.values.id ? 'Edit' : 'Tambah'}
              </Button>
              <Button
                color="danger"
                onClick={() => {
                  vDetailJenisProduk.resetForm()
                }}
              >
                Batal
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </TabPane>
  )
}

const tableCustomStyles = {
  headRow: {
    style: {
      color: '#ffffff',
      backgroundColor: '#FFCB46',
    },
  },
  rows: {
    style: {
      color: 'black',
      backgroundColor: '#f1f2f6',
    },
  },
}

export default LainLainPelayanan
