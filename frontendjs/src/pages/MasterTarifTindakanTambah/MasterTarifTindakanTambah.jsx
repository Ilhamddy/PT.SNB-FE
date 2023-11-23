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
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { onChangeStrNbr, strToNumber } from '../../utils/format'
import { getComboTarifTindakan } from '../../store/mastertariftindakan/action'
import { toast } from 'react-toastify'

const MasterTarifTindakanTambah = () => {
  const dispatch = useDispatch()
  const { komponenProduk, suratKeputusan, asalProduk, produk, kelas } =
    useSelector((state) => ({
      komponenProduk:
        state.MasterTarifTindakan.getComboTarifTindakan.data?.komponenProduk ||
        [],
      suratKeputusan:
        state.MasterTarifTindakan.getComboTarifTindakan.data?.suratKeputusan,
      asalProduk:
        state.MasterTarifTindakan.getComboTarifTindakan.data?.asalProduk,
      produk: state.MasterTarifTindakan.getComboTarifTindakan.data?.produk,
      kelas: state.MasterTarifTindakan.getComboTarifTindakan.data?.kelas,
    }))
  const vTarifTindakan = useFormik({
    initialValues: {
      id: '',
      suratkeputusan: '',
      tglawal: '',
      tglakhir: '',
      asalproduk: '',
      namatindakan: '',
      kelas: '',
      namatarif: '',
      kodetarif: '',
      totalharga: '',
      komponenharga: [],
    },
    validationSchema: Yup.object({
      suratkeputusan: Yup.string().required('Surat keputusan wajib diisi'),
      asalproduk: Yup.string().required('Asal produk wajib diisi'),
      namatindakan: Yup.string().required('Nama tindakan wajib diisi'),
      kelas: Yup.string().required('Kelas wajib diisi'),
      namatarif: Yup.string().required('Nama tarif wajib diisi'),
      kodetarif: Yup.string().required('Kode tarif wajib diisi'),
      komponenharga: Yup.array().min(1, 'Minimal 1').required('required'),
    }),
    onSubmit: (values) => {
      toast.success('Sukses')
      console.log(values)
    },
  })
  const vKomponen = useFormik({
    initialValues: {
      komponenharga: '',
      namakomponenharga: '',
      harga: '',
    },
    validationSchema: Yup.object({
      komponenharga: Yup.string().required('Komponen Harga wajib diisi'),
      harga: Yup.string().required('Harga wajib diisi'),
    }),
    onSubmit: (values) => {
      console.log(values)
      const total = [...vTarifTindakan.values.komponenharga, values].reduce(
        (prev, cur) => prev + strToNumber(cur.harga),
        0
      )
      vTarifTindakan.setFieldValue('totalharga', total)
      vTarifTindakan.setFieldValue('komponenharga', [
        ...vTarifTindakan.values.komponenharga,
        values,
      ])
    },
  })
  /**
   * @type {import("react-data-table-component").TableColumn[]}
   */
  const columnsDetail = [
    {
      name: <span className="font-weight-bold fs-13">No</span>,
      sortable: true,
      selector: (row, index) => index,
      width: '80px',
    },
    {
      name: <span className="font-weight-bold fs-13">Komponen Harga</span>,
      sortable: true,
      selector: (row) => row.namakomponenharga,
      width: '250px',
    },
    {
      name: <span className="font-weight-bold fs-13">Harga</span>,
      sortable: true,
      selector: (row) => row.harga,
      width: '200px',
    },
  ]

  useEffect(() => {
    dispatch(getComboTarifTindakan({}))
  }, [dispatch])
  return (
    <div className="page-content page-tarif-tindakan">
      <ToastContainer closeButton={false} />
      <Container fluid>
        <BreadCrumb title="Tarif Tindakan" pageTitle="Master" />
        <Card className="p-4">
          <Row>
            <ColLabelInput className="mb-3" label="Surat Keputusan" lg={4}>
              <CustomSelect
                id="suratkeputusan"
                name="suratkeputusan"
                options={suratKeputusan}
                onChange={(e) => {
                  vTarifTindakan.setFieldValue('suratkeputusan', e?.value || '')
                  vTarifTindakan.setFieldValue(
                    'tglawal',
                    e?.tglberlakuawal || ''
                  )
                  vTarifTindakan.setFieldValue(
                    'tglakhir',
                    e?.tglberlakuakhir || ''
                  )
                }}
                value={vTarifTindakan.values.suratkeputusan}
                className={`input row-header ${
                  !!vTarifTindakan?.errors.suratkeputusan ? 'is-invalid' : ''
                }`}
              />
              {vTarifTindakan.touched.suratkeputusan &&
                !!vTarifTindakan.errors.suratkeputusan && (
                  <FormFeedback type="invalid">
                    <div>{vTarifTindakan.errors.suratkeputusan}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label="Tanggal Awal" lg={4}>
              <KontainerFlatpickr
                isError={
                  vTarifTindakan.touched?.tglawal &&
                  !!vTarifTindakan.errors?.tglawal
                }
                disabled
                id="tglawal"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={vTarifTindakan.values.tglawal}
                onChange={([newDate]) => {
                  vTarifTindakan.setFieldValue('tglawal', newDate.toISOString())
                }}
              />
              {vTarifTindakan.touched?.tglawal &&
                !!vTarifTindakan.errors.tglawal && (
                  <FormFeedback type="invalid">
                    <div>{vTarifTindakan.errors.tglawal}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label="Tanggal Akhir" lg={4}>
              <KontainerFlatpickr
                isError={
                  vTarifTindakan.touched?.tglakhir &&
                  !!vTarifTindakan.errors?.tglakhir
                }
                id="tglakhir"
                options={{
                  dateFormat: 'Y-m-d',
                  defaultDate: 'today',
                }}
                value={vTarifTindakan.values.tglakhir}
                onChange={([newDate]) => {
                  vTarifTindakan.setFieldValue(
                    'tglakhir',
                    newDate.toISOString()
                  )
                }}
              />
              {vTarifTindakan.touched?.tglakhir &&
                !!vTarifTindakan.errors.tglakhir && (
                  <FormFeedback type="invalid">
                    <div>{vTarifTindakan.errors.tglakhir}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label="Asal Produk" lg={4}>
              <CustomSelect
                id="asalproduk"
                name="asalproduk"
                options={asalProduk}
                onChange={(e) => {
                  vTarifTindakan.setFieldValue('asalproduk', e?.value || '')
                }}
                value={vTarifTindakan.values.asalproduk}
                className={`input row-header ${
                  !!vTarifTindakan?.errors.asalproduk ? 'is-invalid' : ''
                }`}
              />
              {vTarifTindakan.touched.asalproduk &&
                !!vTarifTindakan.errors.asalproduk && (
                  <FormFeedback type="invalid">
                    <div>{vTarifTindakan.errors.asalproduk}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label="Nama Tindakan" lg={4}>
              <CustomSelect
                id="namatindakan"
                name="namatindakan"
                options={produk}
                onChange={(e) => {
                  vTarifTindakan.setFieldValue('namatindakan', e?.value || '')
                }}
                value={vTarifTindakan.values.namatindakan}
                className={`input row-header ${
                  !!vTarifTindakan?.errors.namatindakan ? 'is-invalid' : ''
                }`}
              />
              {vTarifTindakan.touched.namatindakan &&
                !!vTarifTindakan.errors.namatindakan && (
                  <FormFeedback type="invalid">
                    <div>{vTarifTindakan.errors.namatindakan}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label="Kelas" lg={4}>
              <CustomSelect
                id="kelas"
                name="kelas"
                options={kelas}
                onChange={(e) => {
                  vTarifTindakan.setFieldValue('kelas', e?.value || '')
                }}
                value={vTarifTindakan.values.kelas}
                className={`input row-header ${
                  !!vTarifTindakan?.errors.kelas ? 'is-invalid' : ''
                }`}
              />
              {vTarifTindakan.touched.kelas &&
                !!vTarifTindakan.errors.kelas && (
                  <FormFeedback type="invalid">
                    <div>{vTarifTindakan.errors.kelas}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label="Nama Tarif" lg={4}>
              <Input
                id="namatarif"
                name="namatarif"
                type="text"
                value={vTarifTindakan.values.namatarif}
                onChange={(e) => {
                  vTarifTindakan.setFieldValue('namatarif', e.target.value)
                }}
                invalid={
                  vTarifTindakan.touched?.namatarif &&
                  !!vTarifTindakan.errors?.namatarif
                }
              />
              {vTarifTindakan.touched?.namatarif &&
                !!vTarifTindakan.errors.namatarif && (
                  <FormFeedback type="invalid">
                    <div>{vTarifTindakan.errors.namatarif}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label="Kode Tarif" lg={4}>
              <Input
                id="kodetarif"
                name="kodetarif"
                type="text"
                value={vTarifTindakan.values.kodetarif}
                onChange={(e) => {
                  vTarifTindakan.setFieldValue('kodetarif', e.target.value)
                }}
                invalid={
                  vTarifTindakan.touched?.kodetarif &&
                  !!vTarifTindakan.errors?.kodetarif
                }
              />
              {vTarifTindakan.touched?.kodetarif &&
                !!vTarifTindakan.errors.kodetarif && (
                  <FormFeedback type="invalid">
                    <div>{vTarifTindakan.errors.kodetarif}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput className="mb-3" label="Total Tarif" lg={4}>
              <Input
                id="totalharga"
                name="totalharga"
                type="text"
                value={vTarifTindakan.values.totalharga}
                onChange={(e) => {
                  const newVal = onChangeStrNbr(
                    e.target.value,
                    vTarifTindakan.values.totalharga
                  )
                  vTarifTindakan.setFieldValue('totalharga', newVal)
                }}
                invalid={
                  vTarifTindakan.touched?.totalharga &&
                  !!vTarifTindakan.errors?.totalharga
                }
                disabled
              />
              {vTarifTindakan.touched?.totalharga &&
                !!vTarifTindakan.errors.totalharga && (
                  <FormFeedback type="invalid">
                    <div>{vTarifTindakan.errors.totalharga}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <Col lg={'auto'}>
              <Button
                color="success"
                onClick={() => vTarifTindakan.handleSubmit()}
              >
                Tambah
              </Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={5}>
              <Row>
                <ColLabelInput className="mb-3" label="Komponen Harga" lg={12}>
                  <CustomSelect
                    id="komponenharga"
                    name="komponenharga"
                    options={komponenProduk}
                    onChange={(e) => {
                      vKomponen.setFieldValue('komponenharga', e?.value || '')
                      vKomponen.setFieldValue(
                        'namakomponenharga',
                        e?.label || ''
                      )
                    }}
                    value={vKomponen.values.komponenharga}
                    className={`input row-header ${
                      !!vKomponen?.errors.komponenharga ? 'is-invalid' : ''
                    }`}
                  />
                  {vKomponen.touched.komponenharga &&
                    !!vKomponen.errors.komponenharga && (
                      <FormFeedback type="invalid">
                        <div>{vKomponen.errors.komponenharga}</div>
                      </FormFeedback>
                    )}
                </ColLabelInput>
                <ColLabelInput className="mb-3" label="Harga" lg={12}>
                  <Input
                    id="harga"
                    name="harga"
                    type="text"
                    value={vKomponen.values.harga}
                    onChange={(e) => {
                      const newVal = onChangeStrNbr(
                        e.target.value,
                        vKomponen.values.harga
                      )
                      vKomponen.setFieldValue('harga', newVal)
                    }}
                    invalid={
                      vKomponen.touched?.harga && !!vKomponen.errors?.harga
                    }
                  />
                  {vKomponen.touched?.harga && !!vKomponen.errors.harga && (
                    <FormFeedback type="invalid">
                      <div>{vKomponen.errors.harga}</div>
                    </FormFeedback>
                  )}
                </ColLabelInput>
                <Col lg={'auto'}>
                  <Button
                    color="success"
                    onClick={() => vKomponen.handleSubmit()}
                  >
                    Tambah
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col lg={7}>
              <DataTable
                className="mt-3"
                fixedHeader
                fixedHeaderScrollHeight="700px"
                columns={columnsDetail}
                pagination
                data={vTarifTindakan.values.komponenharga}
                customStyles={tableCustomStyles}
                progressComponent={<LoadingTable />}
              />
            </Col>
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

export default MasterTarifTindakanTambah