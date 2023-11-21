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

const MasterTambahLayanan = ({ tabId }) => {
  const vTambahLayanan = useFormik({
    initialValues: {
      namalayanan: '',
      jenisproduk: '',
      deskripsilayanan: '',
      detailjenisproduk: '',
      kodelayanan: '',
      variabelbpjs: '',
      instalasi: '',
      statusenabled: true,
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
  })
  return (
    <TabPane className="p-3" tabId={tabId} id="home2">
      <Row className="mb-3">
        <ColLabelInput label="Nama Layanan" lg={6}>
          <Input
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
        <ColLabelInput label="Jenis Produk" lg={5}>
          <CustomSelect
            id="jenisproduk"
            name="jenisproduk"
            options={[]}
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
      <Row className="mb-3">
        <ColLabelInput label="Deskripsi Layanan" lg={6}>
          <Input
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
        <ColLabelInput label="Detail Jenis Produk" lg={5}>
          <CustomSelect
            id="detailjenisproduk"
            name="detailjenisproduk"
            options={[]}
            onChange={(e) => {
              vTambahLayanan.setFieldValue('detailjenisproduk', e?.value || '')
            }}
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
      <Row className="mb-3">
        <ColLabelInput label="Kode Layanan" lg={6}>
          <Input
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
            options={[]}
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
            options={[]}
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
        <ColLabelInput label="Detail Jenis Produk" lg={6}>
          <CustomSelect
            id="jenisoperasi"
            name="jenisoperasi"
            options={[]}
            onChange={(e) => {
              vTambahLayanan.setFieldValue('jenisoperasi', e?.value || '')
            }}
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
        <ColLabelInput label="Detail Jenis Produk" lg={6}>
          <CustomSelect
            id="statusenabled"
            name="statusenabled"
            options={[]}
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
      <Row className="d-flex justify-content-center">
        <Col lg="auto">
          <Button color="danger">Batal</Button>
        </Col>
        <Col lg="auto">
          <Button color="success">Simpan</Button>
        </Col>
      </Row>
    </TabPane>
  )
}

export default MasterTambahLayanan
