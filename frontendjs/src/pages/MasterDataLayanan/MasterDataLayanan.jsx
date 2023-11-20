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
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getMasterTarifLayanan } from '../../store/payment/action'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import { useEffect } from 'react'

const MasterDataLayanan = () => {
  const dispatch = useDispatch()
  const vFilter = useFormik({
    initialValues: {
      aktif: '',
      namaproduk: '',
    },
    onSubmit: (values) => {
      dispatch(getMasterTarifLayanan(values))
    },
  })
  useEffect(() => {
    dispatch(getMasterTarifLayanan(vFilter.initialValues))
  }, [vFilter.initialValues, dispatch])
  const { layanan, loading } = useSelector((state) => ({
    layanan: state.Payment.getMasterTarifLayanan.data.layanan || [],
    loading: state.Payment.getMasterTarifLayanan.loading || false,
  }))

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
              <DropdownItem onClick={() => {}}>
                <i className="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => {}}>
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
          <Button color="danger">Nonaktifkan</Button>
        ) : (
          <Button color="success">Aktifkan</Button>
        ),
      width: '150px',
      wrap: true,
    },
  ]
  return (
    <div className="page-content page-penerimaan-barang">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Master Data Layanan" pageTitle="Payment" />
        <Card className="p-3">
          <Row className="d-flex justify-content-between">
            <Col lg="auto">
              <Button color="info">Setting Layanan</Button>
            </Col>
            <Col lg={7}>
              <Row>
                <Col lg={5}>
                  <CustomSelect
                    id="aktif"
                    name="aktif"
                    options={[]}
                    onChange={(e) => {
                      vFilter.setFieldValue('aktif', e?.value || '')
                    }}
                    value={vFilter.values.aktif}
                    className={`input row-header ${
                      !!vFilter?.errors.aktif ? 'is-invalid' : ''
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
        </Card>
      </Container>
    </div>
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

export default MasterDataLayanan
