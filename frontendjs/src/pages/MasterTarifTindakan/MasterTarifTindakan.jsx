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
} from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useFormik } from 'formik'
import CustomSelect from '../Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMasterTarifLayanan,
  setVariabelBPJS,
} from '../../store/masterdatalayanan/action'
import DataTable from 'react-data-table-component'
import LoadingTable from '../../Components/Table/LoadingTable'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import ColLabelInput from '../../Components/ColLabelInput/ColLabelInput'
import { getTotalHargaProduk } from '../../store/mastertariftindakan/action'

const MasterTarifTindakan = () => {
  const dispatch = useDispatch()
  const { totalHargaProduk, loading } = useSelector((state) => ({
    totalHargaProduk:
      state.MasterTarifTindakan.getTotalHargaProduk.data?.totalHargaProduk ||
      [],
    loading: state.MasterTarifTindakan.getTotalHargaProduk.loading || false,
  }))
  const vFilter = useFormik({
    initialValues: {
      namakode: '',
      kelas: '',
    },
    onSubmit: (values) => {
      dispatch(getTotalHargaProduk(values))
    },
  })
  useEffect(() => {
    dispatch(getTotalHargaProduk(vFilter.initialValues))
  }, [vFilter.initialValues, dispatch])

  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">Id</span>,
      sortable: true,
      selector: (row) => row.idtotalhargaproduk,
      width: '80px',
    },
    {
      name: <span className="font-weight-bold fs-13">Kode Layanan</span>,
      sortable: true,
      selector: (row) => row.kodeexternal,
      width: '100px',
    },
    {
      name: <span className="font-weight-bold fs-13">Nama Tindakan</span>,
      sortable: true,
      selector: (row) => row.namaproduk,
      width: '200px',
    },
    {
      name: <span className="font-weight-bold fs-13">Detail Jenis Produk</span>,
      sortable: true,
      selector: (row) => row.namadetailjenisproduk,
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Kelas</span>,
      sortable: true,
      selector: (row) => row.namakelas,
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
      name: <span className="font-weight-bold fs-13">Tarif Tindakan</span>,
      sortable: true,
      selector: (row) =>
        'Rp' + (row.totalharga?.toLocaleString('id-ID') || '0'),
      width: '150px',
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Aktif</span>,
      selector: (row) => (row.statusenabled ? 'Aktif' : 'Tidak Aktif'),
      sortable: true,
      width: '110px',
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
    <div className="page-content page-tarif-tindakan">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Tarif Tindakan" pageTitle="Master" />
        <Card className="p-3">
          <Row>
            <Col lg={8}>
              <Row>
                <ColLabelInput label="Nama/Kode Tindakan" lg={4}>
                  <Input
                    id="namakode"
                    name="namakode"
                    type="text"
                    value={vFilter.values.namakode}
                    onChange={(e) => {
                      vFilter.setFieldValue('namakode', e.target.value)
                    }}
                    invalid={
                      vFilter.touched?.namakode && !!vFilter.errors?.namakode
                    }
                  />
                  {vFilter.touched?.namakode && !!vFilter.errors.namakode && (
                    <FormFeedback type="invalid">
                      <div>{vFilter.errors.namakode}</div>
                    </FormFeedback>
                  )}
                </ColLabelInput>
                <ColLabelInput label="Kelas" lg={4}>
                  <CustomSelect
                    id="kelas"
                    name="kelas"
                    options={[]}
                    onChange={(e) => {
                      vFilter.setFieldValue('kelas', e?.value || '')
                    }}
                    value={vFilter.values.kelas}
                    className={`input row-header ${
                      !!vFilter?.errors.kelas ? 'is-invalid' : ''
                    }`}
                  />
                  {vFilter.touched.kelas && !!vFilter.errors.kelas && (
                    <FormFeedback type="invalid">
                      <div>{vFilter.errors.kelas}</div>
                    </FormFeedback>
                  )}
                </ColLabelInput>
                <ColLabelInput label={''} lg="auto">
                  <Button
                    color="info"
                    onClick={() => {
                      vFilter.handleSubmit()
                    }}
                  >
                    Cari
                  </Button>
                </ColLabelInput>
              </Row>
            </Col>
            <Col className="d-flex flex-row-reverse">
              <ColLabelInput label="" lg={'auto'}>
                <Link to={'/master/tarif-tindakan/tambah'}>
                  <Button color="info">Tambah</Button>
                </Link>
              </ColLabelInput>
            </Col>
          </Row>
          <Row>
            <DataTable
              className="mt-3"
              fixedHeader
              fixedHeaderScrollHeight="700px"
              columns={columnsDetail}
              pagination
              data={totalHargaProduk}
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

export default MasterTarifTindakan
