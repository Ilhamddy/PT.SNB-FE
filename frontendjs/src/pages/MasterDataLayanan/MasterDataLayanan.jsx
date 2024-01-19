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
  Modal,
  CardHeader,
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMasterTarifLayanan,
  setVariabelBPJS, updateStatusLayanan
} from '../../store/masterdatalayanan/action'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { tableCustomStyles } from '../../Components/Table/tableCustomStyles'

const MasterDataLayanan = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const vFilter = useFormik({
    initialValues: {
      aktif: '',
      namaproduk: '',
    },
    onSubmit: (values) => {
      dispatch(getMasterTarifLayanan(values))
    },
  })

  const vVariabelBPJS = useFormik({
    initialValues: {
      idproduk: '',
      jenisproduk: '',
      detailjenisproduk: '',
      namalayanan: '',
      variabelbpjs: '',
    },
    validationSchema: Yup.object({
      variabelbpjs: Yup.string().required('Variabel BPJS harus diisi'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        setVariabelBPJS(values, () => {
          dispatch(getMasterTarifLayanan(vFilter.values))
          resetForm()
        })
      )
    },
  })
  useEffect(() => {
    dispatch(getMasterTarifLayanan(vFilter.initialValues))
  }, [vFilter.initialValues, dispatch])
  const { layanan, loading, valueStatusEnabled, variabelBPJS } = useSelector(
    (state) => ({
      layanan: state.MasterDataLayanan.getMasterTarifLayanan.data.layanan || [],
      loading: state.MasterDataLayanan.getMasterTarifLayanan.loading || false,
      valueStatusEnabled:
        state.MasterDataLayanan.getMasterTarifLayanan.data?.combo
          ?.statusenabled || [],
      variabelBPJS:
        state.MasterDataLayanan.getMasterTarifLayanan.data?.combo
          ?.variabelBPJS || [],
    })
  )

  const handlePilihVariabel = (row) => {
    vVariabelBPJS.setValues({
      ...vVariabelBPJS.initialValues,
      idproduk: row.idproduk,
      jenisproduk: row.namajenisproduk,
      detailjenisproduk: row.namadetailjenisproduk,
      namalayanan: row.namaproduk,
      variabelbpjs: row.variabelbpjs,
    })
  }

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Detail</span>,
      cell: (row) => (
        <div className="hstack gap-3 flex-wrap">
          <UncontrolledTooltip placement="top" target="detail-produk">
            Detail Produk
          </UncontrolledTooltip>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
              id="detail-produk"
            >
              <i className="ri-apps-2-line"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <Link to={`/master/setting-layanan/tambah/${row.idproduk}`}>
                <DropdownItem>
                  <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                  Edit
                </DropdownItem>
              </Link>
              <DropdownItem onClick={() => handlePilihVariabel(row)}>
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Set Variabel BPJS
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Id Produk</span>,
      sortable: true,
      selector: (row) => row.idproduk,
      width: '80px',
    },
    {
      name: <span className="font-weight-bold fs-13">Aktif</span>,
      selector: (row) => (row.statusenabled ? 'Aktif' : 'Tidak Aktif'),
      sortable: true,
      width: '110px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kode Layanan</span>,
      sortable: true,
      selector: (row) => row.kodeexternal,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Layanan</span>,
      sortable: true,
      selector: (row) => row.namaproduk,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Detail Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namadetailjenisproduk,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namajenisproduk,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Variabel BPJS</span>,
      sortable: true,
      selector: (row) => row.namavariabelbpjs,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Aktifkan</span>,
      sortable: true,
      cell: (row) =>
        row.statusenabled ? (
          <Button color="danger" type='button' onClick={() => {
            handleClikStatus(row, false)
          }}>Nonaktifkan</Button>
        ) : (
          <Button color="success" type='button' onClick={() => {
            handleClikStatus(row, true)
          }}>Aktifkan</Button>
        ),
      width: '150px',
      wrap: true,
    },
  ]
  const handleClikStatus = (e, status) => {
    let temp = {
      idproduk: e.idproduk,
      status: status
    }
    dispatch(updateStatusLayanan(temp, () => {
      dispatch(getMasterTarifLayanan(vFilter.values))
    }))
  }
  return (
    <div className="page-content page-data-layanan">
      <Modal
        isOpen={!!vVariabelBPJS.values.idproduk}
        toggle={() => vVariabelBPJS.resetForm()}
        centered
      >
        <Card className="p-3">
          <Row>
            <ColLabelInput className="mb-3" label={'Jenis Produk'} lg={12}>
              <Input
                id="jenisproduk"
                name="jenisproduk"
                type="text"
                disabled
                value={vVariabelBPJS.values.jenisproduk}
                onChange={(e) => {
                  vVariabelBPJS.setFieldValue('jenisproduk', e.target.value)
                }}
                invalid={
                  vVariabelBPJS.touched?.jenisproduk &&
                  !!vVariabelBPJS.errors?.jenisproduk
                }
              />
              {vVariabelBPJS.touched?.jenisproduk &&
                !!vVariabelBPJS.errors.jenisproduk && (
                  <FormFeedback type="invalid">
                    <div>{vVariabelBPJS.errors.jenisproduk}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput
              className="mb-3"
              label={'Detail Jenis Produk'}
              lg={12}
            >
              <Input
                id="detailjenisproduk"
                name="detailjenisproduk"
                type="text"
                disabled
                value={vVariabelBPJS.values.detailjenisproduk}
                onChange={(e) => {
                  vVariabelBPJS.setFieldValue(
                    'detailjenisproduk',
                    e.target.value
                  )
                }}
                invalid={
                  vVariabelBPJS.touched?.detailjenisproduk &&
                  !!vVariabelBPJS.errors?.detailjenisproduk
                }
              />
              {vVariabelBPJS.touched?.detailjenisproduk &&
                !!vVariabelBPJS.errors.detailjenisproduk && (
                  <FormFeedback type="invalid">
                    <div>{vVariabelBPJS.errors.detailjenisproduk}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label={'Nama Layanan'} lg={12}>
              <Input
                id="namalayanan"
                name="namalayanan"
                type="text"
                disabled
                value={vVariabelBPJS.values.namalayanan}
                onChange={(e) => {
                  vVariabelBPJS.setFieldValue('namalayanan', e.target.value)
                }}
                invalid={
                  vVariabelBPJS.touched?.namalayanan &&
                  !!vVariabelBPJS.errors?.namalayanan
                }
              />
              {vVariabelBPJS.touched?.namalayanan &&
                !!vVariabelBPJS.errors.namalayanan && (
                  <FormFeedback type="invalid">
                    <div>{vVariabelBPJS.errors.namalayanan}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label={'Variabel BPJS'} lg={12}>
              <CustomSelect
                id="variabelbpjs"
                name="variabelbpjs"
                options={variabelBPJS}
                onChange={(e) => {
                  vVariabelBPJS.setFieldValue('variabelbpjs', e?.value || '')
                }}
                value={vVariabelBPJS.values.variabelbpjs}
                isClearEmpty
                className={`input row-header ${!!vVariabelBPJS?.errors.variabelbpjs ? 'is-invalid' : ''
                  }`}
              />
              {vVariabelBPJS.touched.variabelbpjs &&
                !!vVariabelBPJS.errors.variabelbpjs && (
                  <FormFeedback type="invalid">
                    <div>{vVariabelBPJS.errors.variabelbpjs}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                color="success"
                type="button"
                onClick={() => vVariabelBPJS.handleSubmit()}
              >
                Simpan
              </Button>
              <Button
                color="danger"
                type="button"
                className="ms-3"
                onClick={() => vVariabelBPJS.resetForm()}
              >
                Batal
              </Button>
            </Col>
          </Row>
        </Card>
      </Modal>
      <Container fluid>
        <BreadCrumb title="Master Data Layanan" pageTitle="Master" />
        <Card>
          <CardHeader className="card-header-snb">
            <h4 className="card-title mb-0" style={{ color: 'black' }}>
              MASTER DATA LAYANAN
            </h4>
          </CardHeader>
          <CardBody>
            <Row className="d-flex justify-content-between">
              <Col lg="auto">
                <Link to="/master/setting-layanan/tambah">
                  <Button color="info">Setting Layanan</Button>
                </Link>
              </Col>
              <Col lg={7}>
                <Row>
                  <Col lg={5}>
                    <CustomSelect
                      id="aktif"
                      name="aktif"
                      options={valueStatusEnabled}
                      onChange={(e) => {
                        vFilter.setFieldValue('aktif', e?.value || '')
                      }}
                      value={vFilter.values.aktif}
                      className={`input row-header ${!!vFilter?.errors.aktif ? 'is-invalid' : ''
                        }`}
                    />
                    {vFilter.touched.aktif && !!vFilter.errors.aktif && (
                      <FormFeedback type="invalid">
                        <div>{vFilter.errors.aktif}</div>
                      </FormFeedback>
                    )}
                  </Col>
                  <Col lg={5}>
                    <Input
                      id="namaproduk"
                      name="namaproduk"
                      type="text"
                      value={vFilter.values.namaproduk}
                      placeholder="Nama Produk"
                      onChange={(e) => {
                        vFilter.setFieldValue('namaproduk', e.target.value)
                      }}
                      invalid={
                        vFilter.touched?.namaproduk &&
                        !!vFilter.errors?.namaproduk
                      }
                    />
                    {vFilter.touched?.namaproduk &&
                      !!vFilter.errors.namaproduk && (
                        <FormFeedback type="invalid">
                          <div>{vFilter.errors.namaproduk}</div>
                        </FormFeedback>
                      )}
                  </Col>
                  <Col>
                    <Button
                      color="info"
                      type="button"
                      onClick={() => {
                        vFilter.handleSubmit()
                      }}
                    >
                      Cari
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <DataTable
                className="mt-3"
                fixedHeader
                fixedHeaderScrollHeight="700px"
                columns={columnsDetail}
                pagination
                data={layanan}
                progressPending={loading}
                customStyles={tableCustomStyles}
                progressComponent={<LoadingTable />}
              />
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default MasterDataLayanan
