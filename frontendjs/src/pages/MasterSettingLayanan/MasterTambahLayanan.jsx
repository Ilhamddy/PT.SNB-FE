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
import CustomSelect from '../../Components/Common/CustomSelect/CustomSelect'
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
  getComboTambahLayanan,
  getLayanan,
  upsertLayanan,
} from '../../store/masterdatalayanan/action'
import CustomInput from '../../Components/Common/CustomInput/CustomInput'

const MasterTambahLayanan = ({ tabId }) => {
  const { tabopen, id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const layanan = useSelector(
    (state) => state.MasterDataLayanan.getLayanan.data.layanan || null
  )
  let {
    jenisProduk,
    detailJenisProduk,
    variabelBPJS,
    instalasi,
    jenisOperasi,
    statusEnabled,
  } = useSelector((state) => ({
    jenisProduk:
      state.MasterDataLayanan.getComboTambahLayanan.data?.jenisProduk || [],
    detailJenisProduk:
      state.MasterDataLayanan.getComboTambahLayanan.data.detailJenisProduk ||
      [],
    variabelBPJS:
      state.MasterDataLayanan.getComboTambahLayanan.data.variabelBPJS || [],
    instalasi:
      state.MasterDataLayanan.getComboTambahLayanan.data.instalasi || [],
    jenisOperasi:
      state.MasterDataLayanan.getComboTambahLayanan.data.jenisOperasi || [],
    statusEnabled:
      state.MasterDataLayanan.getComboTambahLayanan.data.statusEnabled || [],
  }))
  const vTambahLayanan = useFormik({
    initialValues: {
      idproduk: '',
      namalayanan: '',
      jenisproduk: '',
      deskripsilayanan: '',
      detailjenisproduk: '',
      kodelayanan: '',
      variabelbpjs: '',
      instalasi: '',
      statusenabled: '',
      istindakanoperasi: false,
      jenisoperasi: '',
    },
    validationSchema: Yup.object({
      namalayanan: Yup.string().required('Nama layanan wajib diisi'),
      jenisproduk: Yup.string().required('Jenis produk wajib diisi'),
      deskripsilayanan: Yup.string().required('Deskripsi layanan wajib diisi'),
      detailjenisproduk: Yup.string().required(
        'Detail jenis produk layanan wajib diisi'
      ),
      kodelayanan: Yup.string().required('Kode layanan wajib diisi'),
      variabelbpjs: Yup.string().required('Variabel BPJS wajib diisi'),
      instalasi: Yup.string().required('Instalasi wajib diisi'),
      statusenabled: Yup.string().required('Status Enabled wajib diisi'),
      jenisoperasi: Yup.string().when('istindakanoperasi', {
        is: (val) => val === true,
        then: () => Yup.string().required('Jenis operasi Harus diisi'),
      }),
    }),
    onSubmit: (values) => {
      dispatch(
        upsertLayanan(values, (data) => {
          navigate(`/master/setting-layanan/tambah/${data.dataLayanan.id}`)
        })
      )
    },
  })
  detailJenisProduk = detailJenisProduk.filter(
    (detail) => detail.valuejenisproduk === vTambahLayanan.values.jenisproduk
  )

  useEffect(() => {
    id && dispatch(getLayanan({ idlayanan: id }))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getComboTambahLayanan({}))
  }, [dispatch])

  useEffect(() => {
    const setV = vTambahLayanan.setValues
    const resetV = vTambahLayanan.resetForm
    if (layanan) {
      setV({
        ...vTambahLayanan.initialValues,
        ...layanan,
      })
    } else {
      resetV()
    }
  }, [
    layanan,
    vTambahLayanan.setValues,
    vTambahLayanan.resetForm,
    vTambahLayanan.initialValues,
  ])

  return (
    <TabPane className="p-4" tabId={tabId} id="home2">
      <Row className="mb-3">
        <ColLabelInput label="Nama Layanan" lg={6}>
          <CustomInput
            id="namalayanan"
            name="namalayanan"
            type="text"
            value={vTambahLayanan.values.namalayanan}
            onChange={(e) => {
              vTambahLayanan.setFieldValue('namalayanan', e.target.value)
            }}
            invalid={
              vTambahLayanan.touched?.namalayanan &&
              !!vTambahLayanan.errors?.namalayanan
            }
          />
          {vTambahLayanan.touched?.namalayanan &&
            !!vTambahLayanan.errors.namalayanan && (
              <FormFeedback type="invalid">
                <div>{vTambahLayanan.errors.namalayanan}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
        <Col lg={6}>
          <Row className="d-flex justify-content-between">
            <ColLabelInput label="Jenis Produk" lg={10}>
              <CustomSelect
                id="jenisproduk"
                name="jenisproduk"
                options={jenisProduk}
                onChange={(e) => {
                  vTambahLayanan.setFieldValue('jenisproduk', e?.value || '')
                }}
                value={vTambahLayanan.values.jenisproduk}
                className={`input row-header ${
                  !!vTambahLayanan?.errors.jenisproduk ? 'is-invalid' : ''
                }`}
              />
              {vTambahLayanan.touched.jenisproduk &&
                !!vTambahLayanan.errors.jenisproduk && (
                  <FormFeedback type="invalid">
                    <div>{vTambahLayanan.errors.jenisproduk}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput label="" lg="auto">
              <Button color="info">+</Button>
            </ColLabelInput>
          </Row>
        </Col>
      </Row>
      <Row className="mb-3">
        <ColLabelInput label="Deskripsi Layanan" lg={6}>
          <CustomInput
            id="deskripsilayanan"
            name="deskripsilayanan"
            type="text"
            value={vTambahLayanan.values.deskripsilayanan}
            onChange={(e) => {
              vTambahLayanan.setFieldValue('deskripsilayanan', e.target.value)
            }}
            invalid={
              vTambahLayanan.touched?.deskripsilayanan &&
              !!vTambahLayanan.errors?.deskripsilayanan
            }
          />
          {vTambahLayanan.touched?.deskripsilayanan &&
            !!vTambahLayanan.errors.deskripsilayanan && (
              <FormFeedback type="invalid">
                <div>{vTambahLayanan.errors.deskripsilayanan}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
        <Col lg={6}>
          <Row className="d-flex justify-content-between">
            <ColLabelInput label="Detail Jenis Produk" lg={10}>
              <CustomSelect
                id="detailjenisproduk"
                name="detailjenisproduk"
                options={detailJenisProduk}
                onChange={(e) => {
                  vTambahLayanan.setFieldValue(
                    'detailjenisproduk',
                    e?.value || ''
                  )
                }}
                isDisabled={!vTambahLayanan.values.jenisproduk}
                value={vTambahLayanan.values.detailjenisproduk}
                className={`input row-header ${
                  !!vTambahLayanan?.errors.detailjenisproduk ? 'is-invalid' : ''
                }`}
              />
              {vTambahLayanan.touched.detailjenisproduk &&
                !!vTambahLayanan.errors.detailjenisproduk && (
                  <FormFeedback type="invalid">
                    <div>{vTambahLayanan.errors.detailjenisproduk}</div>
                  </FormFeedback>
                )}
            </ColLabelInput>
            <ColLabelInput label="" lg="auto">
              <Button color="info">+</Button>
            </ColLabelInput>
          </Row>
        </Col>
      </Row>
      <Row className="mb-3">
        <ColLabelInput label="Kode Layanan" lg={6}>
          <CustomInput
            id="kodelayanan"
            name="kodelayanan"
            type="text"
            value={vTambahLayanan.values.kodelayanan}
            onChange={(e) => {
              vTambahLayanan.setFieldValue('kodelayanan', e.target.value)
            }}
            invalid={
              vTambahLayanan.touched?.kodelayanan &&
              !!vTambahLayanan.errors?.kodelayanan
            }
          />
          {vTambahLayanan.touched?.kodelayanan &&
            !!vTambahLayanan.errors.kodelayanan && (
              <FormFeedback type="invalid">
                <div>{vTambahLayanan.errors.kodelayanan}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
        <ColLabelInput label="Variabel BPJS" lg={6}>
          <CustomSelect
            id="variabelbpjs"
            name="variabelbpjs"
            options={variabelBPJS}
            onChange={(e) => {
              vTambahLayanan.setFieldValue('variabelbpjs', e?.value || '')
            }}
            value={vTambahLayanan.values.variabelbpjs}
            className={`input row-header ${
              !!vTambahLayanan?.errors.variabelbpjs ? 'is-invalid' : ''
            }`}
          />
          {vTambahLayanan.touched.variabelbpjs &&
            !!vTambahLayanan.errors.variabelbpjs && (
              <FormFeedback type="invalid">
                <div>{vTambahLayanan.errors.variabelbpjs}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
      </Row>
      <Row className="mb-3">
        <ColLabelInput label="Instalasi" lg={6}>
          <CustomSelect
            id="instalasi"
            name="instalasi"
            options={instalasi}
            onChange={(e) => {
              vTambahLayanan.setFieldValue('instalasi', e?.value || '')
            }}
            value={vTambahLayanan.values.instalasi}
            className={`input row-header ${
              !!vTambahLayanan?.errors.instalasi ? 'is-invalid' : ''
            }`}
          />
          {vTambahLayanan.touched.instalasi &&
            !!vTambahLayanan.errors.instalasi && (
              <FormFeedback type="invalid">
                <div>{vTambahLayanan.errors.instalasi}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
        <ColLabelInput
          label="Jenis Operasi"
          lg={6}
          labelDecorator={
            <CustomInput
              className="form-check-input me-3"
              type="checkbox"
              checked={vTambahLayanan.values.istindakanoperasi}
              id="isnasional"
              onChange={(e) =>
                vTambahLayanan.setFieldValue(
                  'istindakanoperasi',
                  e.target.checked
                )
              }
            />
          }
        >
          <CustomSelect
            id="jenisoperasi"
            name="jenisoperasi"
            options={jenisOperasi}
            onChange={(e) => {
              vTambahLayanan.setFieldValue('jenisoperasi', e?.value || '')
            }}
            isDisabled={!vTambahLayanan.values.istindakanoperasi}
            value={vTambahLayanan.values.jenisoperasi}
            className={`input row-header ${
              !!vTambahLayanan?.errors.jenisoperasi ? 'is-invalid' : ''
            }`}
          />
          {vTambahLayanan.touched.jenisoperasi &&
            !!vTambahLayanan.errors.jenisoperasi && (
              <FormFeedback type="invalid">
                <div>{vTambahLayanan.errors.jenisoperasi}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
      </Row>
      <Row className="mb-3">
        <ColLabelInput label="Status Enabled" lg={6}>
          <CustomSelect
            id="statusenabled"
            name="statusenabled"
            options={statusEnabled}
            onChange={(e) => {
              vTambahLayanan.setFieldValue('statusenabled', e?.value || '')
            }}
            value={vTambahLayanan.values.statusenabled}
            className={`input row-header ${
              !!vTambahLayanan?.errors.statusenabled ? 'is-invalid' : ''
            }`}
          />
          {vTambahLayanan.touched.statusenabled &&
            !!vTambahLayanan.errors.statusenabled && (
              <FormFeedback type="invalid">
                <div>{vTambahLayanan.errors.statusenabled}</div>
              </FormFeedback>
            )}
        </ColLabelInput>
      </Row>
      <Row className="d-flex justify-content-center mt-4">
        <Col lg="auto">
          <Button color="danger">Batal</Button>
        </Col>
        <Col lg="auto">
          <Button
            color="success"
            onClick={() => {
              vTambahLayanan.handleSubmit()
            }}
          >
            Simpan
          </Button>
        </Col>
      </Row>
    </TabPane>
  )
}

export default MasterTambahLayanan
